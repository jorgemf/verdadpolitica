import { getCollection, type CollectionEntry } from 'astro:content';
import type { Categoria } from '../content.config';
import { TEMAS, type TemaId } from '../data/temas';

export const REPO = 'https://github.com/jorgemf/verdadpolitica';

export type Partido = CollectionEntry<'partidos'>;
export type Ficha = CollectionEntry<'fichas'>;
export type EntradaPrograma = CollectionEntry<'programa'>;

export const CATEGORIA_INFO: Record<Categoria, { titulo: string; corto: string; descripcion: string }> = {
  cumplido: {
    titulo: 'Prometió y cumplió',
    corto: 'Cumplió',
    descripcion: 'Compromisos que se llevaron a cabo.',
  },
  bloqueado: {
    titulo: 'Lo intentó, pero se lo bloquearon',
    corto: 'Bloqueado',
    descripcion: 'Iniciativas frenadas por la oposición, los socios o los tribunales.',
  },
  'no-intentado': {
    titulo: 'Prometió y ni lo intentó',
    corto: 'Ni lo intentó',
    descripcion: 'Promesas sin ningún intento real, y la razón que se dio.',
  },
  contradiccion: {
    titulo: 'Dijo una cosa, hizo otra',
    corto: 'Contradicciones',
    descripcion: 'Cambios de posición y promesas contradichas por los hechos.',
  },
  judicial: {
    titulo: 'Frentes judiciales',
    corto: 'Judicial',
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

/**
 * Colores de la barra de balance de cada partido, de mejor a peor resultado.
 * Además del tono cambian de luminosidad, y siempre van con número y texto.
 */
export const COLOR_CATEGORIA: Record<Exclude<Categoria, 'judicial'>, { fondo: string; texto: string; corto: string }> = {
  cumplido: { fondo: '#23773a', texto: '#ffffff', corto: 'cumplió' },
  bloqueado: { fondo: '#f2b33d', texto: '#1a2233', corto: 'se lo bloquearon' },
  'no-intentado': { fondo: '#e8702a', texto: '#1a2233', corto: 'ni lo intentó' },
  contradiccion: { fondo: '#8e1b1b', texto: '#ffffff', corto: 'hizo lo contrario' },
};

export const LEGISLATURA: Record<string, string> = { XIV: '2019–2023', XV: '2023–2026' };

/** Cómo ha terminado (o no) una causa, para resumirla y colorearla. */
export type Desenlace = 'curso' | 'condena' | 'condena-no-firme' | 'favorable' | 'favorable-no-firme';

export const FASES_JUDICIALES = ['Denuncia', 'Investigación', 'Juicio oral', 'Sentencia', 'Firme'] as const;

const SITUACION_JUDICIAL: Record<string, { desenlace: Desenlace; fase: number }> = {
  'diligencias-fiscalia': { desenlace: 'curso', fase: 0 },
  'archivo-fiscalia': { desenlace: 'favorable', fase: 0 },
  investigacion: { desenlace: 'curso', fase: 1 },
  procesamiento: { desenlace: 'curso', fase: 1 },
  'juicio-oral': { desenlace: 'curso', fase: 2 },
  juicio: { desenlace: 'curso', fase: 2 },
  'condena-no-firme': { desenlace: 'condena-no-firme', fase: 3 },
  'condena-firme': { desenlace: 'condena', fase: 4 },
  'absolucion-no-firme': { desenlace: 'favorable-no-firme', fase: 3 },
  absolucion: { desenlace: 'favorable', fase: 4 },
  'archivo-provisional': { desenlace: 'favorable-no-firme', fase: 1 },
  archivado: { desenlace: 'favorable', fase: 1 },
  'archivo-sin-tipo': { desenlace: 'favorable-no-firme', fase: 1 },
  'sancion-anulada': { desenlace: 'favorable', fase: 4 },
};

const INDICE_FASE: Record<string, number> = {
  denuncia: 0,
  investigacion: 1,
  'juicio-oral': 2,
  sentencia: 3,
  firme: 4,
};

/**
 * Desenlace y fase (índice de FASES_JUDICIALES) de una causa. La fase sale del
 * estado salvo que la ficha la fije con `faseJudicial`.
 */
export function situacionJudicial(estado: string, fase?: string) {
  const base = SITUACION_JUDICIAL[estado];
  return {
    desenlace: base.desenlace,
    fase: fase ? INDICE_FASE[fase] : base.fase,
    etiqueta: ESTADO_JUDICIAL[estado],
  };
}

const PESO_DESENLACE: Record<Desenlace, number> = {
  condena: 0,
  favorable: 1,
  'condena-no-firme': 2,
  'favorable-no-firme': 3,
  curso: 4,
};

/** Ordena causas: primero las resueltas en firme, luego por fase más avanzada. */
export function porDesenlace(a: Ficha, b: Ficha): number {
  const sa = situacionJudicial(a.data.estadoJudicial!, a.data.faseJudicial);
  const sb = situacionJudicial(b.data.estadoJudicial!, b.data.faseJudicial);
  return PESO_DESENLACE[sa.desenlace] - PESO_DESENLACE[sb.desenlace] || sb.fase - sa.fase || porImportancia(a, b);
}

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

export type Encuesta = CollectionEntry<'encuestas'>;

/** La encuesta de preocupaciones más reciente. */
export async function encuestaReciente(): Promise<Encuesta> {
  const todas = await getCollection('encuestas');
  return todas.sort((a, b) => b.data.publicado.getTime() - a.data.publicado.getTime())[0];
}

export interface TemaConPreocupacion {
  id: TemaId;
  nombre: string;
  /** Problemas de la encuesta asociados a este tema, de más a menos citado. */
  problemas: { nombre: string; porcentaje: number }[];
  /** Porcentaje del problema más citado del tema; 0 si no aparece. */
  maximo: number;
}

/** Los temas ordenados según cuánto preocupan en la encuesta más reciente. */
export async function temasPorPreocupacion(): Promise<TemaConPreocupacion[]> {
  const { data } = await encuestaReciente();
  return TEMAS.map((t) => {
    const problemas = data.problemas
      .filter((p) => p.tema === t.id)
      .map(({ nombre, porcentaje }) => ({ nombre, porcentaje }))
      .sort((a, b) => b.porcentaje - a.porcentaje);
    return { id: t.id, nombre: t.nombre, problemas, maximo: problemas[0]?.porcentaje ?? 0 };
  }).sort((a, b) => b.maximo - a.maximo);
}

/**
 * Cada forma de seleccionar fichas en la vista por temas: los temas comunes,
 * todas las causas judiciales juntas y las fichas que no encajan en ningún tema.
 */
export type VistaId = TemaId | 'judicial' | 'otros';

export interface Vista {
  id: VistaId;
  nombre: string;
  /** Solo en los temas: lo que preocupa según la encuesta. */
  tema?: TemaConPreocupacion;
}

/** Temas por orden de preocupación, seguidos de «Causas judiciales» y «Otros temas». */
export async function vistas(): Promise<Vista[]> {
  const temas = await temasPorPreocupacion();
  return [
    ...temas.map((t) => ({ id: t.id, nombre: t.nombre, tema: t })),
    { id: 'judicial', nombre: 'Causas judiciales' },
    { id: 'otros', nombre: 'Otros temas' },
  ];
}

/** Las fichas que se muestran en una vista. */
export function fichasDeVista(todas: Ficha[], id: VistaId): Ficha[] {
  if (id === 'judicial') return todas.filter((f) => f.data.categoria === 'judicial');
  if (id === 'otros') return todas.filter((f) => !f.data.tema);
  return todas.filter((f) => f.data.tema === id);
}

const formatoPct = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const porcentaje = (n: number) => `${formatoPct.format(n)} %`;

/** Ruta interna respetando el `base` configurado. */
export function url(ruta: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpia = ruta.replace(/^\//, '');
  return `${base}/${limpia}`;
}

export const fichaUrl = (f: Ficha) => url(`ficha/${f.id}/`);
export const partidoUrl = (id: string) => url(`partido/${id}/`);
export const temaUrl = (id: string) => url(`tema/${id}/`);
export const categoriaUrl = (id: string) => url(`categoria/${id}/`);

export const editarUrl = (filePath?: string) =>
  filePath ? `${REPO}/edit/main/${filePath.replace(/^\.\//, '')}` : `${REPO}`;

const formato = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const fecha = (d?: Date) => (d ? formato.format(d) : '');
