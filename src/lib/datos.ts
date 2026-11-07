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

type Gravedad = NonNullable<Ficha['data']['gravedad']>;
type Sujeto = Gravedad['sujetos'][number];

export const CLASIFICACION: Record<Sujeto['clasificacion'], string> = {
  grave: 'delito grave',
  'menos-grave': 'delito menos grave',
  leve: 'delito leve',
  'no-penal': 'responsabilidad no penal',
};

export const VINCULO: Record<Sujeto['vinculo'], string> = {
  partido: 'El propio partido',
  direccion: 'Dirección del partido o Gobierno',
  cargo: 'Cargo del partido',
  excargo: 'Excargo',
  entorno: 'Familiar o entorno',
  'sin-cargo': 'Sin cargo en la fecha de los hechos',
};

const NATURALEZA: Record<Gravedad['naturaleza'], string> = {
  penal: 'Responsabilidad penal',
  civil: 'Responsabilidad civil',
  contable: 'Responsabilidad contable',
  administrativa: 'Sanción administrativa',
};

const RANGO_CLASIFICACION: Record<Sujeto['clasificacion'], number> = { grave: 3, 'menos-grave': 2, leve: 1, 'no-penal': 0 };

// Cómo se nombra la causa según el estado, para no presentar una investigación como una condena.
const PREFIJO_ESTADO: Record<string, string> = {
  'diligencias-fiscalia': 'Diligencias por',
  investigacion: 'Investigación por',
  procesamiento: 'Acusación por',
  'juicio-oral': 'Acusación por',
  juicio: 'Acusación por',
  'condena-no-firme': 'Condena no firme por',
  'condena-firme': 'Condena por',
};

export interface Etiqueta {
  texto: string;
  clase: string;
}

/**
 * Gravedad de una causa según el Código Penal, redactada según su estado. Las
 * personas con la causa archivada o absueltas no cuentan: su desenlace ya lo
 * dice el estado procesal.
 */
export function etiquetasGravedad(f: Ficha): Etiqueta[] {
  const g = f.data.gravedad;
  if (!g) return [];
  const vivos = g.sujetos
    .map((s) => ({ s, estado: s.estado ?? f.data.estadoJudicial! }))
    .filter(({ estado }) => PREFIJO_ESTADO[estado]);
  const etiquetas: Etiqueta[] = [];
  const penal = vivos
    .filter(({ s }) => s.clasificacion !== 'no-penal')
    .sort((a, b) => RANGO_CLASIFICACION[b.s.clasificacion] - RANGO_CLASIFICACION[a.s.clasificacion])[0];
  if (penal) {
    const quien = g.sujetos.length > 1 ? ` (${penal.s.nombre})` : '';
    etiquetas.push({
      texto: `${PREFIJO_ESTADO[penal.estado]} ${CLASIFICACION[penal.s.clasificacion]}${quien}`,
      clase: `etiqueta--${penal.s.clasificacion}`,
    });
  }
  if (g.naturaleza !== 'penal' && vivos.some(({ s }) => s.clasificacion === 'no-penal')) {
    etiquetas.push({ texto: NATURALEZA[g.naturaleza], clase: 'etiqueta--no-penal' });
  }
  return etiquetas;
}

const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Quién era cada persona cuando ocurrieron los hechos y si actuaba en el cargo. */
export function motivosSujeto(s: Sujeto): string[] {
  return [mayuscula(s.cuando ?? VINCULO[s.vinculo]), s.enFunciones ? 'en el ejercicio del cargo' : null].filter(
    (m): m is string => !!m,
  );
}

type Alcance = NonNullable<Ficha['data']['alcance']>;

export const GRADO: Record<Alcance['grado'], { texto: string; corto: string }> = {
  completo: { texto: 'Cumplido por completo', corto: 'por completo' },
  parcial: { texto: 'Cumplido en parte', corto: 'en parte' },
  minimo: { texto: 'Cumplido por lo mínimo', corto: 'por lo mínimo' },
  'no-evaluable': { texto: 'Alcance no evaluable', corto: 'no evaluable' },
};

export const VIGENCIA: Record<Alcance['vigencia'], string> = {
  'en-vigor': 'En vigor',
  pendiente: 'Pendiente de entrar en vigor',
  'anulada-parcial': 'Anulada en parte por los tribunales',
  anulada: 'Anulada por los tribunales',
  derogada: 'Derogada',
  sustituida: 'Sustituida por una norma posterior',
  'no-aplica': 'Actuación puntual',
};

export const EJECUCION: Record<Alcance['ejecucion'], string> = {
  aplicada: 'Se aplica',
  parcial: 'Se aplica solo en parte',
  'sin-aplicar': 'Sin aplicar',
  'no-consta': 'No constan datos de aplicación',
  'no-aplica': 'Ya realizada',
};

/** Avisos cortos de un cumplimiento que no es completo, no está en vigor o no se aplica. */
export function etiquetasAlcance(f: Ficha): Etiqueta[] {
  const a = f.data.alcance;
  if (!a) return [];
  return [
    a.grado !== 'completo' ? { texto: GRADO[a.grado].texto, clase: `etiqueta--alcance-${a.grado}` } : null,
    ['pendiente', 'anulada-parcial', 'anulada', 'derogada'].includes(a.vigencia)
      ? { texto: VIGENCIA[a.vigencia], clase: 'etiqueta--aviso' }
      : null,
    a.ejecucion === 'parcial' || a.ejecucion === 'sin-aplicar'
      ? { texto: EJECUCION[a.ejecucion], clase: 'etiqueta--aviso' }
      : null,
  ].filter((e): e is Etiqueta => !!e);
}

/** Recuento de lo cumplido por grado, p. ej. «4 por completo, 5 en parte». */
export function resumenAlcance(cumplidas: Ficha[]): string {
  return (Object.keys(GRADO) as Alcance['grado'][])
    .map((g) => ({ g, n: cumplidas.filter((f) => f.data.alcance?.grado === g).length }))
    .filter(({ n }) => n > 0)
    .map(({ g, n }) => `${n} ${GRADO[g].corto}`)
    .join(', ');
}

/** Etiquetas de valoración de una ficha para las listas. */
export const etiquetasValoracion = (f: Ficha): Etiqueta[] => [...etiquetasGravedad(f), ...etiquetasAlcance(f)];

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

/** Las fichas que se muestran en una vista. Las causas judiciales tienen su
 *  propia vista y no se repiten en los temas, que comparan propuestas con hechos. */
export function fichasDeVista(todas: Ficha[], id: VistaId): Ficha[] {
  if (id === 'judicial') return todas.filter((f) => f.data.categoria === 'judicial');
  const resto = todas.filter((f) => f.data.categoria !== 'judicial');
  if (id === 'otros') return resto.filter((f) => !f.data.tema);
  return resto.filter((f) => f.data.tema === id);
}

const formatoPct = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const porcentaje = (n: number) => `${formatoPct.format(n)} %`;

const formatoEuros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export const euros = (n: number) => formatoEuros.format(n);

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
