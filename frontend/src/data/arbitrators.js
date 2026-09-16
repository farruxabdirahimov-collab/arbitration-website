import togayev from "../assets/togayev.jpg";
import mirzayeva from "../assets/mirzayeva.jpg";
import yunusov from "../assets/yunusov.jpg";
import achilov from "../assets/achilov.jpg";
import eshnazarov from "../assets/eshnazarov.jpg";

/**
 * Arbitrators of the International Arbitration Court at the Union.
 *
 * NOTE ON TERMINOLOGY: in Uzbek law these persons are *arbitrators*
 * (arbitr / арбитр / arbitrator), not state judges. They derive their mandate
 * from the parties' arbitration agreement, not from state authority. Keep the
 * English and Russian labels as "arbitrator"/"арбитр" — calling them "judges"
 * to a foreign audience implies a state court and undermines the neutrality
 * that international parties are looking for.
 */
export const ARBITRATORS = [
  {
    id: "togayev",
    photo: togayev,
    name: { uz: "Togʻayev Nazirjon Tursunaliyevich", ru: "Тогаев Назиржон Турсуналиевич", en: "Nazirjon T. Togayev" },
    role: { uz: "Rais", ru: "Председатель", en: "President" },
    region: { uz: "Andijon viloyati", ru: "Андижанская область", en: "Andijan region" },
    born: 1965,
    experience: 45,
    bio: {
      uz: "Huquqshunos. 45 yillik mehnat staji, yuqori tajribali arbitr.",
      ru: "Юрист. Стаж 45 лет, высокоопытный арбитр.",
      en: "Jurist. 45 years of professional experience, senior arbitrator.",
    },
  },
  {
    id: "mirzayeva",
    photo: mirzayeva,
    name: { uz: "Mirzayeva Dilbar Bakulovna", ru: "Мирзаева Дилбар Бакуловна", en: "Dilbar B. Mirzayeva" },
    role: { uz: "Rais oʻrinbosari", ru: "Заместитель председателя", en: "Vice-President" },
    region: { uz: "Samarqand viloyati", ru: "Самаркандская область", en: "Samarkand region" },
    born: 1961,
    experience: 40,
    bio: {
      uz: "Texnik muhandis. 40 yillik mehnat staji, tajribali arbitr.",
      ru: "Инженер. Стаж 40 лет, опытный арбитр.",
      en: "Engineer. 40 years of professional experience, arbitrator.",
    },
  },
  {
    id: "yunusov",
    photo: yunusov,
    name: { uz: "Yunusov Sherali Abdimalikovich", ru: "Юнусов Шерали Абдималикович", en: "Sherali A. Yunusov" },
    role: { uz: "Rais oʻrinbosari", ru: "Заместитель председателя", en: "Vice-President" },
    region: { uz: "Samarqand viloyati", ru: "Самаркандская область", en: "Samarkand region" },
    born: 1982,
    experience: 25,
    bio: {
      uz: "Huquqshunos. 25 yillik mehnat staji, tajribali arbitr.",
      ru: "Юрист. Стаж 25 лет, опытный арбитр.",
      en: "Jurist. 25 years of professional experience, arbitrator.",
    },
  },
  {
    id: "achilov",
    photo: achilov,
    name: { uz: "Achilov Dilshod Nurmuhammatovich", ru: "Ачилов Дилшод Нурмухамматович", en: "Dilshod N. Achilov" },
    role: { uz: "Arbitr", ru: "Арбитр", en: "Arbitrator" },
    region: { uz: "Navoiy viloyati", ru: "Навоийская область", en: "Navoi region" },
    born: 1971,
    experience: 25,
    bio: {
      uz: "Huquqshunos. 25 yillik mehnat staji, tajribali arbitr.",
      ru: "Юрист. Стаж 25 лет, опытный арбитр.",
      en: "Jurist. 25 years of professional experience, arbitrator.",
    },
  },
  {
    id: "eshnazarov",
    photo: eshnazarov,
    name: { uz: "Eshnazarov Mamadali Abdinazarovich", ru: "Эшназаров Мамадали Абдиназарович", en: "Mamadali A. Eshnazarov" },
    role: { uz: "Arbitr", ru: "Арбитр", en: "Arbitrator" },
    region: { uz: "Surxondaryo viloyati", ru: "Сурхандарьинская область", en: "Surkhandarya region" },
    born: 1967,
    experience: 20,
    bio: {
      uz: "Oʻzbekiston Prezidenti huzuridagi Akademiyani tamomlagan. 20 yillik staj.",
      ru: "Окончил Академию при Президенте РУз. Стаж 20 лет.",
      en: "Graduate of the Presidential Academy. 20 years of experience.",
    },
  },
  {
    id: "liliya",
    // Photo not yet supplied by the client: the card falls back to a monogram
    // until a portrait is dropped into assets/ and imported here.
    photo: null,
    name: { uz: "Li Li Ya", ru: "Ли Ли Я", en: "Li Li Ya" },
    role: { uz: "Arbitr", ru: "Арбитр", en: "Arbitrator" },
    // Foreign nationals on the roster are not decoration: the Statute requires
    // at least a third of the Court of Arbitration to be foreign specialists,
    // and a mixed roster is what makes the forum credible to a foreign party.
    citizenship: { uz: "Xitoy fuqarosi", ru: "Гражданка КНР", en: "Citizen of China" },
    region: { uz: "Toshkent shahri", ru: "г. Ташкент", en: "Tashkent city" },
    experience: 25,
    // Deliberately framed as experience *between* Uzbek and foreign businesses,
    // not as attracting investment into Uzbekistan: an arbitrator described as
    // promoting one side's economy reads as pre-committed to that side, which
    // is exactly the appearance of partiality the roster has to avoid.
    bio: {
      uz: "25 yillik tadbirkorlik tajribasiga ega. Oʻzbekiston va chet el tadbirkorlari oʻrtasidagi ishbilarmonlik munosabatlari boʻyicha tajribali arbitr.",
      ru: "25 лет предпринимательского опыта. Опытный арбитр в сфере деловых отношений между узбекскими и иностранными предпринимателями.",
      en: "25 years of business experience. An arbitrator experienced in commercial relations between Uzbek and foreign entrepreneurs.",
    },
  },
];
