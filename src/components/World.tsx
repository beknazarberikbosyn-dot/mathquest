import type { CSSProperties } from 'react'
import { GRADES, gradeProgress } from '../data/curriculum'
import { useI18n } from '../i18n'
import type { Save } from '../types'

export function World({ save, onOpen }: { save: Save; onOpen: (grade: number) => void }) {
  const { t, tx } = useI18n()
  return (
    <div className="wrap">
      <div className="section-head">
        <h2>{t('worldTitle')}</h2>
        <p>{t('pickGrade')}</p>
      </div>
      <div className="world">
        {GRADES.map((g) => {
          const p = gradeProgress(save.stars, g.grade)
          const pct = p.total ? Math.round((p.done / p.total) * 100) : 0
          return (
            <button
              key={g.grade}
              className="island-card"
              style={{ ['--g']: g.color } as CSSProperties}
              onClick={() => onOpen(g.grade)}
            >
              <em>{tx(g.world)}</em>
              <strong>{t('gradeN', { n: g.grade })}</strong>
              <div className="bar">
                <i style={{ width: `${pct}%` }} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
