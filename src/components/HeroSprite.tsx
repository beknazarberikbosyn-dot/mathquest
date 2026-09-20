type Gear =
  | 'hardhat'
  | 'chef'
  | 'medic'
  | 'cap'
  | 'straw'
  | 'flower'
  | 'band'
  | 'phones'
  | 'camera'
  | 'goggles'
  | 'beret'
  | 'scarf'
  | 'none'

const GEAR: Record<string, Gear> = {
  architect: 'hardhat',
  builder: 'hardhat',
  engineer: 'hardhat',
  electrician: 'hardhat',
  baker: 'chef',
  chef: 'chef',
  barista: 'chef',
  doctor: 'medic',
  nurse: 'medic',
  vet: 'medic',
  pharma: 'medic',
  sailor: 'cap',
  pilot: 'cap',
  driver: 'cap',
  courier: 'cap',
  logistics: 'cap',
  farmer: 'straw',
  gardener: 'straw',
  florist: 'flower',
  athlete: 'band',
  coder: 'phones',
  gamedev: 'phones',
  musician: 'phones',
  photo: 'camera',
  scientist: 'goggles',
  designer: 'beret',
  tailor: 'beret',
  weather: 'scarf',
}

export function HeroSprite({ profession, hue }: { profession: string; hue: string }) {
  const gear = GEAR[profession] ?? 'none'
  return (
    <svg className="hero-sprite" viewBox="0 0 120 168" aria-hidden>
      <ellipse cx="60" cy="158" rx="32" ry="7" fill="#16122622" />
      <path d="M42 156 L38 118 L82 118 L78 156 Z" fill="#2a2544" />
      <path d="M34 72 Q60 58 86 72 L90 118 Q60 128 30 118 Z" fill={hue} />
      <rect x="54" y="68" width="12" height="18" rx="3" fill="#fff6e8" opacity="0.55" />
      <circle cx="60" cy="48" r="26" fill="#f3d2b4" />
      <ellipse cx="50" cy="50" rx="3.2" ry="4" fill="#161226" />
      <ellipse cx="70" cy="50" rx="3.2" ry="4" fill="#161226" />
      <path d="M52 62 Q60 68 68 62" fill="none" stroke="#161226" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="56" r="5" fill="#f0a09055" />
      <circle cx="76" cy="56" r="5" fill="#f0a09055" />
      {gear === 'hardhat' ? (
        <g>
          <path d="M36 40 Q60 16 84 40 L80 44 Q60 30 40 44 Z" fill="#e8a317" />
          <rect x="30" y="38" width="60" height="7" rx="3" fill="#ffd36a" />
          <rect x="56" y="22" width="8" height="10" rx="1" fill="#ffd36a" />
        </g>
      ) : null}
      {gear === 'chef' ? (
        <g>
          <rect x="44" y="22" width="32" height="14" rx="4" fill="#fff" />
          <ellipse cx="60" cy="16" rx="22" ry="14" fill="#fff" />
          <ellipse cx="48" cy="14" rx="8" ry="8" fill="#fff6e8" />
          <ellipse cx="72" cy="12" rx="9" ry="8" fill="#fff6e8" />
        </g>
      ) : null}
      {gear === 'medic' ? (
        <g>
          <rect x="36" y="78" width="48" height="40" rx="8" fill="#fff" />
          <rect x="56" y="86" width="8" height="22" rx="2" fill="#d4523e" />
          <rect x="49" y="93" width="22" height="8" rx="2" fill="#d4523e" />
        </g>
      ) : null}
      {gear === 'cap' ? (
        <g>
          <path d="M30 42 Q60 16 90 42 L84 46 Q60 32 36 46 Z" fill="#1f4e79" />
          <rect x="18" y="40" width="50" height="7" rx="3" fill="#163556" />
        </g>
      ) : null}
      {gear === 'straw' ? (
        <g>
          <ellipse cx="60" cy="40" rx="40" ry="8" fill="#e8c36a" />
          <path d="M38 40 Q60 18 82 40" fill="#d4a84a" />
        </g>
      ) : null}
      {gear === 'flower' ? <text x="84" y="28" fontSize="20">🌷</text> : null}
      {gear === 'band' ? <rect x="34" y="36" width="52" height="10" rx="5" fill="#d4523e" /> : null}
      {gear === 'phones' ? (
        <g>
          <rect x="28" y="42" width="12" height="22" rx="6" fill="#161226" />
          <rect x="80" y="42" width="12" height="22" rx="6" fill="#161226" />
          <path d="M34 46 Q60 28 86 46" fill="none" stroke="#161226" strokeWidth="5" />
        </g>
      ) : null}
      {gear === 'camera' ? <text x="78" y="92" fontSize="22">📷</text> : null}
      {gear === 'goggles' ? (
        <g>
          <rect x="38" y="44" width="18" height="12" rx="4" fill="#4cc9f0aa" stroke="#161226" />
          <rect x="64" y="44" width="18" height="12" rx="4" fill="#4cc9f0aa" stroke="#161226" />
          <rect x="56" y="48" width="8" height="4" fill="#161226" />
        </g>
      ) : null}
      {gear === 'beret' ? <ellipse cx="58" cy="28" rx="28" ry="10" fill="#7b2d3b" /> : null}
      {gear === 'scarf' ? (
        <path d="M40 74 Q60 88 80 74 L86 118 L70 110 L64 86 Z" fill="#42a5f5" />
      ) : null}
    </svg>
  )
}
