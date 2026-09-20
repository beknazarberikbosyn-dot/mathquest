import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n'
import { emptyCoach, loadSave, writeSave } from './storage'
import type { Save } from './types'

function Root() {
  const [save, setSave] = useState<Save>(() => loadSave())
  useEffect(() => writeSave(save), [save])
  const safe: Save = { ...save, coach: { ...emptyCoach(), ...save.coach } }
  return (
    <I18nProvider lang={safe.lang} setLang={(lang) => setSave((s) => ({ ...s, lang }))}>
      <App save={safe} setSave={setSave} />
    </I18nProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
