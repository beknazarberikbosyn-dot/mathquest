import type { Lang, Save } from './types'

const KEY = 'mathquest-save-v1'

export const AVATARS = [
  { id: 0, emoji: '🦊', name: { ru: 'Арыстанбай', kk: 'Арыстанбай', en: 'Fox' } },
  { id: 1, emoji: '🦉', name: { ru: 'Үкі', kk: 'Үкі', en: 'Owl' } },
  { id: 2, emoji: '🐺', name: { ru: 'Бөрі', kk: 'Бөрі', en: 'Wolf' } },
  { id: 3, emoji: '🦅', name: { ru: 'Бүркіт', kk: 'Бүркіт', en: 'Eagle' } },
]

export function todayStamp() {
  return new Date().toISOString().slice(0, 10)
}

export function emptySave(): Save {
  return {
    name: '',
    avatar: 0,
    lang: 'ru',
    xp: 0,
    streak: 0,
    lastDay: '',
    stars: {},
    attempts: {},
  }
}

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptySave()
    return { ...emptySave(), ...(JSON.parse(raw) as Partial<Save>) }
  } catch {
    return emptySave()
  }
}

export function writeSave(save: Save) {
  localStorage.setItem(KEY, JSON.stringify(save))
}

export function touchStreak(save: Save): Save {
  const today = todayStamp()
  if (save.lastDay === today) return save
  const y = new Date()
  y.setDate(y.getDate() - 1)
  const yesterday = y.toISOString().slice(0, 10)
  const streak = save.lastDay === yesterday ? save.streak + 1 : 1
  return { ...save, streak, lastDay: today }
}

export function levelOf(xp: number) {
  return Math.floor(xp / 120) + 1
}

export function xpIntoLevel(xp: number) {
  return xp % 120
}

export function isLang(v: string): v is Lang {
  return v === 'ru' || v === 'kk' || v === 'en'
}
