import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n'
import { loadSave, writeSave } from './storage'
import type { Save } from './types'

function Root() {
  const [save, setSave] = useState<Save>(() => loadSave())
  useEffect(() => writeSave(save), [save])
  return (
    <I18nProvider lang={save.lang} setLang={(lang) => setSave((s) => ({ ...s, lang }))}>
      <App save={save} setSave={setSave} />
    </I18nProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
