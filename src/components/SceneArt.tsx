import type { ReactNode } from 'react'
import type { SceneKind, SceneMark, Step, Text } from '../types'

type Labels = Partial<Record<keyof SceneMark, string>>

function Tag({ x, y, text, rotate = 0 }: { x: number | string; y: number | string; text: string; rotate?: number }) {
  const px = Number(x)
  const py = Number(y)
  const w = Math.max(46, text.length * 7.2 + 16)
  return (
    <g transform={`rotate(${rotate} ${px} ${py})`}>
      <rect x={px - w / 2} y={py - 11} width={w} height={20} rx={10} fill="#fff6e8" stroke="#161226" strokeWidth="1.6" />
      <text x={px} y={py + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#161226">
        {text}
      </text>
    </g>
  )
}

function Building({ hue, marks, baiterek }: { hue: string; marks?: Labels; baiterek?: boolean }) {
  const h = marks?.height
  const w = marks?.width
  return (
    <g>
      <rect x="0" y="148" width="320" height="72" fill="#2a9d8f" />
      <rect x="0" y="148" width="320" height="10" fill="#145e4a" />
      {baiterek ? (
        <g>
          <rect x="148" y="58" width="24" height="92" fill="#cfc8e8" />
          <path d="M140 150 L160 58 L180 150 Z" fill="#9aa3c7" />
          <circle cx="160" cy="52" r="22" fill="#e8a317" />
          <circle cx="152" cy="44" r="6" fill="#ffd36a" />
        </g>
      ) : (
        <g>
          <rect x="78" y="48" width="164" height="102" rx="6" fill={hue} />
          <rect x="78" y="48" width="164" height="14" fill="#16122622" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={92 + c * 36}
                y={70 + r * 24}
                width="22"
                height="16"
                rx="2"
                fill="#ffe9c7"
              />
            )),
          )}
          <rect x="142" y="118" width="36" height="32" fill="#161226" />
        </g>
      )}
      {h ? <Tag x="58" y="96" text={h} rotate={-90} /> : null}
      {w ? <Tag x="160" y="166" text={w} /> : null}
    </g>
  )
}

function Ramp({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="150" width="320" height="70" fill="#7cb342" />
      <rect x="168" y="54" width="120" height="96" fill="#7b6cf6" />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect key={`${r}-${c}`} x={184 + c * 44} y={66 + r * 24} width="28" height="16" rx="2" fill="#ffe9c7" />
        )),
      )}
      <rect x="212" y="118" width="28" height="32" fill="#161226" />
      <polygon points="28,150 168,150 168,54" fill="#d4c4a0" stroke="#161226" strokeWidth="2" />
      <path d="M168 54 L168 150" stroke="#161226" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M156 138 A12 12 0 0 1 168 150" fill="none" stroke="#d4523e" strokeWidth="2" />
      {marks?.hyp ? <Tag x="86" y="92" text={marks.hyp} rotate={-32} /> : null}
      {marks?.opp ? <Tag x="196" y="100" text={marks.opp} /> : null}
      {marks?.adj ? <Tag x="98" y="168" text={marks.adj} /> : null}
      {marks?.angle ? <Tag x="148" y="128" text={marks.angle} /> : null}
    </g>
  )
}

function Roof({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="160" width="320" height="60" fill="#7cb342" />
      <rect x="70" y="108" width="180" height="58" fill="#e8d5b0" />
      <polygon points="60,110 160,38 260,110" fill="#c44536" stroke="#161226" strokeWidth="2" />
      <rect x="148" y="128" width="28" height="38" fill="#161226" />
      {marks?.angle ? <Tag x="160" y="78" text={marks.angle} /> : null}
      {marks?.width ? <Tag x="160" y="178" text={marks.width} /> : null}
    </g>
  )
}

function Lighthouse({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="130" fill="#1b3a5c" />
      <rect x="0" y="130" width="320" height="90" fill="#1f6f8b" />
      <circle cx="56" cy="36" r="16" fill="#ffe6a3" />
      <rect x="210" y="46" width="36" height="96" fill="#fff6e8" />
      <rect x="210" y="62" width="36" height="16" fill="#d4523e" />
      <rect x="210" y="94" width="36" height="16" fill="#d4523e" />
      <polygon points="200,46 228,22 256,46" fill="#e8a317" />
      <ellipse cx="70" cy="148" rx="28" ry="10" fill="#163556" />
      <path d="M70 148 L228 46" stroke="#ffd36a" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M86 148 A18 18 0 0 0 102 136" fill="none" stroke="#ffd36a" strokeWidth="2" />
      {marks?.height ? <Tag x="268" y="90" text={marks.height} rotate={-90} /> : null}
      {marks?.width ? <Tag x="150" y="168" text={marks.width} /> : null}
      {marks?.angle ? <Tag x="108" y="132" text={marks.angle} /> : null}
    </g>
  )
}

function Shadow({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="150" fill="#f4c27a" />
      <circle cx="40" cy="36" r="22" fill="#ffd36a" />
      <rect x="0" y="150" width="320" height="70" fill="#c9b07a" />
      <rect x="70" y="118" width="10" height="32" fill="#161226" />
      <rect x="80" y="146" width="36" height="8" fill="#16122666" />
      <rect x="200" y="58" width="22" height="92" fill="#5c4d8a" />
      <rect x="222" y="142" width="70" height="10" fill="#16122666" />
      <path d="M70 118 L80 150 M200 58 L222 150" stroke="#d4523e" strokeWidth="1.5" strokeDasharray="3 3" />
      {marks?.height ? <Tag x="186" y="96" text={marks.height} /> : null}
      {marks?.width ? <Tag x="258" y="168" text={marks.width} /> : null}
      {marks?.opp ? <Tag x="64" y="100" text={marks.opp} /> : null}
      {marks?.adj ? <Tag x="98" y="168" text={marks.adj} /> : null}
    </g>
  )
}

function Shop({ hue, emoji, count }: { hue: string; emoji?: string; count?: number }) {
  const n = Math.min(count ?? 0, 12)
  return (
    <g>
      <rect x="20" y="30" width="280" height="150" rx="16" fill={hue} />
      <rect x="36" y="86" width="248" height="78" rx="8" fill="#fff6e8" />
      <rect x="36" y="86" width="248" height="14" fill="#16122622" />
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={52 + (i % 6) * 38} y={128 + Math.floor(i / 6) * 28} fontSize="22">
          {emoji ?? '🛍️'}
        </text>
      ))}
    </g>
  )
}

function Kitchen({ emoji, count }: { emoji?: string; count?: number }) {
  const n = Math.min(count ?? 8, 16)
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#f4e0c4" />
      <rect x="18" y="120" width="284" height="70" rx="8" fill="#c44536" />
      <rect x="40" y="40" width="90" height="70" rx="8" fill="#8a4a32" />
      <circle cx="85" cy="68" r="18" fill="#161226" />
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={130 + (i % 6) * 28} y={78 + Math.floor(i / 6) * 26} fontSize="20">
          {emoji ?? '🥖'}
        </text>
      ))}
    </g>
  )
}

function Clinic({ emoji, count }: { emoji?: string; count?: number }) {
  const n = Math.min(count ?? 6, 12)
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#e7f6fb" />
      <rect x="24" y="36" width="272" height="150" rx="14" fill="#fff" />
      <rect x="40" y="52" width="36" height="36" rx="8" fill="#d4523e" />
      <rect x="53" y="58" width="10" height="24" fill="#fff" />
      <rect x="46" y="65" width="24" height="10" fill="#fff" />
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={96 + (i % 6) * 34} y={128 + Math.floor(i / 6) * 32} fontSize="24">
          {emoji ?? '🐱'}
        </text>
      ))}
    </g>
  )
}

function Farm({ emoji, count }: { emoji?: string; count?: number }) {
  const n = Math.min(count ?? 6, 14)
  return (
    <g>
      <rect x="0" y="130" width="320" height="90" fill="#7cb342" />
      <polygon points="40,130 90,70 140,130" fill="#c44536" />
      <rect x="58" y="100" width="64" height="30" fill="#e8d5b0" />
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={150 + (i % 5) * 32} y={150 + Math.floor(i / 5) * 28} fontSize="22">
          {emoji ?? '🐥'}
        </text>
      ))}
    </g>
  )
}

function Road() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#8ecae6" />
      <rect x="0" y="110" width="320" height="80" fill="#4a4a4a" />
      <rect x="20" y="146" width="40" height="8" fill="#ffd36a" />
      <rect x="90" y="146" width="40" height="8" fill="#ffd36a" />
      <rect x="160" y="146" width="40" height="8" fill="#ffd36a" />
      <rect x="230" y="146" width="40" height="8" fill="#ffd36a" />
      <rect x="48" y="118" width="70" height="28" rx="8" fill="#e8a317" />
      <circle cx="64" cy="148" r="8" fill="#161226" />
      <circle cx="102" cy="148" r="8" fill="#161226" />
    </g>
  )
}

function Pool({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#cdeccd" />
      <polygon points="70,150 210,150 250,90 110,90" fill="#6ec6ff" stroke="#161226" strokeWidth="2" />
      <polygon points="210,150 250,90 250,130 210,190" fill="#1f6f8b" stroke="#161226" strokeWidth="2" />
      <polygon points="70,150 210,150 210,190 70,190" fill="#3d9ad1" stroke="#161226" strokeWidth="2" />
      {marks?.width ? <Tag x="160" y="178" text={marks.width} /> : null}
      {marks?.depth ? <Tag x="236" y="150" text={marks.depth} /> : null}
      {marks?.height ? <Tag x="86" y="118" text={marks.height} /> : null}
    </g>
  )
}

function Plan({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#d9ecff" />
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={`h${i}`}
          d={`M0 ${20 * i} H320`}
          stroke="#7bb6e8"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path key={`v${i}`} d={`M${20 * i} 0 V220`} stroke="#7bb6e8" strokeWidth="1" />
      ))}
      <rect x="60" y="50" width="200" height="120" fill="#fff8" stroke="#1f4e79" strokeWidth="3" />
      <rect x="80" y="70" width="70" height="44" fill="#7b6cf655" stroke="#1f4e79" />
      <rect x="170" y="70" width="70" height="80" fill="#e8a31755" stroke="#1f4e79" />
      {marks?.scale ? <Tag x="160" y="34" text={marks.scale} /> : null}
      {marks?.width ? <Tag x="160" y="186" text={marks.width} /> : null}
    </g>
  )
}

function Bridge({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="150" width="320" height="70" fill="#1f6f8b" />
      <path d="M40 150 Q160 40 280 150" fill="none" stroke="#90a4ae" strokeWidth="14" />
      <rect x="34" y="120" width="18" height="50" fill="#5c4d8a" />
      <rect x="268" y="120" width="18" height="50" fill="#5c4d8a" />
      {marks?.width ? <Tag x="160" y="168" text={marks.width} /> : null}
      {marks?.height ? <Tag x="160" y="70" text={marks.height} /> : null}
    </g>
  )
}

function Field() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#7cb342" />
      <ellipse cx="160" cy="120" rx="120" ry="70" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="160" cy="120" r="18" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="210" cy="88" r="10" fill="#e8a317" />
    </g>
  )
}

function Lab() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#1b1640" />
      <rect x="36" y="36" width="248" height="148" rx="12" fill="#0e0b1a" stroke="#6ec6ff" />
      <path d="M56 150 Q100 70 140 110 T220 80 T270 120" fill="none" stroke="#e8a317" strokeWidth="3" />
      <circle cx="140" cy="110" r="5" fill="#ffd36a" />
    </g>
  )
}

function Sea() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="110" fill="#6ec6ff" />
      <rect x="0" y="110" width="320" height="110" fill="#1f6f8b" />
      <polygon points="40,110 90,70 140,110" fill="#fff" />
      <rect x="70" y="86" width="8" height="36" fill="#161226" />
    </g>
  )
}

function Sky() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#6ec6ff" />
      <circle cx="60" cy="40" r="18" fill="#fff" />
      <circle cx="78" cy="40" r="14" fill="#fff" />
      <path d="M40 150 L120 110 L220 140 L280 90" fill="none" stroke="#fff" strokeWidth="4" />
      <polygon points="200,100 280,86 248,118" fill="#fff" />
    </g>
  )
}

function Bank() {
  return (
    <g>
      <rect x="0" y="160" width="320" height="60" fill="#7cb342" />
      <rect x="50" y="80" width="220" height="80" fill="#26a69a" />
      <polygon points="40,80 160,36 280,80" fill="#ffe9c7" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={74 + i * 44} y="100" width="22" height="60" fill="#fff6e8" />
      ))}
    </g>
  )
}

function Studio({ shapes }: { shapes?: Array<'circle' | 'square' | 'triangle' | 'rect'> }) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="220" fill="#efe6ff" />
      <rect x="30" y="40" width="260" height="140" rx="12" fill="#fff" />
      {(shapes && shapes.length ? shapes : ['square']).map((sh, i) => {
        const x = 70 + i * 80
        if (sh === 'circle') return <circle key={i} cx={x + 24} cy="110" r="28" fill="#e8a317" />
        if (sh === 'triangle') return <polygon key={i} points={`${x},138 ${x + 28},70 ${x + 56},138`} fill="#e8a317" />
        if (sh === 'rect') return <rect key={i} x={x} y="88" width="64" height="40" rx="6" fill="#e8a317" />
        return <rect key={i} x={x} y="82" width="52" height="52" rx="6" fill="#e8a317" />
      })}
    </g>
  )
}

function Yurt({ marks }: { marks?: Labels }) {
  return (
    <g>
      <rect x="0" y="140" width="320" height="80" fill="#c9b07a" />
      <ellipse cx="160" cy="150" rx="90" ry="24" fill="#e8d5b0" />
      <path d="M70 150 Q160 40 250 150" fill="#d4a84a" stroke="#8a5a00" strokeWidth="3" />
      <circle cx="160" cy="78" r="16" fill="#fff6e8" stroke="#8a5a00" strokeWidth="3" />
      {marks?.width ? <Tag x="160" y="178" text={marks.width} /> : null}
      {marks?.height ? <Tag x="54" y="110" text={marks.height} rotate={-90} /> : null}
    </g>
  )
}

function markText(v?: Text, lang: keyof Text = 'ru') {
  return v ? v[lang] : ''
}

export function SceneArt({
  scene,
  hue,
  visual,
  facts,
  missionId,
  lang,
}: {
  scene: SceneKind
  hue: string
  visual?: Step['visual']
  facts: string[]
  missionId: string
  lang: keyof Text
}) {
  const marks = visual?.marks
    ? {
        height: markText(visual.marks.height, lang),
        width: markText(visual.marks.width, lang),
        depth: markText(visual.marks.depth, lang),
        hyp: markText(visual.marks.hyp, lang),
        opp: markText(visual.marks.opp, lang),
        adj: markText(visual.marks.adj, lang),
        angle: markText(visual.marks.angle, lang),
        scale: markText(visual.marks.scale, lang),
      }
    : undefined
  const baiterek = /baiterek|байтерек|бәйтерек/.test(missionId)

  let art: ReactNode
  switch (scene) {
    case 'ramp':
      art = <Ramp marks={marks} />
      break
    case 'roof':
      art = <Roof marks={marks} />
      break
    case 'lighthouse':
      art = <Lighthouse marks={marks} />
      break
    case 'shadow':
      art = <Shadow marks={marks} />
      break
    case 'shop':
      art = (
        <Shop
          hue={hue}
          emoji={visual?.emoji ?? (visual?.kind === 'coins' ? '🪙' : '🛍️')}
          count={visual?.count}
        />
      )
      break
    case 'kitchen':
      art = <Kitchen emoji={visual?.emoji} count={visual?.count} />
      break
    case 'clinic':
      art = <Clinic emoji={visual?.emoji} count={visual?.count} />
      break
    case 'farm':
      art = <Farm emoji={visual?.emoji} count={visual?.count} />
      break
    case 'road':
      art = <Road />
      break
    case 'pool':
      art = <Pool marks={marks} />
      break
    case 'plan':
      art = <Plan marks={marks} />
      break
    case 'bridge':
      art = <Bridge marks={marks} />
      break
    case 'field':
      art = <Field />
      break
    case 'lab':
      art = <Lab />
      break
    case 'sea':
      art = <Sea />
      break
    case 'sky':
      art = <Sky />
      break
    case 'bank':
      art = <Bank />
      break
    case 'studio':
      art = <Studio shapes={visual?.shapes} />
      break
    case 'yurt':
      art = <Yurt marks={marks} />
      break
    default:
      art = <Building hue={hue} marks={marks} baiterek={baiterek} />
  }

  return (
    <div className="scene-art">
      <svg viewBox="0 0 320 220" className="scene-svg" role="img">
        <rect width="320" height="220" fill="#8ecae6" />
        {art}
      </svg>
      {facts.length && !visual?.marks ? (
        <div className="scene-facts">
          {facts.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
