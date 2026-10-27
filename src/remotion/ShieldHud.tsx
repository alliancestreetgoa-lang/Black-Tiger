import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { asset } from '../asset'

// Looping "command HUD" around the Black Tiger shield, rendered live by @remotion/player.
export const SHIELD_HUD = { width: 1000, height: 1000, fps: 30, durationInFrames: 240 }

// pinned to the four corners so they always stay inside the frame
const LABELS = [
  { t: 'RESPONSE', s: '24 / 7', pos: { left: 24, top: 70 } },
  { t: 'PERIMETER', s: 'SECURE', pos: { right: 24, top: 70 } },
  { t: 'PATROL', s: 'ACTIVE', pos: { left: 24, bottom: 70 } },
  { t: 'CCTV', s: 'ONLINE', pos: { right: 24, bottom: 70 } },
]

export const ShieldHud: React.FC = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const c = 500
  const loop = (frame % durationInFrames) / durationInFrames
  const sweep = loop * 360 * 2
  const pulse = 1 + Math.sin(loop * Math.PI * 4) * 0.015
  const scanY = interpolate(frame % 120, [0, 119], [250, 760])
  const shine = interpolate(frame % 120, [0, 60, 120], [-60, 160, 160])

  return (
    <AbsoluteFill style={{ background: 'transparent' }}>
      <svg width="1000" height="1000" viewBox="0 0 1000 1000" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e3161f" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#e3161f" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff2a33" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff2a33" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle cx={c} cy={c} r={480} fill="url(#core)" />
        {/* outer tick ring */}
        <g transform={`rotate(${sweep / 6} ${c} ${c})`}>
          {Array.from({ length: 120 }).map((_, i) => {
            const long = i % 10 === 0
            const a = (i / 120) * Math.PI * 2
            const r1 = 470
            const r2 = long ? 440 : 456
            return (
              <line
                key={i}
                x1={c + Math.cos(a) * r1}
                y1={c + Math.sin(a) * r1}
                x2={c + Math.cos(a) * r2}
                y2={c + Math.sin(a) * r2}
                stroke={long ? '#ff2a33' : 'rgba(255,255,255,0.35)'}
                strokeWidth={long ? 3 : 1.5}
              />
            )
          })}
        </g>
        {/* dashed rings counter-rotating */}
        <circle
          cx={c}
          cy={c}
          r={400}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={2}
          strokeDasharray="4 14"
          transform={`rotate(${-sweep / 2} ${c} ${c})`}
        />
        <circle
          cx={c}
          cy={c}
          r={350}
          fill="none"
          stroke="rgba(227,22,31,0.55)"
          strokeWidth={3}
          strokeDasharray="120 40 20 40"
          transform={`rotate(${sweep / 2} ${c} ${c})`}
        />
        <circle cx={c} cy={c} r={300} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        {/* radar sweep wedge */}
        <g transform={`rotate(${sweep} ${c} ${c})`} opacity={0.9}>
          <path d={`M ${c} ${c} L ${c + 400} ${c} A 400 400 0 0 0 ${c + 400 * Math.cos(-0.6)} ${c + 400 * Math.sin(-0.6)} Z`} fill="url(#sweep)" />
          <line x1={c} y1={c} x2={c + 400} y2={c} stroke="#ff2a33" strokeWidth={2.5} />
        </g>
        {/* blips */}
        {[
          [0.12, 250, 0.6],
          [0.45, 330, 2.2],
          [0.71, 280, 4.1],
          [0.88, 370, 5.3],
        ].map(([phase, r, ang], i) => {
          const age = (loop * 2 + 1 - phase) % 0.5
          const o = interpolate(age, [0, 0.05, 0.45], [0, 1, 0], { extrapolateRight: 'clamp' })
          return <circle key={i} cx={c + Math.cos(ang) * r} cy={c + Math.sin(ang) * r} r={9} fill="#ff2a33" opacity={o} />
        })}
        {/* crosshair corners */}
        {[0, 90, 180, 270].map((deg) => (
          <path
            key={deg}
            d="M 500 70 l 0 40 M 480 90 l 40 0"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={2}
            transform={`rotate(${deg} ${c} ${c})`}
           
          />
        ))}
      </svg>

      {/* shield logo */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 430,
          transform: `translate(-50%, -50%) scale(${pulse})`,
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(227,22,31,0.25))',
          overflow: 'hidden',
          WebkitMaskImage: `url(${asset('img/logo-bt.png')})`,
          WebkitMaskSize: '100% 100%',
          maskImage: `url(${asset('img/logo-bt.png')})`,
          maskSize: '100% 100%',
        }}
      >
        <Img src={asset('img/logo-bt.png')} style={{ width: '100%', display: 'block' }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${shine}%`,
            width: '30%',
            background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)',
            transform: 'skewX(-18deg)',
          }}
        />
      </div>

      {/* scan line */}
      <div
        style={{
          position: 'absolute',
          left: 250,
          right: 250,
          top: scanY,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #ff2a33, transparent)',
          boxShadow: '0 0 18px #ff2a33',
          opacity: 0.8,
        }}
      />

      {/* status labels */}
      {LABELS.map((l, i) => {
        const blink = Math.floor(frame / 12 + i) % 2 === 0
        return (
          <div
            key={l.t}
            style={{
              position: 'absolute',
              ...l.pos,
              fontFamily: 'Saira, sans-serif',
              color: '#f4f5f7',
              background: 'rgba(6,7,8,0.82)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 10,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: blink ? '#ff2a33' : '#6b0a0f',
                boxShadow: blink ? '0 0 12px #ff2a33' : 'none',
              }}
            />
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>{l.t}</span>
            <span style={{ fontSize: 22, fontWeight: 500, color: '#ff4d55', letterSpacing: 2 }}>{l.s}</span>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
