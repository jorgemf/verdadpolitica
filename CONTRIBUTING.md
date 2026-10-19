# Cómo contribuir

Gracias por ayudar a que esta web sea más precisa y más justa con todos los partidos.

## Formas de ayudar

1. **Avisar de un error**: abre un [issue](https://github.com/jorgemf/verdadpolitica/issues/new/choose) con la plantilla «Corrección». Incluye un enlace que respalde la corrección.
2. **Editar una ficha**: cada ficha de la web tiene un enlace «Editar esta ficha en GitHub». GitHub crea tu copia (*fork*) y te deja proponer el cambio como *pull request* desde el navegador.
3. **Añadir una ficha o un partido**: sigue la [guía editorial](docs/GUIA-CONTENIDO.md). Copia una ficha existente como plantilla.
4. **Mejorar el código, el diseño o la accesibilidad**: los *pull requests* son bienvenidos.

## Reglas para el contenido

Resumen de la [guía editorial](docs/GUIA-CONTENIDO.md), que es la que manda:

- Mismo rasero para todos los partidos.
- Hechos verificables, sin adjetivos valorativos ni ironía.
- Al menos dos fuentes por ficha, preferentemente primarias (BOE, Congreso, Senado, resoluciones judiciales).
- En las causas judiciales, el estado procesal exacto y la presunción de inocencia.
- Cada URL tiene que existir y decir lo que se afirma.

## Antes de abrir un pull request

```sh
npm install
npm run build
```

Si la build falla, el mensaje indica qué archivo y qué campo no cumplen el esquema (por ejemplo, una ficha sin fuentes o una ficha `no-intentado` sin `motivo`). La integración continua ejecuta la misma comprobación en cada *pull request*.

## Revisión

Cualquiera puede proponer cambios, pero solo el mantenedor puede aceptarlos en `main`. Se pueden pedir fuentes adicionales o cambios de redacción. Las discusiones son públicas: critica los datos, no a las personas.

## Licencia de las contribuciones

Al contribuir aceptas que tu código se publique bajo licencia MIT y tu contenido bajo CC BY-SA 4.0.
