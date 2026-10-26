import { Player } from '@remotion/player'
import { CCTV_WALL, CctvWall } from './CctvWall'
import { SHIELD_HUD, ShieldHud } from './ShieldHud'

// Loaded lazily so the Remotion runtime is not part of the first page load.
const common = { autoPlay: true, loop: true, controls: false, clickToPlay: false, acknowledgeRemotionLicense: true } as const

export function HudPlayer() {
  return (
    <Player
      {...common}
      component={ShieldHud}
      durationInFrames={SHIELD_HUD.durationInFrames}
      fps={SHIELD_HUD.fps}
      compositionWidth={SHIELD_HUD.width}
      compositionHeight={SHIELD_HUD.height}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export function CctvPlayer() {
  return (
    <Player
      {...common}
      component={CctvWall}
      durationInFrames={CCTV_WALL.durationInFrames}
      fps={CCTV_WALL.fps}
      compositionWidth={CCTV_WALL.width}
      compositionHeight={CCTV_WALL.height}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
