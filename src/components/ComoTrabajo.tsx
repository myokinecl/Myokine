import { whatsappContactUrl } from "./Contacto";

type Step = { title: string; desc: string };

const ATENCION: Step[] = [
  {
    title: "Me escribes",
    desc: "Por WhatsApp o Instagram me cuentas qué te pasa y qué te gustaría lograr. Vemos juntos si te puedo ayudar o si conviene que te vea otro profesional.",
  },
  {
    title: "Primera sesión: evaluación",
    desc: "Conversamos sobre tu historia, lo que te preocupa y tus objetivos. Hacemos un examen físico y te explico en palabras simples qué está pasando. Salimos con un plan claro.",
  },
  {
    title: "Sesiones de trabajo",
    desc: "Ejercicio con progresión real, educación y ajustes según cómo respondes. Medimos tu avance con objetivos concretos, no solo con el dolor.",
  },
  {
    title: "Alta y autonomía",
    desc: "La meta es que no me necesites. Te vas con un plan para seguir por tu cuenta y una estrategia para manejar las crisis si aparecen.",
  },
];

const MENTORIA: Step[] = [
  {
    title: "Conversación inicial",
    desc: "Me cuentas en qué etapa estás (ramos clínicos, práctica, internado), qué te cuesta y qué quieres lograr. Con eso armamos un plan a tu medida.",
  },
  {
    title: "Plan de temas",
    desc: "Elegimos los temas que más te sirven en este momento (abajo tienes ejemplos) y los ordenamos según tus prioridades.",
  },
  {
    title: "Sesiones con casos",
    desc: "Trabajamos con casos clínicos y papers reales. Cada sesión termina con una tarea corta para aplicar lo visto.",
  },
  {
    title: "Seguimiento",
    desc: "Revisamos cómo te fue en la práctica, ajustamos el plan y resolvemos dudas que vayan apareciendo.",
  },
];

const TEMAS_MENTORIA = [
  "Razonamiento clínico paso a paso",
  "Cómo leer un paper sin perderse",
  "Anamnesis, banderas rojas y cuestionarios",
  "Prescripción de ejercicio y dosificación de carga",
  "Cómo explicarle el dolor a un paciente",
  "Preparación para práctica e internado",
];

const LO_QUE_VIENE = [
  { title: "Kits clínicos para profesionales", desc: "Guías de 2 a 3 páginas por condición: evaluación, cuestionarios, tratamiento y qué decirle al paciente. Ya está disponible el de dolor lumbar; pídelo por mensaje directo." },
  { title: "Perlas clínicas de charlas internacionales", desc: "Lo más útil de charlas de clínicos e investigadores de referencia, resumido en español y con el video original." },
  { title: "Más infografías para pacientes", desc: "Nuevos temas para que puedas explicar y enviar en un minuto." },
];

function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid sm:grid-cols-2 gap-3">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-xl border border-[#1D2433]/10 bg-white p-5 space-y-1.5">
          <span className="text-sm font-bold text-[#0F5C4D]">Paso {i + 1}</span>
          <h4 className="font-display text-lg font-semibold text-[#1D2433]">{s.title}</h4>
          <p className="text-sm text-[#1D2433]/70 leading-relaxed">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function ComoTrabajo() {
  return (
    <div className="space-y-10">
      <div className="pt-6 border-t border-[#1D2433]/10 space-y-4" id="como-trabajo">
        <h2 className="font-display text-2xl sm:text-3xl text-[#1D2433] font-semibold tracking-tight">
          Si quieres atenderte conmigo
        </h2>
        <p className="text-sm text-[#1D2433]/70">Así es el proceso, desde el primer mensaje hasta el alta.</p>
        <Steps steps={ATENCION} />
        <a
          href={whatsappContactUrl("Hola Lukas, me gustaría agendar una evaluación. Te cuento lo que me pasa: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1D2433] hover:bg-[#0F5C4D] text-white text-sm font-semibold transition-colors"
        >
          Quiero agendar una evaluación
        </a>
      </div>

      <div className="pt-6 border-t border-[#1D2433]/10 space-y-4" id="mentoria">
        <h2 className="font-display text-2xl sm:text-3xl text-[#1D2433] font-semibold tracking-tight">
          Mentoría para estudiantes de kinesiología
        </h2>
        <p className="text-sm text-[#1D2433]/70">
          Para estudiantes de pregrado que quieren razonar mejor, leer evidencia con criterio y llegar más seguros a la práctica.
        </p>
        <Steps steps={MENTORIA} />
        <div className="rounded-xl bg-[#F6F7F8] border border-[#1D2433]/10 p-5 space-y-2">
          <h4 className="font-display text-lg font-semibold text-[#1D2433]">Temas que podemos trabajar</h4>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-[#1D2433]/80 list-disc pl-5">
            {TEMAS_MENTORIA.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <a
          href={whatsappContactUrl("Hola Lukas, soy estudiante de kinesiología y me interesa la mentoría. Estoy en: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1D2433] hover:bg-[#0F5C4D] text-white text-sm font-semibold transition-colors"
        >
          Me interesa la mentoría
        </a>
      </div>

      <div className="pt-6 border-t border-[#1D2433]/10 space-y-4" id="lo-que-viene">
        <h2 className="font-display text-2xl sm:text-3xl text-[#1D2433] font-semibold tracking-tight">
          Lo que viene en MyoKine
        </h2>
        <div className="space-y-3">
          {LO_QUE_VIENE.map((x) => (
            <div key={x.title} className="flex gap-3">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#0F5C4D] shrink-0" />
              <div>
                <h4 className="font-display text-base font-semibold text-[#1D2433]">{x.title}</h4>
                <p className="text-sm text-[#1D2433]/70 leading-relaxed">{x.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
