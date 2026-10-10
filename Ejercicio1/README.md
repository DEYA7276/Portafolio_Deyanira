# Ejercicio 1: Web App Manifest y metadatos

## Objetivo

Declarar la identidad y las opciones de instalación de una aplicación web progresiva mediante un Web App Manifest enlazado desde el HTML.

## Archivos

- `index.html`: documento base; enlaza `manifest.json` y configura metadatos de tema e integración con dispositivos Apple.
- `manifest.json`: define el nombre, nombre corto, URL inicial, modo de visualización, colores, orientación e iconos.
- `assets/icons/icon-192.png`: icono PNG de 192 × 192 píxeles.
- `assets/icons/icon-512.png`: icono PNG de 512 × 512 píxeles.

## Propiedades del manifest

| Propiedad | Valor | Propósito |
|---|---|---|
| `name` | `Trabajo 1` | Nombre completo de la aplicación. |
| `short_name` | `Nombre corto` | Nombre compacto para superficies con poco espacio. |
| `start_url` | `/index.html` | Documento que se abre al iniciar la aplicación instalada. |
| `display` | `standalone` | Presenta la aplicación sin la interfaz habitual del navegador. |
| `theme_color` | `#000000` | Color de la interfaz del navegador durante la experiencia de instalación/ejecución. |
| `background_color` | `#ffffff` | Color de fondo usado al iniciar la aplicación. |

## Ejecución y comprobación

1. Sirve el repositorio mediante localhost o HTTPS y abre `Ejercicio1/index.html`.
2. En Chrome DevTools, abre **Application → Manifest**.
3. Verifica que se detecte el manifest y que carguen los iconos de 192 × 192 y 512 × 512.
4. Comprueba los metadatos de tema y los campos de instalación indicados arriba.

No abras el HTML mediante `file://`: los navegadores no permiten probar la instalación PWA de esa forma.

## Nota de rutas

El manifest y el `apple-touch-icon` usan rutas absolutas desde la raíz del dominio (`/assets/icons/...`). Si el sitio se publica bajo una subruta de GitHub Pages, las rutas pueden apuntar fuera de `Ejercicio1`; para probarlo bajo esa subruta, ajusta los recursos a rutas relativas o publica el ejercicio en la raíz del dominio.
