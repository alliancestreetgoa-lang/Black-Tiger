import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { lazy, Suspense, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { CLIENTS, COMPANY, CONSULTANCY, JOBS, NAV, PROCESS, SECTORS, SERVICES, STATS, VALUES, type Service } from '../data'
import { Icon } from './Icons'
import { ClipReveal, CountUp, ease, fadeUp, Magnetic, Marquee, Reveal, SplitWords, stagger, TiltCard, useIsMobile, useMedia } from './motion'
import { asset } from '../asset'

// Remotion is loaded on demand so it stays out of the first page load.
const HudPlayer = lazy(() => import('../remotion/Players').then((m) => ({ default: m.HudPlayer })))
const CctvPlayer = lazy(() => import('../remotion/Players').then((m) => ({ default: m.CctvPlayer })))

/* ---------------- stats ---------------- */
export function Stats() {
  return (
    <section className="stats" aria-label="Key facts">
      <motion.div className="container stats-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} variants={stagger(0.12)}>
        {STATS.map((s) => (
          <motion.div className="stat" key={s.label} variants={fadeUp}>
            <b className="chrome-text">
              <CountUp to={s.value} from={s.plain ? 1990 : 0} plain={s.plain} />
              {s.suffix && <em>{s.suffix}</em>}
            </b>
            <p>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ---------------- about ---------------- */
export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])
  const badgeY = useTransform(scrollYProgress, [0, 1], [80, -60])
  const badgeR = useTransform(scrollYProgress, [0, 1], [-12, 8])
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-media" ref={ref}>
          <motion.div
            className="frame"
            initial={{ clipPath: 'inset(0 0 100% 0 round 18px)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0 round 18px)' }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.3, ease }}
          >
            <motion.img src={asset('img/about.jpg')} alt="Black Tiger security team briefing" loading="lazy" style={{ y: imgY }} />
          </motion.div>
          <motion.div className="badge" style={{ y: badgeY, rotate: badgeR }}>
            <img src={asset('img/logo-bt.png')} alt="" />
            <b>Est. {COMPANY.since}</b>
          </motion.div>
        </div>
        <div className="about-copy">
          <Reveal>
            <span className="eyebrow">Who we are</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Goa’s largest" />
            <br />
            <span className="red-text">
              <SplitWords text="security network" delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 26 }}>
              Black Tiger was founded in {COMPANY.since} to give the people of Goa a quality 360° platform for security. Since then we have grown into a prestigious, trusted brand — and
              the largest network of security operations in the tourist state of Goa.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="lead muted">
              With over 280 full and part-time employees, we deliver bespoke guarding and electronic security solutions — and we’re now growing into a Pan-India company.
            </p>
          </Reveal>
          <motion.div className="pillars" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} variants={stagger(0.1, 0.1)}>
            {[
              { i: <Icon.target />, h: 'Our Mission', p: 'Meet every customer’s security needs with integrated, innovative solutions.' },
              { i: <Icon.eye />, h: 'Our Vision', p: 'To be recognised as the national leader in security solutions.' },
              { i: <Icon.users />, h: 'Our People', p: 'Committed officers who are proud of the shield they wear.' },
              { i: <Icon.award />, h: 'Our Promise', p: 'Accountable service with regular reviews and measurable value.' },
            ].map((x) => (
              <motion.div className="pillar" key={x.h} variants={fadeUp}>
                {x.i}
                <h4>{x.h}</h4>
                <p>{x.p}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- services ---------------- */
function ServiceCard({ s, i }: { s: Service; i: number }) {
  return (
    <TiltCard className="svc-card">
      <div className="svc-img" id={`svc-${s.slug}`}>
        <img src={s.img} alt={s.title} loading="lazy" style={s.focus ? { objectPosition: s.focus } : undefined} />
      </div>
      <div className="spot" />
      <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
      <span className="chip">
        <img src={asset('img/logo-bt-sm.png')} alt="" />
      </span>
      <div className="svc-body">
        <span className="svc-kicker">{s.kicker}</span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
        <ul className="svc-points">
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </TiltCard>
  )
}

function ServicesHead() {
  return (
    <div className="container services-head">
      <div>
        <Reveal>
          <span className="eyebrow">What we do</span>
        </Reveal>
        <h2 className="title">
          <SplitWords text="Complete" /> <span className="chrome-text"><SplitWords text="security" delay={0.1} /></span>
          <br />
          <SplitWords text="solutions" delay={0.2} />
        </h2>
      </div>
      <Reveal delay={0.15}>
        <p className="lead muted" style={{ maxWidth: 440 }}>
          Thirteen specialist services, one accountable partner. From a single gate guard to a full festival deployment — designed around your site and your risks.
        </p>
      </Reveal>
    </div>
  )
}

function HorizontalServices() {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  useLayoutEffect(() => {
    const measure = () => track.current && setDist(track.current.scrollWidth - window.innerWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  return (
    <div className="h-scroll" ref={ref} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="h-sticky">
        <ServicesHead />
        <motion.div className="h-track" ref={track} style={{ x }}>
          {SERVICES.map((s, i) => (
            <ServiceCard s={s} i={i} key={s.slug} />
          ))}
          <div className="svc-end">
            <img src={asset('img/logo-bt.png')} alt="" style={{ width: 110 }} />
            <h3>
              Need a <span className="red-text">custom</span> plan?
            </h3>
            <p className="muted" style={{ margin: 0 }}>
              Tell us about your site — we’ll assess it and propose the right team.
            </p>
            <a href="#contact" className="btn btn-primary">
              Talk to us <Icon.arrow />
            </a>
          </div>
        </motion.div>
        <Counter progress={scrollYProgress} />
      </div>
    </div>
  )
}

function Counter({ progress }: { progress: MotionValue<number> }) {
  const [n, setN] = useState(1)
  useLayoutEffect(() => progress.on('change', (v) => setN(Math.min(SERVICES.length, Math.max(1, Math.ceil(v * SERVICES.length))))), [progress])
  return (
    <div className="h-count">
      <span>{String(n).padStart(2, '0')}</span>
      <div className="bar">
        <motion.span style={{ scaleX: progress }} />
      </div>
      <span>{String(SERVICES.length).padStart(2, '0')}</span>
    </div>
  )
}

export function Services() {
  // the sticky horizontal gallery needs room; phones, portrait tablets and short screens get a stacked list
  const mobile = useMedia('(max-width: 900px), (max-height: 620px)')
  return (
    <section id="services" style={{ position: 'relative', paddingTop: mobile ? 'clamp(84px,12vw,160px)' : 0 }}>
      {mobile ? (
        <>
          <ServicesHead />
          <div className="container svc-stack">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} y={60}>
                <ServiceCard s={s} i={i} />
              </Reveal>
            ))}
          </div>
        </>
      ) : (
        <HorizontalServices />
      )}
    </section>
  )
}

/* ---------------- command centre (Remotion CCTV) ---------------- */
export function Command() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotX = useTransform(scrollYProgress, [0, 1], [28, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1])
  const op = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  return (
    <section className="section command" id="technology">
      <div className="container command-grid">
        <div>
          <Reveal>
            <span className="eyebrow">Electronic security</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Eyes on every" />
            <br />
            <span className="red-text">
              <SplitWords text="corner. 24/7." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 24 }}>
              We combine leading-edge technology with highly trained professionals. CCTV, alarms, access control and DFMD/HHMD screening — monitored and backed by our response teams.
            </p>
          </Reveal>
          <motion.ul className="check-list" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.08, 0.1)}>
            {['CCTV design, installation & monitoring', 'Door-frame & hand-held metal detectors', 'Alarm response & mobile patrols', 'Incident reporting you can trust'].map((t) => (
              <motion.li key={t} variants={fadeUp}>
                <Icon.check /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.div ref={ref} style={{ rotateX: rotX, scale, opacity: op, transformPerspective: 1400 }}>
          <div className="screen">
            <Suspense fallback={null}>
              <CctvPlayer />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- sectors ---------------- */
export function Sectors() {
  return (
    <section className="section" id="sectors">
      <div className="container">
        <div style={{ textAlign: 'center', display: 'grid', justifyItems: 'center' }}>
          <Reveal>
            <span className="eyebrow">Who we protect</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Trusted across" /> <span className="chrome-text"><SplitWords text="every sector" delay={0.12} /></span>
          </h2>
        </div>
        <motion.div className="sectors-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} variants={stagger(0.06)}>
          {SECTORS.map((s, i) => {
            const I = Icon[s.icon]
            return (
              <motion.div
                key={s.title}
                className="sector"
                variants={{ hidden: { opacity: 0, y: 50, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } } }}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
              >
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <I />
                <h4>{s.title}</h4>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- values (stacking cards) ---------------- */
function ValueCard({ v, i, progress }: { v: (typeof VALUES)[number]; i: number; progress: MotionValue<number> }) {
  const start = i / VALUES.length
  const scale = useTransform(progress, [start, 1], [1, 1 - (VALUES.length - i) * 0.035])
  return (
    <motion.div className="value-card" style={{ scale, top: `calc(120px + ${i * 14}px)` }}>
      <span className="vnum">{String(i + 1).padStart(2, '0')}</span>
      <div>
        <h3>{v.title}</h3>
        <p>{v.text}</p>
      </div>
    </motion.div>
  )
}

export function Values() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="section" id="values" style={{ paddingBottom: 60 }}>
      <div className="container values-wrap">
        <div className="values-sticky">
          <Reveal>
            <span className="eyebrow">Our values</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Built on" />
            <br />
            <span className="red-text">
              <SplitWords text="discipline" delay={0.1} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 22 }}>
              A modern, progressive company delivering flexible service tailored to every customer — with specialist teams in every core sector.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="vision">
              <b>Vision</b>
              <p>“To be recognised as the national leader in providing security solutions.”</p>
            </div>
          </Reveal>
        </div>
        <div className="value-cards" ref={ref}>
          {VALUES.map((v, i) => (
            <ValueCard v={v} i={i} key={v.title} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- process ---------------- */
export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const mobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  return (
    <section className="section process" id="approach">
      <div className="container">
        <Reveal>
          <span className="eyebrow">How we work</span>
        </Reveal>
        <h2 className="title">
          <SplitWords text="Our method" /> <span className="chrome-text"><SplitWords text="statement" delay={0.1} /></span>
        </h2>
        <div className="process-list" ref={ref}>
          <div className="process-line">
            <motion.span style={mobile ? { scaleY: scrollYProgress } : { scaleX: scrollYProgress }} />
          </div>
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.12} className="p-step">
              <motion.div className="p-dot" whileInView={{ borderColor: '#e3161f', boxShadow: '0 0 30px rgba(227,22,31,.5)' }} viewport={{ margin: '-40% 0px' }} transition={{ duration: 0.6 }}>
                {p.step}
              </motion.div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- consultancy ---------------- */
export function Consultancy() {
  return (
    <section className="section" id="consultancy">
      <div className="container consult-grid">
        <ClipReveal className="consult-media" src={asset('img/consultancy.jpg')} alt="Security risk assessment meeting" from="left" />
        <div>
          <Reveal>
            <span className="eyebrow">Consultancy & risk</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Risk is a" />
            <br />
            <span className="red-text">
              <SplitWords text="boardroom issue" delay={0.1} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 22 }}>
              Today’s threats to business are varied and always changing. Our specialist consultancy, investigation and risk-management team minimises them — so you can focus on running your
              business.
            </p>
          </Reveal>
          <motion.div className="tags" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.05, 0.1)}>
            {CONSULTANCY.map((c) => (
              <motion.span className="tag" key={c} variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } } }}>
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- clients ---------------- */
export function Clients() {
  const half = Math.ceil(CLIENTS.length / 2)
  return (
    <section className="clients" id="clients">
      <div className="container" style={{ marginBottom: 46, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <Reveal>
            <span className="eyebrow">Trusted by</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Brands that" /> <span className="chrome-text"><SplitWords text="rely on us" delay={0.1} /></span>
          </h2>
        </div>
        <Reveal delay={0.1}>
          <p className="muted" style={{ maxWidth: 380, margin: 0 }}>
            From international festivals to jewellers, resorts, pharma and construction — Goa’s leading names choose Black Tiger.
          </p>
        </Reveal>
      </div>
      <Marquee className="row" speed={45}>
        {CLIENTS.slice(0, half).map((c) => (
          <span className="marquee-item" key={c}>
            {c}
            <img src={asset('img/logo-bt-sm.png')} alt="" style={{ width: 34 }} />
          </span>
        ))}
      </Marquee>
      <Marquee className="row alt" speed={50} reverse>
        {CLIENTS.slice(half).map((c) => (
          <span className="marquee-item" key={c}>
            {c}
            <img src={asset('img/logo-bt-sm.png')} alt="" style={{ width: 34 }} />
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/* ---------------- careers ---------------- */
const EXPERIENCE = ['Fresher', 'Less than 1 year', '1–3 years', '3–5 years', '5+ years']
const AVAILABILITY = ['Full-time', 'Part-time', 'Event-based / weekends']

function ApplyForm({ position, setPosition }: { position: string; setPosition: (p: string) => void }) {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const msg = [
      'Hello Black Tiger Security Service, I would like to apply for a job.',
      `Position: ${f.get('position')}`,
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Age: ${f.get('age') || '-'}`,
      `Experience: ${f.get('experience')}`,
      `Availability: ${f.get('availability')}`,
      `Location: ${f.get('location') || '-'}`,
      `About me: ${f.get('about') || '-'}`,
    ].join('\n')
    window.open(`${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setSent(true)
  }
  return (
    <Reveal delay={0.1}>
      <form className="form apply-form" id="apply" onSubmit={submit}>
        <h3>
          Apply <span className="red-text">now</span>
        </h3>
        <p className="muted" style={{ margin: '8px 0 0' }}>
          Fill this in and send it on WhatsApp — our recruitment team will call you back.
        </p>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="a-name">Full name</label>
            <input id="a-name" name="name" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="a-phone">Phone</label>
            <input id="a-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="field full">
            <label htmlFor="a-position">Position</label>
            <select id="a-position" name="position" value={position} onChange={(e) => setPosition(e.target.value)}>
              {JOBS.map((j) => (
                <option key={j.title}>{j.title}</option>
              ))}
              <option>Other / not sure</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="a-exp">Experience</label>
            <select id="a-exp" name="experience" defaultValue={EXPERIENCE[0]}>
              {EXPERIENCE.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="a-age">Age</label>
            <input id="a-age" name="age" type="number" min={18} max={65} inputMode="numeric" />
          </div>
          <div className="field">
            <label htmlFor="a-loc">Area in Goa</label>
            <input id="a-loc" name="location" placeholder="e.g. Mapusa" />
          </div>
          <div className="field">
            <label htmlFor="a-avail">Availability</label>
            <select id="a-avail" name="availability" defaultValue={AVAILABILITY[0]}>
              {AVAILABILITY.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="a-about">About you</label>
            <textarea id="a-about" name="about" placeholder="Previous security work, training, languages you speak…" />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          <Icon.whatsapp /> Send application
        </button>
        <AnimatePresence>
          {sent ? (
            <motion.p key="sent" className="form-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              WhatsApp opened with your application — press send, then share your ID and CV in the same chat.
            </motion.p>
          ) : (
            <p className="form-note">You can share your ID proof and CV in the WhatsApp chat after sending.</p>
          )}
        </AnimatePresence>
      </form>
    </Reveal>
  )
}

export function Careers() {
  const [open, setOpen] = useState(0)
  const [position, setPosition] = useState(JOBS[0].title)
  const applyFor = (title: string) => {
    setPosition(title)
    const form = document.getElementById('apply')
    // layout position (ignores the reveal animation's transform), leaving room for the fixed nav bar
    let y = 0
    for (let el = form as HTMLElement | null; el; el = el.offsetParent as HTMLElement | null) y += el.offsetTop
    if (form) window.scrollTo({ top: y - 100, behavior: 'smooth' })
    window.setTimeout(() => (document.getElementById('a-name') as HTMLInputElement | null)?.focus({ preventScroll: true }), 700)
  }
  return (
    <section className="section" id="careers">
      <div className="container careers-grid">
        <ClipReveal className="careers-media" src={asset('img/careers.jpg')} alt="Black Tiger recruits in training" />
        <div>
          <Reveal>
            <span className="eyebrow">Careers</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Wear the" /> <span className="red-text"><SplitWords text="shield" delay={0.1} /></span>
          </h2>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 22 }}>
              Join Goa’s largest security team. We recruit people who meet our quality standards and back them with classroom and on-site training, fair pay and a real career path.
            </p>
          </Reveal>
          <div className="jobs">
            {JOBS.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.08}>
                <div className="job">
                  <button className="job-head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                    <div>
                      <h3>{j.title}</h3>
                      <div className="meta">
                        <span>{j.place}</span>
                        <span>{j.type}</span>
                      </div>
                    </div>
                    <motion.span className="job-toggle" animate={{ rotate: open === i ? 45 : 0, backgroundColor: open === i ? '#e3161f' : 'rgba(0,0,0,0)' }}>
                      <Icon.plus width={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} style={{ overflow: 'hidden' }}>
                        <div className="job-body">
                          <ul>
                            {j.reqs.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                          <button type="button" className="btn btn-primary" onClick={() => applyFor(j.title)}>
                            Apply now <Icon.arrow />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
          <ApplyForm position={position} setPosition={setPosition} />
        </div>
      </div>
    </section>
  )
}

/* ---------------- CTA band ---------------- */
export function CtaBand() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04])
  return (
    <section className="cta-band" ref={ref}>
      <motion.div className="bg" style={{ y }}>
        <img src={asset('img/svc-vip.jpg')} alt="" loading="lazy" />
      </motion.div>
      <motion.div className="container" style={{ scale }}>
        <motion.div
          className="cta-hud"
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.4, ease }}
        >
          <Suspense fallback={null}>
            <HudPlayer />
          </Suspense>
        </motion.div>
        <h2>
          <SplitWords text="Secure what" />
          <br />
          <span className="red-text">
            <SplitWords text="matters most." delay={0.12} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <div className="actions">
            <Magnetic>
              <a className="btn btn-primary" href={COMPANY.phoneHref}>
                <Icon.phone /> {COMPANY.phone}
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn" href="#contact">
                Request a site assessment <Icon.arrow />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}

/* ---------------- contact ---------------- */
const JOB_OPTION = 'Job application — we’re hiring'

export function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const job = f.get('service') === JOB_OPTION
    const msg = [
      job ? 'Hello Black Tiger Security Service, I would like to apply for a job.' : 'Hello Black Tiger Security Service, I would like a quote.',
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Service: ${f.get('service')}`,
      `Location: ${f.get('location')}`,
      `Details: ${f.get('message')}`,
    ].join('\n')
    window.open(`${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setSent(true)
  }
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div>
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <h2 className="title">
            <SplitWords text="Let’s secure" />
            <br />
            <span className="chrome-text">
              <SplitWords text="your world" delay={0.1} />
            </span>
          </h2>
          <motion.div className="contact-cards" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.08)}>
            <motion.a className="c-card" href={COMPANY.phoneHref} variants={fadeUp}>
              <span className="ic">
                <Icon.phone />
              </span>
              <div>
                <small>Call 24/7</small>
                <span>{COMPANY.phone}</span>
              </div>
            </motion.a>
            <motion.a className="c-card" href={`mailto:${COMPANY.email}`} variants={fadeUp}>
              <span className="ic">
                <Icon.mail />
              </span>
              <div>
                <small>Email</small>
                <span>{COMPANY.email}</span>
              </div>
            </motion.a>
            <motion.a className="c-card" href={COMPANY.whatsapp} target="_blank" rel="noreferrer" variants={fadeUp}>
              <span className="ic">
                <Icon.whatsapp />
              </span>
              <div>
                <small>WhatsApp</small>
                <span>Chat with our team</span>
              </div>
            </motion.a>
            <motion.a className="c-card c-hiring" href="#apply" variants={fadeUp}>
              <span className="ic">
                <Icon.users />
              </span>
              <div>
                <small>
                  We’re hiring <i className="hiring-dot" aria-hidden />
                </small>
                <span>Security guards, officers & lady guards — join our team</span>
              </div>
              <Icon.arrow className="c-go" />
            </motion.a>
            <motion.div className="c-card" variants={fadeUp}>
              <span className="ic">
                <Icon.pin />
              </span>
              <div>
                <small>Head office</small>
                <span>{COMPANY.address}</span>
              </div>
            </motion.div>
          </motion.div>
          <Reveal delay={0.1}>
            <div className="map">
              <iframe title="Black Tiger office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&output=embed`} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form className="form" onSubmit={submit}>
            <h3>
              Get a <span className="red-text">free quote</span>
            </h3>
            <p className="muted" style={{ margin: '8px 0 0' }}>
              Tell us what you need — we usually respond within the hour.
            </p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="f-name">Name</label>
                <input id="f-name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input id="f-phone" name="phone" type="tel" required autoComplete="tel" />
              </div>
              <div className="field">
                <label htmlFor="f-service">Service</label>
                <select id="f-service" name="service" defaultValue={SERVICES[0].title}>
                  {SERVICES.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                  <option>Security Consultancy & Risk</option>
                  <option>{JOB_OPTION}</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-loc">Location</label>
                <input id="f-loc" name="location" placeholder="e.g. Calangute" />
              </div>
              <div className="field full">
                <label htmlFor="f-msg">Requirement</label>
                <textarea id="f-msg" name="message" placeholder="Number of guards, shifts, event date…" />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              <Icon.whatsapp /> Send via WhatsApp
            </button>
            <AnimatePresence>
              {sent && (
                <motion.p className="form-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  WhatsApp opened with your details — just press send.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- footer ---------------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src={asset('img/logo-bt.png')} alt="Black Tiger Security Service" />
            <p className="muted" style={{ maxWidth: 320, margin: 0 }}>
              {COMPANY.name}. Goa’s largest network of security operations — protecting people, property and events since {COMPANY.since}.
            </p>
            <div className="socials">
              <a href={COMPANY.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Icon.facebook />
              </a>
              <a href={COMPANY.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Icon.instagram />
              </a>
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Icon.whatsapp />
              </a>
            </div>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Reach us</h5>
            <ul>
              <li>
                <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li className="muted">{COMPANY.address}</li>
            </ul>
          </div>
        </div>
        <motion.div className="footer-word" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
          Black Tiger
        </motion.div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
          <span>{COMPANY.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
