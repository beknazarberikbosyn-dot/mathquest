import { useState } from 'react'
import { useI18n } from '../i18n'
import { AVATARS } from '../storage'
import type { Save } from '../types'

export function Home({
  save,
  onStart,
}: {
  save: Save
  onStart: (name: string, avatar: number) => void
}) {
  const { t } = useI18n()
  const [name, setName] = useState(save.name)
  const [avatar, setAvatar] = useState(save.avatar)
  const [warn, setWarn] = useState('')

  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero-copy">
          <div className="kicker">{t('allGrades')}</div>
          <h1>{t('tag')}</h1>
          <p className="lede">{t('intro')}</p>
          <label className="field" htmlFor="hero-name">
            {t('name')}
          </label>
          <input
            id="hero-name"
            className="input"
            value={name}
            placeholder={t('namePh')}
            maxLength={24}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="field">{t('avatar')}</div>
          <div className="avatars">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                className={avatar === a.id ? 'avatar on' : 'avatar'}
                onClick={() => setAvatar(a.id)}
                aria-label={a.name.ru}
              >
                {a.emoji}
              </button>
            ))}
          </div>
          <p className="warn">{warn}</p>
          <button
            className="cta wide"
            onClick={() => {
              if (!name.trim()) {
                setWarn(t('emptyName'))
                return
              }
              onStart(name.trim(), avatar)
            }}
          >
            {save.name ? t('continue') : t('start')}
          </button>
        </div>
        <div className="hero-art" aria-hidden>
          <span className="star" style={{ top: 36, left: 40 }} />
          <span className="star" style={{ top: 80, left: 120 }} />
          <span className="star" style={{ top: 28, left: 210 }} />
          <span className="star" style={{ top: 130, left: 70 }} />
          <div className="moon" />
          <div className="island" />
        </div>
      </section>
    </div>
  )
}
