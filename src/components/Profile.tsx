import { GRADES, professionIdsUsed } from '../data/curriculum'
import { profession } from '../data/professions'
import { useI18n } from '../i18n'
import { AVATARS, levelOf } from '../storage'
import type { Save } from '../types'

export function Profile({
  save,
  onReset,
}: {
  save: Save
  onReset: () => void
}) {
  const { t, tx } = useI18n()
  const jobs = professionIdsUsed(save.stars)
  const avatar = AVATARS[save.avatar] ?? AVATARS[0]
  const totalMissions = GRADES.reduce(
    (n, g) => n + g.topics.reduce((m, t) => m + t.missions.length, 0),
    0,
  )
  const done = Object.values(save.stars).filter((s) => s > 0).length

  return (
    <div className="wrap">
      <section className="profile-card">
        <div className="kicker">{t('heroOf')}</div>
        <h2>
          {avatar.emoji} {save.name}
        </h2>
        <div className="stats">
          <div className="stat">
            <span>{t('level')}</span>
            <b>{levelOf(save.xp)}</b>
          </div>
          <div className="stat">
            <span>{t('xp')}</span>
            <b>{save.xp}</b>
          </div>
          <div className="stat">
            <span>{t('streak')}</span>
            <b>{save.streak}</b>
          </div>
          <div className="stat">
            <span>{t('done')}</span>
            <b>
              {done}/{totalMissions}
            </b>
          </div>
        </div>
        <h3 style={{ marginTop: 22 }}>{t('badges')}</h3>
        {jobs.length === 0 ? (
          <p className="lede">{t('noBadges')}</p>
        ) : (
          <div className="badges">
            {jobs.map((id) => {
              const p = profession(id)
              return (
                <span className="chip" key={id}>
                  {p.emoji} {tx(p.name)}
                </span>
              )
            })}
          </div>
        )}
        <button
          className="reset"
          onClick={() => {
            if (confirm(t('reset'))) onReset()
          }}
        >
          {t('reset')}
        </button>
      </section>
    </div>
  )
}
