# Guía editorial de verdadpolitica.es

Esta guía es obligatoria para cualquier contenido nuevo o corregido, lo escriba una persona o una herramienta.

## Principios

1. **Mismo rasero para todos.** Cada partido se analiza con los mismos criterios, el mismo nivel de detalle y la misma dureza. Si una ficha de un partido no superaría la revisión aplicada a otro, no entra.
2. **Hechos verificables, no opiniones.** Nada de adjetivos valorativos ("vergonzoso", "histórico", "brutal"). Se describe qué se prometió, qué se votó, qué se publicó en el BOE, qué dijo un tribunal.
3. **Todo con fuente.** Cada ficha necesita al menos dos fuentes. Prioridad:
   1. Fuentes primarias: BOE, Diario de Sesiones y votaciones del Congreso/Senado, resoluciones judiciales (CENDOJ, notas del CGPJ), programas electorales oficiales, datos del INE/Eurostat.
   2. Agencias y verificadores: EFE, Europa Press, RTVE, Newtral, Maldita, EFE Verifica.
   3. Prensa de líneas editoriales distintas (por ejemplo El País, El Mundo, ABC, elDiario.es, La Vanguardia, El Confidencial, El Español, Público). Si una ficha se apoya en prensa, conviene que al menos una fuente sea de una línea editorial distinta a la del resto.

   Dos fuentes solo cuentan como dos si son independientes: dos medios que reproducen la misma nota de agencia, el mismo auto filtrado o la misma acusación de parte son una sola evidencia. Las afirmaciones clave (fechas, cifras, votaciones, estado procesal) deben poder localizarse en una fuente concreta de la lista.
4. **Presunción de inocencia.** En la categoría *judicial* se indica con precisión el estado procesal (investigado, procesado, juzgado, condenado en firme o no, absuelto, archivado), quién está implicado y qué relación tiene con el partido. Se incluye la versión del partido o del implicado si la ha dado. Nunca se presenta una investigación como una condena.

   Protocolo para causas judiciales:
   - Antes de publicar o actualizar, comprueba cuál es la **última resolución** del procedimiento y cítala, preferentemente desde poderjudicial.es o el propio auto o sentencia.
   - Usa el `estadoJudicial` exacto: `diligencias-fiscalia` (actuaciones preprocesales de la Fiscalía, sin causa abierta en un juzgado), `archivo-fiscalia` (la Fiscalía archiva sus diligencias), `investigacion` (diligencias previas, personas investigadas), `procesamiento` (auto de procesamiento o de continuación por procedimiento abreviado), `juicio-oral` (auto de apertura de juicio oral), `juicio` (juicio celebrándose o visto para sentencia), `condena-no-firme`, `condena-firme`, `absolucion-no-firme`, `absolucion` (firme), `archivo-provisional` (sobreseimiento provisional), `archivado` (sobreseimiento libre o definitivo, acreditado con la resolución, no solo con la falta de recurso), `archivo-sin-tipo` (consta el archivo pero no si es provisional o definitivo; nunca se deduce por analogía) y `sancion-anulada` (un tribunal anula una sanción administrativa; no es una absolución penal).
   - Las fiscalizaciones del Tribunal de Cuentas sin procedimiento sancionador ni judicial no son fichas `judicial`: van al balance de `regeneracion-democratica` o, si contradicen una promesa concreta, a `contradiccion`.
   - En los títulos de causas no resueltas se escribe «presunto/presunta» o «por presuntos delitos de…».
   - Si no hay información posterior a una fecha, se escribe «última situación documentada (fecha)», sin afirmar que sigue igual.
   - Si hay un archivo, una absolución o un recurso, actualiza también `titulo`, `resumen` y `actualizado`, no solo el estado. Una noticia antigua nunca debe aparecer como la situación vigente.
   - Distingue entre el partido como persona jurídica, sus cargos en activo, antiguos cargos y personas de su entorno, y dilo en `implicados`.
5. **Contexto que incomoda a todos.** Si un partido no cumplió algo porque no tenía mayoría, se dice. Si lo bloquearon sus propios socios, también. Si un tribunal lo tumbó, se cita la sentencia.
6. **Fechas exactas.** La legislatura analizada es la XV (17 de agosto de 2023 – disolución del 6 de octubre de 2026). Elecciones: 29 de noviembre de 2026.

## Categorías de fichas

| Categoría | Qué es | Campos obligatorios extra |
|---|---|---|
| `cumplido` | Lo prometieron (programa 2023, investidura, compromisos públicos) y lo consiguieron. | `promesa` |
| `bloqueado` | Lo prometieron e intentaron, pero lo frenaron la oposición, los socios o los tribunales. | `promesa`, `bloqueadoPor` |
| `no-intentado` | Lo prometieron y no hicieron ningún intento real. Hay que explicar por qué (razón declarada y contexto). | `promesa`, `motivo` |
| `contradiccion` | Dijeron una cosa y hicieron la contraria, o cambiaron de posición sin explicarlo. | — |
| `judicial` | Procedimientos judiciales que afectan al partido, a sus dirigentes o a su financiación. | `estadoJudicial`, `implicados` |

### Reglas para elegir categoría

- **La promesa se cita tal como se hizo.** Si prometieron 20 semanas y lograron 19, la promesa dice 20 y el título refleja el cumplimiento parcial («19 de las 20 semanas prometidas»). Nunca se reformula la promesa para que encaje con el resultado. Si una parte esencial de la promesa no se cumplió (por ejemplo, la garantía legal de un porcentaje), se separa en otra ficha.
- **Qué cuenta como intento** (para distinguir `bloqueado` de `no-intentado`): registrar una proposición o proyecto de ley, una proposición no de ley, una enmienda o un recurso, aprobar una norma donde se gobierna, o una negociación formal documentada. Para afirmar que no hubo intento hay que haber buscado en las iniciativas del Congreso/Senado (y del parlamento autonómico si gobiernan) y decirlo en el cuerpo: «No consta ninguna iniciativa en [fuente consultada] a [fecha]». Se distingue una promesa condicionada a gobernar de un compromiso asumido para la oposición.
- **Una contradicción exige incompatibilidad demostrada**: una declaración o compromiso concreto y una actuación concreta que lo contradice, con fechas. Defender una reforma no obliga a votar cualquier texto; proponer algo no es prometer renunciar unilateralmente. Si la incompatibilidad no se demuestra, el hecho va al balance del programa, no a `contradiccion`.
- **Votar en contra de una norma que incluye lo prometido** cuenta como contradicción solo si: (1) el partido se había comprometido de forma concreta con esa medida (no basta un compromiso genérico); (2) su voto, de haber prosperado, la hacía decaer; y (3) la ficha recoge su argumento (otras medidas incluidas en la norma, alternativa propia) y si presentó una alternativa que la garantizara a tiempo. Si falta (1) o (2), el hecho va al balance del programa.
- **Apoyar la tramitación no es apoyar el contenido.** Votar a favor de tramitar una ILP o una proposición no demuestra respaldo a su texto final; para una contradicción hay que acreditar qué contenido se apoyó y después se rechazó.
- **Los resultados judiciales no son logros de un partido.** Personarse como acusación popular es una actuación del partido; la sentencia es del tribunal.
- **Mismo hecho, mismos datos.** Si un hecho aparece en fichas de varios partidos (votaciones, decretos, fechas), se usan las mismas cifras y se identifica cada norma por su número y objeto, nunca por «el primero/el segundo».

Para los partidos en la oposición estatal, `cumplido` y `bloqueado` pueden referirse a lo que prometieron hacer desde la oposición (iniciativas, mayoría en el Senado, recursos ante el Tribunal Constitucional) o a lo hecho donde gobiernan, indicándolo con `ambito: autonomico` o `municipal`.

## Programa vs. hechos

Para cada partido hay una entrada por tema (ver `src/data/temas.ts`) en `src/content/programa/<partido>/<tema>.md`:

- `propuesta`: lo más relevante que proponen ahora para el 29-N (programa 2026 si ya está publicado; si no, sus propuestas oficiales más recientes, indicándolo en el texto).
- `balance`: qué han hecho realmente en ese tema durante la legislatura (votaciones, leyes, gestión donde gobiernan).
- `coherencia`: `coherente`, `parcial`, `contradictorio` o `sin-historial`. Mide si **sus actuaciones** (votos, iniciativas, gestión donde gobiernan) van en la línea de lo que proponen, **no si lograron aprobarlo**. Perder una votación no rebaja la coherencia; votar en contra de lo que se propone, sí.
- Las propuestas se citan del programa, de documentos o resoluciones aprobadas por el partido o de declaraciones de su candidatura. Un agregador o una nota de prensa no sustituyen al documento original cuando este existe; si solo hay agregador, se atribuye explícitamente.

### Ficha de partido (`src/content/partidos/<id>.yaml`)

Estructura común para todos, sin balance valorativo (el balance va en las fichas): `resumen` = papel institucional en la legislatura + dónde gobierna + contexto electoral (coalición, candidatura). `nota` = advertencias comunes (por ejemplo, si el programa 2026 aún no está publicado y qué programa enlaza `programaUrl`).

## Formato de una ficha

Archivo `src/content/fichas/<partido>/<slug-descriptivo>.md`:

```markdown
---
partido: psoe
categoria: bloqueado
titulo: Ley de reducción de la jornada laboral a 37,5 horas
resumen: Aprobada por el Consejo de Ministros, el Congreso la tumbó en una enmienda a la totalidad con los votos de PP, Vox y Junts.
tema: empleo-pensiones
promesa: "Reducir la jornada laboral máxima a 37,5 horas semanales sin reducción salarial."
bloqueadoPor: [PP, Vox, Junts]
importancia: 3
fecha: 2025-09-10
actualizado: 2026-10-19
fuentes:
  - titulo: "El Congreso tumba la reducción de jornada"
    url: https://www.ejemplo.es/noticia
    medio: RTVE
    fecha: 2025-09-10
    tipo: prensa
  - titulo: "Votación de las enmiendas a la totalidad"
    url: https://www.congreso.es/...
    medio: Congreso de los Diputados
    tipo: oficial
---

## Qué se prometió
...

## Qué pasó
...

## Por qué
...

## Lo que dicen las partes
...
```

- `resumen` es la línea que se ve en la portada: una frase clara, sin opinión (máx. 320 caracteres).
- `importancia` (1–3) ordena las fichas en la portada; 3 = de lo más relevante de la legislatura.
- En el cuerpo se pueden citar las fuentes con su número entre corchetes, p. ej. `[1]`, en el orden de la lista `fuentes`.
- Cada URL debe existir y respaldar lo que se afirma. Nada de enlaces inventados ni reconstruidos de memoria.
