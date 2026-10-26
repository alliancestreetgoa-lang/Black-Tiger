import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { asset } from '../asset'

// Simulated live CCTV wall, rendered live by @remotion/player in the command-centre section.
export const CCTV_WALL = { width: 1600, height: 1000, fps: 30, durationInFrames: 300 }

const FEEDS = [
  { src: asset('img/svc-guarding.jpg'), cam: 'CAM 01 · MAIN GATE' },
  { src: asset('img/svc-hotel.jpg'), cam: 'CAM 02 · HOTEL LOBBY' },
  { src: asset('img/svc-events.jpg'), cam: 'CAM 03 · EVENT ENTRY' },
  { src: asset('img/svc-retail.jpg'), cam: 'CAM 04 · SHOWROOM' },
  { src: asset('img/svc-patrol.jpg'), cam: 'CAM 05 · PATROL UNIT' },
  { src: asset('img/svc-equipment.jpg'), cam: 'CAM 06 · SCREENING' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export const CctvWall: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()
  const secs = Math.floor(frame / fps)
  const t = 22 * 3600 + 47 * 60 + 12 + secs
  const clock = `${pad(Math.floor(t / 3600) % 24)}:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}`
  const active = Math.floor(frame / 50) % FEEDS.length
  const recOn = Math.floor(frame / 15) % 2 === 0
  const W = 1600 / 3
  const H = 1000 / 2

  return (
    <AbsoluteFill style={{ background: '#000', fontFamily: 'Saira, ui-monospace, monospace' }}>
      {FEEDS.map((f, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const zoom = 1.12 + Math.sin((frame / durationInFrames) * Math.PI * 2 + i * 1.3) * 0.06
        const panX = Math.sin((frame / durationInFrames) * Math.PI * 2 + i) * 14
        const isActive = i === active
        const local = frame % 50
        const boxO = isActive ? interpolate(local, [0, 6, 44, 50], [0, 1, 1, 0]) : 0
        return (
          <div
            key={f.cam}
            style={{
              position: 'absolute',
              left: col * W,
              top: row * H,
              width: W,
              height: H,
              overflow: 'hidden',
              borderRight: '3px solid #000',
              borderBottom: '3px solid #000',
            }}
          >
            <Img
              src={f.src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${zoom}) translateX(${panX}px)`,
                filter: `grayscale(${isActive ? 0.15 : 0.75}) contrast(1.1) brightness(${isActive ? 0.95 : 0.7})`,
              }}
            />
            {/* scanlines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 2px, transparent 2px 4px)',
                mixBlendMode: 'multiply',
              }}
            />
            {/* label */}
            <div style={{ position: 'absolute', left: 16, top: 12, color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: 2, textShadow: '0 1px 4px #000' }}>
              {f.cam}
            </div>
            <div style={{ position: 'absolute', right: 16, bottom: 12, color: '#fff', fontSize: 18, letterSpacing: 2, textShadow: '0 1px 4px #000' }}>
              {clock}
            </div>
            {/* motion detection box */}
            <div
              style={{
                position: 'absolute',
                left: '38%',
                top: '30%',
                width: '26%',
                height: '46%',
                border: '3px solid #ff2a33',
                opacity: boxO,
                boxShadow: '0 0 20px rgba(255,42,51,0.6)',
              }}
            >
              <span style={{ position: 'absolute', top: -30, left: -3, background: '#ff2a33', color: '#fff', fontSize: 15, fontWeight: 700, padding: '3px 8px', letterSpacing: 1 }}>
                TRACKING
              </span>
            </div>
            {isActive && <div style={{ position: 'absolute', inset: 0, border: '4px solid #ff2a33' }} />}
          </div>
        )
      })}
      {/* REC badge */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(0,0,0,0.75)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 30,
          padding: '8px 18px',
          color: '#fff',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 7, background: recOn ? '#ff2a33' : '#400', boxShadow: recOn ? '0 0 14px #ff2a33' : 'none' }} />
        LIVE · BLACK TIGER COMMAND
      </div>
      {/* logo watermark */}
      <Img src={asset('img/logo-dark.png')} style={{ position: 'absolute', right: 20, top: 14, width: 64, opacity: 0.9 }} />
      {/* vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 50%, transparent 60%, rgba(0,0,0,0.65))' }} />
    </AbsoluteFill>
  )
}
