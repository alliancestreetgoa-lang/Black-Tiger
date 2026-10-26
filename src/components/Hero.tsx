import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { COMPANY, SERVICES } from '../data'
import { Icon } from './Icons'
import { ease, Magnetic, Marquee } from './motion'
import { asset } from '../asset'

const LINES = [
  { words: ['Your', 'Safety.'], cls: 'chrome-text' },
  { words: ['Our'], cls: '' },
  { words: ['Responsibility.'], cls: 'red-text' },
]

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  let wi = 0
  return (
    <section ref={ref} className="hero" id="top">
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <motion.img
          src={asset('img/hero.jpg')}
          alt="Black Tiger security officers outside a Goa resort at dusk"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.2, ease }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-grid" />

      <motion.div className="container hero-content" style={{ y: textY, opacity: fade }}>
        <div className="hero-copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, x: -30 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease, delay: 0.3 }}>
            Goa’s 360° Security Partner · Since {COMPANY.since}
          </motion.span>
          <h1 aria-label={COMPANY.tagline}>
            {LINES.map((l, li) => (
              <span className="line" key={li} aria-hidden>
                {l.words.map((w) => {
                  const d = 0.45 + wi++ * 0.12
                  return (
                    <motion.span
                      key={w}
                      className={l.cls}
                      initial={{ y: '115%', rotate: 6 }}
                      animate={ready ? { y: '0%', rotate: 0 } : {}}
                      transition={{ duration: 1.1, ease, delay: d }}
                      style={{ marginRight: '0.22em' }}
                    >
                      {w}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay: 1.05 }}>
            The largest network of security operations in Goa — 280+ trained guards, bouncers, lady officers and electronic surveillance protecting hotels, festivals, industries and VIPs
            across North & South Goa.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay: 1.2 }}>
            <Magnetic>
              <a href="#contact" className="btn btn-primary">
                Get a Security Quote <Icon.arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#services" className="btn">
                Explore Services
              </a>
            </Magnetic>
          </motion.div>
          <motion.div className="hero-badges" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1.45 }}>
            <span>
              <Icon.shield /> Verified & trained staff
            </span>
            <span>
              <Icon.clock /> 24/7 operations
            </span>
            <span>
              <Icon.pin /> North & South Goa
            </span>
          </motion.div>
        </div>

      </motion.div>

      <div className="scroll-cue" aria-hidden>
        <i />
        Scroll
      </div>

      <motion.div className="ribbon" initial={{ y: 100 }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1, ease, delay: 1.3 }}>
        <Marquee speed={55}>
          {SERVICES.map((s) => (
            <a href={`#svc-${s.slug}`} className="marquee-item" key={s.slug}>
              <img src={s.img} alt="" loading="lazy" />
              {s.title}
              <img className="marquee-sep" src={asset('img/logo-mark.png')} alt="" />
            </a>
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}
