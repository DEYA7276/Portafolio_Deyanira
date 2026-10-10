# Ejercicio 5: interceptor y modo sin conexión

## Objetivo

Interceptar solicitudes y mostrar una página offline personalizada cuando falla una navegación que no está almacenada en caché.

## Archivos

- `index.html`: explica el ejercicio, presenta el estado de conexión y contiene el enlace de prueba.
- `app.js`: actualiza el indicador al recibir eventos `online` y `offline`, y registra `sw.js`.
- `sw.js`: precarga el App Shell y la página offline; responde desde caché o consulta la red.
- `offline.html`: mensaje y enlace de regreso para la navegación sin conexión.
- `styles.css`: estilos compartidos por la página principal y el fallback.

## Comportamiento del Service Worker

1. Durante `install`, guarda `index.html`, `offline.html`, `styles.css` y `app.js`.
2. Durante `activate`, elimina versiones anteriores de las cachés con prefijo `ejercicio5-` y reclama los clientes.
3. Durante `fetch`, ignora solicitudes que no sean GET o que vayan a otro origen.
4. Para recursos almacenados, entrega la respuesta en caché.
5. Si falla una navegación no almacenada, entrega `offline.html`. Si falla una solicitud que no es navegación, responde con estado HTTP 503.

## Prueba de fallback

1. Sirve la carpeta desde localhost o HTTPS y abre `Ejercicio5/`.
2. Espera a que termine la instalación del Service Worker.
3. En DevTools → **Network**, activa **Offline**.
4. Pulsa **Simular navegación sin caché**. La ruta de prueba no está precargada; la navegación fallida debe mostrar la página offline.
5. Usa **Volver al inicio** para regresar a la página almacenada.

Para probar el caso de pérdida de red, mantén DevTools abierto y conserva el Service Worker activo durante la navegación.
