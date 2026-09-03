/**
 * UI strings in Uzbek / Russian / English.
 *
 * Official names come from the Charter (Ustav), registered with the Ministry
 * of Justice on 22 June 2021, certificate No. 992.
 */
export const T = {
  uz: {
    nav: { about: "Birlashma haqida", court: "Arbitraj sudi", docs: "Hujjatlar", roster: "Arbitrlar", clause: "Namunaviy shart", inquiry: "Murojaat", contact: "Bog'lanish" },
    org: "Oʻzbekiston Xalqaro Arbitraj Sudlari Birlashmasi",
    orgShort: "OʻzXASB",
    orgAlt: "The Union of International Arbitration Courts of Uzbekistan",
    heroKicker: "Adliya vazirligi roʻyxati • 992-son • 22.06.2021",
    heroTitle: "Tijorat nizolarini hal etishda xalqaro tan olingan adolat, betaraflik va maxfiylik",
    heroSub: "Birlashma huzuridagi Xalqaro arbitraj sudi — doimiy faoliyat yurituvchi mustaqil arbitraj muassasasi. Milliy va xalqaro tijorat hamda investitsiya nizolarini hal etadi.",
    ctaFile: "Daʼvo arizasini topshirish",
    ctaRules: "Arbitraj Reglamenti",

    pillarsTitle: "Uch xalqaro ustuvorlik",
    pillars: [
      { t: "Maxfiylik", d: "Barcha jarayonlar va tijorat sirlari uchinchi shaxslardan qatʼiy himoyalanadi." },
      { t: "Ijro kafolati", d: "Qarorlar Nyu-York konventsiyasi (1958) doirasida 160 dan ortiq davlatda ijro etiladi." },
      { t: "Mustaqillik", d: "Arbitrlar davlat organlaridan holi va toʻliq betaraf ish yuritadi." },
    ],

    statsTitle: "Ishonch raqamlarda",
    stats: [
      { n: "160+", l: "Qaror ijro etiladigan davlat" },
      { n: "14", l: "Filial: 2 bosh + 12 viloyat" },
      { n: "3", l: "Ish yuritish tili" },
      { n: "1958", l: "Nyu-York konventsiyasi" },
    ],

    courtTitle: "Arbitraj sudining tuzilishi",
    courtSub: "Nizomga muvofiq sud quyidagi organlar orqali mustaqil faoliyat yuritadi.",
    court: [
      { t: "Arbitraj Kengashi", en: "Court of Arbitration", d: "Oliy institutsional organ. 5–11 aʼzo, kamida ⅓ qismi xorijiy mutaxassislar. 7 yil muddatga." },
      { t: "Sud Raisi", en: "President", d: "Sudning oliy mansabdor shaxsi. 7 yil muddatga. Ishlar mazmuniga aralasha olmaydi." },
      { t: "Rais oʻrinbosarlari", en: "Vice-Presidents", d: "Raisga faoliyatni muvofiqlashtirishda koʻmaklashadi." },
      { t: "Kotibiyat", en: "Secretariat", d: "Maʼmuriy apparat. Arizalarni roʻyxatga oladi, muddatlarni yuritadi." },
      { t: "Arbitrlar reestri", en: "Roster of Arbitrators", d: "Milliy va xorijiy mutaxassislar. Tavsiyaviy — tomonlar tanlovini cheklamaydi." },
    ],
    basisTitle: "Huquqiy asoslar",
    basis: [
      "Oʻzbekiston Respublikasi Konstitutsiyasi",
      "«Xalqaro tijorat arbitraji toʻgʻrisida»gi Qonun (OʻRQ-674)",
      "Nyu-York konventsiyasi (1958)",
      "IBA manfaatlar toʻqnashuvi qoidalari",
      "OʻzXASB Ustavi, Nizom va Reglament",
    ],

    docsTitle: "Meʼyoriy hujjatlar",
    docsSub: "Sudning faoliyatini tartibga soluvchi asosiy hujjatlar.",
    docCards: [
      { key: "nizom", t: "Xalqaro Arbitraj Sudi Nizomi", meta: "Statute · 9 bob · 34 modda", d: "Sudning huquqiy maqomi, boshqaruv tizimi, arbitrlar va faoliyat tamoyillari." },
      { key: "reglament", t: "Arbitraj Reglamenti", meta: "Rules · 14 bob · 59 modda", d: "Ish yuritish tartibi: daʼvodan qarorgacha, tezlashtirilgan arbitraj, mediatsiya." },
      { key: "ustav", t: "Birlashma Ustavi", meta: "Charter · 992-son, 2021", d: "Birlashmaning tashkiliy-huquqiy asosi, maqsadi, filiallar tizimi." },
    ],
    openDoc: "Hujjatni oʻqish",
    download: "PDF yuklab olish",
    downloadOther: "PDF — {lang}",
    langNames: { uz: "oʻzbekcha", ru: "ruscha", en: "inglizcha" },
    docSigned: "Imzolangan asl nusxa · 1-bet",
    docPreviewAlt: "{doc} — birinchi bet",
    close: "Yopish",

    rosterTitle: "Arbitrlar tarkibi",
    rosterSub: "Arbitrlar tomonlar tomonidan tanlanadi va IBA qoidalariga muvofiq mustaqil, xolis ish yuritadi.",

    clauseTitle: "Namunaviy arbitraj sharti",
    clauseSub: "Shartnomangizga oldindan qoʻshish uchun matnni sozlang va nusxa oling.",
    optArb: "Arbitrlar soni",
    optCity: "Muhokama joyi",
    optLang: "Muhokama tili",
    copy: "Nusxa olish",
    copied: "Nusxalandi ✓",

    inqTitle: "Murojaat qoldirish",
    inqSub: "Nizo yoki hamkorlik boʻyicha savolingizni yozib qoldiring — mutaxassislarimiz siz bilan bogʻlanadi.",
    inqName: "Ism-sharifingiz",
    inqNamePh: "F.I.Sh yoki kompaniya nomi",
    inqContact: "Email yoki telefon",
    inqContactPh: "email@example.com / +998 ...",
    inqSubject: "Mavzu",
    inqSubjectPh: "Murojaat mavzusi",
    inqMessage: "Xabaringiz",
    inqMessagePh: "Vaziyatingizni qisqacha yozing...",
    inqSend: "Murojaatni yuborish",
    inqSending: "Yuborilmoqda...",
    inqSuccess: "Murojaatingiz qabul qilindi. Tez orada siz bilan bogʻlanamiz.",
    inqError: "Xatolik yuz berdi. Iltimos, telefon orqali bogʻlaning.",
    inqInvalid: "Maʼlumotlarni tekshirib, qaytadan yuboring.",
    inqMessageShort: "Vaziyatingizni kamida 10 ta belgi bilan tavsiflang.",
    inqOr: "Yoki bevosita qoʻngʻiroq qiling:",

    contactTitle: "Bogʻlanish",
    contactPhone: "Ofis telefoni",
    contactAddr: "Manzil",
    addr: "Toshkent sh., Yashnobod tumani, Parkent koʻchasi, 30«v», 100007",
    footerNote:
      "Oʻzbekiston Respublikasi Adliya vazirligi tomonidan nodavlat notijorat tashkiloti (jamoat birlashmasi) sifatida davlat roʻyxatidan oʻtkazilgan. Guvohnoma: 2021-yil 22-iyun, 992-son.",
  },

  ru: {
    nav: { about: "Об Объединении", court: "Арбитражный суд", docs: "Документы", roster: "Арбитры", clause: "Типовая оговорка", inquiry: "Обращение", contact: "Контакты" },
    org: "Объединение Международных Арбитражных Судов Узбекистана",
    orgShort: "ОМАСУз",
    orgAlt: "The Union of International Arbitration Courts of Uzbekistan",
    heroKicker: "Реестр Министерства юстиции • № 992 • 22.06.2021",
    heroTitle: "Международно признанные справедливость, беспристрастность и конфиденциальность",
    heroSub: "Международный арбитражный суд при Объединении — постоянно действующее независимое арбитражное учреждение. Разрешает национальные и международные коммерческие и инвестиционные споры.",
    ctaFile: "Подать исковое заявление",
    ctaRules: "Арбитражный регламент",

    pillarsTitle: "Три международных приоритета",
    pillars: [
      { t: "Конфиденциальность", d: "Все процессы и коммерческая тайна строго защищены от третьих лиц." },
      { t: "Гарантия исполнения", d: "Решения исполняются более чем в 160 странах по Нью-Йоркской конвенции (1958)." },
      { t: "Независимость", d: "Арбитры действуют независимо от государственных органов и полностью беспристрастно." },
    ],

    statsTitle: "Доверие в цифрах",
    stats: [
      { n: "160+", l: "Стран исполнения решений" },
      { n: "14", l: "Филиалов: 2 главных + 12" },
      { n: "3", l: "Языка делопроизводства" },
      { n: "1958", l: "Нью-Йоркская конвенция" },
    ],

    courtTitle: "Структура арбитражного суда",
    courtSub: "Согласно Положению суд действует независимо через следующие органы.",
    court: [
      { t: "Арбитражный Совет", en: "Court of Arbitration", d: "Высший институциональный орган. 5–11 членов, не менее ⅓ — иностранные специалисты. Срок 7 лет." },
      { t: "Председатель суда", en: "President", d: "Высшее должностное лицо суда. Назначается на 7 лет. Не вправе вмешиваться в существо дел." },
      { t: "Заместители Председателя", en: "Vice-Presidents", d: "Содействуют координации деятельности суда." },
      { t: "Секретариат", en: "Secretariat", d: "Административный аппарат. Регистрирует заявления, ведёт сроки." },
      { t: "Реестр арбитров", en: "Roster of Arbitrators", d: "Национальные и иностранные специалисты. Носит рекомендательный характер." },
    ],
    basisTitle: "Правовые основы",
    basis: [
      "Конституция Республики Узбекистан",
      "Закон «О международном коммерческом арбитраже» (ЗРУ-674)",
      "Нью-Йоркская конвенция (1958)",
      "Правила IBA о конфликте интересов",
      "Устав ОМАСУз, Положение и Регламент",
    ],

    docsTitle: "Нормативные документы",
    docsSub: "Основные документы, регулирующие деятельность суда.",
    docCards: [
      { key: "nizom", t: "Положение об Арбитражном суде", meta: "Statute · 9 глав · 34 статьи", d: "Правовой статус, система управления, арбитры и принципы деятельности." },
      { key: "reglament", t: "Арбитражный Регламент", meta: "Rules · 14 глав · 59 статей", d: "Порядок делопроизводства: от иска до решения, ускоренный арбитраж, медиация." },
      { key: "ustav", t: "Устав Объединения", meta: "Charter · № 992, 2021", d: "Организационно-правовая основа, цели, система филиалов." },
    ],
    openDoc: "Читать документ",
    download: "Скачать PDF",
    downloadOther: "PDF — {lang}",
    langNames: { uz: "узбекский", ru: "русский", en: "английский" },
    docSigned: "Подписанный оригинал · стр. 1",
    docPreviewAlt: "{doc} — первая страница",
    close: "Закрыть",

    rosterTitle: "Состав арбитров",
    rosterSub: "Арбитры избираются сторонами и действуют независимо и беспристрастно в соответствии с правилами IBA.",

    clauseTitle: "Типовая арбитражная оговорка",
    clauseSub: "Настройте текст и скопируйте для включения в договор.",
    optArb: "Количество арбитров",
    optCity: "Место разбирательства",
    optLang: "Язык разбирательства",
    copy: "Копировать",
    copied: "Скопировано ✓",

    inqTitle: "Оставить обращение",
    inqSub: "Опишите ваш вопрос по спору или сотрудничеству — наши специалисты свяжутся с вами.",
    inqName: "Ваше имя",
    inqNamePh: "ФИО или название компании",
    inqContact: "Email или телефон",
    inqContactPh: "email@example.com / +998 ...",
    inqSubject: "Тема",
    inqSubjectPh: "Тема обращения",
    inqMessage: "Сообщение",
    inqMessagePh: "Кратко опишите вашу ситуацию...",
    inqSend: "Отправить обращение",
    inqSending: "Отправка...",
    inqSuccess: "Ваше обращение принято. Мы скоро свяжемся с вами.",
    inqError: "Произошла ошибка. Пожалуйста, свяжитесь по телефону.",
    inqInvalid: "Проверьте данные и отправьте ещё раз.",
    inqMessageShort: "Опишите ситуацию хотя бы в 10 символах.",
    inqOr: "Или позвоните напрямую:",

    contactTitle: "Контакты",
    contactPhone: "Телефон офиса",
    contactAddr: "Адрес",
    addr: "г. Ташкент, Яшнабадский район, ул. Паркент, 30«в», 100007",
    footerNote:
      "Зарегистрировано Министерством юстиции Республики Узбекистан как негосударственная некоммерческая организация (общественное объединение). Свидетельство: 22 июня 2021 г., № 992.",
  },

  en: {
    nav: { about: "About", court: "The Court", docs: "Documents", roster: "Arbitrators", clause: "Model clause", inquiry: "Inquiry", contact: "Contact" },
    org: "The Union of International Arbitration Courts of Uzbekistan",
    orgShort: "AIACU",
    orgAlt: "Oʻzbekiston Xalqaro Arbitraj Sudlari Birlashmasi",
    heroKicker: "Ministry of Justice register • No. 992 • 22.06.2021",
    heroTitle: "Internationally recognised fairness, neutrality and confidentiality in dispute resolution",
    heroSub: "The International Arbitration Court at the Union is a permanent, independent arbitral institution resolving domestic and international commercial and investment disputes.",
    ctaFile: "File a case",
    ctaRules: "Arbitration Rules",

    pillarsTitle: "Three international priorities",
    pillars: [
      { t: "Confidentiality", d: "All proceedings and trade secrets are strictly protected from third parties." },
      { t: "Enforceability", d: "Awards are enforced in over 160 states under the New York Convention (1958)." },
      { t: "Independence", d: "Arbitrators act free from state bodies and with full neutrality." },
    ],

    statsTitle: "Trust in numbers",
    stats: [
      { n: "160+", l: "States enforcing awards" },
      { n: "14", l: "Branches: 2 main + 12" },
      { n: "3", l: "Languages of proceedings" },
      { n: "1958", l: "New York Convention" },
    ],

    courtTitle: "Structure of the Court",
    courtSub: "Under the Statute, the Court operates independently through the following organs.",
    court: [
      { t: "Court of Arbitration", en: "Arbitraj Kengashi", d: "The supreme institutional organ. 5–11 members, at least ⅓ foreign experts. Seven-year term." },
      { t: "President", en: "Sud Raisi", d: "The Court's highest officer. Appointed for seven years. May not interfere with the merits of cases." },
      { t: "Vice-Presidents", en: "Rais oʻrinbosarlari", d: "Assist the President in coordinating the Court's work." },
      { t: "Secretariat", en: "Kotibiyat", d: "The administrative body. Registers filings and manages deadlines." },
      { t: "Roster of Arbitrators", en: "Arbitrlar reestri", d: "National and foreign experts. Advisory — does not limit party choice." },
    ],
    basisTitle: "Legal basis",
    basis: [
      "Constitution of the Republic of Uzbekistan",
      "Law on International Commercial Arbitration (LRU-674)",
      "New York Convention (1958)",
      "IBA Guidelines on Conflicts of Interest",
      "AIACU Charter, Statute and Rules",
    ],

    docsTitle: "Governing documents",
    docsSub: "The core documents governing the Court.",
    docCards: [
      { key: "nizom", t: "Statute of the Arbitration Court", meta: "Statute · 9 chapters · 34 articles", d: "Legal status, governance, arbitrators and principles of operation." },
      { key: "reglament", t: "Arbitration Rules", meta: "Rules · 14 chapters · 59 articles", d: "Procedure from request to award, expedited arbitration, mediation." },
      { key: "ustav", t: "Charter of the Union", meta: "Charter · No. 992, 2021", d: "The Union's legal basis, objectives and branch network." },
    ],
    openDoc: "Read document",
    download: "Download PDF",
    downloadOther: "PDF — {lang}",
    langNames: { uz: "Uzbek", ru: "Russian", en: "English" },
    docSigned: "Signed original · page 1",
    docPreviewAlt: "{doc} — first page",
    close: "Close",

    rosterTitle: "Our arbitrators",
    rosterSub: "Arbitrators are chosen by the parties and act independently and impartially under the IBA guidelines.",

    clauseTitle: "Model arbitration clause",
    clauseSub: "Configure the text and copy it into your contract in advance.",
    optArb: "Number of arbitrators",
    optCity: "Place of arbitration",
    optLang: "Language of proceedings",
    copy: "Copy",
    copied: "Copied ✓",

    inqTitle: "Send an inquiry",
    inqSub: "Describe your question about a dispute or cooperation — our specialists will get back to you.",
    inqName: "Your name",
    inqNamePh: "Full name or company",
    inqContact: "Email or phone",
    inqContactPh: "email@example.com / +998 ...",
    inqSubject: "Subject",
    inqSubjectPh: "Subject of your inquiry",
    inqMessage: "Message",
    inqMessagePh: "Briefly describe your situation...",
    inqSend: "Submit inquiry",
    inqSending: "Sending...",
    inqSuccess: "Your inquiry has been received. We will contact you shortly.",
    inqError: "Something went wrong. Please reach us by phone.",
    inqInvalid: "Please check the fields and send again.",
    inqMessageShort: "Please describe your situation in at least 10 characters.",
    inqOr: "Or call us directly:",

    contactTitle: "Contact",
    contactPhone: "Office phone",
    contactAddr: "Address",
    addr: "30 Parkent St., «v», Yashnobod district, Tashkent, 100007",
    footerNote:
      "Registered by the Ministry of Justice of the Republic of Uzbekistan as a non-governmental non-commercial organisation (public association). Certificate: 22 June 2021, No. 992.",
  },
};

export const PHONE = "+998 55 506 14 18";
export const PHONE_HREF = "tel:+998555061418";
export const EMAIL = "registry@arbitration.uz";
