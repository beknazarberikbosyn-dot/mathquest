import type { Grade, Mission, Step, Topic } from '../types'
import { tx } from '../types'

const tenge = tx('₸', '₸', '₸')
const pct = tx('%', '%', '%')

function n(value: number, tolerance?: number): Step['answer'] {
  return { kind: 'number', value, ...(tolerance ? { tolerance } : {}) }
}

function m(id: string, profession: string, title: [string, string, string], steps: Step[], xp = 50): Mission {
  return { id, profession, title: tx(title[0], title[1], title[2]), xp, steps }
}

function topic(id: string, title: [string, string, string], blurb: [string, string, string], missions: Mission[]): Topic {
  return { id, title: tx(title[0], title[1], title[2]), blurb: tx(blurb[0], blurb[1], blurb[2]), missions }
}

export const GRADES_5_8: Grade[] = [
  {
    grade: 5,
    title: tx('Пятый класс', 'Бесінші сынып', 'Grade 5'),
    world: tx('Город процентов', 'Пайыз қаласы', 'Percent city'),
    color: '#26a69a',
    topics: [
      topic(
        'g5-dec',
        ['Десятичные дроби', 'Ондық бөлшектер', 'Decimals'],
        ['Касса и ювелир считают тенге с тиынами — это десятичные.', 'Касса мен зергер тиынды теңгемен санайды — бұл ондықтар.', 'Tills and jewellers count tenge and tiyn — that is decimals.'],
        [
          m('g5-cashier-bill', 'cashier', ['Чек в супермаркете', 'Супермаркет чегі', 'A supermarket bill'], [
            {
              story: tx('Хлеб 189.50 ₸, сыр 640.20 ₸, чай 275.30 ₸.', 'Нан 189.50 ₸, ірімшік 640.20 ₸, шай 275.30 ₸.', 'Bread 189.50 ₸, cheese 640.20 ₸, tea 275.30 ₸.'),
              question: tx('Сумма чека?', 'Чек сомасы?', 'What is the bill total?'),
              hint: tx('Сложи по разрядам: тенге, потом тиыны.', 'Разряд бойынша қос: теңге, сосын тиын.', 'Add place by place: tenge, then tiyn.'),
              explain: tx('Касса складывает десятичные, потому что цена — не целое число.', 'Касса ондықты қосады, себебі баға бүтін емес.', 'Tills add decimals because prices are not whole numbers.'),
              unit: tenge,
              answer: n(1105, 0.05),
            },
            {
              story: tx('Ты даёшь 1200 ₸.', 'Сен 1200 ₸ бересің.', 'You pay 1200 ₸.'),
              question: tx('Сдача?', 'Қайтарым?', 'Change?'),
              hint: tx('1200 − 1105.', '1200 − 1105.'),
              explain: tx('Сдачу считают до тиына: клиент сразу видит ошибку.', 'Қайтарымды тиынға дейін санайды: клиент қатені бірден көреді.', 'Change is counted to the tiyn so a customer spots mistakes instantly.'),
              unit: tenge,
              answer: n(95, 0.05),
            },
          ]),
          m('g5-engineer-wire', 'engineer', ['Кабель в щите', 'Қалқандағы кабель', 'Cable in a panel'], [
            {
              story: tx('Нужно 3 куска кабеля: 1.25 м, 0.8 м и 2.45 м.', 'Кабельдің 3 кесіндісі керек: 1.25 м, 0.8 м және 2.45 м.', 'You need 3 cable pieces: 1.25 m, 0.8 m and 2.45 m.'),
              question: tx('Сколько метров купить одним мотком?', 'Бір ораммен неше метр алу керек?', 'How many metres to buy as one coil?'),
              hint: tx('1.25 + 0.8 + 2.45.', '1.25 + 0.8 + 2.45.'),
              explain: tx('Электрик заказывает длину с запасом по сумме кусков.', 'Электрик кесінді қосындысы бойынша ұзындыққа тапсырыс береді.', 'Electricians order length from the sum of the pieces.'),
              unit: tx('м', 'м', 'm'),
              answer: n(4.5, 0.02),
            },
            {
              story: tx('Мотки продают по 5 м. Сколько метров останется?', 'Орам 5 м-ден сатылады. Неше метр қалады?', 'Coils are sold in 5 m. How many metres leftover?'),
              question: tx('Остаток мотка', 'Орам қалдығы', 'Leftover coil'),
              hint: tx('5 − 4.5.', '5 − 4.5.'),
              explain: tx('Остаток кладут в запас — на следующий щит.', 'Қалдықты келесі қалқанға қосалқыға қояды.', 'The leftover goes into stock for the next panel.'),
              unit: tx('м', 'м', 'm'),
              answer: n(0.5, 0.02),
            },
          ]),
        ],
      ),
      topic(
        'g5-pct',
        ['Проценты: скидки', 'Пайыз: жеңілдік', 'Percents: discounts'],
        ['Магазин и банк говорят на языке процентов.', 'Дүкен мен банк пайыз тілінде сөйлейді.', 'Shops and banks speak percent.'],
        [
          m('g5-seller-sale', 'seller', ['Скидка на Наурыз', 'Наурыз жеңілдігі', 'Nauryz sale'], [
            {
              story: tx('Куртка стоит 20 000 ₸. Скидка 15%.', 'Куртка 20 000 ₸. Жеңілдік 15%.', 'A jacket costs 20 000 ₸. Discount 15%.'),
              question: tx('На сколько тенге дешевле?', 'Неше теңгеге арзан?', 'How many tenge cheaper?'),
              hint: tx('15% = 0.15. 20000 × 0.15.', '15% = 0.15. 20000 × 0.15.'),
              explain: tx('Скидка — это процент от цены. Продавец считает его до кассы.', 'Жеңілдік — бағаның пайызы. Сатушы оны кассаға дейін санайды.', 'A discount is a percent of the price. Staff compute it before checkout.'),
              unit: tenge,
              answer: n(3000),
            },
            {
              story: tx('Какая итоговая цена куртки?', 'Куртканың қорытынды бағасы қандай?', 'What is the final jacket price?'),
              question: tx('Цена со скидкой', 'Жеңілдікті баға', 'Sale price'),
              hint: tx('20000 − 3000.', '20000 − 3000.'),
              explain: tx('Итог = 100% − скидка. Покупатель сравнивает магазины по этой цифре.', 'Қорытынды = 100% − жеңілдік. Сатып алушы дүкенді осы санмен салыстырады.', 'Final price = 100% − discount. Shoppers compare stores with that number.'),
              unit: tenge,
              answer: n(17000),
            },
          ]),
          m('g5-athlete-stats', 'athlete', ['Точность бросков', 'Лақтыру дәлдігі', 'Shot accuracy'], [
            {
              story: tx('Баскетболист попал 18 из 25 бросков.', 'Баскетболшы 25 лақтырудың 18-ін тигізді.', 'A basketball player made 18 of 25 shots.'),
              question: tx('Какой процент попаданий?', 'Тигізу пайызы қандай?', 'What is the shooting percentage?'),
              hint: tx('(18 / 25) × 100.', '(18 / 25) × 100.'),
              explain: tx('Тренер переводит «сколько из скольких» в проценты — так сравнивают игроков.', 'Жаттықтырушы «қаншаның қаншасы» дегенді пайызға аударады — ойыншыларды солай салыстырады.', 'Coaches convert “how many out of how many” into percents to compare players.'),
              unit: pct,
              answer: n(72),
            },
            {
              story: tx('Цель — 80%. Из 25 бросков сколько нужно попасть?', 'Мақсат — 80%. 25 лақтырудың нешеуін тигізу керек?', 'The goal is 80%. How many makes out of 25?'),
              question: tx('Нужные попадания', 'Керек тигізу', 'Makes needed'),
              hint: tx('80% от 25.', '25-тің 80%.'),
              explain: tx('План тренировки — процент, переведённый обратно в штуки.', 'Жаттығу жоспары — пайызды қайта данаға аудару.', 'A training plan is a percent translated back into makes.'),
              answer: n(20),
            },
          ]),
        ],
      ),
      topic(
        'g5-vol',
        ['Объём', 'Көлем', 'Volume'],
        ['Бассейн, аквариум и бетон считают в кубометрах и литрах.', 'Бассейн, аквариум мен бетонды текше метр мен литрмен санайды.', 'Pools, tanks and concrete are counted in cubic metres and litres.'],
        [
          m('g5-builder-pool', 'builder', ['Бассейн во дворе', 'Ауладағы бассейн', 'A backyard pool'], [
            {
              story: tx('Вот бассейн: длина 5 м, ширина 2 м, глубина 1.5 м. Объём — произведение трёх рёбер.', 'Міне бассейн: ұзындығы 5 м, ені 2 м, тереңдігі 1.5 м. Көлем — үш қырдың көбейтіндісі.', 'Here is the pool: 5 m long, 2 m wide, 1.5 m deep. Volume is the product of the three edges.'),
              question: tx('Объём в м³?', 'Көлем м³?', 'Volume in m³?'),
              hint: tx('Длина × ширина × глубина.', 'Ұзындық × ен × тереңдік.'),
              explain: tx('Строитель заказывает воду и бетон по объёму, не по площади дна.', 'Құрылысшы су мен бетонды түп ауданы емес, көлем бойынша алады.', 'Builders order water and concrete by volume, not floor area.'),
              unit: tx('м³', 'м³', 'm³'),
              visual: { scene: 'pool', marks: { width: tx('5 м', '5 м', '5 m'), height: tx('2 м', '2 м', '2 m'), depth: tx('1.5 м', '1.5 м', '1.5 m') } },
              answer: n(15),
            },
            {
              story: tx('1 м³ = 1000 литров. Сколько литров воды?', '1 м³ = 1000 литр. Неше литр су?', '1 m³ = 1000 litres. How many litres of water?'),
              question: tx('Литры', 'Литр', 'Litres'),
              hint: tx('15 × 1000.', '15 × 1000.'),
              explain: tx('Насосы и счета за воду часто в литрах или тоннах.', 'Сорғы мен су шоты жиі литр немесе тоннамен.', 'Pumps and water bills often use litres or tonnes.'),
              unit: tx('л', 'л', 'L'),
              answer: n(15000),
            },
          ]),
          m('g5-vet-tank', 'vet', ['Аквариум в клинике', 'Клиникадағы аквариум', 'Clinic aquarium'], [
            {
              story: tx('Аквариум 80 см × 40 см × 50 см. Считай в см³, потом в литрах (1 л = 1000 см³).', 'Аквариум 80 см × 40 см × 50 см. см³, сосын литр (1 л = 1000 см³).', 'Tank 80 cm × 40 cm × 50 cm. Use cm³, then litres (1 L = 1000 cm³).'),
              question: tx('Сколько литров?', 'Неше литр?', 'How many litres?'),
              hint: tx('80×40×50 = 160000 см³ → ÷1000.', '80×40×50 = 160000 см³ → ÷1000.'),
              explain: tx('Ветеринар для рыб подбирает объём: от него зависит фильтр и корм.', 'Балық ветеринары көлем таңдайды: фильтр мен жем соған байланысты.', 'A fish vet sizes the tank: filter and feed depend on volume.'),
              unit: tx('л', 'л', 'L'),
              answer: n(160),
            },
            {
              story: tx('Заполняют только на 3/4, чтобы рыбы дышали.', 'Балықтар тыныстасын деп тек 3/4 толтырады.', 'Fill only 3/4 so the fish can breathe.'),
              question: tx('Сколько литров налить?', 'Неше литр құю керек?', 'How many litres to pour?'),
              hint: tx('160 × 0.75.', '160 × 0.75.'),
              explain: tx('Долю объёма считают заранее — иначе вода выплёскивается при перевозке.', 'Көлем үлесін алдын ала санайды — әйтпесе тасымалдағанда су төгіледі.', 'You compute a fraction of volume first, or water sloshes out in transit.'),
              unit: tx('л', 'л', 'L'),
              answer: n(120),
            },
          ]),
        ],
      ),
      topic(
        'g5-avg',
        ['Среднее', 'Орташа', 'Averages'],
        ['Тренер и журналист сравнивают серии чисел одним средним.', 'Жаттықтырушы мен журналист сан қатарын бір орташамен салыстырады.', 'Coaches and journalists compress a list into one average.'],
        [
          m('g5-athlete-run', 'athlete', ['Пробежки за неделю', 'Апталық жүгіру', 'Weekly runs'], [
            {
              story: tx('Ученик пробежал 3, 5, 4, 6 и 2 км.', 'Оқушы 3, 5, 4, 6 және 2 км жүгірді.', 'A student ran 3, 5, 4, 6 and 2 km.'),
              question: tx('Средняя дистанция за день?', 'Күндік орташа қашықтық?', 'Average distance per day?'),
              hint: tx('Сумма / 5.', 'Қосынды / 5.'),
              explain: tx('Тренер смотрит среднее, а не один удачный день.', 'Жаттықтырушы бір сәтті күнді емес, орташаны қарайды.', 'A coach watches the average, not one lucky day.'),
              unit: tx('км', 'км', 'km'),
              answer: n(4),
            },
            {
              story: tx('На 6-й день он хочет среднее 5 км.', '6-шы күні орташа 5 км болғанын қалайды.', 'On day 6 he wants the average to become 5 km.'),
              question: tx('Сколько км пробежать в 6-й день?', '6-шы күні неше км жүгіру керек?', 'How many km on day 6?'),
              hint: tx('Сумма 6 дней должна быть 30. Уже есть 20.', '6 күннің қосындысы 30 болуға тиіс. Қазір 20 бар.'),
              explain: tx('Чтобы поднять среднее, считают недостающую сумму — так ставят цели.', 'Орташаны көтеру үшін жетіспейтін қосындыны санайды — мақсат солай қойылады.', 'To lift an average you compute the missing total — that is how goals are set.'),
              unit: tx('км', 'км', 'km'),
              answer: n(10),
            },
          ]),
          m('g5-reporter-poll', 'reporter', ['Опрос класса', 'Сынып сауалы', 'Class poll'], [
            {
              story: tx('Оценки за проект: 4, 5, 5, 3, 4.', 'Жоба бағалары: 4, 5, 5, 3, 4.', 'Project scores: 4, 5, 5, 3, 4.'),
              question: tx('Средний балл?', 'Орташа балл?', 'Average score?'),
              hint: tx('(4+5+5+3+4)/5.', '(4+5+5+3+4)/5.'),
              explain: tx('Журналист и учитель сжимают пачку оценок в одно число.', 'Журналист пен мұғалім баға бумасын бір санға сығады.', 'Reporters and teachers squeeze a pile of scores into one number.'),
              answer: n(4.2, 0.05),
            },
            {
              story: tx('Если добавить работу на 5, каким станет среднее? 6 оценок.', '5-тік жұмысты қосса, орташа қандай болады? 6 баға.', 'If you add a score of 5, what is the new average of 6 scores?'),
              question: tx('Новое среднее', 'Жаңа орташа', 'New average'),
              hint: tx('(21+5)/6.', '(21+5)/6.'),
              explain: tx('Одна сильная работа тянет среднее вверх — но не мгновенно к пятёрке.', 'Бір күшті жұмыс орташаны көтереді — бірақ бірден бестікке емес.', 'One strong piece pulls the average up — but not instantly to a perfect score.'),
              answer: n(4.333, 0.02),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 6,
    title: tx('Шестой класс', 'Алтыншы сынып', 'Grade 6'),
    world: tx('Мастерская пропорций', 'Пропорция шеберханасы', 'Workshop of ratios'),
    color: '#fb8c00',
    topics: [
      topic(
        'g6-ratio',
        ['Отношения и масштаб', 'Қатынас пен масштаб', 'Ratios and scale'],
        ['Карта, рецепт и чертёж живут в пропорциях.', 'Карта, рецепт пен сызба пропорцияда тұрады.', 'Maps, recipes and blueprints live in proportion.'],
        [
          m('g6-chef-lagman', 'chef', ['Лагман на компанию', 'Серіктестікке лағман', 'Lagman for a group'], [
            {
              story: tx('На 2 порции нужно 300 г лапши. Готовят на 5 порций.', '2 порцияға 300 г кеспе керек. 5 порцияға пісіреді.', '2 portions need 300 g of noodles. They cook for 5 portions.'),
              question: tx('Сколько граммов лапши?', 'Неше грамм кеспе?', 'How many grams of noodles?'),
              hint: tx('300/2 × 5.', '300/2 × 5.'),
              explain: tx('Пропорция сохраняет вкус: все продукты увеличивают в одном отношении.', 'Пропорция дәмді сақтайды: барлық өнім бір қатынаста өседі.', 'Proportion keeps the taste: every ingredient scales by the same ratio.'),
              unit: tx('г', 'г', 'g'),
              answer: n(750),
            },
            {
              story: tx('Бульона на 2 порции 0.8 л. На 5?', '2 порцияға сорпа 0.8 л. 5-ке?', 'Broth for 2 portions is 0.8 L. For 5?'),
              question: tx('Литры бульона', 'Сорпа литрі', 'Litres of broth'),
              hint: tx('0.8 / 2 × 5.', '0.8 / 2 × 5.'),
              explain: tx('Жидкости тоже масштабируют — иначе лагман будет сухим или жидким.', 'Сұйықтықты да масштабтайды — әйтпесе лағман құрғақ не сұйық болады.', 'Liquids scale too, or the lagman turns dry or watery.'),
              unit: tx('л', 'л', 'L'),
              answer: n(2, 0.02),
            },
          ]),
          m('g6-architect-map', 'architect', ['План школы', 'Мектеп жоспары', 'School plan'], [
            {
              story: tx('На чертеже масштаб 1:200. Коридор на бумаге — 8 см. В жизни он в 200 раз длиннее.', 'Сызбада масштаб 1:200. Қағаздағы дәліз — 8 см. Өмірде ол 200 есе ұзын.', 'The drawing scale is 1:200. The corridor on paper is 8 cm. In life it is 200 times longer.'),
              question: tx('Какова реальная длина в метрах? (8 см × 200 = ? см, потом в метры)', 'Нақты ұзындығы неше метр?', 'What is the real length in metres?'),
              hint: tx('8 × 200 = 1600 см = 16 м.', '8 × 200 = 1600 см = 16 м.'),
              explain: tx('Архитектор читает масштаб как отношение «на бумаге : в жизни».', 'Сәулетші масштабты «қағазда : өмірде» қатынасы деп оқиды.', 'Architects read scale as the ratio “on paper : in life”.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'plan', marks: { scale: tx('1:200', '1:200', '1:200'), width: tx('8 см', '8 см', '8 cm') } },
              answer: n(16),
            },
            {
              story: tx('Спортзал длиной 24 м. Какой длины он на том же плане (см)?', 'Спортзал 24 м. Сол жоспарда ұзындығы (см)?', 'The gym is 24 m. How long is it on the same plan (cm)?'),
              question: tx('Сантиметры на плане', 'Жоспардағы сантиметр', 'Centimetres on the plan'),
              hint: tx('24 м = 2400 см, раздели на 200.', '24 м = 2400 см, 200-ге бөл.'),
              explain: tx('Обратная пропорция: жизнь → бумага. Так влезает школа на лист А3.', 'Кері пропорция: өмір → қағаз. Мектеп А3 параққа солай сияды.', 'The inverse proportion: life → paper. That is how a school fits on A3.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(12),
            },
          ]),
        ],
      ),
      topic(
        'g6-pct2',
        ['Проценты в банке', 'Банктегі пайыз', 'Percents at the bank'],
        ['Вклад, налог и чаевые — проценты, которые уже про деньги.', 'Салым, салық пен шайпұл — ақша туралы пайыз.', 'Deposits, tax and tips are percents about money.'],
        [
          m('g6-banker-deposit', 'banker', ['Первый вклад', 'Алғашқы салым', 'A first deposit'], [
            {
              story: tx('Положили 40 000 ₸ под 8% годовых на 1 год без капитализации.', '40 000 ₸-ні 8% жылдықпен 1 жылға, капитализациясыз қойды.', '40 000 ₸ at 8% per year for 1 year, no compounding.'),
              question: tx('Сколько тенге составят проценты за год?', 'Бір жылда пайыз қанша теңге?', 'How many tenge is one year of interest?'),
              hint: tx('40000 × 0.08.', '40000 × 0.08.'),
              explain: tx('Простой процент — доля от исходной суммы. Банк показывает его в договоре.', 'Жай пайыз — бастапқы соманың үлесі. Банк оны шартта көрсетеді.', 'Simple interest is a share of the original sum. Banks print it in the contract.'),
              unit: tenge,
              answer: n(3200),
            },
            {
              story: tx('Сколько будет на счёте через год?', 'Бір жылдан кейін шотта қанша болады?', 'How much will be in the account after a year?'),
              question: tx('Итого на счёте', 'Шоттағы қорытынды', 'Account total'),
              hint: tx('40000 + 3200.', '40000 + 3200.'),
              explain: tx('Итог = тело вклада + проценты. Это первая модель роста денег.', 'Қорытынды = салым денесі + пайыз. Бұл ақша өсуінің алғашқы моделі.', 'Total = principal + interest. It is the first model of money growth.'),
              unit: tenge,
              answer: n(43200),
            },
          ]),
          m('g6-barista-tip', 'barista', ['Чаевые счёту', 'Шотқа шайпұл', 'A tip on the bill'], [
            {
              story: tx('Счёт в кафе 4500 ₸. Чаевые 10%.', 'Кафе шоты 4500 ₸. Шайпұл 10%.', 'Cafe bill 4500 ₸. Tip 10%.'),
              question: tx('Сколько тенге чаевых?', 'Шайпұл қанша теңге?', 'How many tenge is the tip?'),
              hint: tx('10% = десятая часть.', '10% = оннан бір.'),
              explain: tx('10% считают быстро: сдвигают запятую. Официанты так делают в уме.', '10%-ті тез санайды: үтірді жылжытады. Даяшылар ойша солай істейді.', '10% is a quick decimal shift. Waiters do it mentally.'),
              unit: tenge,
              answer: n(450),
            },
            {
              story: tx('Сколько заплатить всего?', 'Барлығы қанша төлеу керек?', 'What is the total to pay?'),
              question: tx('Счёт + чаевые', 'Шот + шайпұл', 'Bill + tip'),
              hint: tx('4500 + 450.', '4500 + 450.'),
              explain: tx('Итог с чаевыми — 110% счёта. Полезно, когда платите картой.', 'Шайпұлмен қорытынды — шоттың 110%. Картамен төлегенде пайдалы.', 'Bill with tip is 110% of the bill. Handy when you pay by card.'),
              unit: tenge,
              answer: n(4950),
            },
          ]),
        ],
      ),
      topic(
        'g6-int',
        ['Целые и координаты', 'Бүтін сан мен координат', 'Integers and coordinates'],
        ['Лифт, температура и GPS считают вниз от нуля.', 'Лифт, температура мен GPS нөлден төмен санайды.', 'Lifts, temperature and GPS count below zero.'],
        [
          m('g6-driver-park', 'driver', ['Парковка под землёй', 'Жерасты тұрағы', 'Underground parking'], [
            {
              story: tx('Машина на уровне −3. Лифт поднял на 5 этажей.', 'Көлік −3 деңгейде. Лифт 5 қабат көтерді.', 'The car is on level −3. The lift goes up 5 floors.'),
              question: tx('На каком уровне окажешься? (0 — земля)', 'Қай деңгейде боласың? (0 — жер)', 'Which level do you reach? (0 is ground)'),
              hint: tx('−3 + 5.', '−3 + 5.'),
              explain: tx('Отрицательные этажи — паркинг. Сложение целых ведёт через ноль.', 'Теріс қабат — тұрақ. Бүтін санды қосу нөлден өтеді.', 'Negative floors are parking. Adding integers crosses zero.'),
              answer: n(2),
            },
            {
              story: tx('Потом спустились на 6 этажей.', 'Сосын 6 қабат түсті.', 'Then you go down 6 floors.'),
              question: tx('Новый уровень', 'Жаңа деңгей', 'New level'),
              hint: tx('2 − 6.', '2 − 6.'),
              explain: tx('Минус — движение вниз. Водители так читают указатели P1, P2, P3.', 'Минус — төмен қозғалыс. Жүргізушілер P1, P2, P3 белгісін солай оқиды.', 'Minus is downward travel. Drivers read P1, P2, P3 that way.'),
              answer: n(-4),
            },
          ]),
          m('g6-weather-almaty', 'weather', ['Мороз в Алматы', 'Алматыдағы аяз', 'Frost in Almaty'], [
            {
              story: tx('Ночью −12°C, днём потеплело на 9 градусов.', 'Түнде −12°C, күндіз 9 градусқа жылыды.', 'Night −12°C, daytime warmed by 9 degrees.'),
              question: tx('Дневная температура?', 'Күндізгі температура?', 'Daytime temperature?'),
              hint: tx('−12 + 9.', '−12 + 9.'),
              explain: tx('Синоптик считает изменения, а не «насколько холодно на ощупь».', 'Синоптик өзгерісті санайды, «қанша суық» дегенді емес.', 'Forecasters count the change, not how cold it feels.'),
              unit: tx('°C', '°C', '°C'),
              answer: n(-3),
            },
            {
              story: tx('К вечеру снова −8°C. На сколько градусов упало с дневного?', 'Кешке қайта −8°C. Күндізгіден неше градус түсті?', 'Evening is −8°C. How many degrees did it drop from daytime?'),
              question: tx('Падение (положительное число)', 'Төмендеу (оң сан)', 'Drop (positive number)'),
              hint: tx('От −3 до −8 это 5 градусов вниз.', '−3-тен −8-ге 5 градус төмен.'),
              explain: tx('Разница температур — модуль. От неё зависит гололёд и предупреждения.', 'Температура айырмасы — модуль. Көктайғақ пен ескерту соған байланысты.', 'A temperature difference is an absolute gap. Ice warnings depend on it.'),
              unit: tx('°C', '°C', '°C'),
              answer: n(5),
            },
          ]),
        ],
      ),
      topic(
        'g6-eq',
        ['Простые уравнения', 'Жай теңдеулер', 'Simple equations'],
        ['Неизвестное — посылка, смесь или счёт, который нужно раскрыть.', 'Белгісіз — ашуға тиіс жөнелтілім, қоспа не шот.', 'The unknown is a parcel, mix or bill you have to unwrap.'],
        [
          m('g6-courier-box', 'courier', ['Вес посылки', 'Жөнелтілім салмағы', 'Parcel weight'], [
            {
              story: tx('Коробка с товаром весит 4.2 кг. Пустая коробка 0.6 кг. Товар — x.', 'Тауарлы қорап 4.2 кг. Бос қорап 0.6 кг. Тауар — x.', 'Box plus goods: 4.2 kg. Empty box 0.6 kg. Goods = x.'),
              question: tx('Сколько весит товар? x + 0.6 = 4.2', 'Тауар қанша кілограмм? x + 0.6 = 4.2', 'How heavy are the goods? x + 0.6 = 4.2'),
              hint: tx('Вычти вес коробки.', 'Қорап салмағын азайт.'),
              explain: tx('Таможня и склад решают такое уравнение сотни раз за смену.', 'Кеден мен қойма мұндай теңдеуді ауысымда жүздеп шешеді.', 'Customs and warehouses solve this equation hundreds of times a shift.'),
              unit: tx('кг', 'кг', 'kg'),
              answer: n(3.6, 0.02),
            },
            {
              story: tx('Две одинаковые посылки и пакет 1 кг вместе 8.2 кг.', 'Екі бірдей жөнелтілім мен 1 кг пакет бірге 8.2 кг.', 'Two identical parcels plus a 1 kg packet weigh 8.2 kg together.'),
              question: tx('Вес одной посылки? 2x + 1 = 8.2', 'Бір жөнелтілім салмағы?', 'Weight of one parcel? 2x + 1 = 8.2'),
              hint: tx('Сначала −1, потом ÷2.', 'Алдымен −1, сосын ÷2.'),
              explain: tx('Линейное уравнение — когда одинаковые объекты плюс добавка.', 'Сызықтық теңдеу — бірдей нысандар плюс қосымша.', 'A linear equation is equal objects plus an extra piece.'),
              unit: tx('кг', 'кг', 'kg'),
              answer: n(3.6, 0.02),
            },
          ]),
          m('g6-pharma-mix', 'pharma', ['Раствор в аптеке', 'Дәріханадағы ерітінді', 'A pharmacy mix'], [
            {
              story: tx('Нужно 200 мл раствора. Уже налили 80 мл воды, остальное — концентрат x.', '200 мл ерітінді керек. 80 мл су құйылды, қалғаны — концентрат x.', 'Need 200 ml of solution. 80 ml water is in; the rest is concentrate x.'),
              question: tx('Сколько мл концентрата? x + 80 = 200', 'Неше мл концентрат?', 'How many ml of concentrate? x + 80 = 200'),
              hint: tx('200 − 80.', '200 − 80.'),
              explain: tx('Фармацевт держит объём фиксированным и ищет неизвестную долю.', 'Фармацевт көлемді тұрақты ұстап, белгісіз үлесті іздейді.', 'A pharmacist keeps total volume fixed and solves for the unknown share.'),
              unit: tx('мл', 'мл', 'ml'),
              answer: n(120),
            },
            {
              story: tx('Концентрат дороже: 3 флакона и вода 50 мл дали 170 мл. Флакон = x.', 'Концентрат қымбат: 3 құты мен 50 мл су 170 мл берді. Құты = x.', 'Concentrate is pricey: 3 vials plus 50 ml water made 170 ml. Vial = x.'),
              question: tx('Объём одного флакона? 3x + 50 = 170', 'Бір құты көлемі?', 'Volume of one vial? 3x + 50 = 170'),
              hint: tx('170 − 50 = 120, 120 ÷ 3.', '170 − 50 = 120, 120 ÷ 3.'),
              explain: tx('Так проверяют, не разбавили ли препарат сильнее, чем в инструкции.', 'Препарат нұсқаудан күштірек сұйылтылмағанын солай тексереді.', 'That is how you check the drug was not diluted past the label.'),
              unit: tx('мл', 'мл', 'ml'),
              answer: n(40),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 7,
    title: tx('Седьмой класс', 'Жетінші сынып', 'Grade 7'),
    world: tx('Чертёжная', 'Сызбахана', 'Drafting room'),
    color: '#5c6bc0',
    topics: [
      topic(
        'g7-lin',
        ['Линейные уравнения', 'Сызықтық теңдеулер', 'Linear equations'],
        ['Смеси, тарифы и краски сводятся к ax + b = c.', 'Қоспа, тариф пен бояу ax + b = c-ға келеді.', 'Mixes, tariffs and paint reduce to ax + b = c.'],
        [
          m('g7-designer-paint', 'designer', ['Смешение красок', 'Бояу араластыру', 'Mixing paint'], [
            {
              story: tx('Банка краски: 2 части белой и неизвестная x синей. Всего 5 частей, синей столько же банок по массе, уравнение 2 + x = 5.', 'Бояу банкі: 2 бөлік ақ және белгісіз x көк. Барлығы 5 бөлік: 2 + x = 5.', 'A paint tin: 2 parts white and unknown x blue. Total 5 parts: 2 + x = 5.'),
              question: tx('Сколько частей синей?', 'Көктің неше бөлігі?', 'How many parts blue?'),
              hint: tx('x = 5 − 2.', 'x = 5 − 2.'),
              explain: tx('Дизайнер держит рецепт цвета как уравнение долей.', 'Дизайнер түс рецептін үлес теңдеуі деп ұстайды.', 'Designers keep a colour recipe as an equation of parts.'),
              answer: n(3),
            },
            {
              story: tx('Нужно 8 литров смеси в том же отношении 2:3 (белая:синяя).', 'Сол 2:3 қатынаста 8 литр қоспа керек (ақ:көк).', 'You need 8 litres in the same 2:3 ratio (white:blue).'),
              question: tx('Сколько литров синей? 3/5 от 8', 'Неше литр көк? 8-дің 3/5-і', 'Litres of blue? 3/5 of 8'),
              hint: tx('Синей 3 части из 5.', 'Көк — 5-тің 3 бөлігі.'),
              explain: tx('Отношение 2:3 значит 5 частей. Объём умножают на долю.', '2:3 қатынас — 5 бөлік. Көлемді үлеске көбейтеді.', 'A 2:3 ratio means 5 parts. Multiply volume by the share.'),
              unit: tx('л', 'л', 'L'),
              answer: n(4.8, 0.05),
            },
          ]),
          m('g7-driver-taxi2', 'driver', ['Тариф такси', 'Такси тарифі', 'Taxi tariff'], [
            {
              story: tx('Посадка 400 ₸ плюс 120 ₸ за километр. Счёт 1600 ₸. Километры — x.', 'Отыру 400 ₸ плюс километріне 120 ₸. Шот 1600 ₸. Километр — x.', 'Flagfall 400 ₸ plus 120 ₸ per km. Bill 1600 ₸. Kilometres = x.'),
              question: tx('Сколько км проехали? 400 + 120x = 1600', 'Неше км жүрді?', 'How many km? 400 + 120x = 1600'),
              hint: tx('Сначала вычти посадку, потом раздели.', 'Алдымен отыруды азайт, сосын бөл.'),
              explain: tx('Любой тариф «фикс + ставка × объём» — линейное уравнение.', 'Кез келген «фикс + ставка × көлем» тарифі — сызықтық теңдеу.', 'Any “fee + rate × amount” tariff is a linear equation.'),
              unit: tx('км', 'км', 'km'),
              answer: n(10),
            },
            {
              story: tx('На обратном пути 7 км тем же тарифом.', 'Қайтар жолда сол тарифпен 7 км.', 'The return trip is 7 km on the same tariff.'),
              question: tx('Сколько тенге возьмут?', 'Қанша теңге алады?', 'How many tenge will it cost?'),
              hint: tx('400 + 120×7.', '400 + 120×7.'),
              explain: tx('Прямая подстановка в формулу — как считает приложение такси.', 'Формулаға тікелей қою — такси қосымшасы солай санайды.', 'Plug into the formula — that is what a taxi app does.'),
              unit: tenge,
              answer: n(1240),
            },
          ]),
        ],
      ),
      topic(
        'g7-ang',
        ['Углы и треугольники', 'Бұрыш пен үшбұрыш', 'Angles and triangles'],
        ['Плотник и кровельщик не угадывают угол — они его считают.', 'Ағаш ұстасы мен шатыршы бұрышты болжамайды — санайды.', 'Carpenters and roofers do not guess an angle — they compute it.'],
        [
          m('g7-builder-roof', 'builder', ['Скат крыши', 'Шатыр еңісі', 'A roof pitch'], [
            {
              story: tx('Смотри на фронтон дома: два угла у основания по 35°. Третий угол — у конька, наверху.', 'Үй фронтонына қара: табандағы екі бұрыш 35°. Үшінші бұрыш — жотада, үстінде.', 'Look at the gable: two base angles are 35° each. The third angle is at the ridge, on top.'),
              question: tx('Угол у конька? Сумма углов треугольника 180°.', 'Жота бұрышы? Үшбұрыш бұрыштарының қосындысы 180°.', 'Ridge angle? Triangle angles sum to 180°.'),
              hint: tx('180 − 35 − 35.', '180 − 35 − 35.'),
              explain: tx('Кровельщик закладывает угол, чтобы снег сходил и стропила сошлись.', 'Шатыршы қар сырғитын және стропила түйісетін бұрышты қояды.', 'Roofers set the angle so snow slides and rafters meet.'),
              unit: tx('°', '°', '°'),
              visual: { scene: 'roof', marks: { angle: tx('?', '?', '?'), width: tx('35° + 35°', '35° + 35°', '35° + 35°') } },
              answer: n(110),
            },
            {
              story: tx('Стропила перпендикулярны коньковой балке в одном узле: там прямой угол.', 'Бір түйінде стропила жота арқалығына перпендикуляр: онда тік бұрыш.', 'At one joint rafters meet the ridge beam at a right angle.'),
              question: tx('Сколько градусов в прямом угле?', 'Тік бұрышта неше градус?', 'How many degrees in a right angle?'),
              hint: tx('Четверть полного оборота.', 'Толық айналымның төрттен бірі.'),
              explain: tx('90° — мир угольников, рам и дверных коробок.', '90° — бұрыштық, жақтау мен есік қорабының әлемі.', '90° is the world of set squares, frames and door casings.'),
              unit: tx('°', '°', '°'),
              answer: n(90),
            },
          ]),
          m('g7-tailor-cut', 'tailor', ['Косой крой', 'Қиғаш пішу', 'A bias cut'], [
            {
              story: tx('Смежные углы на линии кроя: один 124°. Второй — смежный.', 'Пішу сызығындағы іргелес бұрыштар: бірі 124°. Екіншісі — іргелес.', 'Adjacent angles on a cut line: one is 124°. The other is adjacent.'),
              question: tx('Второй угол? Смежные дают 180°.', 'Екінші бұрыш? Іргелестер 180° береді.', 'Second angle? Adjacent angles sum to 180°.'),
              hint: tx('180 − 124.', '180 − 124.'),
              explain: tx('Портной разворачивает ткань: смежный угол говорит, куда ляжет шов.', 'Тігінші матаны жаяды: іргелес бұрыш тігіс қайда түсетінін айтады.', 'A tailor unfolds cloth: the adjacent angle says where the seam will fall.'),
              unit: tx('°', '°', '°'),
              answer: n(56),
            },
            {
              story: tx('Вертикальные углы при пересечении кроя равны. Один 56°. Чему равен противолежащий?', 'Пішу қиылысындағы вертикаль бұрыштар тең. Бірі 56°. Қарсы бұрыш қандай?', 'Vertical angles at a cut crossing are equal. One is 56°. What is the opposite one?'),
              question: tx('Вертикальный угол', 'Вертикаль бұрыш', 'Vertical angle'),
              hint: tx('Они равны.', 'Олар тең.'),
              explain: tx('На лекале пересечения дают равные вертикальные углы — крой симметричен.', 'Лекаладағы қиылыс тең вертикаль бұрыш береді — пішу симметриялы.', 'Pattern crossings make equal vertical angles — the cut stays symmetric.'),
              unit: tx('°', '°', '°'),
              answer: n(56),
            },
          ]),
        ],
      ),
      topic(
        'g7-scale',
        ['Масштаб и подобные', 'Масштаб пен ұқсас', 'Scale and similar figures'],
        ['Картограф и фотограф уменьшают мир пропорционально.', 'Картограф пен фотограф әлемді пропорционал кішірейтеді.', 'Cartographers and photographers shrink the world in proportion.'],
        [
          m('g7-photo-print', 'photo', ['Печать снимка', 'Сурет басу', 'Printing a photo'], [
            {
              story: tx('Снимок 4000×3000 пикселей печатают с коэффициентом 1/20.', '4000×3000 пиксель сурет 1/20 коэффициентімен басылады.', 'A 4000×3000 px photo is printed at 1/20 scale.'),
              question: tx('Ширина отпечатка в пикселях-единицах макета (4000/20)?', 'Баспа ені (4000/20)?', 'Print width in layout units (4000/20)?'),
              hint: tx('4000 ÷ 20.', '4000 ÷ 20.'),
              explain: tx('Подобные прямоугольники: все стороны множат на одно число.', 'Ұқсас тіктөртбұрыштар: барлық қабырға бір санға көбейеді.', 'Similar rectangles: every side is multiplied by the same number.'),
              answer: n(200),
            },
            {
              story: tx('Высота исходника 3000. Высота печати?', 'Бастапқы биіктік 3000. Баспа биіктігі?', 'Source height 3000. Print height?'),
              question: tx('3000 / 20', '3000 / 20', '3000 / 20'),
              hint: tx('Тот же коэффициент.', 'Сол коэффициент.'),
              explain: tx('Если изменить только одну сторону, лица на фото вытянутся. Пропорция спасает.', 'Бір ғана қабырғаны өзгертсе, бет созылады. Пропорция құтқарады.', 'Change only one side and faces stretch. Proportion saves the portrait.'),
              answer: n(150),
            },
          ]),
          m('g7-architect-model', 'architect', ['Макет жилого двора', 'Тұрғын аула макеті', 'A courtyard model'], [
            {
              story: tx('Реальный двор 40 м, макет в масштабе 1:50.', 'Нақты аула 40 м, макет 1:50.', 'The real courtyard is 40 m, model scale 1:50.'),
              question: tx('Длина макета в сантиметрах? (40 м = 4000 см)', 'Макет ұзындығы сантиметрмен?', 'Model length in cm? (40 m = 4000 cm)'),
              hint: tx('4000 / 50.', '4000 / 50.'),
              explain: tx('Макет — подобная фигура. Все длины делят на одно число.', 'Макет — ұқсас пішін. Барлық ұзындық бір санға бөлінеді.', 'A model is a similar figure. Every length is divided by the same number.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(80),
            },
            {
              story: tx('На макете дерево 6 см. Какой оно высоты в жизни (м)?', 'Макетте ағаш 6 см. Өмірде биіктігі (м)?', 'On the model a tree is 6 cm. Real height in metres?'),
              question: tx('Живая высота', 'Нақты биіктік', 'Real height'),
              hint: tx('6 × 50 = 300 см = 3 м.', '6 × 50 = 300 см = 3 м.'),
              explain: tx('Обратный масштаб возвращает макет в метры двора.', 'Кері масштаб макетті аула метріне қайтарады.', 'Inverse scale puts the model back into courtyard metres.'),
              unit: tx('м', 'м', 'm'),
              answer: n(3),
            },
          ]),
        ],
      ),
      topic(
        'g7-stat',
        ['Статистика вокруг', 'Айналадағы статистика', 'Statistics around us'],
        ['Опросы и рейтинги врут меньше, если считать медиану и долю.', 'Сауал мен рейтинг медиана мен үлесті санаса, аз өтірік айтады.', 'Polls and ratings lie less when you compute median and share.'],
        [
          m('g7-reporter-median', 'reporter', ['Зарплаты в статье', 'Мақаладағы жалақы', 'Salaries in an article'], [
            {
              story: tx('Зарплаты курьеров (тыс. ₸): 180, 200, 220, 800, 190. Среднее завысит «звезда».', 'Курьер жалақысы (мың ₸): 180, 200, 220, 800, 190. Орташа «жұлдызды» өсіреді.', 'Courier pay (thousand ₸): 180, 200, 220, 800, 190. The mean is pulled by a star.'),
              question: tx('Медиана (среднее по порядку после сортировки)?', 'Медиана (сұрыптағаннан кейін ортадағы)?', 'Median (middle after sorting)?'),
              hint: tx('Отсортируй: 180,190,200,220,800. Середина.', 'Сұрыпта: 180,190,200,220,800. Ортасы.'),
              explain: tx('Журналист берёт медиану, когда один миллионер ломает среднее.', 'Бір миллионер орташаны бұзса, журналист медиана алады.', 'Reporters use the median when one millionaire breaks the mean.'),
              answer: n(200),
            },
            {
              story: tx('Сколько человек из 5 получают меньше 250 тыс.?', '5-тің нешеуі 250 мыңнан аз алады?', 'How many of the 5 earn under 250 thousand?'),
              question: tx('Число человек', 'Адам саны', 'Headcount'),
              hint: tx('Все, кроме 800.', '800-ден басқасының бәрі.'),
              explain: tx('Доля «обычных» важнее красивого среднего в заголовке.', 'Тақырыптағы әдемі орташадан «қатардағылардың» үлесі маңызды.', 'The share of ordinary cases matters more than a flashy average headline.'),
              answer: n(4),
            },
          ]),
          m('g7-coder-bugs', 'coder', ['Баги в релизе', 'Релиздегі қателер', 'Bugs in a release'], [
            {
              story: tx('За 10 дней: 3, 1, 0, 4, 2, 2, 5, 1, 0, 2 бага.', '10 күнде: 3, 1, 0, 4, 2, 2, 5, 1, 0, 2 қате.', 'Over 10 days: 3, 1, 0, 4, 2, 2, 5, 1, 0, 2 bugs.'),
              question: tx('Среднее багов в день?', 'Күндік орташа қате?', 'Average bugs per day?'),
              hint: tx('Сумма 20, делить на 10.', 'Қосынды 20, 10-ға бөлу.'),
              explain: tx('Тимлид смотрит среднее, чтобы понять, стабилен ли билд.', 'Тимлид билд тұрақты ма деп орташаға қарайды.', 'A team lead watches the mean to see if the build is stable.'),
              answer: n(2),
            },
            {
              story: tx('В какой доле дней багов не было? Ответ в процентах.', 'Қате жоқ күндердің үлесі? Жауап пайызбен.', 'On what percent of days were there zero bugs?'),
              question: tx('Процент «чистых» дней', '«Таза» күн пайызы', 'Percent of clean days'),
              hint: tx('2 дня из 10.', '10-ның 2 күні.'),
              explain: tx('Доля нулей — отдельный показатель качества, не среднее.', 'Нөлдер үлесі — орташа емес, сапаның бөлек көрсеткіші.', 'The share of zeros is a quality metric of its own, not the mean.'),
              unit: pct,
              answer: n(20),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 8,
    title: tx('Восьмой класс', 'Сегізінші сынып', 'Grade 8'),
    world: tx('Площадка Пифагора', 'Пифагор алаңы', 'Pythagoras yard'),
    color: '#8d6e63',
    topics: [
      topic(
        'g8-pyth',
        ['Теорема Пифагора', 'Пифагор теоремасы', 'Pythagoras'],
        ['Лестница, экран и кабель — прямоугольные треугольники на работе.', 'Баспалдақ, экран мен кабель — жұмыстағы тікбұрышты үшбұрыштар.', 'Ladders, screens and cables are right triangles at work.'],
        [
          m('g8-electrician-ladder', 'electrician', ['Лестница к фонарю', 'Шамға баспалдақ', 'Ladder to a lamp'], [
            {
              story: tx('Стена 4 м, лестница стоит в 3 м от стены. Сама лестница — гипотенуза прямоугольного треугольника.', 'Қабырға 4 м, баспалдақ қабырғадан 3 м тұр. Баспалдақтың өзі — тікбұрышты үшбұрыштың гипотенузасы.', 'The wall is 4 m, the ladder stands 3 m from the wall. The ladder itself is the hypotenuse of a right triangle.'),
              question: tx('Длина лестницы в метрах?', 'Баспалдақ ұзындығы метрмен?', 'Ladder length in metres?'),
              hint: tx('3² + 4² = c². Знакомый треугольник 3-4-5.', '3² + 4² = c². Таныс 3-4-5 үшбұрышы.'),
              explain: tx('Электрик подбирает лестницу по Пифагору, чтобы она не упала и достала.', 'Электрик баспалдақтың құламауы және жетуі үшін Пифагормен таңдайды.', 'Electricians size a ladder with Pythagoras so it reaches and does not slip.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'ramp', marks: { opp: tx('4 м', '4 м', '4 m'), adj: tx('3 м', '3 м', '3 m'), hyp: tx('? м', '? м', '? m'), angle: tx('90°', '90°', '90°') } },
              answer: n(5),
            },
            {
              story: tx('Кабель от щита внизу до лампы на той же стене: горизонталь 8 м, высота 6 м.', 'Қалқаннан шамға кабель: көлденең 8 м, биіктік 6 м.', 'Cable from a low panel to the lamp: 8 m across, 6 m up.'),
              question: tx('Минимальная длина кабеля?', 'Кабельдің ең аз ұзындығы?', 'Shortest cable length?'),
              hint: tx('6-8-10 треугольник, удвоенный 3-4-5.', '6-8-10 үшбұрышы, 3-4-5-тің екі есесі.'),
              explain: tx('Диагональ короче, чем вести кабель «вдоль стен». Пифагор экономит метры.', 'Диагональ «қабырға бойымен» жүргізгеннен қысқа. Пифагор метр үнемдейді.', 'A diagonal is shorter than running cable along the walls. Pythagoras saves metres.'),
              unit: tx('м', 'м', 'm'),
              answer: n(10),
            },
          ]),
          m('g8-gamedev-screen', 'gamedev', ['Диагональ монитора', 'Монитор диагоналі', 'Monitor diagonal'], [
            {
              story: tx('Экран 24 дюйма по диагонали, соотношение сторон 4:3. Высота 14.4 дюйма. Ширина?', 'Экран диагоналі 24 дюйм, қабырға қатынасы 4:3. Биіктігі 14.4 дюйм. Ені?', 'Screen diagonal 24 in, aspect 4:3. Height 14.4 in. Width?'),
              question: tx('Ширина в дюймах (Пифагор: √(24² − 14.4²))', 'Ені дюйммен', 'Width in inches (√(24² − 14.4²))'),
              hint: tx('14.4²=207.36, 24²=576, разница 368.64, корень 19.2', '14.4²=207.36, 24²=576, айырма 368.64, түбір 19.2'),
              explain: tx('Геймдизайнер и продавец мониторов переводят диагональ в ширину и высоту.', 'Геймдизайнер мен монитор сатушы диагональді ен мен биіктікке аударады.', 'Game designers and monitor sellers convert diagonal into width and height.'),
              unit: tx('дюйм', 'дюйм', 'in'),
              answer: n(19.2, 0.1),
            },
            {
              story: tx('Игровое поле квадрат 9×9 клеток, герой идёт по диагонали из угла в угол.', 'Ойын алаңы 9×9 шаршы тор, кейіпкер бұрыштан бұрышқа диагональмен жүреді.', 'A 9×9 square grid; the hero walks corner to corner on the diagonal.'),
              question: tx('Длина пути в клетках? √(9²+9²)=9√2 ≈ ? (два знака, 12.73)', 'Жол ұзындығы торда? 9√2 ≈ 12.73', 'Path length in cells? 9√2 ≈ 12.73'),
              hint: tx('9 × 1.414 ≈ 12.73', '9 × 1.414 ≈ 12.73'),
              explain: tx('В играх диагональ длиннее стороны. Пифагор задаёт скорость и хитбоксы.', 'Ойында диагональ қабырғадан ұзын. Пифагор жылдамдық пен хитбоксты қояды.', 'In games a diagonal is longer than a side. Pythagoras sets speed and hitboxes.'),
              answer: n(12.73, 0.05),
            },
          ]),
        ],
      ),
      topic(
        'g8-sys',
        ['Системы уравнений', 'Теңдеулер жүйесі', 'Systems of equations'],
        ['Два товара, два тарифа — два неизвестных.', 'Екі тауар, екі тариф — екі белгісіз.', 'Two goods, two tariffs — two unknowns.'],
        [
          m('g8-seller-combo', 'seller', ['Самса и чай', 'Самса мен шай', 'Samsa and tea'], [
            {
              story: tx('2 самсы и 1 чай = 1100 ₸. 1 самса и 1 чай = 700 ₸.', '2 самса мен 1 шай = 1100 ₸. 1 самса мен 1 шай = 700 ₸.', '2 samsa + 1 tea = 1100 ₸. 1 samsa + 1 tea = 700 ₸.'),
              question: tx('Цена одной самсы?', 'Бір самсаның бағасы?', 'Price of one samsa?'),
              hint: tx('Вычти второе из первого.', 'Екіншіні біріншіден азайт.'),
              explain: tx('Кассир «вычитает заказы», чтобы узнать цену одной позиции без ценника.', 'Кассир бір позиция бағасын ценниксіз білу үшін «тапсырысты азайтады».', 'Cashiers subtract orders to learn one item’s price without a tag.'),
              unit: tenge,
              answer: n(400),
            },
            {
              story: tx('Тогда чай сколько стоит?', 'Онда шай қанша тұрады?', 'So how much is tea?'),
              question: tx('Цена чая', 'Шай бағасы', 'Tea price'),
              hint: tx('700 − 400.', '700 − 400.'),
              explain: tx('Второе неизвестное находится подстановкой. Так разбирают любые комбо-наборы.', 'Екінші белгісіз қойылыммен табылады. Кез келген комбо солай ашылады.', 'The second unknown is substitution. That unpacks any combo meal.'),
              unit: tenge,
              answer: n(300),
            },
          ]),
          m('g8-logistics-trucks', 'logistics', ['Два типа фур', 'Фураның екі түрі', 'Two truck types'], [
            {
              story: tx('Малая фура 8 паллет, большая 13. Всего 5 машин и 49 паллет.', 'Кіші фура 8 паллет, үлкен 13. Барлығы 5 көлік және 49 паллет.', 'Small truck 8 pallets, large 13. 5 trucks and 49 pallets total.'),
              question: tx('Сколько больших фур? x+y=5, 8x+13y=49', 'Неше үлкен фура?', 'How many large trucks? x+y=5, 8x+13y=49'),
              hint: tx('x=5−y, подставь: 8(5−y)+13y=49.', 'x=5−y, қой: 8(5−y)+13y=49.'),
              explain: tx('Логист решает систему: число машин и вместимость сразу.', 'Логист жүйені шешеді: көлік саны мен сыйымдылық бірге.', 'A logistician solves a system: truck count and capacity at once.'),
              answer: n(3),
            },
            {
              story: tx('Тогда малых фур?', 'Онда кіші фура нешеу?', 'Then how many small trucks?'),
              question: tx('Малые фуры', 'Кіші фуралар', 'Small trucks'),
              hint: tx('5 − 3.', '5 − 3.'),
              explain: tx('Проверка: 2×8 + 3×13 = 16+39=49. Система сошлась.', 'Тексеру: 2×8 + 3×13 = 16+39=49. Жүйе дұрыс.', 'Check: 2×8 + 3×13 = 16+39=49. The system checks out.'),
              answer: n(2),
            },
          ]),
        ],
      ),
      topic(
        'g8-area2',
        ['Площади фигур', 'Пішін аудандары', 'Areas of shapes'],
        ['Ландшафт и кровля — треугольники, трапеции, круги.', 'Ландшафт пен шатыр — үшбұрыш, трапеция, шеңбер.', 'Landscaping and roofs are triangles, trapezoids, circles.'],
        [
          m('g8-gardener-trap', 'gardener', ['Трапеция газона', 'Көгал трапециясы', 'A trapezoid lawn'], [
            {
              story: tx('Газон-трапеция: основания 8 м и 12 м, высота 5 м.', 'Көгал-трапеция: табандары 8 м және 12 м, биіктігі 5 м.', 'Trapezoid lawn: bases 8 m and 12 m, height 5 m.'),
              question: tx('Площадь? (a+b)/2 × h', 'Аудан?', 'Area? (a+b)/2 × h'),
              hint: tx('(8+12)/2 × 5.', '(8+12)/2 × 5.'),
              explain: tx('Неровный участок часто трапеция. Садовник считает рулоны по этой площади.', 'Тегіс емес учаске жиі трапеция. Бағбан орамды осы ауданмен санайды.', 'An uneven plot is often a trapezoid. Gardeners size rolls from that area.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(50),
            },
            {
              story: tx('Клумба-круг радиусом 2 м внутри газона (π ≈ 3.14).', 'Көгал ішінде радиусы 2 м клумба-шеңбер (π ≈ 3.14).', 'A circular flower bed radius 2 m sits inside (π ≈ 3.14).'),
              question: tx('Площадь клумбы? πr²', 'Клумба ауданы?', 'Bed area? πr²'),
              hint: tx('3.14 × 4.', '3.14 × 4.'),
              explain: tx('Круг вычитают, если газон вокруг клумбы, или добавляют, если засевают её отдельно.', 'Клумба айналасындағы көгалда шеңберді азайтады, не бөлек сепсе қосады.', 'Subtract the circle if lawn wraps the bed, or add it if the bed is seeded alone.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(12.56, 0.05),
            },
          ]),
          m('g8-architect-yurt', 'architect', ['Юрта в этноауле', 'Этноауылдағы киіз үй', 'A yurt in an ethno village'], [
            {
              story: tx('Смотри на юрту: шанырак — круг диаметром 3 м, значит радиус пола 1.5 м. Площадь круга — πr², π ≈ 3.14.', 'Киіз үйге қара: шаңырақ — диаметрі 3 м шеңбер, еден радиусы 1.5 м. Шеңбер ауданы — πr², π ≈ 3.14.', 'Look at the yurt: the shanyrak is a 3 m circle, so the floor radius is 1.5 m. Circle area is πr², π ≈ 3.14.'),
              question: tx('м² пола', 'Еден м²', 'm² of floor'),
              hint: tx('3.14 × 1.5² = 3.14 × 2.25.', '3.14 × 1.5² = 3.14 × 2.25.'),
              explain: tx('Архитектор считает круглый пол, чтобы заказать войлок и доски.', 'Сәулетші киіз бен тақтайға тапсырыс беру үшін дөңгелек еденді санайды.', 'Architects compute a round floor to order felt and boards.'),
              unit: tx('м²', 'м²', 'm²'),
              visual: { scene: 'yurt', marks: { width: tx('Ø 3 м', 'Ø 3 м', 'Ø 3 m') } },
              answer: n(7.065, 0.05),
            },
            {
              story: tx('Сколько войлока на пол, если берут на 10% больше из-за нахлёста?', 'Еденге киіз қанша, жабысу үшін 10% артық алса?', 'How much felt for the floor with 10% extra overlap?'),
              question: tx('Округли до сотых: площадь × 1.1', 'Жүздікке дөңгелекте: аудан × 1.1', 'Round to hundredths: area × 1.1'),
              hint: tx('7.065 × 1.1 ≈ 7.77', '7.065 × 1.1 ≈ 7.77'),
              explain: tx('Запас на швы — процент от площади. Без него полотно не сомкнётся.', 'Тігіс қоры — аудан пайызы. Онсыз полотно жабылмайды.', 'Seam allowance is a percent of area. Without it the cloth will not close.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(7.77, 0.08),
            },
          ]),
        ],
      ),
      topic(
        'g8-prob',
        ['Вероятность качества', 'Сапа ықтималдығы', 'Quality probability'],
        ['Брак на линии и лотерея билетов — первые настоящие вероятности.', 'Желідегі ақау мен билет лотереясы — алғашқы нағыз ықтималдық.', 'Line defects and ticket lotteries are the first real probabilities.'],
        [
          m('g8-engineer-qc', 'engineer', ['Контроль на заводе', 'Зауыттағы бақылау', 'Factory quality control'], [
            {
              story: tx('Из 200 деталей 6 бракованных. Вероятность взять брак наугад?', '200 бөлшектің 6-ы ақаулы. Кездейсоқ ақау алу ықтималдығы?', '6 of 200 parts are defective. Chance of picking a defect at random?'),
              question: tx('Ответ десятичной (6/200)', 'Ондық жауап (6/200)', 'Decimal answer (6/200)'),
              hint: tx('6/200 = 0.03', '6/200 = 0.03'),
              explain: tx('ОТК считает долю брака — это оценка вероятности для клиента.', 'СББ ақау үлесін санайды — бұл клиент үшін ықтималдық бағасы.', 'QA counts the defect share — a probability estimate for the client.'),
              answer: n(0.03, 0.005),
            },
            {
              story: tx('В процентах это сколько?', 'Пайызбен қанша?', 'As a percent?'),
              question: tx('Процент брака', 'Ақау пайызы', 'Defect percent'),
              hint: tx('0.03 × 100.', '0.03 × 100.'),
              explain: tx('На совещании говорят «3% брака», а не «0.03». Один язык с директором.', 'Жиында «3% ақау» дейді, «0.03» емес. Директормен бір тіл.', 'Meetings say “3% defects”, not “0.03”. Same language as the director.'),
              unit: pct,
              answer: n(3),
            },
          ]),
          m('g8-gamedev-drop', 'gamedev', ['Шанс дропа', 'Дроп мүмкіндігі', 'Loot drop chance'], [
            {
              story: tx('Редкий меч выпадает с вероятностью 0.02. Игрок открыл 50 сундуков. Ожидаемое число мечей?', 'Сирек қылыш 0.02 ықтималдықпен түседі. Ойыншы 50 сандық ашты. Күтілетін қылыш саны?', 'A rare sword drops with probability 0.02. A player opened 50 chests. Expected swords?'),
              question: tx('50 × 0.02', '50 × 0.02', '50 × 0.02'),
              hint: tx('Математическое ожидание np.', 'Математикалық күтім np.'),
              explain: tx('Геймдизайнер крутит вероятность, чтобы дроп не был ни слишком частым, ни злым.', 'Геймдизайнер дроп тым жиі де, тым жауыз да болмас үшін ықтималдықты бұралайды.', 'Game designers tune probability so loot is neither too common nor cruel.'),
              answer: n(1),
            },
            {
              story: tx('Хотят, чтобы из 100 сундуков в среднем падало 8 мечей. Какая вероятность?', '100 сандықтан орташа 8 қылыш түссін деп қалайды. Ықтималдық қандай?', 'They want 8 swords per 100 chests on average. What probability?'),
              question: tx('p = 8/100', 'p = 8/100', 'p = 8/100'),
              hint: tx('8%.', '8%.'),
              explain: tx('Обратная задача: от желаемой частоты к p. Так балансируют игры и лотереи.', 'Кері есеп: қалаған жиіліктен p-ға. Ойын мен лотерея солай теңгереді.', 'The inverse: from a desired rate to p. Games and lotteries are balanced that way.'),
              answer: n(0.08, 0.005),
            },
          ]),
        ],
      ),
    ],
  },
]
