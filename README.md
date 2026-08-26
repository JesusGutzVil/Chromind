# Chromind — Dibujo Mágico Infantil

Chromind es una Progressive Web App (PWA) de dibujo dirigida a niños, pensada para que padres y educadores obtengan una lectura emocional del estado de ánimo del niño a partir de su obra artística. La idea central es que los colores, la velocidad y la distribución espacial de los trazos revelan información psicológica que puede facilitar la conversación y el acompañamiento.

---

## ¿Qué hace?

El usuario (generalmente un niño con supervisión de un adulto) dibuja libremente o colorea una plantilla. Al terminar, presiona "Analizar Dibujo" y la app genera un informe automático que incluye:

- **Arquetipo emocional** — una categoría narrativa (ej. "Volcán Expresivo", "Constructor Reflexivo") derivada de los colores dominantes y el ritmo de los trazos.
- **Estado de ánimo** — una lectura general del ánimo del momento ("Entusiasmo y Alegría", "Calma y Serenidad", etc.).
- **Mapa de emociones** — gráfico de radar pentagonal con cinco dimensiones: Vitalidad, Calma, Expresividad, Concentración y Afecto.
- **Distribución de colores** — barra visual mostrando qué porcentaje del lienzo ocupó cada color.
- **Mapa espacial** — cuadrícula 3×3 que muestra en qué zona del lienzo se concentró la actividad (arriba = imaginación, centro = yo interior, derecha = futuro, etc.).
- **Dinámica del trazo** — métricas objetivas: número de trazos, ritmo de dibujo, grosor promedio, uso del borrador, cobertura del lienzo y herramienta más usada.
- **Texto psicológico** — explicación escrita del patrón detectado, adaptada a cada arquetipo.
- **Sección para padres/educadores** — recomendaciones prácticas y "preguntas mágicas" para iniciar una conversación con el niño basada en el dibujo.

---

## ¿Por qué existe?

El dibujo infantil es una herramienta de expresión emocional ampliamente documentada en psicología (test de la figura humana, test del árbol, análisis cromático de Luscher, entre otros). Sin embargo, el acceso a esa información suele requerir profesionales especializados. Chromind lleva una versión simplificada y accesible de ese análisis directamente al teléfono o tablet de cualquier padre o educador, sin necesidad de conocimientos previos.

No reemplaza a un psicólogo; sirve como punto de partida para detectar estados emocionales, iniciar diálogos y acompañar al niño de forma más informada.

---

## ¿Para quién?

- **Padres y madres** que quieren entender mejor cómo se siente su hijo en un momento dado.
- **Educadores y maestros** que usan el dibujo como actividad en el aula y desean un análisis rápido.
- **Terapeutas o psicólogos** como apoyo visual adicional durante sesiones creativas.
- **Los propios niños**, que simplemente disfrutan dibujando con una interfaz colorida y amigable.

---

## Cómo funciona técnicamente

### Stack

- HTML + CSS + JavaScript vanilla. Sin frameworks ni dependencias externas de lógica.
- PWA: incluye `manifest.json` y un Service Worker (`sw.js`) para que la app pueda instalarse en el dispositivo y funcionar offline.
- Se sirve localmente con WAMP (Apache). El `.htaccess` configura las cabeceras de caché y MIME types necesarios para que el Service Worker funcione correctamente.

### Canvases

Se usan dos elementos `<canvas>` apilados:

1. **template-canvas** — Muestra la plantilla de colorear (imagen de fondo). No recibe eventos del usuario.
2. **drawing-canvas** — Recibe todos los trazos del usuario. Se dibuja encima del template canvas.

Al analizar o descargar, ambos se fusionan en un canvas temporal.

### Motor de dibujo

El dibujo usa curvas cuadráticas de Bézier interpoladas entre los puntos capturados en `mousemove` / `touchmove`. Esto produce líneas suaves en lugar de segmentos rectos. El historial de deshacer/rehacer almacena snapshots de `ImageData` (máximo 30 estados).

### Motor de análisis psicológico

El análisis ocurre completamente en el cliente cuando el usuario presiona "Analizar":

1. Se reduce el canvas a 200×150 píxeles para muestrear eficientemente.
2. Cada píxel visible se asigna al color de paleta más cercano usando distancia euclidiana en espacio RGB.
3. Se calculan porcentajes por color y se agrupan en cálidos, fríos y sombríos.
4. Se evalúan métricas de trazo registradas durante la sesión (velocidad, grosor, uso del borrador, deshacer).
5. Se aplican reglas de clasificación para determinar arquetipo y estado de ánimo.
6. Para el análisis espacial, el canvas se divide en una cuadrícula 3×3 y se cuenta la densidad de píxeles en cada celda (inspirado en el método Corman/Jung de distribución espacial del dibujo).
7. Las puntuaciones del radar se calculan con fórmulas ponderadas a partir de los datos anteriores.

### Arquetipos disponibles

| Arquetipo | Condición principal |
|---|---|
| Lienzo en Silencio | Lienzo casi vacío |
| Volcán Expresivo | Rojo dominante + trazos rápidos |
| Explorador Radiante | Colores cálidos >60% + ritmo fluido |
| Constructor Reflexivo | Colores fríos >55% + trazos lentos |
| Observador Sensible | Rosa como color dominante |
| Pequeño Soñador | Morado + tonos sombríos >55% |
| Guardián Interior | Tonos sombríos >50% |
| Creador Armónico | Distribución equilibrada (ningún color supera 35%) |

### Paleta de colores

La paleta tiene 10 colores, cada uno con un significado psicológico asignado:

- Rojo → alta energía, impulsividad, pasión
- Naranja → entusiasmo, sociabilidad
- Amarillo → curiosidad, optimismo
- Verde → equilibrio, crecimiento
- Azul → calma, introversión
- Morado → fantasía, creatividad profunda
- Rosa → afectividad, ternura
- Marrón → estabilidad, conexión con lo terrenal
- Negro → reserva, introspección
- Blanco → limpieza, nuevo comienzo

---

## Estructura de archivos

```
Chromind/
├── index.html           Estructura completa de la app (canvas, sidebar, modales)
├── app.js               Toda la lógica: dibujo, análisis, UI
├── style.css            Estilos (diseño responsive, animaciones, temas)
├── manifest.json        Configuración PWA
├── sw.js                Service Worker (caché offline)
├── .htaccess            Configuración Apache (caché, MIME types)
└── images/
    ├── maceta.png           Plantilla: maceta con flores
    ├── mandala1.png         Plantilla: mandala floral
    ├── icon-192.png         Ícono PWA
    ├── icon-512.png         Ícono PWA (grande)
    └── apple-touch-icon.png
```

---

## Interfaz de usuario

La UI es totalmente responsive con dos variantes:

- **Desktop/tablet horizontal** — Sidebar izquierdo con herramientas, colores, grosor, acciones de edición y botón de análisis.
- **Mobile** — Barra inferior flotante con las herramientas esenciales; las opciones de color y grosor se abren en un bottom sheet. Las acciones de deshacer, plantillas y limpiar aparecen como botones flotantes en la esquina superior.

Las plantillas disponibles (lienzo libre, maceta, mandala) se eligen desde un drawer lateral. También se puede subir una imagen propia del dispositivo para usarla como plantilla de colorear.

---

## Limitaciones y notas importantes

- El análisis es orientativo. No es un diagnóstico clínico ni reemplaza la evaluación de un profesional de la salud mental.
- Los significados de los colores son generalizaciones culturales ampliamente aceptadas, no verdades absolutas. La interpretación siempre debe hacerse en contexto.
- El motor analiza solo los colores de la paleta incorporada; trazos blancos sobre plantillas blancas pueden no registrarse correctamente.
- El historial de deshacer se pierde al recargar la página (no se persiste en ningún almacenamiento local).
