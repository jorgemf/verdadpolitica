// Temas comunes a todos los partidos. Usar siempre los mismos permite comparar
// los programas en paralelo. Añadir un tema aquí obliga a que exista la entrada
// correspondiente en src/content/programa/<partido>/<tema>.md para cada partido.
export const TEMAS = [
  { id: 'vivienda', nombre: 'Vivienda' },
  { id: 'economia-impuestos', nombre: 'Economía e impuestos' },
  { id: 'empleo-pensiones', nombre: 'Empleo y pensiones' },
  { id: 'sanidad-educacion', nombre: 'Sanidad y educación' },
  { id: 'inmigracion', nombre: 'Inmigración' },
  { id: 'modelo-territorial', nombre: 'Modelo territorial' },
  { id: 'regeneracion-democratica', nombre: 'Corrupción, justicia e instituciones' },
  { id: 'energia-medioambiente', nombre: 'Energía y medio ambiente' },
] as const;

export type TemaId = (typeof TEMAS)[number]['id'];

export const TEMA_IDS = TEMAS.map((t) => t.id) as [TemaId, ...TemaId[]];

export const nombreTema = (id: string) => TEMAS.find((t) => t.id === id)?.nombre ?? id;
