import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import Stats from "./components/Stats";
import CourtStructure from "./components/CourtStructure";
import Documents from "./components/Documents";
import DocumentReader from "./components/DocumentReader";
import Arbitrators from "./components/Arbitrators";
import ClauseBuilder from "./components/ClauseBuilder";
import Inquiry from "./components/Inquiry";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { track, trackPageview } from "./data/analytics";
import { useDocumentManifest } from "./data/docFiles";
import { T } from "./data/i18n";

export default function App() {
  // English first: the site's primary job is to win the trust of foreign
  // investors. Uzbek and Russian are one click away.
  const [lang, setLang] = useState("en");
  const [openDoc, setOpenDoc] = useState(null);

  // Fetched once and shared, so the cards and the reader can never disagree
  // about which translations are published.
  const docLangs = useDocumentManifest();

  const t = T[lang];

  useEffect(() => {
    // Only on mount: a language switch is its own event, not a second visit.
    trackPageview(lang);
  }, []);

  const changeLang = (next) => {
    if (next === lang) return;
    track("lang_switch", { label: next, lang });
    setLang(next);
  };

  return (
    <>
      <Header t={t} lang={lang} setLang={changeLang} />
      <main>
        <Hero t={t} lang={lang} />
        <Pillars t={t} />
        <Stats t={t} />
        <CourtStructure t={t} />
        <Documents t={t} lang={lang} docLangs={docLangs} onOpen={setOpenDoc} />
        <Arbitrators t={t} lang={lang} />
        <ClauseBuilder t={t} lang={lang} />
        <Inquiry t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <Footer t={t} />

      {openDoc && (
        <DocumentReader
          t={t}
          lang={lang}
          docKey={openDoc}
          docLangs={docLangs}
          onClose={() => setOpenDoc(null)}
        />
      )}
    </>
  );
}
