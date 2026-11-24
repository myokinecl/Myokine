import { Instagram, MessageCircle, Dumbbell, HeartPulse, Stethoscope, GraduationCap } from "lucide-react";

export const WHATSAPP_NUMBER = "56998520291";
export const INSTAGRAM_URL = "https://www.instagram.com/myokinecl/";
export const SITE_URL = "https://myokine.web.app";

export const whatsappContactUrl = (message = "Hola Lukas, vi MyoKine y quería consultarte por ") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Link para compartir cualquier texto por WhatsApp (elige el contacto quien comparte). */
export const whatsappShareUrl = (text: string) =>
  `https://wa.me/?text=${encodeURIComponent(text)}`;

export const SERVICES = [
  {
    icon: Dumbbell,
    title: "Entrenamiento kinésico",
    desc: "Fuerza y acondicionamiento guiados por un kinesiólogo, para moverte mejor, rendir más y volver a lo que te gusta.",
  },
  {
    icon: HeartPulse,
    title: "Rehabilitación aguda",
    desc: "Acompañamiento desde los primeros días de una lesión, con educación clara y carga progresiva.",
  },
  {
    icon: Stethoscope,
    title: "Pre y post operatorio",
    desc: "Preparación antes de una cirugía y rehabilitación después, con objetivos medibles en cada etapa.",
  },
];

export function ContactButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-2.5 ${compact ? "" : "w-full md:w-auto"}`}>
      <a
        href={whatsappContactUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1D2433] hover:bg-[#0F5C4D] text-white text-sm font-semibold transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Escríbeme por WhatsApp
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#1D2433]/15 hover:border-[#0F5C4D] hover:text-[#0F5C4D] text-[#1D2433] text-sm font-semibold transition-colors bg-white"
      >
        <Instagram className="w-4 h-4" />
        @myokinecl
      </a>
    </div>
  );
}

/** Bloque de contacto para la portada (reemplaza al newsletter). */
export function ContactBlock({ onServices }: { onServices?: () => void }) {
  return (
    <section className="bg-white border border-[#1D2433]/10 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1.5 max-w-lg">
        <span className="text-sm font-bold text-[#0F5C4D]">
          ¿Conversamos?
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-medium text-[#1D2433]">
          Entrenamiento y rehabilitación
        </h3>
        <p className="text-sm text-[#1D2433]/65">
          Si tienes dolor, una lesión o una cirugía por delante, o eres estudiante y quieres razonar mejor, escríbeme.
        </p>
        {onServices && (
          <button
            type="button"
            onClick={onServices}
            className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-[#0F5C4D] hover:underline cursor-pointer"
          >
            Ver lo que ofrezco
          </button>
        )}
      </div>
      <ContactButtons />
    </section>
  );
}

/** Servicios + contacto para la sección Sobre mí. */
export function ServicesSection() {
  return (
    <div className="pt-6 border-t border-[#1D2433]/10 space-y-6" id="servicios">
      <h2 className="font-display text-2xl sm:text-3xl text-[#1D2433] font-semibold tracking-tight">
        Cómo puedo ayudarte
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-xl border border-[#1D2433]/10 bg-[#F6F7F8]/60 p-5 space-y-2">
            <s.icon className="w-5 h-5 text-[#0F5C4D]" />
            <h3 className="font-display text-lg font-semibold text-[#1D2433]">{s.title}</h3>
            <p className="text-sm text-[#1D2433]/70 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-[#1D2433] text-white p-6 space-y-4">
        <p className="font-serif text-lg">¿Te interesa alguno? Escríbeme y vemos si te puedo ayudar.</p>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <a
            href={whatsappContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F5C4D] hover:bg-[#0B4A3E] text-white text-sm font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/25 hover:border-white text-white text-sm font-semibold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @myokinecl
          </a>
        </div>
      </div>
    </div>
  );
}

/** Botón para compartir un contenido por WhatsApp. */
export function WhatsAppShareButton({ text, label = "Enviar por WhatsApp" }: { text: string; label?: string }) {
  return (
    <a
      href={whatsappShareUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#1D2433]/15 hover:border-[#0F5C4D] hover:text-[#0F5C4D] text-[#1D2433] text-sm sm:text-sm font-semibold transition-colors bg-white"
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  );
}
