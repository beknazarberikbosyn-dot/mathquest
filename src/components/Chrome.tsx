import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { LANGS, useI18n } from '../i18n'
import { levelOf, xpIntoLevel } from '../storage'
import type { Save, View } from '../types'

export function Logo() {
  return <span className="mark">π</span>
}

export function Topbar({
  save,
  onHome,
  extra,
}: {
  save: Save
  onHome?: () => void
  extra?: ReactNode
}) {
  const { t, setLang, lang } = useI18n()
  return (
    <div className="topbar">
      <button className="brand" onClick={onHome}>
        <Logo />
        {t('brand')}
      </button>
      {save.name ? (
        <div className="xp" title={t('xp')}>
          <span>
            {t('level')} {levelOf(save.xp)}
          </span>
          <meter min={0} max={120} value={xpIntoLevel(save.xp)} />
        </div>
      ) : null}
      <div className="topbar-end">
        <div className="lang" role="group">
          {LANGS.map((l) => (
            <button key={l.id} className={lang === l.id ? 'on' : ''} onClick={() => setLang(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        {extra}
      </div>
    </div>
  )
}

export function go(setView: Dispatch<SetStateAction<View>>, view: View) {
  setView(view)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
