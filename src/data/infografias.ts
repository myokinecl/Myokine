import infografiaLumbarImg from '../assets/images/infografia_dolor_lumbar_1795172932709.jpg';
import infografiaTendonImg from '../assets/images/infografia_carga_tendon_1795172932649.jpg';
import infografiaAlarmaImg from '../assets/images/infografia_sistema_alarma_1795172934634.jpg';

export interface Infografia {
  id: string;
  slug: string;
  title: string;
  topic: string;
  image: string;
  description: string;
  downloadName?: string;
}

/**
 * Arreglo editable de infografías de MyoKine.
 * Para agregar o reemplazar una infografía, importa tu imagen local (o ruta en /public)
 * y añade o edita un objeto en este listado manteniendo un `slug` único para el link compartible.
 */
export const INFOGRAFIAS: Infografia[] = [
  {
    id: 'inf-1',
    slug: 'columna-lumbar-sistema-dinamico',
    title: 'Columna lumbar: un sistema fuerte y adaptable',
    topic: 'Columna lumbar',
    image: infografiaLumbarImg,
    description:
      'Síntesis visual sobre la capacidad de adaptación de los discos intervertebrales y la musculatura lumbopélvica frente a la carga progresiva.',
    downloadName: 'MyoKine-Infografia-Columna-Lumbar.jpg',
  },
  {
    id: 'inf-2',
    slug: 'tendon-aquiles-carga-progresiva',
    title: 'Tendón de Aquiles: carga mecánica y remodelación',
    topic: 'Tendinopatías',
    image: infografiaTendonImg,
    description:
      'Cómo la tensión controlada orienta las fibras de colágeno y aumenta la tolerancia del complejo gastrocnemio-sóleo-Aquiles.',
    downloadName: 'MyoKine-Infografia-Tendon-Aquiles.jpg',
  },
  {
    id: 'inf-3',
    slug: 'dolor-sistema-alarma-sensibilidad',
    title: 'Dolor persistente: sensibilidad del sistema vs. daño',
    topic: 'Neurociencia del dolor',
    image: infografiaAlarmaImg,
    description:
      'Diferencia entre un sistema nervioso en modo de protección (alarma sensible) y la integridad estructural real de tus tejidos.',
    downloadName: 'MyoKine-Infografia-Sistema-Alarma.jpg',
  },
];
