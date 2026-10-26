import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { COMPANY, NAV } from '../data'
import { Icon } from './Icons'
import { ease, Magnetic } from './motion'
import { asset } from '../asset'

export function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1700)
      setN(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])
  return (
    <motion.div className="loader" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease }} initial={{ clipPath: 'inset(0 0 0% 0)' }}>
      <div className="loader-inner">
        <motion.div
          className="loader-logo"
          initial={{ opacity: 0, scale: 0.6, rotateY: -90, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease }}
          style={{ transformPerspective: 900 }}
        >
          <img src={asset('img/logo-dark.png')} alt="Black Tiger Security Solutions LLP" />
        </motion.div>
        <div className="loader-bar">
          <motion.span style={{ scaleX: n / 100 }} />
        </div>
        <div className="loader-count">SECURING · {String(n).padStart(3, '0')}%</div>
      </div>
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="progress" style={{ scaleX }} />
}

export function Nav({ active, ready }: { active: string; ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
      >
        <div className="container nav-row">
          <a href="#top" className="brand" aria-label="Black Tiger Security — home" onClick={() => setOpen(false)}>
            <img src={asset('img/logo-mark.png')} alt="" />
            <span className="brand-text">
              <b>BLACK TIGER</b>
              <small>SECURITY SOLUTIONS LLP</small>
            </span>
          </a>
          <nav className="nav-links" aria-label="Main">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
                {l.label}
                {active === l.id && <motion.span layoutId="navdot" className="dot" />}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <Magnetic>
              <a className="btn btn-primary" href={COMPANY.phoneHref}>
                <Icon.phone /> Call Now
              </a>
            </Magnetic>
            <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav>
              {NAV.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                >
                  <small>0{i + 1}</small>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div className="mobile-menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Fab() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useEffect(() => scrollY.on('change', (v) => setShow(v > 700)), [scrollY])
  return (
    <div className="fab">
      <AnimatePresence>
        {show && (
          <motion.button
            className="top"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Icon.arrowUp />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        className="wa"
        href={`${COMPANY.whatsapp}?text=${encodeURIComponent('Hello Black Tiger Security, I would like a security quote.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 16 }}
        whileHover={{ scale: 1.08 }}
      >
        <Icon.whatsapp />
      </motion.a>
    </div>
  )
}

export function CursorGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 90, damping: 20 })
  const sy = useSpring(y, { stiffness: 90, damping: 20 })
  useEffect(() => {
    const on = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />
}
