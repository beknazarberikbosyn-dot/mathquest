export type Lang = 'ru' | 'kk' | 'en'
export type Text = Record<Lang, string>

export type View = 'home' | 'world' | 'grade' | 'mission' | 'profile'

export type AnswerKind = 'number' | 'choice'

export type VisualKind = 'none' | 'items' | 'coins' | 'shapes' | 'bars'

export type SceneKind =
  | 'building'
  | 'ramp'
  | 'roof'
  | 'lighthouse'
  | 'shadow'
  | 'shop'
  | 'kitchen'
  | 'clinic'
  | 'farm'
  | 'road'
  | 'pool'
  | 'plan'
  | 'bridge'
  | 'field'
  | 'lab'
  | 'sea'
  | 'sky'
  | 'bank'
  | 'studio'
  | 'yurt'

export type SceneMark = {
  height?: Text
  width?: Text
  depth?: Text
  hyp?: Text
  opp?: Text
  adj?: Text
  angle?: Text
  scale?: Text
}

export type Step = {
  story: Text
  question: Text
  hint: Text
  explain: Text
  unit?: Text
  visual?: {
    kind?: VisualKind
    scene?: SceneKind
    emoji?: string
    count?: number
    shapes?: Array<'circle' | 'square' | 'triangle' | 'rect'>
    marks?: SceneMark
  }
  answer:
    | { kind: 'number'; value: number; tolerance?: number }
    | { kind: 'choice'; options: Text[]; correct: number }
}

export type Mission = {
  id: string
  profession: string
  title: Text
  xp: number
  steps: Step[]
}

export type Topic = {
  id: string
  title: Text
  blurb: Text
  missions: Mission[]
}

export type Grade = {
  grade: number
  title: Text
  world: Text
  color: string
  topics: Topic[]
}

export type Save = {
  name: string
  avatar: number
  lang: Lang
  xp: number
  streak: number
  lastDay: string
  stars: Record<string, number>
  attempts: Record<string, number>
}

export const tx = (ru: string, kk: string, en = ru): Text => ({ ru, kk, en })
