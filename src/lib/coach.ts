import { skillById, skillsForGrade, type SkillDef } from '../data/skills'
import type { CoachAttempt, CoachState, CoachTip, Lang } from '../types'
import { tx } from '../types'
import { clamp } from './math'
import { generateBankProblem, type TutorProblem } from './problems'
import { makeRng } from './rng'
import { fetchWikiContext, tryWebProblem } from './webTutor'

export const TIPS_EVERY = 5

export function gradeDifficulty(coach: CoachState, grade: number) {
  return clamp(coach.difficulty[String(grade)] ?? 2, 1, 5)
}

export function skillStat(coach: CoachState, id: string) {
  return coach.skills[id] ?? { rating: 48, seen: 0, correct: 0, wrong: 0, streak: 0 }
}

export function pickSkill(coach: CoachState, grade: number, prefer?: string | null): SkillDef {
  if (prefer) {
    const s = skillById(prefer)
    if (s) return s
  }
  const pool = skillsForGrade(grade)
  if (!pool.length) return skillsForGrade(7)[0]!
  const last = coach.attempts[coach.attempts.length - 1]
  if (last && !last.correct && last.mistakes >= 2) {
    const cur = skillById(last.skill)
    const pre = cur?.prereq?.map(skillById).find((x) => x)
    if (pre) return pre
  }
  const ranked = [...pool].sort((a, b) => skillStat(coach, a.id).rating - skillStat(coach, b.id).rating)
  const roll = Math.random()
  if (roll < 0.55) return ranked[0]!
  if (roll < 0.8) return ranked[Math.min(ranked.length - 1, 1)]!
  return pool[Math.floor(Math.random() * pool.length)]!
}

export async function nextTutorProblem(opts: {
  coach: CoachState
  grade: number
  lang: Lang
  preferSkill?: string | null
  allowWeb?: boolean
}): Promise<{ problem: TutorProblem; wikiUrl?: string }> {
  const skill = pickSkill(opts.coach, opts.grade, opts.preferSkill)
  const difficulty = gradeDifficulty(opts.coach, opts.grade)
  if (opts.allowWeb !== false) {
    try {
      const web = await tryWebProblem(skill, opts.grade, difficulty, opts.lang)
      if (web.problem) return { problem: web.problem, wikiUrl: web.wiki?.url }
    } catch {
      /* bank fallback */
    }
  }
  const problem = generateBankProblem(skill.id, opts.grade, difficulty, makeRng())
  return { problem }
}

export function applyAttempt(coach: CoachState, problem: TutorProblem, mistakes: number, hint: boolean): CoachState {
  const correct = true
  const skill = skillStat(coach, problem.skill)
  const firstTry = mistakes === 0 && !hint
  let rating = skill.rating
  let streak = skill.streak
  if (firstTry) {
    rating += 10 + problem.difficulty
    streak += 1
  } else if (mistakes === 0 && hint) {
    rating += 4
    streak = 0
  } else if (mistakes === 1) {
    rating += 1
    streak = 0
  } else {
    rating -= 8 + mistakes * 2
    streak = 0
  }
  rating = clamp(rating, 0, 100)

  let diff = gradeDifficulty(coach, problem.grade)
  const lastSameGrade = coach.attempts.filter((a) => a.grade === problem.grade).slice(-2)
  if (firstTry && lastSameGrade.length >= 1 && lastSameGrade.every((a) => a.correct && a.mistakes === 0)) {
    diff = clamp(diff + 1, 1, 5)
  }
  if (mistakes >= 2) {
    diff = clamp(diff - 1, 1, 5)
  }

  const attempt: CoachAttempt = {
    skill: problem.skill,
    grade: problem.grade,
    difficulty: problem.difficulty,
    correct,
    mistakes,
    hint,
    source: problem.source,
    at: new Date().toISOString(),
  }

  const solved = coach.solved + 1
  const skills = {
    ...coach.skills,
    [problem.skill]: {
      rating,
      seen: skill.seen + 1,
      correct: skill.correct + 1,
      wrong: skill.wrong + mistakes,
      streak,
    },
  }
  let tips = coach.tips
  let unreadTips = coach.unreadTips
  if (solved >= TIPS_EVERY && solved % TIPS_EVERY === 0) {
    const built = buildTips({ ...coach, skills, solved, attempts: [...coach.attempts, attempt] }, problem.grade)
    tips = [...built, ...coach.tips].slice(0, 24)
    unreadTips += built.length
  }

  return {
    ...coach,
    lastGrade: problem.grade,
    difficulty: { ...coach.difficulty, [String(problem.grade)]: diff },
    skills,
    attempts: [...coach.attempts, attempt].slice(-80),
    tips,
    unreadTips,
    solved,
  }
}

export function markTipsRead(coach: CoachState): CoachState {
  return { ...coach, unreadTips: 0 }
}

export function weakestSkills(coach: CoachState, grade: number, n = 3): SkillDef[] {
  const pool = skillsForGrade(grade)
  return [...pool]
    .sort((a, b) => {
      const sa = skillStat(coach, a.id)
      const sb = skillStat(coach, b.id)
      const wa = sa.seen === 0 ? 40 : sa.rating - sa.wrong * 2
      const wb = sb.seen === 0 ? 40 : sb.rating - sb.wrong * 2
      return wa - wb
    })
    .slice(0, n)
}

export function buildTips(coach: CoachState, grade: number): CoachTip[] {
  const weak = weakestSkills(coach, grade, 3)
  const now = new Date().toISOString()
  return weak.map((s, i) => {
    const st = skillStat(coach, s.id)
    const hard = gradeDifficulty(coach, grade)
    const title = s.title
    const body =
      st.wrong > st.correct
        ? tx(
            `По ${s.title.ru} много ошибок. Не спеши: выпиши формулу, подставь числа, проверь единицы. Сложность сейчас ${hard}/5 — если снова ошибёшься, задачи станут проще.`,
            `${s.title.kk} бойынша қате көп. Асықпа: формуланы жаз, санды қой, бірлікті тексер. Қиындық қазір ${hard}/5 — тағы қателессең, есептер жеңілдейді.`,
            `Lots of misses on ${s.title.en}. Slow down: write the formula, plug in numbers, check units. Difficulty is ${hard}/5 — miss again and tasks get easier.`,
          )
        : st.rating >= 70
          ? tx(
              `${s.title.ru} уже уверенно. Следующие задачи ИИ сделает ближе к верхней границе ${grade} класса — не к младшей школе.`,
              `${s.title.kk} сенімді. Келесі ИИ есептері ${grade}-сыныптың жоғарғы шегіне жақын болады — бастауышқа емес.`,
              `${s.title.en} is solid. The next AI tasks will sit at the top of grade ${grade} — not elementary school.`,
            )
          : tx(
              `Потренируй ${s.title.ru}: ${s.blurb.ru} После нескольких верных ответов тренер сам повысит сложность.`,
              `${s.title.kk} жаттықтыр: ${s.blurb.kk} Бірнеше дұрыс жауаптан кейін жаттықтырушы қиындықты өзі көтереді.`,
              `Drill ${s.title.en}: ${s.blurb.en} After a few correct answers the coach raises the difficulty.`,
            )
    const drill = tx(
      `Сделай ещё 3 задачи по теме «${s.title.ru}» без подсказки.`,
      `«${s.title.kk}» тақырыбына ишарасыз тағы 3 есеп шеш.`,
      `Solve 3 more problems on “${s.title.en}” without a hint.`,
    )
    return {
      id: `tip-${Date.now().toString(36)}-${i}`,
      skill: s.id,
      title,
      body,
      drill,
      createdAt: now,
    }
  })
}

export async function enrichTips(tips: CoachTip[], lang: Lang, grade: number): Promise<CoachTip[]> {
  const out: CoachTip[] = []
  for (const tip of tips) {
    if (tip.wikiExtract) {
      out.push(tip)
      continue
    }
    const skill = skillById(tip.skill)
    if (!skill) {
      out.push(tip)
      continue
    }
    try {
      const wiki = await fetchWikiContext(lang, skill.wiki[lang] || skill.wiki.ru, grade)
      out.push(
        wiki
          ? {
              ...tip,
              wikiTitle: wiki.title,
              wikiExtract: wiki.extract,
              wikiUrl: wiki.url,
            }
          : tip,
      )
    } catch {
      out.push(tip)
    }
  }
  return out
}

export function adaptMessage(prev: number, next: number): 'up' | 'down' | null {
  if (next > prev) return 'up'
  if (next < prev) return 'down'
  return null
}
