# Ejercicio 2: App Shell y splash screen

## Objetivo

Presentar una interfaz base responsiva —encabezado, navegación y contenido— y configurar un manifest instalable con los iconos y colores que permiten al navegador generar la experiencia de apertura.

## Archivos

- `index.html`: interfaz, navegación y registro del Service Worker.
- `styles.css`: estilos de encabezado, menú y tarjeta principal con ajustes para tablet y móvil.
- `manifest.json`: nombre, alcance, inicio, modo `standalone`, colores e iconos.
- `icons/icon-192.png` y `icons/icon-512.png`: iconos de instalación PNG.
- `sw.js`: instala los recursos definidos por el App Shell y responde desde caché cuando encuentra una copia.
- `.vscode/settings.json`: configuración local de Live Server para el proyecto.

## Prueba en Chrome

1. Sirve la carpeta mediante localhost o HTTPS y abre `Ejercicio2/`.
2. En DevTools → **Application → Manifest**, comprueba nombre, colores y los dos iconos.
3. En **Application → Service Workers**, verifica que `sw.js` esté registrado y activo.
4. Instala la aplicación desde Chrome y abre la aplicación instalada para observar la pantalla de inicio generada por el navegador.
5. Cambia el ancho de la ventana y comprueba cómo el menú se adapta a pantallas pequeñas.

La splash screen es generada por el navegador a partir de la información del manifest y los iconos; no es una pantalla HTML independiente.
