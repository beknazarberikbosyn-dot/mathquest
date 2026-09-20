import { useMemo, useState, type CSSProperties } from 'react'
import { HeroSprite } from './HeroSprite'
import { SceneArt } from './SceneArt'
import { missionById } from '../data/curriculum'
import { profession } from '../data/professions'
import { useI18n } from '../i18n'
import { resolveScene, storyFacts } from '../lib/scene'
import { closeEnough, parseAnswer } from '../lib/math'
import type { Save } from '../types'

export function MissionPlay({
  save,
  missionId,
  onExit,
  onFinish,
}: {
  save: Save
  missionId: string
  onExit: () => void
  onFinish: (stars: number, xp: number) => void
}) {
  const { t, tx, lang } = useI18n()
  const found = useMemo(() => missionById(missionId), [missionId])
  const [step, setStep] = useState(0)
  const [raw, setRaw] = useState('')
  const [choice, setChoice] = useState<number | null>(null)
  const [hintOn, setHintOn] = useState(false)
  const [wrong, setWrong] = useState(0)
  const [ok, setOk] = useState(false)
  const [done, setDone] = useState(false)
  const [award, setAward] = useState({ stars: 3, xp: 0 })

  if (!found) return null
  const { mission, grade } = found
  const job = profession(mission.profession)
  const s = mission.steps[step]
  const last = step === mission.steps.length - 1
  const story = tx(s.story)
  const scene = resolveScene(mission.profession, mission.id, story, s.visual)
  const facts = storyFacts(story)

  const check = () => {
    let good = false
    if (s.answer.kind === 'number') {
      const n = parseAnswer(raw)
      good = n !== null && closeEnough(n, s.answer.value, s.answer.tolerance ?? 0.01)
    } else {
      good = choice === s.answer.correct
    }
    if (!good) {
      setWrong((w) => w + 1)
      setOk(false)
      return
    }
    setOk(true)
  }

  const advance = () => {
    if (!last) {
      setStep((n) => n + 1)
      setRaw('')
      setChoice(null)
      setHintOn(false)
      setOk(false)
      return
    }
    const stars = Math.max(1, 3 - wrong - (hintOn ? 1 : 0))
    const xp = Math.round(mission.xp * (stars / 3))
    setAward({ stars, xp })
    setDone(true)
    onFinish(stars, xp)
  }

  return (
    <div className="wrap">
      <article className="mission" style={{ ['--g']: job.hue } as CSSProperties}>
        <div className="mission-top">
          <span className="badge" style={{ background: '#fff3' }}>
            {job.emoji}
          </span>
          <div>
            <div style={{ opacity: 0.8, fontWeight: 800, fontSize: '0.82rem' }}>
              {t('gradeN', { n: grade.grade })} · {tx(job.name)} · {save.name}
            </div>
            <strong>{tx(mission.title)}</strong>
          </div>
          <button className="ghost" style={{ marginLeft: 'auto' }} onClick={onExit}>
            {t('back')}
          </button>
        </div>

        {done ? (
          <div className="done-card">
            <div className="burst">★</div>
            <h2>{t('great')}</h2>
            <p className="stars">{'★'.repeat(award.stars)}</p>
            <p>{t('gained', { n: award.xp })}</p>
            <button className="cta" onClick={onExit}>
              {t('home')}
            </button>
          </div>
        ) : (
          <div className="speech">
            <div className="scene-board">
              <div className="cast">
                <HeroSprite profession={mission.profession} hue={job.hue} />
                <div className="cast-talk">
                  <div className="cast-name">{tx(job.name)}</div>
                  <p className="cast-hi">
                    {save.name
                      ? t('castHiNamed', { name: save.name, job: tx(job.name) })
                      : t('castHi', { job: tx(job.name) })}{' '}
                    {t('castLook')}
                  </p>
                  <div className="bubble">{story}</div>
                </div>
              </div>
              <SceneArt
                scene={scene}
                hue={job.hue}
                visual={s.visual}
                facts={facts}
                missionId={mission.id}
                lang={lang}
              />
            </div>
            <h3 className="q">{tx(s.question)}</h3>
            {s.answer.kind === 'choice' ? (
              <div className="choices">
                {s.answer.options.map((opt, i) => (
                  <button
                    key={i}
                    className={choice === i ? 'choice on' : 'choice'}
                    onClick={() => {
                      setChoice(i)
                      setOk(false)
                    }}
                    disabled={ok}
                  >
                    {tx(opt)}
                  </button>
                ))}
              </div>
            ) : (
              <>
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
                      if (e.key === 'Enter') check()
                    }}
                  />
                  {s.unit ? <span className="unit">{tx(s.unit)}</span> : null}
                </div>
                {grade.grade <= 4 ? (
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
              </>
            )}
            <div className="row" style={{ marginTop: 16 }}>
              <button className="ghost" style={{ color: '#161226', borderColor: '#16122633' }} onClick={() => setHintOn(true)}>
                {t('hint')}
              </button>
              {!ok ? (
                <button className="cta" onClick={check}>
                  {t('check')}
                </button>
              ) : (
                <button className="cta" onClick={advance}>
                  {last ? t('finish') : t('next')}
                </button>
              )}
            </div>
            {hintOn ? <p className="why">{tx(s.hint)}</p> : null}
            {wrong > 0 && !ok ? <div className="feedback no">{t('wrong')}</div> : null}
            {ok ? (
              <div className="feedback ok">
                {t('correct')}
                <div className="why">
                  <b>{t('why')}. </b>
                  {tx(s.explain)}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </article>
    </div>
  )
}
