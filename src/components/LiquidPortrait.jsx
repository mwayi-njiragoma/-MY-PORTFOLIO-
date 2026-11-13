import { useRef, useEffect } from 'react'

const IMAGE_SRC = `${import.meta.env.BASE_URL}Contemplative%20Portrait%20in%20Blue%20Track%20Jacket.png`

export default function LiquidPortrait() {
  const rootRef = useRef(null)
  const imageRef = useRef(null)
  const blobsRef = useRef([])
  const pointerRef = useRef({
    x: 0.5,
    y: 0.5,
    active: false,
    lastMove: 0,
    lastAdd: 0,
    prev: null,
  })
  const idleSpawnRef = useRef(0)
  const frameRef = useRef(0)
  const autoActiveRef = useRef(false)
  const inViewRef = useRef(true)
  const lastInteractionRef = useRef(performance.now())
  const scrollTimerRef = useRef(0)

  useEffect(() => {
    const root = rootRef.current
    const image = imageRef.current
    if (!root || !image) return

    // Touch devices have no hover. They still get the liquid ripples, but a
    // permanent soft reveal keeps the portrait from ever fully vanishing.
    const isTouch =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0
    const emptyMask = 'radial-gradient(circle, transparent 0%, transparent 100%)'

    const buildTouchBaseline = (now) => {
      // Gentle drift/pulse so the portrait keeps a liquid feel between ripples.
      const driftX = 50 + Math.sin(now * 0.0007) * 3.5
      const driftY = 48 + Math.cos(now * 0.0009) * 2.5
      const pulse = 0.76 + Math.sin(now * 0.0011) * 0.05
      return `radial-gradient(ellipse 78% 86% at ${driftX.toFixed(2)}% ${driftY.toFixed(2)}%, rgba(255,255,255,${pulse.toFixed(3)}) 0%, rgba(255,255,255,${(pulse * 0.72).toFixed(3)}) 52%, rgba(255,255,255,${(pulse * 0.28).toFixed(3)}) 78%, rgba(255,255,255,0) 100%)`
    }

    const spawnBlob = (x, y, options = {}) => {
      blobsRef.current.push({
        x,
        y,
        radius: 0.015,
        maxR: options.maxR ?? 0.12 + Math.random() * 0.05,
        life: options.life ?? 1,
        age: 0,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.0007,
        driftY: (Math.random() - 0.5) * 0.0007,
      })
      if (blobsRef.current.length > 30) {
        blobsRef.current.splice(0, blobsRef.current.length - 30)
      }
    }

    const addPointerBlob = (x, y) => {
      const now = performance.now()
      const pointer = pointerRef.current
      if (now - pointer.lastAdd < 28) return
      pointer.lastAdd = now

      const prev = pointer.prev
      if (prev) {
        const dx = x - prev.x
        const dy = y - prev.y
        const distance = Math.hypot(dx, dy)
        const steps = Math.min(5, Math.max(1, Math.floor(distance * 18)))
        for (let index = 1; index <= steps; index += 1) {
          const factor = index / steps
          spawnBlob(prev.x + dx * factor, prev.y + dy * factor, {
            maxR: 0.16 + distance * 0.12,
            life: 1.3,
          })
        }
      } else {
        spawnBlob(x, y, { maxR: 0.2, life: 1.35 })
      }
      pointer.prev = { x, y }
    }

    const onPointerEnter = (event) => {
      const rect = root.getBoundingClientRect()
      const pointer = pointerRef.current
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
      pointer.lastMove = performance.now()
      lastInteractionRef.current = performance.now()
      pointer.prev = null
      spawnBlob(pointer.x, pointer.y, { maxR: 0.24, life: 1.4 })
    }

    const onPointerMove = (event) => {
      const rect = root.getBoundingClientRect()
      const pointer = pointerRef.current
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
      pointer.lastMove = performance.now()
      lastInteractionRef.current = performance.now()
      addPointerBlob(pointer.x, pointer.y)
    }

    const onPointerLeave = () => {
      const pointer = pointerRef.current
      pointer.active = false
      pointer.prev = null
    }

    const onPointerDown = (event) => {
      const rect = root.getBoundingClientRect()
      const pointer = pointerRef.current
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
      pointer.lastMove = performance.now()
      lastInteractionRef.current = performance.now()
      pointer.prev = null
      spawnBlob(pointer.x, pointer.y, { maxR: 0.26, life: 1.5 })
    }

    root.addEventListener('pointerenter', onPointerEnter, { passive: true })
    root.addEventListener('pointermove', onPointerMove, { passive: true })
    root.addEventListener('pointerleave', onPointerLeave, { passive: true })
    root.addEventListener('pointerdown', onPointerDown, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (!entry.isIntersecting) {
          autoActiveRef.current = false
        }
      },
      { threshold: 0.18 },
    )
    observer.observe(root)

    const onWindowScroll = () => {
      if (!inViewRef.current) return
      autoActiveRef.current = true
      lastInteractionRef.current = performance.now()
      window.clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = window.setTimeout(() => {
        autoActiveRef.current = false
      }, 1500)
    }
    window.addEventListener('scroll', onWindowScroll, { passive: true })

    const applyMask = () => {
      const pointer = pointerRef.current
      const bounds = root.getBoundingClientRect()
      const width = Math.max(bounds.width, 1)
      const height = Math.max(bounds.height, 1)
      const blobs = blobsRef.current

      // Expire dead blobs and keep their liquid shapes alive briefly.
      blobsRef.current = blobs
        .map((blob) => {
          const elapsed = 1 / 60
          const wasMoving = performance.now() - pointer.lastMove < 240
          const decay = wasMoving ? 0.52 : 0.78
          blob.age += elapsed
          blob.x += blob.driftX
          blob.y += blob.driftY
          const growth = blob.maxR * (1 - Math.exp(-blob.age * 5.5))
          const fade = Math.pow(Math.max(0, blob.life), 0.38)
          const wobble =
            1 + 0.075 * Math.sin(performance.now() * 0.004 + blob.phase)
          blob.radius = growth * fade * wobble
          blob.life -= elapsed * decay

          return blob
        })
        .filter((blob) => blob.life > 0.01 && blob.radius > 0.004)

      const hasInteraction = pointer.active || autoActiveRef.current
      if (!isTouch && (!hasInteraction || blobsRef.current.length === 0)) {
        image.style.maskImage = emptyMask
        image.style.WebkitMaskImage = emptyMask
        return
      }

      // On touch devices the baseline keeps part of the portrait visible at
      // all times; the ripples simply reveal more of it as they pass through.
      const gradients = isTouch ? [buildTouchBaseline(performance.now())] : []

      for (const blob of blobsRef.current) {
        const x = blob.x * width
        const y = blob.y * height
        const radius = Math.max(4, blob.radius * Math.min(width, height))
        const alpha = Math.max(0, Math.min(1, blob.life))
        const innerAlpha = (alpha * 0.42).toFixed(3)
        gradients.push(
          `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(255,255,255,${alpha.toFixed(3)}) 0%, rgba(255,255,255,${innerAlpha}) 46%, rgba(255,255,255,0) 100%)`,
        )
      }

      const mask = gradients.join(', ')
      image.style.maskImage = mask
      image.style.WebkitMaskImage = mask
    }

    const animate = () => {
      const pointer = pointerRef.current
      const now = performance.now()

      const hasInteraction = pointer.active || autoActiveRef.current

      if (isTouch) {
        // Touch has no hover, so keep a slow ambient ripple going while the
        // portrait is on screen. The baseline mask keeps it from vanishing.
        if (now - idleSpawnRef.current > 1500 + Math.random() * 900) {
          const centerX = Math.random() * 0.7 + 0.15
          const centerY = Math.random() * 0.7 + 0.15
          const dropletCount = 4 + Math.floor(Math.random() * 3)
          for (let index = 0; index < dropletCount; index += 1) {
            const angle = (index / dropletCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.7
            const ring = 0.035 + (index % 3) * 0.04 + Math.random() * 0.02
            spawnBlob(
              Math.min(0.96, Math.max(0.04, centerX + Math.cos(angle) * ring)),
              Math.min(0.96, Math.max(0.04, centerY + Math.sin(angle) * ring)),
              {
                maxR: 0.17 + Math.random() * 0.09,
                life: 1.5,
              },
            )
          }
          idleSpawnRef.current = now
        }
      } else if (hasInteraction && now - lastInteractionRef.current > 180) {
        // Occasional ripple/droplet bursts while interacting or scrolling.
        if (now - idleSpawnRef.current > 900 + Math.random() * 500) {
          const centerX = Math.random() * 0.76 + 0.12
          const centerY = Math.random() * 0.76 + 0.12
          const dropletCount = 5 + Math.floor(Math.random() * 4)
          for (let index = 0; index < dropletCount; index += 1) {
            const angle = (index / dropletCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.7
            const ring = 0.025 + (index % 3) * 0.04 + Math.random() * 0.02
            spawnBlob(
              Math.min(0.96, Math.max(0.04, centerX + Math.cos(angle) * ring)),
              Math.min(0.96, Math.max(0.04, centerY + Math.sin(angle) * ring)),
              {
                maxR: 0.17 + Math.random() * 0.1,
                life: 1.45,
              },
            )
          }
          idleSpawnRef.current = now
        }
      }

      // Small 3D tilt follows the cursor on hover-capable devices.
      if (isTouch) {
        image.style.transform = 'none'
      } else if (pointer.active) {
        const tiltY = (pointer.x - 0.5) * 15
        const tiltX = (0.5 - pointer.y) * 15
        image.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.045) translateZ(0px)`
      } else {
        image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)'
      }

      applyMask()
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.clearTimeout(scrollTimerRef.current)
      observer.disconnect()
      window.removeEventListener('scroll', onWindowScroll)
      root.removeEventListener('pointerenter', onPointerEnter)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
      root.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <div className="liquid-portrait" ref={rootRef} aria-label="Portrait reveal effect">
      <img
        ref={imageRef}
        src={IMAGE_SRC}
        alt="Portrait of the portfolio owner"
      />
    </div>
  )
}