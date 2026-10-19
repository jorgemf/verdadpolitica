import { getCollection, type CollectionEntry } from 'astro:content';
import type { Categoria } from '../content.config';

export const REPO = 'https://github.com/jorgemf/verdadpolitica';

export type Partido = CollectionEntry<'partidos'>;
export type Ficha = CollectionEntry<'fichas'>;
export type EntradaPrograma = CollectionEntry<'programa'>;

export const CATEGORIA_INFO: Record<Categoria, { titulo: string; descripcion: string }> = {
  cumplido: {
    titulo: 'Prometió y cumplió',
    descripcion: 'Compromisos que se llevaron a cabo.',
  },
  bloqueado: {
    titulo: 'Lo intentó, pero se lo bloquearon',
    descripcion: 'Iniciativas frenadas por la oposición, los socios o los tribunales.',
  },
  'no-intentado': {
    titulo: 'Prometió y ni lo intentó',
    descripcion: 'Promesas sin ningún intento real, y la razón que se dio.',
  },
  contradiccion: {
    titulo: 'Dijo una cosa, hizo otra',
    descripcion: 'Cambios de posición y promesas contradichas por los hechos.',
  },
  judicial: {
    titulo: 'Frentes judiciales',
    descripcion: 'Causas que afectan al partido, a sus dirigentes o a su financiación. Con su estado procesal exacto.',
  },
};

export const ORDEN_CATEGORIAS: Categoria[] = ['cumplido', 'bloqueado', 'no-intentado', 'contradiccion', 'judicial'];

export const ESTADO_JUDICIAL: Record<string, string> = {
  'diligencias-fiscalia': 'Diligencias de la Fiscalía (sin causa judicial)',
  'archivo-fiscalia': 'Archivado por la Fiscalía',
  investigacion: 'En investigación judicial',
  procesamiento: 'Procesamiento',
  'juicio-oral': 'Apertura de juicio oral',
  juicio: 'En juicio o pendiente de sentencia',
  'condena-no-firme': 'Condena no firme',
  'condena-firme': 'Condena firme',
  'absolucion-no-firme': 'Absolución no firme',
  absolucion: 'Absolución firme',
  'archivo-provisional': 'Archivo provisional',
  archivado: 'Archivo definitivo',
  'archivo-sin-tipo': 'Archivado (no consta si es provisional o definitivo)',
  'sancion-anulada': 'Sanción administrativa anulada por los tribunales',
};

export const COHERENCIA: Record<string, { texto: string; descripcion: string }> = {
  coherente: { texto: 'Coherente', descripcion: 'Lo que propone encaja con lo que ha hecho.' },
  parcial: { texto: 'En parte', descripcion: 'Ha hecho algo en esa línea, pero no todo ni siempre.' },
  contradictorio: { texto: 'Contradictorio', descripcion: 'Lo que propone choca con lo que ha hecho.' },
  'sin-historial': { texto: 'Sin historial', descripcion: 'No ha tenido ocasión de demostrarlo.' },
};

export const AMBITO: Record<string, string> = {
  estatal: 'Estatal',
  autonomico: 'Autonómico',
  municipal: 'Municipal',
  europeo: 'Europeo',
};

export const TIPO_FUENTE: Record<string, string> = {
  oficial: 'Fuente oficial',
  judicial: 'Resolución judicial',
  prensa: 'Prensa',
  verificacion: 'Verificador',
  partido: 'Partido',
  academica: 'Académica',
};

export async function partidos(): Promise<Partido[]> {
  return (await getCollection('partidos')).sort((a, b) => a.data.orden - b.data.orden);
}

const porImportancia = (a: Ficha, b: Ficha) =>
  b.data.importancia - a.data.importancia || b.data.fecha.getTime() - a.data.fecha.getTime();

export async function fichas(): Promise<Ficha[]> {
  return (await getCollection('fichas')).sort(porImportancia);
}

export async function programa(): Promise<EntradaPrograma[]> {
  return getCollection('programa');
}

/** Ruta interna respetando el `base` configurado. */
export function url(ruta: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpia = ruta.replace(/^\//, '');
  return `${base}/${limpia}`;
}

export const fichaUrl = (f: Ficha) => url(`ficha/${f.id}/`);
export const partidoUrl = (id: string) => url(`partido/${id}/`);
export const temaUrl = (id: string) => url(`tema/${id}/`);

export const editarUrl = (filePath?: string) =>
  filePath ? `${REPO}/edit/main/${filePath.replace(/^\.\//, '')}` : `${REPO}`;

const formato = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const fecha = (d?: Date) => (d ? formato.format(d) : '');
