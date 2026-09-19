import type { Grade, Mission, Step, Topic } from '../types'
import { tx } from '../types'

const tenge = tx('₸', '₸', '₸')

function n(value: number, tolerance?: number): Step['answer'] {
  return { kind: 'number', value, ...(tolerance ? { tolerance } : {}) }
}

function m(id: string, profession: string, title: [string, string, string], steps: Step[], xp = 40): Mission {
  return { id, profession, title: tx(title[0], title[1], title[2]), xp, steps }
}

function topic(id: string, title: [string, string, string], blurb: [string, string, string], missions: Mission[]): Topic {
  return { id, title: tx(title[0], title[1], title[2]), blurb: tx(blurb[0], blurb[1], blurb[2]), missions }
}

export const GRADES_1_4: Grade[] = [
  {
    grade: 1,
    title: tx('Первый класс', 'Бірінші сынып', 'Grade 1'),
    world: tx('Базар чисел', 'Сан базары', 'Number bazaar'),
    color: '#e8a317',
    topics: [
      topic(
        'g1-count',
        ['Счёт вокруг нас', 'Айналадағы санау', 'Counting around us'],
        ['Считай товары, зверей и гостей — как кассир и хозяин юрты.', 'Тауар, аң мен қонақты сана — кассир мен киіз үй иесіндей.', 'Count goods, animals and guests like a cashier or a yurt host.'],
        [
          m('g1-vet-cats', 'vet', ['Сколько котят в клинике?', 'Клиникада неше котенке бар?', 'How many kittens at the clinic?'], [
            {
              story: tx('Ветеринар Айжан принимает котят: 4 рыжих и 3 серых.', 'Ветеринар Айжан котенкелерді қабылдайды: 4 жирен және 3 сұр.', 'Vet Aizhan is seeing kittens: 4 ginger and 3 grey.'),
              question: tx('Сколько всего котят нужно осмотреть?', 'Барлығы неше котенкені қарау керек?', 'How many kittens need a checkup in total?'),
              hint: tx('Сложи 4 и 3.', '4 пен 3-ті қос.', 'Add 4 and 3.'),
              explain: tx('Врачи считают пациентов, чтобы подготовить место и лекарства.', 'Дәрігерлер орын мен дәрі дайындау үшін науқастарды санайды.', 'Doctors count patients to prepare space and medicine.'),
              visual: { kind: 'items', emoji: '🐱', count: 7 },
              answer: n(7),
            },
            {
              story: tx('Двух котят уже забрали домой.', 'Екі котенкені үйге алып кетті.', 'Two kittens already went home.'),
              question: tx('Сколько котят осталось в клинике?', 'Клиникада неше котенке қалды?', 'How many kittens are still at the clinic?'),
              hint: tx('Из 7 вычти 2.', '7-ден 2-ні азайт.', 'Subtract 2 from 7.'),
              explain: tx('Так ветеринар понимает, сколько мисок и клеток ещё занято.', 'Ветеринар қанша ыдыс пен тор бос емес екенін солай біледі.', 'That is how a vet knows how many bowls and cages are still in use.'),
              visual: { kind: 'items', emoji: '🐱', count: 5 },
              answer: n(5),
            },
          ]),
          m('g1-florist-tulips', 'florist', ['Букет для Наурыза', 'Наурызға гүл шоғы', 'A Nauryz bouquet'], [
            {
              story: tx('Флорист собрала 6 тюльпанов и хочет добавить ещё 5.', 'Флорист 6 қызғалдақ жинады, тағы 5 қоспақ.', 'The florist has 6 tulips and wants to add 5 more.'),
              question: tx('Сколько тюльпанов будет в букете?', 'Гүл шоғында неше қызғалдақ болады?', 'How many tulips will be in the bouquet?'),
              hint: tx('6 + 5.', '6 + 5.'),
              explain: tx('Флористы считают цветы, чтобы букет получился пышным и цена была честной.', 'Флористер гүл шоғын пышным ету және бағаны әділ қою үшін гүлді санайды.', 'Florists count stems so the bouquet looks full and the price is fair.'),
              visual: { kind: 'items', emoji: '🌷', count: 11 },
              answer: n(11),
            },
            {
              story: tx('Клиент просит букет меньше: убрать 4 цветка.', 'Клиент шоқты кішірек қылсын деп 4 гүлді алуды өтінді.', 'The client wants a smaller bouquet: remove 4 flowers.'),
              question: tx('Сколько тюльпанов останется?', 'Неше қызғалдақ қалады?', 'How many tulips will remain?'),
              hint: tx('11 − 4.', '11 − 4.'),
              explain: tx('Счёт помогает быстро переделать заказ, не начиная букет заново.', 'Санау букетті басынан бастамай, тапсырысты тез өзгертуге көмектеседі.', 'Counting lets you change an order quickly without starting over.'),
              visual: { kind: 'items', emoji: '🌷', count: 7 },
              answer: n(7),
            },
          ]),
        ],
      ),
      topic(
        'g1-add',
        ['Сложение и вычитание', 'Қосу және азайту', 'Adding and subtracting'],
        ['Пекарня и зоопарк считают порции и зверей каждый день.', 'Наубайхана мен хайуанаттар бағы күн сайын үлес пен аңды санайды.', 'Bakeries and zoos count portions and animals every day.'],
        [
          m('g1-baker-baursak', 'baker', ['Бауырсақ к Наурызу', 'Наурызға бауырсақ', 'Baursak for Nauryz'], [
            {
              story: tx('Пекарь испек 9 бауырсаков утром и 8 вечером.', 'Наубайшы таңертең 9, кешке 8 бауырсақ пісірді.', 'The baker fried 9 baursak in the morning and 8 in the evening.'),
              question: tx('Сколько бауырсаков готово к празднику?', 'Мейрамға неше бауырсақ дайын?', 'How many baursak are ready for the holiday?'),
              hint: tx('9 + 8.', '9 + 8.'),
              explain: tx('На кухне складывают партии, чтобы хватило всем гостям.', 'Ас үйде қонақтарға жететіндей партияларды қосады.', 'Kitchens add batches so there is enough for every guest.'),
              visual: { kind: 'items', emoji: '🥯', count: 17 },
              answer: n(17),
            },
            {
              story: tx('Гости съели 10 бауырсаков.', 'Қонақтар 10 бауырсақ жеді.', 'Guests ate 10 baursak.'),
              question: tx('Сколько осталось на завтрак?', 'Таңғы асқа нешеуі қалды?', 'How many are left for breakfast?'),
              hint: tx('17 − 10.', '17 − 10.'),
              explain: tx('Вычитание показывает остаток продуктов — чтобы утром не испечь лишнего.', 'Азайту қалған өнімді көрсетеді — таңертең артығын пісірмеу үшін.', 'Subtraction shows leftovers so you do not cook extra in the morning.'),
              visual: { kind: 'items', emoji: '🥯', count: 7 },
              answer: n(7),
            },
          ]),
          m('g1-farmer-chicks', 'farmer', ['Цыплята на ферме', 'Фермадағы балапандар', 'Chicks on the farm'], [
            {
              story: tx('У фермера 12 цыплят. 5 ушли клевать зерно во двор.', 'Фермерде 12 балапан бар. 5-еуі аулаға дән шоқымақ.', 'A farmer has 12 chicks. 5 go out to peck grain.'),
              question: tx('Сколько цыплят осталось в сарае?', 'Сарайда неше балапан қалды?', 'How many chicks stayed in the barn?'),
              hint: tx('12 − 5.', '12 − 5.'),
              explain: tx('Фермер считает животных, чтобы никто не потерялся.', 'Фермер ешкім жоғалып кетпес үшін малды санайды.', 'Farmers count animals so nobody gets lost.'),
              visual: { kind: 'items', emoji: '🐥', count: 7 },
              answer: n(7),
            },
            {
              story: tx('Потом из инкубатора вылупились ещё 6 цыплят.', 'Содан инкубатордан тағы 6 балапан шықты.', 'Then 6 more chicks hatched from the incubator.'),
              question: tx('Сколько цыплят теперь в сарае?', 'Сарайда енді неше балапан бар?', 'How many chicks are in the barn now?'),
              hint: tx('7 + 6.', '7 + 6.'),
              explain: tx('Прибавление помогает планировать корм на всех.', 'Қосу барлығына жем жоспарлауға көмектеседі.', 'Adding helps plan feed for everyone.'),
              visual: { kind: 'items', emoji: '🐥', count: 13 },
              answer: n(13),
            },
          ]),
        ],
      ),
      topic(
        'g1-shapes',
        ['Фигуры в городе', 'Қаладағы пішіндер', 'Shapes in the city'],
        ['Окна, знаки и юрты — геометрия, которую видно на улице.', 'Терезе, белгі мен киіз үй — көшеде көрінетін геометрия.', 'Windows, signs and yurts are geometry you can see outside.'],
        [
          m('g1-architect-windows', 'architect', ['Окна нового дома', 'Жаңа үйдің терезелері', 'Windows of a new house'], [
            {
              story: tx('Архитектор рисует окно: все стороны равны, углов четыре.', 'Сәулетші терезе сызады: барлық қабырғасы тең, төрт бұрышы бар.', 'An architect draws a window: all sides equal, four corners.'),
              question: tx('Как называется эта фигура?', 'Бұл пішін қалай аталады?', 'What is this shape called?'),
              hint: tx('Похожа на плитку шоколада.', 'Шоколад плиткасына ұқсайды.', 'It looks like a chocolate square.'),
              explain: tx('Архитекторы называют фигуры, чтобы строители поняли чертёж.', 'Сәулетшілер құрылысшылар сызбаны түсінсін деп пішінді атайды.', 'Architects name shapes so builders can read the plan.'),
              visual: { kind: 'shapes', shapes: ['square'] },
              answer: {
                kind: 'choice',
                correct: 1,
                options: [
                  tx('Круг', 'Шеңбер', 'Circle'),
                  tx('Квадрат', 'Шаршы', 'Square'),
                  tx('Треугольник', 'Үшбұрыш', 'Triangle'),
                ],
              },
            },
            {
              story: tx('Дверь дома сверху закруглена, как солнце.', 'Үй есігінің үстіңгі жағы күндей дөңгелек.', 'The top of the door is rounded like the sun.'),
              question: tx('Какая фигура похожа на солнце и колесо юрты?', 'Күн мен киіз үй дөңгелегіне қандай пішін ұқсайды?', 'Which shape is like the sun and a yurt wheel?'),
              hint: tx('У неё нет углов.', 'Оның бұрышы жоқ.', 'It has no corners.'),
              explain: tx('Круг используют в куполах, колёсах и казахском шаныраке.', 'Шеңбер күмбез, дөңгелек және қазақтың шаңырағында қолданылады.', 'Circles appear in domes, wheels and the Kazakh shanyrak.'),
              visual: { kind: 'shapes', shapes: ['circle'] },
              answer: {
                kind: 'choice',
                correct: 0,
                options: [
                  tx('Круг', 'Шеңбер', 'Circle'),
                  tx('Квадрат', 'Шаршы', 'Square'),
                  tx('Прямоугольник', 'Тіктөртбұрыш', 'Rectangle'),
                ],
              },
            },
          ]),
          m('g1-designer-sign', 'designer', ['Дорожный знак', 'Жол белгісі', 'A road sign'], [
            {
              story: tx('Дизайнер рисует знак «осторожно»: три стороны и три угла.', 'Дизайнер «абайла» белгісін сызады: үш қабырға, үш бұрыш.', 'A designer draws a caution sign: three sides and three corners.'),
              question: tx('Это какая фигура?', 'Бұл қандай пішін?', 'What shape is that?'),
              hint: tx('На неё похож кусок пиццы, если смотреть на корочку.', 'Қабығынан қараса, пицца кесіндісіне ұқсайды.', 'A pizza slice looks like one if you watch the crust.'),
              explain: tx('Треугольник хорошо заметен — поэтому его ставят на предупреждающие знаки.', 'Үшбұрыш жақсы көрінеді — сондықтан ескерту белгілеріне қояды.', 'Triangles are easy to spot, so warning signs use them.'),
              visual: { kind: 'shapes', shapes: ['triangle'] },
              answer: {
                kind: 'choice',
                correct: 2,
                options: [
                  tx('Круг', 'Шеңбер', 'Circle'),
                  tx('Квадрат', 'Шаршы', 'Square'),
                  tx('Треугольник', 'Үшбұрыш', 'Triangle'),
                ],
              },
            },
            {
              story: tx('Рядом табличка-прямоугольник: 2 длинные стороны и 2 короткие.', 'Қасында тіктөртбұрыш тақта: 2 ұзын және 2 қысқа қабырға.', 'Next is a rectangle plate: 2 long sides and 2 short ones.'),
              question: tx('Сколько сторон у прямоугольника?', 'Тіктөртбұрыштың неше қабырғасы бар?', 'How many sides does a rectangle have?'),
              hint: tx('Посчитай стороны рамки картины.', 'Сурет жақтауынның қабырғасын сана.', 'Count the sides of a picture frame.'),
              explain: tx('Прямоугольники — двери, экраны, тетради. Стороны считают, чтобы вырезать материал.', 'Тіктөртбұрыш — есік, экран, дәптер. Материалды кесу үшін қабырғаны санайды.', 'Doors, screens and notebooks are rectangles. Counting sides helps cut material.'),
              visual: { kind: 'shapes', shapes: ['rect'] },
              answer: n(4),
            },
          ]),
        ],
      ),
      topic(
        'g1-money',
        ['Деньги: тенге', 'Ақша: теңге', 'Money: tenge'],
        ['Покупки в магазине — первая настоящая математика.', 'Дүкендегі сатып алу — алғашқы нағыз математика.', 'Shop purchases are the first real-world math.'],
        [
          m('g1-cashier-apple', 'cashier', ['Яблоки на базаре', 'Базардағы алма', 'Apples at the bazaar'], [
            {
              story: tx('Одно яблоко стоит 20 ₸. Ты берёшь 2 яблока.', 'Бір алма 20 ₸. Сен 2 алма аласың.', 'One apple costs 20 ₸. You take 2 apples.'),
              question: tx('Сколько тенге нужно заплатить?', 'Қанша теңге төлеу керек?', 'How many tenge should you pay?'),
              hint: tx('20 + 20 или 20 × 2.', '20 + 20 немесе 20 × 2.'),
              explain: tx('Кассир складывает цены, чтобы назвать сумму чека.', 'Кассир чек сомасын айту үшін бағаларды қосады.', 'A cashier adds prices to name the total.'),
              unit: tenge,
              visual: { kind: 'coins', count: 40 },
              answer: n(40),
            },
            {
              story: tx('Ты даёшь 50 ₸.', 'Сен 50 ₸ бересің.', 'You pay with 50 ₸.'),
              question: tx('Сколько сдачи вернут?', 'Қанша қайтарым береді?', 'How much change will you get?'),
              hint: tx('50 − 40.', '50 − 40.'),
              explain: tx('Сдача — это вычитание: деньги покупателя минус цена покупки.', 'Қайтарым — азайту: сатып алушының ақшасы минус баға.', 'Change is subtraction: money given minus the price.'),
              unit: tenge,
              visual: { kind: 'coins', count: 10 },
              answer: n(10),
            },
          ]),
          m('g1-seller-bread', 'seller', ['Лепёшка и молоко', 'Нан мен сүт', 'Bread and milk'], [
            {
              story: tx('Лепёшка 30 ₸, молоко 25 ₸.', 'Нан 30 ₸, сүт 25 ₸.', 'A flatbread is 30 ₸, milk is 25 ₸.'),
              question: tx('Сколько стоит покупка вместе?', 'Сатып алу бірге қанша тұрады?', 'What is the total cost?'),
              hint: tx('30 + 25.', '30 + 25.'),
              explain: tx('Продавец считает корзину целиком, а не каждый товар по отдельности в уме покупателя.', 'Сатушы себетті тұтас санайды.', 'A seller totals the whole basket, not each item in isolation.'),
              unit: tenge,
              answer: n(55),
            },
            {
              story: tx('У тебя купюра 100 ₸.', 'Сенде 100 ₸ купюра бар.', 'You have a 100 ₸ note.'),
              question: tx('Хватит ли денег? Сколько останется после покупки?', 'Ақша жете ме? Сатып алғаннан кейін қанша қалады?', 'Is it enough? How much will be left after buying?'),
              hint: tx('100 − 55.', '100 − 55.'),
              explain: tx('Перед кассой полезно прикинуть остаток — так учатся планировать карманные деньги.', 'Касса алдында қалдықты есептеу қалта ақшасын жоспарлауға үйретеді.', 'Estimating leftover money at the till teaches pocket-money planning.'),
              unit: tenge,
              answer: n(45),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 2,
    title: tx('Второй класс', 'Екінші сынып', 'Grade 2'),
    world: tx('Улица расписаний', 'Кесте көшесі', 'Timetable street'),
    color: '#2a9d8f',
    topics: [
      topic(
        'g2-hundred',
        ['Счёт до ста', 'Жүзге дейін санау', 'Counting to 100'],
        ['Курьер и склад считают коробки пачками.', 'Курьер мен қойма қорапты бумамен санайды.', 'Couriers and warehouses count boxes in packs.'],
        [
          m('g2-courier-boxes', 'courier', ['Доставка по Алматы', 'Алматы бойынша жеткізу', 'Delivery across Almaty'], [
            {
              story: tx('Курьер загрузил 36 коробок утром и 27 после обеда.', 'Курьер таңертең 36, түстен кейін 27 қорап тиеді.', 'A courier loaded 36 boxes in the morning and 27 after lunch.'),
              question: tx('Сколько коробок он вёз за день?', 'Ол күніне неше қорап тасыды?', 'How many boxes did he carry that day?'),
              hint: tx('36 + 27. Сложи десятки, потом единицы.', '36 + 27. Ондықты, сосын бірлікті қос.', '36 + 27. Add tens, then ones.'),
              explain: tx('Курьер считает посылки, чтобы машина не оказалась перегружена.', 'Курьер көлік артық тиелмесін деп жөнелтілімді санайды.', 'Couriers count parcels so the van is not overloaded.'),
              answer: n(63),
            },
            {
              story: tx('19 коробок уже вручили получателям.', '19 қорап алушыларға берілді.', '19 boxes were already delivered.'),
              question: tx('Сколько ещё осталось развезти?', 'Әлі нешеуін тарату керек?', 'How many are left to deliver?'),
              hint: tx('63 − 19.', '63 − 19.'),
              explain: tx('Вычитание — это «сколько работы осталось до конца смены».', 'Азайту — «ауысым соңына дейін қанша жұмыс қалды».', 'Subtraction is “how much work is left before the shift ends”.'),
              answer: n(44),
            },
          ]),
          m('g2-farmer-eggs', 'farmer', ['Яйца на рынке', 'Нарықтағы жұмыртқа', 'Eggs at the market'], [
            {
              story: tx('Фермер собрал 48 яиц. Продал 2 десятка.', 'Фермер 48 жұмыртқа жинады. 2 ондық сатты.', 'A farmer collected 48 eggs and sold 2 tens.'),
              question: tx('Сколько яиц продано? А сколько осталось?', 'Неше жұмыртқа сатылды? Қаншасы қалды?', 'How many eggs were sold? How many remain? Write what remains.'),
              hint: tx('2 десятка = 20. Затем 48 − 20.', '2 ондық = 20. Сосын 48 − 20.', '2 tens = 20. Then 48 − 20.'),
              explain: tx('На рынке десятками считают яйца, салфетки, ручки.', 'Нарықта жұмыртқа, майлық, қаламды ондықпен санайды.', 'Markets count eggs, napkins and pens in tens.'),
              answer: n(28),
            },
            {
              story: tx('Соседка купила ещё 15 яиц.', 'Көрші тағы 15 жұмыртқа алды.', 'A neighbor bought 15 more eggs.'),
              question: tx('Сколько яиц осталось у фермера?', 'Фермерде неше жұмыртқа қалды?', 'How many eggs does the farmer have left?'),
              hint: tx('28 − 15.', '28 − 15.'),
              explain: tx('Остаток товара помогает решить, нести ли ещё лотки с фермы.', 'Қалған тауар фермадан тағы науа әкелу керектігін шешуге көмектеседі.', 'Leftover stock tells you whether to bring more trays from the farm.'),
              answer: n(13),
            },
          ]),
        ],
      ),
      topic(
        'g2-mul',
        ['Умножение в упаковке', 'Қаптамадағы көбейту', 'Multiplication in packing'],
        ['Одинаковые пачки удобнее умножать, чем складывать по одному.', 'Бірдей буманы бір-бірден қосқаннан көбейткен оңай.', 'Equal packs are faster to multiply than to add one by one.'],
        [
          m('g2-baker-packs', 'baker', ['Коробки с печеньем', 'Печенье қораптары', 'Cookie boxes'], [
            {
              story: tx('В каждой коробке 6 печений. Пекарь заполнил 4 коробки.', 'Әр қорапта 6 печенье. Наубайшы 4 қорап толтырды.', 'Each box holds 6 cookies. The baker filled 4 boxes.'),
              question: tx('Сколько печений упаковано?', 'Неше печенье қапталды?', 'How many cookies are packed?'),
              hint: tx('6 × 4 или 6+6+6+6.', '6 × 4 немесе 6+6+6+6.'),
              explain: tx('Умножение — быстрый счёт одинаковых групп. Так работают пекарни и заводы.', 'Көбейту — бірдей топты тез санау. Наубайхана мен зауыт солай істейді.', 'Multiplication is fast counting of equal groups. Bakeries and factories use it.'),
              visual: { kind: 'items', emoji: '🍪', count: 24 },
              answer: n(24),
            },
            {
              story: tx('Ещё 3 такие же коробки уехали в магазин.', 'Тағы 3 дәл сондай қорап дүкенге кетті.', '3 more identical boxes went to the shop.'),
              question: tx('Сколько печений уехало в магазин?', 'Дүкенге неше печенье кетті?', 'How many cookies went to the shop?'),
              hint: tx('6 × 3.', '6 × 3.'),
              explain: tx('Накладная курьера почти всегда «число коробок × штук в коробке».', 'Курьер жүкқұжаты әрдайым дерлік «қорап саны × қораптағы дана».', 'A courier slip is almost always “boxes × items per box”.'),
              answer: n(18),
            },
          ]),
          m('g2-gardener-rows', 'gardener', ['Грядки с морковью', 'Сәбіз қатарлары', 'Carrot rows'], [
            {
              story: tx('В каждом ряду 8 морковок, рядов 5.', 'Әр қатарда 8 сәбіз, 5 қатар бар.', 'Each row has 8 carrots, and there are 5 rows.'),
              question: tx('Сколько морковок посадил садовник?', 'Бағбан неше сәбіз отырғызды?', 'How many carrots did the gardener plant?'),
              hint: tx('8 × 5.', '8 × 5.'),
              explain: tx('Грядки — живая таблица умножения: ряды и лунки.', 'Қатар — тірі көбейту кестесі: жол мен ұя.', 'Garden beds are a living times table: rows and holes.'),
              answer: n(40),
            },
            {
              story: tx('Кролики съели 1 целый ряд.', 'Қояндар 1 бүтін қатарды жеді.', 'Rabbits ate 1 whole row.'),
              question: tx('Сколько морковок осталось?', 'Неше сәбіз қалды?', 'How many carrots remain?'),
              hint: tx('40 − 8.', '40 − 8.'),
              explain: tx('Если группа одинаковая, вычитают сразу пачку, а не по одной морковке.', 'Топ бірдей болса, бір-бірден емес, бумамен азайтады.', 'When groups are equal, you subtract a pack, not one carrot at a time.'),
              answer: n(32),
            },
          ]),
        ],
      ),
      topic(
        'g2-time',
        ['Время и расписание', 'Уақыт пен кесте', 'Time and schedules'],
        ['Врач, поезд и уроки живут по часам.', 'Дәрігер, пойыз бен сабақ сағатпен жүреді.', 'Doctors, trains and lessons live by the clock.'],
        [
          m('g2-doctor-queue', 'doctor', ['Приём у врача', 'Дәрігер қабылдауы', 'A doctor’s appointment'], [
            {
              story: tx('Приём начинается в 9:00. Каждый пациент — 15 минут. Ты третий в очереди.', 'Қабылдау 9:00-де басталады. Әр науқас — 15 минут. Сен кезекте үшіншісің.', 'Clinic starts at 9:00. Each patient takes 15 minutes. You are third in line.'),
              question: tx('Во сколько тебя пригласят? Напиши час и минуты как 945 если это 9:45.', 'Сені қайда шақырады? 9:45 болса 945 деп жаз.', 'What time will you be seen? Write 945 if it is 9:45.'),
              hint: tx('Перед тобой двое: 15+15 минут.', 'Алдыңда екеу: 15+15 минут.', 'Two people before you: 15+15 minutes.'),
              explain: tx('Поликлиника считает очередь умножением длительности приёма.', 'Емхана қабылдау ұзақтығын көбейтіп кезекті санайды.', 'Clinics multiply appointment length to run a queue.'),
              answer: n(930),
            },
            {
              story: tx('Врач задержался на 10 минут.', 'Дәрігер 10 минут кешікті.', 'The doctor is 10 minutes late.'),
              question: tx('Новое время твоего приёма (запиши как 940 для 9:40).', 'Қабылдауыңның жаңа уақыты (9:40 үшін 940 жаз).', 'Your new time (write 940 for 9:40).'),
              hint: tx('9:30 + 10 минут.', '9:30 + 10 минут.'),
              explain: tx('Сдвиги по времени — обычное дело. Их считают сложением минут.', 'Уақыт жылжуы жиі болады. Оны минутты қосып санайды.', 'Time shifts happen a lot. You add minutes to handle them.'),
              answer: n(940),
            },
          ]),
          m('g2-driver-bus', 'driver', ['Автобус до школы', 'Мектепке автобус', 'The school bus'], [
            {
              story: tx('Автобус едет 25 минут. Ты сел в 7:40.', 'Автобус 25 минут жүреді. Сен 7:40-та отырдың.', 'The bus ride is 25 minutes. You boarded at 7:40.'),
              question: tx('Во сколько прибудешь? Запиши 805 если это 8:05.', 'Қашан жетесің? 8:05 болса 805 жаз.', 'When do you arrive? Write 805 if it is 8:05.'),
              hint: tx('40 + 25 = 65 минут → это 1 час и 5 минут.', '40 + 25 = 65 минут → 1 сағат 5 минут.', '40 + 25 = 65 minutes → 1 hour and 5 minutes.'),
              explain: tx('Водители и пассажиры переводят лишние 60 минут в следующий час.', 'Жүргізуші мен жолаушы артық 60 минутты келесі сағатқа ауыстырады.', 'Drivers and riders roll extra 60 minutes into the next hour.'),
              answer: n(805),
            },
            {
              story: tx('Урок начинается в 8:30. Ты уже на месте в 8:05.', 'Сабақ 8:30-да басталады. Сен 8:05-те орнындасың.', 'Class starts at 8:30. You arrive at 8:05.'),
              question: tx('Сколько минут ты успеешь подготовиться?', 'Дайындалуға неше минутың бар?', 'How many minutes do you have to get ready?'),
              hint: tx('От 8:05 до 8:30.', '8:05-тен 8:30-ға дейін.'),
              explain: tx('Запас времени считают вычитанием — так не опаздывают на уроки и поезда.', 'Уақыт қорын азайтумен санайды — сабақ пен пойыздан қалмау үшін.', 'Spare time is subtraction — that is how people catch lessons and trains.'),
              answer: n(25),
            },
          ]),
        ],
      ),
      topic(
        'g2-measure',
        ['Измерения', 'Өлшемдер', 'Measurements'],
        ['Портной и курьер меряют сантиметры и метры.', 'Тігінші мен курьер сантиметр мен метрді өлшейді.', 'Tailors and couriers measure centimetres and metres.'],
        [
          m('g2-tailor-sleeve', 'tailor', ['Рукав пальто', 'Пальто жеңі', 'A coat sleeve'], [
            {
              story: tx('Портной отрезал рукав 40 см, но он длинный на 8 см.', 'Тігінші 40 см жең кесті, бірақ ол 8 см ұзын.', 'A tailor cut a 40 cm sleeve, but it is 8 cm too long.'),
              question: tx('Какой длины должен быть рукав?', 'Жең қандай ұзындықта болуға тиіс?', 'How long should the sleeve be?'),
              hint: tx('40 − 8.', '40 − 8.'),
              explain: tx('Портные вычитают лишнее, а не угадывают «на глаз».', 'Тігіншілер артығын азайтады, «көзбен» болжамайды.', 'Tailors subtract the extra length instead of guessing by eye.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(32),
            },
            {
              story: tx('Нужны два одинаковых рукава.', 'Екі бірдей жең керек.', 'Two matching sleeves are needed.'),
              question: tx('Сколько сантиметров ткани уйдёт на оба рукава?', 'Екі жеңге неше сантиметр мата кетеді?', 'How many centimetres of fabric for both sleeves?'),
              hint: tx('32 × 2.', '32 × 2.'),
              explain: tx('Парные детали всегда умножают на 2: рукава, карманы, штанины.', 'Жұп бөлшек әрқашан 2-ге көбейтіледі: жең, қалта, балтыр.', 'Paired pieces are always times two: sleeves, pockets, trouser legs.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(64),
            },
          ]),
          m('g2-courier-ribbon', 'courier', ['Лента на подарок', 'Сыйлық лентасы', 'Gift ribbon'], [
            {
              story: tx('Для банта нужно 1 м ленты, а для обвязки коробки ещё 70 см.', 'Бантке 1 м лента, қорапты байлауға тағы 70 см керек.', 'A bow needs 1 m of ribbon, plus 70 cm to wrap the box.'),
              question: tx('Сколько всего сантиметров ленты нужно? (1 м = 100 см)', 'Барлығы неше сантиметр лента керек?', 'How many centimetres of ribbon in total? (1 m = 100 cm)'),
              hint: tx('100 + 70.', '100 + 70.'),
              explain: tx('Курьеры и оформители переводят метры в сантиметры, чтобы не ошибиться в отрезе.', 'Курьер мен безендіруші кесуде қателеспеу үшін метрді сантиметрге айналдырады.', 'Couriers and gift wrappers convert metres to centimetres so cuts are exact.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(170),
            },
            {
              story: tx('В катушке 2 метра ленты.', 'Катушкада 2 метр лента бар.', 'The spool has 2 metres of ribbon.'),
              question: tx('Сколько сантиметров останется после одного подарка?', 'Бір сыйлықтан кейін неше сантиметр қалады?', 'How many centimetres will be left after one gift?'),
              hint: tx('200 − 170.', '200 − 170.'),
              explain: tx('Остаток материала считают заранее — иначе бант оборвётся на середине.', 'Материал қалдығын алдын ала санайды — әйтпесе бант ортасынан үзіледі.', 'You count leftover material first, or the bow runs out halfway.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(30),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 3,
    title: tx('Третий класс', 'Үшінші сынып', 'Grade 3'),
    world: tx('Ферма долей', 'Үлес фермасы', 'Fraction farm'),
    color: '#c44536',
    topics: [
      topic(
        'g3-muldiv',
        ['Умножение и деление', 'Көбейту және бөлу', 'Multiply and divide'],
        ['Ферма и типография делят урожай и листы на равные пачки.', 'Ферма мен баспахана өнім мен парақты тең бумаға бөледі.', 'Farms and print shops split harvests and sheets into equal packs.'],
        [
          m('g3-farmer-apples', 'farmer', ['Ящики яблок', 'Алма жәшіктері', 'Crates of apples'], [
            {
              story: tx('Фермер собрал 56 яблок и раскладывает по 7 в ящик.', 'Фермер 56 алма жинап, жәшікке 7-ден салады.', 'A farmer picked 56 apples and puts 7 in each crate.'),
              question: tx('Сколько ящиков получится?', 'Неше жәшік шығады?', 'How many crates will there be?'),
              hint: tx('56 ÷ 7.', '56 ÷ 7.'),
              explain: tx('Деление отвечает: «на сколько равных групп хватит». Это язык склада.', 'Бөлу: «қанша тең топқа жетеді». Бұл қойма тілі.', 'Division asks “how many equal groups”. That is warehouse language.'),
              answer: n(8),
            },
            {
              story: tx('В магазин увезли 5 ящиков.', 'Дүкенге 5 жәшік апарылды.', '5 crates went to the shop.'),
              question: tx('Сколько яблок уехало?', 'Неше алма кетті?', 'How many apples left?'),
              hint: tx('5 × 7.', '5 × 7.'),
              explain: tx('Накладная снова: ящики × штук в ящике.', 'Жүкқұжат тағы: жәшік × жәшіктегі дана.', 'The delivery note is crates × apples per crate again.'),
              answer: n(35),
            },
          ]),
          m('g3-coder-stickers', 'coder', ['Наклейки для игры', 'Ойын стикерлері', 'Game stickers'], [
            {
              story: tx('Геймдизайнер печатает 9 листов по 12 наклеек.', 'Геймдизайнер 9 парақ басады, әрқайсысында 12 стикер.', 'A game designer prints 9 sheets of 12 stickers.'),
              question: tx('Сколько наклеек всего?', 'Барлығы неше стикер?', 'How many stickers in total?'),
              hint: tx('9 × 12.', '9 × 12.'),
              explain: tx('Тираж считают умножением: листы × объектов на листе.', 'Таралымды көбейтумен санайды: парақ × парақтағы нысан.', 'Print runs are sheets × items per sheet.'),
              answer: n(108),
            },
            {
              story: tx('Наклейки раздают командам по 6 штук.', 'Стикерлерді командаға 6-дан үлестіреді.', 'Stickers are shared with teams, 6 each.'),
              question: tx('На сколько команд хватит?', 'Қанша командаға жетеді?', 'How many teams can get a set?'),
              hint: tx('108 ÷ 6.', '108 ÷ 6.'),
              explain: tx('Равные наборы для команд — классическое деление на части.', 'Командаға тең жиын — классикалық бөлу.', 'Equal team kits are classic division into parts.'),
              answer: n(18),
            },
          ]),
        ],
      ),
      topic(
        'g3-frac',
        ['Доли и пицца', 'Үлес пен пицца', 'Fractions and pizza'],
        ['Повар режет целое на равные куски — так рождаются дроби.', 'Аспаз бүтінді тең кесекке бөледі — бөлшек солай туады.', 'Chefs cut a whole into equal slices — that is how fractions begin.'],
        [
          m('g3-chef-pizza', 'chef', ['Пицца на компанию', 'Серіктестікке пицца', 'Pizza for the crew'], [
            {
              story: tx('Пиццу разрезали на 8 равных кусков. Съели 3.', 'Пиццаны 8 тең кесекке бөлді. 3-еуін жеді.', 'A pizza is cut into 8 equal slices. 3 are eaten.'),
              question: tx('Какая доля пиццы съедена? Ответь как десятичную: 3/8 = 0.375', 'Пиццаның қандай үлесі желінді? 3/8 = 0.375 деп жаз', 'What fraction was eaten? Write 3/8 as 0.375'),
              hint: tx('Съеденное делят на все куски.', 'Желінгенді барлық кесекке бөледі.', 'Divide eaten slices by all slices.'),
              explain: tx('Дробь — «сколько частей из равных». Ресторан так считает порции.', 'Бөлшек — «тең бөліктердің қаншасы». Мейрамхана порцияны солай санайды.', 'A fraction is “how many of the equal parts”. Restaurants portion that way.'),
              answer: n(0.375, 0.01),
            },
            {
              story: tx('Осталось 5 кусков из 8.', '8-дің 5 кесегі қалды.', '5 of 8 slices remain.'),
              question: tx('Сколько кусков осталось? (просто число кусков)', 'Неше кесек қалды?', 'How many slices are left?'),
              hint: tx('8 − 3.', '8 − 3.'),
              explain: tx('Сначала считают штуки, потом переводят в доли — так меньше путаницы на кухне.', 'Алдымен дананы, сосын үлесті санайды — ас үйде шатасу аз болады.', 'Count pieces first, then convert to fractions — kitchens stay clearer.'),
              answer: n(5),
            },
          ]),
          m('g3-chef-chocolate', 'chef', ['Шоколад для торта', 'Тортқа шоколад', 'Chocolate for a cake'], [
            {
              story: tx('Плитка из 12 долек. Для глазури нужна 1/3 плитки.', 'Плиткада 12 бөлік. Глазурьге плитканың 1/3 бөлігі керек.', 'A bar has 12 squares. Icing needs 1/3 of the bar.'),
              question: tx('Сколько долек растопить?', 'Неше бөлікті еріту керек?', 'How many squares should melt?'),
              hint: tx('12 ÷ 3.', '12 ÷ 3.'),
              explain: tx('1/3 от 12 — это 12 разделить на 3. Рецепты часто пишут долями.', '12-нің 1/3-і — 12-ні 3-ке бөлу. Рецепт жиі үлеспен жазылады.', 'One third of 12 is 12 ÷ 3. Recipes often use fractions.'),
              answer: n(4),
            },
            {
              story: tx('Потом добавили ещё 1/4 плитки.', 'Сосын плитканың тағы 1/4-ін қосты.', 'Then they added another 1/4 of the bar.'),
              question: tx('Сколько долек добавили ещё?', 'Тағы неше бөлік қосылды?', 'How many extra squares were added?'),
              hint: tx('12 ÷ 4.', '12 ÷ 4.'),
              explain: tx('Четверть плитки кондитеры отламывают, не взвешивая каждый раз.', 'Кондитерлер төрттен бір плитканы әр жолы өлшемей сындырады.', 'Pastry chefs snap off a quarter bar without weighing every time.'),
              answer: n(3),
            },
          ]),
        ],
      ),
      topic(
        'g3-peri',
        ['Периметр', 'Периметр', 'Perimeter'],
        ['Забор, рамка и кант ткани — это сумма всех сторон.', 'Қоршау, жақтау және мата жиегі — барлық қабырғаның қосындысы.', 'A fence, a frame and fabric trim are the sum of all sides.'],
        [
          m('g3-gardener-fence', 'gardener', ['Забор школьного сада', 'Мектеп бағының қоршауы', 'School garden fence'], [
            {
              story: tx('Грядка 6 м в длину и 4 м в ширину. Нужен забор вокруг.', 'Қатар 6 м ұзын, 4 м енді. Айналасына қоршау керек.', 'A bed is 6 m long and 4 m wide. It needs a fence around it.'),
              question: tx('Какой длины забор? Периметр прямоугольника.', 'Қоршау қандай ұзындықта? Тіктөртбұрыш периметрі.', 'How long is the fence? Rectangle perimeter.'),
              hint: tx('(6 + 4) × 2.', '(6 + 4) × 2.'),
              explain: tx('Периметр — путь вдоль края. Садовник покупает сетку по периметру, не по площади.', 'Периметр — жиек бойымен жол. Бағбан торды аудан бойынша емес, периметр бойынша алады.', 'Perimeter is the walk around the edge. Gardeners buy mesh by perimeter, not area.'),
              unit: tx('м', 'м', 'm'),
              answer: n(20),
            },
            {
              story: tx('Ворота займут 2 м забора.', 'Қақпа қоршаудың 2 м алады.', 'A gate will take 2 m of the fence.'),
              question: tx('Сколько метров сетки покупать?', 'Неше метр тор алу керек?', 'How many metres of mesh to buy?'),
              hint: tx('20 − 2.', '20 − 2.'),
              explain: tx('Проёмы вычитают, иначе останется лишняя сетка.', 'Ойықтарды азайтады, әйтпесе тор артылып қалады.', 'Openings are subtracted so you do not buy extra mesh.'),
              unit: tx('м', 'м', 'm'),
              answer: n(18),
            },
          ]),
          m('g3-designer-frame', 'designer', ['Рамка для плаката', 'Плакат жақтауы', 'A poster frame'], [
            {
              story: tx('Плакат квадратный, сторона 30 см. Рамка идёт по краю.', 'Плакат шаршы, қабырғасы 30 см. Жақтау жиекпен жүреді.', 'The poster is a square, side 30 cm. The frame follows the edge.'),
              question: tx('Какой длины нужен багет?', 'Багет қандай ұзындықта керек?', 'How long should the moulding be?'),
              hint: tx('30 × 4.', '30 × 4.'),
              explain: tx('У квадрата все стороны равны — периметр это 4 стороны.', 'Шаршының барлық қабырғасы тең — периметр 4 қабырға.', 'A square has equal sides, so perimeter is 4 sides.'),
              unit: tx('см', 'см', 'cm'),
              answer: n(120),
            },
            {
              story: tx('Багет продают по 50 см.', 'Багет 50 см-ден сатылады.', 'Moulding is sold in 50 cm pieces.'),
              question: tx('Сколько кусков купить, чтобы хватило? (округли вверх)', 'Жету үшін неше кесінді алу керек? (жоғарыға дөңгелекте)', 'How many pieces to buy? (round up)'),
              hint: tx('120 ÷ 50 = 2.4 → берут 3.', '120 ÷ 50 = 2.4 → 3 алады.', '120 ÷ 50 = 2.4 → buy 3.'),
              explain: tx('В мастерской всегда округляют покупку вверх, иначе рамка не сомкнётся.', 'Шеберханада сатып алуды әрқашан жоғарыға дөңгелектейді, әйтпесе жақтау жабылмайды.', 'Workshops always round purchases up, or the frame will not close.'),
              answer: n(3),
            },
          ]),
        ],
      ),
      topic(
        'g3-mass',
        ['Масса и порции', 'Масса мен үлес', 'Mass and portions'],
        ['Повар взвешивает, аптека считает миллиграммы как порции.', 'Аспаз өлшейді, дәріхана миллиграмды үлес деп санайды.', 'Chefs weigh food; pharmacies treat milligrams as portions.'],
        [
          m('g3-chef-plov', 'chef', ['Плов на гостей', 'Қонаққа палау', 'Plov for guests'], [
            {
              story: tx('На одну порцию плова нужно 80 г риса. Гостей 6.', 'Бір порция палаға 80 г күріш керек. Қонақ — 6.', 'One portion of plov needs 80 g of rice. There are 6 guests.'),
              question: tx('Сколько граммов риса взять?', 'Неше грамм күріш алу керек?', 'How many grams of rice to take?'),
              hint: tx('80 × 6.', '80 × 6.'),
              explain: tx('Рецепт масштабируют умножением на число тарелок.', 'Рецептті тәрелке санына көбейтіп үлкейтеді.', 'Recipes scale by multiplying by the number of plates.'),
              unit: tx('г', 'г', 'g'),
              answer: n(480),
            },
            {
              story: tx('В пакете 1 кг риса (1000 г).', 'Пакетте 1 кг күріш (1000 г).', 'The bag holds 1 kg of rice (1000 g).'),
              question: tx('Сколько граммов останется?', 'Неше грамм қалады?', 'How many grams will remain?'),
              hint: tx('1000 − 480.', '1000 − 480.'),
              explain: tx('Остаток продукта считают, чтобы понять, хватит ли на завтра.', 'Өнім қалдығын ертеңге жететінін білу үшін санайды.', 'Leftover ingredients tell you if tomorrow’s meal is covered.'),
              unit: tx('г', 'г', 'g'),
              answer: n(520),
            },
          ]),
          m('g3-pharma-syrup', 'pharma', ['Сироп в аптеке', 'Дәріханадағы сироп', 'Pharmacy syrup'], [
            {
              story: tx('В ложке 5 мл сиропа. Врач выписал 4 ложки в день.', 'Қасықта 5 мл сироп. Дәрігер күніне 4 қасық жазып берді.', 'A spoon holds 5 ml of syrup. The doctor prescribed 4 spoons a day.'),
              question: tx('Сколько миллилитров в день?', 'Күніне неше миллилитр?', 'How many millilitres per day?'),
              hint: tx('5 × 4.', '5 × 4.'),
              explain: tx('Фармацевт переводит «ложки» в миллилитры — так нельзя перепутать дозу.', 'Фармацевт «қасықты» миллилитрге аударады — доза шатаспайды.', 'Pharmacists convert spoons into millilitres so the dose cannot be mixed up.'),
              unit: tx('мл', 'мл', 'ml'),
              answer: n(20),
            },
            {
              story: tx('Курс — 5 дней.', 'Курс — 5 күн.', 'The course lasts 5 days.'),
              question: tx('Какой пузырёк купить по объёму (мл)?', 'Көлемі бойынша қандай құты алу керек (мл)?', 'What bottle volume (ml) should you buy?'),
              hint: tx('20 × 5.', '20 × 5.'),
              explain: tx('Аптека подбирает флакон, чтобы лекарства хватило на весь курс.', 'Дәріхана дәрі бүкіл курсқа жетсін деп құты таңдайды.', 'A pharmacy picks a bottle that lasts the whole course.'),
              unit: tx('мл', 'мл', 'ml'),
              answer: n(100),
            },
          ]),
        ],
      ),
    ],
  },
  {
    grade: 4,
    title: tx('Четвёртый класс', 'Төртінші сынып', 'Grade 4'),
    world: tx('Склад больших чисел', 'Үлкен сан қоймасы', 'Warehouse of big numbers'),
    color: '#7b6cf6',
    topics: [
      topic(
        'g4-big',
        ['Большие числа', 'Үлкен сандар', 'Big numbers'],
        ['Склад и касса считают тысячами — без паники.', 'Қойма мен касса мыңдап санайды — үрейсіз.', 'Warehouses and tills count in thousands without panic.'],
        [
          m('g4-logistics-stock', 'logistics', ['Склад маркетплейса', 'Маркетплейс қоймасы', 'Marketplace warehouse'], [
            {
              story: tx('На складе 1250 футболок. Приехала фура ещё с 860.', 'Қоймада 1250 футболка. Фура тағы 860 әкелді.', 'The warehouse has 1250 T-shirts. A truck brings 860 more.'),
              question: tx('Сколько футболок теперь?', 'Енді неше футболка бар?', 'How many T-shirts now?'),
              hint: tx('1250 + 860.', '1250 + 860.'),
              explain: tx('Логисты каждый день складывают поступления с остатком.', 'Логистер күн сайын кірісті қалдықпен қосады.', 'Logisticians add incoming stock to what is already on hand.'),
              answer: n(2110),
            },
            {
              story: tx('За неделю продали 940 футболок.', 'Аптада 940 футболка сатылды.', '940 T-shirts sold this week.'),
              question: tx('Сколько осталось на складе?', 'Қоймада нешеуі қалды?', 'How many remain in stock?'),
              hint: tx('2110 − 940.', '2110 − 940.'),
              explain: tx('Остаток решают, пора ли заказывать новую партию.', 'Қалдық жаңа партияға тапсырыс беру керек пе, соны шешеді.', 'The remainder decides whether to order a new batch.'),
              answer: n(1170),
            },
          ]),
          m('g4-banker-cash', 'banker', ['Инкассация', 'Инкассация', 'Cash collection'], [
            {
              story: tx('В кассе 3 пачки по 5000 ₸ и ещё 2500 ₸ монетами.', 'Кассада 5000 ₸-ден 3 бума және тағы 2500 ₸ тиын.', 'The till has 3 packs of 5000 ₸ plus 2500 ₸ in coins.'),
              question: tx('Сколько всего тенге?', 'Барлығы қанша теңге?', 'How many tenge in total?'),
              hint: tx('3 × 5000, затем прибавь 2500.', '3 × 5000, сосын 2500 қос.', '3 × 5000, then add 2500.'),
              explain: tx('Банк считает пачками, потом добавляет россыпь — так быстрее и меньше ошибок.', 'Банк бумамен санап, сосын ұсақты қосады — тезірек әрі қате аз.', 'Banks count packs first, then loose cash — faster and safer.'),
              unit: tenge,
              answer: n(17500),
            },
            {
              story: tx('Инкассатор забрал 10000 ₸.', 'Инкассатор 10000 ₸ әкетті.', 'A collector took 10000 ₸.'),
              question: tx('Сколько осталось в кассе?', 'Кассада қанша қалды?', 'How much is left in the till?'),
              hint: tx('17500 − 10000.', '17500 − 10000.'),
              explain: tx('Каждый вывоз наличных — вычитание. Остаток сверяют с чеком.', 'Әр ақшаны әкету — азайту. Қалдықты чекпен салыстырады.', 'Every cash pickup is subtraction. The remainder is checked against the slip.'),
              unit: tenge,
              answer: n(7500),
            },
          ]),
        ],
      ),
      topic(
        'g4-frac',
        ['Дроби в рецептах', 'Рецепттегі бөлшектер', 'Fractions in recipes'],
        ['Удвоить торт или отмерить 3/4 стакана — работа кондитера.', 'Тортты екі еселеу немесе 3/4 стакан өлшеу — кондитер жұмысы.', 'Doubling a cake or measuring 3/4 cup is pastry-chef work.'],
        [
          m('g4-chef-dough', 'chef', ['Тесто на бауырсак', 'Бауырсаққа қамыр', 'Dough for baursak'], [
            {
              story: tx('В рецепте 3/4 стакана молока. Гостей вдвое больше — рецепт ×2.', 'Рецептте 3/4 стакан сүт. Қонақ екі есе көп — рецепт ×2.', 'The recipe uses 3/4 cup of milk. Twice as many guests — double the recipe.'),
              question: tx('Сколько стаканов молока нужно? (3/4 × 2)', 'Неше стакан сүт керек?', 'How many cups of milk? (3/4 × 2)'),
              hint: tx('3/4 × 2 = 6/4 = 1.5', '3/4 × 2 = 6/4 = 1.5'),
              explain: tx('Умножение дроби на целое — как увеличить порцию.', 'Бөлшекті бүтінге көбейту — үлесті үлкейту.', 'Multiplying a fraction by a whole number scales a portion.'),
              answer: n(1.5, 0.01),
            },
            {
              story: tx('Муки было 2 стакана. Использовали 5/4 стакана.', 'Ұн 2 стакан еді. 5/4 стакан жұмсалды.', 'There were 2 cups of flour. 5/4 cups were used.'),
              question: tx('Сколько стаканов муки осталось? (2 − 1.25)', 'Неше стакан ұн қалды?', 'How many cups of flour remain? (2 − 1.25)'),
              hint: tx('2 = 8/4, 8/4 − 5/4 = 3/4 = 0.75', '2 = 8/4, 8/4 − 5/4 = 3/4 = 0.75'),
              explain: tx('Вычитание дробей с общим знаменателем — ежедневная кухня.', 'Ортақ бөлімді бөлшекті азайту — күнделікті ас үй.', 'Subtracting fractions with a common denominator happens every day in a kitchen.'),
              answer: n(0.75, 0.01),
            },
          ]),
          m('g4-barista-milk', 'barista', ['Латте и остаток молока', 'Латте мен сүт қалдығы', 'Latte and leftover milk'], [
            {
              story: tx('Для латте берут 2/5 литра молока. Сделали 2 напитка.', 'Латтеге 2/5 литр сүт алынады. 2 сусын жасалды.', 'A latte uses 2/5 litre of milk. Two drinks were made.'),
              question: tx('Сколько литров молока ушло?', 'Неше литр сүт кетті?', 'How many litres of milk were used?'),
              hint: tx('2/5 × 2 = 4/5 = 0.8', '2/5 × 2 = 4/5 = 0.8'),
              explain: tx('Бариста считает расход молока, чтобы не закончилось в час пик.', 'Бариста сүт шығынын санайды — шың сағатта таусылмасын.', 'Baristas track milk so it does not run out at rush hour.'),
              answer: n(0.8, 0.01),
            },
            {
              story: tx('Открыли пакет 1 литр.', '1 литрлік пакет ашылды.', 'A 1 litre carton was opened.'),
              question: tx('Сколько литров осталось?', 'Неше литр қалды?', 'How many litres remain?'),
              hint: tx('1 − 0.8', '1 − 0.8'),
              explain: tx('Остаток 0.2 л — это ещё один маленький капучино. Так считают смену.', 'Қалдық 0.2 л — тағы бір кішкентай капучино. Ауысымды солай санайды.', '0.2 L leftover is one small cappuccino. That is how a shift is planned.'),
              answer: n(0.2, 0.01),
            },
          ]),
        ],
      ),
      topic(
        'g4-area',
        ['Площадь', 'Аудан', 'Area'],
        ['Плитка, ковёр и газон покупают по площади, не по периметру.', 'Плитка, кілем мен көгал периметр емес, аудан бойынша алынады.', 'Tiles, carpets and lawns are bought by area, not perimeter.'],
        [
          m('g4-builder-tiles', 'builder', ['Плитка на кухне', 'Ас үйдегі плитка', 'Kitchen tiles'], [
            {
              story: tx('Стена 3 м на 2 м. Нужно закрыть плиткой.', 'Қабырға 3 м × 2 м. Плиткамен жабу керек.', 'A wall is 3 m by 2 m. It needs tiles.'),
              question: tx('Какая площадь стены в м²?', 'Қабырға ауданы қандай (м²)?', 'What is the wall area in m²?'),
              hint: tx('3 × 2.', '3 × 2.'),
              explain: tx('Площадь прямоугольника — длина × ширина. Строитель заказывает плитку в квадратных метрах.', 'Тіктөртбұрыш ауданы — ұзындық × ен. Құрылысшы плитканы шаршы метрмен алады.', 'Rectangle area is length × width. Builders order tiles in square metres.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(6),
            },
            {
              story: tx('Окно занимает 1 м², его плитка не закрывает.', 'Терезе 1 м² алады, оны плитка жаппайды.', 'A window takes 1 m² and is not tiled.'),
              question: tx('Сколько м² плитки покупать?', 'Неше м² плитка алу керек?', 'How many m² of tile to buy?'),
              hint: tx('6 − 1.', '6 − 1.'),
              explain: tx('Проёмы вычитают из площади, иначе останутся лишние коробки.', 'Ойықтарды ауданнан азайтады, әйтпесе қорап артылады.', 'Openings are subtracted from area or extra boxes remain.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(5),
            },
          ]),
          m('g4-gardener-lawn', 'gardener', ['Газон у школы', 'Мектеп жанындағы көгал', 'School lawn'], [
            {
              story: tx('Площадка 12 м на 5 м.', 'Алаң 12 м × 5 м.', 'The yard is 12 m by 5 m.'),
              question: tx('Сколько м² рулонного газона нужно?', 'Неше м² орамды көгал керек?', 'How many m² of roll lawn are needed?'),
              hint: tx('12 × 5.', '12 × 5.'),
              explain: tx('Газон, линолеум, плёнка — всё продают квадратными метрами.', 'Көгал, линолеум, үлдір — бәрі шаршы метрмен сатылады.', 'Lawn, linoleum and film are all sold by the square metre.'),
              unit: tx('м²', 'м²', 'm²'),
              answer: n(60),
            },
            {
              story: tx('Рулон закрывает 10 м². Сколько рулонов купить? Округли вверх.', 'Орам 10 м² жабады. Неше орам алу керек? Жоғарыға дөңгелекте.', 'One roll covers 10 m². How many rolls? Round up.'),
              question: tx('Число рулонов', 'Орам саны', 'Number of rolls'),
              hint: tx('60 ÷ 10 = 6.', '60 ÷ 10 = 6.'),
              explain: tx('Иногда делится без остатка. Если бы вышло 6.1 — всё равно брали бы 7.', 'Кейде қалдықсыз бөлінеді. 6.1 болса, бәрібір 7 алар еді.', 'Sometimes it divides exactly. If it were 6.1, you would still buy 7.'),
              answer: n(6),
            },
          ]),
        ],
      ),
      topic(
        'g4-speed',
        ['Скорость и путь', 'Жылдамдық пен жол', 'Speed and distance'],
        ['Такси и курьер живут по формуле путь = скорость × время.', 'Такси мен курьер жол = жылдамдық × уақыт формуласымен жүреді.', 'Taxis and couriers live by distance = speed × time.'],
        [
          m('g4-driver-taxi', 'driver', ['Такси до аэропорта', 'Әуежайға такси', 'Taxi to the airport'], [
            {
              story: tx('Такси едет 60 км/ч. До аэропорта 45 минут (это 0.75 часа).', 'Такси 60 км/сағ жүреді. Әуежайға 45 минут (0.75 сағат).', 'The taxi goes 60 km/h. The airport is 45 minutes away (0.75 hours).'),
              question: tx('Какое расстояние в километрах?', 'Қашықтық қанша километр?', 'What is the distance in kilometres?'),
              hint: tx('60 × 0.75.', '60 × 0.75.'),
              explain: tx('Водители оценивают путь, чтобы назвать цену и успеть к рейсу.', 'Жүргізушілер баға айту және рейске үлгеру үшін жолды бағалайды.', 'Drivers estimate distance to quote a fare and make a flight.'),
              unit: tx('км', 'км', 'km'),
              answer: n(45),
            },
            {
              story: tx('Пробка: средняя скорость стала 30 км/ч. Путь тот же 45 км.', 'Кептеліс: орташа жылдамдық 30 км/сағ болды. Жол сол 45 км.', 'Traffic: average speed is now 30 km/h. Distance is still 45 km.'),
              question: tx('Сколько часов займет дорога?', 'Жол неше сағат алады?', 'How many hours will the trip take?'),
              hint: tx('Время = путь / скорость.', 'Уақыт = жол / жылдамдық.'),
              explain: tx('В пробке время растёт, потому что скорость упала. Это деление.', 'Кептелісте уақыт өседі, себебі жылдамдық түсті. Бұл бөлу.', 'In traffic, time grows because speed dropped. That is division.'),
              unit: tx('ч', 'сағ', 'h'),
              answer: n(1.5, 0.01),
            },
          ]),
          m('g4-courier-bike', 'courier', ['Велокурьер', 'Велокурьер', 'Bike courier'], [
            {
              story: tx('Курьер едет 12 км/ч и был в пути 20 минут (1/3 часа).', 'Курьер 12 км/сағ жүріп, 20 минут (1/3 сағат) жолда болды.', 'A courier rides 12 km/h for 20 minutes (1/3 hour).'),
              question: tx('Сколько километров он проехал?', 'Ол неше километр жүрді?', 'How many kilometres did he ride?'),
              hint: tx('12 × (1/3) = 4.', '12 × (1/3) = 4.'),
              explain: tx('Минуты переводят в часы, потому что скорость дана в км/ч.', 'Минутты сағатқа аударады, себебі жылдамдық км/сағ берілген.', 'Minutes become hours because speed is in km/h.'),
              unit: tx('км', 'км', 'km'),
              answer: n(4),
            },
            {
              story: tx('Осталось 2 км с той же скоростью 12 км/ч.', 'Сол 12 км/сағ жылдамдықпен 2 км қалды.', '2 km remain at the same 12 km/h.'),
              question: tx('Сколько минут займёт остаток? (час = 60 мин)', 'Қалған жол неше минут алады?', 'How many minutes for the rest? (1 hour = 60 min)'),
              hint: tx('2/12 часа × 60 минут.', '2/12 сағат × 60 минут.'),
              explain: tx('Клиенту пишут «буду через N минут» — это путь/скорость в минутах.', 'Клиентке «N минуттан кейін келемін» деп жазады — бұл минутпен жол/жылдамдық.', '“Arriving in N minutes” is distance/speed converted to minutes.'),
              answer: n(10),
            },
          ]),
        ],
      ),
    ],
  },
]
