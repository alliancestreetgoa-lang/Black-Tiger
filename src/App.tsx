import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { useCallback, useEffect, useState } from 'react'
import { CursorGlow, Fab, Loader, Nav, ScrollProgress } from './components/Chrome'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { About, Careers, Clients, Command, Consultancy, Contact, CtaBand, Footer, Process, Sectors, Services, Stats, Values } from './components/Sections'
import { NAV } from './data'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('')
  const done = useCallback(() => setLoading(false), [])

  // Lenis smooth scrolling + smooth in-page anchor jumps
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -70 } })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  // highlight the nav link for the section in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <ScrollProgress />
      <CursorGlow />
      <Nav active={active} ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Stats />
        <About />
        <Services />
        <Command />
        <Sectors />
        <Values />
        <Process />
        <Consultancy />
        <Clients />
        <Gallery />
        <CtaBand />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <Fab />
    </MotionConfig>
  )
}
