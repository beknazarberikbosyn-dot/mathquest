import type { SceneKind, Step } from '../types'

const BY_JOB: Record<string, SceneKind> = {
  architect: 'building',
  builder: 'building',
  engineer: 'lab',
  electrician: 'building',
  sailor: 'sea',
  baker: 'kitchen',
  chef: 'kitchen',
  barista: 'kitchen',
  vet: 'clinic',
  doctor: 'clinic',
  nurse: 'clinic',
  pharma: 'clinic',
  farmer: 'farm',
  gardener: 'farm',
  florist: 'farm',
  cashier: 'shop',
  seller: 'shop',
  driver: 'road',
  courier: 'road',
  logistics: 'road',
  pilot: 'sky',
  athlete: 'field',
  banker: 'bank',
  coder: 'lab',
  gamedev: 'lab',
  photo: 'studio',
  designer: 'studio',
  tailor: 'studio',
  musician: 'studio',
  weather: 'sky',
  scientist: 'lab',
  reporter: 'shop',
}

const HINTS: Array<[RegExp, SceneKind]> = [
  [/ramp|пандус/, 'ramp'],
  [/lighthouse|маяк|каспи/, 'lighthouse'],
  [/shadow|тень |байконур|байқоңыр/, 'shadow'],
  [/roof|крыш|фронтон|стропил|шатыр/, 'roof'],
  [/ladder|лестниц|баспалдақ/, 'ramp'],
  [/pool|бассейн|аквариум|цистерн/, 'pool'],
  [/план школы|масштаб|коридор|-map/, 'plan'],
  [/yurt|юрт|киіз|шанырак|шаңырак|этноаул/, 'yurt'],
  [/мост|арка |көпір|-arch/, 'bridge'],
  [/baiterek|байтерек|бәйтерек/, 'building'],
  [/газон|гряд|забор|қоршау|клумб/, 'farm'],
  [/траектори|парабол|график|производн/, 'lab'],
  [/ветра|ветром|самолёт|ұшақ|топлив|отын/, 'sky'],
]

export function resolveScene(profession: string, missionId: string, story: string, visual?: Step['visual']): SceneKind {
  if (visual?.scene) return visual.scene
  const blob = `${missionId} ${story}`.toLowerCase()
  for (const [re, kind] of HINTS) {
    if (re.test(blob)) return kind
  }
  return BY_JOB[profession] ?? 'shop'
}

export function storyFacts(text: string): string[] {
  const hits = text.match(
    /\d+(?:[ \u00a0]?\d{3})*(?:[.,]\d+)?(?:\s*(?:₸|м³|м²|см³|км\/ч|км\/сағ|km\/h|км|см|мм|м|m³|m²|cm|km|m|л|L|с|s|ч|h|%|°|кг|kg|г|мин|min|дюйм|in))\b|\d+(?:[ \u00a0]?\d{3})*(?:[.,]\d+)?/gi,
  )
  if (!hits) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of hits) {
    const v = raw.replace(/\s+/g, ' ').trim()
    if (!v || seen.has(v)) continue
    seen.add(v)
    out.push(v)
    if (out.length >= 6) break
  }
  return out
}
