import type { Grade } from '../types'
import { GRADES_1_4 } from './grades-1-4'
import { GRADES_5_8 } from './grades-5-8'
import { GRADES_9_12 } from './grades-9-12'

export const GRADES: Grade[] = [...GRADES_1_4, ...GRADES_5_8, ...GRADES_9_12]

export function gradeByNumber(n: number) {
  return GRADES.find((g) => g.grade === n) ?? null
}

export function missionById(id: string) {
  for (const g of GRADES) {
    for (const t of g.topics) {
      const m = t.missions.find((x) => x.id === id)
      if (m) return { grade: g, topic: t, mission: m }
    }
  }
  return null
}

export function topicProgress(stars: Record<string, number>, topicId: string, gradeNum: number) {
  const g = gradeByNumber(gradeNum)
  const topic = g?.topics.find((t) => t.id === topicId)
  if (!topic) return { done: 0, total: 0, stars: 0 }
  const total = topic.missions.length
  let done = 0
  let starSum = 0
  for (const m of topic.missions) {
    const s = stars[m.id] ?? 0
    if (s > 0) done += 1
    starSum += s
  }
  return { done, total, stars: starSum }
}

export function gradeProgress(stars: Record<string, number>, gradeNum: number) {
  const g = gradeByNumber(gradeNum)
  if (!g) return { done: 0, total: 0 }
  let done = 0
  let total = 0
  for (const t of g.topics) {
    for (const m of t.missions) {
      total += 1
      if ((stars[m.id] ?? 0) > 0) done += 1
    }
  }
  return { done, total }
}

export function professionIdsUsed(stars: Record<string, number>) {
  const ids = new Set<string>()
  for (const g of GRADES) {
    for (const t of g.topics) {
      for (const m of t.missions) {
        if ((stars[m.id] ?? 0) > 0) ids.add(m.profession)
      }
    }
  }
  return [...ids]
}
