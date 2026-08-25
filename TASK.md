# 📋 CHROMIND - MASTER TASK ROADMAP & ARCHITECTURE PLAN
> **Proyecto:** Chromind (PWA de Dibujo Infantil y Análisis de Psicología del Color)  
> **Tecnologías:** Vanilla HTML5 Canvas, Modern Vanilla CSS3, Vanilla JavaScript ES6+ (Zero Node/Build dependencies).  
> **Enfoque:** Mobile-First, Ergonomía Infantil, Psicología del Color & Dibujo Infantil, UX Universal.

---

## 👥 Estructura de Agentes y Liderazgo por Especialidad

| Agente Especializado | Rol / Responsabilidad | Tareas Asignadas |
| :--- | :--- | :--- |
| 🎨 **Agente 1: UX/UI & Mobile-First Architect** | Diseño estructural first-mobile, aplicación de leyes de diseño UX y dirección de arte anti-genérica. | Tarea 1, Tarea 5 |
| 🧠 **Agente 2: Psycho-Pedagogical & Algorithmic Lead** | Motor de análisis psicológico, métricas espaciales, cromáticas y conductuales del evaluatorio. | Tarea 2 |
| 🖌️ **Agente 3: Canvas Interaction & Child Usability Specialist** | Intuitividad del editor, herramientas de dibujo, bote de pintura, carga de imágenes y plantillas. | Tarea 3 |
| 📊 **Agente 4: Data Visualization & Modal Experience Specialist** | Modal de resultados, radar de rasgos, métricas visuales, tarjetas de informe y exportación. | Tarea 4 |
| 📱 **Agente 5: PWA & Apple Ecosystem Specialist** | Assets iconográficos PNG para iOS/Apple, manifest, service worker y adaptación PWA. | Tarea 6 |

---

## 📌 Tareas de Refactorización

```
Leyenda de Estados:
[ ] Pendiente
[/] En Progreso
[X] Completada
```

---

### 🎨 TAREA 1: Refactorización del Diseño (Mobile-First & Leyes UX)
- **Agente Responsable:** Agente 1 (UX/UI & Mobile-First Architect)
- **Grado de Dificultad:** ⭐⭐⭐⭐☆ (Alta)
- **Objetivo:** Transformar la interfaz en una experiencia fluida e intuitiva pensada primeramente para pantallas táctiles móviles y tablets, escalable a desktop, fundamentada en leyes científicas de UX.

#### Leyes de Diseño UX Aplicadas:
1. **Ley de Fitts:** Botones y áreas interactivas con tamaño mínimo de toque táctil de 48px a 56px, ubicados en la zona natural del pulgar (zona inferior/flotante en móviles).
2. **Ley de Hick:** Reducción de la sobrecarga cognitiva mediante agrupación de herramientas en categorías desplegables limpias.
3. **Ley de Miller (Chunking):** Organización de controles en bloques comprensibles (Herramientas, Colores/Grosor, Plantillas/Acciones).
4. **Ley de Jakob:** Modelos mentales familiares para niños y padres (herramientas que lucen y actúan como crayones, pinceles, botes de pintura, sellos y borradores reales).
5. **Efecto de Usabilidad Estética:** Interfaz visualmente estimulante, limpia, con microinteracciones y respuestas táctiles que generan deleite y confianza.
6. **Ley de la Región Común y Proximidad (Gestalt):** Agrupación visual clara mediante superficies diferenciadas y tarjetas flotantes.

#### Subtareas de Implementación:
- [X] **1.1. Arquitectura Mobile-First en CSS:**
  - [X] Rediseñar el layout con barra de herramientas inferior flotante (*Floating Island Tab Bar*) para móviles y panel lateral ergonómico para tablets/desktop.
  - [X] Canvas con ajuste responsivo inteligente que mantenga la relación de aspecto sin deformar trazos ni distorsionar coordenadas táctiles (`touch-action: none`).
  - [X] Adaptación a orientaciones vertical (*portrait*) y horizontal (*landscape*).
- [X] **1.2. Ergonomía Táctil e Infantil:**
  - [X] Targets táctiles optimizados (mínimo 50x50px) para dedos infantiles y facilidad de uso con stylus o dedos.
  - [X] Eliminación total de scroll no deseado, rebotes elásticos molestos de iOS (`overscroll-behavior: none`) y retrasos de tap.
  - [X] Feedback táctil visual instantáneo (*press-down bounce*, brillo de selección y partículas al seleccionar).

---

### 🧠 TAREA 2: Expansión Exhaustiva del "Evaluatorio" Psicológico
- **Agente Responsable:** Agente 2 (Psycho-Pedagogical & Algorithmic Lead)
- **Grado de Dificultad:** ⭐⭐⭐⭐⭐ (Muy Alta)
- **Objetivo:** Ampliar drásticamente las funciones, profundidad algorítmica e interpretación diagnóstica del módulo de evaluación psicológica y psicopedagógica infantil.

#### Nuevas Funciones y Métricas Psicométricas:
1. **Análisis Espacial del Lienzo (Pruebas Proyectivas Corman/Jung):**
   - *Zona Superior:* Imaginación, fantasía, espiritualidad y aspiraciones.
   - *Zona Inferior:* Necesidad de seguridad, contacto con la realidad y estabilidad.
   - *Zona Izquierda:* Apego al pasado, figura materna, introversión o búsqueda de refugio.
   - *Zona Derecha:* Apertura al futuro, iniciativa social, exploración y extraversión.
   - *Zona Central:* Autoconcepción, equilibrio o concentración del yo.
   - *Densidad / Ocupación Espacial:* Expansión vs. Inhibición (porcentaje de lienzo ocupado).
2. **Dinámica del Trazo y Motricidad:**
   - Análisis de velocidad (impulsividad vs. meticulosidad).
   - Longitud y continuidad del trazo (trazos cortos/fragmentados vs. trazos fluidos/continuos).
   - Patrón de borrado/corrección (índice de autoexigencia o perfeccionismo).
   - Variabilidad de grosores empleados (adaptabilidad expresiva).
3. **Matrices Psicológicas y Arquetipos Emocionales:**
   - Determinación de arquetipos infantiles dinámicos: *"Pequeño Soñador"*, *"Explorador Radiante"*, *"Constructor Reflexivo"*, *"Volcán Expresivo"*, *"Observador Sensible"*, *"Creador Armónico"*.
   - Evaluación pentagonal de rasgos:
     1. **Vitalidad & Energía**
     2. **Calma & Serenidad**
     3. **Expresividad & Comunicación**
     4. **Concentración & Paciencia**
     5. **Sensibilidad & Afecto**
4. **Guía Psicoeducativa Personalizada:**
   - Generación de consejos prácticos para padres/docentes según los patrones encontrados.
   - Preguntas sugeridas de validación emocional para entablar conversación con el niño.

#### Subtareas de Implementación:
- [X] **2.1. Algoritmo de Mapeo Espacial por Cuadrantes:**
  - [X] Escaneo matricial de píxeles dividiendo el lienzo en 9 subzonas (3x3) para medir distribución arriba/abajo/izquierda/derecha/centro.
- [X] **2.2. Motor de Clasificación Psicológica Multivariable:**
  - [X] Combinar ratios de colores cálidos, fríos, neutros y sombríos con la ubicación espacial y métricas de motricidad.
- [X] **2.3. Generador de Informes Psicoeducativos:**
  - [X] Textos dinámicos enriquecidos, arquetipos con avatares/emojis expresivos y recomendaciones pedagógicas concretas.

---

### 🖌️ TAREA 3: Rediseño Integral de la "Edición" e Intuitividad para Niños
- **Agente Responsable:** Agente 3 (Canvas Interaction & Child Usability Specialist)
- **Grado de Dificultad:** ⭐⭐⭐⭐⭐ (Muy Alta)
- **Objetivo:** Crear una interfaz de dibujo ultra intuitiva, colorida y amigable, que un niño pequeño pueda comprender y dominar de forma autónoma sin leer manuales.

#### Innovaciones del Editor:
1. **Herramientas Visuales Claras y Divertidas:**
   - ✏️ **Pincel Artístico / Crayon:** Trazo orgánico y suave.
   - 🖍️ **Marcador Brillante:** Trazo vibrante semitransparente.
   - 🪣 **Bote de Pintura (Flood Fill):** Relleno de áreas cerradas (esencial para colorear plantillas).
   - ✨ **Spray de Magia / Estrellas:** Trazo con partículas chispeantes de colores para diversión infantil.
   - 🧽 **Borrador Amigable:** Borrador visual con tamaños rápidos.
2. **Gestión de Plantillas e Importación de Imágenes:**
   - 🖼️ **Selector Visual de Plantillas:** Galería de dibujos categorizados (Animalitos, Flores/Mandalas, Vehículos, etc.) con previsualizaciones grandes.
   - 📥 **Subir Imagen Propia:** Botón claro y visible para que padres/niños suban cualquier imagen o dibujo desde su dispositivo para colorear.
   - 📄 **Lienzo Blanco Rápido:** Opción para volver a hoja en blanco en un clic.
3. **Selector de Colores y Grosores Simplificado:**
   - Paleta de colores vibrante con pastillas redondeadas de alto contraste táctil.
   - Selector de grosor visual mediante 3 a 4 tamaños rápidos (Pequeño, Mediano, Grande, Gigante) además de slider fino.
4. **Acciones Rápidas con Salvaguardas Infantiles:**
   - Botones gigantes de Deshacer (Undo) y Rehacer (Redo).
   - Botón de Limpiar con modal tierno de confirmación ("¿Deseas empezar un nuevo dibujo?").
   - Botón destacado y brillante: *"✨ ¡Ver mi Magia!"* o *"🎨 Analizar"*.

#### Subtareas de Implementación:
- [X] **3.1. Algoritmo de Relleno de Color (Flood Fill 2D Canvas):**
  - [X] Implementar relleno rápido de cubeta en el canvas para rellenar formas cerradas en las plantillas.
- [X] **3.2. Implementación de Herramientas de Dibujo (Pincel, Marcador, Spray Mágico, Borrador):**
  - [X] Motor de trazos con efectos diferenciados.
- [X] **3.3. Sistema de Carga de Imágenes y Plantillas:**
  - [X] Input file camuflado en botón visual atractivo para subir fotos o dibujos locales.
  - [X] Drawer/Modal de plantillas con tarjetas visuales grandes.
- [X] **3.4. Barra de Acciones y Controles de Edición Intuitivos:**
  - [X] Indicador visual del color activo con halo animado.
  - [X] Selector de grosores con burbujas de tamaño.

---

### 📊 TAREA 4: Rediseño del Modal de Información y Resultados
- **Agente Responsable:** Agente 4 (Data Visualization & Modal Experience Specialist)
- **Grado de Dificultad:** ⭐⭐⭐⭐☆ (Alta)
- **Objetivo:** Refactorizar el modal de resultados para convertirlo en un informe visual fascinante, interactivo y memorable tanto para el niño como para los padres.

#### Componentes del Nuevo Modal:
1. **Cabecera de Celebración:**
   - Título entusiasta con badge del arquetipo emocional y animación de confeti suave.
2. **Exhibición de la Obra de Arte:**
   - Previsualización enmarcada de alta calidad con opción de ampliar.
3. **Radar Chart / Gráfica Visual de Rasgos Psicológicos:**
   - Gráfico de pentágono SVG interactivo que muestra los 5 pilares (Vitalidad, Calma, Expresividad, Concentración, Afecto).
4. **Desglose Cromático y Distribución Espacial:**
   - Barra cromática estilizada con porcentajes y significado emocional de cada tono usado.
   - Mini mapa de distribución espacial (dónde dibujó más).
5. **Lectura Diagnóstica y Consejos Psicoeducativos:**
   - Pestañas o secciones limpias: *"Qué expresa este dibujo"* y *"Consejos para mamá y papá"*.
6. **Exportación Premium:**
   - Descarga de la imagen del dibujo con marco decorativo.
   - Opción para generar y descargar un "Certificado de Pequeño Artista" con el análisis resumido.

#### Subtareas de Implementación:
- [X] **4.1. Estructura HTML y Animaciones del Modal:**
  - [X] Animación fluida de apertura *bottom-sheet* en móvil y modal centrado elegante en tablet/desktop.
  - [X] Pestañas de navegación interna (Resumen, Métricas, Consejos).
- [X] **4.2. Gráficos Visuales en SVG Nativo:**
  - [X] Generación matemática de Radar Chart SVG y barras de progreso animadas.
- [X] **4.3. Motor de Descarga y Certificado:**
  - [X] Renderizado en canvas compuesto de la obra final con marco y membrete de Chromind.

---

### 🎨 TAREA 5: Estética Innovadora y Libre de Diseños Genéricos de IA
- **Agente Responsable:** Agente 1 (UX/UI & Mobile-First Architect)
- **Grado de Dificultad:** ⭐⭐⭐☆☆ (Media)
- **Objetivo:** Evitar clichés de diseño genéricos de IA (gradientes morados genéricos oscuros o layouts corporativos fríos) creando una identidad visual única, cálida, orgánica y lúdica.

#### Identidad de Diseño Chromind:
- **Paleta de Color Curada:** Tonos cálidos y orgánicos de fondo (Vainilla suave `#FFFDF5`, Moonstone Teal `#3FA7B5`, Melocotón `#FF8A65`, Amarillo Sol `#FFD166`, Lavanda suave `#9D84B7`).
- **Texturas y Profundidad:** Sombras suaves multicapa (*claymorphism* / tacto de papel de arte y plastilina suave), bordes redondeados orgánicos (`border-radius: 20px - 28px`).
- **Tipografía Expresiva:** Combinación de fuentes legibles y con personalidad (*Fredoka / Nunito / Outfit*).
- **Microinteracciones:** Botones que se hunden físicamente al tocar (`transform: scale(0.94)`), destellos al pintar, ondas de selección.

#### Subtareas de Implementación:
- [X] **5.1. Variables CSS y Token Design System:**
  - [X] Definir tokens de color, sombras volumétricas, tipografías y transiciones elásticas.
- [X] **5.2. Estilización de Componentes y Microanimaciones:**
  - [X] Pulir cada botón, tarjeta, selector y modal para lograr una textura visual consistente y estimulante.

---

### 📱 TAREA 6: Generación de Icono PNG para Dispositivos Apple y PWA
- **Agente Responsable:** Agente 5 (PWA & Apple Ecosystem Specialist)
- **Grado de Dificultad:** ⭐⭐☆☆☆ (Media-Baja)
- **Objetivo:** Crear los assets gráficos en formato PNG de alta resolución idénticos al vector SVG para soporte perfecto de Apple Touch Icon y PWA en iOS y Android.

#### Subtareas de Implementación:
- [X] **6.1. Generación de PNGs de Alta Definición:**
  - [X] Crear `images/apple-touch-icon.png` (180x180 px) con los radios y márgenes exactos requeridos por iOS.
  - [X] Crear `images/icon-192.png` y `images/icon-512.png` en formato PNG estándar.
- [X] **6.2. Actualización de Metadatos y Manifest:**
  - [X] Actualizar `<link rel="apple-touch-icon" ...>` en `index.html` apuntando a `apple-touch-icon.png`.
  - [X] Actualizar `manifest.json` para incluir los nuevos iconos PNG con `purpose: "any maskable"`.
  - [X] Actualizar `sw.js` para cachear los nuevos assets de iconos offline.

---

## 📈 Resumen de Progreso y Checklist Global

| ID | Tarea | Agente Líder | Dificultad | Estado |
| :---: | :--- | :--- | :---: | :---: |
| **T1** | Refactorización de Diseño Mobile-First & Leyes UX | Agente 1 (UX/UI Lead) | ⭐⭐⭐⭐☆ | [X] Completada |
| **T2** | Expansión del Evaluatorio Psicológico Multivariable | Agente 2 (Psycho Lead) | ⭐⭐⭐⭐⭐ | [X] Completada |
| **T3** | Rediseño de Zona de Edición e Intuitividad Infantil | Agente 3 (Canvas Lead) | ⭐⭐⭐⭐⭐ | [X] Completada |
| **T4** | Rediseño de Modal de Resultados y Visualizaciones | Agente 4 (Data Viz Lead) | ⭐⭐⭐⭐☆ | [X] Completada |
| **T5** | Identidad Visual Innovadora (Anti-Diseño Genérico) | Agente 1 (UX/UI Lead) | ⭐⭐⭐☆☆ | [X] Completada |
| **T6** | Generación de Iconos PNG Apple/PWA y Metadatos | Agente 5 (PWA Lead) | ⭐⭐☆☆☆ | [X] Completada |

---
*Documento vivo de seguimiento del proyecto Chromind.*

