import { useCallback, useEffect, useRef, useState } from 'react'
import { skillsForGrade, skillById } from '../data/skills'
import { useI18n } from '../i18n'
import {
  adaptMessage,
  applyAttempt,
  enrichTips,
  gradeDifficulty,
  nextTutorProblem,
  TIPS_EVERY,
  weakestSkills,
} from '../lib/coach'
import { closeEnough, parseAnswer } from '../lib/math'
import type { TutorProblem } from '../lib/problems'
import { touchStreak } from '../storage'
import type { Save } from '../types'

export function Coach({
  save,
  setSave,
  grade,
  onGrade,
  focusSkill,
  onOpenTips,
}: {
  save: Save
  setSave: (fn: (s: Save) => Save) => void
  grade: number
  onGrade: (n: number) => void
  focusSkill?: string | null
  onOpenTips: () => void
}) {
  const { t, tx, lang } = useI18n()
  const [playing, setPlaying] = useState(Boolean(focusSkill))
  const [problem, setProblem] = useState<TutorProblem | null>(null)
  const [loading, setLoading] = useState(false)
  const [raw, setRaw] = useState('')
  const [hintOn, setHintOn] = useState(false)
  const [wrong, setWrong] = useState(0)
  const [ok, setOk] = useState(false)
  const [adapt, setAdapt] = useState<'up' | 'down' | null>(null)
  const [allowWeb, setAllowWeb] = useState(true)
  const coachRef = useRef(save.coach)
  coachRef.current = save.coach
  const webRef = useRef(allowWeb)
  webRef.current = allowWeb
  const langRef = useRef(lang)
  langRef.current = lang

  const diff = gradeDifficulty(save.coach, grade)
  const remain =
    save.coach.solved >= TIPS_EVERY && save.coach.solved % TIPS_EVERY === 0
      ? 0
      : TIPS_EVERY - (save.coach.solved % TIPS_EVERY)
  const weak = weakestSkills(save.coach, grade, 3)
  const skill = problem ? skillById(problem.skill) : focusSkill ? skillById(focusSkill) : null

  const load = useCallback(async () => {
    setLoading(true)
    setProblem(null)
    setRaw('')
    setHintOn(false)
    setWrong(0)
    setOk(false)
    setAdapt(null)
    try {
      const next = await nextTutorProblem({
        coach: coachRef.current,
        grade,
        lang: langRef.current,
        preferSkill: focusSkill,
        allowWeb: webRef.current,
      })
      setProblem(next.problem)
    } finally {
      setLoading(false)
    }
  }, [grade, focusSkill])

  useEffect(() => {
    if (!playing) return
    void load()
  }, [playing, load])

  const check = () => {
    if (!problem || problem.answer.kind !== 'number') return
    const n = parseAnswer(raw)
    const good = n !== null && closeEnough(n, problem.answer.value, problem.answer.tolerance ?? 0.01)
    if (!good) {
      setWrong((w) => w + 1)
      setOk(false)
      return
    }
    setOk(true)
    const prevDiff = gradeDifficulty(save.coach, grade)
    const firstTry = wrong === 0 && !hintOn
    const last = save.coach.attempts.filter((a) => a.grade === grade).slice(-2)
    let nextDiff = prevDiff
    if (firstTry && last.length >= 1 && last.every((a) => a.correct && a.mistakes === 0)) {
      nextDiff = Math.min(5, prevDiff + 1)
    }
    if (wrong >= 2) nextDiff = Math.max(1, prevDiff - 1)
    setAdapt(adaptMessage(prevDiff, nextDiff))
    const xp = Math.round(14 * problem.difficulty * (wrong === 0 ? 1 : 0.6))
    const prevUnread = save.coach.unreadTips
    const nextCoach = applyAttempt(save.coach, problem, wrong, hintOn)
    setSave((s) => touchStreak({ ...s, xp: s.xp + xp, coach: nextCoach }))
    if (nextCoach.unreadTips > prevUnread) {
      const fresh = nextCoach.tips.slice(0, nextCoach.unreadTips - prevUnread)
      void enrichTips(fresh, lang, grade).then((enriched) => {
        setSave((s) => ({
          ...s,
          coach: {
            ...s.coach,
            tips: [...enriched, ...s.coach.tips.filter((t0) => !enriched.some((e) => e.id === t0.id))].slice(0, 24),
          },
        }))
      })
    }
  }

  return (
    <div className="wrap">
      <div className="section-head">
        <h2>{t('coach')}</h2>
        <p>{t('coachIntro')}</p>
      </div>

      <section className="panel coach-panel">
        <div className="coach-toolbar">
          <label className="field" htmlFor="coach-grade" style={{ margin: 0 }}>
            {t('gradeN', { n: grade })}
          </label>
          <select
            id="coach-grade"
            className="input"
            style={{ width: 'auto', padding: '10px 12px' }}
            value={grade}
            onChange={(e) => onGrade(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {t('gradeN', { n })}
              </option>
            ))}
          </select>
          <span className="chip">{t('coachDiff', { n: diff })}</span>
          <span className="chip">{t('coachSolved', { n: save.coach.solved })}</span>
          <label className="chip">
            <input type="checkbox" checked={allowWeb} onChange={(e) => setAllowWeb(e.target.checked)} />
            {allowWeb ? t('coachSourceWeb') : t('skipWeb')}
          </label>
        </div>

        {!playing ? (
          <>
            <p className="lede">{t('coachTag')}</p>
            <h3>{t('coachWeak')}</h3>
            <div className="skills-row">
              {weak.map((s) => {
                const st = save.coach.skills[s.id]
                return (
                  <span className="chip" key={s.id}>
                    {s.emoji} {tx(s.title)}
                    {st ? ` · ${Math.round(st.rating)}` : ''}
                  </span>
                )
              })}
            </div>
            <p className="lede">
              {save.coach.solved < TIPS_EVERY
                ? t('coachUntilTips', { n: TIPS_EVERY - save.coach.solved })
                : save.coach.unreadTips
                  ? t('coachTipsReady')
                  : t('tipsLead')}
            </p>
            <div className="row" style={{ marginTop: 16 }}>
              <button className="cta" onClick={() => setPlaying(true)}>
                {t('coachStart')}
              </button>
              {save.coach.unreadTips ? (
                <button className="ghost" style={{ color: '#161226', borderColor: '#16122633' }} onClick={onOpenTips}>
                  {t('tips')}
                </button>
              ) : null}
            </div>
          </>
        ) : null}

        {playing && loading ? <p className="lede">{t('coachLoading')}</p> : null}

        {playing && problem ? (
          <article className="speech" style={{ padding: 0 }}>
            <div className="coach-meta">
              <span className="kicker">
                {skill?.emoji} {skill ? tx(skill.title) : problem.skill}
              </span>
              <span className="chip">
                {problem.source === 'web'
                  ? problem.sourceLabel
                    ? tx(problem.sourceLabel)
                    : t('coachSourceWeb')
                  : t('coachSourceBank')}
              </span>
              {problem.sourceUrl ? (
                <a className="chip" href={problem.sourceUrl} target="_blank" rel="noreferrer">
                  {t('coachOpenTheory')}
                </a>
              ) : null}
            </div>
            {adapt === 'up' ? <div className="feedback ok">{t('coachHarder')}</div> : null}
            {adapt === 'down' ? <div className="feedback no">{t('coachEasier')}</div> : null}
            <div className="bubble">{tx(problem.story)}</div>
            <h3 className="q">{tx(problem.question)}</h3>
            <div className="row">
              <input
                className="input"
                inputMode="decimal"
                value={raw}
                placeholder={t('answer')}
                disabled={ok}
                onChange={(e) => {
                  setRaw(e.target.value)
                  setOk(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !ok) check()
                }}
              />
              {problem.unit ? <span className="unit">{tx(problem.unit)}</span> : null}
            </div>
            {grade <= 4 ? (
              <div className="pad">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((k) => (
                  <button key={k} disabled={ok} onClick={() => setRaw((v) => v + k)}>
                    {k}
                  </button>
                ))}
                <button disabled={ok} onClick={() => setRaw((v) => v + '.')}>
                  .
                </button>
                <button disabled={ok} onClick={() => setRaw((v) => v + '0')}>
                  0
                </button>
                <button disabled={ok} onClick={() => setRaw('')}>
                  ⌫
                </button>
              </div>
            ) : null}
            <div className="row" style={{ marginTop: 16 }}>
              <button className="ghost" style={{ color: '#161226', borderColor: '#16122633' }} onClick={() => setHintOn(true)}>
                {t('hint')}
              </button>
              {!ok ? (
                <button className="cta" onClick={check}>
                  {t('check')}
                </button>
              ) : (
                <button className="cta" onClick={() => void load()}>
                  {t('coachNext')}
                </button>
              )}
            </div>
            {hintOn ? <p className="why">{tx(problem.hint)}</p> : null}
            {wrong > 0 && !ok ? <div className="feedback no">{t('wrong')}</div> : null}
            {ok ? (
              <div className="feedback ok">
                {t('correct')}
                <div className="why">
                  <b>{t('why')}. </b>
                  {tx(problem.explain)}
                </div>
              </div>
            ) : null}
            {save.coach.unreadTips ? (
              <p className="lede" style={{ marginTop: 14 }}>
                {t('coachTipsReady')}{' '}
                <button className="ghost" style={{ color: '#161226', borderColor: '#16122633' }} onClick={onOpenTips}>
                  {t('tips')}
                </button>
              </p>
            ) : save.coach.solved < TIPS_EVERY ? (
              <p className="lede" style={{ marginTop: 14 }}>
                {t('coachUntilTips', { n: remain || TIPS_EVERY })}
              </p>
            ) : null}
          </article>
        ) : null}

        {!playing ? (
          <div className="skills-grid">
            {skillsForGrade(grade).map((s) => (
              <div key={s.id} className="topic" style={{ marginTop: 10 }}>
                <h3>
                  {s.emoji} {tx(s.title)}
                </h3>
                <p className="lede">{tx(s.blurb)}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  )
}
