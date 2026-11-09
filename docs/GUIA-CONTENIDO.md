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
   - `faseJudicial` (opcional: `denuncia`, `investigacion`, `juicio-oral`, `sentencia`, `firme`) fija la fase en la que está o terminó la causa cuando no se deduce del estado. Úsalo sobre todo en los archivos: una querella inadmitida o unas diligencias de la Fiscalía archivadas terminan en `denuncia`; un sobreseimiento tras investigar, en `investigacion`. La portada dibuja esa fase en la línea de pasos de cada causa.
   - Las fiscalizaciones del Tribunal de Cuentas sin procedimiento sancionador ni judicial no son fichas `judicial`: van al balance de `regeneracion-democratica` o, si contradicen una promesa concreta, a `contradiccion`.
   - En los títulos de causas no resueltas se escribe «presunto/presunta» o «por presuntos delitos de…».
   - Si no hay información posterior a una fecha, se escribe «última situación documentada (fecha)», sin afirmar que sigue igual.
   - Si hay un archivo, una absolución o un recurso, actualiza también `titulo`, `resumen` y `actualizado`, no solo el estado. Una noticia antigua nunca debe aparecer como la situación vigente.
   - Distingue entre el partido como persona jurídica, sus cargos en activo, antiguos cargos y personas de su entorno, y dilo en `implicados`.
5. **Contexto que incomoda a todos.** Si un partido no cumplió algo porque no tenía mayoría, se dice. Si lo bloquearon sus propios socios, también. Si un tribunal lo tumbó, se cita la sentencia.
6. **Fechas exactas.** Se analizan dos legislaturas, indicadas en el campo `legislatura` de cada ficha:
   - **XV** (por defecto): 17 de agosto de 2023 – disolución del 6 de octubre de 2026. Promesas de referencia: programas de las generales de julio de 2023, investidura y acuerdos de la legislatura.
   - **XIV**: 3 de diciembre de 2019 – disolución del 30 de mayo de 2023. Promesas de referencia: programas de las generales de noviembre de 2019, acuerdo de coalición PSOE–Unidas Podemos (30 de diciembre de 2019) e investidura de enero de 2020.

   Elecciones: 29 de noviembre de 2026. En la XIV, Unidas Podemos era una coalición: las fichas de ministerios o dirigentes de Podemos van a `podemos`; las de IU, los Comuns, Más País/Más Madrid o Yolanda Díaz van a `frente-amplio`, explicando en el cuerpo en qué formación estaban entonces. Un mismo hecho no se cuenta en los dos partidos salvo que ambos lo prometieran por separado.

## Categorías de fichas

| Categoría | Qué es | Campos obligatorios extra |
|---|---|---|
| `cumplido` | Lo prometieron (programa electoral de la legislatura, investidura, compromisos públicos) y lo consiguieron. | `promesa` |
| `bloqueado` | Lo prometieron e intentaron, pero lo frenaron la oposición, los socios o los tribunales. | `promesa`, `bloqueadoPor` |
| `no-intentado` | Lo prometieron y no hicieron ningún intento real. Hay que explicar por qué (razón declarada y contexto). | `promesa`, `motivo` |
| `contradiccion` | Dijeron una cosa y hicieron la contraria, o cambiaron de posición sin explicarlo. | — |
| `judicial` | Procedimientos judiciales que afectan al partido, a sus dirigentes o a su financiación. | `estadoJudicial`, `implicados` |

Las fichas `judicial` solo aparecen en la vista «Causas judiciales» y en la página de cada partido, no en las vistas por tema, que comparan lo que propone cada partido con lo que hizo. Su campo `tema` se mantiene como metadato.

### Reglas para elegir categoría

- **La promesa se cita tal como se hizo.** Si prometieron 20 semanas y lograron 19, la promesa dice 20 y el título refleja el cumplimiento parcial («19 de las 20 semanas prometidas»). Nunca se reformula la promesa para que encaje con el resultado. Si una parte esencial de la promesa no se cumplió (por ejemplo, la garantía legal de un porcentaje), se separa en otra ficha.
- **Qué cuenta como intento** (para distinguir `bloqueado` de `no-intentado`): registrar una proposición o proyecto de ley, una proposición no de ley, una enmienda o un recurso, aprobar una norma donde se gobierna, o una negociación formal documentada. Para afirmar que no hubo intento hay que haber buscado en las iniciativas del Congreso/Senado (y del parlamento autonómico si gobiernan) y decirlo en el cuerpo: «No consta ninguna iniciativa en [fuente consultada] a [fecha]». Se distingue una promesa condicionada a gobernar de un compromiso asumido para la oposición.
- **Una contradicción exige incompatibilidad demostrada**: una declaración o compromiso concreto y una actuación concreta que lo contradice, con fechas. Defender una reforma no obliga a votar cualquier texto; proponer algo no es prometer renunciar unilateralmente. Si la incompatibilidad no se demuestra, el hecho va al balance del programa, no a `contradiccion`.
- **Votar en contra de una norma que incluye lo prometido** cuenta como contradicción solo si: (1) el partido se había comprometido de forma concreta con esa medida (no basta un compromiso genérico); (2) su voto, de haber prosperado, la hacía decaer; y (3) la ficha recoge su argumento (otras medidas incluidas en la norma, alternativa propia) y si presentó una alternativa que la garantizara a tiempo. Si falta (1) o (2), el hecho va al balance del programa.
- **Apoyar la tramitación no es apoyar el contenido.** Votar a favor de tramitar una ILP o una proposición no demuestra respaldo a su texto final; para una contradicción hay que acreditar qué contenido se apoyó y después se rechazó.
- **Los resultados judiciales no son logros de un partido.** Personarse como acusación popular es una actuación del partido; la sentencia es del tribunal.
- **Mismo hecho, mismos datos.** Si un hecho aparece en fichas de varios partidos (votaciones, decretos, fechas), se usan las mismas cifras y se identifica cada norma por su número y objeto, nunca por «el primero/el segundo».

Para los partidos en la oposición estatal, `cumplido` y `bloqueado` pueden referirse a lo que prometieron hacer desde la oposición (iniciativas, mayoría en el Senado, recursos ante el Tribunal Constitucional) o a lo hecho donde gobiernan, indicándolo con `ambito: autonomico` o `municipal`.

## Gravedad de las causas y alcance de lo cumplido

No todas las fichas de una categoría pesan lo mismo. Para que el lector lo vea sin que la web opine, se registran **hechos comparables** y la web los muestra como etiquetas con su dato. No hay puntuaciones propias: la gravedad de un delito la da el Código Penal y el alcance de una medida, la comparación entre lo prometido y lo logrado. Estos criterios no se ajustan mirando cómo quedan los partidos; si una regla resulta inadecuada, se cambia para todos y se documenta aquí.

### `gravedad` (obligatorio en `judicial`)

```yaml
gravedad:
  naturaleza: penal          # penal | civil | contable | administrativa
  sujetos:
    - nombre: "José Luis Ábalos"
      vinculo: direccion     # partido | direccion | cargo | excargo | entorno | sin-cargo
      cuando: "ministro de Transportes y secretario de Organización del PSOE"
      enFunciones: true
      delito: "organización criminal, cohecho, tráfico de influencias y malversación (arts. 570 bis, 419, 428 y 432 CP)"
      clasificacion: grave   # grave | menos-grave | leve | no-penal
      pena:
        texto: "24 años y 3 meses de prisión"
        anios: 24.25
        tipo: impuesta       # impuesta | pedida
        por: "Tribunal Supremo"
      estado: condena-firme  # solo si difiere de estadoJudicial
  cuantias:
    - euros: 204198
      concepto: "devolución como partícipe a título lucrativo"
```

- **La unidad es cada persona o entidad vinculada al partido y sometida al procedimiento.** Cada pena, cuantía y desenlace se atribuye a quien corresponde: la responsabilidad civil del partido no se mezcla con la prisión de un alcalde. Terceros sin vínculo con el partido (un comisario, un empresario) no se listan.
- Cuenta como sometida al procedimiento la persona a la que un juez o la Fiscalía propuso investigar (querella, denuncia o exposición razonada), aunque el tribunal competente lo rechazara. Se lista con su propio `estado`.
- `vinculo`, **en el momento de los hechos**:
  - `partido`: el partido como persona jurídica.
  - `direccion`: dirección nacional del partido o miembro del Gobierno de España.
  - `cargo`: cargo electo, orgánico, o designado por un gobierno del partido.
  - `excargo`: ya había dejado el cargo.
  - `entorno`: familiares y colaboradores sin cargo.
  - `sin-cargo`: no tenía cargo entonces, aunque lo tuvo después (por ejemplo, hechos anteriores a ser diputado).
  
  `cuando` describe ese cargo en texto.
- `enFunciones: true` solo si los hechos se atribuyen al ejercicio de funciones públicas u orgánicas: adjudicar, contratar, gestionar, decidir, financiar el partido o usar sus recursos o los públicos. Ocupar un cargo mientras ocurren hechos privados no cuenta, y las declaraciones, mensajes en redes y la propaganda tampoco, aunque se hagan como dirigente. Para el partido como persona jurídica, `true` si se trata de su financiación o su gestión.
- `clasificacion`: la del delito más grave imputado o condenado a ese sujeto, con los umbrales de los artículos 13 y 33 del Código Penal aplicados a la **pena principal del tipo**: la de prisión si la tiene y, si no, su pena principal (por ejemplo, la inhabilitación de la prevaricación).
  - `grave`: más de 5 años de prisión, o inhabilitación de más de 5 años como pena principal.
  - `menos-grave`: de 3 meses a 5 años de prisión, multa de más de 3 meses (incluida la multa proporcional) o inhabilitación de hasta 5 años.
  - `leve`: delitos leves.
  - `no-penal`: responsabilidad civil, contable o administrativa.

  No cuentan las penas accesorias ni las comunes a todo un título (la inhabilitación del art. 510.5 en los delitos de odio, la del art. 192.3 en los sexuales), ni el art. 33.7, que califica de graves todas las penas de las personas jurídicas: el partido se clasifica por la pena del tipo para personas físicas. `delito` cita los artículos y la pena del tipo. Se usa el tipo básico salvo que la pena pedida o impuesta solo quepa en un subtipo; si la fuente no lo aclara, se dice en el cuerpo.
- `pena` solo si consta en una fuente de la ficha:
  - `tipo: impuesta` cuando hay sentencia, aunque no sea firme.
  - `tipo: pedida` cuando solo hay escrito de acusación. `por` dice quién la pide (Fiscalía, acusación popular o particular, con su nombre); si las acusaciones piden penas distintas, se pone la de la Fiscalía y, en el texto, la de las demás.
  - `anios` solo para la prisión.
  - Sin dato, se omite: **nunca se pone 0 ni se estima**.
- `cuantias` solo con importe y concepto según la resolución o la acusación citada (contrato, perjuicio, comisiones, multa, devolución). El importe de un contrato no es un perjuicio acreditado; el concepto lo distingue.
- La etiqueta que ve el lector se redacta según el estado procesal: «Investigación por delito grave», «Acusación por delito grave», «Condena por delito grave». En causas archivadas o con absolución se muestra solo ese desenlace.
- `importancia` en `judicial`:
  - No puede ser 3 si ningún sujeto tiene `clasificacion: grave`, salvo que el propio partido sea sujeto (`vinculo: partido`).
  - Si todos los sujetos son `leve` o `no-penal` y el partido no es sujeto, debe ser 1.

### `alcance` (obligatorio en `cumplido`)

```yaml
alcance:
  grado: parcial             # completo | parcial | minimo | no-evaluable
  medida: "3 de las 4 semanas adicionales prometidas (de 16 a 19; se prometían 20)"
  vigencia: en-vigor         # en-vigor | pendiente | anulada-parcial | anulada | derogada
  ejecucion: aplicada        # aplicada | parcial | sin-aplicar | no-consta
  magnitud: "unos 500.000 permisos al año (Seguridad Social, 2025)"   # opcional
```

- **Fecha de corte**: la disolución del 6 de octubre de 2026 en lo estatal; `actualizado` en lo autonómico o municipal.
- **`grado` de una promesa cuantificable**: el avance logrado sobre el punto de partida, dividido entre el cambio prometido. Pasar de 16 a 19 semanas cuando se prometían 20 es 3 de 4, un 75 %, no un 95 %.
  - `completo`: 100 %.
  - `parcial`: del 50 % al 99 %.
  - `minimo`: menos del 50 %.
- **`grado` de una promesa cualitativa**: se identifican en el cuerpo sus elementos esenciales.
  - `completo`: se lograron todos.
  - `parcial`: se logró el núcleo, pero faltan elementos secundarios.
  - `minimo`: solo se lograron elementos accesorios o formales, como un plan, un estudio o una declaración, donde se prometía una medida.
  - Si lo logrado sustituye el objeto esencial por otro distinto, no es `cumplido`: va a otra categoría.
- Si una promesa estatal solo se logra donde el partido gobierna, el grado es `parcial` si en ese territorio se logró su núcleo, y `medida` indica el ámbito.
- `no-evaluable` solo si la promesa no tiene términos verificables. El cuerpo lo explica.
- Un retraso no cambia el grado; se indica en `medida`. Un piloto cuenta como `completo` si lo prometido era el piloto; su ejecución presupuestaria va en `ejecucion` y `medida`.
- `medida` es una frase de 160 caracteres como máximo con los números de lo prometido frente a lo logrado, todos localizables en las fuentes de la ficha.
- **`vigencia` y `ejecucion` se miden por separado**: entrar en vigor no demuestra que una medida se aplique.
  - `ejecucion: aplicada` exige un dato de aplicación en las fuentes. Sin él, `no-consta`, aunque la norma sea de aplicación directa.
  - `ejecucion: parcial` si se aplica solo en parte del territorio, de los beneficiarios o del presupuesto.
  - `vigencia: sustituida` si una norma posterior la reemplazó en lo mismo (por ejemplo, un salario mínimo anual o unos presupuestos), sin revertirla.
  - `no-aplica` en ambos campos para actuaciones puntuales ya realizadas (una moción, un recurso, una comparecencia).
  - Si una misma medida aparece en fichas de varios partidos, `vigencia`, `ejecucion` y las cifras deben coincidir.
- `magnitud`, opcional: personas o dinero afectados, con fuente en la ficha.

## Programa vs. hechos

Para cada partido hay una entrada por tema (ver `src/data/temas.ts`) en `src/content/programa/<partido>/<tema>.md`:

- `propuesta`: lo más relevante que proponen ahora para el 29-N (programa 2026 si ya está publicado; si no, sus propuestas oficiales más recientes, indicándolo en el texto).
  Mientras el partido no publica su programa (sin `programaUrl`), la web presenta estas propuestas como «programa tentativo» con el aviso «Sin confirmar». Solo se incluyen anuncios atribuibles al partido o a su candidatura, con fuente; los adelantos de prensa sin cita del partido no entran.
- `balance`: qué han hecho realmente en ese tema durante la legislatura (votaciones, leyes, gestión donde gobiernan).
- `coherencia`: `coherente`, `parcial`, `contradictorio` o `sin-historial`. Mide si **sus actuaciones** (votos, iniciativas, gestión donde gobiernan) van en la línea de lo que proponen, **no si lograron aprobarlo**. Perder una votación no rebaja la coherencia; votar en contra de lo que se propone, sí.
- Las propuestas se citan del programa, de documentos o resoluciones aprobadas por el partido o de declaraciones de su candidatura. Un agregador o una nota de prensa no sustituyen al documento original cuando este existe; si solo hay agregador, se atribuye explícitamente.

### Ficha de partido (`src/content/partidos/<id>.yaml`)

No se publican encuestas ni estimaciones de voto o escaños, para no influir en el voto; la única encuesta que usa la web es la del CIS sobre los problemas que preocupan, para ordenar los temas.

Estructura común para todos, sin balance valorativo (el balance va en las fichas): `resumen` = papel institucional en la legislatura + dónde gobierna + contexto electoral (coalición, candidatura). `nota` = advertencias comunes (por ejemplo, si el programa 2026 aún no está publicado y cuáles son sus propuestas oficiales más recientes). `programaUrl` solo enlaza el programa del 29-N; mientras no esté publicado se deja vacío y la ficha muestra «aún no disponible» (no se enlaza el de 2023).

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
- `importancia` (1–3) ordena las fichas en la portada; 3 = de lo más relevante de la legislatura. En `cumplido`, `bloqueado`, `no-intentado` y `contradiccion` mide el peso de la promesa: 3 si era una medida central del programa, de la investidura o de un acuerdo de gobierno, o si afecta a gran parte de la población; 1 si era una medida sectorial o menor. En `judicial` sigue además las reglas de `gravedad`.
- En el cuerpo se pueden citar las fuentes con su número entre corchetes, p. ej. `[1]`, en el orden de la lista `fuentes`.
- Cada URL debe existir y respaldar lo que se afirma. Nada de enlaces inventados ni reconstruidos de memoria.
