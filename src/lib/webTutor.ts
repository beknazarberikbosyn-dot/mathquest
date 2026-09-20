import type { Lang, Text } from '../types'
import { tx } from '../types'
import type { SkillDef } from '../data/skills'
import type { TutorProblem } from './problems'

type WikiHit = {
  title: string
  extract: string
  url: string
}

function wikiHost(lang: Lang) {
  if (lang === 'kk') return 'kk.wikipedia.org'
  if (lang === 'en') return 'en.wikipedia.org'
  return 'ru.wikipedia.org'
}

async function getJson(url: string, ms = 7000): Promise<unknown> {
  const ctrl = new AbortController()
  const t = window.setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error(String(res.status))
    return await res.json()
  } finally {
    window.clearTimeout(t)
  }
}

export async function fetchWikiContext(lang: Lang, query: string, grade: number): Promise<WikiHit | null> {
  const q = `${query} ${grade}`
  const langs: Lang[] = lang === 'en' ? ['en', 'ru'] : lang === 'kk' ? ['kk', 'ru', 'en'] : ['ru', 'en']
  for (const l of langs) {
    try {
      const host = wikiHost(l)
      const searchUrl =
        `https://${host}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}` +
        `&format=json&origin=*&utf8=1&srlimit=4`
      const data = (await getJson(searchUrl)) as {
        query?: { search?: Array<{ title: string }> }
      }
      const title = data.query?.search?.[0]?.title
      if (!title) continue
      const sumUrl = `https://${host}/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      const sum = (await getJson(sumUrl)) as {
        title?: string
        extract?: string
        content_urls?: { desktop?: { page?: string } }
      }
      const extract = (sum.extract ?? '').trim()
      if (extract.length < 40) continue
      return {
        title: sum.title ?? title,
        extract: extract.slice(0, 900),
        url: sum.content_urls?.desktop?.page ?? `https://${host}/wiki/${encodeURIComponent(title)}`,
      }
    } catch {
      continue
    }
  }
  return null
}

function asText(v: unknown, fallback: string): Text {
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    const ru = typeof o.ru === 'string' && o.ru.trim() ? o.ru.trim() : fallback
    const kk = typeof o.kk === 'string' && o.kk.trim() ? o.kk.trim() : ru
    const en = typeof o.en === 'string' && o.en.trim() ? o.en.trim() : ru
    return { ru, kk, en }
  }
  if (typeof v === 'string' && v.trim()) {
    const s = v.trim()
    return tx(s, s, s)
  }
  return tx(fallback, fallback, fallback)
}

function parseProblemJson(raw: string, skill: SkillDef, grade: number, difficulty: number, wiki: WikiHit | null): TutorProblem | null {
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start < 0 || end <= start) return null
  try {
    const obj = JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>
    const answer = Number(obj.answer)
    if (!Number.isFinite(answer) || Math.abs(answer) > 1e8) return null
    const question = asText(obj.question, '')
    if (question.ru.length < 8) return null
    const tolerance = Number(obj.tolerance)
    return {
      id: `web-${Date.now().toString(36)}`,
      skill: skill.id,
      grade,
      difficulty,
      source: 'web',
      sourceLabel: wiki
        ? tx(`Википедия: ${wiki.title}`, `Уикипедия: ${wiki.title}`, `Wikipedia: ${wiki.title}`)
        : tx('Пример из сети (ИИ)', 'Желіден мысал (ИИ)', 'Web example (AI)'),
      sourceUrl: wiki?.url,
      story: asText(obj.story, wiki?.extract.slice(0, 220) ?? question.ru),
      question,
      hint: asText(obj.hint, 'Вспомни определение и формулу темы.'),
      explain: asText(obj.explain, wiki?.extract.slice(0, 280) ?? ''),
      unit: obj.unit ? asText(obj.unit, '') : undefined,
      answer: {
        kind: 'number',
        value: answer,
        tolerance: Number.isFinite(tolerance) && tolerance > 0 ? tolerance : Math.max(0.01, Math.abs(answer) * 0.01),
      },
    }
  } catch {
    return null
  }
}

async function askPollinations(prompt: string): Promise<string | null> {
  const body = JSON.stringify({
    model: 'openai',
    jsonMode: true,
    messages: [
      {
        role: 'system',
        content:
          'You generate school math problems. Reply with JSON only. Answers must be a single finite number. Difficulty must match the grade: grade 10 is trigonometry/logs/sequences, not 3rd-grade multiplication. Never put the numeric answer inside the question text.',
      },
      { role: 'user', content: prompt },
    ],
  })
  const urls = ['https://text.pollinations.ai/openai', 'https://gen.pollinations.ai/v1/chat/completions']
  for (const url of urls) {
    try {
      const ctrl = new AbortController()
      const t = window.setTimeout(() => ctrl.abort(), 9000)
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: ctrl.signal,
      })
      window.clearTimeout(t)
      if (!res.ok) continue
      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>
        content?: string
      }
      const text = data.choices?.[0]?.message?.content ?? data.content
      if (typeof text === 'string' && text.includes('{')) return text
    } catch {
      continue
    }
  }
  return null
}

export async function tryWebProblem(
  skill: SkillDef,
  grade: number,
  difficulty: number,
  lang: Lang,
): Promise<{ problem: TutorProblem | null; wiki: WikiHit | null }> {
  const wiki = await fetchWikiContext(lang, skill.wiki[lang] || skill.wiki.ru, grade)
  const prompt = [
    `Grade: ${grade} (ages roughly ${6 + grade}–${7 + grade}). Skill: ${skill.title.en} / ${skill.title.ru}.`,
    `Difficulty 1-5: ${difficulty}.`,
    `Write ONE original numeric problem at this grade. A pupil two grades below must NOT be able to solve it by only multiplying or dividing two given numbers.`,
    wiki ? `Use this encyclopedia extract as flavour, not as a copied exercise:\n${wiki.extract}` : '',
    `JSON keys: story:{ru,kk,en}, question:{ru,kk,en}, hint:{ru,kk,en}, explain:{ru,kk,en}, answer (number), tolerance (number), unit?:{ru,kk,en}.`,
    `story is a short real-life setup. question asks for one number. hint does not contain the final answer.`,
  ]
    .filter(Boolean)
    .join('\n')
  const raw = await askPollinations(prompt)
  if (!raw) return { problem: null, wiki }
  return { problem: parseProblemJson(raw, skill, grade, difficulty, wiki), wiki }
}
