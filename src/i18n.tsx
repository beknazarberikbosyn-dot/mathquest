import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { Lang, Text } from './types'

const UI = {
  brand: tx('MathQuest', 'MathQuest', 'MathQuest'),
  tag: tx(
    'Математика, которая нужна в жизни',
    'Өмірде керек математика',
    'Math you will actually use',
  ),
  intro: tx(
    'Выбери класс, бери миссии у пекарей, врачей, архитекторов и банкиров — и решай задачи так, как это бывает на работе и дома.',
    'Сыныпты таңда, наубайшы, дәрігер, сәулетші мен банкирдің миссияларын ал — есептерді жұмыста және үйдегідей шеш.',
    'Pick a grade, take missions from bakers, doctors, architects and bankers — and solve math the way it shows up at work and at home.',
  ),
  name: tx('Как тебя зовут?', 'Атың кім?', 'What is your name?'),
  namePh: tx('Имя героя', 'Кейіпкер есімі', 'Hero name'),
  avatar: tx('Выбери героя', 'Кейіпкерді таңда', 'Choose a hero'),
  start: tx('Начать путешествие', 'Сапарды бастау', 'Start the journey'),
  continue: tx('Продолжить', 'Жалғастыру', 'Continue'),
  world: tx('Карта классов', 'Сынып картасы', 'Grade map'),
  pickGrade: tx(
    'Каждый остров — школьный класс. Заходи в свой и бери миссии профессий.',
    'Әр арал — мектеп сыныбы. Өзіңдікін ашып, кәсіп миссияларын ал.',
    'Each island is a school grade. Enter yours and take profession missions.',
  ),
  gradeN: tx('{n} класс', '{n}-сынып', 'Grade {n}'),
  topics: tx('Темы-миссии', 'Тақырып-миссиялар', 'Mission topics'),
  missions: tx('Задания', 'Тапсырмалар', 'Quests'),
  play: tx('Начать миссию', 'Миссияны бастау', 'Start mission'),
  replay: tx('Пройти снова', 'Қайта өту', 'Play again'),
  hint: tx('Подсказка', 'Ишара', 'Hint'),
  check: tx('Проверить', 'Тексеру', 'Check'),
  next: tx('Дальше', 'Келесі', 'Next'),
  finish: tx('Завершить миссию', 'Миссияны аяқтау', 'Finish mission'),
  why: tx('Где это пригодится', 'Бұл қайда керек', 'Where this is used'),
  correct: tx('Верно!', 'Дұрыс!', 'Correct!'),
  wrong: tx('Почти. Попробуй ещё раз.', 'Жақын. Қайта байқап көр.', 'Almost. Try again.'),
  stars: tx('Звёзды', 'Жұлдыздар', 'Stars'),
  xp: tx('Опыт', 'Тәжірибе', 'XP'),
  level: tx('Уровень', 'Деңгей', 'Level'),
  streak: tx('Серия дней', 'Күндер сериясы', 'Day streak'),
  profile: tx('Профиль', 'Профиль', 'Profile'),
  back: tx('Назад', 'Артқа', 'Back'),
  home: tx('На карту', 'Картаға', 'To the map'),
  done: tx('Пройдено', 'Өтілді', 'Done'),
  locked: tx('Сначала пройди предыдущую миссию', 'Алдымен алдыңғы миссияны өт', 'Finish the previous mission first'),
  answer: tx('Ответ', 'Жауап', 'Answer'),
  pick: tx('Выбери ответ', 'Жауапты таңда', 'Pick an answer'),
  emptyName: tx('Напиши имя — так будут обращаться герои миссий.', 'Есімді жаз — миссия кейіпкерлері солай шақырады.', 'Add a name so mission characters can call you.'),
  progress: tx('Прогресс класса', 'Сынып прогресі', 'Grade progress'),
  allGrades: tx('1–12 классы', '1–12 сыныптар', 'Grades 1–12'),
  reset: tx('Сбросить прогресс', 'Прогресті тастау', 'Reset progress'),
  heroOf: tx('Герой MathQuest', 'MathQuest кейіпкері', 'MathQuest hero'),
  badges: tx('Профессии', 'Мамандықтар', 'Professions'),
  noBadges: tx('Пройди миссии — откроются значки профессий.', 'Миссияларды өт — мамандық белгілері ашылады.', 'Finish missions to unlock profession badges.'),
  stepOf: tx('Шаг {a} из {b}', '{b} ішінен {a}-қадам', 'Step {a} of {b}'),
  great: tx('Миссия выполнена', 'Миссия орындалды', 'Mission complete'),
  gained: tx('+{n} опыта', '+{n} тәжірибе', '+{n} XP'),
  worldTitle: tx('Архипелаг знаний', 'Білім архипелагы', 'Archipelago of knowledge'),
} as const

function tx(ru: string, kk: string, en: string): Text {
  return { ru, kk, en }
}

type Dict = typeof UI
export type UiKey = keyof Dict

const I18nCtx = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: UiKey, vars?: Record<string, string | number>) => string
  tx: (text: Text) => string
} | null>(null)

export function I18nProvider({
  lang,
  setLang,
  children,
}: {
  lang: Lang
  setLang: (lang: Lang) => void
  children: ReactNode
}) {
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: UiKey, vars?: Record<string, string | number>) => {
        let s = UI[key][lang]
        if (vars) {
          for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v))
        }
        return s
      },
      tx: (text: Text) => text[lang],
    }),
    [lang, setLang],
  )
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('I18n missing')
  return ctx
}

export const LANGS: { id: Lang; label: string }[] = [
  { id: 'ru', label: 'RU' },
  { id: 'kk', label: 'KK' },
  { id: 'en', label: 'EN' },
]
