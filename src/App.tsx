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
  ArrowRight,
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
import exercisePolypillImg from "./assets/images/exercise_polypill_1781741842587.jpg";

type TabType = "journal" | "infografias" | "academia" | "sobre-mi" | "biblioteca";
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

const SORTED_ARTICLES: Article[] = [...STATIC_ARTICLES].sort(
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
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

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

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
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
    let accentColor = "#e07a5f";
    let subTextColor = "rgba(255, 255, 255, 0.75)";
    let cardBg = "#1e1a19";
    let borderColor = "#8b3a2a";
    let pillBg = "#8b3a2a";
    let pillText = "#ffffff";

    if (theme === "light") {
      bgGradient = "#f7f4ef";
      textColor = "#0a0a0c";
      accentColor = "#8b3a2a";
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
      grad.addColorStop(0.5, "#8b3a2a");
      grad.addColorStop(1, "#120806");
      bgGradient = grad;
      textColor = "#ffffff";
      accentColor = "#f5e6d3";
      subTextColor = "rgba(255, 255, 255, 0.85)";
      cardBg = "rgba(0, 0, 0, 0.35)";
      borderColor = "#f5e6d3";
      pillBg = "#f5e6d3";
      pillText = "#141212";
    } else {
      const grad = ctx.createLinearGradient(0, 0, 0, 1080);
      grad.addColorStop(0, "#141212");
      grad.addColorStop(1, "#0a0808");
      bgGradient = grad;
      textColor = "#f9f6f0";
      accentColor = "#e07a5f";
      subTextColor = "rgba(249, 246, 240, 0.75)";
      cardBg = "#1e1a19";
      borderColor = "#8b3a2a";
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
        className="bg-white border border-[#0a0a0c]/10 rounded-xl p-6 hover:border-[#8b3a2a]/40 transition-colors cursor-pointer group flex flex-col justify-between gap-5"
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wider text-[#0a0a0c]/50">
            <span className="text-[#8b3a2a] truncate">{article.categoryLabel}</span>
            <span className="font-mono tabular-nums shrink-0">{article.date}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug text-[#0a0a0c] group-hover:text-[#8b3a2a] transition-colors">
            {article.title}
          </h3>

          {showSummary && (
            <p className="text-sm text-[#0a0a0c]/65 leading-relaxed font-sans line-clamp-1">
              {article.summary}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-[#0a0a0c]/8 flex items-center justify-between gap-3 text-xs font-semibold text-[#0a0a0c]/55">
          <span className="font-mono tabular-nums whitespace-nowrap">
            {article.readingTime} min
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => copyShareLink(shareHash, `art-${article.id}`, e)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] text-[#0a0a0c]/60 hover:text-[#0a0a0c] hover:bg-[#0a0a0c]/5 transition-colors cursor-pointer"
              title="Copiar link del artículo"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-700">Copiado</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => toggleBookmark(article.id, e)}
              className="p-1.5 rounded hover:bg-[#0a0a0c]/5 text-[#0a0a0c]/60 hover:text-[#8b3a2a] transition-colors cursor-pointer"
              aria-label={
                isBookmarked(article.id) ? "Quitar de biblioteca" : "Guardar en biblioteca"
              }
              title={
                isBookmarked(article.id) ? "Quitar de biblioteca" : "Guardar en biblioteca"
              }
            >
              {isBookmarked(article.id) ? (
                <BookmarkCheck className="w-4 h-4 text-[#8b3a2a] fill-[#8b3a2a]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            <span className="text-[#8b3a2a] font-bold group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
              Leer →
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#0a0a0c] font-sans flex flex-col selection:bg-[#8b3a2a] selection:text-white">
      {/* Compact Header (Max 64px height on mobile) */}
      <header className="h-16 border-b border-[#0a0a0c]/10 bg-[#f7f4ef]/95 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Clean Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateToTab("journal")}
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight uppercase text-[#0a0a0c] hover:text-[#8b3a2a] transition-colors cursor-pointer whitespace-nowrap"
          >
            MyoKine
          </button>

          {/* Desktop 4-item text navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#0a0a0c]/65"
          >
            {(
              [
                { id: "journal", label: "Journal" },
                { id: "infografias", label: "Infografías" },
                { id: "academia", label: "Academia" },
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
                      ? "text-[#0a0a0c] border-[#8b3a2a]"
                      : "border-transparent hover:text-[#8b3a2a]"
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
                  ? "text-[#8b3a2a] bg-[#8b3a2a]/10"
                  : "text-[#0a0a0c]/70 hover:text-[#8b3a2a] hover:bg-[#0a0a0c]/5"
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
              className="md:hidden p-2 rounded-lg text-[#0a0a0c]/80 hover:bg-[#0a0a0c]/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#f7f4ef] border-b border-[#0a0a0c]/10 px-4 py-3 flex items-center justify-between gap-2 shadow-sm">
            {(
              [
                { id: "journal", label: "Journal" },
                { id: "infografias", label: "Infografías" },
                { id: "academia", label: "Academia" },
                { id: "sobre-mi", label: "Sobre mí" },
              ] as { id: TabType; label: string }[]
            ).map((item) => {
              const isActive = activeTab === item.id && !selectedArticle;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToTab(item.id)}
                  className={`text-[11px] font-semibold uppercase tracking-wider py-1.5 px-2 rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#8b3a2a] bg-[#8b3a2a]/10"
                      : "text-[#0a0a0c]/70 hover:text-[#0a0a0c]"
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
            className="max-w-3xl mx-auto bg-white border border-[#0a0a0c]/10 rounded-2xl p-6 sm:p-12 lg:p-14 shadow-sm"
            id="article-view-workspace"
          >
            {/* Back button */}
            <button
              type="button"
              onClick={closeArticle}
              className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0a0a0c]/55 hover:text-[#8b3a2a] transition-colors py-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Volver al Journal</span>
            </button>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] uppercase font-semibold tracking-widest text-[#8b3a2a] mb-4">
              <span>{selectedArticle.categoryLabel}</span>
              <span className="text-[#0a0a0c]/30">·</span>
              <span className="font-mono text-[#0a0a0c]/55 tabular-nums">
                {selectedArticle.date}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.12] text-[#0a0a0c] tracking-tight mb-6">
              {selectedArticle.title}
            </h1>

            {/* En 15 segundos (Right below title) */}
            <div className="mb-8 p-5 sm:p-6 bg-[#f7f4ef] border border-[#0a0a0c]/10 rounded-xl space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#8b3a2a] block">
                En 15 segundos
              </span>
              <p className="text-base sm:text-lg font-serif text-[#0a0a0c]/85 leading-relaxed">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Byline & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#0a0a0c]/10 text-xs text-[#0a0a0c]/60 font-semibold uppercase tracking-wider mb-10">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0a0a0c]/15 bg-[#f7f4ef]/60 hover:bg-[#f7f4ef] text-[#0a0a0c]/80 transition-colors cursor-pointer"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0a0a0c]/15 hover:border-[#8b3a2a]/40 hover:text-[#8b3a2a] transition-colors cursor-pointer"
                >
                  {isBookmarked(selectedArticle.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#8b3a2a] fill-[#8b3a2a]" />
                      <span className="text-[#8b3a2a]">Guardado</span>
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

            {/* Hallazgo Clave + Neutral Instagram Share */}
            {selectedArticle.pullQuote && (
              <div className="my-10 p-6 sm:p-8 bg-[#f7f4ef]/70 border-l-2 border-[#8b3a2a] rounded-r-xl relative">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#8b3a2a]">
                    Hallazgo Clave
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInstagramModalArticle(selectedArticle);
                      setInstagramCopied(false);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#0a0a0c]/5 text-[#0a0a0c]/80 border border-[#0a0a0c]/15 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    title="Crear publicación para Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Compartir en Instagram</span>
                  </button>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-[#0a0a0c] leading-relaxed">
                  "{selectedArticle.pullQuote}"
                </p>
                <span className="text-xs text-[#0a0a0c]/50 block mt-3 text-right">
                  — MyoKine
                </span>
              </div>
            )}

            {/* Full Markdown Content (Unaltered prose) */}
            <div className="prose prose-stone max-w-none">
              <MarkdownRenderer content={selectedArticle.content} />
            </div>

            {/* Scientific References */}
            {selectedArticle.references && selectedArticle.references.length > 0 && (
              <div
                className="mt-14 pt-10 border-t border-[#0a0a0c]/10"
                id="article-references"
              >
                <span className="text-[#8b3a2a] uppercase text-[11px] font-bold tracking-[0.18em] mb-2 block">
                  Referencias científicas
                </span>
                <p className="text-xs font-serif italic text-[#0a0a0c]/55 mb-4">
                  Todo lo mencionado en este artículo está respaldado por las siguientes publicaciones originales.
                </p>
                <div className="space-y-3">
                  {selectedArticle.references.map((ref, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-[#f7f4ef]/60 p-4 rounded-xl border border-[#0a0a0c]/8 text-xs sm:text-sm"
                    >
                      <div className="font-bold text-[#0a0a0c] mb-1 font-serif">
                        {ref.title}
                      </div>
                      <div className="text-[#0a0a0c]/75">
                        {ref.author} ({ref.year}).{" "}
                        <span className="italic">{ref.journal}</span>
                      </div>
                      {ref.doi && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-[#0a0a0c]/50">
                            DOI:
                          </span>
                          <a
                            href={`https://doi.org/${ref.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[#8b3a2a] hover:underline break-all"
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
            <div className="mt-12 p-5 sm:p-6 bg-[#f7f4ef] rounded-xl border border-[#0a0a0c]/10 text-xs sm:text-sm">
              <div className="flex gap-3.5 items-start">
                <Info className="w-4 h-4 text-[#8b3a2a] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block text-[#0a0a0c]">
                    Nota clínica
                  </span>
                  <p className="text-[#0a0a0c]/75 leading-relaxed">
                    Este contenido es informativo y busca acercar la evidencia científica actual. No reemplaza una evaluación kinesiológica o médica presencial individualizada.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#0a0a0c]/10 flex flex-wrap justify-between items-center gap-4">
              <button
                type="button"
                onClick={closeArticle}
                className="bg-[#0a0a0c] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#8b3a2a] transition-colors uppercase tracking-widest cursor-pointer"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#0a0a0c]/15 text-xs font-bold uppercase tracking-widest text-[#0a0a0c]/75 hover:border-[#8b3a2a] hover:text-[#8b3a2a] transition-colors cursor-pointer"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>
                  {copiedId === `bottom-${selectedArticle.id}`
                    ? "Link copiado"
                    : "Copiar link"}
                </span>
              </button>
            </div>
          </article>
        )}

        {/* VIEW 1: PORTADA / JOURNAL */}
        {activeTab === "journal" && !selectedArticle && (
          <div className="space-y-14">
            {/* 1. HERO */}
            <section className="bg-white border border-[#0a0a0c]/10 rounded-2xl p-6 sm:p-12 lg:p-16">
              <div className="max-w-3xl space-y-6">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.03] tracking-tight text-[#0a0a0c]">
                  ¿Y si tu cuerpo no estuviera{" "}
                  <span className="italic text-[#8b3a2a]">
                    dañado, sino sobreprotegido?
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-[#0a0a0c]/75 font-serif leading-relaxed">
                  Dolor, fuerza y deporte explicados con evidencia y sin dogmas. Por Lukas, kinesiólogo.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  <button
                    type="button"
                    onClick={() => handleAudienceChoice("paciente")}
                    className={`px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-all border text-left flex items-center justify-between gap-3 cursor-pointer ${
                      audienceFilter === "paciente"
                        ? "bg-[#8b3a2a] text-white border-[#8b3a2a] shadow-sm"
                        : "bg-[#0a0a0c] text-white border-[#0a0a0c] hover:bg-[#8b3a2a] hover:border-[#8b3a2a]"
                    }`}
                  >
                    <span>Quiero entender mi dolor</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAudienceChoice("clinico")}
                    className={`px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-all border text-left flex items-center justify-between gap-3 cursor-pointer ${
                      audienceFilter === "clinico"
                        ? "bg-[#8b3a2a] text-white border-[#8b3a2a] shadow-sm"
                        : "bg-white text-[#0a0a0c] border-[#0a0a0c]/20 hover:border-[#8b3a2a] hover:text-[#8b3a2a]"
                    }`}
                  >
                    <span>Soy profesional de la salud</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </section>

            {/* 2. LO ÚLTIMO (Top 3 most recent articles) */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#0a0a0c]/10 pb-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0a0a0c]">
                  Lo último
                </h2>
                <span className="text-xs font-mono text-[#0a0a0c]/50 uppercase tracking-wider">
                  Publicaciones recientes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestThreeArticles.map((article) => renderArticleCard(article))}
              </div>
            </section>

            {/* 3. FULL LISTING WITH COMPACT TOPIC FILTER */}
            <section
              ref={catalogSectionRef}
              id="listado-articulos"
              className="space-y-6 scroll-mt-20"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0a0a0c]/10 pb-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0a0a0c]">
                    Todos los artículos
                  </h2>
                  <p className="text-xs text-[#0a0a0c]/55 mt-1 font-mono tabular-nums">
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
                    className="self-start sm:self-auto text-xs font-bold uppercase tracking-wider text-[#8b3a2a] hover:underline cursor-pointer"
                  >
                    Limpiar filtros ×
                  </button>
                )}
              </div>

              {/* Compact Horizontal Scrollable Topic Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => handleTopicSelect(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors shrink-0 cursor-pointer ${
                    selectedTopic === null
                      ? "bg-[#0a0a0c] text-white border-[#0a0a0c]"
                      : "bg-white text-[#0a0a0c]/70 border-[#0a0a0c]/15 hover:border-[#8b3a2a] hover:text-[#8b3a2a]"
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors shrink-0 cursor-pointer ${
                      selectedTopic === topic.value
                        ? "bg-[#8b3a2a] text-white border-[#8b3a2a]"
                        : "bg-white text-[#0a0a0c]/70 border-[#0a0a0c]/15 hover:border-[#8b3a2a] hover:text-[#8b3a2a]"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              {filteredCatalogArticles.length === 0 ? (
                <div className="bg-white border border-[#0a0a0c]/10 rounded-xl p-10 text-center space-y-3">
                  <p className="font-serif text-lg text-[#0a0a0c]/75">
                    No hay artículos que coincidan con esta combinación de filtros.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAudienceFilter("todos");
                      setSelectedTopic(null);
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#8b3a2a] hover:underline cursor-pointer"
                  >
                    Ver todos los artículos
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCatalogArticles.map((article) =>
                    renderArticleCard(article)
                  )}
                </div>
              )}
            </section>

            {/* 4. SIMPLE NEWSLETTER BLOCK (No Google Auth, no backend) */}
            <section className="bg-white border border-[#0a0a0c]/10 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-lg">
                <div className="flex items-center gap-2 text-[#8b3a2a]">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Newsletter
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#0a0a0c]">
                  Recibe nuevos artículos e infografías en tu correo
                </h3>
                <p className="text-sm text-[#0a0a0c]/65">
                  Lecturas cortas sobre dolor, movimiento y ciencia clínica sin ruido ni spam.
                </p>
              </div>

              <div className="w-full md:w-auto md:min-w-[360px]">
                {newsletterSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#f7f4ef] border border-[#0a0a0c]/10 text-sm font-medium text-[#0a0a0c] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8b3a2a] shrink-0" />
                    <span>Gracias, te escribiré pronto.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      aria-label="Tu correo electrónico"
                      className="flex-1 bg-[#f7f4ef]/70 border border-[#0a0a0c]/15 rounded-xl px-4 py-3 text-sm text-[#0a0a0c] placeholder:text-[#0a0a0c]/40 focus:outline-none focus:border-[#8b3a2a] focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#0a0a0c] hover:bg-[#8b3a2a] text-white text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Suscribirme
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: INFOGRAFÍAS */}
        {activeTab === "infografias" && !selectedArticle && (
          <div className="space-y-10" id="infografias-workspace">
            <div className="border-b border-[#0a0a0c]/10 pb-6 space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#0a0a0c] tracking-tight">
                Infografías clínicas
              </h1>
              <p className="text-sm sm:text-base text-[#0a0a0c]/65 max-w-2xl">
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                    selectedInfografiaTopic === topic
                      ? "bg-[#0a0a0c] text-white border-[#0a0a0c]"
                      : "bg-white text-[#0a0a0c]/70 border-[#0a0a0c]/15 hover:border-[#8b3a2a] hover:text-[#8b3a2a]"
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
                    className="bg-white border border-[#0a0a0c]/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => openInfografiaModal(item)}
                        className="aspect-[3/4] bg-[#f7f4ef] overflow-hidden cursor-pointer border-b border-[#0a0a0c]/8"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>

                      <div className="p-5 space-y-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8b3a2a] block">
                          {item.topic}
                        </span>
                        <h2
                          onClick={() => openInfografiaModal(item)}
                          className="font-serif text-lg font-semibold text-[#0a0a0c] leading-snug cursor-pointer hover:text-[#8b3a2a] transition-colors"
                        >
                          {item.title}
                        </h2>
                        <p className="text-xs text-[#0a0a0c]/65 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => downloadInfografia(item, e)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0a0a0c] hover:bg-[#8b3a2a] text-white text-xs font-semibold transition-colors cursor-pointer"
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
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#0a0a0c]/15 bg-white hover:bg-[#0a0a0c]/5 text-[#0a0a0c]/80 text-xs font-semibold transition-colors cursor-pointer"
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
        {activeTab === "academia" && !selectedArticle && (
          <div
            className="max-w-3xl mx-auto space-y-8"
            id="duolingo-academia"
          >
            {/* Status Bar */}
            <div className="bg-white border border-[#0a0a0c]/10 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 select-none">
              <div>
                <h1 className="font-serif text-xl font-bold text-[#0a0a0c]">
                  Academia MyoKine
                </h1>
                <p className="text-[11px] text-[#0a0a0c]/55 font-semibold uppercase tracking-wider">
                  Quiz clínico · 6 preguntas
                </p>
              </div>

              <div className="flex-1 min-w-[140px] sm:max-w-xs px-2">
                <div className="flex justify-between items-center text-[11px] text-[#0a0a0c]/55 font-bold mb-1 uppercase tracking-wider">
                  <span>Progreso</span>
                  <span className="font-mono tabular-nums">
                    {currentTriviaIndex + 1} / {triviaQuestions.length}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0a0c]/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8b3a2a] rounded-full transition-all duration-300"
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
                          ? "text-[#8b3a2a] fill-[#8b3a2a]"
                          : "text-[#0a0a0c]/15"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setTriviaAudioEnabled(!triviaAudioEnabled)}
                  className="p-2 rounded-lg border border-[#0a0a0c]/10 text-[#0a0a0c]/60 hover:text-[#0a0a0c] transition-colors cursor-pointer"
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

            <div className="bg-white/70 border border-[#0a0a0c]/10 rounded-xl px-5 py-3.5 text-sm font-serif italic text-[#0a0a0c]/75">
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
                  <h2 className="font-serif text-2xl font-bold text-[#0a0a0c]">
                    Sin corazones disponibles
                  </h2>
                  <p className="text-sm text-[#0a0a0c]/70 max-w-md mx-auto">
                    Obtuviste {triviaScore} de {triviaQuestions.length} respuestas correctas.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetTrivia}
                    className="bg-[#0a0a0c] text-white font-semibold text-xs uppercase tracking-widest px-7 py-3 rounded-full hover:bg-[#8b3a2a] transition-colors inline-flex items-center gap-2 cursor-pointer"
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
                  className="bg-white border border-[#0a0a0c]/10 rounded-2xl p-6 sm:p-10 text-center space-y-6"
                >
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#8b3a2a]">
                    Desafío completado
                  </h2>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="bg-[#f7f4ef] rounded-xl p-4">
                      <span className="text-[10px] uppercase font-bold text-[#0a0a0c]/50 block">
                        Acierto
                      </span>
                      <span className="font-serif text-xl font-bold text-[#0a0a0c] tabular-nums">
                        {Math.round((triviaScore / triviaQuestions.length) * 100)}%
                      </span>
                    </div>
                    <div className="bg-[#f7f4ef] rounded-xl p-4">
                      <span className="text-[10px] uppercase font-bold text-[#0a0a0c]/50 block">
                        Puntos
                      </span>
                      <span className="font-serif text-xl font-bold text-[#0a0a0c] tabular-nums">
                        {triviaScore} / {triviaQuestions.length}
                      </span>
                    </div>
                    <div className="bg-[#f7f4ef] rounded-xl p-4">
                      <span className="text-[10px] uppercase font-bold text-[#0a0a0c]/50 block">
                        Racha
                      </span>
                      <span className="font-serif text-xl font-bold text-[#8b3a2a] tabular-nums">
                        {triviaStreak}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetTrivia}
                      className="bg-[#8b3a2a] text-white font-semibold text-xs uppercase tracking-widest px-7 py-3 rounded-full hover:bg-[#722f22] transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Volver a jugar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToTab("journal")}
                      className="bg-white border border-[#0a0a0c]/15 text-[#0a0a0c] font-semibold text-xs uppercase tracking-widest px-7 py-3 rounded-full hover:border-[#8b3a2a] transition-colors cursor-pointer"
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
                      <div className="bg-white border border-[#0a0a0c]/10 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold uppercase tracking-wider text-[#8b3a2a]">
                            {q.pilarLabel}
                          </span>
                          <span className="font-mono text-[#0a0a0c]/45 tabular-nums">
                            {currentTriviaIndex + 1} de {triviaQuestions.length}
                          </span>
                        </div>

                        <h2 className="font-serif text-xl sm:text-2xl text-[#0a0a0c] font-semibold leading-snug">
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
                              "border-[#0a0a0c]/12 bg-white hover:border-[#8b3a2a]/40";
                            let badgeStyle =
                              "border-[#0a0a0c]/15 text-[#0a0a0c]/70 bg-[#f7f4ef]";

                            if (isSelected) {
                              optionStyle =
                                "border-2 border-[#8b3a2a] bg-[#8b3a2a]/[0.03]";
                              badgeStyle =
                                "bg-[#8b3a2a] text-white border-[#8b3a2a]";
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
                                  "border-[#0a0a0c]/8 bg-white opacity-60";
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
                                  className={`w-6 h-6 rounded-md border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${badgeStyle}`}
                                >
                                  {opt.key}
                                </span>
                                <p className="text-sm text-[#0a0a0c]/85 leading-relaxed">
                                  {opt.text}
                                </p>
                              </button>
                            );
                          })}
                        </div>

                        {triviaStatus === "playing" && (
                          <div className="flex justify-end pt-2 border-t border-[#0a0a0c]/8">
                            <button
                              type="button"
                              disabled={!selectedTriviaOption}
                              onClick={handleVerifyTriviaAnswer}
                              className={`px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 transition-colors ${
                                selectedTriviaOption
                                  ? "bg-[#0a0a0c] hover:bg-[#8b3a2a] text-white cursor-pointer"
                                  : "bg-[#0a0a0c]/10 text-[#0a0a0c]/35 cursor-not-allowed"
                              }`}
                            >
                              <span>Comprobar respuesta</span>
                              <ArrowRight className="w-4 h-4" />
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
                              <h3 className="font-serif text-base font-bold text-[#0a0a0c]">
                                {triviaStatus === "correct"
                                  ? "Correcto."
                                  : `Incorrecto. La respuesta correcta es ${q.correctKey}.`}
                              </h3>
                              <p className="text-[11px] font-mono text-[#0a0a0c]/60">
                                {q.evidenceLevel}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-[#0a0a0c]/85 leading-relaxed">
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
                                  className="text-xs font-bold text-[#8b3a2a] hover:underline flex items-center gap-1.5 cursor-pointer"
                                >
                                  <BookOpen className="w-4 h-4" />
                                  <span>Leer artículo: {q.linkedArticleTitle}</span>
                                </button>
                              );
                            })()}

                            <button
                              type="button"
                              onClick={handleNextTriviaQuestion}
                              className="px-7 py-2.5 rounded-full bg-[#0a0a0c] hover:bg-[#8b3a2a] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
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
            className="max-w-3xl mx-auto bg-white border border-[#0a0a0c]/10 rounded-2xl p-6 sm:p-12 lg:p-14 space-y-10"
            id="about-workspace"
          >
            <div className="space-y-2 border-b border-[#0a0a0c]/10 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8b3a2a] block">
                Sobre mí
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#0a0a0c] font-medium tracking-tight">
                Lukas · Kinesiólogo y creador de MyoKine
              </h1>
            </div>

            <div className="space-y-6 text-[#0a0a0c]/85 leading-[1.8] text-base font-sans">
              <p>
                MyoKine nace con una idea directa: <strong>la evidencia disponible hoy es el mejor mapa que tenemos, pero nunca el territorio definitivo.</strong> Un buen ensayo clínico o una revisión rigurosa puede obligarnos a actualizar lo que ayer dábamos por sentado.
              </p>

              <blockquote className="border-l-2 border-[#8b3a2a] pl-4 py-1.5 italic font-serif text-[#8b3a2a] bg-[#f7f4ef] text-lg">
                "No me interesa entregar certezas dogmáticas; prefiero traducir la ciencia del movimiento con honestidad para quienes sienten dolor y para colegas que buscan razonar mejor."
              </blockquote>

              <div className="pt-6 border-t border-[#0a0a0c]/10 space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0a0a0c] font-semibold tracking-tight">
                  ¿Por qué MyoKine?
                </h2>

                <p>
                  Las mioquinas son señales. Proteínas que el músculo libera cuando se contrae, que viajan por el cuerpo y afectan órganos que aparentemente no tienen nada que ver con el movimiento: el cerebro, el hígado, el tejido adiposo, el sistema inmune. Durante décadas asumimos que el músculo era solo un motor. Resultó que también es un órgano endocrino que conversa con todo lo demás.
                </p>

                <div className="my-6 space-y-3">
                  <div className="border border-[#0a0a0c]/10 rounded-xl overflow-hidden bg-[#f7f4ef]/50 p-3 sm:p-4">
                    <img
                      src={exercisePolypillImg}
                      alt="Exercise is the real polypill"
                      className="w-full h-auto rounded-lg max-h-[460px] object-contain mx-auto"
                    />
                  </div>
                  <p className="text-xs text-[#0a0a0c]/60 font-serif italic text-center">
                    <strong>Figura 1.</strong> “Exercise is the real polypill” (Fiuza-Luces, C. et al., 2013).
                  </p>
                </div>

                <p className="border-l-2 border-[#8b3a2a] pl-4 py-1 font-serif italic text-[#0a0a0c]/80">
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

              <p className="border-t border-[#0a0a0c]/10 pt-6 font-serif italic text-sm text-[#8b3a2a] text-right">
                — Lukas · MyoKine
              </p>
            </div>
          </div>
        )}

        {/* VIEW 5: BIBLIOTECA */}
        {activeTab === "biblioteca" && !selectedArticle && (
          <div className="space-y-8" id="library-workspace">
            <div className="border-b border-[#0a0a0c]/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="font-serif text-3xl text-[#0a0a0c] font-medium tracking-tight">
                  Biblioteca guardada
                </h1>
                <p className="text-sm text-[#0a0a0c]/65 mt-1">
                  Artículos guardados en este dispositivo para consultarlos cuando quieras.
                </p>
              </div>
              <span className="text-xs font-mono text-[#0a0a0c]/55 tabular-nums">
                {bookmarkedArticles.length}{" "}
                {bookmarkedArticles.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>

            {bookmarkedArticles.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#0a0a0c]/10 rounded-2xl max-w-lg mx-auto p-8 space-y-4">
                <Bookmark className="w-10 h-10 text-[#8b3a2a]/40 mx-auto" />
                <h2 className="font-serif text-lg text-[#0a0a0c]/85">
                  Aún no tienes artículos guardados
                </h2>
                <p className="text-sm text-[#0a0a0c]/60">
                  Usa el ícono de marcador en cualquier publicación del Journal para guardarla aquí.
                </p>
                <button
                  type="button"
                  onClick={() => navigateToTab("journal")}
                  className="bg-[#0a0a0c] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#8b3a2a] transition-colors uppercase tracking-widest cursor-pointer"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
            onClick={closeInfografiaModal}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-[#0a0a0c]/15 rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 my-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8b3a2a] block">
                    {selectedInfografia.topic}
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-[#0a0a0c] mt-0.5">
                    {selectedInfografia.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeInfografiaModal}
                  className="p-1.5 rounded-lg hover:bg-[#0a0a0c]/5 text-[#0a0a0c]/60 hover:text-[#0a0a0c] cursor-pointer"
                  aria-label="Cerrar vista previa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#0a0a0c]/10 bg-[#f7f4ef]">
                <img
                  src={selectedInfografia.image}
                  alt={selectedInfografia.title}
                  className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                />
              </div>

              <p className="text-xs sm:text-sm text-[#0a0a0c]/70 leading-relaxed">
                {selectedInfografia.description}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={(e) => downloadInfografia(selectedInfografia, e)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a0a0c] hover:bg-[#8b3a2a] text-white text-xs font-semibold transition-colors cursor-pointer"
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
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#0a0a0c]/15 bg-white hover:bg-[#0a0a0c]/5 text-[#0a0a0c] text-xs font-semibold transition-colors cursor-pointer"
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
              className="bg-[#0a0a0c] text-white border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 text-white rounded-xl">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white font-serif">
                      Compartir en Instagram
                    </h3>
                    <p className="text-xs text-white/60">
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
                <span className="text-xs font-mono uppercase tracking-wider text-white/60 font-bold block">
                  Estilo (1080×1080)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    {
                      id: "terracotta",
                      name: "Terracotta",
                      bg: "bg-[#181616] border-[#8b3a2a] text-[#e07a5f]",
                    },
                    {
                      id: "light",
                      name: "Claro",
                      bg: "bg-[#f7f4ef] border-[#8b3a2a] text-[#8b3a2a]",
                    },
                    {
                      id: "dark",
                      name: "Oscuro",
                      bg: "bg-[#14161c] border-zinc-600 text-zinc-200",
                    },
                    {
                      id: "gradient",
                      name: "Editorial",
                      bg: "bg-gradient-to-r from-[#2d1810] to-[#8b3a2a] border-[#f5e6d3] text-[#f5e6d3]",
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
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
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
                    ? "bg-[#f7f4ef] text-[#0a0a0c] border-[#8b3a2a]/40"
                    : instagramTheme === "dark"
                    ? "bg-[#14161c] text-zinc-100 border-zinc-700"
                    : instagramTheme === "gradient"
                    ? "bg-gradient-to-br from-[#2d1810] via-[#8b3a2a] to-[#120806] text-white border-[#f5e6d3]/40"
                    : "bg-[#181616] text-[#f9f6f0] border-[#8b3a2a]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-current/15 pb-3">
                    <span className="text-[11px] font-bold tracking-widest uppercase">
                      MYOKINE
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-65 truncate max-w-[160px]">
                      {instagramModalArticle.categoryLabel}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <span className="text-3xl font-serif leading-none block opacity-40">
                      “
                    </span>
                    <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                      "{instagramModalArticle.pullQuote || instagramModalArticle.summary}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-current/15 space-y-1">
                  <p className="font-bold text-xs truncate">
                    {instagramModalArticle.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] opacity-70 font-mono">
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
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
      <footer className="border-t border-[#0a0a0c]/10 bg-white/70 py-8 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase font-semibold tracking-[0.16em] text-[#0a0a0c]/55">
          <span>MyoKine · Dolor, fuerza y deporte basados en evidencia</span>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              type="button"
              onClick={() => navigateToTab("journal")}
              className="hover:text-[#8b3a2a] transition-colors cursor-pointer"
            >
              Journal
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("infografias")}
              className="hover:text-[#8b3a2a] transition-colors cursor-pointer"
            >
              Infografías
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("academia")}
              className="hover:text-[#8b3a2a] transition-colors cursor-pointer"
            >
              Academia
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("sobre-mi")}
              className="hover:text-[#8b3a2a] transition-colors cursor-pointer"
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
