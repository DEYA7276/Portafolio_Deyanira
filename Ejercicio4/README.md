# Ejercicio 4: Cache API y estrategia Cache-First

## Objetivo

Guardar de antemano los recursos estáticos del App Shell y atender primero desde Cache Storage las solicitudes GET del mismo origen.

## Archivos

- `index.html`: explica visualmente el flujo Cache-First y enumera los recursos incluidos en el App Shell.
- `styles.css`: diseño responsivo y componentes visuales del ejercicio.
- `app.js`: registra el Service Worker y muestra su estado junto con el estado de conexión.
- `sw.js`: administra la caché `pwa-ejercicio4-app-shell-v3`.
- `img/icon-192.png` y `img/icon-512.png`: imágenes base incluidas en la precarga.

## Recursos precargados

Al instalarse, el worker guarda `index.html`, `styles.css`, `app.js` y ambos iconos. También incluye `./` para la ruta de inicio. Durante `fetch`, si la solicitud es GET y pertenece al mismo origen, el worker busca la respuesta en caché y recurre a la red si no encuentra una copia.

## Prueba

1. Sirve la carpeta desde localhost o HTTPS y abre `Ejercicio4/`.
2. Espera la activación del Service Worker; si es necesario, recarga una vez.
3. En DevTools → **Application → Cache Storage**, abre la caché `pwa-ejercicio4-app-shell-v3` y revisa sus entradas.
4. Activa **Network → Offline** y recarga para observar la disponibilidad de los recursos precargados.

Esta estrategia no implementa una página HTML de fallback para recursos que no estén en caché y fallen en la red; ese comportamiento se aborda en el ejercicio 5.
