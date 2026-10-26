import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export const stagger = (s = 0.08, d = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
})

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'p' | 'span' }) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Splits a heading into words that slide up from a mask. */
export function SplitWords({ text, className, delay = 0, once = true }: { text: string; className?: string; delay?: number; once?: boolean }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px' }}
      variants={stagger(0.06, delay)}
      style={{ display: 'inline' }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingRight: '0.08em', paddingBottom: '0.06em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Image that wipes in with a clip-path and settles from a zoom. */
export function ClipReveal({ src, alt, className, from = 'bottom' }: { src: string; alt: string; className?: string; from?: 'bottom' | 'left' | 'right' }) {
  const start = from === 'left' ? 'inset(0 100% 0 0 round 18px)' : from === 'right' ? 'inset(0 0 0 100% round 18px)' : 'inset(100% 0 0 0 round 18px)'
  return (
    <motion.div
      className={className}
      initial={{ clipPath: start }}
      whileInView={{ clipPath: 'inset(0 0 0 0 round 18px)' }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 1.3, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ scale: 1.35 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.8, ease }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  )
}

/** Number that counts up the first time it is seen. */
export function CountUp({ to, from = 0, duration = 2, plain = false }: { to: number; from?: number; duration?: number; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [val, setVal] = useState(from)
  useEffect(() => {
    if (!inView) return
    const c = animate(from, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, from, to, duration])
  return <span ref={ref}>{plain ? val : val.toLocaleString('en-IN')}</span>
}

/** Element that leans toward the cursor. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 18 })
  const y = useSpring(0, { stiffness: 220, damping: 18 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** 3D tilt + spotlight card wrapper. */
export function TiltCard({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 160, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 160, damping: 18 })
  return (
    <motion.article
      className={className}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        mx.set(px)
        my.set(py)
        e.currentTarget.style.setProperty('--mx', `${px * 100}%`)
        e.currentTarget.style.setProperty('--my', `${py * 100}%`)
      }}
      onPointerLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
    >
      {children}
    </motion.article>
  )
}

/** Infinite marquee whose speed reacts to scroll velocity. */
export function Marquee({ children, speed = 40, reverse = false, className }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        className="marquee"
        animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export function useMedia(query: string) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const q = window.matchMedia(query)
    const on = () => setM(q.matches)
    on()
    q.addEventListener('change', on)
    return () => q.removeEventListener('change', on)
  }, [query])
  return m
}

export const useIsMobile = (bp = 900) => useMedia(`(max-width: ${bp}px)`)
