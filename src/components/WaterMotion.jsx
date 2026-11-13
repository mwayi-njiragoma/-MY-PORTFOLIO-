import { useEffect } from 'react'

const REACTIVE_SELECTOR = [
  '.glass-card',
  '.design-tile',
  '.horizontal-project',
  '.resume-card',
  '.lightbox__panel',
  '.contact-card',
  '.capability-card',
].join(', ')

const STIFFNESS = 145
const DAMPING = 19

export default function WaterMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return

    const states = new Map()
    let activeElement = null
    let frame = 0
    let lastTime = performance.now()

    const getState = (element) => {
      let state = states.get(element)
      if (!state) {
        state = {
          x: 0,
          y: 0,
          rotation: 0,
          velocityX: 0,
          velocityY: 0,
          velocityRotation: 0,
          targetX: 0,
          targetY: 0,
          targetRotation: 0,
          active: false,
        }
        states.set(element, state)
      }
      return state
    }

    const setTarget = (element, x, y, rotation) => {
      const state = getState(element)
      state.targetX = x
      state.targetY = y
      state.targetRotation = rotation
      state.active = true
      element.style.willChange = 'translate, rotate'
    }

    const release = (element) => {
      const state = states.get(element)
      if (!state) return
      state.targetX = 0
      state.targetY = 0
      state.targetRotation = 0
      state.active = false
    }

    const releaseAll = () => {
      states.forEach((_, element) => release(element))
      activeElement = null
    }

    const onPointerMove = (event) => {
      const element =
        event.target instanceof Element
          ? event.target.closest(REACTIVE_SELECTOR)
          : null

      if (element !== activeElement) {
        if (activeElement) release(activeElement)
        activeElement = element
      }

      if (!element) return

      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const relativeX = (event.clientX - rect.left) / rect.width - 0.5
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5

      setTarget(
        element,
        relativeX * 9,
        relativeY * 7,
        relativeX * 0.7,
      )
    }

    const animate = (now) => {
      const delta = Math.min(0.032, (now - lastTime) / 1000)
      lastTime = now

      states.forEach((state, element) => {
        if (!element.isConnected) {
          states.delete(element)
          return
        }

        const accelerationX =
          (state.targetX - state.x) * STIFFNESS - state.velocityX * DAMPING
        const accelerationY =
          (state.targetY - state.y) * STIFFNESS - state.velocityY * DAMPING
        const accelerationRotation =
          (state.targetRotation - state.rotation) * STIFFNESS -
          state.velocityRotation * DAMPING

        state.velocityX += accelerationX * delta
        state.velocityY += accelerationY * delta
        state.velocityRotation += accelerationRotation * delta

        state.x += state.velocityX * delta
        state.y += state.velocityY * delta
        state.rotation += state.velocityRotation * delta

        const settled =
          !state.active &&
          Math.abs(state.x) < 0.02 &&
          Math.abs(state.y) < 0.02 &&
          Math.abs(state.rotation) < 0.002 &&
          Math.abs(state.velocityX) < 0.02 &&
          Math.abs(state.velocityY) < 0.02 &&
          Math.abs(state.velocityRotation) < 0.002

        if (settled) {
          element.style.translate = ''
          element.style.rotate = ''
          element.style.willChange = ''
          states.delete(element)
          return
        }

        element.style.translate = `${state.x.toFixed(2)}px ${state.y.toFixed(2)}px`
        element.style.rotate = `${state.rotation.toFixed(3)}deg`
      })

      frame = requestAnimationFrame(animate)
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', releaseAll)
    window.addEventListener('blur', releaseAll)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', releaseAll)
      window.removeEventListener('blur', releaseAll)
      states.forEach((_, element) => {
        element.style.translate = ''
        element.style.rotate = ''
        element.style.willChange = ''
      })
      states.clear()
    }
  }, [])

  return null
}