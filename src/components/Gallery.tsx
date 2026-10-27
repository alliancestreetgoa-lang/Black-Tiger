import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { asset } from '../asset'
import { GALLERY, GALLERY_FILTERS, type GalleryFilter, type GalleryItem } from '../data'
import { Icon } from './Icons'
import { ease, Reveal, SplitWords, useMedia } from './motion'

const thumb = (p: GalleryItem) => asset(p.video ? `img/gallery/video-${p.name}.jpg` : `img/gallery/${p.name}-sm.jpg`)
const full = (p: GalleryItem) => asset(`img/gallery/${p.name}.jpg`)
const clip = (p: GalleryItem) => asset(`img/gallery/video-${p.name}.mp4`)
const matches = (p: GalleryItem, f: GalleryFilter) => f === 'All' || (f === 'Videos' ? !!p.video : p.category === f)

/** Silent looping preview that only plays while it is on screen. */
function TileVideo({ p }: { p: GalleryItem }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <motion.video layoutId={`g-${p.name}`} ref={ref} src={clip(p)} poster={thumb(p)} muted loop playsInline preload="none" aria-label={p.caption} />
}

/** Masonry: drop each photo into the currently shortest column. */
function toColumns(photos: GalleryItem[], n: number) {
  const cols: GalleryItem[][] = Array.from({ length: n }, () => [])
  const heights = new Array(n).fill(0)
  for (const p of photos) {
    const i = heights.indexOf(Math.min(...heights))
    cols[i].push(p)
    heights[i] += p.h / p.w
  }
  return cols
}

function Tile({ p, index, onOpen }: { p: GalleryItem; index: number; onOpen: () => void }) {
  return (
    <motion.figure
      layout
      className="g-tile"
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease, delay: (index % 4) * 0.06 }}
    >
      <button type="button" onClick={onOpen} aria-label={`Open photo: ${p.caption}`} style={{ aspectRatio: `${p.w} / ${p.h}` }}>
        {p.video ? <TileVideo p={p} /> : <motion.img layoutId={`g-${p.name}`} src={thumb(p)} alt={p.caption} loading="lazy" decoding="async" />}
        <span className="g-shade" />
        {p.video && (
          <span className="g-play" aria-hidden>
            <Icon.play />
          </span>
        )}
        <span className="g-expand">
          <Icon.expand />
        </span>
        <figcaption>
          <small>{p.category}</small>
          {p.caption}
        </figcaption>
      </button>
    </motion.figure>
  )
}

function Column({ photos, start, y, onOpen }: { photos: GalleryItem[]; start: number; y: MotionValue<number> | number; onOpen: (p: GalleryItem) => void }) {
  return (
    <motion.div className="g-col" style={{ y }}>
      <AnimatePresence mode="popLayout">
        {photos.map((p, i) => (
          <Tile key={p.name} p={p} index={start + i} onOpen={() => onOpen(p)} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

function Lightbox({ list, index, setIndex }: { list: GalleryItem[]; index: number; setIndex: (i: number | null) => void }) {
  const p = list[index]
  const [dir, setDir] = useState(0)
  const go = useCallback(
    (d: number) => {
      setDir(d)
      setIndex((index + d + list.length) % list.length)
    },
    [index, list.length, setIndex],
  )
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [go, setIndex])

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={() => setIndex(null)}
    >
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <span className="lb-count">
          {String(index + 1).padStart(2, '0')} <i>/</i> {String(list.length).padStart(2, '0')}
        </span>
        <img className="lb-logo" src={asset('img/logo-mark.png')} alt="" />
        <button type="button" className="lb-btn" aria-label="Close" onClick={() => setIndex(null)}>
          <Icon.close />
        </button>
      </div>

      <div className="lb-stage">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={p.name}
            layoutId={`g-${p.name}`}
            className="lb-media"
            custom={dir}
            initial={dir ? { opacity: 0, x: dir * 120 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -120 }}
            transition={{ duration: 0.5, ease }}
            drag={p.video ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1)
              else if (info.offset.x > 70) go(-1)
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {p.video ? (
              <video className="lb-img" src={clip(p)} poster={thumb(p)} controls autoPlay playsInline aria-label={p.caption} />
            ) : (
              <img className="lb-img" src={full(p)} alt={p.caption} draggable={false} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <button type="button" className="lb-btn lb-prev" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), go(-1))}>
        <Icon.chevronLeft />
      </button>
      <button type="button" className="lb-btn lb-next" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), go(1))}>
        <Icon.chevronRight />
      </button>

      <motion.div key={p.name + '-cap'} className="lb-cap" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} onClick={(e) => e.stopPropagation()}>
        <small>{p.category}</small>
        {p.caption}
      </motion.div>
    </motion.div>
  )
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>('All')
  const [open, setOpen] = useState<number | null>(null)
  const four = useMedia('(min-width: 1101px)')
  const three = useMedia('(min-width: 701px)')
  const n = four ? 4 : three ? 3 : 2

  const list = useMemo(() => GALLERY.filter((p) => matches(p, filter)), [filter])
  const cols = useMemo(() => toColumns(list, n), [list, n])

  // columns drift at different speeds while the section scrolls past
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y0 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y1 = useTransform(scrollYProgress, [0, 1], [110, -110])
  const y2 = useTransform(scrollYProgress, [0, 1], [10, -10])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const drift = n === 2 ? [0, 0] : [y0, y1, y2, y3]

  let start = 0
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="gallery-head">
          <div>
            <Reveal>
              <span className="eyebrow">On duty</span>
            </Reveal>
            <h2 className="title">
              <SplitWords text="Real teams." />
              <br />
              <span className="red-text">
                <SplitWords text="Real deployments." delay={0.12} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="lead muted" style={{ maxWidth: 420, margin: 0 }}>
              Photos and videos of our officers at VIP visits, hotels, festivals, nightlife venues, weddings and corporate sites across Goa.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="g-filters" role="tablist" aria-label="Filter photos">
            {GALLERY_FILTERS.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
                {filter === f && <motion.span layoutId="g-pill" className="g-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span>{f}</span>
                <em>{GALLERY.filter((p) => matches(p, f)).length}</em>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="g-grid" ref={ref} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {cols.map((c, i) => {
            const s = start
            start += c.length
            return <Column key={`${n}-${i}`} photos={c} start={s} y={drift[i] ?? 0} onOpen={(p) => setOpen(list.indexOf(p))} />
          })}
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox list={list} index={open} setIndex={setOpen} />}</AnimatePresence>
    </section>
  )
}
