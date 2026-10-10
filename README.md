# Portafolio de ejercicios PWA

Repositorio de Deyanira con cinco ejercicios progresivos sobre aplicaciones web progresivas. Cada actividad está aislada en su propia carpeta y tiene un README con sus archivos, objetivo y pasos de prueba.

## Ejercicios

| Orden | Carpeta | Tema | Punto de entrada |
|---:|---|---|---|
| 1 | [Ejercicio1](./Ejercicio1/) | Web App Manifest, metadatos de instalación e iconos | [index.html](./Ejercicio1/index.html) |
| 2 | [Ejercicio2](./Ejercicio2/) | App Shell, diseño responsivo e instalación | [index.html](./Ejercicio2/index.html) |
| 3 | [Ejercicio3](./Ejercicio3/) | Registro y ciclo de vida del Service Worker | [index.html](./Ejercicio3/index.html) |
| 4 | [Ejercicio4](./Ejercicio4/) | Cache API y estrategia Cache-First | [index.html](./Ejercicio4/index.html) |
| 5 | [Ejercicio5](./Ejercicio5/) | Interceptor de peticiones y fallback offline | [index.html](./Ejercicio5/index.html) |

## Requisitos

- Navegador moderno con soporte para Service Workers, Cache API e IndexedDB.
- Un servidor local o alojamiento HTTPS. Los Service Workers no funcionan al abrir los HTML directamente mediante `file://`.
- Para desarrollo local en Windows, inicia Apache en XAMPP y visita cada ejercicio bajo `http://localhost/Guille_Proy/EjercicioN/`. También puedes usar otra herramienta de servidor estático.

## Recorrido recomendado

1. Lee el README de la carpeta antes de abrir el ejercicio.
2. Sirve el repositorio desde localhost o HTTPS y abre el `index.html` correspondiente.
3. Para los ejercicios 2 a 5, espera a que el Service Worker termine de registrarse e instalarse antes de probarlo.
4. Usa DevTools → Application para inspeccionar manifests, Service Workers y Cache Storage; usa Network → Offline para probar el fallback del ejercicio 5.

## Publicación

El repositorio contiene cinco aplicaciones estáticas separadas. Cada una se puede abrir desde su propia ruta en un servidor que publique el contenido del repositorio, por ejemplo `/Ejercicio2/`. GitHub Pages publica el contenido del repositorio como un único sitio estático; las carpetas se conservan como rutas independientes dentro de ese sitio.

**Nota sobre el ejercicio 1:** su manifest y el enlace Apple touch icon usan rutas que comienzan en `/assets/`. En una publicación de proyecto bajo una subruta como `/Portafolio_Deyanira/`, esas rutas apuntan a la raíz del dominio. Para probar instalación allí, sirve el ejercicio en la raíz del dominio o adapta dichas rutas al prefijo de publicación.

## Organización del repositorio

```text
Portafolio_Deyanira/
├── README.md
├── Ejercicio1/
├── Ejercicio2/
├── Ejercicio3/
├── Ejercicio4/
└── Ejercicio5/
```

Los recursos y scripts de cada ejercicio permanecen dentro de su carpeta para mantenerlos separados y facilitar su revisión.
