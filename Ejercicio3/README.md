# Ejercicio 3: registro y ciclo de vida del Service Worker

## Objetivo

Registrar un Service Worker desde la aplicación y observar sus eventos `install`, `activate` y `fetch`. El ejercicio también muestra el estado de conexión y guarda datos de ejemplo en IndexedDB.

## Archivos

- `index.html`: contiene el estado de conexión y los controles para guardar y consultar datos.
- `app.js`: registra `./sw.js` al cargar la página, actualiza el indicador online/offline y administra la base IndexedDB `MiPWA_DB`.
- `style.css`: estilos de la interfaz.
- `sw.js`: precarga la interfaz en `install`, elimina cachés anteriores y reclama clientes en `activate`, y responde a solicitudes en `fetch`.
- `.vscode/settings.json`: configuración local de Live Server para el proyecto.

## Comportamiento

- **`install`**: abre `ejercicio3-pwa-v1`, guarda el HTML, CSS y JavaScript, y solicita activación inmediata.
- **`activate`**: elimina entradas de Cache Storage distintas de la caché actual y toma control de las páginas abiertas.
- **`fetch`**: busca primero la solicitud en Cache Storage; si no existe, la consulta a la red y guarda la respuesta.
- **IndexedDB**: permite guardar texto con fecha y mostrar los registros guardados desde la interfaz.

## Prueba

1. Abre `Ejercicio3/` desde localhost o HTTPS.
2. En DevTools → **Application → Service Workers**, revisa el registro y la activación.
3. Abre la consola y recarga para ver los mensajes de ciclo de vida y solicitudes.
4. Introduce un dato, pulsa **Guardar dato** y luego **Mostrar datos**.
5. Cambia el estado de red desde DevTools → Network para comprobar el indicador de conexión.

El primer `fetch` controlado puede producirse después de la activación del worker. El acceso al almacenamiento del navegador requiere ejecutar la página desde un origen compatible, no desde `file://`.
