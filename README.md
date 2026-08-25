# 🎨 Chromind — Dibujo Mágico Infantil & Psicología del Color

> **Chromind** es una Progressive Web App (PWA) de dibujo infantil diseñada bajo principios rigurosos de **Diseño Mobile-First, Ergonomía Infantil, Leyes UX y Psicología del Color**. Permite a los niños expresarse con libertad y ofrece a padres y educadores un informe psicoeducativo profundo con visualizaciones avanzadas (Radar Pentagonal, mapa espacial y arquetipos emocionales).

---

## ✨ Características Principales

### 🖌️ Editor de Dibujo Intuitivo para Niños
- **5 Herramientas Creativas:**
  - 🖌️ **Pincel Artístico / Crayon:** Trazo suave y orgánico mediante interpolación de curvas Bézier.
  - 🖍️ **Marcador Brillante:** Trazo semitransparente para superposiciones de color.
  - 🪣 **Bote de Pintura (Flood Fill 2D):** Relleno de áreas cerradas para colorear plantillas.
  - ✨ **Spray Mágico:** Trazo interactivo con partículas chispeantes y estrellas dispersas.
  - 🧽 **Borrador Amigable:** Borrado limpio con tamaños ajustables.
- **Galería de Plantillas y Subida de Imágenes:** Incluye dibujos predefinidos (Maceta, Mandala) y soporte para cargar fotos o dibujos desde el dispositivo.
- **Paleta de Colores & Selector de Grosores:** 10 colores vibrantes con indicador activo y 4 tamaños táctiles rápidos (Fino, Medio, Grueso, Gigante) más control deslizante fino.
- **Salvaguardas Infantiles:** Botones de Deshacer/Rehacer y modal tierno de confirmación antes de limpiar el lienzo.

### 🧠 Motor Psicoeducativo Multivariable
- **Mapeo Espacial de 9 Cuadrantes (3x3):** Basado en pruebas proyectivas del dibujo infantil (Corman, Jung), analiza la distribución de trazos (Superior: fantasía, Inferior: estabilidad, Izquierda: apego/pasado, Derecha: futuro/social, Centro: equilibrio del yo).
- **Dinámica del Trazo y Motricidad:** Medición en tiempo real de velocidad, ritmo, grosor promedio, longitud de trazo y patrones de corrección (índice de perfeccionismo).
- **Matriz de Arquetipos Infantiles:** Clasificación dinámica en 8 perfiles emocionales (*Explorador Radiante, Volcán Expresivo, Constructor Reflexivo, Observador Sensible, Pequeño Soñador, Guardián Interior, Creador Armónico, Lienzo en Silencio*).
- **Radar Pentagonal SVG:** Evaluación visual en 5 dimensiones fundamentales:
  1. ⚡ Vitalidad & Energía
  2. 🌊 Calma & Serenidad
  3. 🗣️ Expresividad & Comunicación
  4. 🎯 Concentración & Paciencia
  5. 💖 Sensibilidad & Afecto
- **Guía para Padres y Docentes:** Consejos prácticos y "Preguntas Mágicas" sugeridas para abrir canales de comunicación y validación emocional con el niño.

### 🏆 Exportación & Certificados
- Descarga de la obra de arte en alta resolución.
- Generación instantánea del **"Certificado de Pequeño Artista"** con marco decorativo, fecha, obra y resumen de rasgos psicológicos.

### 📱 Experiencia Mobile-First & PWA
- Arquitectura responsive fluida adaptada a smartphones, tablets y pantallas de escritorio.
- Barra de herramientas inferior flotante (*Floating Island Tab Bar*) optimizada para la zona natural del pulgar (Ley de Fitts).
- Soporte PWA completo para instalación en iOS (Apple Touch Icon) y Android con caché offline mediante Service Worker.

---

## 🛠️ Tecnologías Empleadas

- **Frontend Core:** Vanilla HTML5 Canvas, Vanilla CSS3 (Variables, Flexbox, Grid, Claymorphism), Vanilla JavaScript ES6+.
- **Cero dependencias:** Funciona directamente en cualquier navegador moderno sin necesidad de Node.js ni herramientas de compilación (*build tools*).
- **Tipografía:** Google Fonts (*Fredoka* y *Nunito*).
- **PWA:** `manifest.json` y `sw.js` (Cache First con soporte offline).

---

## 🚀 Inicio Rápido

1. Clona el repositorio:
   ```bash
   git clone https://github.com/<tu-usuario>/Chromind.git
   ```
2. Abre `index.html` en tu navegador o sírvelo desde cualquier servidor local (como Apache/WAMP, Live Server o GitHub Pages).

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
