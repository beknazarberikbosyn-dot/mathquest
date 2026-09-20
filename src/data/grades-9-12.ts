import type { Grade, Mission, Step, Topic } from '../types'
import { tx } from '../types'

const tenge = tx('₸', '₸', '₸')
const pct = tx('%', '%', '%')

function n(value: number, tolerance?: number): Step['answer'] {
  return { kind: 'number', value, ...(tolerance ? { tolerance } : {}) }
}

function m(id: string, profession: string, title: [string, string, string], steps: Step[], xp = 60): Mission {
  return { id, profession, title: tx(title[0], title[1], title[2]), xp, steps }
}

function topic(id: string, title: [string, string, string], blurb: [string, string, string], missions: Mission[]): Topic {
  return { id, title: tx(title[0], title[1], title[2]), blurb: tx(blurb[0], blurb[1], blurb[2]), missions }
}

export const GRADES_9_12: Grade[] = [
  {
    grade: 9,
    title: tx('Девятый класс', 'Тоғызыншы сынып', 'Grade 9'),
    world: tx('Лаборатория функций', 'Функция зертханасы', 'Function lab'),
    color: '#42a5f5',
    topics: [
      topic(
        'g9-quad',
        ['Квадратные уравнения', 'Квадрат теңдеулер', 'Quadratic equations'],
        ['Мяч, фонтан и прибыль описывают параболой.', 'Доп, субұрқақ пен пайда параболамен сипатталады.', 'A ball, a fountain and profit follow a parabola.'],
        [
          m('g9-athlete-ball', 'athlete', ['Траектория мяча', 'Доп траекториясы', 'A ball’s path'], [
            {
              story: tx('Высота мяча h = −t² + 6t (метры, секунды). Мяч на земле когда h=0.', 'Доп биіктігі h = −t² + 6t. Жерде h=0.', 'Height h = −t² + 6t (metres, seconds). On the ground when h=0.'),
              question: tx('Через сколько секунд мяч приземлится? (ненулевой корень)', 'Доп неше секундтан кейін жерге түседі?', 'After how many seconds does it land? (nonzero root)'),
              hint: tx('t(−t + 6)=0 → t=0 или t=6.', 't(−t + 6)=0 → t=0 немесе t=6.'),
              explain: tx('Тренер считает время полёта, чтобы поймать мяч и поставить камеры.', 'Жаттықтырушы допты ұстау және камера қою үшін ұшу уақытын санайды.', 'Coaches compute flight time to catch the ball and place cameras.'),
              unit: tx('с', 'с', 's'),
              answer: n(6),
            },
            {
              story: tx('Максимум параболы в вершине t = −b/(2a). Здесь a=−1, b=6.', 'Парабола максимумы төбеде t = −b/(2a). Мұнда a=−1, b=6.', 'Parabola max at t = −b/(2a). Here a=−1, b=6.'),
              question: tx('На какой секунде пик высоты?', 'Биіктік шыңы қай секундта?', 'At what second is peak height?'),
              hint: tx('t = −6 / (2·(−1)) = 3.', 't = −6 / (2·(−1)) = 3.'),
              explain: tx('Вершина параболы — момент удара фотографа и прыжка вратаря.', 'Парабола төбесі — фотограф пен қақпашы секірісінің сәті.', 'The vertex is when a photographer shoots and a keeper jumps.'),
              unit: tx('с', 'с', 's'),
              answer: n(3),
            },
          ]),
          m('g9-engineer-arch', 'engineer', ['Арка моста', 'Көпір аркасы', 'A bridge arch'], [
            {
              story: tx('Смотри на мост: арка — парабола y = −x² + 4x. Опоры стоят там, где высота y=0.', 'Көпірге қара: арка — парабола y = −x² + 4x. Тіректер y=0 жерінде.', 'Look at the bridge: the arch is the parabola y = −x² + 4x. Supports sit where y=0.'),
              question: tx('Расстояние между опорами? (разница корней)', 'Тірек арасы? (түбір айырмасы)', 'Distance between supports? (root gap)'),
              hint: tx('x(−x+4)=0 → 0 и 4.', 'x(−x+4)=0 → 0 және 4.'),
              explain: tx('Инженер ставит опоры в нулях параболы — иначе арка «висит» в воздухе.', 'Инженер тіректі парабола нөлдеріне қояды — әйтпесе арка ауада «ілінеді».', 'Engineers place supports at the parabola zeros or the arch hangs in mid-air.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'bridge', marks: { width: tx('? м', '? м', '? m'), height: tx('y', 'y', 'y') } },
              answer: n(4),
            },
            {
              story: tx('Теперь середина пролёта, x=2. Какая высота арки над водой?', 'Енді аралық ортасы, x=2. Арканың су үстіндегі биіктігі қандай?', 'Now the mid-span, x=2. How high is the arch above the water?'),
              question: tx('y(2)', 'y(2)', 'y(2)'),
              hint: tx('−4 + 8.', '−4 + 8.'),
              explain: tx('Максимальный зазор под мостом считают в вершине — для барж и грузовиков.', 'Көпір астындағы ең үлкен саңылау төбеде — баржа мен жүк көлігі үшін.', 'Clearance under a bridge is taken at the vertex — for barges and trucks.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'bridge', marks: { width: tx('4 м', '4 м', '4 m'), height: tx('? м', '? м', '? m') } },
              answer: n(4),
            },
          ]),
        ],
      ),
      topic(
        'g9-fun',
        ['Функции и графики', 'Функция мен график', 'Functions and graphs'],
        ['Аналитик читает график как текст: рост, спад, точка.', 'Аналитик графикті мәтіндей оқиды: өсу, төмендеу, нүкте.', 'An analyst reads a graph like text: rise, fall, point.'],
        [
          m('g9-coder-traffic', 'coder', ['Трафик приложения', 'Қосымша трафигі', 'App traffic'], [
            {
              story: tx('Пользователи u(t)= 200 + 30t, t — дни после релиза.', 'Пайдаланушы u(t)= 200 + 30t, t — релизден кейінгі күн.', 'Users u(t)= 200 + 30t, t — days after release.'),
              question: tx('Сколько пользователей на 10-й день?', '10-шы күні неше пайдаланушы?', 'How many users on day 10?'),
              hint: tx('200 + 30×10.', '200 + 30×10.'),
              explain: tx('Линейный рост — модель онбординга, пока сервер выдерживает.', 'Сызықтық өсу — сервер шыдағанға дейінгі онбординг моделі.', 'Linear growth models onboarding while the server still holds.'),
              answer: n(500),
            },
            {
              story: tx('Сервер падает при 800 пользователях. На какой день это случится? 200+30t=800', 'Сервер 800 пайдаланушыда құлайды. Қай күні? 200+30t=800', 'The server dies at 800 users. Which day? 200+30t=800'),
              question: tx('День t', 'Күн t', 'Day t'),
              hint: tx('30t=600, t=20.', '30t=600, t=20.'),
              explain: tx('Программист решает уравнение, чтобы заранее купить мощность.', 'Бағдарламашы қуатты алдын ала алу үшін теңдеу шешеді.', 'A programmer solves the equation to buy capacity in advance.'),
              answer: n(20),
            },
          ]),
          m('g9-weather-graph', 'weather', ['Суточный график', 'Тәуліктік график', 'A daily graph'], [
            {
              story: tx('Температура T= −0.5(t−15)² + 18, t — часы. Максимум в вершине.', 'Температура T= −0.5(t−15)² + 18. Максимум төбеде.', 'Temperature T= −0.5(t−15)² + 18. Maximum at the vertex.'),
              question: tx('В котором часу самый тёплый момент?', 'Ең жылы сәт қай сағатта?', 'At what hour is it warmest?'),
              hint: tx('Вершина параболы t=15.', 'Парабола төбесі t=15.'),
              explain: tx('Синоптик знает час пика, чтобы предупредить о жаре на стройке и стадионе.', 'Синоптик құрылыс пен стадиондағы ыстыққа ескерту үшін шың сағатын біледі.', 'Forecasters know the peak hour to warn building sites and stadiums about heat.'),
              answer: n(15),
            },
            {
              story: tx('Какая температура в этот час?', 'Бұл сағатта температура қандай?', 'What temperature at that hour?'),
              question: tx('T(15)', 'T(15)', 'T(15)'),
              hint: tx('Квадрат обнуляется, остаётся 18.', 'Шаршы нөл болады, 18 қалады.'),
              explain: tx('Значение в вершине — прогноз максимума на карточке погоды.', 'Төбе мәні — ауа райы карточкасындағы максимум болжамы.', 'The vertex value is the high on a weather card.'),
              unit: tx('°C', '°C', '°C'),
              answer: n(18),
            },
          ]),
        ],
      ),
      topic(
        'g9-sim',
        ['Подобие', 'Ұқсастық', 'Similarity'],
        ['Тень, фото и геодезия: маленький треугольник рассказывает о большом.', 'Көлеңке, фото мен геодезия: кіші үшбұрыш үлкен туралы айтады.', 'Shadow, photo and survey: a small triangle reports on a big one.'],
        [
          m('g9-photo-shadow', 'photo', ['Тень Байконура', 'Байқоңыр көлеңкесі', 'A Baikonur shadow'], [
            {
              story: tx('Смотри: рейка 1.5 м даёт тень 2 м. Башня рядом даёт тень 18 м в тот же час. Треугольники подобные.', 'Қара: 1.5 м рейка 2 м көлеңке береді. Қасындағы мұнара сол сағатта 18 м көлеңке береді. Үшбұрыштар ұқсас.', 'Look: a 1.5 m rod casts a 2 m shadow. The tower casts 18 m at the same hour. The triangles are similar.'),
              question: tx('Высота башни? Подобные треугольники.', 'Мұнара биіктігі? Ұқсас үшбұрыштар.', 'Tower height? Similar triangles.'),
              hint: tx('h / 18 = 1.5 / 2.', 'h / 18 = 1.5 / 2.'),
              explain: tx('Фотограф и геодезист меряют недоступное через тень и пропорцию.', 'Фотограф пен геодезист қол жетпес нәрсені көлеңке мен пропорциямен өлшейді.', 'Photographers and surveyors measure the unreachable via shadow and proportion.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'shadow', marks: { opp: tx('1.5 м', '1.5 м', '1.5 m'), adj: tx('2 м', '2 м', '2 m'), width: tx('18 м', '18 м', '18 m'), height: tx('? м', '? м', '? m') } },
              answer: n(13.5, 0.05),
            },
            {
              story: tx('Солнце ниже: тень рейки стала 3 м. Башня та же, 13.5 м. Какая теперь тень башни?', 'Күн төмен: рейка көлеңкесі 3 м болды. Мұнара сол, 13.5 м. Енді мұнара көлеңкесі қандай?', 'The sun is lower: the rod’s shadow is 3 m. The tower is still 13.5 m. What is the tower’s shadow now?'),
              question: tx('Новая тень башни', 'Мұнараның жаңа көлеңкесі', 'New tower shadow'),
              hint: tx('13.5 / x = 1.5 / 3 → x = 27.', '13.5 / x = 1.5 / 3 → x = 27.'),
              explain: tx('Отношение высот постоянно, длины теней меняются вместе.', 'Биіктік қатынасы тұрақты, көлеңке ұзындығы бірге өзгереді.', 'The height ratio stays fixed; shadow lengths move together.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'shadow', marks: { opp: tx('1.5 м', '1.5 м', '1.5 m'), adj: tx('3 м', '3 м', '3 m'), height: tx('13.5 м', '13.5 м', '13.5 m'), width: tx('? м', '? м', '? m') } },
              answer: n(27),
            },
          ]),
          m('g9-architect-baiterek', 'architect', ['Макет Байтерека', 'Бәйтерек макеті', 'A Baiterek model'], [
            {
              story: tx('Вот Байтерек: живая башня 97 м, а макет рядом — 0.97 м. Во сколько раз макет меньше?', 'Міне Бәйтерек: нақты мұнара 97 м, қасындағы макет — 0.97 м. Макет неше есе кіші?', 'Here is Baiterek: the real tower is 97 m, the model beside it is 0.97 m. How many times smaller is the model?'),
              question: tx('Реал / макет', 'Нақты / макет', 'Real / model'),
              hint: tx('97 / 0.97 = 100.', '97 / 0.97 = 100.'),
              explain: tx('Коэффициент подобия — во сколько раз макет меньше жизни.', 'Ұқсастық коэффициенті — макет өмірден неше есе кіші.', 'The similarity ratio is how many times smaller the model is than life.'),
              visual: { scene: 'building', marks: { height: tx('97 м', '97 м', '97 m'), width: tx('0.97 м', '0.97 м', '0.97 m') } },
              answer: n(100),
            },
            {
              story: tx('На башне золотой шар диаметром 22 м. Какой диаметр этого шара на макете?', 'Мұнарада диаметрі 22 м алтын шар. Макеттегі шардың диаметрі қандай?', 'The tower has a gold sphere 22 m across. What diameter is that sphere on the model?'),
              question: tx('22 / 100', '22 / 100', '22 / 100'),
              hint: tx('Все длины делят на 100.', 'Барлық ұзындық 100-ге бөлінеді.'),
              explain: tx('Подобие копирует каждую длину. Иначе шар на макете будет «не тот».', 'Ұқсастық әр ұзындықты көшіреді. Әйтпесе макеттегі шар «басқа» болады.', 'Similarity copies every length. Otherwise the model sphere looks wrong.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'building', marks: { height: tx('22 м', '22 м', '22 m'), scale: tx('÷100', '÷100', '÷100') } },
              answer: n(0.22, 0.005),
            },
          ]),
        ],
      ),
      topic(
        'g9-comb',
        ['Комбинаторика', 'Комбинаторика', 'Combinatorics'],
        ['Пароли, меню и плейлисты — сколько способов, не перечисляя.', 'Құпиясөз, мәзір мен плейлист — санамастан қанша тәсіл.', 'Passwords, menus and playlists — how many ways without listing them.'],
        [
          m('g9-coder-pin', 'coder', ['PIN карты', 'Карта PIN-і', 'A card PIN'], [
            {
              story: tx('PIN из 4 цифр, цифры могут повторяться.', '4 цифрлы PIN, цифр қайталана алады.', 'A 4-digit PIN, digits may repeat.'),
              question: tx('Сколько возможных кодов? 10^4', 'Неше мүмкін код? 10^4', 'How many possible codes? 10^4'),
              hint: tx('На каждую позицию 10 вариантов.', 'Әр позицияға 10 нұсқа.'),
              explain: tx('Банк считает пространство паролей, чтобы понять, насколько код устойчив.', 'Банк код қаншалықты берік екенін түсіну үшін құпиясөз кеңістігін санайды.', 'Banks size the password space to know how tough a code is.'),
              answer: n(10000),
            },
            {
              story: tx('Если цифры все разные? 10×9×8×7', 'Цифрлардың бәрі әртүрлі болса? 10×9×8×7', 'If all digits are distinct? 10×9×8×7'),
              question: tx('Число кодов без повторов', 'Қайталаусыз код саны', 'Codes with no repeat'),
              hint: tx('Размещение без повторений.', 'Қайталаусыз орналастыру.'),
              explain: tx('Запрет повторов уменьшает пространство — удобнее людям, слабее защите.', 'Қайталауға тыйым кеңістікті кішірейтеді — адамға ыңғайлы, қорғанысқа әлсіз.', 'Banning repeats shrinks the space — easier for people, weaker for security.'),
              answer: n(5040),
            },
          ]),
          m('g9-chef-menu', 'chef', ['Комбо в столовой', 'Асхана комбосы', 'A canteen combo'], [
            {
              story: tx('3 супа, 5 горячих, 2 напитка. Комбо: по одному из каждого.', '3 сорпа, 5 ыстық, 2 сусын. Комбо: әрқайсысынан біреу.', '3 soups, 5 mains, 2 drinks. Combo: one of each.'),
              question: tx('Сколько разных обедов? Правило произведения', 'Неше түрлі түскі ас? Көбейту ережесі', 'How many different lunches? Product rule'),
              hint: tx('3 × 5 × 2.', '3 × 5 × 2.'),
              explain: tx('Повар считает разнообразие меню, не расписывая все тарелки.', 'Аспаз барлық тәрелкені жазбай, мәзір әртүрлілігін санайды.', 'Chefs count menu variety without writing every plate.'),
              answer: n(30),
            },
            {
              story: tx('Десерт опционален: 4 десерта или без десерта (5 вариантов). Новые комбо?', 'Десерт міндетті емес: 4 десерт немесе десертсіз (5 нұсқа). Жаңа комбо?', 'Dessert optional: 4 desserts or none (5 choices). New combos?'),
              question: tx('30 × 5', '30 × 5', '30 × 5'),
              hint: tx('Ещё один множитель.', 'Тағы бір көбейткіш.'),
              explain: tx('Каждый независимый выбор умножает число сценариев — и на кухне, и в UX.', 'Әр тәуелсіз таңдау сценарий санын көбейтеді — ас үйде де, UX-те де.', 'Each independent choice multiplies scenarios — in a kitchen and in UX.'),
              answer: n(150),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 10,
    title: tx('Десятый класс', 'Оныншы сынып', 'Grade 10'),
    world: tx('Обсерватория', 'Обсерватория', 'Observatory'),
    color: '#29b6f6',
    topics: [
      topic(
        'g10-trig',
        ['Тригонометрия', 'Тригонометрия', 'Trigonometry'],
        ['Крыша, маяк и навигация считают sin, cos, tan.', 'Шатыр, маяк пен навигация sin, cos, tan санайды.', 'Roofs, lighthouses and navigation use sin, cos, tan.'],
        [
          m('g10-builder-ramp', 'architect', ['Пандус у школы', 'Мектеп пандусы', 'A school ramp'], [
            {
              story: tx('Смотри на школу и пандус справа: наклонная дорожка длиной 5 м поднимается на 1 м. Синус угла — это высота, делённая на длину пандуса.', 'Мектеп пен оң жақтағы пандусқа қара: 5 м еңіс жол 1 м көтереді. Бұрыш синусы — биіктіктің пандус ұзындығына бөліндісі.', 'Look at the school and the ramp on the right: the 5 m slope rises 1 m. Sine of the angle is height divided by ramp length.'),
              question: tx('sin α ?', 'sin α ?', 'sin α ?'),
              hint: tx('1 / 5.', '1 / 5.'),
              explain: tx('Нормы доступности задают угол пандуса. Его считают через синус или тангенс.', 'Қолжетімділік нормасы пандус бұрышын қояды. Оны синус не тангенспен санайды.', 'Accessibility rules set a ramp angle. You compute it with sine or tangent.'),
              visual: { scene: 'ramp', marks: { hyp: tx('5 м', '5 м', '5 m'), opp: tx('1 м', '1 м', '1 m'), angle: tx('α', 'α', 'α') } },
              answer: n(0.2, 0.005),
            },
            {
              story: tx('А теперь длина по земле — горизонтальный катет. По Пифагору это √(5² − 1²) = √24 ≈ 4.90 м.', 'Енді жердегі ұзындық — көлденең катет. Пифагор бойынша √(5² − 1²) = √24 ≈ 4.90 м.', 'Now the ground length — the horizontal leg. By Pythagoras that is √(5² − 1²) = √24 ≈ 4.90 m.'),
              question: tx('Длина по земле (м), √24 ≈ 4.90', 'Жердегі ұзындық (м), √24 ≈ 4.90', 'Ground length (m), √24 ≈ 4.90'),
              hint: tx('√24 ≈ 4.9', '√24 ≈ 4.9'),
              explain: tx('Архитектор размечает длину по двору, не по наклонной доске.', 'Сәулетші ауладағы ұзындықты еңіс тақтай емес, жермен белгілейді.', 'Architects mark length along the yard, not along the sloping board.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'ramp', marks: { hyp: tx('5 м', '5 м', '5 m'), opp: tx('1 м', '1 м', '1 m'), adj: tx('? м', '? м', '? m'), angle: tx('α', 'α', 'α') } },
              answer: n(4.9, 0.05),
            },
          ]),
          m('g10-sailor-lighthouse', 'sailor', ['Маяк на Каспии', 'Каспийдегі маяк', 'A Caspian lighthouse'], [
            {
              story: tx('С палубы виден маяк высотой 40 м. Угол места 8°, tan 8° ≈ 0.1405. Расстояние d = высота / tan α.', 'Палубадан биіктігі 40 м маяк көрінеді. Бұрыш 8°, tan 8° ≈ 0.1405. Қашықтық d = биіктік / tan α.', 'From the deck you see a 40 m lighthouse. Elevation 8°, tan 8° ≈ 0.1405. Distance d = height / tan α.'),
              question: tx('Расстояние до маяка в метрах (округли до целых)', 'Маякқа дейінгі қашықтық (бүтінге дөңгелекте)', 'Distance to the lighthouse in metres (round to whole)'),
              hint: tx('40 / 0.1405 ≈ 285.', '40 / 0.1405 ≈ 285.'),
              explain: tx('Моряк оценивает дистанцию секстаном: высота известна, угол измерен.', 'Теңізші қашықтықты секстанмен бағалайды: биіктік белгілі, бұрыш өлшенген.', 'A sailor estimates range with a sextant: height known, angle measured.'),
              unit: tx('м', 'м', 'm'),
              visual: { scene: 'lighthouse', marks: { height: tx('40 м', '40 м', '40 m'), angle: tx('8°', '8°', '8°'), width: tx('d = ?', 'd = ?', 'd = ?') } },
              answer: n(285, 3),
            },
            {
              story: tx('Катер идёт прямо на маяк со скоростью 15 м/с. До маяка около 285 м. За сколько секунд дойти?', 'Катер маякқа 15 м/с-пен тура барады. Маякқа дейін шамамен 285 м. Неше секундта жетеді?', 'The boat heads straight to the lighthouse at 15 m/s. It is about 285 m away. How many seconds to arrive?'),
              question: tx('285 / 15', '285 / 15', '285 / 15'),
              hint: tx('Время = путь / скорость.', 'Уақыт = жол / жылдамдық.'),
              explain: tx('Навигация связывает тригонометрию с равномерным движением.', 'Навигация тригонометрияны бірқалыпты қозғалыспен байланыстырады.', 'Navigation ties trigonometry to uniform motion.'),
              unit: tx('с', 'с', 's'),
              visual: { scene: 'lighthouse', marks: { height: tx('40 м', '40 м', '40 m'), width: tx('285 м', '285 м', '285 m'), angle: tx('8°', '8°', '8°') } },
              answer: n(19),
            },
          ]),
        ],
      ),
      topic(
        'g10-seq',
        ['Прогрессии', 'Прогрессиялар', 'Sequences'],
        ['Зарплата, рассрочка и бактерии — арифметика и геометрия рядов.', 'Жалақы, бөліп төлеу мен бактерия — қатардың арифметикасы мен геометриясы.', 'Pay, instalments and bacteria — arithmetic and geometric rows.'],
        [
          m('g10-banker-salary', 'banker', ['Индексация зарплаты', 'Жалақы индексі', 'Salary indexation'], [
            {
              story: tx('Оклад 180 000 ₸, каждый год +12 000 ₸. Это арифметическая прогрессия.', 'Жалақы 180 000 ₸, жыл сайын +12 000 ₸. Арифметикалық прогрессия.', 'Pay 180 000 ₸, plus 12 000 ₸ each year. Arithmetic sequence.'),
              question: tx('Оклад на 5-й год? a5 = a1 + 4d', '5-ші жылғы жалақы? a5 = a1 + 4d', 'Year-5 salary? a5 = a1 + 4d'),
              hint: tx('180000 + 4×12000.', '180000 + 4×12000.'),
              explain: tx('HR считает будущий оклад по формуле n-го члена, не расписывая каждый год.', 'HR әр жылды жазбай, n-ші мүше формуласымен болашақ жалақыны санайды.', 'HR computes future pay with the nth-term formula instead of listing every year.'),
              unit: tenge,
              answer: n(228000),
            },
            {
              story: tx('Сколько всего выплатят за 5 лет? Сумма арифметической прогрессии.', '5 жылда барлығы қанша төленеді? Арифметикалық прогрессия қосындысы.', 'Total paid over 5 years? Arithmetic series sum.'),
              question: tx('S5 = 5/2 × (a1+a5)', 'S5 = 5/2 × (a1+a5)', 'S5 = 5/2 × (a1+a5)'),
              hint: tx('2.5 × (180000+228000).', '2.5 × (180000+228000).'),
              explain: tx('Бюджет отдела — сумма ряда, не «оклад × годы» вслепую.', 'Бөлім бюджеті — қатар қосындысы, «жалақы × жыл» емес.', 'A team budget is a series sum, not salary times years blindly.'),
              unit: tenge,
              answer: n(1020000),
            },
          ]),
          m('g10-scientist-bacteria', 'scientist', ['Рост культуры', 'Дақыл өсуі', 'Culture growth'], [
            {
              story: tx('Бактерий 500, каждые 2 часа ×2. Через 8 часов сколько удвоений? 4.', 'Бактерия 500, әр 2 сағатта ×2. 8 сағатта неше еселену? 4.', '500 bacteria, ×2 every 2 hours. Doublings in 8 hours? 4.'),
              question: tx('Численность? 500 × 2^4', 'Саны? 500 × 2^4', 'Population? 500 × 2^4'),
              hint: tx('2^4=16.', '2^4=16.'),
              explain: tx('Геометрическая прогрессия — язык микробиологии и эпидемиологии.', 'Геометриялық прогрессия — микробиология мен эпидемиология тілі.', 'A geometric sequence is the language of microbiology and epidemiology.'),
              answer: n(8000),
            },
            {
              story: tx('Нужно не меньше 32000. Сколько ещё удвоений после текущих 8000?', 'Кемінде 32000 керек. Қазіргі 8000-нан кейін неше еселену?', 'Need at least 32000. How many more doublings after 8000?'),
              question: tx('Число удвоений', 'Еселену саны', 'Number of doublings'),
              hint: tx('8000×2×2=32000 → 2.', '8000×2×2=32000 → 2.'),
              explain: tx('Лаборант планирует время инкубации по числу шагов прогрессии.', 'Лаборант инкубация уақытын прогрессия қадам санымен жоспарлайды.', 'Lab techs plan incubation time from the number of sequence steps.'),
              answer: n(2),
            },
          ]),
        ],
      ),
      topic(
        'g10-log',
        ['Логарифмы', 'Логарифмдер', 'Logarithms'],
        ['Громкость, pH и магнитуда — логарифмическая шкала мира.', 'Дауыс, pH және магнитуда — әлемнің логарифмдік шкаласы.', 'Loudness, pH and magnitude — the world’s log scale.'],
        [
          m('g10-musician-db', 'musician', ['Громкость концерта', 'Концерт қаттылығы', 'Concert loudness'], [
            {
              story: tx('Разница 20 дБ значит интенсивность ×100, потому что 20=10 log10(100). Усилитель +20 дБ.', '20 дБ айырма интенсивтілікті ×100 етеді, 20=10 log10(100). Күшейткіш +20 дБ.', 'A 20 dB gap means intensity ×100, since 20=10 log10(100). Amp +20 dB.'),
              question: tx('Во сколько раз выросла интенсивность звука?', 'Дыбыс интенсивтілігі неше есе өсті?', 'By what factor did sound intensity grow?'),
              hint: tx('10^(20/10)=10^2.', '10^(20/10)=10^2.'),
              explain: tx('Звукорежиссёр крутит децибелы, а мощность растёт в разы — логарифм сжимает шкалу.', 'Дыбыс режиссері децибелді бұраса, қуат еселеп өседі — логарифм шкаланы сығады.', 'A sound engineer turns decibels while power multiplies — logs compress the scale.'),
              answer: n(100),
            },
            {
              story: tx('Ещё +10 дБ. Во сколько раз относительно исходной? 10^(30/10)', 'Тағы +10 дБ. Бастапқыға қатысты неше есе? 10^(30/10)', 'Another +10 dB. Factor vs original? 10^(30/10)'),
              question: tx('10^3', '10^3', '10^3'),
              hint: tx('30 дБ = три порядка.', '30 дБ = үш разряд.'),
              explain: tx('Каждые 10 дБ — ×10 интенсивности. Наушники и залы считают так же.', 'Әр 10 дБ — интенсивтілік ×10. Құлаққап пен зал да солай санайды.', 'Every 10 dB is ×10 intensity. Headphones and halls use the same rule.'),
              answer: n(1000),
            },
          ]),
          m('g10-scientist-ph', 'scientist', ['pH воды', 'Судың pH-ы', 'Water pH'], [
            {
              story: tx('pH = −log10[H+]. Если [H+]=10^(−7), какой pH?', 'pH = −log10[H+]. [H+]=10^(−7) болса, pH қандай?', 'pH = −log10[H+]. If [H+]=10^(−7), what is pH?'),
              question: tx('pH нейтральной воды', 'Бейтарап судың pH-ы', 'Neutral-water pH'),
              hint: tx('−(−7)=7.', '−(−7)=7.'),
              explain: tx('Химик и эколог читают кислотность логарифмом: каждый шаг pH — ×10 ионов.', 'Химик пен эколог қышқылдықты логарифммен оқиды: әр pH қадамы — ион ×10.', 'Chemists and ecologists read acidity in logs: each pH step is ×10 ions.'),
              answer: n(7),
            },
            {
              story: tx('Дождь pH 4. Во сколько раз [H+] больше, чем при pH 7?', 'Жаңбыр pH 4. pH 7-мен салыстырғанда [H+] неше есе көп?', 'Rain pH 4. How many times greater is [H+] than at pH 7?'),
              question: tx('10^(7-4)', '10^(7-4)', '10^(7-4)'),
              hint: tx('Разница трёх единиц pH.', 'Үш pH бірлігінің айырмасы.'),
              explain: tx('Кислотный дождь «в 1000 раз кислее» — это логарифм, не линейка.', 'Қышқыл жаңбыр «1000 есе қышқыл» — бұл логарифм, сызғыш емес.', 'Acid rain “1000 times more acidic” is a logarithm, not a ruler.'),
              answer: n(1000),
            },
          ]),
        ],
      ),
      topic(
        'g10-prob2',
        ['Вероятность и риск', 'Ықтималдық пен тәуекел', 'Probability and risk'],
        ['Страховка и диагностика считают ожидание и независимые события.', 'Сақтандыру мен диагностика күтім мен тәуелсіз оқиғаны санайды.', 'Insurance and diagnosis compute expectation and independent events.'],
        [
          m('g10-banker-insure', 'banker', ['Страховка телефона', 'Телефон сақтандыруы', 'Phone insurance'], [
            {
              story: tx('Полис 8000 ₸. Ремонт при поломке 40000 ₸. Вероятность поломки за год 0.15.', 'Полис 8000 ₸. Сынса жөндеу 40000 ₸. Жылдық сыну ықтималдығы 0.15.', 'Policy 8000 ₸. Repair 40000 ₸ if it breaks. Break chance 0.15 / year.'),
              question: tx('Ожидаемый убыток без страховки? 0.15×40000', 'Сақтандырусыз күтілетін зиян? 0.15×40000', 'Expected loss without insurance? 0.15×40000'),
              hint: tx('Матожидание: p × сумма.', 'Математикалық күтім: p × сома.'),
              explain: tx('Страховщик сравнивает цену полиса с ожидаемым убытком клиента.', 'Сақтандырушы полис бағасын клиенттің күтілетін зиянымен салыстырады.', 'Insurers compare the premium with the client’s expected loss.'),
              unit: tenge,
              answer: n(6000),
            },
            {
              story: tx('Полис дороже ожидания на сколько тенге? (это «наценка за спокойствие»)', 'Полис күтімнен неше теңге қымбат? («тыныштық үстемесі»)', 'How many tenge is the policy above expectation? (“peace of mind” markup)'),
              question: tx('8000 − 6000', '8000 − 6000', '8000 − 6000'),
              hint: tx('Разница цены и риска.', 'Баға мен тәуекел айырмасы.'),
              explain: tx('Люди платят больше ожидания, чтобы не поймать редкий, но тяжёлый удар.', 'Адамдар сирек, бірақ ауыр соққыны ұстамау үшін күтімнен көп төлейді.', 'People pay above expectation to avoid a rare but heavy hit.'),
              unit: tenge,
              answer: n(2000),
            },
          ]),
          m('g10-doctor-test', 'doctor', ['Два независимых теста', 'Екі тәуелсіз тест', 'Two independent tests'], [
            {
              story: tx('Тест ошибается с вероятностью 0.1. Два независимых теста подряд оба ошиблись.', 'Тест 0.1 ықтималдықпен қателеседі. Екі тәуелсіз тест қатарынан қателесті.', 'A test errs with probability 0.1. Two independent tests both err.'),
              question: tx('Вероятность двух ошибок? p×p', 'Екі қате ықтималдығы? p×p', 'Probability of two errors? p×p'),
              hint: tx('Для независимых — произведение.', 'Тәуелсіздерге — көбейтінді.'),
              explain: tx('Врач дублирует анализ: совместная ошибка падает как произведение.', 'Дәрігер талдауды қайталайды: бірге қате көбейтіндідей түседі.', 'Doctors repeat a test: joint error falls as a product.'),
              answer: n(0.01, 0.001),
            },
            {
              story: tx('Хотя бы один из двух тестов верен. Вероятность? 1 − 0.01', 'Екі тесттің кемінде бірі дұрыс. Ықтималдық? 1 − 0.01', 'At least one of two tests is correct. Probability? 1 − 0.01'),
              question: tx('1 минус обе ошибки', '1 минус екі қате', '1 minus both wrong'),
              hint: tx('Дополнение.', 'Толықтауыш.'),
              explain: tx('«Хотя бы один» считают через противоположное событие — быстрее, чем случаи.', '«Кемінде біреу» қарама-қарсы оқиғамен саналады — жағдайдан тез.', '“At least one” is the complement — faster than listing cases.'),
              answer: n(0.99, 0.005),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 11,
    title: tx('Одиннадцатый класс', 'Он бірінші сынып', 'Grade 11'),
    world: tx('Цех оптимизации', 'Оңтайландыру цехі', 'Optimization shop'),
    color: '#ab47bc',
    topics: [
      topic(
        'g11-der',
        ['Производная', 'Туынды', 'Derivatives'],
        ['Скорость, максимум прибыли и наклон графика — производная в деле.', 'Жылдамдық, пайда максимумы мен график еңісі — істегі туынды.', 'Speed, max profit and slope — derivatives at work.'],
        [
          m('g11-driver-speed', 'driver', ['Спидометр и путь', 'Спидометр мен жол', 'Speedometer and distance'], [
            {
              story: tx('Путь s(t)= 4t² (метры, секунды). Мгновенная скорость v=s′=8t.', 'Жол s(t)= 4t². Лездік жылдамдық v=s′=8t.', 'Distance s(t)= 4t². Instant speed v=s′=8t.'),
              question: tx('Скорость на 3-й секунде (м/с)?', '3-ші секундтағы жылдамдық (м/с)?', 'Speed at t=3 (m/s)?'),
              hint: tx('8 × 3.', '8 × 3.'),
              explain: tx('Спидометр показывает производную пути. Инструктор объясняет разгон так.', 'Спидометр жол туындысын көрсетеді. Нұсқаушы үдеуді солай түсіндіреді.', 'A speedometer shows the derivative of distance. Instructors explain acceleration that way.'),
              unit: tx('м/с', 'м/с', 'm/s'),
              answer: n(24),
            },
            {
              story: tx('Ускорение a=v′=8 (постоянное). Какой путь за 3 с? s(3)=4×9.', 'Үдеу a=v′=8 (тұрақты). 3 с ішіндегі жол? s(3)=4×9.', 'Acceleration a=v′=8 (constant). Distance in 3 s? s(3)=4×9.'),
              question: tx('Метры', 'Метр', 'Metres'),
              hint: tx('4 × 9 = 36.', '4 × 9 = 36.'),
              explain: tx('Путь — исходная функция. Производная не заменяет её, а говорит о темпе.', 'Жол — бастапқы функция. Туынды оны алмастырмайды, қарқын туралы айтады.', 'Distance is the original function. The derivative does not replace it; it tells the pace.'),
              unit: tx('м', 'м', 'm'),
              answer: n(36),
            },
          ]),
          m('g11-banker-profit', 'banker', ['Максимум прибыли', 'Пайда максимумы', 'Maximum profit'], [
            {
              story: tx('Прибыль P(x)= −x² + 12x − 20, x — цена в тысячах ₸. Максимум в x= −b/(2a).', 'Пайда P(x)= −x² + 12x − 20. Максимум x= −b/(2a).', 'Profit P(x)= −x² + 12x − 20, x price in thousand ₸. Max at x= −b/(2a).'),
              question: tx('Оптимальная цена x?', 'Оңтайлы баға x?', 'Optimal price x?'),
              hint: tx('a=−1, b=12 → x=6.', 'a=−1, b=12 → x=6.'),
              explain: tx('Маркетолог ищет вершину параболы прибыли, а не «чем дороже, тем лучше».', 'Маркетолог «неғұрлым қымбат, соғұрлым жақсы» емес, пайда параболасының төбесін іздейді.', 'Marketers hunt the profit parabola’s vertex, not “more expensive is always better”.'),
              answer: n(6),
            },
            {
              story: tx('Прибыль при этой цене? P(6)', 'Осы бағадағы пайда? P(6)', 'Profit at that price? P(6)'),
              question: tx('P(6)= −36 + 72 − 20', 'P(6)= −36 + 72 − 20', 'P(6)= −36 + 72 − 20'),
              hint: tx('72 − 56.', '72 − 56.'),
              explain: tx('Значение в вершине — сколько заработают. Производная P′=0 там, где рост кончился.', 'Төбе мәні — қанша табыс. P′=0 өсу біткен жерде.', 'The vertex value is the take. P′=0 where growth stops.'),
              answer: n(16),
            },
          ]),
        ],
      ),
      topic(
        'g11-exp',
        ['Показательные', 'Көрсеткіштік', 'Exponentials'],
        ['Вклад с капитализацией и полураспад — e и aⁿ.', 'Капитализациялы салым мен жартылай ыдырау — e және aⁿ.', 'Compounding deposits and half-life are e and aⁿ.'],
        [
          m('g11-banker-compound', 'banker', ['Сложный процент', 'Күрделі пайыз', 'Compound interest'], [
            {
              story: tx('50 000 ₸ под 10% годовых с капитализацией раз в год, 3 года: 50000×(1.1)^3.', '50 000 ₸ 10% жылдық, жылына бір капитализация, 3 жыл: 50000×(1.1)^3.', '50 000 ₸ at 10% compounded yearly for 3 years: 50000×(1.1)^3.'),
              question: tx('Сумма на счёте? 1.1³=1.331', 'Шоттағы сома? 1.1³=1.331', 'Account total? 1.1³=1.331'),
              hint: tx('50000 × 1.331.', '50000 × 1.331.'),
              explain: tx('Капитализация — проценты на проценты. Банк считает показательной функцией.', 'Капитализация — пайызға пайыз. Банк көрсеткіштік функциямен санайды.', 'Compounding is interest on interest. Banks compute it with an exponential.'),
              unit: tenge,
              answer: n(66550, 5),
            },
            {
              story: tx('На сколько это больше, чем простой процент 50 000×0.1×3 + 50 000?', 'Жай пайыз 50 000×0.1×3 + 50 000-нан нешеге көп?', 'How much more than simple interest 50 000×0.1×3 + 50 000?'),
              question: tx('Разница', 'Айырма', 'Difference'),
              hint: tx('Простой итог 65000. Сложный 66550. Разница 1550.', 'Жай қорытынды 65000. Күрделі 66550. Айырма 1550.'),
              explain: tx('Разница — цена капитализации. За длинный срок она становится огромной.', 'Айырма — капитализация бағасы. Ұзақ мерзімде ол үлкен болады.', 'The gap is the price of compounding. Over long terms it becomes huge.'),
              unit: tenge,
              answer: n(1550, 5),
            },
          ]),
          m('g11-scientist-half', 'scientist', ['Период полураспада', 'Жартылай ыдырау периоды', 'Half-life'], [
            {
              story: tx('Изотоп с периодом 8 суток. Осталось 1/8 исходного. Сколько периодов прошло? (1/2)^n = 1/8', 'Изотоп периоды 8 тәулік. Бастапқының 1/8-і қалды. Неше период өтті?', 'Isotope half-life 8 days. 1/8 remains. How many periods? (1/2)^n = 1/8'),
              question: tx('n', 'n', 'n'),
              hint: tx('2^3=8, n=3.', '2^3=8, n=3.'),
              explain: tx('Медик и геолог считают, сколько полураспадов прошло по оставшейся доле.', 'Дәрігер мен геолог қалған үлес бойынша қанша жартылай ыдырау өткенін санайды.', 'Doctors and geologists count elapsed half-lives from the remaining fraction.'),
              answer: n(3),
            },
            {
              story: tx('Сколько суток это заняло?', 'Бұл неше тәулік алды?', 'How many days was that?'),
              question: tx('3 × 8', '3 × 8', '3 × 8'),
              hint: tx('Периоды умножают на длину периода.', 'Периодты период ұзындығына көбейтеді.'),
              explain: tx('Время = n × T½. Так датируют находки и планируют хранение изотопов.', 'Уақыт = n × T½. Табылымды даталап, изотоп сақтауын солай жоспарлайды.', 'Time = n × T½. That dates finds and plans isotope storage.'),
              unit: tx('сут', 'тәул', 'd'),
              answer: n(24),
            },
          ]),
        ],
      ),
      topic(
        'g11-3d',
        ['Стереометрия', 'Стереометрия', '3D geometry'],
        ['Склад, цистерна и упаковка считают объём и площадь поверхности.', 'Қойма, цистерна мен қаптама көлем мен бет ауданын санайды.', 'Warehouses, tanks and packaging compute volume and surface.'],
        [
          m('g11-logistics-box', 'logistics', ['Коробка на складе', 'Қоймадағы қорап', 'A warehouse box'], [
            {
              story: tx('Коробка 0.4 × 0.3 × 0.5 м. Объём?', 'Қорап 0.4 × 0.3 × 0.5 м. Көлем?', 'Box 0.4 × 0.3 × 0.5 m. Volume?'),
              question: tx('м³', 'м³', 'm³'),
              hint: tx('0.4×0.3×0.5.', '0.4×0.3×0.5.'),
              explain: tx('Логист заполняет фуру объёмом, а не «на глаз сколько влезет».', 'Логист фураны «көзбен қанша сияды» емес, көлеммен толтырады.', 'Logisticians fill a truck by volume, not by eyeballing capacity.'),
              unit: tx('м³', 'м³', 'm³'),
              answer: n(0.06, 0.002),
            },
            {
              story: tx('Площадь поверхности (для плёнки): 2(ab+bc+ac).', 'Бет ауданы (үлдірге): 2(ab+bc+ac).', 'Surface area (for wrap): 2(ab+bc+ac).'),
              question: tx('м², два знака: 2(0.12+0.15+0.20)=0.94? посчитай точно 2(0.4*0.3+0.3*0.5+0.4*0.5)', 'м²', 'm², compute 2(0.4*0.3+0.3*0.5+0.4*0.5)'),
              hint: tx('2(0.12+0.15+0.20)=0.94.', '2(0.12+0.15+0.20)=0.94.'),
              explain: tx('Стретч-плёнку заказывают по площади поверхности, плюс запас на нахлёст.', 'Стретч-үлдірді бет ауданы бойынша алады, жабысу қорымен.', 'Stretch wrap is ordered by surface area, plus overlap.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(0.94, 0.02),
            },
          ]),
          m('g11-engineer-tank', 'engineer', ['Цистерна', 'Цистерна', 'A tank'], [
            {
              story: tx('Цилиндр: радиус 1 м, высота 3 м. V=πr²h, π=3.14', 'Цилиндр: радиус 1 м, биіктік 3 м. V=πr²h, π=3.14', 'Cylinder: radius 1 m, height 3 m. V=πr²h, π=3.14'),
              question: tx('Объём м³', 'Көлем м³', 'Volume m³'),
              hint: tx('3.14 × 1 × 3.', '3.14 × 1 × 3.'),
              explain: tx('Нефтяник и водоканал считают цилиндры — цистерны, трубы, колонны.', 'Мұнайшы мен су арнасы цилиндрді санайды — цистерна, құбыр, баған.', 'Oil and water utilities compute cylinders — tanks, pipes, columns.'),
              unit: tx('м³', 'м³', 'm³'),
              answer: n(9.42, 0.05),
            },
            {
              story: tx('Боковую поверхность 2πrh (без днищ) красят. Сколько м²? π=3.14', 'Бүйір бетін 2πrh (түпсіз) бояйды. Неше м²?', 'Lateral surface 2πrh (no lids) is painted. How many m²? π=3.14'),
              question: tx('2 × 3.14 × 1 × 3', '2 × 3.14 × 1 × 3', '2 × 3.14 × 1 × 3'),
              hint: tx('18.84', '18.84'),
              explain: tx('Краску считают по боковой площади: днища часто другой материал.', 'Бояуды бүйір ауданмен санайды: түп жиі басқа материал.', 'Paint is budgeted on the side area: lids are often another material.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(18.84, 0.05),
            },
          ]),
        ],
      ),
      topic(
        'g11-stat2',
        ['Статистика данных', 'Дерек статистикасы', 'Data statistics'],
        ['Медицина и соцопрос считают долю, разброс и выборку.', 'Медицина мен әлеуметтік сауал үлес, шашырау мен іріктемені санайды.', 'Medicine and polls compute share, spread and samples.'],
        [
          m('g11-doctor-trial', 'doctor', ['Испытание вакцины', 'Вакцина сынағы', 'A vaccine trial'], [
            {
              story: tx('Из 2000 человек заболели 40 в группе вакцины. Доля?', 'Вакцина тобында 2000 адамның 40-ы ауырды. Үлес?', '40 of 2000 in the vaccine arm got ill. Share?'),
              question: tx('40/2000', '40/2000', '40/2000'),
              hint: tx('0.02', '0.02'),
              explain: tx('Врач переводит случаи в долю — так сравнивают вакцину и плацебо.', 'Дәрігер жағдайды үлеске аударады — вакцина мен плацебоны солай салыстырады.', 'Doctors convert cases into a rate to compare vaccine and placebo.'),
              answer: n(0.02, 0.002),
            },
            {
              story: tx('Плацебо: 100 заболевших из 2000. На сколько процентных пунктов ниже риск у вакцины? (5%−2%)', 'Плацебо: 2000-нан 100 ауырды. Вакцина тәуекелі неше пайыздық тармақ төмен? (5%−2%)', 'Placebo: 100 of 2000 ill. How many percentage points lower is vaccine risk? (5%−2%)'),
              question: tx('Пункты', 'Тармақ', 'Points'),
              hint: tx('0.05 − 0.02 = 0.03 → 3 пункта.', '0.05 − 0.02 = 0.03 → 3 тармақ.'),
              explain: tx('Снижение в пунктах — язык регуляторов. Относительный риск считают отдельно.', 'Тармақпен төмендеу — реттеуші тілі. Салыстырмалы тәуекел бөлек саналады.', 'Point reduction is regulator language. Relative risk is computed separately.'),
              unit: pct,
              answer: n(3),
            },
          ]),
          m('g11-reporter-sample', 'reporter', ['Выборка опроса', 'Сауал іріктемесі', 'A poll sample'], [
            {
              story: tx('Опросили 400 человек, 220 «за». Выборочная доля p̂?', '400 адамнан сұралды, 220 «жақсы». Іріктеме үлесі p̂?', '400 people polled, 220 “yes”. Sample share p̂?'),
              question: tx('220/400', '220/400', '220/400'),
              hint: tx('0.55', '0.55'),
              explain: tx('Журналист обязан писать долю выборки, не «большинство страны», если опросили 400.', 'Журналист 400-ді сұраса, «елдің көпшілігі» емес, іріктеме үлесін жазуға тиіс.', 'Reporters must write the sample share, not “most of the country”, after 400 interviews.'),
              answer: n(0.55, 0.01),
            },
            {
              story: tx('Грубая погрешность 1/√n. Для n=400 это?', 'Дөрекі қате 1/√n. n=400 үшін?', 'Rough error 1/√n. For n=400?'),
              question: tx('1/20', '1/20', '1/20'),
              hint: tx('√400=20.', '√400=20.'),
              explain: tx('Порядок ошибки выборки падает как корень из n. Удвоить точность — учетверить выборку.', 'Іріктеме қатесі n түбіріндей түседі. Дәлдікті екі еселеу — іріктемені төрт еселеу.', 'Sampling error falls like 1 over root n. Twice the accuracy needs four times the sample.'),
              answer: n(0.05, 0.005),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 12,
    title: tx('Двенадцатый класс', 'Он екінші сынып', 'Grade 12'),
    world: tx('Штаб решений', 'Шешім штабы', 'Decision HQ'),
    color: '#c44536',
    topics: [
      topic(
        'g12-int',
        ['Интеграл', 'Интеграл', 'Integrals'],
        ['Площадь под графиком — работа, расход топлива, накопленный ток.', 'График астындағы аудан — жұмыс, отын шығыны, жиналған ток.', 'Area under a graph is work, fuel use, accumulated current.'],
        [
          m('g12-engineer-work', 'engineer', ['Работа силы', 'Күш жұмысы', 'Work of a force'], [
            {
              story: tx('Сила F=6x ньютонов, путь от 0 до 4 м. Работа A=∫F dx = ∫0^4 6x dx = 3x² |.', 'Күш F=6x, жол 0-ден 4 м. Жұмыс A=∫0^4 6x dx = 3x².', 'Force F=6x newtons, path 0 to 4 m. Work A=∫0^4 6x dx = 3x².'),
              question: tx('Работа в джоулях', 'Жұмыс джоульмен', 'Work in joules'),
              hint: tx('3×16 − 0.', '3×16 − 0.'),
              explain: tx('Переменная сила: работа — интеграл, не F×s с одним числом.', 'Айнымалы күш: жұмыс — интеграл, бір санды F×s емес.', 'A changing force: work is an integral, not one F×s.'),
              unit: tx('Дж', 'Дж', 'J'),
              answer: n(48),
            },
            {
              story: tx('Средняя сила на этом отрезке: A / путь = 48/4.', 'Осы кесіндіден орташа күш: A / жол = 48/4.', 'Mean force on that interval: A / distance = 48/4.'),
              question: tx('Ньютоны', 'Ньютон', 'Newtons'),
              hint: tx('48 ÷ 4.', '48 ÷ 4.'),
              explain: tx('Среднее значение функции — интеграл, делённый на длину промежутка.', 'Функцияның орташасы — аралық ұзындығына бөлінген интеграл.', 'A function’s average is the integral divided by interval length.'),
              unit: tx('Н', 'Н', 'N'),
              answer: n(12),
            },
          ]),
          m('g12-pilot-fuel', 'pilot', ['Расход топлива', 'Отын шығыны', 'Fuel burn'], [
            {
              story: tx('Расход r(t)= 8 + 0.4t кг/мин, полёт 10 мин. Топливо = ∫0^10 r dt = 8t + 0.2t².', 'Шығын r(t)= 8 + 0.4t кг/мин, ұшу 10 мин. Отын = ∫0^10 r dt.', 'Burn r(t)= 8 + 0.4t kg/min, 10 min flight. Fuel = ∫0^10 r dt = 8t + 0.2t².'),
              question: tx('Килограммы топлива', 'Отын килограммы', 'Kilograms of fuel'),
              hint: tx('80 + 0.2×100 = 100.', '80 + 0.2×100 = 100.'),
              explain: tx('Пилот интегрирует расход: он растёт на наборе высоты.', 'Ұшқыш шығынды интегралдайды: биіктік алғанда ол өседі.', 'Pilots integrate burn rate: it grows during climb.'),
              unit: tx('кг', 'кг', 'kg'),
              answer: n(100),
            },
            {
              story: tx('Бак 130 кг. Запас после полёта?', 'Бак 130 кг. Ұшқаннан кейінгі қор?', 'Tank 130 kg. Reserve after the flight?'),
              question: tx('130 − 100', '130 − 100', '130 − 100'),
              hint: tx('Вычитание остатка.', 'Қалдықты азайту.'),
              explain: tx('Запас топлива — разность бака и интеграла расхода. Это правило безопасности.', 'Отын қоры — бак пен шығын интегралының айырмасы. Бұл қауіпсіздік ережесі.', 'Fuel reserve is tank minus the burn integral. It is a safety rule.'),
              unit: tx('кг', 'кг', 'kg'),
              answer: n(30),
            },
          ]),
        ],
      ),
      topic(
        'g12-vec',
        ['Векторы', 'Векторлар', 'Vectors'],
        ['Навигация и физика складывают направления, не только длины.', 'Навигация мен физика бағытты қосады, тек ұзындықты емес.', 'Navigation and physics add directions, not only lengths.'],
        [
          m('g12-pilot-wind', 'pilot', ['Ветер и курс', 'Жел мен курс', 'Wind and heading'], [
            {
              story: tx('Самолёт (120, 0) км/ч, ветер (0, 50). Равнодействующая — сумма векторов.', 'Ұшақ (120, 0) км/сағ, жел (0, 50). Қорытқы — вектор қосындысы.', 'Plane (120, 0) km/h, wind (0, 50). Resultant is the vector sum.'),
              question: tx('Скорость относительно земли? √(120²+50²)', 'Жерге қатысты жылдамдық? √(120²+50²)', 'Ground speed? √(120²+50²)'),
              hint: tx('√(14400+2500)=√16900=130.', '√(14400+2500)=√16900=130.'),
              explain: tx('Пилот складывает векторы тяги и ветра. Модуль — путевая скорость.', 'Ұшқыш тарту мен жел векторларын қосады. Модуль — жол жылдамдығы.', 'Pilots add thrust and wind vectors. The magnitude is ground speed.'),
              unit: tx('км/ч', 'км/сағ', 'km/h'),
              answer: n(130),
            },
            {
              story: tx('За 2 часа какой путь по земле (км)?', '2 сағатта жердегі жол (км)?', 'Ground distance in 2 hours (km)?'),
              question: tx('130 × 2', '130 × 2', '130 × 2'),
              hint: tx('Равномерное движение с путевой скоростью.', 'Жол жылдамдығымен бірқалыпты қозғалыс.'),
              explain: tx('Время умножают на модуль равнодействующей, не на «воздушную» скорость.', 'Уақытты «ауа» жылдамдығына емес, қорытқы модуліне көбейтеді.', 'Multiply time by the resultant magnitude, not airspeed alone.'),
              unit: tx('км', 'км', 'km'),
              answer: n(260),
            },
          ]),
          m('g12-coder-force', 'gamedev', ['Силы в игре', 'Ойындағы күштер', 'Forces in a game'], [
            {
              story: tx('Сила прыжка (0, 8), ветер (−3, 0), отдача (1, −2). Сумма координат y?', 'Секіріс (0, 8), жел (−3, 0), кері соққы (1, −2). y қосындысы?', 'Jump (0, 8), wind (−3, 0), recoil (1, −2). Sum of y?'),
              question: tx('8 + 0 − 2', '8 + 0 − 2', '8 + 0 − 2'),
              hint: tx('Складывай по осям.', 'Ось бойынша қос.'),
              explain: tx('Физический движок суммирует векторы сил по компонентам каждый кадр.', 'Физика қозғалтқышы әр кадрда күш векторларын компонентпен қосады.', 'A physics engine sums force vectors component-wise every frame.'),
              answer: n(6),
            },
            {
              story: tx('Сумма x-компонент?', 'x-компонент қосындысы?', 'Sum of x-components?'),
              question: tx('0 − 3 + 1', '0 − 3 + 1', '0 − 3 + 1'),
              hint: tx('−3+1.', '−3+1.'),
              explain: tx('Итог (−2, 6) задаёт ускорение персонажа. Без векторов движение «ломается».', 'Қорытынды (−2, 6) кейіпкер үдеуін қояды. Векторсыз қозғалыс «сынып қалады».', 'The result (−2, 6) sets character acceleration. Without vectors, motion breaks.'),
              answer: n(-2),
            },
          ]),
        ],
      ),
      topic(
        'g12-prob3',
        ['Вероятность данных', 'Дерек ықтималдығы', 'Data probability'],
        ['Дата-сайентист считает сочетания, условную вероятность и ожидание.', 'Дата-сайентист теру, шартты ықтималдық пен күтімді санайды.', 'Data scientists compute combinations, conditional probability and expectation.'],
        [
          m('g12-coder-ab', 'coder', ['A/B тест', 'A/B тест', 'An A/B test'], [
            {
              story: tx('Вариант A: 120 покупок из 2000. B: 150 из 2000. Конверсия B в процентах?', 'A нұсқа: 2000-нан 120 сатып алу. B: 2000-нан 150. B конверсиясы пайызбен?', 'Variant A: 120 purchases / 2000. B: 150 / 2000. B conversion in percent?'),
              question: tx('150/2000 × 100', '150/2000 × 100', '150/2000 × 100'),
              hint: tx('7.5%', '7.5%'),
              explain: tx('Продукт считает конверсию как вероятность «пользователь купит».', 'Өнім конверсияны «пайдаланушы сатып алады» ықтималдығы деп санайды.', 'Product teams treat conversion as the probability a user buys.'),
              unit: pct,
              answer: n(7.5, 0.05),
            },
            {
              story: tx('На сколько процентных пунктов B лучше A? (A = 6%)', 'B, A-дан неше пайыздық тармақ жақсы? (A = 6%)', 'By how many percentage points is B better than A? (A = 6%)'),
              question: tx('7.5 − 6', '7.5 − 6', '7.5 − 6'),
              hint: tx('1.5', '1.5'),
              explain: tx('Лифт в пунктах решают катить в прод. Относительный рост был бы 1.5/6=25%.', 'Тармақпен лифт продқа шығаруды шешеді. Салыстырмалы өсу 1.5/6=25% болар еді.', 'Point lift decides a ship. Relative gain would be 1.5/6 = 25%.'),
              unit: pct,
              answer: n(1.5, 0.05),
            },
          ]),
          m('g12-scientist-bayes', 'scientist', ['Ложный плюс теста', 'Тесттің жалған плюсі', 'A false positive'], [
            {
              story: tx('Болезнь у 1% людей. Тест ловит всех больных, но 2% здоровых пугает (ложный плюс). Из 10000 человек сколько ложных плюсов?', 'Ауру 1%-да. Тест барлық науқасты ұстайды, бірақ саулардың 2%-ын қорқытады. 10000-нан неше жалған плюс?', 'Disease in 1%. Test catches all sick, but scares 2% of healthy (false plus). How many false pluses in 10000?'),
              question: tx('Здоровых 9900, 2% от них', 'Саулар 9900, олардың 2%-ы', '9900 healthy, 2% of them'),
              hint: tx('9900 × 0.02.', '9900 × 0.02.'),
              explain: tx('Даже точный тест тонет в ложных плюсах, если болезнь редкая. Это Байес в жизни.', 'Ауру сирек болса, дәл тест те жалған плюсте батады. Бұл өмірдегі Байес.', 'Even an accurate test drowns in false pluses when the disease is rare. That is Bayes in life.'),
              answer: n(198),
            },
            {
              story: tx('Больных 100, все с плюсом, плюс 198 ложных. Какова вероятность болезни при плюсе? 100/(100+198), в % с одним знаком', 'Науқас 100, бәрі плюс, плюс 198 жалған. Плюсте ауру ықтималдығы? 100/298, % бір таңба', '100 sick all plus, plus 198 false. P(disease|plus)=100/298, percent to 1 decimal'),
              question: tx('Около 33.6', 'Шамамен 33.6', 'About 33.6'),
              hint: tx('100/298 ≈ 0.336 → 33.6%', '100/298 ≈ 0.336 → 33.6%'),
              explain: tx('Врач не лечит один плюс: смотрит базовую частоту. Математика защищает от паники.', 'Дәрігер бір плюспен емдемейді: базалық жиілікті қарайды. Математика үрейден қорғайды.', 'Doctors do not treat a single plus: they watch the base rate. Math guards against panic.'),
              unit: pct,
              answer: n(33.6, 0.3),
            },
          ]),
        ],
      ),
      topic(
        'g12-opt',
        ['Оптимизация', 'Оңтайландыру', 'Optimization'],
        ['Логист и экономист ищут минимум затрат и максимум при ограничении.', 'Логист пен экономист шектеуде шығын минимумы мен максимумды іздейді.', 'Logisticians and economists hunt min cost and max under a constraint.'],
        [
          m('g12-logistics-route', 'logistics', ['Два склада', 'Екі қойма', 'Two warehouses'], [
            {
              story: tx('Доставка из A стоит 400 ₸/км, из B 250 ₸/км. Магазин в 30 км от A и 40 км от B. Что дешевле? Считай стоимость из B.', 'A-дан жеткізу 400 ₸/км, B-дан 250 ₸/км. Дүкен A-дан 30 км, B-дан 40 км. B құны қандай?', 'From A: 400 ₸/km, from B: 250 ₸/km. Shop 30 km from A, 40 km from B. Cost from B?'),
              question: tx('250 × 40', '250 × 40', '250 × 40'),
              hint: tx('Сравни потом с A: 400×30=12000.', 'Сосын A-мен салыстыр: 400×30=12000.'),
              explain: tx('Логист считает стоимость пути, не «какой склад ближе по километрам».', 'Логист «қай қойма км жақын» емес, жол құнын санайды.', 'Logisticians cost the path, not merely which warehouse is closer in km.'),
              unit: tenge,
              answer: n(10000),
            },
            {
              story: tx('Экономия против склада A (12000 ₸) в тенге?', 'A қоймасына (12000 ₸) қарсы үнем теңгемен?', 'Saving versus warehouse A (12000 ₸) in tenge?'),
              question: tx('12000 − 10000', '12000 − 10000', '12000 − 10000'),
              hint: tx('2000', '2000'),
              explain: tx('Оптимум — разница альтернатив. Ближе ≠ дешевле, если тариф другой.', 'Оңтайлы — балама айырмасы. Тариф басқа болса, жақынырақ ≠ арзан.', 'The optimum is the gap between alternatives. Closer ≠ cheaper if the rate differs.'),
              unit: tenge,
              answer: n(2000),
            },
          ]),
          m('g12-banker-budget', 'banker', ['Бюджет рекламы', 'Жарнама бюджеті', 'An ads budget'], [
            {
              story: tx('Прибыль P(x)= 40x − x², x — тысячи ₸ на рекламу. Максимум при P′=40−2x=0.', 'Пайда P(x)= 40x − x², x — жарнамаға мың ₸. Максимум P′=40−2x=0.', 'Profit P(x)= 40x − x², x — thousand ₸ on ads. Max when P′=40−2x=0.'),
              question: tx('Оптимальный x', 'Оңтайлы x', 'Optimal x'),
              hint: tx('2x=40, x=20.', '2x=40, x=20.'),
              explain: tx('Слишком большая реклама съедает прибыль. Производная находит потолок.', 'Тым үлкен жарнама пайданы жейді. Туынды төбесін табады.', 'Too much advertising eats profit. The derivative finds the ceiling.'),
              answer: n(20),
            },
            {
              story: tx('Прибыль P(20)= 40×20 − 400', 'Пайда P(20)= 40×20 − 400', 'Profit P(20)= 40×20 − 400'),
              question: tx('P(20)', 'P(20)', 'P(20)'),
              hint: tx('800 − 400.', '800 − 400.'),
              explain: tx('Это модельные «единицы прибыли». Экономист всегда проверяет значение в точке оптимума.', 'Бұл модельдік «пайда бірлігі». Экономист оңтайлы нүктедегі мәнді әрқашан тексереді.', 'These are model profit units. Economists always evaluate the function at the optimum.'),
              answer: n(400),
            },
          ]),
        ],
      ),
    ],
  },
]
