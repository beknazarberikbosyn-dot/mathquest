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
  castHiNamed: tx('Привет, {name}! Я {job}.', 'Сәлем, {name}! Мен {job}.', "Hi, {name}! I'm your {job}."),
  castHi: tx('Привет! Я {job}.', 'Сәлем! Мен {job}.', "Hi! I'm your {job}."),
  castLook: tx(
    'Смотри на картинку — на ней все данные задачи.',
    'Суретке қара — есептің барлық дерегі сонда.',
    'Look at the picture — every number from the task is there.',
  ),
  coach: tx('ИИ-тренер', 'ИИ-жаттықтырушы', 'AI coach'),
  tips: tx('Советы', 'Кеңестер', 'Tips'),
  coachTag: tx('Задачи по программе класса', 'Сынып бағдарламасындағы есептер', 'Problems at your grade level'),
  coachIntro: tx(
    'Тренер берёт темы школьной программы, ищет формулировки в энциклопедии и подстраивает сложность: несколько верных ответов подряд — задачи жёстче, ошибки — проще и к пробелам.',
    'Жаттықтырушы мектеп бағдарламасының тақырыбын алады, энциклопедиядан тұжырым іздейді және қиындықты бейімдейді: қатарынан дұрыс жауап — есептер қиындайды, қате — жеңілдейді.',
    'The coach takes the school curriculum, looks up encyclopedia wording, and adapts: several correct answers in a row make tasks harder, mistakes make them easier and target gaps.',
  ),
  coachStart: tx('Начать ИИ-практику', 'ИИ-жаттығуды бастау', 'Start AI practice'),
  coachNext: tx('Следующая задача', 'Келесі есеп', 'Next problem'),
  coachLoading: tx('Ищу задачу по классу…', 'Сынып бойынша есеп іздеп жатырмын…', 'Looking up a grade-level problem…'),
  coachSourceWeb: tx('Из сети + ИИ', 'Желіден + ИИ', 'From the web + AI'),
  coachSourceBank: tx('Программа класса', 'Сынып бағдарламасы', 'Grade curriculum'),
  coachDiff: tx('Сложность {n}/5', 'Қиындық {n}/5', 'Difficulty {n}/5'),
  coachHarder: tx('Задачи усложняются — ты справляешься.', 'Есептер қиындайды — сен істеп жатырсың.', 'Tasks are getting harder — you are keeping up.'),
  coachEasier: tx('Упростим и закроем пробел.', 'Жеңілдетіп, олқылықты жабайық.', 'Easing off to close a gap.'),
  coachSolved: tx('Решено с ИИ: {n}', 'ИИ-мен шешілді: {n}', 'Solved with AI: {n}'),
  coachUntilTips: tx('Ещё {n} до вкладки «Советы».', '«Кеңестер» қойындысына дейін {n}.', '{n} more until the Tips tab.'),
  coachTipsReady: tx('Готовы новые советы — открой вкладку «Советы».', 'Жаңа кеңестер дайын — «Кеңестер» қойындысын аш.', 'New tips are ready — open the Tips tab.'),
  coachWeak: tx('Слабые места', 'Әлсіз тұстар', 'Weak spots'),
  coachOpenTheory: tx('Теория (Википедия)', 'Теория (Уикипедия)', 'Theory (Wikipedia)'),
  coachPracticeSkill: tx('Практика по теме', 'Тақырып жаттығуы', 'Practice this skill'),
  tipsEmpty: tx(
    'Реши 5 задач с ИИ-тренером — здесь появятся персональные советы по навыкам, где ты ошибаешься.',
    'ИИ-жаттықтырушымен 5 есеп шеш — мұнда қателесетін дағдылар бойынша жеке кеңестер шығады.',
    'Solve 5 problems with the AI coach — personal tips for the skills you miss will appear here.',
  ),
  tipsLead: tx(
    'После серии задач тренер собирает, какие навыки просели, и даёт короткие советы плюс ссылку на теорию.',
    'Есеп сериясынан кейін жаттықтырушы қай дағдының төмендегенін жинап, қысқа кеңес және теория сілтемесін береді.',
    'After a run of problems the coach lists which skills dipped and gives short advice plus a theory link.',
  ),
  tipsDrill: tx('Как закрепить', 'Қалай бекіту', 'How to lock it in'),
  tipsWiki: tx('Из энциклопедии', 'Энциклопедиядан', 'From the encyclopedia'),
  gradePractice: tx('ИИ-практика этого класса', 'Осы сыныптың ИИ-жаттығуы', 'AI practice for this grade'),
  skipWeb: tx('Офлайн-банк', 'Офлайн банк', 'Offline bank'),
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
