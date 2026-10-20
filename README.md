# verdadpolitica.es

> **Estás usando mal esta web si solo lees una ideología política.**

Web independiente y de código abierto que contrasta lo que prometieron los partidos que se presentan a las elecciones generales del 29 de noviembre de 2026 con lo que hicieron en la XV legislatura (2023–2026):

- qué prometieron y cumplieron,
- qué intentaron y les bloquearon (la oposición, sus socios o los tribunales),
- qué prometieron y ni intentaron, y por qué,
- dónde dijeron una cosa e hicieron otra,
- qué causas judiciales les afectan, con su estado procesal exacto,
- y qué proponen ahora en ocho temas clave, frente a lo que han hecho.

Cada afirmación lleva sus fuentes. Si falta alguna, la build falla.

## Colaborar

Cualquiera puede proponer cambios mediante *issues* o *pull requests*. Solo el mantenedor puede aceptarlos. Lee [CONTRIBUTING.md](CONTRIBUTING.md) y la [guía editorial](docs/GUIA-CONTENIDO.md) antes de empezar.

## Desarrollo

Requiere Node.js 22.22 o superior.

```sh
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera la web estática en dist/ y valida todo el contenido
```

### Dónde está cada cosa

| Ruta | Contenido |
|---|---|
| `src/content/partidos/*.yaml` | Datos de cada partido (candidatura, escaños, encuestas) |
| `src/content/fichas/<partido>/*.md` | Fichas de la legislatura, una por archivo |
| `src/content/programa/<partido>/<tema>.md` | Programa frente a hechos, una por tema |
| `src/data/temas.ts` | Lista de temas comunes a todos los partidos |
| `src/content.config.ts` | Esquema que valida el contenido (fuentes obligatorias) |
| `src/pages/` | Páginas de la web |

### Añadir un partido

1. Crea `src/content/partidos/<id>.yaml` copiando uno existente.
2. Crea las carpetas `src/content/fichas/<id>/` y `src/content/programa/<id>/`.
3. Añade fichas en las cinco categorías y una entrada por cada tema, con el mismo nivel de detalle que los demás partidos.

## Despliegue

Cada cambio en `main` se publica automáticamente en https://verdadpolitica.es (GitHub Pages con dominio propio) mediante `.github/workflows/deploy.yml`. El dominio está fijado en `astro.config.mjs` y en *Settings → Pages → Custom domain*; el DNS apunta a los servidores de GitHub Pages:

- `verdadpolitica.es`: registros A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (y AAAA `2606:50c0:8000::153` … `2606:50c0:8003::153`).
- `www.verdadpolitica.es`: CNAME `jorgemf.github.io`.

## Licencias

- Código: [MIT](LICENSE).
- Contenido (`src/content/` y `docs/`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es). Puedes reutilizarlo citando la fuente y compartiendo con la misma licencia.
