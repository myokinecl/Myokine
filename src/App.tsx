import { useState, useEffect, useMemo, useRef, FormEvent, MouseEvent } from "react";
import {
  BookOpen,
  Heart,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Info,
  Check,
  X,
  Mail,
  RotateCcw,
  Flame,
  Volume2,
  VolumeX,
  Instagram,
  Share2,
  Download,
  Copy,
  Menu,
  Link2,
} from "lucide-react";
import { STATIC_ARTICLES, CATEGORIES, Article } from "./data";
import { INFOGRAFIAS, Infografia } from "./data/infografias";
import { CLINICAL_QUESTIONS, ClinicalQuestion } from "./questions";
import { AnimatePresence, motion } from "motion/react";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { ContactBlock, ServicesSection, WhatsAppShareButton, SITE_URL } from "./components/Contacto";
import { ComoTrabajo } from "./components/ComoTrabajo";
import { Pizarra } from "./components/Pizarra";
import { ARTICULOS_OCULTOS } from "./data/revision";
import exercisePolypillImg from "./assets/images/exercise_polypill_1781741842587.jpg";

type TabType = "journal" | "infografias" | "academia" | "sobre-mi" | "biblioteca" | "pizarra";
type AudienceFilter = "todos" | "paciente" | "clinico";

const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function parseSpanishDate(dateStr: string): number {
  const match = dateStr
    .toLowerCase()
    .match(/(\d{1,2})\s+de\s+([a-záéíóú]+),?\s+(\d{4})/i);
  if (!match) return 0;
  const day = parseInt(match[1], 10);
  const month = SPANISH_MONTHS[match[2]] ?? 0;
  const year = parseInt(match[3], 10);
  return new Date(year, month, day).getTime();
}

const SORTED_ARTICLES: Article[] = STATIC_ARTICLES.filter((a) => !ARTICULOS_OCULTOS.includes(a.slug)).sort(
  (a, b) => parseSpanishDate(b.date) - parseSpanishDate(a.date)
);

const TOPIC_CHIPS = [
  ...CATEGORIES.segmento,
  ...CATEGORIES.tematica,
  ...CATEGORIES.paciente,
].filter((cat) => SORTED_ARTICLES.some((a) => a.categoryValue === cat.value));

export default function App() {
  const articles = SORTED_ARTICLES;

  // Navigation & Hash routing state
  const [activeTab, setActiveTab] = useState<TabType>("journal");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedInfografia, setSelectedInfografia] = useState<Infografia | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Filters on Journal
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>("todos");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const catalogSectionRef = useRef<HTMLDivElement | null>(null);

  // Infografias filter
  const [selectedInfografiaTopic, setSelectedInfografiaTopic] = useState<string>("Todas");

  // Copy link feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Newsletter state (no backend)

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("myokine_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("myokine_bookmarks", JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  // Fixed 6-question Academia state
  const triviaQuestions: ClinicalQuestion[] = CLINICAL_QUESTIONS;
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState<number>(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<string | null>(null);
  const [triviaHearts, setTriviaHearts] = useState<number>(3);
  const [triviaStreak, setTriviaStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("myokine_trivia_streak");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [triviaScore, setTriviaScore] = useState<number>(0);
  const [triviaStatus, setTriviaStatus] = useState<
    "playing" | "correct" | "incorrect" | "game_over" | "completed"
  >("playing");
  const [triviaMascotMessage, setTriviaMascotMessage] = useState<string>(
    "Pon a prueba tu criterio clínico con estas 6 preguntas basadas en evidencia."
  );
  const [triviaAudioEnabled, setTriviaAudioEnabled] = useState<boolean>(true);

  // Instagram Share Modal
  const [instagramModalArticle, setInstagramModalArticle] = useState<Article | null>(null);
  const [instagramTheme, setInstagramTheme] = useState<
    "terracotta" | "light" | "dark" | "gradient"
  >("terracotta");
  const [instagramCopied, setInstagramCopied] = useState<boolean>(false);

  // Hash Router sync
  useEffect(() => {
    const syncFromHash = () => {
      const rawHash = window.location.hash || "#/";
      const clean = rawHash.replace(/^#\/?/, "").replace(/\/+$/, "");

      if (!clean || clean === "journal") {
        setActiveTab("journal");
        setSelectedArticle(null);
        setSelectedInfografia(null);
        return;
      }

      if (clean.startsWith("articulo/")) {
        const slug = decodeURIComponent(clean.slice("articulo/".length));
        const found = articles.find((a) => a.slug === slug || a.id === slug);
        if (found) {
          setActiveTab("journal");
          setSelectedArticle(found);
          setSelectedInfografia(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      if (clean === "infografias") {
        setActiveTab("infografias");
        setSelectedArticle(null);
        setSelectedInfografia(null);
        return;
      }

      if (clean.startsWith("infografias/") || clean.startsWith("infografia/")) {
        const slug = decodeURIComponent(
          clean.replace(/^infografias?\//, "")
        );
        const foundInf = INFOGRAFIAS.find((item) => item.slug === slug || item.id === slug);
        setActiveTab("infografias");
        setSelectedArticle(null);
        setSelectedInfografia(foundInf || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (clean === "academia") {
        setActiveTab("academia");
        setSelectedArticle(null);
        setSelectedInfografia(null);
        return;
      }

      if (clean === "pizarra") {
        setActiveTab("pizarra");
        setSelectedArticle(null);
        setSelectedInfografia(null);
        return;
      }

      if (clean === "sobre-mi") {
        setActiveTab("sobre-mi");
        setSelectedArticle(null);
        setSelectedInfografia(null);
        return;
      }

      if (clean === "biblioteca") {
        setActiveTab("biblioteca");
        setSelectedArticle(null);
        setSelectedInfografia(null);
        return;
      }

      setActiveTab("journal");
      setSelectedArticle(null);
      setSelectedInfografia(null);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [articles]);

  const navigateToTab = (tab: TabType) => {
    setMobileMenuOpen(false);
    setSelectedArticle(null);
    setSelectedInfografia(null);
    setActiveTab(tab);
    const hashMap: Record<TabType, string> = {
      journal: "#/",
      infografias: "#/infografias",
      academia: "#/academia",
      "sobre-mi": "#/sobre-mi",
      biblioteca: "#/biblioteca",
      pizarra: "#/pizarra",
    };
    window.location.hash = hashMap[tab];
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openArticle = (article: Article) => {
    setMobileMenuOpen(false);
    setSelectedArticle(article);
    setSelectedInfografia(null);
    setActiveTab("journal");
    window.location.hash = `#/articulo/${article.slug}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    window.location.hash = "#/";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openInfografiaModal = (item: Infografia) => {
    setSelectedInfografia(item);
    window.location.hash = `#/infografias/${item.slug}`;
  };

  const closeInfografiaModal = () => {
    setSelectedInfografia(null);
    window.location.hash = "#/infografias";
  };

  const getShareUrl = (hashPath: string) => {
    return `${window.location.origin}${window.location.pathname}${hashPath}`;
  };

  const copyShareLink = (hashPath: string, keyId: string, e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const url = getShareUrl(hashPath);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedId(keyId);
    setTimeout(() => {
      setCopiedId((prev) => (prev === keyId ? null : prev));
    }, 2200);
  };

  const downloadInfografia = (item: Infografia, e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const link = document.createElement("a");
    link.href = item.image;
    link.download = item.downloadName || `${item.slug}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleBookmark = (id: string, e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  // Filtered articles for Journal catalog
  const latestThreeArticles = useMemo(() => articles.slice(0, 3), [articles]);

  const filteredCatalogArticles = useMemo(() => {
    return articles.filter((a) => {
      if (audienceFilter === "paciente") {
        if (a.audience !== "paciente" && a.audience !== "ambos") return false;
      } else if (audienceFilter === "clinico") {
        if (a.audience !== "clinico" && a.audience !== "ambos") return false;
      }
      if (selectedTopic && a.categoryValue !== selectedTopic) {
        return false;
      }
      return true;
    });
  }, [articles, audienceFilter, selectedTopic]);

  const scrollToCatalogTop = () => {
    if (catalogSectionRef.current) {
      const y =
        catalogSectionRef.current.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  const handleAudienceChoice = (choice: "paciente" | "clinico") => {
    setAudienceFilter((prev) => (prev === choice ? "todos" : choice));
    setTimeout(scrollToCatalogTop, 40);
  };

  const handleTopicSelect = (topicValue: string | null) => {
    setSelectedTopic(topicValue);
    setTimeout(scrollToCatalogTop, 40);
  };

  // Infografías filtering
  const infografiaTopics = useMemo(
    () => ["Todas", ...Array.from(new Set(INFOGRAFIAS.map((i) => i.topic)))],
    []
  );

  const filteredInfografias = useMemo(() => {
    if (selectedInfografiaTopic === "Todas") return INFOGRAFIAS;
    return INFOGRAFIAS.filter((i) => i.topic === selectedInfografiaTopic);
  }, [selectedInfografiaTopic]);

  const bookmarkedArticles = useMemo(
    () => articles.filter((a) => bookmarkedIds.includes(a.id)),
    [articles, bookmarkedIds]
  );

  // Academia sound effects
  const playTriviaSound = (
    type: "correct" | "incorrect" | "victory" | "defeat" | "heart"
  ) => {
    if (!triviaAudioEnabled) return;
    try {
      const AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === "correct") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.start();
        setTimeout(() => {
          osc.frequency.setValueAtTime(700, ctx.currentTime);
        }, 80);
        setTimeout(() => {
          osc.stop();
        }, 250);
      } else if (type === "heart") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(290, ctx.currentTime);
        osc.frequency.setValueAtTime(190, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.start();
        setTimeout(() => {
          osc.stop();
        }, 250);
      } else if (type === "victory") {
        const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.005, ctx.currentTime + idx * 0.1 + 0.25);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
        });
      } else if (type === "defeat") {
        const notes = [196.0, 174.61, 146.83, 110.0];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.15);
          gain.gain.linearRampToValueAtTime(0.005, ctx.currentTime + idx * 0.15 + 0.3);
          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 0.4);
        });
      }
    } catch {}
  };

  const handleSelectTriviaOption = (optionKey: string) => {
    if (triviaStatus !== "playing") return;
    setSelectedTriviaOption(optionKey);
  };

  const handleVerifyTriviaAnswer = () => {
    if (triviaStatus !== "playing" || !selectedTriviaOption) return;
    const q = triviaQuestions[currentTriviaIndex];
    if (!q) return;

    if (selectedTriviaOption === q.correctKey) {
      setTriviaScore((prev) => prev + 1);
      setTriviaStatus("correct");
      playTriviaSound("correct");
      setTriviaMascotMessage(
        "Respuesta correcta. Razonamiento clínico alineado con la evidencia."
      );
    } else {
      const nextHearts = triviaHearts - 1;
      setTriviaHearts(nextHearts);

      if (nextHearts <= 0) {
        setTriviaStatus("game_over");
        playTriviaSound("defeat");
        setTriviaMascotMessage(
          "Te quedaste sin corazones. Revisa las explicaciones clínicas e inténtalo de nuevo."
        );
      } else {
        setTriviaStatus("incorrect");
        playTriviaSound("heart");
        setTriviaMascotMessage(
          `Respuesta incorrecta. Te quedan ${nextHearts} ${
            nextHearts === 1 ? "corazón" : "corazones"
          }.`
        );
      }
    }
  };

  const handleNextTriviaQuestion = () => {
    if (currentTriviaIndex + 1 >= triviaQuestions.length) {
      setTriviaStatus("completed");
      playTriviaSound("victory");
      const newStreak = triviaStreak + 1;
      setTriviaStreak(newStreak);
      try {
        localStorage.setItem("myokine_trivia_streak", newStreak.toString());
      } catch {}
      setTriviaMascotMessage(
        "Completaste las 6 preguntas del desafío de Academia MyoKine."
      );
    } else {
      setCurrentTriviaIndex((prev) => prev + 1);
      setSelectedTriviaOption(null);
      setTriviaStatus("playing");
      setTriviaMascotMessage("Siguiente pregunta clínica.");
    }
  };

  const handleResetTrivia = () => {
    setCurrentTriviaIndex(0);
    setSelectedTriviaOption(null);
    setTriviaHearts(3);
    setTriviaScore(0);
    setTriviaStatus("playing");
    setTriviaMascotMessage(
      "Pon a prueba tu criterio clínico con estas 6 preguntas basadas en evidencia."
    );
  };

  // Instagram Canvas Generator
  const getInstagramCaptionText = (article: Article) => {
    const refText =
      article.references && article.references.length > 0
        ? `${article.references[0].author} (${article.references[0].year || "2026"}). ${article.references[0].title}. ${article.references[0].journal || ""}.`
        : "MyoKine";

    return `HALLAZGO CLAVE — MYOKINE

"${article.pullQuote || article.summary}"

Artículo: ${article.title}
Síntesis: ${article.summary}

Referencia científica:
${refText}

—
Lee el artículo completo en MyoKine (@myokinecl)
#MyoKine #Kinesiologia #Fisioterapia #EvidenciaCientifica #RazonamientoClinico @myokinecl`;
  };

  const downloadInstagramImage = (article: Article, theme: string = "terracotta") => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bgGradient: CanvasGradient | string;
    let textColor = "#ffffff";
    let accentColor = "#F5E663";
    let subTextColor = "rgba(255, 255, 255, 0.75)";
    let cardBg = "#1e1a19";
    let borderColor = "#0F5C4D";
    let pillBg = "#0F5C4D";
    let pillText = "#ffffff";

    if (theme === "light") {
      bgGradient = "#F6F7F8";
      textColor = "#1D2433";
      accentColor = "#0F5C4D";
      subTextColor = "rgba(10, 10, 12, 0.7)";
      cardBg = "#ffffff";
      borderColor = "rgba(139, 58, 42, 0.3)";
    } else if (theme === "dark") {
      bgGradient = "#0a0c10";
      textColor = "#f3f4f6";
      accentColor = "#d4d4d8";
      subTextColor = "rgba(243, 244, 246, 0.7)";
      cardBg = "#14161c";
      borderColor = "#3f3f46";
      pillBg = "#27272a";
    } else if (theme === "gradient") {
      const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
      grad.addColorStop(0, "#2d1810");
      grad.addColorStop(0.5, "#0F5C4D");
      grad.addColorStop(1, "#120806");
      bgGradient = grad;
      textColor = "#ffffff";
      accentColor = "#FBF6C9";
      subTextColor = "rgba(255, 255, 255, 0.85)";
      cardBg = "rgba(0, 0, 0, 0.35)";
      borderColor = "#FBF6C9";
      pillBg = "#FBF6C9";
      pillText = "#141212";
    } else {
      const grad = ctx.createLinearGradient(0, 0, 0, 1080);
      grad.addColorStop(0, "#141212");
      grad.addColorStop(1, "#0a0808");
      bgGradient = grad;
      textColor = "#F6F7F8";
      accentColor = "#F5E663";
      subTextColor = "rgba(249, 246, 240, 0.75)";
      cardBg = "#1e1a19";
      borderColor = "#0F5C4D";
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 8;
    ctx.strokeRect(35, 30, 1010, 1020);

    ctx.fillStyle = cardBg;
    ctx.beginPath();
    ctx.roundRect(60, 60, 960, 960, 24);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    ctx.fillStyle = pillBg;
    ctx.beginPath();
    ctx.roundRect(100, 105, 160, 46, 10);
    ctx.fill();

    ctx.fillStyle = pillText;
    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.fillText("MYOKINE", 128, 135);

    ctx.fillStyle = accentColor;
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    const catText = (article.categoryLabel || "HALLAZGO CLAVE").toUpperCase();
    ctx.fillText(catText, 285, 135);

    ctx.beginPath();
    ctx.moveTo(100, 180);
    ctx.lineTo(980, 180);
    ctx.strokeStyle =
      theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.font = "bold 120px Georgia, serif";
    ctx.fillText("“", 95, 295);

    ctx.fillStyle = textColor;
    ctx.font = "italic 36px Georgia, serif";

    const maxQuoteWidth = 860;
    const quoteText = article.pullQuote || article.summary || "";
    const words = quoteText.split(" ");
    let line = "";
    let y = 330;
    const lineHeight = 52;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxQuoteWidth && n > 0) {
        ctx.fillText(line, 105, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 105, y);

    const bottomY = 880;
    ctx.beginPath();
    ctx.moveTo(100, bottomY);
    ctx.lineTo(980, bottomY);
    ctx.strokeStyle =
      theme === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    let displayTitle = article.title;
    if (displayTitle.length > 68) {
      displayTitle = displayTitle.slice(0, 65) + "...";
    }
    ctx.fillText(displayTitle, 100, bottomY + 45);

    ctx.fillStyle = subTextColor;
    ctx.font = "19px system-ui, -apple-system, sans-serif";
    ctx.fillText("Por Lukas · MyoKine | @myokinecl", 100, bottomY + 82);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MyoKine-Instagram-${article.slug || article.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const renderArticleCard = (article: Article, showSummary: boolean = true) => {
    const shareHash = `#/articulo/${article.slug}`;
    const isCopied = copiedId === `art-${article.id}`;

    return (
      <article
        key={article.id}
        onClick={() => openArticle(article)}
        className="group grid grid-cols-1 md:grid-cols-[150px_1fr] lg:grid-cols-[150px_1fr_260px] gap-x-9 gap-y-1.5 py-6 border-b border-[#E3E5E8] cursor-pointer"
      >
        <div className="text-[15px] font-medium text-[#5A6170] md:pt-1">{article.categoryLabel}</div>

        <div className="min-w-0">
          <h3 className="font-display text-xl sm:text-[23px] font-semibold leading-snug tracking-[-0.01em] text-[#1D2433] group-hover:underline decoration-[#F5E663] decoration-[6px] underline-offset-[-1px] [text-decoration-skip-ink:none]">
            {article.title}
          </h3>
          {showSummary && (
            <p className="font-serif text-[17px] sm:text-lg text-[#5A6170] leading-relaxed mt-2 line-clamp-2">
              {article.summary}
            </p>
          )}
          <div className="mt-3 flex items-center gap-4 text-[15px] text-[#5A6170]">
            <span className="tabular-nums">{article.readingTime} min de lectura</span>
            <button
              type="button"
              onClick={(e) => copyShareLink(shareHash, `art-${article.id}`, e)}
              className="inline-flex items-center gap-1.5 hover:text-[#1D2433] transition-colors cursor-pointer"
              title="Copiar link del artículo"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-[#0F5C4D]" />
                  <span className="text-[#0F5C4D]">Copiado</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  <span>Copiar link</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={(e) => toggleBookmark(article.id, e)}
              className="inline-flex items-center gap-1.5 hover:text-[#1D2433] transition-colors cursor-pointer"
              aria-label={isBookmarked(article.id) ? "Quitar de guardados" : "Guardar"}
            >
              {isBookmarked(article.id) ? (
                <BookmarkCheck className="w-4 h-4 text-[#0F5C4D] fill-[#0F5C4D]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span>{isBookmarked(article.id) ? "Guardado" : "Guardar"}</span>
            </button>
          </div>
        </div>

        <p className="hidden lg:block font-serif italic text-[16px] leading-relaxed text-[#1D2433]/85 line-clamp-4">
          {article.pullQuote}
        </p>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#1D2433] font-sans flex flex-col">
      {/* Compact Header (Max 64px height on mobile) */}
      <header className="h-16 border-b border-[#E3E5E8] bg-white/95 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Clean Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateToTab("journal")}
            className="font-display text-[22px] sm:text-2xl font-extrabold tracking-[-0.02em] text-[#1D2433] cursor-pointer whitespace-nowrap"
          >
            Myo<span className="text-[#0F5C4D]">Kine</span>
          </button>

          {/* Desktop 4-item text navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-8 text-[17px] font-medium text-[#5A6170]"
          >
            {(
              [
                { id: "journal", label: "Journal" },
                { id: "infografias", label: "Infografías" },
                { id: "pizarra", label: "Pizarra" },
                { id: "sobre-mi", label: "Sobre mí" },
              ] as { id: TabType; label: string }[]
            ).map((item) => {
              const isActive = activeTab === item.id && !selectedArticle;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToTab(item.id)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#1D2433] font-semibold border-[#1D2433]"
                      : "border-transparent hover:text-[#1D2433]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions: small Biblioteca icon + mobile menu toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateToTab("biblioteca")}
              aria-label="Biblioteca guardada"
              title="Biblioteca"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === "biblioteca"
                  ? "text-[#0F5C4D] bg-[#0F5C4D]/10"
                  : "text-[#1D2433]/70 hover:text-[#0F5C4D] hover:bg-[#1D2433]/5"
              }`}
            >
              {activeTab === "biblioteca" || bookmarkedIds.length > 0 ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden p-2 rounded-lg text-[#1D2433]/80 hover:bg-[#1D2433]/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#1D2433]/10 px-4 py-3 flex items-center justify-between gap-2 shadow-sm">
            {(
              [
                { id: "journal", label: "Journal" },
                { id: "infografias", label: "Infografías" },
                { id: "pizarra", label: "Pizarra" },
                { id: "sobre-mi", label: "Sobre mí" },
              ] as { id: TabType; label: string }[]
            ).map((item) => {
              const isActive = activeTab === item.id && !selectedArticle;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToTab(item.id)}
                  className={`text-sm font-semibold py-1.5 px-2 rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#0F5C4D] bg-[#0F5C4D]/10"
                      : "text-[#1D2433]/70 hover:text-[#1D2433]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        {/* ARTICLE DETAIL VIEW */}
        {selectedArticle && (
          <article
            className="max-w-3xl mx-auto bg-white border border-[#1D2433]/10 rounded-2xl p-6 sm:p-12 lg:p-14 shadow-sm"
            id="article-view-workspace"
          >
            {/* Back button */}
            <button
              type="button"
              onClick={closeArticle}
              className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#1D2433]/55 hover:text-[#0F5C4D] transition-colors py-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Volver al Journal</span>
            </button>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-2.5 text-sm font-semibold text-[#0F5C4D] mb-4">
              <span>{selectedArticle.categoryLabel}</span>
              <span className="text-[#1D2433]/30">·</span>
              <span className="font-mono text-[#1D2433]/55 tabular-nums">
                {selectedArticle.date}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.12] text-[#1D2433] tracking-tight mb-6">
              {selectedArticle.title}
            </h1>

            {/* En 15 segundos (Right below title) */}
            <div className="mb-8 p-5 sm:p-6 bg-[#F6F7F8] border border-[#1D2433]/10 rounded-xl space-y-2">
              <span className="text-sm font-bold text-[#0F5C4D] block">
                En 15 segundos
              </span>
              <p className="text-base sm:text-lg font-serif text-[#1D2433]/85 leading-relaxed">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Byline & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#1D2433]/10 text-sm text-[#1D2433]/60 font-semibold mb-10">
              <div className="flex items-center gap-3">
                <span>Por Lukas · MyoKine</span>
                <span>·</span>
                <span className="font-mono tabular-nums">
                  {selectedArticle.readingTime} min
                </span>
              </div>

              <div className="flex items-center gap-3 select-none">
                <button
                  type="button"
                  onClick={() =>
                    copyShareLink(
                      `#/articulo/${selectedArticle.slug}`,
                      `detail-${selectedArticle.id}`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1D2433]/15 bg-[#F6F7F8]/60 hover:bg-[#F6F7F8] text-[#1D2433]/80 transition-colors cursor-pointer"
                >
                  {copiedId === `detail-${selectedArticle.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-700">Link copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1D2433]/15 hover:border-[#0F5C4D]/40 hover:text-[#0F5C4D] transition-colors cursor-pointer"
                >
                  {isBookmarked(selectedArticle.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#0F5C4D] fill-[#0F5C4D]" />
                      <span className="text-[#0F5C4D]">Guardado</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Guardar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Lo que me llevo + Neutral Instagram Share */}
            {selectedArticle.pullQuote && (
              <div className="my-10 p-6 sm:p-8 bg-[#F6F7F8]/70 border-l-2 border-[#0F5C4D] rounded-r-xl relative">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-[13px] font-bold text-[#0F5C4D]">
                    Lo que me llevo
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInstagramModalArticle(selectedArticle);
                      setInstagramCopied(false);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#1D2433]/5 text-[#1D2433]/80 border border-[#1D2433]/15 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                    title="Crear publicación para Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Compartir en Instagram</span>
                  </button>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-[#1D2433] leading-relaxed">
                  "{selectedArticle.pullQuote}"
                </p>
                <span className="text-sm text-[#1D2433]/50 block mt-3 text-right">
                  — MyoKine
                </span>
              </div>
            )}

            {/* Full Markdown Content (Unaltered prose) */}
            <div className="prose prose-stone max-w-none">
              <MarkdownRenderer content={selectedArticle.content} />
            </div>

            {/* Para tu paciente: infografías relacionadas */}
            {(() => {
              const related = INFOGRAFIAS.filter((i) =>
                i.relatedCategories.includes(selectedArticle.categoryValue)
              ).slice(0, 3);
              if (related.length === 0) return null;
              return (
                <div className="mt-14 pt-10 border-t border-[#1D2433]/10" id="article-infografias">
                  <span className="text-[#0F5C4D] text-sm font-bold mb-2 block">
                    Para tu paciente
                  </span>
                  <p className="text-sm text-[#1D2433]/65 mb-5">
                    Infografías relacionadas, listas para descargar o enviar.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {related.map((inf) => (
                      <button
                        key={inf.id}
                        type="button"
                        onClick={() => {
                          window.location.hash = `#/infografias/${inf.slug}`;
                        }}
                        className="text-left rounded-xl overflow-hidden border border-[#1D2433]/10 bg-white hover:border-[#0F5C4D] transition-colors cursor-pointer"
                      >
                        <div className="aspect-[3/4] bg-[#F6F7F8] overflow-hidden">
                          <img src={inf.image} alt={inf.title} loading="lazy" className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="p-3 text-sm sm:text-sm font-display font-semibold text-[#1D2433] leading-snug">
                          {inf.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Scientific References */}
            {selectedArticle.references && selectedArticle.references.length > 0 && (
              <div
                className="mt-14 pt-10 border-t border-[#1D2433]/10"
                id="article-references"
              >
                <span className="text-[#0F5C4D] text-sm font-bold mb-2 block">
                  Referencias científicas
                </span>
                <p className="text-sm font-serif italic text-[#1D2433]/55 mb-4">
                  Todo lo mencionado en este artículo está respaldado por las siguientes publicaciones originales.
                </p>
                <div className="space-y-3">
                  {selectedArticle.references.map((ref, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-[#F6F7F8]/60 p-4 rounded-xl border border-[#1D2433]/8 text-sm sm:text-sm"
                    >
                      <div className="font-bold text-[#1D2433] mb-1 font-display">
                        {ref.title}
                      </div>
                      <div className="text-[#1D2433]/75">
                        {ref.author} ({ref.year}).{" "}
                        <span className="italic">{ref.journal}</span>
                      </div>
                      {ref.doi && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[13px] text-[#1D2433]/50">
                            DOI:
                          </span>
                          <a
                            href={`https://doi.org/${ref.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#0F5C4D] hover:underline break-all"
                          >
                            {ref.doi}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical disclaimer */}
            <div className="mt-12 p-5 sm:p-6 bg-[#F6F7F8] rounded-xl border border-[#1D2433]/10 text-sm sm:text-sm">
              <div className="flex gap-3.5 items-start">
                <Info className="w-4 h-4 text-[#0F5C4D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block text-[#1D2433]">
                    Nota clínica
                  </span>
                  <p className="text-[#1D2433]/75 leading-relaxed">
                    Este contenido es informativo y busca acercar la evidencia científica actual. No reemplaza una evaluación kinesiológica o médica presencial individualizada.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#1D2433]/10 flex flex-wrap justify-between items-center gap-4">
              <button
                type="button"
                onClick={closeArticle}
                className="bg-[#1D2433] text-white px-6 py-3 rounded-[10px] text-sm font-bold hover:bg-[#0F5C4D] transition-colors cursor-pointer"
              >
                Volver al Journal
              </button>
              <button
                type="button"
                onClick={() =>
                  copyShareLink(
                    `#/articulo/${selectedArticle.slug}`,
                    `bottom-${selectedArticle.id}`
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] border border-[#1D2433]/15 text-sm font-bold text-[#1D2433]/75 hover:border-[#0F5C4D] hover:text-[#0F5C4D] transition-colors cursor-pointer"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>
                  {copiedId === `bottom-${selectedArticle.id}`
                    ? "Link copiado"
                    : "Copiar link"}
                </span>
              </button>
              <WhatsAppShareButton
                text={`${selectedArticle.title} — MyoKine\n${SITE_URL}/articulo/${selectedArticle.slug}`}
              />
            </div>
          </article>
        )}

        {/* VIEW 1: PORTADA / JOURNAL */}
        {activeTab === "journal" && !selectedArticle && (
          <div className="space-y-14">
            {/* 1. HERO */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-end pt-2 sm:pt-6">
              <div>
                <h1 className="font-display text-[40px] sm:text-6xl lg:text-[64px] font-bold leading-[1.04] tracking-[-0.035em] text-[#1D2433] max-w-[13ch]">
                  Leer evidencia para <mark className="hl">atender mejor</mark> a tus pacientes
                </h1>
                <p className="font-serif text-[19px] sm:text-[22px] leading-relaxed text-[#5A6170] mt-6 mb-8 max-w-[34em]">
                  Soy Lukas, kinesiólogo. Leo papers de dolor, carga y rehabilitación y los resumo en lo que sirve en la consulta. Gratis, en español.
                </p>
                <div className="flex flex-wrap gap-3.5">
                  <button
                    type="button"
                    onClick={scrollToCatalogTop}
                    className="bg-[#0F5C4D] text-white rounded-[10px] px-6 py-3.5 text-[17px] font-semibold hover:bg-[#0B4A3E] transition-colors cursor-pointer"
                  >
                    Leer el journal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigateToTab("sobre-mi");
                      setTimeout(() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }), 300);
                    }}
                    className="border-[1.5px] border-[#1D2433] text-[#1D2433] rounded-[10px] px-6 py-3.5 text-[17px] font-semibold hover:bg-[#1D2433] hover:text-white transition-colors cursor-pointer"
                  >
                    Atención kinésica
                  </button>
                </div>
              </div>

              {latestThreeArticles[0] && (
                <button
                  type="button"
                  onClick={() => openArticle(latestThreeArticles[0])}
                  className="text-left border-l-[3px] border-[#1D2433] pl-6 py-1 cursor-pointer group"
                >
                  <span className="text-[15px] font-medium text-[#5A6170]">Lo último que leí</span>
                  <h3 className="font-display text-2xl sm:text-[25px] font-semibold leading-tight tracking-[-0.015em] text-[#1D2433] mt-2.5 mb-3.5 group-hover:underline">
                    {latestThreeArticles[0].title}
                  </h3>
                  <p className="font-serif text-lg sm:text-[19px] leading-relaxed text-[#1D2433]">
                    <mark className="hl">{latestThreeArticles[0].pullQuote}</mark>
                  </p>
                  <span className="block text-[15px] text-[#5A6170] mt-3.5">
                    {latestThreeArticles[0].readingTime} min de lectura
                  </span>
                </button>
              )}
            </section>

            {/* 2. ESTA SEMANA */}
            <section>
              <div className="flex items-baseline justify-between border-b-[1.5px] border-[#1D2433] pb-3.5">
                <h2 className="font-display text-[26px] sm:text-3xl font-bold tracking-[-0.02em] text-[#1D2433]">
                  Esta semana
                </h2>
                <button
                  type="button"
                  onClick={scrollToCatalogTop}
                  className="text-[17px] font-semibold text-[#0F5C4D] underline underline-offset-4 cursor-pointer"
                >
                  Ver los {SORTED_ARTICLES.length}
                </button>
              </div>
              <div>{latestThreeArticles.map((article) => renderArticleCard(article))}</div>
            </section>

            {/* HERRAMIENTAS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {[
                {
                  tab: "pizarra" as TabType,
                  title: "Pizarra de consulta",
                  text: "Explica con dibujos y gráficos listos: carga, etapas de una lesión, dolor, entrenamiento y nutrición.",
                  cta: "Abrir pizarra",
                  img: (
                    <svg viewBox="0 0 60 120" className="w-[58%] h-[80%]" aria-hidden="true">
                      <g fill="none" stroke="#1D2433" strokeWidth="1.6">
                        <circle cx="30" cy="12" r="8" />
                        <path d="M22 24h16l6 40-5 1-4-26v76h-6V82h-2v33h-6V39l-4 26-5-1z" />
                      </g>
                      <path d="M37 30q5 4 4 12" stroke="#c0392b" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M27 95q2 6 0 11" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  tab: "infografias" as TabType,
                  title: "Infografías para pacientes",
                  text: `${INFOGRAFIAS.length} láminas listas para mandar por WhatsApp.`,
                  cta: "Ver infografías",
                  img: (
                    <svg viewBox="0 0 80 100" className="w-[70%] h-[80%]" aria-hidden="true">
                      <rect x="6" y="6" width="68" height="88" rx="4" fill="#F6F7F8" />
                      <rect x="14" y="16" width="44" height="7" rx="2" fill="#1D2433" />
                      <rect x="14" y="30" width="52" height="4" fill="#5A6170" opacity=".5" />
                      <rect x="14" y="38" width="40" height="4" fill="#5A6170" opacity=".5" />
                      <rect x="14" y="52" width="52" height="28" rx="3" fill="#F5E663" />
                    </svg>
                  ),
                },
              ].map((t) => (
                <button
                  key={t.tab}
                  type="button"
                  onClick={() => navigateToTab(t.tab)}
                  className="text-left bg-[#F6F7F8] rounded-[18px] p-5 sm:p-7 flex gap-5 sm:gap-6 items-center cursor-pointer group"
                >
                  <div className="shrink-0 w-24 h-28 sm:w-[150px] sm:h-[170px] bg-white rounded-xl border border-[#E3E5E8] flex items-center justify-center">
                    {t.img}
                  </div>
                  <div>
                    <h3 className="font-display text-[22px] sm:text-2xl font-bold tracking-[-0.015em] text-[#1D2433] mb-2">{t.title}</h3>
                    <p className="font-serif text-[17px] sm:text-lg leading-relaxed text-[#5A6170] mb-3">{t.text}</p>
                    <span className="text-[17px] font-semibold text-[#0F5C4D] underline underline-offset-4">{t.cta}</span>
                  </div>
                </button>
              ))}
            </section>

            {/* 3. FULL LISTING WITH COMPACT TOPIC FILTER */}
            <section
              ref={catalogSectionRef}
              id="listado-articulos"
              className="space-y-6 scroll-mt-20"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1D2433]/10 pb-4">
                <div>
                  <h2 className="font-display text-[26px] sm:text-3xl font-bold tracking-[-0.02em] text-[#1D2433]">
                    Todos los artículos
                  </h2>
                  <p className="text-sm text-[#1D2433]/55 mt-1 tabular-nums">
                    {filteredCatalogArticles.length}{" "}
                    {filteredCatalogArticles.length === 1 ? "publicación" : "publicaciones"}
                    {audienceFilter === "paciente" && " · Para pacientes"}
                    {audienceFilter === "clinico" && " · Enfoque clínico"}
                  </p>
                </div>

                {(audienceFilter !== "todos" || selectedTopic !== null) && (
                  <button
                    type="button"
                    onClick={() => {
                      setAudienceFilter("todos");
                      setSelectedTopic(null);
                    }}
                    className="self-start sm:self-auto text-sm font-bold text-[#0F5C4D] hover:underline cursor-pointer"
                  >
                    Limpiar filtros ×
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {([
                  ["paciente", "Para pacientes"],
                  ["clinico", "Para clínicos"],
                ] as const).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleAudienceChoice(v)}
                    className={`px-4 py-2 rounded-[10px] text-[15px] font-semibold border-[1.5px] transition-colors cursor-pointer ${
                      audienceFilter === v
                        ? "bg-[#1D2433] text-white border-[#1D2433]"
                        : "bg-white text-[#1D2433] border-[#1D2433]/25 hover:border-[#1D2433]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Compact Horizontal Scrollable Topic Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => handleTopicSelect(null)}
                  className={`px-3.5 py-1.5 rounded-[10px] text-sm font-semibold whitespace-nowrap border transition-colors shrink-0 cursor-pointer ${
                    selectedTopic === null
                      ? "bg-[#1D2433] text-white border-[#1D2433]"
                      : "bg-white text-[#1D2433]/70 border-[#1D2433]/15 hover:border-[#0F5C4D] hover:text-[#0F5C4D]"
                  }`}
                >
                  Todos
                </button>
                {TOPIC_CHIPS.map((topic) => (
                  <button
                    key={topic.value}
                    type="button"
                    onClick={() =>
                      handleTopicSelect(
                        selectedTopic === topic.value ? null : topic.value
                      )
                    }
                    className={`px-3.5 py-1.5 rounded-[10px] text-sm font-semibold whitespace-nowrap border transition-colors shrink-0 cursor-pointer ${
                      selectedTopic === topic.value
                        ? "bg-[#0F5C4D] text-white border-[#0F5C4D]"
                        : "bg-white text-[#1D2433]/70 border-[#1D2433]/15 hover:border-[#0F5C4D] hover:text-[#0F5C4D]"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              {filteredCatalogArticles.length === 0 ? (
                <div className="bg-white border border-[#1D2433]/10 rounded-xl p-10 text-center space-y-3">
                  <p className="font-serif text-lg text-[#1D2433]/75">
                    No hay artículos que coincidan con esta combinación de filtros.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAudienceFilter("todos");
                      setSelectedTopic(null);
                    }}
                    className="text-sm font-bold text-[#0F5C4D] hover:underline cursor-pointer"
                  >
                    Ver todos los artículos
                  </button>
                </div>
              ) : (
                <div>
                  {filteredCatalogArticles.map((article) =>
                    renderArticleCard(article)
                  )}
                </div>
              )}
            </section>

            {/* 4. CONTACTO (WhatsApp / Instagram) */}
            <ContactBlock
              onServices={() => {
                navigateToTab("sobre-mi");
                setTimeout(() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }), 300);
              }}
            />
          </div>
        )}

        {/* VIEW 2: INFOGRAFÍAS */}
        {activeTab === "infografias" && !selectedArticle && (
          <div className="space-y-10" id="infografias-workspace">
            <div className="border-b border-[#1D2433]/10 pb-6 space-y-2">
              <h1 className="font-display text-3xl sm:text-4xl font-medium text-[#1D2433] tracking-tight">
                Infografías clínicas
              </h1>
              <p className="text-sm sm:text-base text-[#1D2433]/65 max-w-2xl">
                Material visual descargable para explicar conceptos de dolor, carga y movimiento sin catastrofismo.
              </p>
            </div>

            {/* Topic Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {infografiaTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedInfografiaTopic(topic)}
                  className={`px-3.5 py-1.5 rounded-[10px] text-sm font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                    selectedInfografiaTopic === topic
                      ? "bg-[#1D2433] text-white border-[#1D2433]"
                      : "bg-white text-[#1D2433]/70 border-[#1D2433]/15 hover:border-[#0F5C4D] hover:text-[#0F5C4D]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInfografias.map((item) => {
                const isCopied = copiedId === `inf-${item.id}`;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#1D2433]/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => openInfografiaModal(item)}
                        className="aspect-[3/4] bg-[#F6F7F8] overflow-hidden cursor-pointer border-b border-[#1D2433]/8"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>

                      <div className="p-5 space-y-2">
                        <span className="text-sm font-semibold text-[#0F5C4D] block">
                          {item.topic}
                        </span>
                        <h2
                          onClick={() => openInfografiaModal(item)}
                          className="font-display text-lg font-semibold text-[#1D2433] leading-snug cursor-pointer hover:text-[#0F5C4D] transition-colors"
                        >
                          {item.title}
                        </h2>
                        <p className="text-sm text-[#1D2433]/65 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => downloadInfografia(item, e)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1D2433] hover:bg-[#0F5C4D] text-white text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) =>
                          copyShareLink(
                            `#/infografias/${item.slug}`,
                            `inf-${item.id}`,
                            e
                          )
                        }
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#1D2433]/15 bg-white hover:bg-[#1D2433]/5 text-[#1D2433]/80 text-sm font-semibold transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="text-emerald-700">Link copiado</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3.5 h-3.5" />
                            <span>Copiar link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: ACADEMIA (Fixed 6-question Quiz only) */}
        {activeTab === "pizarra" && !selectedArticle && <Pizarra />}

        {activeTab === "academia" && !selectedArticle && (
          <div
            className="max-w-3xl mx-auto space-y-8"
            id="duolingo-academia"
          >
            {/* Status Bar */}
            <div className="bg-white border border-[#1D2433]/10 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 select-none">
              <div>
                <h1 className="font-display text-xl font-bold text-[#1D2433]">
                  Academia MyoKine
                </h1>
                <p className="text-sm text-[#1D2433]/55 font-semibold">
                  Quiz clínico · 6 preguntas
                </p>
              </div>

              <div className="flex-1 min-w-[140px] sm:max-w-xs px-2">
                <div className="flex justify-between items-center text-sm text-[#1D2433]/55 font-bold mb-1">
                  <span>Progreso</span>
                  <span className="font-mono tabular-nums">
                    {currentTriviaIndex + 1} / {triviaQuestions.length}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#1D2433]/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F5C4D] rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentTriviaIndex +
                          (triviaStatus === "correct" ||
                          triviaStatus === "incorrect"
                            ? 1
                            : 0)) /
                          triviaQuestions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-1.5 text-amber-700 font-bold text-sm"
                  title="Racha completada"
                >
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
                  <span className="font-mono tabular-nums">{triviaStreak}</span>
                </div>

                <div className="flex items-center gap-1" title="Vidas restantes">
                  {[1, 2, 3].map((heartNum) => (
                    <Heart
                      key={heartNum}
                      className={`w-4 h-4 transition-transform ${
                        triviaHearts >= heartNum
                          ? "text-[#0F5C4D] fill-[#0F5C4D]"
                          : "text-[#1D2433]/15"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setTriviaAudioEnabled(!triviaAudioEnabled)}
                  className="p-2 rounded-lg border border-[#1D2433]/10 text-[#1D2433]/60 hover:text-[#1D2433] transition-colors cursor-pointer"
                  title={triviaAudioEnabled ? "Silenciar sonido" : "Activar sonido"}
                >
                  {triviaAudioEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white/70 border border-[#1D2433]/10 rounded-xl px-5 py-3.5 text-sm font-display italic text-[#1D2433]/75">
              {triviaMascotMessage}
            </div>

            <AnimatePresence mode="wait">
              {triviaStatus === "game_over" && (
                <motion.div
                  key="game-over-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-red-300 rounded-2xl p-6 sm:p-10 text-center space-y-5"
                >
                  <h2 className="font-display text-2xl font-bold text-[#1D2433]">
                    Sin corazones disponibles
                  </h2>
                  <p className="text-sm text-[#1D2433]/70 max-w-md mx-auto">
                    Obtuviste {triviaScore} de {triviaQuestions.length} respuestas correctas.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetTrivia}
                    className="bg-[#1D2433] text-white font-semibold text-sm px-7 py-3 rounded-[10px] hover:bg-[#0F5C4D] transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reintentar</span>
                  </button>
                </motion.div>
              )}

              {triviaStatus === "completed" && (
                <motion.div
                  key="victory-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-[#1D2433]/10 rounded-2xl p-6 sm:p-10 text-center space-y-6"
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F5C4D]">
                    Desafío completado
                  </h2>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="bg-[#F6F7F8] rounded-xl p-4">
                      <span className="text-[13px] font-bold text-[#1D2433]/50 block">
                        Acierto
                      </span>
                      <span className="font-display text-xl font-bold text-[#1D2433] tabular-nums">
                        {Math.round((triviaScore / triviaQuestions.length) * 100)}%
                      </span>
                    </div>
                    <div className="bg-[#F6F7F8] rounded-xl p-4">
                      <span className="text-[13px] font-bold text-[#1D2433]/50 block">
                        Puntos
                      </span>
                      <span className="font-display text-xl font-bold text-[#1D2433] tabular-nums">
                        {triviaScore} / {triviaQuestions.length}
                      </span>
                    </div>
                    <div className="bg-[#F6F7F8] rounded-xl p-4">
                      <span className="text-[13px] font-bold text-[#1D2433]/50 block">
                        Racha
                      </span>
                      <span className="font-display text-xl font-bold text-[#0F5C4D] tabular-nums">
                        {triviaStreak}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetTrivia}
                      className="bg-[#0F5C4D] text-white font-semibold text-sm px-7 py-3 rounded-[10px] hover:bg-[#0B4A3E] transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Volver a jugar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToTab("journal")}
                      className="bg-white border border-[#1D2433]/15 text-[#1D2433] font-semibold text-sm px-7 py-3 rounded-[10px] hover:border-[#0F5C4D] transition-colors cursor-pointer"
                    >
                      Volver al Journal
                    </button>
                  </div>
                </motion.div>
              )}

              {(triviaStatus === "playing" ||
                triviaStatus === "correct" ||
                triviaStatus === "incorrect") &&
                (() => {
                  const q = triviaQuestions[currentTriviaIndex];
                  if (!q) return null;

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-6"
                    >
                      <div className="bg-white border border-[#1D2433]/10 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center justify-between gap-2 text-sm">
                          <span className="font-bold text-[#0F5C4D]">
                            {q.pilarLabel}
                          </span>
                          <span className="font-mono text-[#1D2433]/45 tabular-nums">
                            {currentTriviaIndex + 1} de {triviaQuestions.length}
                          </span>
                        </div>

                        <h2 className="font-display text-xl sm:text-2xl text-[#1D2433] font-semibold leading-snug">
                          {q.question}
                        </h2>

                        <div className="space-y-3">
                          {q.options.map((opt) => {
                            const isSelected = selectedTriviaOption === opt.key;
                            const isAnswered =
                              triviaStatus === "correct" ||
                              triviaStatus === "incorrect";
                            const isCorrectOpt = opt.key === q.correctKey;

                            let optionStyle =
                              "border-[#1D2433]/12 bg-white hover:border-[#0F5C4D]/40";
                            let badgeStyle =
                              "border-[#1D2433]/15 text-[#1D2433]/70 bg-[#F6F7F8]";

                            if (isSelected) {
                              optionStyle =
                                "border-2 border-[#0F5C4D] bg-[#0F5C4D]/[0.03]";
                              badgeStyle =
                                "bg-[#0F5C4D] text-white border-[#0F5C4D]";
                            }

                            if (isAnswered) {
                              if (isCorrectOpt) {
                                optionStyle =
                                  "border-2 border-emerald-700 bg-emerald-50/50";
                                badgeStyle =
                                  "bg-emerald-700 text-white border-emerald-700";
                              } else if (isSelected) {
                                optionStyle =
                                  "border-2 border-red-600 bg-red-50/50";
                                badgeStyle =
                                  "bg-red-600 text-white border-red-600";
                              } else {
                                optionStyle =
                                  "border-[#1D2433]/8 bg-white opacity-60";
                              }
                            }

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                disabled={isAnswered}
                                onClick={() => handleSelectTriviaOption(opt.key)}
                                className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition-colors cursor-pointer ${optionStyle}`}
                              >
                                <span
                                  className={`w-6 h-6 rounded-md border text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 ${badgeStyle}`}
                                >
                                  {opt.key}
                                </span>
                                <p className="text-sm text-[#1D2433]/85 leading-relaxed">
                                  {opt.text}
                                </p>
                              </button>
                            );
                          })}
                        </div>

                        {triviaStatus === "playing" && (
                          <div className="flex justify-end pt-2 border-t border-[#1D2433]/8">
                            <button
                              type="button"
                              disabled={!selectedTriviaOption}
                              onClick={handleVerifyTriviaAnswer}
                              className={`px-7 py-3 rounded-[10px] text-sm font-bold inline-flex items-center gap-2 transition-colors ${
                                selectedTriviaOption
                                  ? "bg-[#1D2433] hover:bg-[#0F5C4D] text-white cursor-pointer"
                                  : "bg-[#1D2433]/10 text-[#1D2433]/35 cursor-not-allowed"
                              }`}
                            >
                              <span>Comprobar respuesta</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {(triviaStatus === "correct" ||
                        triviaStatus === "incorrect") && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`rounded-2xl p-6 sm:p-8 border space-y-4 ${
                            triviaStatus === "correct"
                              ? "bg-emerald-50/60 border-emerald-700/20"
                              : "bg-red-50/60 border-red-600/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {triviaStatus === "correct" ? (
                              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-red-600 shrink-0" />
                            )}
                            <div>
                              <h3 className="font-display text-base font-bold text-[#1D2433]">
                                {triviaStatus === "correct"
                                  ? "Correcto."
                                  : `Incorrecto. La respuesta correcta es ${q.correctKey}.`}
                              </h3>
                              <p className="text-sm text-[#1D2433]/60">
                                {q.evidenceLevel}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-[#1D2433]/85 leading-relaxed">
                            {q.reasoning}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                            {(() => {
                              const foundArt = articles.find(
                                (a) => a.id === q.linkedArticleId
                              );
                              if (!foundArt) return <span />;
                              return (
                                <button
                                  type="button"
                                  onClick={() => openArticle(foundArt)}
                                  className="text-sm font-bold text-[#0F5C4D] hover:underline flex items-center gap-1.5 cursor-pointer"
                                >
                                  <BookOpen className="w-4 h-4" />
                                  <span>Leer artículo: {q.linkedArticleTitle}</span>
                                </button>
                              );
                            })()}

                            <button
                              type="button"
                              onClick={handleNextTriviaQuestion}
                              className="px-7 py-2.5 rounded-[10px] bg-[#1D2433] hover:bg-[#0F5C4D] text-white text-sm font-bold transition-colors cursor-pointer"
                            >
                              {currentTriviaIndex + 1 >= triviaQuestions.length
                                ? "Finalizar"
                                : "Siguiente"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })()}
            </AnimatePresence>
          </div>
        )}

        {/* VIEW 4: SOBRE MÍ */}
        {activeTab === "sobre-mi" && !selectedArticle && (
          <div
            className="max-w-3xl mx-auto bg-white border border-[#1D2433]/10 rounded-2xl p-6 sm:p-12 lg:p-14 space-y-10"
            id="about-workspace"
          >
            <div className="space-y-2 border-b border-[#1D2433]/10 pb-6">
              <h1 className="font-display text-3xl sm:text-4xl text-[#1D2433] font-medium tracking-tight">
                Lukas · Kinesiólogo y creador de MyoKine
              </h1>
              <p className="text-sm sm:text-base text-[#1D2433]/65">
                Magíster (c) en Fisiología Clínica del Ejercicio
              </p>
            </div>

            <div className="space-y-6 text-[#1D2433]/90 leading-[1.75] text-[18px] font-serif">
              <p>
                Soy kinesiólogo y trabajo con personas que vuelven al deporte o a su vida después de una lesión o con dolor que no se va. Leo papers porque me ayudan a atender mejor, y aquí comparto lo que voy leyendo: qué se estudió, qué se encontró y qué cambia (o no) en la consulta.
              </p>

              <blockquote className="border-l-[3px] border-[#1D2433] pl-5 py-1 italic font-serif text-[#1D2433] text-[19px]">
                No tengo todas las respuestas. Prefiero mostrar lo que dice la evidencia, con sus límites, y que cada uno saque sus conclusiones.
              </blockquote>

              <div className="pt-6 border-t border-[#1D2433]/10 space-y-6">
                <h2 className="font-display text-2xl sm:text-3xl text-[#1D2433] font-semibold tracking-tight">
                  ¿Por qué MyoKine?
                </h2>

                <p>
                  Las mioquinas son señales. Proteínas que el músculo libera cuando se contrae, que viajan por el cuerpo y afectan órganos que aparentemente no tienen nada que ver con el movimiento: el cerebro, el hígado, el tejido adiposo, el sistema inmune. Durante décadas asumimos que el músculo era solo un motor. Resultó que también es un órgano endocrino que conversa con todo lo demás.
                </p>

                <div className="my-6 space-y-3">
                  <div className="border border-[#1D2433]/10 rounded-xl overflow-hidden bg-[#F6F7F8]/50 p-3 sm:p-4">
                    <img
                      src={exercisePolypillImg}
                      alt="Exercise is the real polypill"
                      className="w-full h-auto rounded-lg max-h-[460px] object-contain mx-auto"
                    />
                  </div>
                  <p className="text-sm text-[#1D2433]/60 font-serif italic text-center">
                    <strong>Figura 1.</strong> “Exercise is the real polypill” (Fiuza-Luces, C. et al., 2013).
                  </p>
                </div>

                <p className="border-l-2 border-[#0F5C4D] pl-4 py-1 font-serif italic text-[#1D2433]/80">
                  “Esta fue la imagen que conocí por primera vez en segundo año de universidad, me quedó dando vueltas por un tiempo y luego transformó mi visión del movimiento para siempre.”
                </p>

                <p>
                  MyoKine parte de ahí. No del músculo en abstracto, sino de esa idea: que hay cosas que el cuerpo humano lleva tiempo comunicando, y que en kinesiología todavía no hemos terminado de escuchar.
                </p>

                <p>
                  Este espacio existe porque creo que nuestra profesión tiene un problema de estándar. No de personas —hay kinesiólogos extraordinarios— sino de cultura. Una cultura donde el paper se cita sin leer, donde la certeza clínica se confunde con evidencia, y donde los sesgos que todos tenemos se vuelven invisibles porque nadie los nombra. Yo los tengo, y la idea no es esconderlos sino reconocerlos para pensar mejor.
                </p>

                <p>
                  Lo que intento hacer acá es entender al ser humano con más honestidad. Leer la evidencia sin inflarla ni descartarla. Preguntarse qué sabemos, qué creemos saber, y qué diferencia hay entre las dos cosas.
                </p>
              </div>

              <p className="border-t border-[#1D2433]/10 pt-6 font-serif italic text-sm text-[#0F5C4D] text-right">
                — Lukas · MyoKine
              </p>

              <ServicesSection />

              <ComoTrabajo />
            </div>
          </div>
        )}

        {/* VIEW 5: BIBLIOTECA */}
        {activeTab === "biblioteca" && !selectedArticle && (
          <div className="space-y-8" id="library-workspace">
            <div className="border-b border-[#1D2433]/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="font-display text-3xl text-[#1D2433] font-medium tracking-tight">
                  Biblioteca guardada
                </h1>
                <p className="text-sm text-[#1D2433]/65 mt-1">
                  Artículos guardados en este dispositivo para consultarlos cuando quieras.
                </p>
              </div>
              <span className="text-sm text-[#1D2433]/55 tabular-nums">
                {bookmarkedArticles.length}{" "}
                {bookmarkedArticles.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>

            {bookmarkedArticles.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#1D2433]/10 rounded-2xl max-w-lg mx-auto p-8 space-y-4">
                <Bookmark className="w-10 h-10 text-[#0F5C4D]/40 mx-auto" />
                <h2 className="font-display text-lg text-[#1D2433]/85">
                  Aún no tienes artículos guardados
                </h2>
                <p className="text-sm text-[#1D2433]/60">
                  Usa el ícono de marcador en cualquier publicación del Journal para guardarla aquí.
                </p>
                <button
                  type="button"
                  onClick={() => navigateToTab("journal")}
                  className="bg-[#1D2433] text-white px-6 py-2.5 rounded-[10px] text-sm font-bold hover:bg-[#0F5C4D] transition-colors cursor-pointer"
                >
                  Ir al Journal
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookmarkedArticles.map((article) => renderArticleCard(article))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* INFOGRAPHIC PREVIEW MODAL (for direct shareable hash #/infografias/<slug>) */}
      <AnimatePresence>
        {selectedInfografia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
            onClick={closeInfografiaModal}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-[#1D2433]/15 rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 my-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold text-[#0F5C4D] block">
                    {selectedInfografia.topic}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-[#1D2433] mt-0.5">
                    {selectedInfografia.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeInfografiaModal}
                  className="p-1.5 rounded-lg hover:bg-[#1D2433]/5 text-[#1D2433]/60 hover:text-[#1D2433] cursor-pointer"
                  aria-label="Cerrar vista previa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>


              <p className="text-sm sm:text-sm text-[#1D2433]/70 leading-relaxed">
                {selectedInfografia.description}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={(e) => downloadInfografia(selectedInfografia, e)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D2433] hover:bg-[#0F5C4D] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </button>
                <button
                  type="button"
                  onClick={(e) =>
                    copyShareLink(
                      `#/infografias/${selectedInfografia.slug}`,
                      `modal-inf-${selectedInfografia.id}`,
                      e
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#1D2433]/15 bg-white hover:bg-[#1D2433]/5 text-[#1D2433] text-sm font-semibold transition-colors cursor-pointer"
                >
                  {copiedId === `modal-inf-${selectedInfografia.id}` ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span className="text-emerald-700">Link copiado</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      <span>Copiar link</span>
                    </>
                  )}
                </button>
              </div>
              <WhatsAppShareButton
                label="Enviar por WhatsApp"
                text={`${selectedInfografia.title} — infografía MyoKine\n${SITE_URL}/infografias/${selectedInfografia.slug}`}
              />

              <div className="rounded-xl overflow-hidden border border-[#1D2433]/10 bg-[#F6F7F8]">
                <img
                  src={selectedInfografia.image}
                  alt={selectedInfografia.title}
                  className="w-full h-auto mx-auto"
                />
              </div>

              {(() => {
                const relatedArticles = SORTED_ARTICLES.filter((a) =>
                  selectedInfografia.relatedCategories.includes(a.categoryValue)
                ).slice(0, 3);
                if (relatedArticles.length === 0) return null;
                return (
                  <div className="pt-2 space-y-2">
                    <span className="text-[#0F5C4D] text-sm font-bold block">
                      Lee la evidencia detrás
                    </span>
                    {relatedArticles.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          window.location.hash = `#/articulo/${a.slug}`;
                        }}
                        className="w-full text-left p-3 rounded-xl border border-[#1D2433]/10 hover:border-[#0F5C4D] bg-[#F6F7F8]/50 text-sm font-display font-semibold text-[#1D2433] transition-colors cursor-pointer"
                      >
                        {a.title} <span className="text-[#0F5C4D]"></span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM POST GENERATOR MODAL */}
      <AnimatePresence>
        {instagramModalArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setInstagramModalArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              className="bg-[#1D2433] text-white border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 text-white rounded-xl">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white font-display">
                      Compartir en Instagram
                    </h3>
                    <p className="text-sm text-white/60">
                      Post cuadrado 1:1 para @myokinecl
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInstagramModalArticle(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-white/60 font-bold block">
                  Estilo (1080×1080)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    {
                      id: "terracotta",
                      name: "Terracotta",
                      bg: "bg-[#181616] border-[#0F5C4D] text-[#F5E663]",
                    },
                    {
                      id: "light",
                      name: "Claro",
                      bg: "bg-[#F6F7F8] border-[#0F5C4D] text-[#0F5C4D]",
                    },
                    {
                      id: "dark",
                      name: "Oscuro",
                      bg: "bg-[#14161c] border-zinc-600 text-zinc-200",
                    },
                    {
                      id: "gradient",
                      name: "Editorial",
                      bg: "bg-gradient-to-r from-[#2d1810] to-[#0F5C4D] border-[#FBF6C9] text-[#FBF6C9]",
                    },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() =>
                        setInstagramTheme(
                          theme.id as "terracotta" | "light" | "dark" | "gradient"
                        )
                      }
                      className={`p-2.5 rounded-xl border text-sm font-bold transition-all text-center cursor-pointer ${
                        theme.bg
                      } ${
                        instagramTheme === theme.id
                          ? "ring-2 ring-white"
                          : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`w-full max-w-[400px] aspect-square mx-auto rounded-2xl p-6 sm:p-8 flex flex-col justify-between border select-none ${
                  instagramTheme === "light"
                    ? "bg-[#F6F7F8] text-[#1D2433] border-[#0F5C4D]/40"
                    : instagramTheme === "dark"
                    ? "bg-[#14161c] text-zinc-100 border-zinc-700"
                    : instagramTheme === "gradient"
                    ? "bg-gradient-to-br from-[#2d1810] via-[#0F5C4D] to-[#120806] text-white border-[#FBF6C9]/40"
                    : "bg-[#181616] text-[#F6F7F8] border-[#0F5C4D]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-current/15 pb-3">
                    <span className="text-sm font-bold">
                      MYOKINE
                    </span>
                    <span className="text-[13px] font-bold opacity-65 truncate max-w-[160px]">
                      {instagramModalArticle.categoryLabel}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <span className="text-3xl font-display leading-none block opacity-40">
                      “
                    </span>
                    <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                      "{instagramModalArticle.pullQuote || instagramModalArticle.summary}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-current/15 space-y-1">
                  <p className="font-bold text-sm truncate">
                    {instagramModalArticle.title}
                  </p>
                  <div className="flex items-center justify-between text-[13px] opacity-70">
                    <span>Por Lukas · MyoKine</span>
                    <span>@myokinecl</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    downloadInstagramImage(instagramModalArticle, instagramTheme)
                  }
                  className="w-full py-3 px-4 bg-white/15 hover:bg-white/25 text-white border border-white/15 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar imagen</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const caption = getInstagramCaptionText(instagramModalArticle);
                    navigator.clipboard.writeText(caption).catch(() => {});
                    setInstagramCopied(true);
                    setTimeout(() => setInstagramCopied(false), 3000);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    instagramCopied
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                      : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                  }`}
                >
                  {instagramCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Caption copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar caption</span>
                    </>
                  )}
                </button>
              </div>

              {typeof navigator !== "undefined" && "share" in navigator && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: instagramModalArticle.title,
                        text: getInstagramCaptionText(instagramModalArticle),
                        url: getShareUrl(`#/articulo/${instagramModalArticle.slug}`),
                      });
                    } catch {}
                  }}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl text-sm font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir desde el dispositivo</span>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Footer */}
      <footer className="border-t border-[#1D2433]/10 bg-white/70 py-8 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-semibold text-[#1D2433]/55">
          <span>MyoKine · Dolor, fuerza y deporte basados en evidencia</span>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              type="button"
              onClick={() => navigateToTab("journal")}
              className="hover:text-[#0F5C4D] transition-colors cursor-pointer"
            >
              Journal
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("infografias")}
              className="hover:text-[#0F5C4D] transition-colors cursor-pointer"
            >
              Infografías
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("pizarra")}
              className="hover:text-[#0F5C4D] transition-colors cursor-pointer"
            >
              Pizarra
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("sobre-mi")}
              className="hover:text-[#0F5C4D] transition-colors cursor-pointer"
            >
              Sobre mí
            </button>
          </div>

          <span>© {new Date().getFullYear()} MyoKine</span>
        </div>
      </footer>
    </div>
  );
}
