import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TEMA_IDS } from './data/temas';

// Fechas: YAML las entrega como Date (sin comillas) o como texto ISO (con
// comillas). Se rechaza null para que no se convierta en 1970-01-01.
const fechaCampo = z.union([z.date(), z.iso.date()]).transform((v) => new Date(v));

const urlWeb = z.url({ protocol: /^https?$/ });

// Toda afirmación debe poder rastrearse: el esquema exige fuentes y la build
// falla si falta alguna.
const fuente = z.object({
  titulo: z.string().min(1),
  url: urlWeb,
  medio: z.string().min(1),
  fecha: fechaCampo.optional(),
  tipo: z.enum(['oficial', 'judicial', 'prensa', 'verificacion', 'partido', 'academica']),
});

export type Fuente = z.infer<typeof fuente>;

const urlsDistintas = (fs: Fuente[]) => new Set(fs.map((f) => f.url)).size === fs.length;

const partidos = defineCollection({
  loader: glob({ base: './src/content/partidos', pattern: '*.yaml' }),
  schema: z.object({
    nombre: z.string(),
    siglas: z.string(),
    candidato: z.string(),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    orden: z.number().int(),
    papelLegislatura: z.string(),
    escanos2023: z.number().int(),
    encuesta: z.object({
      porcentaje: z.number(),
      escanos: z.number().int(),
      fecha: fechaCampo,
      fuente: fuente,
    }),
    resumen: z.string(),
    nota: z.string().optional(),
    web: urlWeb,
    programaUrl: urlWeb.optional(),
  }),
});

export const CATEGORIAS = ['cumplido', 'bloqueado', 'no-intentado', 'contradiccion', 'judicial'] as const;
export type Categoria = (typeof CATEGORIAS)[number];

const fichas = defineCollection({
  loader: glob({ base: './src/content/fichas', pattern: '**/*.md' }),
  schema: z
    .object({
      partido: reference('partidos'),
      categoria: z.enum(CATEGORIAS),
      titulo: z.string().max(120),
      resumen: z.string().max(320),
      tema: z.enum(TEMA_IDS).optional(),
      ambito: z.enum(['estatal', 'autonomico', 'municipal', 'europeo']).default('estatal'),
      promesa: z.string().optional(),
      bloqueadoPor: z.array(z.string().min(1)).min(1).optional(),
      motivo: z.string().optional(),
      estadoJudicial: z
        .enum([
          'diligencias-fiscalia',
          'archivo-fiscalia',
          'investigacion',
          'procesamiento',
          'juicio-oral',
          'juicio',
          'condena-no-firme',
          'condena-firme',
          'absolucion-no-firme',
          'absolucion',
          'archivo-provisional',
          'archivado',
          'archivo-sin-tipo',
          'sancion-anulada',
        ])
        .optional(),
      implicados: z.string().optional(),
      importancia: z.number().int().min(1).max(3).default(2),
      fecha: fechaCampo,
      actualizado: fechaCampo,
      fuentes: z.array(fuente).min(2).refine(urlsDistintas, 'Las fuentes deben tener URLs distintas'),
    })
    .superRefine((f, ctx) => {
      const exige = (campo: keyof typeof f, cat: Categoria) => {
        if (f.categoria === cat && !f[campo]) {
          ctx.addIssue({ code: 'custom', path: [campo], message: `"${campo}" es obligatorio en la categoría "${cat}"` });
        }
      };
      exige('promesa', 'cumplido');
      exige('promesa', 'bloqueado');
      exige('promesa', 'no-intentado');
      exige('bloqueadoPor', 'bloqueado');
      exige('motivo', 'no-intentado');
      exige('estadoJudicial', 'judicial');
      exige('implicados', 'judicial');
    }),
});

const programa = defineCollection({
  loader: glob({ base: './src/content/programa', pattern: '**/*.md' }),
  schema: z.object({
    partido: reference('partidos'),
    tema: z.enum(TEMA_IDS),
    propuesta: z.string().max(320),
    balance: z.string().max(320),
    coherencia: z.enum(['coherente', 'parcial', 'contradictorio', 'sin-historial']),
    actualizado: fechaCampo,
    fuentes: z.array(fuente).min(2).refine(urlsDistintas, 'Las fuentes deben tener URLs distintas'),
  }),
});

export const collections = { partidos, fichas, programa };
