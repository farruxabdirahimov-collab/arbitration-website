/**
 * Model arbitration clause, in the three working languages.
 *
 * This is the single most commercially important text on the site: an
 * arbitration court has no jurisdiction at all unless the parties agreed to it
 * in writing beforehand. Every word of the institution's name must therefore
 * match the Charter exactly — a wrong or ambiguous name is a standard ground
 * for challenging the clause.
 */
export const CLAUSE = {
  uz: (n, city, lang, law) =>
`«Ushbu shartnomadan kelib chiqadigan yoki u bilan bogʻliq boʻlgan barcha nizolar, kelishmovchiliklar yoki talablar, shu jumladan uning bajarilishi, buzilishi, tugatilishi yoki haqiqiy emasligiga oid masalalar, Oʻzbekiston Xalqaro Arbitraj Sudlari Birlashmasi huzuridagi Xalqaro arbitraj sudi tomonidan uning amaldagi Arbitraj Reglamentiga muvofiq uzil-kesil hal etiladi.
• Arbitrlar soni — ${n}.
• Arbitraj muhokamasi joyi — ${city}.
• Arbitraj muhokamasi tili — ${lang}.
• Ushbu shartnoma ${law} qonunchiligi bilan tartibga solinadi.»`,

  ru: (n, city, lang, law) =>
`«Все споры, разногласия или требования, возникающие из настоящего договора или в связи с ним, в том числе касающиеся его исполнения, нарушения, прекращения или недействительности, подлежат окончательному разрешению в Международном арбитражном суде при Объединении международных арбитражных судов Узбекистана в соответствии с его действующим Арбитражным регламентом.
• Количество арбитров — ${n}.
• Место проведения арбитражного разбирательства — ${city}.
• Язык арбитражного разбирательства — ${lang}.
• Настоящий договор регулируется материальным правом ${law}.»`,

  en: (n, city, lang, law) =>
`"Any dispute, controversy or claim arising out of or relating to this contract, including its execution, breach, termination or invalidity, shall be finally settled by the International Arbitration Court at the Union of International Arbitration Courts of Uzbekistan in accordance with its Arbitration Rules in force.
• The number of arbitrators shall be ${n}.
• The place of arbitration shall be ${city}.
• The language of the arbitral proceedings shall be ${lang}.
• This contract shall be governed by the substantive law of ${law}."`,
};

export const CITY = { uz: "Toshkent", ru: "Ташкент", en: "Tashkent" };

export const LAW = {
  uz: "Oʻzbekiston Respublikasi",
  ru: "Республики Узбекистан",
  en: "the Republic of Uzbekistan",
};

/** Arbitrator count, written out, per UI language. */
export const COUNT = {
  uz: { one: "bitta", three: "uchta" },
  ru: { one: "один", three: "три" },
  en: { one: "one", three: "three" },
};

/** Names of the procedural languages, per UI language. */
export const LANG_NAME = {
  uz: { uz: "oʻzbek", ru: "rus", en: "ingliz" },
  ru: { uz: "узбекский", ru: "русский", en: "английский" },
  en: { uz: "Uzbek", ru: "Russian", en: "English" },
};
