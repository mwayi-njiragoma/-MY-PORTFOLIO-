import { useEffect, useRef } from 'react'

const MAX_RIPPLES = 80

export default function WaterCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let lastTime = performance.now()
    let lastX = null
    let lastY = null
    let lastSpawn = 0
    let pressed = false
    const ripples = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnRipple = (x, y, options = {}) => {
      if (ripples.length >= MAX_RIPPLES) ripples.shift()
      ripples.push({
        x,
        y,
        radius: options.radius ?? 2,
        maxRadius: options.maxRadius ?? 24 + Math.random() * 22,
        life: 1,
        duration: options.duration ?? 1.05 + Math.random() * 0.75,
        driftX: (Math.random() - 0.5) * 8,
        driftY: (Math.random() - 0.5) * 8,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const onPointerMove = (event) => {
      const now = performance.now()
      const x = event.clientX
      const y = event.clientY
      if (lastX !== null && lastY !== null) {
        const distance = Math.hypot(x - lastX, y - lastY)
        if (distance > 1.5 && now - lastSpawn > 12) {
          spawnRipple(x, y, {
            maxRadius: 18 + Math.min(distance, 36) * 1.15,
            duration: 0.95 + Math.random() * 0.65,
          })
          lastSpawn = now
        }
      }
      lastX = x
      lastY = y
    }

    const onPointerDown = (event) => {
      pressed = true
      for (let index = 0; index < 7; index += 1) {
        spawnRipple(event.clientX, event.clientY, {
          maxRadius: 28 + Math.random() * 46,
          duration: 1.1 + Math.random() * 0.7,
        })
      }
    }

    const onPointerUp = () => {
      pressed = false
    }

    const onPointerLeave = () => {
      lastX = null
      lastY = null
    }

    const draw = (now) => {
      const delta = Math.min(0.034, (now - lastTime) / 1000)
      lastTime = now

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index]
        ripple.life -= delta / ripple.duration

        if (ripple.life <= 0) {
          ripples.splice(index, 1)
          continue
        }

        const progress = 1 - ripple.life
        const eased = 1 - Math.pow(1 - progress, 3)
        const radius = ripple.radius + (ripple.maxRadius - ripple.radius) * eased
        const wobble = Math.sin(now * 0.004 + ripple.phase) * 2.5
        const x = ripple.x + ripple.driftX * progress
        const y = ripple.y + ripple.driftY * progress
        const alpha = ripple.life * (pressed ? 0.24 : 0.14)

        const ring = ctx.createRadialGradient(
          x,
          y,
          Math.max(0, radius * 0.55),
          x,
          y,
          Math.max(radius + wobble, 1),
        )
        ring.addColorStop(0, 'rgba(255,255,255,0)')
        ring.addColorStop(0.72, `rgba(205,225,255,${(alpha * 0.4).toFixed(3)})`)
        ring.addColorStop(0.9, `rgba(255,255,255,${alpha.toFixed(3)})`)
        ring.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.fillStyle = ring
        ctx.beginPath()
        ctx.arc(x, y, Math.max(radius + wobble, 1), 0, Math.PI * 2)
        ctx.fill()

        const core = ctx.createRadialGradient(x, y, 0, x, y, Math.max(radius * 0.3, 1))
        core.addColorStop(0, `rgba(255,255,255,${(alpha * 0.55).toFixed(3)})`)
        core.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(x, y, Math.max(radius * 0.3, 1), 0, Math.PI * 2)
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 6,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: 0.72,
      }}
    />
  )
}