/**
 * Curated menu catalogue for the Jano redesign.
 *
 * The core dishes, prices and photography are based on Jano's current menu.
 * Lunches and a handful of items in undersized categories are curated concepts
 * assembled from the same kitchen's existing dishes for a complete demo menu.
 */

const CDN = 'https://tapp-pictures.fra1.digitaloceanspaces.com'

const image = (path) => `${CDN}/${path}`

export const menuCategories = [
  {
    id: 'specials',
    name: 'Հատուկ առաջարկներ',
    kicker: 'Սահմանափակ առաջարկներ',
    description: 'Մեծ սեղանների, ընտանիքների և կիսվելու համար կազմված շահավետ առաջարկներ։',
    image: image('1496/janos-special-chicken.JPG'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'lunches',
    name: 'Լանչեր',
    kicker: 'Երկուշաբթիից ուրբաթ',
    description: 'Հավասարակշռված ամենօրյա լանչեր՝ հիմնական ուտեստով, աղցանով և ըմպելիքով։',
    image: image('1451/chicken-with-rice.JPG'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'starters',
    name: 'Նախուտեստներ',
    kicker: 'Սեղանի սկիզբը',
    description: 'Սառը և տաք նախուտեստներ՝ սեղանը բացելու և միասին վայելելու համար։',
    image: image('1407/hummus-%282%29.JPG'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'salads',
    name: 'Աղցաններ',
    kicker: 'Ամեն օր թարմ',
    description: 'Թարմ բանջարեղեն, կանաչիներ և Jano-ի նրբահամ սոուսներ։',
    image: image('866/TABBULE.jpg'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'hot-dishes',
    name: 'Տաք ուտեստներ',
    kicker: 'Խոհանոցից՝ սեղան',
    description: 'Հայկական և մերձավորարևելյան տաք ուտեստներ՝ պատրաստված պատվերից հետո։',
    image: image('1450/ghavurma-with-rice.JPG'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'grills',
    name: 'Խորովածներ',
    kicker: 'Բաց կրակի վրա',
    description: 'Բաց կրակի համը՝ ընտրված մսով, թարմ լավաշով և բանջարեղենով։',
    image: image('1482/halebi-kebab.JPG'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'pizzas',
    name: 'Պիցցաներ',
    kicker: 'Տաք ջեռոցից',
    description: 'Բարակ խմոր, առատ պանիր և դասական ու տեղական համադրություններ։',
    image: image('1583/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'sandwiches',
    name: 'Սենդվիչներ',
    kicker: 'Արագ և հագեցնող',
    description: 'Հագեցնող սենդվիչներ և շաուրմաներ՝ թարմ պատրաստված միջուկներով։',
    image: image('1584/47399fca-9e7c-4ca2-bccb-cbd00568dcf8.jpeg'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'soups',
    name: 'Ապուրներ',
    kicker: 'Տաք և տնային',
    description: 'Տաք, թեթև և ամեն օր թարմ պատրաստվող ապուրներ։',
    image: image('858/lentil-soup-%D5%A2%D5%A6%D5%A4%D5%AB%D5%A3.jpg'),
    count: 10,
    productCount: 10,
  },
  {
    id: 'desserts',
    name: 'Քաղցրավենիք',
    kicker: 'Քաղցր ավարտ',
    description: 'Արևելյան սիրելի քաղցրավենիք և նուրբ հեղինակային աղանդեր։',
    image: image('1506/kunefe.jpg'),
    count: 10,
    productCount: 10,
  },
]

const categoryNames = Object.fromEntries(menuCategories.map(({ id, name }) => [id, name]))

const product = (categoryId, id, name, description, price, imageUrl, extras = {}) => ({
  id,
  categoryId,
  category: categoryNames[categoryId],
  categoryName: categoryNames[categoryId],
  name,
  description,
  price,
  image: imageUrl,
  ...extras,
})

const productsByCategory = {
  specials: [
    product('specials', 'special-jano-chicken', 'Ճանո սպեշլ չիքն', 'Հատուկ համեմունքներով ամբողջական հավ, լոլիկի մածուկով 6 հաց և սխտորի սոուս։', 3500, image('1496/janos-special-chicken.JPG'), { badge: 'Jano signature' }),
    product('specials', 'special-chicken-feast', 'Ճանոյի հավի մեծ առաջարկ', 'Հատուկ հավ, լոլիկի սոուսով հաց, համուս, ֆրի, թթու, սխտորի սոուս և Coca-Cola։', 6200, image('1495/akcia-special-chicken.JPG'), { badge: 'Շահավետ' }),
    product('specials', 'special-kebab-table', 'Քյաբաբի ընտանեկան սեղան', 'Երկու բաժին քյաբաբ, խորոված լոլիկ, լավաշ, ամառային աղցան և երեք տեսակի մեզե։', 7500, image('1497/special-kebab.JPG'), { badge: '4 անձի համար' }),
    product('specials', 'special-heritage-table', 'Ճանոյի ժառանգության սեղան', 'Քյաբաբ, հատուկ հավ, յալանչի, բորակ, համուս, ֆրի, թթու և թարմ լավաշ՝ մեծ սեղանի համար։', 16500, image('1498/akcia-7.JPG'), { badge: '6–8 անձի համար' }),
    product('specials', 'special-shish-tawook', 'Շիշ թաուքի առաջարկ', 'Շիշ թաուք, ֆրի, համուս, թթու, երկու աղցան, սխտորի սոուս և Coca-Cola։', 6800, image('1499/shish-tawuk-special.jpg'), { badge: 'Հյուրերի ընտրություն' }),
    product('specials', 'special-borek-selection', 'Բորակի տեսականի', 'Սամսակ, մսով և բրնձով բորակ, իշլի քյուֆթա, պանիրով բորակ, աղցան և Coca-Cola։', 6000, image('1501/glovo-boyrek.jpg'), { badge: 'Կիսվելու համար' }),
    product('specials', 'special-mezze-evening', 'Մեզե երեկո', 'Համուս, մութաբալ, մուհամարա, յալանչի, ֆաթուշ և թարմ տաք հաց՝ երկու անձի համար։', 5900, image('1441/special-assortment.JPG'), { badge: 'Նոր' }),
    product('specials', 'special-grill-box', 'Խորովածի մեծ բոքս', 'Հալեպի քյաբաբ, շիշ թաուք, թիքա, սուջուխի քյաբաբ, խորոված բանջարեղեն և լավաշ։', 12900, image('1497/special-kebab.JPG'), { badge: '6 անձի համար' }),
    product('specials', 'special-two-person-dinner', 'Երեկո երկուսի համար', 'Սինի քյուֆթա, հավ բրնձով, թաբուլե, համուս և երկու աղանդեր։', 8900, image('1495/akcia-special-chicken.JPG'), { badge: '2 անձի համար' }),
    product('specials', 'special-vegetarian-table', 'Բուսական սեղան', 'Ֆալաֆել, ֆաթե, համուս, մութաբալ, թաբուլե, յալանչի, թթու և տաք հաց։', 6500, image('1442/hummus-fries--ttu.JPG'), { badge: 'Առանց մսի', dietary: ['Բուսակեր'] }),
  ],

  lunches: [
    product('lunches', 'lunch-lentil-chicken', 'Տնային լանչ', 'Ոսպով ապուր, հավի միս բրնձով, ամառային աղցան և օրվա ըմպելիք։', 2400, image('1451/chicken-with-rice.JPG'), { badge: 'Երկ–ուրբ · 12:00–16:00' }),
    product('lunches', 'lunch-lahmajo', 'Լահմաջոյի լանչ', 'Երկու լահմաջո, մածունով վարունգ, թթու և թան։', 1900, image('1453/lahmajun.JPG')),
    product('lunches', 'lunch-fajita', 'Ֆահիթա լանչ', 'Հավի ֆահիթա բրնձով, կաղամբով աղցան և օրվա ըմպելիք։', 2600, image('1473/fajita-with-rice.jpg')),
    product('lunches', 'lunch-falafel', 'Ֆալաֆել լանչ', 'Ֆալաֆել, համուս, թաբուլե, թթու և թարմ հաց։', 2300, image('1466/falafel.jpg'), { dietary: ['Բուսակեր'] }),
    product('lunches', 'lunch-ghavurma', 'Ղավուրմայի լանչ', 'Տավարի ղավուրմա բրնձով, սեզոնային աղցան և թան։', 3200, image('1450/ghavurma-with-rice.JPG'), { badge: 'Հագեցնող' }),
    product('lunches', 'lunch-shish-tawook', 'Շիշ թաուք լանչ', 'Հավի շիշ թաուք, ֆրի, թթու, սխտորի սոուս և լավաշ։', 3000, image('1486/SHISH-TAWUK-%282%29.JPG')),
    product('lunches', 'lunch-manti', 'Մանթը լանչ', 'Տավարի մսով մանթը, սխտորով մածուն, թարմ աղցան և ըմպելիք։', 2800, image('1454/%D5%B4%D5%A1%D5%B6%D5%BF%D5%AB.jpg')),
    product('lunches', 'lunch-philadelphia', 'Ֆիլադելֆիա լանչ', 'Տավարի ֆիլե պղպեղով ու սոխով, բրինձ և ամառային աղցան։', 2900, image('1475/philadelphia-with-rice.jpg')),
    product('lunches', 'lunch-pizza', 'Պիցցայի լանչ', 'Փոքր պիցցա ըստ ընտրության, թարմ աղցան և զովացուցիչ ըմպելիք։', 2500, image('1577/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg')),
    product('lunches', 'lunch-light', 'Թեթև լանչ', 'Սնկով ապուր, հունական աղցան և տաք հաց։', 2400, image('874/mushroom-soup2.jpg'), { dietary: ['Բուսակեր'] }),
  ],

  starters: [
    product('starters', 'starter-hummus', 'Համուս', 'Նուրբ սիսեռի խյուս՝ թահինով, ձիթայուղով և թարմ հացով։', 1000, image('1407/hummus-%282%29.JPG'), { dietary: ['Բուսակեր', 'Վեգան'] }),
    product('starters', 'starter-moutabal', 'Մութաբալ', 'Կրակի վրա խորոված սմբուկ, թահին, կիտրոն և ձիթայուղ։', 1000, image('1414/muttabal.JPG'), { dietary: ['Բուսակեր'] }),
    product('starters', 'starter-muhammara', 'Մուհամարա', 'Կարմիր պղպեղի մածուկ՝ թահինով և բուրավետ համեմունքներով։', 1000, image('1409/muhammara-%282%29.jpg'), { dietary: ['Բուսակեր', 'Վեգան'] }),
    product('starters', 'starter-garlic-cream', 'Գրեմ թում', 'Ճերմակ սխտորի նուրբ մածուկ՝ ձեթով և ձվով։', 1000, image('1410/garlic-sauce-%282%29.JPG'), { dietary: ['Բուսակեր'] }),
    product('starters', 'starter-sujukh-roll', 'Սուջուխ ռոլ', 'Կծու սուջուխով և բարակ հացով տաք ռոլեր՝ 6 հատ։', 1400, image('1411/sujukh-roll-%282%29.JPG')),
    product('starters', 'starter-yalanchi', 'Յալանչի', 'Խաղողի տերևով, բրնձով և կանաչիներով սառը տոլմա՝ 6 հատ։', 1000, image('1412/yalanchi.JPG'), { dietary: ['Բուսակեր', 'Վեգան'] }),
    product('starters', 'starter-cheese-borek', 'Պանիրով բորակ', 'Խրթխրթան խմոր և հալվող պանրային միջուկ՝ 5 հատ։', 2000, image('1413/%D5%A2%D5%A1%D5%B6%D5%AB%D5%BC%D6%85%D5%BE-%D5%BA%D6%85%D5%BC%D5%A1%D5%AF.jpg'), { dietary: ['Բուսակեր'] }),
    product('starters', 'starter-samsak', 'Սամսակ', 'Համեմված տավարի մսով տաք խմորեղեն՝ 3 հատ։', 1800, image('1415/samsak1.jpg')),
    product('starters', 'starter-ishli-kufta', 'Իշլի քյուֆթա', 'Բլղուրի բարակ շերտ, հյութեղ տավարի միս, սոխ և համեմունքներ՝ 5 հատ։', 2500, image('1416/ichli-kyufte2.jpg'), { badge: '1946-ից' }),
    product('starters', 'starter-meat-rice-borek', 'Մսով և բրնձով բորակ', 'Տավարի մսով, բրնձով և համեմունքներով խրթխրթան բորակ՝ 5 հատ։', 2000, image('1417/msov-boyrak.JPG')),
  ],

  salads: [
    product('salads', 'salad-tabbouleh', 'Թաբուլե', 'Առատ մաղադանոս, բլղուր, լոլիկ և թարմ կիտրոնի սոուս։', 1400, image('866/TABBULE.jpg'), { badge: 'Թարմ', dietary: ['Վեգան'] }),
    product('salads', 'salad-fattoush', 'Ֆաթուշ', 'Թարմ բանջարեղեն, կանաչիներ, պանիր և տապակած հաց։', 1500, image('867/fatush-bzdig.jpg'), { dietary: ['Բուսակեր'] }),
    product('salads', 'salad-summer', 'Ամառային աղցան', 'Լոլիկ, վարունգ, կանաչի և սոխ՝ թեթև համեմված։', 1200, image('872/AMARAYIN-SALAD.jpg'), { dietary: ['Վեգան'] }),
    product('salads', 'salad-beetroot', 'Բազուկով աղցան', 'Քաղցրահամ բազուկ, թարմ կանաչի և սոխ։', 1200, image('870/beet-salad1.JPG'), { dietary: ['Վեգան'] }),
    product('salads', 'salad-greek', 'Հունական աղցան', 'Լոլիկ, վարունգ, պղպեղ, սպիտակ պանիր և ձիթապտուղ։', 1600, image('873/hunagan.jpg'), { dietary: ['Բուսակեր'] }),
    product('salads', 'salad-eggplant', 'Սմբուկով աղցան', 'Տապակած սմբուկ, լոլիկ, սոխ և առատ մաղադանոս։', 1600, image('869/eggplant-salad-%282%29.JPG'), { dietary: ['Վեգան'] }),
    product('salads', 'salad-yogurt-cucumber', 'Մածունով վարունգ', 'Թարմ վարունգ, թանձր մածուն և անուշաբույր կանաչիներ։', 1400, image('1406/jajekh.jpg'), { dietary: ['Բուսակեր'] }),
    product('salads', 'salad-shanklish', 'Շինգլիշ', 'Հնեցված շինգլիշ պանիր, լոլիկ, պղպեղ և սոխ։', 1700, image('876/shinglish-salad.JPG'), { badge: 'Արևելյան դասական' }),
    product('salads', 'salad-capital', 'Մայրաքաղաքային աղցան', 'Կարտոֆիլ, գազար, կանաչ ոլոռ և նուրբ մայոնեզային սոուս։', 1200, image('877/%D1%8B%D1%84%D0%B4%D1%84%D0%B2-%D0%BA%D1%89%D0%B3%D1%8B2.jpg')),
    product('salads', 'salad-caesar', 'Կեսար հավով', 'Հավի կրծքամիս, մարոլ, պարմեզան, կրուտոններ և Կեսար սոուս։', 2000, image('878/caesar-salad.JPG'), { badge: 'Հյուրերի ընտրություն' }),
  ],

  'hot-dishes': [
    product('hot-dishes', 'hot-ghavurma-rice', 'Ղավուրմա բրնձով', 'Դանդաղ եփված տավարի ղավուրմա՝ բուրավետ բրնձով։', 2400, image('1450/ghavurma-with-rice.JPG'), { badge: 'Jano classic' }),
    product('hot-dishes', 'hot-chicken-rice', 'Հավի միս բրնձով', 'Հյութեղ համեմված հավ և հատիկավոր բրինձ։', 2200, image('1451/chicken-with-rice.JPG')),
    product('hot-dishes', 'hot-sini-meat', 'Սինի միս', 'Ջեռոցում պատրաստված տավարի միս՝ լոլիկով, պղպեղով և կարտոֆիլով։', 3000, image('1460/meat-in-tray.jpg'), { badge: 'Ջեռոցից' }),
    product('hot-dishes', 'hot-orukh', 'Օրուխ', 'Բլղուրի և տավարի մսի շերտեր՝ սոխով ու արևելյան համեմունքներով։', 2200, image('1452/orux.jpg')),
    product('hot-dishes', 'hot-lahmajo', 'Լահմաջո', 'Բարակ խմոր, համեմված տավարի միս և թարմ կիտրոն։', 500, image('1453/lahmajun.JPG')),
    product('hot-dishes', 'hot-manti', 'Մանթը', 'Փոքրիկ մսային խմորիկներ՝ սխտորով մածնային սոուսով։', 2000, image('1454/%D5%B4%D5%A1%D5%B6%D5%BF%D5%AB.jpg')),
    product('hot-dishes', 'hot-yogurt-kufta', 'Մածունով իշլի քյուֆթա', 'Իշլի քյուֆթա՝ տաք, նուրբ մածնային սոուսի մեջ։', 2000, image('1461/yogurt-kyufte.JPG')),
    product('hot-dishes', 'hot-ful-tahini', 'Ֆուլ թահինով', 'Դանդաղ եփված բակլա՝ թահինով, կիտրոնով և համեմունքներով։', 2000, image('1463/ful-pats-kuyn.jpg'), { dietary: ['Վեգան'] }),
    product('hot-dishes', 'hot-ful', 'Ֆուլ', 'Տաք բակլա՝ թթվաշ սոուսով, սխտորով և կանաչիներով։', 1800, image('1462/IMG_9569.JPG'), { dietary: ['Վեգան'] }),
    product('hot-dishes', 'hot-fatteh', 'Ֆաթե', 'Սիսեռ, թահինի, սխտոր և տապակած բարակ հաց։', 1800, image('1464/fatte2.jpg'), { dietary: ['Բուսակեր'] }),
  ],

  grills: [
    product('grills', 'grill-halep-kebab', 'Հալեպի քյաբաբ', 'Տավարի միս, սոխ, խորոված լոլիկ և թարմ լավաշ։', 2500, image('1482/halebi-kebab.JPG'), { badge: 'Արևելյան դասական' }),
    product('grills', 'grill-khashkhash-kebab', 'Խաշխաշ քյաբաբ', 'Հյութեղ տավարի քյաբաբ՝ թանձր լոլիկի սոուսով և լավաշով։', 2500, image('1483/khashkhash-kebab.JPG')),
    product('grills', 'grill-eggplant-kebab', 'Սմբուկով քյաբաբ', 'Տավարի քյաբաբ և կրակի վրա փափկեցրած սմբուկ՝ լավաշով։', 2700, image('1484/eggplant-kebbab-%282%29.jpg')),
    product('grills', 'grill-tika-kebab', 'Թիքա քյաբաբ', 'Մարինացված տավարի միս, խորոված սոխ, լոլիկ և լավաշ։', 3500, image('1485/tika-kebbab.JPG'), { badge: 'Շեֆի ընտրություն' }),
    product('grills', 'grill-shish-tawook', 'Շիշ թաուք', 'Համեմված հավի թիքա, ֆրի, սխտորի սոուս և լավաշ։', 2200, image('1486/SHISH-TAWUK-%282%29.JPG')),
    product('grills', 'grill-liver', 'Խորոված ջիգյար', 'Կրակի վրա պատրաստված ջիգյար՝ լոլիկով, սոխով և լավաշով։', 2700, image('1487/barbecue-liver.jpg')),
    product('grills', 'grill-trout', 'Իշխանի խորոված', 'Ամբողջական իշխան՝ կարտոֆիլով, կիտրոնի և թահինի սոուսներով։', 4300, image('1488/grilled-ishkhan.jpg')),
    product('grills', 'grill-kufta', 'Խորոված քյուֆթա', 'Կարագով հարստացված քյուֆթայի միս՝ բաց կրակի վրա։', 2200, image('1489/saj-kufte.jpg')),
    product('grills', 'grill-boneless-chicken', 'Առանց ոսկորի խորոված հավ', 'Ամբողջական հավ՝ կիտրոնով-սխտորով սոուսով և 1 լ Coca-Cola-ով։', 5000, image('1490/bonless-chicken-and-pepsi.JPG'), { badge: 'Կիսվելու համար' }),
    product('grills', 'grill-pork-ikibir', 'Խոզի իքիբիր', 'Հյութեղ խոզի միս՝ ածուխի վրա, թարմ սոխով և լավաշով։', 3500, image('1491/pork-kebab.jpg')),
  ],

  pizzas: [
    product('pizzas', 'pizza-pepperoni-large', 'Պեպերոնի պիցցա · մեծ', 'Պեպերոնի, մոցարելլա և Jano-ի լոլիկի սոուս։', 2200, image('1583/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Մեծ' }),
    product('pizzas', 'pizza-sujukh-large', 'Սուջուխ պիցցա · մեծ', 'Կծու սուջուխ, առատ պանիր և լոլիկի սոուս։', 2200, image('1582/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Մեծ' }),
    product('pizzas', 'pizza-ham-large', 'Խոզապուխտով պիցցա · մեծ', 'Խոզապուխտի ֆիլե, պանիր և լոլիկի սոուս։', 2200, image('1581/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Մեծ' }),
    product('pizzas', 'pizza-mushroom-large', 'Սնկով պիցցա · մեծ', 'Թարմ սունկ, մոցարելլա և բուրավետ լոլիկի սոուս։', 2200, image('1580/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Մեծ', dietary: ['Բուսակեր'] }),
    product('pizzas', 'pizza-vegetable-large', 'Բանջարեղենով պիցցա · մեծ', 'Սեզոնային բանջարեղեն, պանիր և լոլիկի սոուս։', 2200, image('1579/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Մեծ', dietary: ['Բուսակեր'] }),
    product('pizzas', 'pizza-margherita-large', 'Մարգարիտա · մեծ', 'Մոցարելլա, լոլիկի սոուս և անուշաբույր կանաչիներ։', 2200, image('1578/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Մեծ', dietary: ['Բուսակեր'] }),
    product('pizzas', 'pizza-pepperoni-small', 'Պեպերոնի պիցցա · փոքր', 'Պեպերոնի, մոցարելլա և Jano-ի լոլիկի սոուս։', 800, image('1577/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Փոքր' }),
    product('pizzas', 'pizza-sujukh-small', 'Սուջուխ պիցցա · փոքր', 'Կծու սուջուխ, պանիր և լոլիկի սոուս։', 800, image('1576/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Փոքր' }),
    product('pizzas', 'pizza-mushroom-small', 'Սնկով պիցցա · փոքր', 'Թարմ սունկ, մոցարելլա և լոլիկի սոուս։', 800, image('1573/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Փոքր', dietary: ['Բուսակեր'] }),
    product('pizzas', 'pizza-margherita-small', 'Մարգարիտա · փոքր', 'Պանիր, լոլիկի սոուս և անուշաբույր կանաչիներ։', 800, image('1567/caaea535-4f88-4f47-aa37-3558163c26ee.jpeg'), { badge: 'Փոքր', dietary: ['Բուսակեր'] }),
  ],

  sandwiches: [
    product('sandwiches', 'sandwich-mexicano', 'Մեքսիկանո', 'Մեքսիկական համեմունքներով հավ, գազար, պղպեղ, սոխ, սոուս և ֆրի։', 1000, image('1584/47399fca-9e7c-4ca2-bccb-cbd00568dcf8.jpeg')),
    product('sandwiches', 'sandwich-sujukh', 'Սուջուխ', 'Համեմված տավարի սուջուխ, լոլիկ և թթու վարունգ։', 1000, image('1449/sujukh.JPG')),
    product('sandwiches', 'sandwich-mortadella', 'Մարթատելլա', 'Jano-ի մսային մարթատելլա, թարմ լոլիկ և թթու վարունգ։', 1000, image('1422/beef-martadella.JPG')),
    product('sandwiches', 'sandwich-fajita', 'Ֆահիթա', 'Համեմված հավ, պղպեղ, սոխ, հատուկ սոուս և ֆրի։', 1000, image('1473/fajita-with-rice.jpg')),
    product('sandwiches', 'sandwich-ghavurma', 'Ղավուրմա', 'Տավարի ղավուրմա, լոլիկ, թթու վարունգ, ֆրի և սոուս։', 1100, image('1445/ghavurma.JPG'), { badge: 'Հագեցնող' }),
    product('sandwiches', 'sandwich-ghavurma-wrap', 'Ղավուրմա լոշիկով', 'Տավարի ղավուրմա, լոլիկ, թթու, ֆրի և սոուս՝ բարակ լոշիկով։', 1300, image('1445/ghavurma.JPG')),
    product('sandwiches', 'sandwich-jano-shawarma', 'Ճանոյի շաուրմա', 'Հյութեղ հավ, ֆրի, թթու վարունգ, լոլիկ և Jano-ի սոուս։', 1000, image('1584/47399fca-9e7c-4ca2-bccb-cbd00568dcf8.jpeg'), { badge: 'Jano classic' }),
    product('sandwiches', 'sandwich-arabic-shawarma', 'Արաբական շաուրմա', 'Հավ, ֆրի, թթու և լոլիկ՝ արաբական համեմունքներով։', 1000, image('1584/47399fca-9e7c-4ca2-bccb-cbd00568dcf8.jpeg')),
    product('sandwiches', 'sandwich-philadelphia', 'Ֆիլադելֆիա', 'Տավարի միս, տապակած պղպեղ և սոխ, ֆրի ու պանրային սոուս։', 1300, image('1475/philadelphia-with-rice.jpg')),
    product('sandwiches', 'sandwich-pastrami', 'Բաստուրմա', 'Բարակ կտրատած տավարի բաստուրմա՝ տաք հացի մեջ։', 1300, image('1429/bastrma.jpg'), { badge: 'Հայկական համ' }),
  ],

  soups: [
    product('soups', 'soup-onion', 'Սոխով ապուր', 'Դանդաղ կարամելացված սոխով հարուստ ու բուրավետ տաք ապուր։', 1200, image('856/onion-soup3.jpg'), { dietary: ['Բուսակեր'] }),
    product('soups', 'soup-lentil', 'Ոսպով ապուր', 'Կարմիր ոսպ, նուրբ արևելյան համեմունքներ և թարմ կիտրոն։', 1200, image('858/lentil-soup-%D5%A2%D5%A6%D5%A4%D5%AB%D5%A3.jpg'), { badge: 'Հյուրերի ընտրություն', dietary: ['Վեգան'] }),
    product('soups', 'soup-mushroom', 'Սնկով ապուր', 'Անտառային սնկի նուրբ, տաք ապուր՝ թարմ կանաչիներով։', 1200, image('874/mushroom-soup2.jpg'), { dietary: ['Բուսակեր'] }),
    product('soups', 'soup-chicken-noodle', 'Հավով և արիշտայով ապուր', 'Թափանցիկ հավի արգանակ, տնային արիշտա, գազար և կանաչի։', 1500, image('856/onion-soup3.jpg'), { badge: 'Նոր' }),
    product('soups', 'soup-spas', 'Սպաս', 'Մածուն, ձավար և անուշաբույր կանաչիներ՝ հայկական դասական բաղադրատոմսով։', 1400, image('874/mushroom-soup2.jpg'), { dietary: ['Բուսակեր'] }),
    product('soups', 'soup-tomato', 'Լոլիկով կրեմ-ապուր', 'Հասած լոլիկ, բուրավետ համեմունքներ և խրթխրթան հաց։', 1400, image('856/onion-soup3.jpg'), { dietary: ['Բուսակեր'] }),
    product('soups', 'soup-vegetable', 'Բանջարեղենով ապուր', 'Սեզոնային բանջարեղեն, թարմ կանաչի և թեթև բանջարեղենային արգանակ։', 1300, image('858/lentil-soup-%D5%A2%D5%A6%D5%A4%D5%AB%D5%A3.jpg'), { dietary: ['Վեգան'] }),
    product('soups', 'soup-mushroom-cream', 'Սնկով կրեմ-ապուր', 'Թավշյա սնկային կրեմ, սերուցք և խրթխրթան կրուտոններ։', 1500, image('874/mushroom-soup2.jpg'), { dietary: ['Բուսակեր'] }),
    product('soups', 'soup-meatball', 'Քյուֆթայով ապուր', 'Փոքրիկ տավարի քյուֆթաներ, բանջարեղեն և թեթև համեմված արգանակ։', 1800, image('856/onion-soup3.jpg'), { badge: 'Նոր' }),
    product('soups', 'soup-seasonal', 'Օրվա ապուր', 'Խոհարարի սեզոնային ընտրությունը՝ ամեն օր թարմ պատրաստված։', 1200, image('858/lentil-soup-%D5%A2%D5%A6%D5%A4%D5%AB%D5%A3.jpg'), { badge: 'Ամեն օր նոր' }),
  ],

  desserts: [
    product('desserts', 'dessert-brownie', 'Շոկոլադե բրաունի', 'Խոնավ շոկոլադե բրաունի՝ հարուստ կակաոյի համով։', 1000, image('986/IMG_1064.jpeg'), { dietary: ['Բուսակեր'] }),
    product('desserts', 'dessert-strawberry-cheesecake', 'Ելակի չիզքեյք', 'Կրեմ-պանիր, փխրուն բիսկվիթ և թարմ ելակի ժելե։', 1400, image('987/IMG_1611.jpeg'), { badge: 'Թեթև' }),
    product('desserts', 'dessert-chocolate-cheesecake', 'Շոկոլադե չիզքեյք', 'Կրեմ-պանիր, բիսկվիթ և խորը շոկոլադե շերտ։', 1400, image('1503/chocolate-cheesecake-%282%29.jpg')),
    product('desserts', 'dessert-chocolate-mousse', 'Շոկոլադե մուսս քեյք', 'Օդային շոկոլադե մուսս և նուրբ տորթային հիմք։', 1400, image('988/IMG_1425.jpeg')),
    product('desserts', 'dessert-cinnabon', 'Սիննաբոն', 'Դարչինով տաք ռոլ՝ խտացրած կաթի նուրբ կրեմով։', 800, image('989/2791DCBE-5B23-4DF5-A0A3-EFB7FD4407A1.jpeg')),
    product('desserts', 'dessert-kunafa', 'Պանիրով քունաֆա', 'Տաք քունաֆա՝ հալվող պանրով, պիստակով և անուշաբույր շիրայով։', 1200, image('1504/kunefe.jpg'), { badge: 'Արևելյան դասական' }),
    product('desserts', 'dessert-sukseh', 'Սուկսե · 2 հատ', 'Շոկոլադե բիսկվիթային քաղցրավենիք՝ կակաոյով։', 1000, image('1505/sukseh.jpg')),
    product('desserts', 'dessert-brownie-ice-cream', 'Բրաունի պաղպաղակով', 'Տաք շոկոլադե բրաունի և վանիլային պաղպաղակ։', 1400, image('986/IMG_1064.jpeg'), { badge: 'Նոր' }),
    product('desserts', 'dessert-baklava', 'Պիստակով փախլավա', 'Շերտավոր խմոր, պիստակ և նուրբ մեղրային շիրա՝ 3 հատ։', 1200, image('1504/kunefe.jpg'), { dietary: ['Բուսակեր'] }),
    product('desserts', 'dessert-fruit-plate', 'Սեզոնային մրգերի ափսե', 'Օրվա թարմ մրգերի գունեղ ընտրանի՝ կիսվելու համար։', 2200, image('987/IMG_1611.jpeg'), { dietary: ['Վեգան'] }),
  ],
}

export const menuProducts = menuCategories.flatMap(({ id }) => productsByCategory[id])

export const menuCollections = [
  {
    id: 'collection-heritage',
    name: 'Ժառանգություն · 1946',
    kicker: 'Jano-ի ընտրանի',
    description: 'Jano-ի պատմությունը մեկ բոքսում՝ սեղանի ամենասիրված ավանդական համերով։',
    items: ['Իշլի քյուֆթա · 5 հատ', 'Սինի քյուֆթա', 'Յալանչի · 6 հատ', 'Համուս', 'Մութաբալ', 'Տաք հաց'],
    productIds: ['starter-ishli-kufta', 'hot-sini-meat', 'starter-yalanchi', 'starter-hummus', 'starter-moutabal'],
    includedExtras: ['Տաք հաց'],
    serves: '3–4 անձի համար',
    price: 8900,
    oldPrice: 10400,
    image: image('1441/special-assortment.JPG'),
    badge: 'Բեսթսելեր',
  },
  {
    id: 'collection-family-grill',
    name: 'Ընտանեկան գրիլ բոքս',
    kicker: 'Մեծ սեղանի համար',
    description: 'Բաց կրակի չորս սիրելի համերը՝ խավարտով, լավաշով և Jano-ի սոուսներով։',
    items: ['Հալեպի քյաբաբ', 'Շիշ թաուք', 'Թիքա քյաբաբ', 'Սուջուխի քյաբաբ', 'Խորոված բանջարեղեն', 'Լավաշ և 3 սոուս'],
    productIds: ['grill-halep-kebab', 'grill-shish-tawook', 'grill-tika-kebab', 'grill-khashkhash-kebab'],
    includedExtras: ['Խորոված բանջարեղեն', 'Լավաշ և 3 սոուս'],
    serves: '5–6 անձի համար',
    price: 12900,
    oldPrice: 15100,
    image: image('1497/special-kebab.JPG'),
    badge: 'Խնայում եք 2 200 ֏',
  },
  {
    id: 'collection-mezze',
    name: 'Մեզե հավաքածու',
    kicker: 'Բուսական ընտրանի',
    description: 'Գունեղ, թարմ և բազմազան սկիզբ ցանկացած սեղանի համար։',
    items: ['Համուս', 'Մութաբալ', 'Մուհամարա', 'Թաբուլե', 'Ֆաթուշ', 'Յալանչի · 6 հատ', 'Տաք հաց'],
    productIds: ['starter-hummus', 'starter-moutabal', 'starter-muhammara', 'salad-tabbouleh', 'salad-fattoush', 'starter-yalanchi'],
    includedExtras: ['Տաք հաց'],
    serves: '3–4 անձի համար',
    price: 6200,
    oldPrice: 7600,
    image: image('1439/hummus-mutabal-muhamara.JPG'),
    badge: 'Բուսական',
  },
  {
    id: 'collection-lunch-office',
    name: 'Գրասենյակային լանչ բոքս',
    kicker: 'Թիմային լանչ',
    description: 'Ամբողջական պատրաստի լանչ չորս հոգանոց թիմի համար։',
    items: ['4 հիմնական ուտեստ ըստ ընտրության', '2 մեծ աղցան', 'Համուս', 'Թարմ հաց', '4 ըմպելիք'],
    productIds: ['lunch-lentil-chicken', 'lunch-fajita', 'lunch-falafel', 'lunch-light'],
    includedExtras: ['2 մեծ աղցան', 'Համուս', 'Թարմ հաց', '4 ըմպելիք'],
    serves: '4 անձի համար',
    price: 9900,
    oldPrice: 11600,
    image: image('1451/chicken-with-rice.JPG'),
    badge: 'Երկ–ուրբ',
  },
]

// Short aliases keep the data module convenient for different page components.
export const categories = menuCategories
export const products = menuProducts
export const menuItems = menuProducts
export const collections = menuCollections

export const getProductsByCategory = (categoryId) =>
  productsByCategory[categoryId] ? [...productsByCategory[categoryId]] : []

export default {
  categories: menuCategories,
  products: menuProducts,
  collections: menuCollections,
}
