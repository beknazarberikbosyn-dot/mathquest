import { useEffect } from 'react'
import { skillById } from '../data/skills'
import { useI18n } from '../i18n'
import { markTipsRead, TIPS_EVERY } from '../lib/coach'
import type { Save } from '../types'

export function Tips({
  save,
  setSave,
  onPractice,
}: {
  save: Save
  setSave: (fn: (s: Save) => Save) => void
  onPractice: (grade: number, skill: string) => void
}) {
  const { t, tx, lang } = useI18n()
  const tips = save.coach.tips
  const locked = save.coach.solved < TIPS_EVERY || tips.length === 0

  useEffect(() => {
    if (!save.coach.unreadTips) return
    setSave((s) => (s.coach.unreadTips ? { ...s, coach: markTipsRead(s.coach) } : s))
  }, [save.coach.unreadTips, setSave])

  return (
    <div className="wrap">
      <div className="section-head">
        <h2>{t('tips')}</h2>
        <p>{t('tipsLead')}</p>
      </div>

      {locked ? (
        <section className="panel">
          <p className="lede">{t('tipsEmpty')}</p>
          <p className="lede">{t('coachUntilTips', { n: Math.max(1, TIPS_EVERY - save.coach.solved) })}</p>
        </section>
      ) : (
        <div className="topics">
          {tips.map((tip) => {
            const skill = skillById(tip.skill)
            return (
              <article key={tip.id} className="panel topic tip-card">
                <div className="kicker">
                  {skill?.emoji} {tx(tip.title)}
                </div>
                <p className="lede">{tx(tip.body)}</p>
                <p className="why">
                  <b>{t('tipsDrill')}. </b>
                  {tx(tip.drill)}
                </p>
                {tip.wikiExtract ? (
                  <blockquote className="wiki-extract">
                    <div className="cast-name">{t('tipsWiki')}</div>
                    {tip.wikiExtract}
                    {tip.wikiUrl ? (
                      <div>
                        <a href={tip.wikiUrl} target="_blank" rel="noreferrer">
                          {tip.wikiTitle ?? t('coachOpenTheory')}
                        </a>
                      </div>
                    ) : null}
                  </blockquote>
                ) : null}
                <button
                  className="cta"
                  style={{ marginTop: 12 }}
                  onClick={() => onPractice(save.coach.lastGrade, tip.skill)}
                >
                  {t('coachPracticeSkill')}
                </button>
                <div className="lede" style={{ marginTop: 8, fontSize: '0.85rem' }}>
                  {new Date(tip.createdAt).toLocaleDateString(lang === 'en' ? 'en' : lang === 'kk' ? 'kk' : 'ru')}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
