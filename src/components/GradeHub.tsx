import { gradeByNumber } from '../data/curriculum'
import { profession } from '../data/professions'
import { useI18n } from '../i18n'
import type { Save } from '../types'

export function GradeHub({
  save,
  grade,
  onPlay,
}: {
  save: Save
  grade: number
  onPlay: (missionId: string) => void
}) {
  const { t, tx } = useI18n()
  const g = gradeByNumber(grade)
  if (!g) return null

  return (
    <div className="wrap">
      <div className="section-head">
        <h2>
          {t('gradeN', { n: g.grade })} — {tx(g.world)}
        </h2>
        <p>{t('topics')}</p>
      </div>
      <div className="topics">
        {g.topics.map((topic) => (
          <article key={topic.id} className="panel topic">
            <h3>{tx(topic.title)}</h3>
            <p className="lede">{tx(topic.blurb)}</p>
            <div className="quests">
              {topic.missions.map((mission, i) => {
                const prev = i === 0 ? true : (save.stars[topic.missions[i - 1].id] ?? 0) > 0
                const stars = save.stars[mission.id] ?? 0
                const job = profession(mission.profession)
                return (
                  <button
                    key={mission.id}
                    className={prev ? 'quest' : 'quest locked'}
                    disabled={!prev}
                    onClick={() => prev && onPlay(mission.id)}
                    title={prev ? undefined : t('locked')}
                  >
                    <span className="badge" style={{ background: job.hue + '33' }}>
                      {job.emoji}
                    </span>
                    <span>
                      <b>{tx(mission.title)}</b>
                      <div className="lede" style={{ margin: 0, fontSize: '0.92rem' }}>
                        {tx(job.name)}
                      </div>
                    </span>
                    <span className="stars">{stars ? '★'.repeat(stars) : prev ? t('play') : '🔒'}</span>
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
