import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = (p: P) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
})

export const Icon = {
  shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.4-4.6" />
    </svg>
  ),
  phone: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  mail: (p: P) => (
    <svg {...base(p)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  ),
  pin: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  arrow: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  arrowUp: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
  plus: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  check: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.2 2.4 2.4 4.8-5" />
    </svg>
  ),
  clock: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
  users: (p: P) => (
    <svg {...base(p)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
      <path d="M16 5.2a3 3 0 0 1 0 5.8M18 14.6c1.6.7 2.6 2.4 3 4.9" />
    </svg>
  ),
  eye: (p: P) => (
    <svg {...base(p)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  target: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  award: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
    </svg>
  ),
  hotel: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M2.5 21h19" />
      <path d="M7.5 8h1M11 8h1M7.5 11.5h1M11 11.5h1M7.5 15h1M11 15h1M9 21v-3h1.5v3" />
    </svg>
  ),
  temple: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 2.5v2M8 9l4-4.5L16 9M6 9h12M7 9v12M17 9v12M3 21h18M10 21v-5a2 2 0 0 1 4 0v5" />
    </svg>
  ),
  factory: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 21V11l5 3V11l5 3V11l5 3V4h3v17H3Z" />
      <path d="M7 18h2M12 18h2" />
    </svg>
  ),
  office: (p: P) => (
    <svg {...base(p)}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10.5 21v-2.5h3V21" />
    </svg>
  ),
  complex: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 21V8l6-4 6 4v13M15 12h6v9M2 21h20" />
      <path d="M7 11h4M7 14.5h4M7 18h4M17.5 15h1M17.5 18h1" />
    </svg>
  ),
  vip: (p: P) => (
    <svg {...base(p)}>
      <path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z" />
    </svg>
  ),
  event: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 20 9.5 5l9.5 9.5L4 20Z" />
      <path d="M14 3.5c.6 1.3.6 2.6 0 4M17 7c1.4-.4 2.7 0 3.5 1M18.5 2.5l.5 1.5M21 4.5l-1.3.8" />
    </svg>
  ),
  construction: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2.5 15h19v2.5h-19zM10 7.2V11M14 7.2V11" />
    </svg>
  ),
  retail: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  ),
  whatsapp: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3-.2-.31a8.2 8.2 0 1 1 6.97 3.82Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5l.37-.43c.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.66.31 2.8 2.8 0 0 0-.86 2.07 4.8 4.8 0 0 0 1 2.56c.13.16 1.75 2.67 4.24 3.75.6.25 1.06.4 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  ),
  facebook: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20 20 0 0 0 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z" />
    </svg>
  ),
  instagram: (p: P) => (
    <svg {...base(p)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
}

export type IconName = keyof typeof Icon
