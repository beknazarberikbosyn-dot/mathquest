import type { Step, Text } from '../types'
import { tx } from '../types'
import { gcd } from './math'
import type { Rng } from './rng'

export type TutorProblem = {
  id: string
  skill: string
  grade: number
  difficulty: number
  source: 'bank' | 'web'
  sourceLabel?: Text
  sourceUrl?: string
  story: Text
  question: Text
  hint: Text
  explain: Text
  unit?: Text
  answer: Step['answer']
}

function n(value: number, tolerance?: number): Step['answer'] {
  return { kind: 'number', value, ...(tolerance ? { tolerance } : {}) }
}

function uid() {
  return `p-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`
}

function fact(k: number): number {
  let r = 1
  for (let i = 2; i <= k; i++) r *= i
  return r
}

function comb(n0: number, k: number) {
  if (k > n0) return 0
  return Math.round(fact(n0) / (fact(k) * fact(n0 - k)))
}

function perm(n0: number, k: number) {
  let r = 1
  for (let i = 0; i < k; i++) r *= n0 - i
  return r
}

export function generateBankProblem(skill: string, grade: number, difficulty: number, rng: Rng): TutorProblem {
  const d = Math.min(5, Math.max(1, Math.round(difficulty)))
  const make = builders[skill] ?? builders['linear-1']
  const p = make(grade, d, rng)
  return {
    ...p,
    id: uid(),
    skill,
    grade,
    difficulty: d,
    source: 'bank',
  }
}

type Built = Omit<TutorProblem, 'id' | 'skill' | 'grade' | 'difficulty' | 'source'>

const builders: Record<string, (grade: number, d: number, rng: Rng) => Built> = {
  'add-small': (_g, d, rng) => {
    const max = d <= 2 ? 10 : 20
    const a = rng.int(1, max - 1)
    const b = rng.int(1, Math.max(1, max - a))
    return {
      story: tx(
        `На полке ${a} книг, принесли ещё ${b}.`,
        `Сөреде ${a} кітап, тағы ${b} әкелді.`,
        `There are ${a} books on the shelf, then ${b} more arrive.`,
      ),
      question: tx('Сколько книг стало?', 'Неше кітап болды?', 'How many books are there now?'),
      hint: tx('Сложи два числа.', 'Екі санды қос.', 'Add the two numbers.'),
      explain: tx('Кассир и библиотекарь так считают новые поступления.', 'Кассир мен кітапханашы жаңа түсімді солай санайды.', 'Cashiers and librarians count new stock this way.'),
      answer: n(a + b),
    }
  },

  'sub-small': (_g, d, rng) => {
    const max = d <= 2 ? 10 : 20
    const a = rng.int(4, max)
    const b = rng.int(1, a - 1)
    return {
      story: tx(
        `Было ${a} яблок, ${b} отдали гостям.`,
        `${a} алма болды, ${b}-ін қонаққа берді.`,
        `There were ${a} apples, and ${b} were given to guests.`,
      ),
      question: tx('Сколько яблок осталось?', 'Неше алма қалды?', 'How many apples are left?'),
      hint: tx('Вычти то, что отдали.', 'Бергенін азайт.', 'Subtract what was given away.'),
      explain: tx('Так считают остаток товара на прилавке.', 'Сөредегі қалдықты солай санайды.', 'This is how leftover stock is counted.'),
      answer: n(a - b),
    }
  },

  'add-100': (_g, d, rng) => {
    const a = rng.int(d <= 2 ? 11 : 25, d <= 3 ? 48 : 86)
    const b = rng.int(d <= 2 ? 10 : 17, d <= 3 ? 39 : 58)
    const add = rng.float() < 0.55
    if (add) {
      return {
        story: tx(
          `В кассе ${a} ₸, покупатель дал ещё ${b} ₸.`,
          `Кассада ${a} ₸, сатып алушы тағы ${b} ₸ берді.`,
          `The till has ${a} ₸, then a customer adds ${b} ₸.`,
        ),
        question: tx('Сколько денег в кассе?', 'Кассада қанша ақша?', 'How much money is in the till?'),
        hint: tx('Сложи двузначные числа.', 'Екі таңбалы сандарды қос.', 'Add the two-digit numbers.'),
        explain: tx('Кассир складывает купюры, не считая по одной монете.', 'Кассир әр тиынды санамай, купюраларды қосады.', 'A cashier adds notes instead of counting every coin.'),
        unit: tx('₸', '₸', '₸'),
        answer: n(a + b),
      }
    }
    const big = Math.max(a, b) + rng.int(10, 30)
    const small = rng.int(10, Math.min(40, big - 5))
    return {
      story: tx(
        `Билет стоит ${big} ₸, заплатили ${big + small} ₸? Нет: было ${big} ₸, сдали ${small} ₸ сдачи — подожди. В кошельке ${big} ₸, купили на ${small} ₸.`,
        `Әмианда ${big} ₸, ${small} ₸-ге сатып алды.`,
        `The wallet has ${big} ₸, and a purchase costs ${small} ₸.`,
      ),
      question: tx('Сколько останется?', 'Қанша қалады?', 'How much is left?'),
      hint: tx('Вычти расход из суммы в кошельке.', 'Шығынды әмиандағы сомадан азайт.', 'Subtract the spend from the wallet.'),
      explain: tx('Сдачу считают вычитанием, не угадыванием.', 'Қайтарымды табу емес, азайтумен санайды.', 'Change is computed by subtraction, not by guessing.'),
      unit: tx('₸', '₸', '₸'),
      answer: n(big - small),
    }
  },

  'mul-table': (_g, d, rng) => {
    const a = rng.int(d <= 2 ? 2 : 3, d <= 3 ? 9 : 12)
    const b = rng.int(2, d <= 2 ? 8 : 12)
    return {
      story: tx(
        `В каждом ящике ${a} банок, ящиков ${b}.`,
        `Әр жәшікте ${a} банке, жәшік ${b}.`,
        `Each crate holds ${a} cans, and there are ${b} crates.`,
      ),
      question: tx('Сколько банок всего?', 'Барлығы неше банке?', 'How many cans in total?'),
      hint: tx('Это умножение, не сложение одних и тех же чисел по одному.', 'Бұл көбейту, бір санды бір-бірлеп қосу емес.', 'This is multiplication, not adding the same number one by one.'),
      explain: tx('Склад считает партии умножением: групп × размер группы.', 'Қойма партияны көбейтумен санайды: топ × топ өлшемі.', 'Warehouses count batches as groups × group size.'),
      answer: n(a * b),
    }
  },

  'div-int': (_g, d, rng) => {
    const b = rng.int(2, d <= 2 ? 8 : 12)
    const q = rng.int(3, d <= 3 ? 9 : 14)
    const a = b * q
    return {
      story: tx(
        `${a} конфет кладут по ${b} в пакет.`,
        `${a} кәмпитті әр пакетке ${b}-ден салады.`,
        `${a} sweets are packed ${b} per bag.`,
      ),
      question: tx('Сколько пакетов получится?', 'Неше пакет шығады?', 'How many bags will there be?'),
      hint: tx('Раздели общее на размер пакета.', 'Жалпыны пакет өлшеміне бөл.', 'Divide the total by the bag size.'),
      explain: tx('Фасовка — это деление на равные группы.', 'Қаптау — тең топтарға бөлу.', 'Packing is splitting into equal groups.'),
      answer: n(q),
    }
  },

  'frac-of': (_g, d, rng) => {
    const den = rng.int(2, d <= 2 ? 6 : 10)
    const num = d <= 2 ? 1 : rng.int(1, den - 1)
    const whole = den * rng.int(4, d <= 3 ? 12 : 18)
    const val = (whole * num) / den
    return {
      story: tx(
        `От ${whole} литров взяли ${num}/${den}.`,
        `${whole} литрдің ${num}/${den} бөлігін алды.`,
        `${num}/${den} of ${whole} litres was taken.`,
      ),
      question: tx('Сколько литров взяли?', 'Неше литр алды?', 'How many litres were taken?'),
      hint: tx('Сначала найди 1/знаменатель, затем умножь на числитель.', 'Алдымен 1/бөлімді тап, сосын алымға көбейт.', 'First find 1/denominator, then multiply by the numerator.'),
      explain: tx('Долю от объёма считают повара, фармацевты и фермеры.', 'Көлем үлесін аспаз, фармацевт пен фермер санайды.', 'Cooks, pharmacists and farmers compute a fraction of a volume.'),
      unit: tx('л', 'л', 'L'),
      answer: n(val, 0.01),
    }
  },

  'mul-long': (_g, d, rng) => {
    const a = rng.int(12, d <= 2 ? 28 : 76)
    const b = d <= 2 ? rng.int(3, 9) : rng.int(11, 19)
    return {
      story: tx(
        `Один рулон ткани ${a} м, закупили ${b} рулонов.`,
        `Бір мата орамы ${a} м, ${b} орам алды.`,
        `One fabric roll is ${a} m, and ${b} rolls were bought.`,
      ),
      question: tx('Сколько метров ткани?', 'Неше метр мата?', 'How many metres of fabric?'),
      hint: tx('Умножь длину рулона на число рулонов.', 'Орам ұзындығын орам санына көбейт.', 'Multiply roll length by the number of rolls.'),
      explain: tx('Портной заказывает ткань пачками, а считает метры.', 'Тігінші матаны бумамен алады, метрмен санайды.', 'A tailor orders fabric in rolls but bills in metres.'),
      unit: tx('м', 'м', 'm'),
      answer: n(a * b),
    }
  },

  'area-rect': (_g, d, rng) => {
    const a = rng.int(4, d <= 2 ? 12 : 24)
    const b = rng.int(3, d <= 2 ? 11 : 19)
    const area = rng.float() < 0.55
    if (area) {
      return {
        story: tx(
          `Прямоугольный двор: длина ${a} м, ширина ${b} м.`,
          `Тіктөртбұрыш аула: ұзындығы ${a} м, ені ${b} м.`,
          `A rectangular yard is ${a} m long and ${b} m wide.`,
        ),
        question: tx('Площадь двора?', 'Аула ауданы?', 'Area of the yard?'),
        hint: tx('Площадь прямоугольника — произведение сторон.', 'Тіктөртбұрыш ауданы — қабырғалар көбейтіндісі.', 'Rectangle area is the product of the sides.'),
        explain: tx('Площадь нужна, чтобы купить плитку или засеять газон.', 'Плитка алу не көгал егу үшін аудан керек.', 'Area tells you how much tile or lawn seed to buy.'),
        unit: tx('м²', 'м²', 'm²'),
        answer: n(a * b),
      }
    }
    return {
      story: tx(
        `Забор вокруг прямоугольника ${a}×${b} м.`,
        `${a}×${b} м тіктөртбұрыштың айналасына қоршау.`,
        `A fence around a ${a}×${b} m rectangle.`,
      ),
      question: tx('Длина забора (периметр)?', 'Қоршау ұзындығы (периметр)?', 'Fence length (perimeter)?'),
      hint: tx('Периметр = 2·(длина + ширина).', 'Периметр = 2·(ұзындық + ен).', 'Perimeter = 2·(length + width).'),
      explain: tx('Строитель считает погонные метры, не площадь.', 'Құрылысшы аудан емес, погон метр санайды.', 'A builder counts running metres, not area.'),
      unit: tx('м', 'м', 'm'),
      answer: n(2 * (a + b)),
    }
  },

  'frac-add': (_g, d, rng) => {
    const b = rng.pick(d <= 2 ? [2, 3, 4, 6] : [4, 6, 8, 10, 12])
    const d2 = rng.pick(d <= 2 ? [2, 3, 4, 6] : [3, 4, 6, 8, 12])
    const a = rng.int(1, b - 1)
    const c = rng.int(1, d2 - 1)
    const den = (b * d2) / gcd(b, d2)
    const left = (a * den) / b
    const right = (c * den) / d2
    const add = rng.float() < 0.7 || left <= right
    const num = add ? left + right : left - right
    const g = gcd(Math.abs(num), den)
    const value = num / den
    return {
      story: tx(
        `Первый бак ${a}/${b} полного, второй ${c}/${d2}.`,
        `Бірінші бак ${a}/${b} толы, екіншісі ${c}/${d2}.`,
        `The first tank is ${a}/${b} full, the second is ${c}/${d2}.`,
      ),
      question: tx(
        add ? 'Сложи дроби (можно десятичной).' : 'Вычти вторую из первой (можно десятичной).',
        add ? 'Бөлшектерді қос (ондықпен де болады).' : 'Екіншісін біріншіден азайт (ондықпен де болады).',
        add ? 'Add the fractions (decimal is ok).' : 'Subtract the second from the first (decimal is ok).',
      ),
      hint: tx(
        `Общий знаменатель ${den}. Сократи ответ на ${g === 1 ? 1 : g}.`,
        `Ортақ бөлім ${den}. Жауапты ${g === 1 ? 1 : g}-ке қысқарт.`,
        `Common denominator ${den}. Reduce the answer by ${g === 1 ? 1 : g}.`,
      ),
      explain: tx(
        'Разные знаменатели нельзя складывать «в лоб» — сначала общее дно.',
        'Әр түрлі бөлімді «тура» қосуға болмайды — алдымен ортақ бөлім.',
        'Unlike denominators cannot be added as-is — find a common bottom first.',
      ),
      answer: n(value, 0.02),
    }
  },

  decimals: (_g, d, rng) => {
    const a = rng.int(15, 80) / 10
    const b = rng.int(12, 55) / 10
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      return {
        story: tx(`Кусок ${a} кг и кусок ${b} кг.`, `${a} кг және ${b} кг кесінді.`, `A piece of ${a} kg and a piece of ${b} kg.`),
        question: tx('Сумма массы?', 'Масса қосындысы?', 'Total mass?'),
        hint: tx('Сложи десятичные, выровняв запятую.', 'Ондықтарды үтірді теңестіріп қос.', 'Add the decimals, lining up the point.'),
        explain: tx('На рынке массу партий складывают в килограммах с десятыми.', 'Базарда партия массасын ондық килограмммен қосады.', 'Markets add batch masses in kilograms and tenths.'),
        unit: tx('кг', 'кг', 'kg'),
        answer: n(Math.round((a + b) * 10) / 10, 0.05),
      }
    }
    if (kind === 1) {
      const big = Math.max(a, b) + 2
      const small = Math.min(a, b)
      return {
        story: tx(`Бочка ${big} л, отлили ${small} л.`, `Бөшке ${big} л, ${small} л құйылды.`, `A barrel holds ${big} L, and ${small} L was poured out.`),
        question: tx('Сколько осталось?', 'Қанша қалды?', 'How much is left?'),
        hint: tx('Вычти десятичные.', 'Ондықтарды азайт.', 'Subtract the decimals.'),
        explain: tx('Остаток жидкости — разность объёмов.', 'Сұйық қалдығы — көлем айырмасы.', 'Remaining liquid is a difference of volumes.'),
        unit: tx('л', 'л', 'L'),
        answer: n(Math.round((big - small) * 10) / 10, 0.05),
      }
    }
    const k = rng.int(2, 6)
    return {
      story: tx(`Одна плитка ${a} кг, плиток ${k}.`, `Бір плитка ${a} кг, плитка ${k}.`, `One slab is ${a} kg, and there are ${k} slabs.`),
      question: tx('Общая масса?', 'Жалпы масса?', 'Total mass?'),
      hint: tx('Умножь десятичное на целое.', 'Ондықты бүтінге көбейт.', 'Multiply the decimal by the whole number.'),
      explain: tx('Одинаковые товары умножают, а не складывают столбиком по одному.', 'Бірдей тауарды бір-бірлеп қоспай, көбейтеді.', 'Identical goods are multiplied, not added one by one.'),
      unit: tx('кг', 'кг', 'kg'),
      answer: n(Math.round(a * k * 10) / 10, 0.08),
    }
  },

  percent: (_g, d, rng) => {
    const p = rng.pick(d <= 2 ? [10, 20, 25, 50] : [5, 12, 15, 18, 30, 35])
    const base = rng.int(4, 20) * 20
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      return {
        story: tx(`Цена ${base} ₸. Нужно взять ${p}%.`, `Бағасы ${base} ₸. ${p}% алу керек.`, `The price is ${base} ₸. Take ${p}%.`),
        question: tx('Сколько тенге составляет этот процент?', 'Бұл пайыз неше теңге?', 'How many tenge is that percent?'),
        hint: tx('Процент от числа = число × процент / 100.', 'Санның пайызы = сан × пайыз / 100.', 'Percent of a number = number × percent / 100.'),
        explain: tx('Чаевые, налог и комиссия банка считаются так.', 'Шайпұл, салық пен банк комиссиясы солай саналады.', 'Tips, tax and bank fees are computed this way.'),
        unit: tx('₸', '₸', '₸'),
        answer: n((base * p) / 100, 0.01),
      }
    }
    if (kind === 1) {
      return {
        story: tx(`Товар ${base} ₸, скидка ${p}%.`, `Тауар ${base} ₸, жеңілдік ${p}%.`, `An item costs ${base} ₸ with a ${p}% discount.`),
        question: tx('Цена после скидки?', 'Жеңілдіктен кейінгі баға?', 'Price after the discount?'),
        hint: tx('Сначала найди скидку в тенге, затем вычти.', 'Алдымен жеңілдікті теңгемен тап, сосын азайт.', 'First find the discount in tenge, then subtract.'),
        explain: tx('Магазин показывает процент, касса считает новую цену.', 'Дүкен пайыз көрсетеді, касса жаңа бағаны санайды.', 'The shop shows a percent; the till computes the new price.'),
        unit: tx('₸', '₸', '₸'),
        answer: n(base - (base * p) / 100, 0.01),
      }
    }
    return {
      story: tx(`Оклад ${base} ₸ вырос на ${p}%.`, `Жалақы ${base} ₸ ${p}%-ке өсті.`, `A salary of ${base} ₸ grew by ${p}%.`),
      question: tx('Новый оклад?', 'Жаңа жалақы?', 'New salary?'),
      hint: tx('Новое = старое × (1 + p/100).', 'Жаңа = ескі × (1 + p/100).', 'New = old × (1 + p/100).'),
      explain: tx('Индексация зарплаты — это процентный рост, не «плюс p тенге».', 'Жалақы индексі — пайыздық өсім, «плюс p теңге» емес.', 'A raise is a percent increase, not plus p tenge.'),
      unit: tx('₸', '₸', '₸'),
      answer: n(base + (base * p) / 100, 0.01),
    }
  },

  integers: (_g, d, rng) => {
    const a = rng.int(d <= 2 ? -12 : -25, d <= 2 ? 12 : 25)
    const b = rng.int(d <= 2 ? -12 : -25, d <= 2 ? 12 : 25)
    if (rng.float() < 0.5) {
      return {
        story: tx(
          `Температура была ${a} °C, изменилась на ${b} градусов (плюс — потеплело).`,
          `Температура ${a} °C еді, ${b} градусқа өзгерді (плюс — жылыды).`,
          `The temperature was ${a} °C and changed by ${b} degrees (plus means warmer).`,
        ),
        question: tx('Новая температура?', 'Жаңа температура?', 'New temperature?'),
        hint: tx('Сложи целые числа со знаками.', 'Таңбалы бүтін сандарды қос.', 'Add the signed integers.'),
        explain: tx('Синоптик складывает изменение с текущей температурой.', 'Синоптик өзгерісті қазіргі температураға қосады.', 'Forecasters add the change to the current temperature.'),
        unit: tx('°C', '°C', '°C'),
        answer: n(a + b),
      }
    }
    const x = rng.int(-9, 9) || -3
    const y = rng.int(-8, 8) || 4
    return {
      story: tx(`На каждом шаге ${x}, шагов ${y} (знаки важны).`, `Әр қадам ${x}, қадам ${y} (таңба маңызды).`, `Each step is ${x}, for ${y} steps (signs matter).`),
      question: tx('Итоговое смещение?', 'Қорытынды ығысу?', 'Net displacement?'),
      hint: tx('Произведение целых: минус на минус даёт плюс.', 'Бүтіндер көбейтіндісі: минус пен минус плюс береді.', 'Integer product: minus times minus is plus.'),
      explain: tx('Смещение = шаг × число шагов, оба могут быть отрицательными.', 'Ығысу = қадам × қадам саны, екеуі де теріс бола алады.', 'Displacement = step × number of steps; both can be negative.'),
      answer: n(x * y),
    }
  },

  ratios: (_g, d, rng) => {
    const k = rng.int(2, d <= 2 ? 5 : 8)
    const a = rng.int(2, 9)
    const b = rng.int(2, 9)
    if (rng.float() < 0.5) {
      return {
        story: tx(
          `Карта: ${a} см соответствуют ${a * k} км. Линия на карте ${b} см.`,
          `Карта: ${a} см ${a * k} км-ге сәйкес. Картадағы сызық ${b} см.`,
          `On the map ${a} cm stands for ${a * k} km. A line on the map is ${b} cm.`,
        ),
        question: tx('Реальная длина в км?', 'Нақты ұзындық км-мен?', 'Real length in km?'),
        hint: tx('Составь пропорцию: см карты / км = новые см / x.', 'Пропорция құр: карта см / км = жаңа см / x.', 'Write a proportion: map cm / km = new cm / x.'),
        explain: tx('Масштаб — отношение, а не «просто умножить на красивое число».', 'Масштаб — қатынас, «әдемі санға көбейту» емес.', 'Scale is a ratio, not “multiply by a nice number”.'),
        unit: tx('км', 'км', 'km'),
        answer: n(b * k),
      }
    }
    const mixA = rng.int(2, 5)
    const mixB = rng.int(2, 5)
    const total = (mixA + mixB) * rng.int(4, 9)
    return {
      story: tx(
        `Смесь в отношении ${mixA}:${mixB}. Всего ${total} кг.`,
        `Қоспа қатынасы ${mixA}:${mixB}. Барлығы ${total} кг.`,
        `A mix in the ratio ${mixA}:${mixB}. Total ${total} kg.`,
      ),
      question: tx(`Сколько кг первой части (доля ${mixA})?`, `Бірінші бөлік неше кг (үлес ${mixA})?`, `How many kg is the first part (share ${mixA})?`),
      hint: tx('Часть = (доля / сумма долей) × всего.', 'Бөлік = (үлес / үлес қосындысы) × барлығы.', 'Part = (share / sum of shares) × total.'),
      explain: tx('Рецепты и сплавы делят целое пропорционально частям.', 'Рецепт пен қорытпа бүтінді үлеске бөледі.', 'Recipes and alloys split a whole in proportion to the parts.'),
      unit: tx('кг', 'кг', 'kg'),
      answer: n((total * mixA) / (mixA + mixB), 0.01),
    }
  },

  'linear-1': (_g, d, rng) => {
    const a = rng.int(2, d <= 2 ? 6 : 12)
    const x = rng.int(d <= 2 ? 2 : -8, d <= 2 ? 12 : 15)
    const b = rng.int(-20, 20)
    const c = a * x + b
    const sign = b >= 0 ? `+ ${b}` : `− ${-b}`
    return {
      story: tx(
        `Линейное уравнение ${a}x ${sign} = ${c}.`,
        `Сызықтық теңдеу ${a}x ${sign} = ${c}.`,
        `Linear equation ${a}x ${sign} = ${c}.`,
      ),
      question: tx('Найди x.', 'x-ті тап.', 'Find x.'),
      hint: tx('Перенеси свободный член, затем раздели на коэффициент при x.', 'Бос мүшені көшір, сосын x коэффициентіне бөл.', 'Move the constant, then divide by the coefficient of x.'),
      explain: tx('Уравнение — модель «сколько неизвестного плюс поправка».', 'Теңдеу — «белгісіз қанша плюс түзету» моделі.', 'An equation models “some unknown plus an adjustment”.'),
      answer: n(x, 0.01),
    }
  },

  'linear-2': (_g, d, rng) => {
    const a = rng.int(2, 8)
    const b = rng.int(2, 7)
    const x = rng.int(d <= 2 ? 1 : -6, 12)
    const c = rng.int(1, 15)
    const right = a * (b * x + c)
    return {
      story: tx(
        `Реши ${a}(${b}x + ${c}) = ${right}.`,
        `${a}(${b}x + ${c}) = ${right} теңдеуін шеш.`,
        `Solve ${a}(${b}x + ${c}) = ${right}.`,
      ),
      question: tx('x = ?', 'x = ?', 'x = ?'),
      hint: tx('Раскрой скобки или сначала раздели обе части на множитель перед скобкой.', 'Жақшаны аш немесе алдымен екі бөлікті жақша алдындағыға бөл.', 'Expand, or first divide both sides by the factor in front of the bracket.'),
      explain: tx('Двухшаговое уравнение — типичный 7–8 класс: скобки, потом x.', 'Екі қадамды теңдеу — 7–8 сыныптың типі: жақша, сосын x.', 'A two-step equation is typical for grades 7–8: brackets, then x.'),
      answer: n(x, 0.01),
    }
  },

  'triangle-angles': (_g, d, rng) => {
    const a = rng.int(30, d <= 2 ? 70 : 100)
    const b = rng.int(20, Math.min(80, 160 - a))
    const c = 180 - a - b
    return {
      story: tx(
        `В треугольнике два угла: ${a}° и ${b}°.`,
        `Үшбұрышта екі бұрыш: ${a}° және ${b}°.`,
        `A triangle has two angles: ${a}° and ${b}°.`,
      ),
      question: tx('Третий угол?', 'Үшінші бұрыш?', 'The third angle?'),
      hint: tx('Сумма углов треугольника равна 180°.', 'Үшбұрыш бұрыштарының қосындысы 180°.', 'The angles of a triangle add to 180°.'),
      explain: tx('Геодезист и плотник проверяют треугольник этой суммой.', 'Геодезист пен ұста үшбұрышты осы қосындымен тексереді.', 'Surveyors and carpenters check a triangle with this sum.'),
      unit: tx('°', '°', '°'),
      answer: n(c),
    }
  },

  pythagoras: (_g, d, rng) => {
    const triples: Array<[number, number, number]> = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
      [7, 24, 25],
      [9, 12, 15],
      [9, 40, 41],
      [20, 21, 29],
    ]
    const easy = triples.filter((t) => t[2] <= (d <= 2 ? 13 : 25))
    const [a0, b0, c0] = rng.pick(easy.length ? easy : triples)
    const k = rng.int(1, d <= 3 ? 3 : 4)
    const a = a0 * k
    const b = b0 * k
    const c = c0 * k
    const find = rng.pick(['hyp', 'leg'] as const)
    if (find === 'hyp') {
      return {
        story: tx(
          `Прямоугольный треугольник, катеты ${a} и ${b}.`,
          `Тікбұрышты үшбұрыш, катеттер ${a} және ${b}.`,
          `A right triangle with legs ${a} and ${b}.`,
        ),
        question: tx('Гипотенуза?', 'Гипотенуза?', 'Hypotenuse?'),
        hint: tx('c² = a² + b², затем корень.', 'c² = a² + b², сосын түбір.', 'c² = a² + b², then the root.'),
        explain: tx('Диагональ прямоугольника, лестница к стене, кабель — это гипотенуза.', 'Тіктөртбұрыш диагоналі, қабырғаға баспалдақ, кабель — гипотенуза.', 'A rectangle diagonal, a ladder, a cable — that is a hypotenuse.'),
        answer: n(c, 0.05),
      }
    }
    return {
      story: tx(
        `Гипотенуза ${c}, один катет ${a}. Треугольник прямоугольный.`,
        `Гипотенуза ${c}, бір катет ${a}. Үшбұрыш тікбұрышты.`,
        `Hypotenuse ${c}, one leg ${a}. The triangle is right-angled.`,
      ),
      question: tx('Второй катет?', 'Екінші катет?', 'The other leg?'),
      hint: tx('b = √(c² − a²).', 'b = √(c² − a²).', 'b = √(c² − a²).'),
      explain: tx('Так находят ширину пандуса или пролёт, если известна наклонная.', 'Еңіс белгілі болса, пандус ені не аралық солай табылады.', 'That is how you find ramp width or a span when the slope length is known.'),
      answer: n(b, 0.05),
    }
  },

  slope: (_g, d, rng) => {
    const x1 = rng.int(-6, 6)
    const y1 = rng.int(-8, 8)
    const k = rng.int(d <= 2 ? 1 : -4, 5) || 2
    const dx = rng.int(d <= 2 ? 2 : 1, 6)
    const x2 = x1 + dx
    const y2 = y1 + k * dx
    return {
      story: tx(
        `Прямая проходит через (${x1}; ${y1}) и (${x2}; ${y2}).`,
        `Түзу (${x1}; ${y1}) және (${x2}; ${y2}) нүктелерінен өтеді.`,
        `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}).`,
      ),
      question: tx('Угловой коэффициент k?', 'Бұрыштық коэффициент k?', 'Slope k?'),
      hint: tx('k = (y2 − y1) / (x2 − x1).', 'k = (y2 − y1) / (x2 − x1).', 'k = (y2 − y1) / (x2 − x1).'),
      explain: tx('Наклон графика — скорость изменения: прибыль, путь, температура.', 'График еңісі — өзгеріс жылдамдығы: пайда, жол, температура.', 'Slope is a rate of change: profit, distance, temperature.'),
      answer: n(k, 0.01),
    }
  },

  systems: (_g, d, rng) => {
    const x = rng.int(d <= 2 ? 1 : -5, 9)
    const y = rng.int(d <= 2 ? 1 : -6, 8)
    const a1 = rng.int(1, 5)
    const b1 = rng.int(1, 4)
    const a2 = rng.int(1, 4)
    const b2 = rng.int(1, 5)
    const c1 = a1 * x + b1 * y
    const c2 = a2 * x + b2 * y
    const askX = rng.float() < 0.5
    return {
      story: tx(
        `Система: ${a1}x + ${b1}y = ${c1} и ${a2}x + ${b2}y = ${c2}.`,
        `Жүйе: ${a1}x + ${b1}y = ${c1} және ${a2}x + ${b2}y = ${c2}.`,
        `System: ${a1}x + ${b1}y = ${c1} and ${a2}x + ${b2}y = ${c2}.`,
      ),
      question: tx(askX ? 'Найди x.' : 'Найди y.', askX ? 'x-ті тап.' : 'y-ті тап.', askX ? 'Find x.' : 'Find y.'),
      hint: tx('Подстановка или сложение: вырази одну переменную.', 'Орнына қою немесе қосу: бір айнымалыны өрнекте.', 'Substitution or elimination: express one variable.'),
      explain: tx('Две цены, два товара; ток и сопротивление — типичная система 8–9 класса.', 'Екі баға, екі тауар; ток пен кедергі — 8–9 сыныптың типтік жүйесі.', 'Two prices, two goods; current and resistance — a typical grade 8–9 system.'),
      answer: n(askX ? x : y, 0.01),
    }
  },

  quadratic: (_g, d, rng) => {
    const r1 = rng.int(d <= 2 ? 1 : -6, 8)
    let r2 = rng.int(d <= 2 ? 1 : -5, 7)
    if (r2 === r1) r2 = r1 + rng.int(1, 3)
    const a = d <= 2 ? 1 : rng.pick([1, 1, 2])
    const b = -a * (r1 + r2)
    const c = a * r1 * r2
    const bs = b >= 0 ? `+ ${b}x` : `− ${-b}x`
    const cs = c >= 0 ? `+ ${c}` : `− ${-c}`
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    const disc = (r1 - r2) * (r1 - r2) * a * a
    if (kind === 0) {
      return {
        story: tx(
          `Уравнение ${a === 1 ? '' : a}x² ${bs} ${cs} = 0.`,
          `Теңдеу ${a === 1 ? '' : a}x² ${bs} ${cs} = 0.`,
          `Equation ${a === 1 ? '' : a}x² ${bs} ${cs} = 0.`,
        ),
        question: tx('Больший корень?', 'Үлкен түбір?', 'The larger root?'),
        hint: tx('Разложи на (x − корень) или формула с дискриминантом.', '(x − түбір) түріне жікте немесе дискриминант формуласы.', 'Factor as (x − root) or use the discriminant formula.'),
        explain: tx('Корни квадратного — моменты «ноль прибыли», касание земли, опоры арки.', 'Квадрат түбірлері — «пайда нөл», жерге тию, арка тірегі.', 'Quadratic roots are break-even, landing, arch supports.'),
        answer: n(Math.max(r1, r2), 0.01),
      }
    }
    if (kind === 1) {
      return {
        story: tx(
          `Тот же трёхчлен ${a === 1 ? '' : a}x² ${bs} ${cs}.`,
          `Сол үшмүше ${a === 1 ? '' : a}x² ${bs} ${cs}.`,
          `The same trinomial ${a === 1 ? '' : a}x² ${bs} ${cs}.`,
        ),
        question: tx('Дискриминант D = b² − 4ac?', 'Дискриминант D = b² − 4ac?', 'Discriminant D = b² − 4ac?'),
        hint: tx(`b = ${b}, a = ${a}, c = ${c}.`, `b = ${b}, a = ${a}, c = ${c}.`, `b = ${b}, a = ${a}, c = ${c}.`),
        explain: tx('Знак дискриминанта говорит, сколько действительных корней.', 'Дискриминант таңбасы нақты түбір санын айтады.', 'The discriminant sign says how many real roots there are.'),
        answer: n(disc),
      }
    }
    const vx = -b / (2 * a)
    return {
      story: tx(
        `Парабола y = ${a === 1 ? '' : a}x² ${bs} ${cs}.`,
        `Парабола y = ${a === 1 ? '' : a}x² ${bs} ${cs}.`,
        `Parabola y = ${a === 1 ? '' : a}x² ${bs} ${cs}.`,
      ),
      question: tx('x-координата вершины?', 'Төбенің x-координатасы?', 'x-coordinate of the vertex?'),
      hint: tx('x = −b / (2a).', 'x = −b / (2a).', 'x = −b / (2a).'),
      explain: tx('Вершина — максимум высоты мяча или минимум затрат.', 'Төбе — доп биіктігінің максимумы немесе шығын минимумы.', 'The vertex is max ball height or minimum cost.'),
      answer: n(vx, 0.01),
    }
  },

  functions: (_g, d, rng) => {
    const k = rng.int(d <= 2 ? 1 : -5, 8) || 2
    const b = rng.int(-12, 15)
    const x = rng.int(-4, 10)
    const kind = rng.int(0, 1)
    if (kind === 0) {
      const sign = b >= 0 ? `+ ${b}` : `− ${-b}`
      return {
        story: tx(`f(x) = ${k}x ${sign}.`, `f(x) = ${k}x ${sign}.`, `f(x) = ${k}x ${sign}.`),
        question: tx(`Найди f(${x}).`, `f(${x}) тап.`, `Find f(${x}).`),
        hint: tx('Подставь x в формулу и посчитай.', 'x-ті формулаға қойып сана.', 'Substitute x into the formula and compute.'),
        explain: tx('Функция — правило. Аналитик считает значение в нужный день/час.', 'Функция — ереже. Аналитик керек күн/сағаттағы мәнді санайды.', 'A function is a rule. An analyst evaluates it at the needed time.'),
        answer: n(k * x + b),
      }
    }
    const x0 = rng.int(-6, 8)
    const y0 = k * x0 + b
    return {
      story: tx(
        `Прямая y = ${k}x ${b >= 0 ? `+ ${b}` : `− ${-b}`}.`,
        `Түзу y = ${k}x ${b >= 0 ? `+ ${b}` : `− ${-b}`}.`,
        `Line y = ${k}x ${b >= 0 ? `+ ${b}` : `− ${-b}`}.`,
      ),
      question: tx(`В какой x график даёт y = ${y0}?`, `График қай x-те y = ${y0} береді?`, `At what x does the graph give y = ${y0}?`),
      hint: tx('Реши уравнение k x + b = y.', 'k x + b = y теңдеуін шеш.', 'Solve k x + b = y.'),
      explain: tx('Обратная задача: по значению функции найти аргумент.', 'Кері есеп: функция мәні бойынша аргументті тап.', 'The inverse task: from a function value, find the input.'),
      answer: n(x0, 0.01),
    }
  },

  combinatorics: (_g, d, rng) => {
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      const n0 = rng.int(4, d <= 2 ? 7 : 10)
      const k = rng.int(2, Math.min(4, n0))
      return {
        story: tx(
          `PIN: ${k} позиции, на каждой ${n0} символов, повторы можно.`,
          `PIN: ${k} позиция, әрқайсысында ${n0} таңба, қайталауға болады.`,
          `A PIN has ${k} positions, ${n0} symbols each, repeats allowed.`,
        ),
        question: tx('Сколько кодов?', 'Неше код?', 'How many codes?'),
        hint: tx('Правило произведения: n^k.', 'Көбейту ережесі: n^k.', 'Product rule: n^k.'),
        explain: tx('Пространство паролей считают степенью, не суммой вариантов.', 'Құпиясөз кеңістігін нұсқа қосындысы емес, дәрежемен санайды.', 'Password space is a power, not a sum of options.'),
        answer: n(n0 ** k),
      }
    }
    if (kind === 1) {
      const n0 = rng.int(5, 9)
      const k = rng.int(2, 3)
      return {
        story: tx(
          `${k} призовых места, ${n0} бегунов, места разные, повторов нет.`,
          `${k} жүлделі орын, ${n0} жүгіруші, орындар әртүрлі, қайталау жоқ.`,
          `${k} prize places, ${n0} runners, distinct places, no repeats.`,
        ),
        question: tx('Сколько распределений мест? (размещения)', 'Неше орын үлестіру? (орналастыру)', 'How many place assignments? (permutations)'),
        hint: tx('n·(n−1)·… — k множителей.', 'n·(n−1)·… — k көбейткіш.', 'n·(n−1)·… — k factors.'),
        explain: tx('Порядок важен: первое и второе место — разные события.', 'Рет маңызды: бірінші мен екінші орын — әртүрлі оқиға.', 'Order matters: first and second place are different events.'),
        answer: n(perm(n0, k)),
      }
    }
    const n0 = rng.int(6, 10)
    const k = rng.int(2, 3)
    return {
      story: tx(
        `Комитет из ${k} человек выбирают из ${n0}, порядок в комитете не важен.`,
        `${n0} адамнан ${k} адамдық комитет, рет маңызды емес.`,
        `A committee of ${k} is chosen from ${n0}; order in the committee does not matter.`,
      ),
      question: tx('Число сочетаний C(n, k)?', 'Теру саны C(n, k)?', 'Number of combinations C(n, k)?'),
      hint: tx('C(n,k) = n! / (k!(n−k)!).', 'C(n,k) = n! / (k!(n−k)!).', 'C(n,k) = n! / (k!(n−k)!).'),
      explain: tx('Сочетания — когда важен набор, а не очередь.', 'Теру — жиын маңызды, кезек емес.', 'Combinations are when the set matters, not the order.'),
      answer: n(comb(n0, k)),
    }
  },

  trig: (_g, d, rng) => {
    const angles = [
      { deg: 30, sin: 0.5, cos: Math.sqrt(3) / 2, tan: 1 / Math.sqrt(3) },
      { deg: 45, sin: Math.SQRT1_2, cos: Math.SQRT1_2, tan: 1 },
      { deg: 60, sin: Math.sqrt(3) / 2, cos: 0.5, tan: Math.sqrt(3) },
    ] as const
    const ang = rng.pick(angles)
    const kind = rng.int(0, d <= 2 ? 2 : 4)
    if (kind === 0) {
      return {
        story: tx(
          `Острый угол ${ang.deg}°. Нужно точное значение синуса (десятичное).`,
          `Сүйір бұрыш ${ang.deg}°. Синустың дәл мәні керек (ондық).`,
          `An acute angle of ${ang.deg}°. You need the sine as a decimal.`,
        ),
        question: tx(`sin ${ang.deg}° = ?`, `sin ${ang.deg}° = ?`, `sin ${ang.deg}° = ?`),
        hint: tx('Таблица: 30°→1/2, 45°→√2/2, 60°→√3/2.', 'Кесте: 30°→1/2, 45°→√2/2, 60°→√3/2.', 'Table: 30°→1/2, 45°→√2/2, 60°→√3/2.'),
        explain: tx('Эти углы — стандарт 10 класса. Их не сводят к «просто подели 1 на 5».', 'Бұл бұрыштар — 10 сынып стандарты. Оларды «1-ді 5-ке бөл»-ге айналдырмайды.', 'These angles are grade-10 standard. They are not “just divide 1 by 5”.'),
        answer: n(ang.sin, 0.015),
      }
    }
    if (kind === 1) {
      return {
        story: tx(`Угол ${ang.deg}°, нужен косинус.`, `Бұрыш ${ang.deg}°, косинус керек.`, `Angle ${ang.deg}°, cosine is needed.`),
        question: tx(`cos ${ang.deg}° = ?`, `cos ${ang.deg}° = ?`, `cos ${ang.deg}° = ?`),
        hint: tx('cos 30°=√3/2, cos 45°=√2/2, cos 60°=1/2.', 'cos 30°=√3/2, cos 45°=√2/2, cos 60°=1/2.', 'cos 30°=√3/2, cos 45°=√2/2, cos 60°=1/2.'),
        explain: tx('Косинус — прилежащий катет / гипотенуза в прямоугольном треугольнике.', 'Косинус — тікбұрышты үшбұрышта іргелес катет / гипотенуза.', 'Cosine is adjacent over hypotenuse in a right triangle.'),
        answer: n(ang.cos, 0.015),
      }
    }
    if (kind === 2) {
      const hyp = rng.pick([8, 10, 12, 14, 16, 20])
      const opp = hyp * ang.sin
      return {
        story: tx(
          `Прямоугольный треугольник, угол ${ang.deg}°, гипотенуза ${hyp}.`,
          `Тікбұрышты үшбұрыш, бұрыш ${ang.deg}°, гипотенуза ${hyp}.`,
          `Right triangle, angle ${ang.deg}°, hypotenuse ${hyp}.`,
        ),
        question: tx('Противолежащий катет?', 'Қарсы катет?', 'Opposite leg?'),
        hint: tx('противолежащий = гипотенуза × sin α.', 'қарсы = гипотенуза × sin α.', 'opposite = hypotenuse × sin α.'),
        explain: tx('Высота по наклонной: лестница, пандус, луч маяка.', 'Еңіс бойынша биіктік: баспалдақ, пандус, маяк сәулесі.', 'Height along a slope: ladder, ramp, lighthouse beam.'),
        answer: n(opp, 0.08),
      }
    }
    if (kind === 3) {
      return {
        story: tx(`Найди tan ${ang.deg}° (десятичное).`, `tan ${ang.deg}° тап (ондық).`, `Find tan ${ang.deg}° (decimal).`),
        question: tx(`tan ${ang.deg}°`, `tan ${ang.deg}°`, `tan ${ang.deg}°`),
        hint: tx('tan = sin/cos; tan 45° = 1, tan 30° = 1/√3, tan 60° = √3.', 'tan = sin/cos; tan 45° = 1, tan 30° = 1/√3, tan 60° = √3.', 'tan = sin/cos; tan 45° = 1, tan 30° = 1/√3, tan 60° = √3.'),
        explain: tx('Тангенс связывает высоту объекта с расстоянием по земле.', 'Тангенс нысан биіктігін жердегі қашықтықпен байланыстырады.', 'Tangent links an object’s height to ground distance.'),
        answer: n(ang.tan, 0.02),
      }
    }
    return {
      story: tx('Основное тождество для любого угла α.', 'Кез келген α бұрышына негізгі тепе-теңдік.', 'The fundamental identity for any angle α.'),
      question: tx('sin²α + cos²α = ?', 'sin²α + cos²α = ?', 'sin²α + cos²α = ?'),
      hint: tx('Это тождество равно единице.', 'Бұл тепе-теңдік бірге тең.', 'This identity equals one.'),
      explain: tx('Пифагор на единичной окружности: 10 класс обязан это знать наизусть.', 'Бірлік шеңбердегі Пифагор: 10 сынып мұны жатқа білуі керек.', 'Pythagoras on the unit circle: grade 10 must know this by heart.'),
      answer: n(1),
    }
  },

  logs: (_g, d, rng) => {
    const kind = rng.int(0, d <= 2 ? 2 : 3)
    if (kind === 0) {
      const pairs = [
        [2, 3, 8],
        [2, 4, 16],
        [2, 5, 32],
        [2, 6, 64],
        [2, 7, 128],
        [3, 3, 27],
        [3, 4, 81],
        [5, 3, 125],
        [10, 2, 100],
        [10, 3, 1000],
      ] as const
      const [b, c, a] = rng.pick(pairs)
      return {
        story: tx(`Реши log_${b}(x) = ${c}.`, `log_${b}(x) = ${c} шеш.`, `Solve log_${b}(x) = ${c}.`),
        question: tx('x = ?', 'x = ?', 'x = ?'),
        hint: tx('Определение: log_b a = c ⇔ b^c = a.', 'Анықтама: log_b a = c ⇔ b^c = a.', 'Definition: log_b a = c ⇔ b^c = a.'),
        explain: tx('Логарифм — показатель степени. pH, децибелы, магнитуда — те же степени.', 'Логарифм — дәреже көрсеткіші. pH, децибел, магнитуда — сол дәрежелер.', 'A log is an exponent. pH, decibels, magnitude use the same powers.'),
        answer: n(a),
      }
    }
    if (kind === 1) {
      const pairs = [
        [2, 8, 3],
        [2, 32, 5],
        [2, 64, 6],
        [3, 81, 4],
        [10, 1000, 3],
        [5, 25, 2],
        [4, 64, 3],
      ] as const
      const [b, a, c] = rng.pick(pairs)
      return {
        story: tx(`Вычисли log_${b}(${a}).`, `log_${b}(${a}) есепте.`, `Evaluate log_${b}(${a}).`),
        question: tx('Значение логарифма', 'Логарифм мәні', 'Logarithm value'),
        hint: tx(`Какая степень ${b} даёт ${a}?`, `${b}-нің қай дәрежесі ${a} береді?`, `Which power of ${b} gives ${a}?`),
        explain: tx('Считать log — значит ответить «в какую степень возвести основание».', 'log санау — «негізді қай дәрежеге шығару» деп жауап беру.', 'Evaluating a log means answering “to what power do I raise the base”.'),
        answer: n(c),
      }
    }
    if (kind === 2) {
      const pairs = [
        [2, 5, 32],
        [2, 6, 64],
        [3, 4, 81],
        [5, 3, 125],
        [10, 3, 1000],
      ] as const
      const [b, x, a] = rng.pick(pairs)
      return {
        story: tx(`Реши ${b}^x = ${a}.`, `${b}^x = ${a} шеш.`, `Solve ${b}^x = ${a}.`),
        question: tx('x = ?', 'x = ?', 'x = ?'),
        hint: tx('Перейди к логарифму или подбери степень.', 'Логарифмге өт немесе дәрежені таңда.', 'Take a log or match the power.'),
        explain: tx('Показательные уравнения — пара логарифмов в 10–11 классе.', 'Көрсеткіштік теңдеулер — 10–11 сыныптағы логарифм жұбы.', 'Exponential equations are the partner of logs in grades 10–11.'),
        answer: n(x),
      }
    }
    const pairs = [
      [2, 8],
      [2, 16],
      [2, 32],
      [2, 64],
      [3, 27],
      [3, 81],
      [4, 64],
      [5, 25],
      [5, 125],
      [10, 100],
      [10, 1000],
    ] as const
    const [b, a] = rng.pick(pairs)
    const val = Math.log(a) / Math.log(b)
    return {
      story: tx(
        `Свойство: log_b a. Здесь a=${a}, b=${b}.`,
        `Қасиет: log_b a. Мұнда a=${a}, b=${b}.`,
        `Property: log_b a. Here a=${a}, b=${b}.`,
      ),
      question: tx('Чему равен логарифм (можно десятичным)?', 'Логарифм неге тең (ондықпен де болады)?', 'What is the log (decimal is ok)?'),
      hint: tx('log_b a = ln a / ln b, или смена основания.', 'log_b a = ln a / ln b, немесе негіз ауыстыру.', 'log_b a = ln a / ln b, or change of base.'),
      explain: tx('Смена основания нужна, когда табличного значения нет.', 'Кестелік мән жоқ кезде негіз ауыстыру керек.', 'Change of base is used when there is no table value.'),
      answer: n(val, 0.03),
    }
  },

  sequences: (_g, d, rng) => {
    const kind = rng.int(0, d <= 2 ? 1 : 3)
    if (kind === 0) {
      const a1 = rng.int(3, 20)
      const dif = rng.int(d <= 2 ? 2 : -5, 9) || 3
      const n0 = rng.int(6, d <= 3 ? 12 : 18)
      return {
        story: tx(
          `Арифметическая прогрессия: a₁=${a1}, разность d=${dif}.`,
          `Арифметикалық прогрессия: a₁=${a1}, айырма d=${dif}.`,
          `Arithmetic sequence: a₁=${a1}, common difference d=${dif}.`,
        ),
        question: tx(`Найди a${toSub(n0)}.`, `a${toSub(n0)} тап.`, `Find a${toSub(n0)}.`),
        hint: tx('a_n = a₁ + (n−1)d.', 'a_n = a₁ + (n−1)d.', 'a_n = a₁ + (n−1)d.'),
        explain: tx('Зарплата с фиксированной прибавкой, ряд мест в зале — арифметика.', 'Тұрақты үстемелі жалақы, залдағы орын қатары — арифметика.', 'A salary with a fixed raise, a row of seats — arithmetic.'),
        answer: n(a1 + (n0 - 1) * dif),
      }
    }
    if (kind === 1) {
      const a1 = rng.int(4, 15)
      const dif = rng.int(2, 7)
      const n0 = rng.int(5, 10)
      const an = a1 + (n0 - 1) * dif
      const sum = (n0 / 2) * (a1 + an)
      return {
        story: tx(
          `Арифметика: a₁=${a1}, d=${dif}, n=${n0} членов.`,
          `Арифметика: a₁=${a1}, d=${dif}, n=${n0} мүше.`,
          `Arithmetic: a₁=${a1}, d=${dif}, n=${n0} terms.`,
        ),
        question: tx('Сумма S_n?', 'Қосынды S_n?', 'Sum S_n?'),
        hint: tx('S_n = n/2 · (a₁ + a_n).', 'S_n = n/2 · (a₁ + a_n).', 'S_n = n/2 · (a₁ + a_n).'),
        explain: tx('Бюджет за n лет — сумма ряда, не «первый член × n».', 'n жылдық бюджет — қатар қосындысы, «бірінші мүше × n» емес.', 'An n-year budget is a series sum, not first term × n.'),
        answer: n(sum, 0.01),
      }
    }
    if (kind === 2) {
      const b1 = rng.pick([2, 3, 4, 5])
      const q = rng.pick([2, 3])
      const n0 = rng.int(4, d <= 3 ? 6 : 8)
      return {
        story: tx(
          `Геометрическая прогрессия: b₁=${b1}, знаменатель q=${q}.`,
          `Геометриялық прогрессия: b₁=${b1}, бөлім q=${q}.`,
          `Geometric sequence: b₁=${b1}, ratio q=${q}.`,
        ),
        question: tx(`Найди b${toSub(n0)}.`, `b${toSub(n0)} тап.`, `Find b${toSub(n0)}.`),
        hint: tx('b_n = b₁ · q^(n−1).', 'b_n = b₁ · q^(n−1).', 'b_n = b₁ · q^(n−1).'),
        explain: tx('Рост вклада, бактерий, радиоактивный распад — геометрическая прогрессия.', 'Салым, бактерия өсуі, радиоактивті ыдырау — геометриялық прогрессия.', 'Deposits, bacteria, radioactive decay — geometric sequences.'),
        answer: n(b1 * q ** (n0 - 1)),
      }
    }
    const a1 = rng.int(2, 9)
    const dif = rng.int(3, 8)
    const an = a1 + rng.int(8, 16) * dif
    const n0 = (an - a1) / dif + 1
    return {
      story: tx(
        `Ряд ${a1}, ${a1 + dif}, ${a1 + 2 * dif}, … содержит член ${an}.`,
        `${a1}, ${a1 + dif}, ${a1 + 2 * dif}, … қатарында ${an} мүшесі бар.`,
        `The sequence ${a1}, ${a1 + dif}, ${a1 + 2 * dif}, … contains the term ${an}.`,
      ),
      question: tx('Какой это по номеру член?', 'Бұл нешінші мүше?', 'Which term number is it?'),
      hint: tx('n = (a_n − a₁)/d + 1.', 'n = (a_n − a₁)/d + 1.', 'n = (a_n − a₁)/d + 1.'),
      explain: tx('Найти номер члена — обратная задача к формуле n-го члена.', 'Мүше нөмірін табу — n-ші мүше формуласының кері есебі.', 'Finding the index is the inverse of the nth-term formula.'),
      answer: n(n0),
    }
  },

  probability: (_g, d, rng) => {
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      const total = rng.pick([8, 10, 12, 16, 20])
      const good = rng.int(2, total - 2)
      return {
        story: tx(
          `В мешке ${total} шаров, из них ${good} красных. Тянут один наугад.`,
          `Қапта ${total} шар, оның ${good}-і қызыл. Біреуін кездейсоқ алады.`,
          `A bag has ${total} balls, ${good} red. One is drawn at random.`,
        ),
        question: tx('Вероятность красного?', 'Қызылдың ықтималдығы?', 'Probability of red?'),
        hint: tx('P = благоприятные / все.', 'P = қолайлы / барлығы.', 'P = favourable / total.'),
        explain: tx('Классическая вероятность 10 класса — отношение, не «на глаз».', '10 сыныптың классикалық ықтималдығы — қатынас, «көзбен» емес.', 'Grade-10 classical probability is a ratio, not a guess.'),
        answer: n(good / total, 0.01),
      }
    }
    if (kind === 1) {
      const p = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5])
      const q = rng.pick([0.2, 0.3, 0.4, 0.5])
      return {
        story: tx(
          `Два независимых события: P(A)=${p}, P(B)=${q}.`,
          `Екі тәуелсіз оқиға: P(A)=${p}, P(B)=${q}.`,
          `Two independent events: P(A)=${p}, P(B)=${q}.`,
        ),
        question: tx('P(A и B)?', 'P(A және B)?', 'P(A and B)?'),
        hint: tx('Для независимых P(A∩B)=P(A)·P(B).', 'Тәуелсіздерге P(A∩B)=P(A)·P(B).', 'If independent, P(A∩B)=P(A)·P(B).'),
        explain: tx('Два независимых теста, два броска — вероятности перемножают.', 'Екі тәуелсіз тест, екі лақтыру — ықтималдықтар көбейтіледі.', 'Two independent tests or rolls — multiply the probabilities.'),
        answer: n(p * q, 0.001),
      }
    }
    const loss = rng.int(4, 12) * 1000
    const p = rng.pick([0.1, 0.15, 0.2, 0.25])
    return {
      story: tx(
        `Убыток ${loss} ₸ случается с вероятностью ${p}.`,
        `${loss} ₸ зиян ${p} ықтималдықпен болады.`,
        `A loss of ${loss} ₸ happens with probability ${p}.`,
      ),
      question: tx('Математическое ожидание убытка?', 'Зиянның математикалық күтімі?', 'Expected loss?'),
      hint: tx('E = p × сумма.', 'E = p × сома.', 'E = p × amount.'),
      explain: tx('Страховка и риск-менеджмент считают ожидание, не худший случай вслепую.', 'Сақтандыру мен тәуекел күтімді санайды, ең жаманын көрмей емес.', 'Insurance and risk management use expectation, not a blind worst case.'),
      unit: tx('₸', '₸', '₸'),
      answer: n(p * loss, 0.01),
    }
  },

  derivative: (_g, d, rng) => {
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      const a = rng.int(1, 5)
      const n0 = rng.int(2, 5)
      const b = rng.int(-8, 8)
      const x = rng.int(1, 4)
      const val = a * n0 * x ** (n0 - 1) + b
      const bs = b === 0 ? '' : b > 0 ? ` + ${b}x` : ` − ${-b}x`
      return {
        story: tx(
          `f(x) = ${a === 1 ? '' : a}x^${n0}${bs}.`,
          `f(x) = ${a === 1 ? '' : a}x^${n0}${bs}.`,
          `f(x) = ${a === 1 ? '' : a}x^${n0}${bs}.`,
        ),
        question: tx(`Найди f'(${x}).`, `f'(${x}) тап.`, `Find f'(${x}).`),
        hint: tx('(x^n)′ = n x^{n−1}, константа·x даёт константу.', '(x^n)′ = n x^{n−1}, тұрақты·x тұрақты береді.', '(x^n)′ = n x^{n−1}, constant·x differentiates to the constant.'),
        explain: tx('Производная в точке — мгновенная скорость изменения.', 'Нүктедегі туынды — өзгерістің лездік жылдамдығы.', 'The derivative at a point is the instantaneous rate of change.'),
        answer: n(val),
      }
    }
    if (kind === 1) {
      const a = rng.pick([1, 1, 2])
      const b = rng.int(-12, -2) * 2
      const vx = -b / (2 * a)
      return {
        story: tx(
          `y = ${a === 1 ? '' : a}x² ${b}x + 5 (парабола).`,
          `y = ${a === 1 ? '' : a}x² ${b}x + 5 (парабола).`,
          `y = ${a === 1 ? '' : a}x² ${b}x + 5 (a parabola).`,
        ),
        question: tx('x критической точки (вершины)?', 'Критикалық нүктенің (төбенің) x-і?', 'x of the critical point (vertex)?'),
        hint: tx('y′ = 2ax + b = 0, или x = −b/(2a).', 'y′ = 2ax + b = 0, немесе x = −b/(2a).', 'y′ = 2ax + b = 0, or x = −b/(2a).'),
        explain: tx('Экстремум прибыли или высоты ищут там, где производная ноль.', 'Пайда не биіктік экстремумы туынды нөл жерде ізделеді.', 'A profit or height extremum is where the derivative is zero.'),
        answer: n(vx, 0.01),
      }
    }
    const k = rng.int(2, 9)
    return {
      story: tx(`f(x) = ${k} (константа).`, `f(x) = ${k} (тұрақты).`, `f(x) = ${k} (a constant).`),
      question: tx("f'(x) = ?", "f'(x) = ?", "f'(x) = ?"),
      hint: tx('Производная константы равна нулю.', 'Тұрақтының туындысы нөл.', 'The derivative of a constant is zero.'),
      explain: tx('Постоянная величина не меняется — скорость изменения 0.', 'Тұрақты шама өзгермейді — өзгеріс жылдамдығы 0.', 'A constant quantity does not change — rate of change is 0.'),
      answer: n(0),
    }
  },

  integral: (_g, d, rng) => {
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      const a = rng.int(1, 5)
      const b = rng.int(0, 8)
      const hi = rng.int(3, 6)
      const val = (a / 2) * hi * hi + b * hi
      const bs = b === 0 ? '' : ` + ${b}`
      return {
        story: tx(
          `∫ от 0 до ${hi} (${a}x${bs}) dx.`,
          `∫ 0-ден ${hi}-ге (${a}x${bs}) dx.`,
          `∫ from 0 to ${hi} of (${a}x${bs}) dx.`,
        ),
        question: tx('Значение определённого интеграла?', 'Анықталған интеграл мәні?', 'Value of the definite integral?'),
        hint: tx('Первообразная ax²/2 + bx, затем F(верх) − F(низ).', 'Первообразная ax²/2 + bx, сосын F(жоғарғы) − F(төменгі).', 'Antiderivative ax²/2 + bx, then F(top) − F(bottom).'),
        explain: tx('Определённый интеграл — площадь под графиком, путь при известной скорости.', 'Анықталған интеграл — график астындағы аудан, жылдамдық белгілі жол.', 'A definite integral is area under a graph, or distance when speed is known.'),
        answer: n(val, 0.05),
      }
    }
    if (kind === 1) {
      const n0 = rng.int(2, 4)
      const c = n0 + 1
      return {
        story: tx(`Неопределённый интеграл ∫ ${c}x^${n0} dx (без +C, коэффициент при x^${c}).`, `Анықталмаған интеграл ∫ ${c}x^${n0} dx (+C жоқ, x^${c} коэффициенті).`, `Indefinite integral ∫ ${c}x^${n0} dx (omit +C; coefficient of x^${c}).`),
        question: tx(`Коэффициент при x^${c}?`, `x^${c} коэффициенті?`, `Coefficient of x^${c}?`),
        hint: tx('∫ x^n dx = x^{n+1}/(n+1).', '∫ x^n dx = x^{n+1}/(n+1).', '∫ x^n dx = x^{n+1}/(n+1).'),
        explain: tx('Интегрирование — обратная операция к дифференцированию.', 'Интегралдау — дифференциалдауға кері амал.', 'Integration is the inverse of differentiation.'),
        answer: n(1),
      }
    }
    const v = rng.int(2, 6)
    const t = rng.int(3, 8)
    return {
      story: tx(
        `Скорость постоянна ${v} м/с, время ${t} с. Путь = ∫v dt.`,
        `Жылдамдық тұрақты ${v} м/с, уақыт ${t} с. Жол = ∫v dt.`,
        `Speed is a constant ${v} m/s for ${t} s. Distance = ∫v dt.`,
      ),
      question: tx('Путь в метрах?', 'Жол метрмен?', 'Distance in metres?'),
      hint: tx('Интеграл константы на [0;t] равен v·t.', '[0;t] аралығындағы тұрақтының интегралы v·t.', 'The integral of a constant on [0, t] is v·t.'),
      explain: tx('Даже «простое» s=vt в 12 классе читают как определённый интеграл.', '12 сыныпта «қарапайым» s=vt-ны анықталған интеграл деп оқиды.', 'Even the simple s=vt is read as a definite integral in grade 12.'),
      unit: tx('м', 'м', 'm'),
      answer: n(v * t),
    }
  },

  complex: (_g, d, rng) => {
    const a = rng.int(-8, 9) || 3
    const b = rng.int(-8, 9) || 4
    const kind = rng.int(0, d <= 2 ? 1 : 2)
    if (kind === 0) {
      return {
        story: tx(`z = ${a} + ${b}i.`, `z = ${a} + ${b}i.`, `z = ${a} + ${b}i.`),
        question: tx('|z| = √(a²+b²)?', '|z| = √(a²+b²)?', '|z| = √(a²+b²)?'),
        hint: tx('Модуль — расстояние до начала координат на плоскости.', 'Модуль — жазықтықтағы бас нүктеге дейінгі қашықтық.', 'The modulus is the distance to the origin in the plane.'),
        explain: tx('Модуль комплексного — теорема Пифагора на плоскости Argand.', 'Комплекс модулі — Argand жазықтығындағы Пифагор теоремасы.', 'Complex modulus is Pythagoras on the Argand plane.'),
        answer: n(Math.hypot(a, b), 0.05),
      }
    }
    if (kind === 1) {
      const c = rng.int(-5, 6)
      const d2 = rng.int(-5, 6)
      return {
        story: tx(
          `z₁ = ${a}+${b}i, z₂ = ${c}+${d2}i. Сложи. Ответ — действительная часть суммы.`,
          `z₁ = ${a}+${b}i, z₂ = ${c}+${d2}i. Қос. Жауап — қосындының нақты бөлігі.`,
          `z₁ = ${a}+${b}i, z₂ = ${c}+${d2}i. Add them. Answer = real part of the sum.`,
        ),
        question: tx('Re(z₁+z₂)', 'Re(z₁+z₂)', 'Re(z₁+z₂)'),
        hint: tx('Действительные и мнимые части складывают отдельно.', 'Нақты және жорамал бөліктер бөлек қосылады.', 'Add real and imaginary parts separately.'),
        explain: tx('Сложение комплексных — как сложение векторов.', 'Комплекстерді қосу — вектор қосу сияқты.', 'Adding complex numbers is like adding vectors.'),
        answer: n(a + c),
      }
    }
    const c = rng.int(-4, 5) || 1
    const d2 = rng.int(-4, 5) || 2
    const real = a * c - b * d2
    return {
      story: tx(
        `(${a}+${b}i)(${c}+${d2}i). Нужна действительная часть произведения.`,
        `(${a}+${b}i)(${c}+${d2}i). Көбейтіндінің нақты бөлігі керек.`,
        `(${a}+${b}i)(${c}+${d2}i). Need the real part of the product.`,
      ),
      question: tx('Re(z₁ z₂)', 'Re(z₁ z₂)', 'Re(z₁ z₂)'),
      hint: tx('i² = −1, поэтому (a+bi)(c+di) = ac−bd + (ad+bc)i.', 'i² = −1, сондықтан (a+bi)(c+di) = ac−bd + (ad+bc)i.', 'i² = −1, so (a+bi)(c+di) = ac−bd + (ad+bc)i.'),
      explain: tx('Умножение комплексных поворачивает и масштабирует плоскость.', 'Комплекс көбейту жазықтықты бұрады және масштабтайды.', 'Complex multiplication rotates and scales the plane.'),
      answer: n(real),
    }
  },

  series: (_g, d, rng) => {
    const kind = rng.int(0, 1)
    if (kind === 0) {
      const b1 = rng.pick([1, 2, 3])
      const q = 2
      const n0 = rng.int(5, d <= 3 ? 7 : 9)
      const sum = b1 * (q ** n0 - 1) / (q - 1)
      return {
        story: tx(
          `Геометрический ряд: b₁=${b1}, q=${q}, ${n0} членов.`,
          `Геометриялық қатар: b₁=${b1}, q=${q}, ${n0} мүше.`,
          `Geometric series: b₁=${b1}, q=${q}, ${n0} terms.`,
        ),
        question: tx('Сумма S_n?', 'Қосынды S_n?', 'Sum S_n?'),
        hint: tx('S_n = b₁ (q^n − 1)/(q − 1) при q≠1.', 'S_n = b₁ (q^n − 1)/(q − 1), q≠1.', 'S_n = b₁ (q^n − 1)/(q − 1) when q≠1.'),
        explain: tx('12 класс: сумма конечной геом. прогрессии, не почленное сложение.', '12 сынып: ақырлы геом. прогрессия қосындысы, мүшелеп қосу емес.', 'Grade 12: finite geometric sum, not term-by-term addition.'),
        answer: n(sum),
      }
    }
    const vals = Array.from({ length: rng.int(4, 6) }, () => rng.int(4, 18))
    const mean = vals.reduce((s, v) => s + v, 0) / vals.length
    return {
      story: tx(
        `Набор данных: ${vals.join(', ')}.`,
        `Дерек жиыны: ${vals.join(', ')}.`,
        `Data set: ${vals.join(', ')}.`,
      ),
      question: tx('Среднее арифметическое?', 'Арифметикалық орта?', 'Arithmetic mean?'),
      hint: tx('Сумма всех значений / количество.', 'Барлық мән қосындысы / саны.', 'Sum of all values / count.'),
      explain: tx('Среднее — базовая статистика экзамена и отчётов.', 'Орташа — емтихан мен есептің базалық статистикасы.', 'The mean is basic exam and report statistics.'),
      answer: n(mean, 0.05),
    }
  },
}

function toSub(n0: number) {
  return String(n0)
}
