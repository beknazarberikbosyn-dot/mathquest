import { useState } from 'react'
import { GradeHub } from './components/GradeHub'
import { Home } from './components/Home'
import { MissionPlay } from './components/MissionPlay'
import { Profile } from './components/Profile'
import { Topbar, go } from './components/Chrome'
import { World } from './components/World'
import { missionById } from './data/curriculum'
import { useI18n } from './i18n'
import { emptySave, touchStreak } from './storage'
import type { Save, View } from './types'

export default function App({
  save,
  setSave,
}: {
  save: Save
  setSave: (fn: (s: Save) => Save) => void
}) {
  const { t } = useI18n()
  const [view, setView] = useState<View>(save.name ? 'world' : 'home')
  const [grade, setGrade] = useState(1)
  const [missionId, setMissionId] = useState<string | null>(null)

  const home = () => go(setView, save.name ? 'world' : 'home')

  return (
    <div className="app">
      <Topbar
        save={save}
        onHome={home}
        extra={
          save.name ? (
            <>
              {view !== 'world' && view !== 'home' ? (
                <button className="ghost" onClick={home}>
                  {t('home')}
                </button>
              ) : null}
              <button className="ghost" onClick={() => go(setView, 'profile')}>
                {t('profile')}
              </button>
            </>
          ) : null
        }
      />

      {view === 'home' ? (
        <Home
          save={save}
          onStart={(name, avatar) => {
            setSave((s) => touchStreak({ ...s, name, avatar }))
            go(setView, 'world')
          }}
        />
      ) : null}

      {view === 'world' ? (
        <World
          save={save}
          onOpen={(n) => {
            setGrade(n)
            go(setView, 'grade')
          }}
        />
      ) : null}

      {view === 'grade' ? (
        <GradeHub
          save={save}
          grade={grade}
          onPlay={(id) => {
            setMissionId(id)
            go(setView, 'mission')
          }}
        />
      ) : null}

      {view === 'mission' && missionId ? (
        <MissionPlay
          save={save}
          missionId={missionId}
          onExit={() => {
            const found = missionById(missionId)
            setGrade(found?.grade.grade ?? grade)
            go(setView, 'grade')
          }}
          onFinish={(stars, xp) => {
            setSave((s) => {
              const prev = s.stars[missionId] ?? 0
              const nextStars = Math.max(prev, stars)
              const first = prev === 0
              return touchStreak({
                ...s,
                xp: s.xp + (first ? xp : Math.max(0, Math.round(xp * 0.25))),
                stars: { ...s.stars, [missionId]: nextStars },
                attempts: { ...s.attempts, [missionId]: (s.attempts[missionId] ?? 0) + 1 },
              })
            })
          }}
        />
      ) : null}

      {view === 'profile' ? (
        <Profile
          save={save}
          onReset={() => {
            setSave(() => ({ ...emptySave(), lang: save.lang }))
            go(setView, 'home')
          }}
        />
      ) : null}
    </div>
  )
}
