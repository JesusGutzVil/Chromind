/**
 * Chromind — Core Application Logic v2.0
 * ----------------------------------------
 * Tasks implemented:
 *  T1: Mobile-First layout + UX Laws (Fitts, Hick, Miller, Jakob, Gestalt)
 *  T2: Expanded Psychology Engine (quadrant analysis, archetypes, radar chart)
 *  T3: Intuitive Editor (Brush, Marker, Flood Fill, Magic Spray, Eraser)
 *  T4: Redesigned Evaluation Modal (tabs, radar SVG, certificates)
 *  T5: Organic anti-generic aesthetic (handled via CSS)
 *  T6: Apple/PWA icon assets (handled via manifest + HTML meta)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     ELEMENTS
  ========================================================== */
  const drawingCanvas  = document.getElementById('drawing-canvas');
  const templateCanvas = document.getElementById('template-canvas');
  const dCtx = drawingCanvas.getContext('2d', { willReadFrequently: true });
  const tCtx = templateCanvas.getContext('2d', { willReadFrequently: true });

  // Canvas frame for responsive sizing
  const canvasArea  = document.getElementById('canvas-area');
  const canvasFrame = document.getElementById('canvas-frame');

  // Sidebar tools (desktop)
  const sidebarToolPills = document.querySelectorAll('.tool-pill[data-tool]');
  const sidebarColorBtns = document.querySelectorAll('.color-btn');
  const sidebarSizeBubbles = document.querySelectorAll('.size-bubble');
  const sidebarSizeSlider  = document.getElementById('size-slider');
  const sidebarBtnUndo     = document.getElementById('btn-undo');
  const sidebarBtnRedo     = document.getElementById('btn-redo');
  const sidebarBtnTemplates= document.getElementById('btn-templates');
  const sidebarBtnUpload   = document.getElementById('btn-upload');
  const sidebarBtnClear    = document.getElementById('btn-clear');
  const sidebarBtnDownload = document.getElementById('btn-download-sidebar');
  const sidebarBtnAnalyze  = document.getElementById('btn-analyze-sidebar');
  const topBtnAnalyze      = document.getElementById('btn-analyze-top');
  const topBtnUndo         = document.getElementById('top-btn-undo');
  const topBtnRedo         = document.getElementById('top-btn-redo');
  const topBtnTemplates    = document.getElementById('top-btn-templates');
  const topBtnClear        = document.getElementById('top-btn-clear');

  // Bottom toolbar tools (mobile)
  const btbTools       = document.querySelectorAll('.btb-tool[data-tool]');
  const btbColorPill   = document.getElementById('btb-color-pill');
  const btbColorPreview= document.getElementById('btb-color-preview');
  const btbSizeBtn     = document.getElementById('btb-size');
  const btbAnalyzeBtn  = document.getElementById('btb-analyze');

  // Active color ring
  const activeColorRing = document.getElementById('active-color-ring');

  // Color Bottom Sheet
  const colorSheetOverlay = document.getElementById('color-sheet-overlay');
  const colorSheet        = document.getElementById('color-sheet');
  const csColors          = document.querySelectorAll('.cs-color');
  const csSizes           = document.querySelectorAll('.cs-size');
  const colorSheetClose   = document.getElementById('color-sheet-close');

  // Size Bottom Sheet
  const sizeSheetOverlay = document.getElementById('size-sheet-overlay');
  const sizeSheet        = document.getElementById('size-sheet');
  const ssBubbles        = document.querySelectorAll('.ss-bubble');
  const sizeSliderSheet  = document.getElementById('size-slider-sheet');
  const sizeSheetClose   = document.getElementById('size-sheet-close');

  // Templates Drawer
  const drawerOverlay    = document.getElementById('drawer-overlay');
  const templatesDrawer  = document.getElementById('templates-drawer');
  const drawerClose      = document.getElementById('drawer-close');
  const templateCards    = document.querySelectorAll('.template-card');
  const drawerUploadBtn  = document.getElementById('drawer-upload-btn');
  const inputUploadImage = document.getElementById('input-upload-image');

  // Confirm Dialog
  const confirmOverlay = document.getElementById('confirm-overlay');
  const confirmOk      = document.getElementById('confirm-ok');
  const confirmCancel  = document.getElementById('confirm-cancel');

  // Evaluation Modal
  const evalOverlay        = document.getElementById('eval-overlay');
  const evalModal          = document.getElementById('eval-modal');
  const evalCloseBtns      = [
    document.getElementById('eval-close-btn'),
    document.getElementById('btn-modal-close')
  ];
  const evalPreviewImg     = document.getElementById('eval-preview-img');
  const evalArchetypeBadge = document.getElementById('eval-archetype-badge');
  const evalArchetypeEmoji = document.getElementById('eval-archetype-emoji');
  const evalArchetypeName  = document.getElementById('eval-archetype-name');
  const evalTitle          = document.getElementById('eval-title');
  const evalConfetti       = document.getElementById('eval-confetti');
  const moodIconContainer  = document.getElementById('mood-icon-container');
  const moodValue          = document.getElementById('mood-value');
  const colorDistBar       = document.getElementById('color-dist-bar');
  const colorDistLegend    = document.getElementById('color-dist-legend');
  const spatialGrid        = document.getElementById('spatial-grid');
  const radarSvg           = document.getElementById('radar-svg');
  const radarLegend        = document.getElementById('radar-legend');
  const statStrokes        = document.getElementById('stat-strokes');
  const statSpeed          = document.getElementById('stat-speed');
  const statThickness      = document.getElementById('stat-thickness');
  const statEraser         = document.getElementById('stat-eraser');
  const statCoverage       = document.getElementById('stat-coverage');
  const statTool           = document.getElementById('stat-tool');
  const psychTextBody      = document.getElementById('psych-text-body');
  const adviceHeaderCard   = document.getElementById('advice-header-card');
  const adviceHeroEmoji    = document.getElementById('advice-hero-emoji');
  const adviceArchetypeFull= document.getElementById('advice-archetype-full');
  const adviceArchetypeDesc= document.getElementById('advice-archetype-desc');
  const advicePsychBody    = document.getElementById('advice-psych-body');
  const adviceRecBody      = document.getElementById('advice-rec-body');
  const adviceQuestions    = document.getElementById('advice-questions-list');
  const btnDownload        = document.getElementById('btn-modal-download');

  /* ==========================================================
     CANVAS DIMENSIONS (internal resolution)
  ========================================================== */
  let CANVAS_W = 1200;
  let CANVAS_H = 900;
  let activeTemplateImage = null;

  /* ==========================================================
     STATE
  ========================================================== */
  let currentTool    = 'brush'; // brush | eraser
  let currentColor   = '#ff3b30';
  let currentSize    = 16;
  let currentTemplate = 'none';

  let isDrawing  = false;
  let points     = [];
  let lastX = 0, lastY = 0, lastTime = 0;

  // Tool usage tracker (for "favourite tool" stat)
  const toolUsageCounts = { brush: 0, eraser: 0 };

  // Undo/Redo
  const MAX_HISTORY = 30;
  let historyList  = [];
  let historyIndex = -1;

  // Metrics
  let sessionStart   = Date.now();
  let totalStrokes   = 0;
  let strokeSpeeds   = [];
  let strokeLengths  = [];
  let usedSizes      = [];
  let eraserToggles  = 0;
  let eraserActiveTime  = 0;
  let eraserStartTime   = null;
  let undoCount         = 0;
  let currentStrokeLen  = 0;

  /* ==========================================================
     COLOR PALETTE (Psychological Mapping)
  ========================================================== */
  const palette = [
    { name: 'Rojo',    hex: '#ff3b30', r: 255, g:  59, b:  48, emoji: '❤️',  group: 'warm',
      psychology: 'alta energía, impulsividad, pasión o emociones intensas' },
    { name: 'Naranja', hex: '#ff9500', r: 255, g: 149, b:   0, emoji: '🧡', group: 'warm',
      psychology: 'entusiasmo, sociabilidad, calidez y juego activo' },
    { name: 'Amarillo',hex: '#ffcc00', r: 255, g: 204, b:   0, emoji: '💛', group: 'warm',
      psychology: 'curiosidad, optimismo, imaginación y apertura mental' },
    { name: 'Verde',   hex: '#34c759', r:  52, g: 199, b:  89, emoji: '💚', group: 'cool',
      psychology: 'equilibrio, paz, amor a la naturaleza y deseo de crecimiento' },
    { name: 'Azul',    hex: '#007aff', r:   0, g: 122, b: 255, emoji: '💙', group: 'cool',
      psychology: 'calma, tranquilidad, introversión y serenidad' },
    { name: 'Morado',  hex: '#af52de', r: 175, g:  82, b: 222, emoji: '💜', group: 'somber',
      psychology: 'fantasía, misterio, creatividad profunda y reflexión espiritual' },
    { name: 'Rosa',    hex: '#ff2d55', r: 255, g:  45, b:  85, emoji: '🩷', group: 'warm',
      psychology: 'afectividad, ternura, sensibilidad y búsqueda de afecto' },
    { name: 'Marrón',  hex: '#a25e38', r: 162, g:  94, b:  56, emoji: '🤎', group: 'somber',
      psychology: 'búsqueda de estabilidad, conexión con lo terrenal y seguridad' },
    { name: 'Negro',   hex: '#1c1c1e', r:  28, g:  28, b:  30, emoji: '🖤', group: 'somber',
      psychology: 'reserva, protección de la intimidad o procesamiento introspectivo profundo' },
    { name: 'Blanco',  hex: '#ffffff', r: 255, g: 255, b: 255, emoji: '🤍', group: 'neutral',
      psychology: 'limpieza, frescura, espacios de silencio o inicio nuevo' }
  ];

  /* ==========================================================
     INITIALIZE
  ========================================================== */
  initCanvas();
  resizeCanvas();
  saveHistory();
  syncUI();

  window.addEventListener('resize', resizeCanvas);

  /* ==========================================================
     CANVAS RESIZE (responsive full-area fitting)
  ========================================================== */
  function resizeCanvas() {
    const areaRect = canvasArea.getBoundingClientRect();
    if (!areaRect.width || !areaRect.height) return;

    const isMobile = window.innerWidth < 768;
    const padding = isMobile ? 8 : 16;
    const maxW = Math.max(200, Math.floor(areaRect.width - padding * 2));
    const maxH = Math.max(200, Math.floor(areaRect.height - padding * 2));

    const aspect = maxW / maxH;
    let newW, newH;
    if (aspect >= 1) {
      newW = Math.round(900 * aspect);
      newH = 900;
    } else {
      newW = 900;
      newH = Math.round(900 / aspect);
    }

    const needsRescale = (drawingCanvas.width !== newW || drawingCanvas.height !== newH);

    if (needsRescale) {
      let tempCanvas = null;
      if (drawingCanvas.width > 0 && drawingCanvas.height > 0 && totalStrokes > 0) {
        tempCanvas = document.createElement('canvas');
        tempCanvas.width = drawingCanvas.width;
        tempCanvas.height = drawingCanvas.height;
        tempCanvas.getContext('2d').drawImage(drawingCanvas, 0, 0);
      }

      CANVAS_W = newW;
      CANVAS_H = newH;

      drawingCanvas.width = CANVAS_W;
      drawingCanvas.height = CANVAS_H;
      templateCanvas.width = CANVAS_W;
      templateCanvas.height = CANVAS_H;

      dCtx.lineCap = 'round';
      dCtx.lineJoin = 'round';

      if (tempCanvas) {
        dCtx.drawImage(tempCanvas, 0, 0, CANVAS_W, CANVAS_H);
      }

      drawTemplateToCanvas();
    }

    canvasFrame.style.width  = maxW + 'px';
    canvasFrame.style.height = maxH + 'px';
    drawingCanvas.style.width  = maxW + 'px';
    drawingCanvas.style.height = maxH + 'px';
    templateCanvas.style.width = maxW + 'px';
    templateCanvas.style.height= maxH + 'px';
  }

  /* ==========================================================
     CANVAS INIT
  ========================================================== */
  function initCanvas() {
    dCtx.lineCap  = 'round';
    dCtx.lineJoin = 'round';

    drawingCanvas.addEventListener('touchstart',  startDraw, { passive: false });
    drawingCanvas.addEventListener('touchmove',   moveDraw,  { passive: false });
    drawingCanvas.addEventListener('touchend',    endDraw,   { passive: false });
    drawingCanvas.addEventListener('touchcancel', endDraw,   { passive: false });

    drawingCanvas.addEventListener('mousedown', startDraw);
    drawingCanvas.addEventListener('mousemove', (e) => {
      moveDraw(e);
      updateBrushCursor(e);
    });
    window.addEventListener('mouseup', endDraw);
    drawingCanvas.addEventListener('mouseleave', () => {
      drawingCanvas.style.cursor = 'none';
    });
    drawingCanvas.addEventListener('mouseenter', updateBrushCursor);
  }

  function updateBrushCursor(e) {
    const rect = drawingCanvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const displayRadius = (currentSize / scaleX / 2);
    const r = Math.max(2, Math.round(displayRadius));
    const isEraser = currentTool === 'eraser';
    const color = isEraser ? '#888' : currentColor;
    const svgSize = r * 2 + 4;
    const center = r + 2;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${svgSize}' height='${svgSize}'><circle cx='${center}' cy='${center}' r='${r}' fill='${isEraser ? "rgba(255,255,255,0.7)" : color.replace('#','%23')}' stroke='${isEraser ? "%23888" : "%23333"}' stroke-width='1.5' opacity='0.85'/></svg>`;
    const url = `data:image/svg+xml,${svg}`;
    drawingCanvas.style.cursor = `url("${url}") ${center} ${center}, crosshair`;
  }

  /* ==========================================================
     COORDINATE MAPPING (accounts for canvas scaling)
  ========================================================== */
  function getCoords(e) {
    const rect   = drawingCanvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    let cx, cy;
    if (e.touches && e.touches.length > 0) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    } else {
      cx = e.clientX;
      cy = e.clientY;
    }
    return {
      x: (cx - rect.left)  * scaleX,
      y: (cy - rect.top)   * scaleY
    };
  }

  /* ==========================================================
     DRAWING — START
  ========================================================== */
  function startDraw(e) {
    e.preventDefault();
    const coords = getCoords(e);

    isDrawing = true;
    points    = [coords];
    lastX     = coords.x;
    lastY     = coords.y;
    lastTime  = Date.now();
    currentStrokeLen = 0;
    totalStrokes++;
    toolUsageCounts[currentTool]++;
    usedSizes.push(currentSize);

    // Draw initial dot
    applyToolStart(coords);
  }

  /* ==========================================================
     DRAWING — MOVE
  ========================================================== */
  function moveDraw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCoords(e);
    points.push(coords);

    const now  = Date.now();
    const dt   = now - lastTime;
    const dist = Math.hypot(coords.x - lastX, coords.y - lastY);
    if (dt > 0) strokeSpeeds.push(dist / dt);
    currentStrokeLen += dist;
    lastTime = now;

    applyToolMove(coords);

    lastX = coords.x;
    lastY = coords.y;
  }

  /* ==========================================================
     DRAWING — END
  ========================================================== */
  function endDraw(e) {
    if (!isDrawing) return;
    isDrawing = false;

    if (points.length >= 2) {
      // Finish the stroke tail
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      applyToolEnd(p1, p2);
    }

    if (currentStrokeLen > 0) strokeLengths.push(currentStrokeLen);
    points = [];
    saveHistory();
  }

  /* ==========================================================
     TOOL RENDERING — BRUSH (organic smooth)
  ========================================================== */
  function applyToolStart(coords) {
    setDrawingContext();
    dCtx.beginPath();
    dCtx.arc(coords.x, coords.y, currentSize / 2, 0, Math.PI * 2);
    if (currentTool === 'eraser') {
      dCtx.globalCompositeOperation = 'destination-out';
      dCtx.fillStyle = 'rgba(0,0,0,1)';
    } else {
      dCtx.globalCompositeOperation = 'source-over';
      dCtx.fillStyle = currentColor;
    }
    dCtx.fill();
  }

  function applyToolMove(coords) {
    setDrawingContext();

    if (currentTool === 'eraser') {
      dCtx.globalCompositeOperation = 'destination-out';
      dCtx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      dCtx.globalCompositeOperation = 'source-over';
      dCtx.strokeStyle = currentColor;
    }

    dCtx.lineWidth = currentSize;

    if (points.length === 2) {
      const [p0, p1] = points;
      const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      dCtx.beginPath();
      dCtx.moveTo(p0.x, p0.y);
      dCtx.lineTo(mid.x, mid.y);
      dCtx.stroke();
    } else if (points.length >= 3) {
      const p0 = points[points.length - 3];
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      dCtx.beginPath();
      dCtx.moveTo(mid1.x, mid1.y);
      dCtx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
      dCtx.stroke();
      points.shift(); // keep only last 3 points
    }
  }

  function applyToolEnd(p1, p2) {
    setDrawingContext();
    if (currentTool === 'eraser') {
      dCtx.globalCompositeOperation = 'destination-out';
      dCtx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      dCtx.globalCompositeOperation = 'source-over';
      dCtx.strokeStyle = currentColor;
    }
    dCtx.lineWidth = currentSize;
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    dCtx.beginPath();
    dCtx.moveTo(mid.x, mid.y);
    dCtx.lineTo(p2.x, p2.y);
    dCtx.stroke();
  }

  function setDrawingContext() {
    dCtx.lineCap  = 'round';
    dCtx.lineJoin = 'round';
  }



  /* ==========================================================
     UNDO / REDO
  ========================================================== */
  function saveHistory() {
    if (historyIndex < historyList.length - 1) {
      historyList = historyList.slice(0, historyIndex + 1);
    }
    historyList.push(dCtx.getImageData(0, 0, CANVAS_W, CANVAS_H));
    if (historyList.length > MAX_HISTORY) historyList.shift();
    historyIndex = historyList.length - 1;
    updateUndoRedoBtns();
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      dCtx.putImageData(historyList[historyIndex], 0, 0);
      undoCount++;
      updateUndoRedoBtns();
    }
  }

  function redo() {
    if (historyIndex < historyList.length - 1) {
      historyIndex++;
      dCtx.putImageData(historyList[historyIndex], 0, 0);
      updateUndoRedoBtns();
    }
  }

  function updateUndoRedoBtns() {
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < historyList.length - 1;
    if (sidebarBtnUndo) sidebarBtnUndo.disabled = !canUndo;
    if (sidebarBtnRedo) sidebarBtnRedo.disabled = !canRedo;
    if (topBtnUndo) topBtnUndo.disabled = !canUndo;
    if (topBtnRedo) topBtnRedo.disabled = !canRedo;
  }

  /* ==========================================================
     TOOL SELECTION
  ========================================================== */
  function selectTool(tool) {
    currentTool = tool;

    // Handle eraser tracking
    if (tool === 'eraser') {
      eraserToggles++;
      eraserStartTime = Date.now();
    } else if (eraserStartTime) {
      eraserActiveTime += Date.now() - eraserStartTime;
      eraserStartTime = null;
    }

    // Update sidebar pills
    sidebarToolPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.tool === tool);
    });

    // Update bottom toolbar buttons
    btbTools.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === tool);
    });

    // Refresh brush cursor
    updateBrushCursor();
  }

  /* ==========================================================
     COLOR SELECTION
  ========================================================== */
  function selectColor(color) {
    currentColor = color;

    // Update sidebar color buttons
    sidebarColorBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === color);
    });

    // Update color sheet palette
    csColors.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === color);
    });

    // Update bottom toolbar color pill
    btbColorPreview.style.background = color === '#ffffff' ? '#f0f0f0' : color;

    // If eraser was active, switch to brush when a color is picked
    if (currentTool === 'eraser') {
      selectTool('brush');
    } else {
      updateBrushCursor();
    }
  }

  /* ==========================================================
     SIZE SELECTION
  ========================================================== */
  function selectSize(size) {
    currentSize = parseInt(size);

    // Sidebar bubbles
    sidebarSizeBubbles.forEach(b => b.classList.toggle('active', parseInt(b.dataset.size) === currentSize));
    sidebarSizeSlider.value = currentSize;

    // Color sheet sizes
    csSizes.forEach(b => b.classList.toggle('active', parseInt(b.dataset.size) === currentSize));

    // Size sheet bubbles
    ssBubbles.forEach(b => b.classList.toggle('active', parseInt(b.dataset.size) === currentSize));
    sizeSliderSheet.value = currentSize;

    if (!usedSizes.includes(currentSize)) usedSizes.push(currentSize);
    updateBrushCursor();
  }

  /* ==========================================================
     SYNC UI (initial state sync)
  ========================================================== */
  function syncUI() {
    selectColor(currentColor);
    selectSize(currentSize);
    selectTool(currentTool);
  }

  /* ==========================================================
     RESET DRAWING
  ========================================================== */
  function resetDrawing() {
    dCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    sessionStart     = Date.now();
    totalStrokes     = 0;
    strokeSpeeds     = [];
    strokeLengths    = [];
    usedSizes        = [];
    eraserToggles    = 0;
    eraserActiveTime = 0;
    eraserStartTime  = null;
    undoCount        = 0;
    Object.keys(toolUsageCounts).forEach(k => toolUsageCounts[k] = 0);
    historyList  = [];
    historyIndex = -1;
    saveHistory();
  }

  /* ==========================================================
     TEMPLATE LOADING
  ========================================================== */
  function loadTemplate(template) {
    currentTemplate = template;
    resetDrawing();

    if (template === 'none') {
      activeTemplateImage = null;
      tCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      return;
    }

    const img = new Image();
    img.src = `images/${template}.png`;
    img.onload = () => {
      activeTemplateImage = img;
      drawTemplateToCanvas();
    };
    img.onerror = () => {
      activeTemplateImage = null;
      console.warn('Template image not found:', template);
    };
  }

  function loadUserImage(file) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      currentTemplate = 'user-image';
      activeTemplateImage = img;
      resetDrawing();
      drawTemplateToCanvas();
      URL.revokeObjectURL(url);
    };
  }

  function drawTemplateToCanvas() {
    tCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    if (!activeTemplateImage || currentTemplate === 'none') return;
    const scale = Math.min(CANVAS_W / activeTemplateImage.width, CANVAS_H / activeTemplateImage.height) * 0.95;
    const w = activeTemplateImage.width * scale;
    const h = activeTemplateImage.height * scale;
    const x = (CANVAS_W - w) / 2;
    const y = (CANVAS_H - h) / 2;
    tCtx.fillStyle = '#ffffff';
    tCtx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    tCtx.drawImage(activeTemplateImage, x, y, w, h);
  }

  /* ==========================================================
     SHEETS / DRAWERS — OPEN / CLOSE
  ========================================================== */
  function openColorSheet() {
    colorSheetOverlay.classList.add('open');
    colorSheet.classList.add('open');
  }

  function closeColorSheet() {
    colorSheetOverlay.classList.remove('open');
    colorSheet.classList.remove('open');
  }

  function openSizeSheet() {
    sizeSheetOverlay.classList.add('open');
    sizeSheet.classList.add('open');
  }

  function closeSizeSheet() {
    sizeSheetOverlay.classList.remove('open');
    sizeSheet.classList.remove('open');
  }

  function openTemplatesDrawer() {
    drawerOverlay.classList.add('open');
    templatesDrawer.classList.add('open');
  }

  function closeTemplatesDrawer() {
    drawerOverlay.classList.remove('open');
    templatesDrawer.classList.remove('open');
  }

  function showConfirmClear() {
    confirmOverlay.classList.add('open');
  }

  function hideConfirmClear() {
    confirmOverlay.classList.remove('open');
  }

  /* ==========================================================
     EVENT BINDINGS — TOOLBAR
  ========================================================== */

  // Sidebar tool pills
  sidebarToolPills.forEach(pill => {
    pill.addEventListener('click', () => selectTool(pill.dataset.tool));
  });

  // Sidebar color buttons
  sidebarColorBtns.forEach(btn => {
    btn.addEventListener('click', () => selectColor(btn.dataset.color));
  });

  // Sidebar size bubbles
  sidebarSizeBubbles.forEach(b => {
    b.addEventListener('click', () => selectSize(b.dataset.size));
  });

  // Sidebar slider
  sidebarSizeSlider.addEventListener('input', e => selectSize(e.target.value));

  // Sidebar undo/redo/clear/templates/upload/analyze
  sidebarBtnUndo.addEventListener('click', undo);
  sidebarBtnRedo.addEventListener('click', redo);
  sidebarBtnClear.addEventListener('click', showConfirmClear);
  sidebarBtnTemplates.addEventListener('click', openTemplatesDrawer);
  sidebarBtnUpload.addEventListener('click', () => inputUploadImage.click());
  if (sidebarBtnDownload) sidebarBtnDownload.addEventListener('click', downloadArtwork);
  if (sidebarBtnAnalyze) sidebarBtnAnalyze.addEventListener('click', openEvalModal);
  if (topBtnAnalyze) topBtnAnalyze.addEventListener('click', openEvalModal);
  if (topBtnUndo) topBtnUndo.addEventListener('click', undo);
  if (topBtnRedo) topBtnRedo.addEventListener('click', redo);
  if (topBtnTemplates) topBtnTemplates.addEventListener('click', openTemplatesDrawer);
  if (topBtnClear) topBtnClear.addEventListener('click', showConfirmClear);

  // Bottom toolbar — tool buttons
  btbTools.forEach(btn => {
    btn.addEventListener('click', () => selectTool(btn.dataset.tool));
  });

  // Bottom toolbar — color pill
  btbColorPill.addEventListener('click', openColorSheet);

  // Bottom toolbar — size
  btbSizeBtn.addEventListener('click', openSizeSheet);

  // Bottom toolbar — analyze
  btbAnalyzeBtn.addEventListener('click', openEvalModal);

  // Color sheet
  csColors.forEach(btn => {
    btn.addEventListener('click', () => {
      selectColor(btn.dataset.color);
    });
  });
  csSizes.forEach(btn => {
    btn.addEventListener('click', () => selectSize(btn.dataset.size));
  });
  colorSheetClose.addEventListener('click', closeColorSheet);
  colorSheetOverlay.addEventListener('click', closeColorSheet);

  // Size sheet
  ssBubbles.forEach(b => {
    b.addEventListener('click', () => selectSize(b.dataset.size));
  });
  sizeSliderSheet.addEventListener('input', e => selectSize(e.target.value));
  sizeSheetClose.addEventListener('click', closeSizeSheet);
  sizeSheetOverlay.addEventListener('click', closeSizeSheet);

  // Templates drawer
  drawerClose.addEventListener('click', closeTemplatesDrawer);
  drawerOverlay.addEventListener('click', closeTemplatesDrawer);

  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      templateCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      loadTemplate(card.dataset.template);
      closeTemplatesDrawer();
    });
  });

  drawerUploadBtn.addEventListener('click', () => inputUploadImage.click());
  inputUploadImage.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      loadUserImage(file);
      closeTemplatesDrawer();
    }
    e.target.value = '';
  });

  // Confirm dialog
  confirmOk.addEventListener('click', () => {
    hideConfirmClear();
    resetDrawing();
    tCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    currentTemplate = 'none';
    templateCards.forEach(c => c.classList.remove('active'));
    templateCards[0].classList.add('active');
  });
  confirmCancel.addEventListener('click', hideConfirmClear);

  // Eval modal close
  evalCloseBtns.forEach(btn => btn && btn.addEventListener('click', closeEvalModal));
  evalOverlay.addEventListener('click', e => {
    if (e.target === evalOverlay) closeEvalModal();
  });

  // Download
  btnDownload.addEventListener('click', downloadArtwork);

  /* ==========================================================
     COLOR ANALYSIS
  ========================================================== */
  function analyzeColors() {
    const sample = document.createElement('canvas');
    sample.width  = 200;
    sample.height = 150;
    const sCtx = sample.getContext('2d', { willReadFrequently: true });
    sCtx.drawImage(drawingCanvas, 0, 0, 200, 150);
    const imageData = sCtx.getImageData(0, 0, 200, 150);
    const data      = imageData.data;

    const counts = {};
    palette.forEach(c => counts[c.hex] = 0);
    let coloredPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      if (a < 40) continue; // transparent

      let minDist = Infinity, closest = null;
      for (const col of palette) {
        if (col.hex === '#ffffff') continue; // skip white in mapping
        const dist = Math.sqrt((r - col.r)**2 + (g - col.g)**2 + (b - col.b)**2);
        if (dist < minDist) { minDist = dist; closest = col.hex; }
      }
      if (closest && minDist < 140) {
        counts[closest]++;
        coloredPixels++;
      }
    }

    const total = 200 * 150;
    const percentages = {};
    palette.forEach(c => {
      percentages[c.hex] = coloredPixels > 0
        ? Math.round((counts[c.hex] / coloredPixels) * 100)
        : 0;
    });

    return {
      percentages,
      coloredPixels,
      canvasCoveragePercent: Math.round((coloredPixels / total) * 100)
    };
  }

  /* ==========================================================
     SPATIAL QUADRANT ANALYSIS (3x3 grid — Corman/Jung)
  ========================================================== */
  function analyzeSpatialDistribution() {
    const COLS = 3, ROWS = 3;
    const sample = document.createElement('canvas');
    sample.width  = 300;
    sample.height = 225;
    const sCtx = sample.getContext('2d', { willReadFrequently: true });
    sCtx.drawImage(drawingCanvas, 0, 0, 300, 225);
    const imageData = sCtx.getImageData(0, 0, 300, 225);
    const data      = imageData.data;

    const cellW = 300 / COLS;
    const cellH = 225 / ROWS;
    const cells = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    for (let y = 0; y < 225; y++) {
      for (let x = 0; x < 300; x++) {
        const idx = (y * 300 + x) * 4;
        if (data[idx + 3] > 40) {
          const col = Math.floor(x / cellW);
          const row = Math.floor(y / cellH);
          cells[Math.min(row, ROWS-1)][Math.min(col, COLS-1)]++;
        }
      }
    }

    // Normalize to 0-1
    const maxCell = Math.max(...cells.flat()) || 1;
    const normalized = cells.map(row => row.map(v => v / maxCell));

    return { cells, normalized };
  }

  /* ==========================================================
     PSYCHOLOGICAL EVALUATION ENGINE
  ========================================================== */
  function evaluateDrawing() {
    const colorAnalysis  = analyzeColors();
    const spatialAnalysis = analyzeSpatialDistribution();
    const pct = colorAnalysis.percentages;

    // Color group ratios
    const warmPct   = (pct['#ff3b30'] || 0) + (pct['#ff9500'] || 0) + (pct['#ffcc00'] || 0) + (pct['#ff2d55'] || 0);
    const coolPct   = (pct['#34c759'] || 0) + (pct['#007aff'] || 0);
    const somberPct = (pct['#a25e38'] || 0) + (pct['#1c1c1e'] || 0) + (pct['#af52de'] || 0);

    // Dominant color
    let dominantColor = null, maxPct = 0;
    palette.forEach(c => {
      if (c.hex !== '#ffffff' && (pct[c.hex] || 0) > maxPct) {
        maxPct = pct[c.hex] || 0;
        dominantColor = c;
      }
    });

    const isEmpty = colorAnalysis.canvasCoveragePercent < 2;

    // Stroke metrics
    const avgSpeed  = strokeSpeeds.length > 0 ? mean(strokeSpeeds) : 0;
    const avgSize   = usedSizes.length  > 0 ? mean(usedSizes)  : 16;
    const avgLength = strokeLengths.length > 0 ? mean(strokeLengths) : 0;

    // Eraser metrics
    if (eraserStartTime) {
      eraserActiveTime += Date.now() - eraserStartTime;
      eraserStartTime = Date.now();
    }
    const totalTime = Date.now() - sessionStart;
    const eraserRatio = totalTime > 0 ? (eraserActiveTime / totalTime) * 100 : 0;
    const isPerfectionist = eraserToggles > 4 || eraserRatio > 15 || undoCount > 6;

    // Spatial dominance
    const norm = spatialAnalysis.normalized;
    const topActivity    = mean([norm[0][0], norm[0][1], norm[0][2]]);
    const bottomActivity = mean([norm[2][0], norm[2][1], norm[2][2]]);
    const leftActivity   = mean([norm[0][0], norm[1][0], norm[2][0]]);
    const rightActivity  = mean([norm[0][2], norm[1][2], norm[2][2]]);
    const centerActivity = norm[1][1];

    // Dominant zone
    const zones = [
      { label: 'Superior', val: topActivity },
      { label: 'Inferior', val: bottomActivity },
      { label: 'Izquierda', val: leftActivity },
      { label: 'Derecha', val: rightActivity },
      { label: 'Centro', val: centerActivity }
    ];
    zones.sort((a, b) => b.val - a.val);
    const dominantZone = zones[0].label;

    // Coverage bucket
    const coverage = colorAnalysis.canvasCoveragePercent;

    // --- RADAR CHART SCORES (0-100) ---
    const vitalidad     = clamp(warmPct * 1.2 + Math.min(avgSpeed * 10, 30), 0, 100);
    const calma         = clamp(coolPct * 1.3 + Math.max(0, 30 - avgSpeed * 8), 0, 100);
    const expresividad  = clamp((coverage / 100) * 60 + (totalStrokes > 10 ? 30 : totalStrokes * 3), 0, 100);
    const concentracion = clamp(isPerfectionist ? 80 : (avgLength > 100 ? 70 : avgLength / 5), 0, 100);
    const afecto        = clamp((pct['#ff2d55'] || 0) * 1.5 + (pct['#ff9500'] || 0) * 0.8 + (pct['#ffcc00'] || 0) * 0.5, 0, 100);

    const radarScores = { vitalidad, calma, expresividad, concentracion, afecto };

    // --- ARCHETYPE CLASSIFICATION ---
    let archetype, archetypeEmoji, archetypeDesc;

    if (isEmpty) {
      archetype     = 'Lienzo en Silencio';
      archetypeEmoji = '🌫️';
      archetypeDesc  = 'El pequeño artista exploró el lienzo con mucha prudencia o aún está calentando motores.';
    } else if (dominantColor && dominantColor.hex === '#ff3b30' && avgSpeed > 5 && warmPct > 50) {
      archetype     = 'Volcán Expresivo';
      archetypeEmoji = '🌋';
      archetypeDesc  = 'Una personalidad llena de energía desbordante, que expresa con fuerza y vitalidad.';
    } else if (warmPct > 60 && avgSpeed >= 2.5) {
      archetype     = 'Explorador Radiante';
      archetypeEmoji = '☀️';
      archetypeDesc  = 'Un espíritu alegre, extrovertido y lleno de curiosidad que irradia positividad.';
    } else if (coolPct > 55 && avgSpeed < 3.5) {
      archetype     = 'Constructor Reflexivo';
      archetypeEmoji = '🏔️';
      archetypeDesc  = 'Una mente serena, paciente y metódica que procesa el mundo con profundidad.';
    } else if (dominantColor && dominantColor.hex === '#ff2d55') {
      archetype     = 'Observador Sensible';
      archetypeEmoji = '🌸';
      archetypeDesc  = 'Un corazón empático y delicado que valora las conexiones afectivas profundas.';
    } else if (somberPct > 55 && (pct['#af52de'] || 0) > 20) {
      archetype     = 'Pequeño Soñador';
      archetypeEmoji = '🔮';
      archetypeDesc  = 'Una imaginación vasta y mística que habita mundos de fantasía y simbolismo.';
    } else if (somberPct > 50) {
      archetype     = 'Guardián Interior';
      archetypeEmoji = '🦉';
      archetypeDesc  = 'Un espíritu introvertido y protector que procesa sus vivencias con reflexión.';
    } else {
      archetype     = 'Creador Armónico';
      archetypeEmoji = '🌈';
      archetypeDesc  = 'Una mente rica y diversa que abraza la variedad, el juego y la libre expresión.';
    }

    // --- MOOD CLASSIFICATION ---
    let mood, moodEmoji;

    if (isEmpty) {
      mood = 'Exploración Inicial'; moodEmoji = '🌙';
    } else if (warmPct > 65) {
      mood = 'Entusiasmo y Alegría'; moodEmoji = '🎉';
    } else if (coolPct > 60) {
      mood = 'Calma y Serenidad'; moodEmoji = '🌊';
    } else if (dominantColor && dominantColor.hex === '#ff2d55') {
      mood = 'Afectividad y Ternura'; moodEmoji = '💝';
    } else if (somberPct > 60) {
      mood = 'Reflexión e Introspección'; moodEmoji = '🌌';
    } else {
      mood = 'Creatividad y Curiosidad'; moodEmoji = '✨';
    }

    // --- PSYCH ANALYSIS TEXT ---
    let psychText = '';
    let recText   = '';
    let questions  = [];

    if (isEmpty) {
      psychText = 'El lienzo muestra muy pocos trazos, lo que puede indicar una etapa de exploración inicial, timidez ante el lienzo, o que el niño completó el dibujo muy rápidamente. Es una invitación a acompañarle con calidez.';
      recText   = 'Acompáñale con entusiasmo y pinta juntos en el mismo lienzo para que se sienta más cómodo. Muéstrale que no hay formas incorrectas de dibujar.';
      questions  = ['¿Qué te gustaría dibujar hoy?', '¿Quieres que pintemos juntos algo especial?', '¿Cuál es tu color favorito?'];
    } else if (archetype === 'Volcán Expresivo') {
      psychText = `El dibujo revela un predominio de <strong>Rojo (${pct['#ff3b30'] || 0}%)</strong> combinado con trazos rápidos e intensos. En psicología infantil, este patrón representa una fuerte descarga emocional: el niño está procesando energía acumulada, entusiasmo o incluso frustraciones, usando el lienzo como un espacio seguro para exteriorizar con fuerza.`;
      recText   = 'Brinda espacios físicos para canalizar esa energía desbordante: juegos activos, danza, o actividades manuales intensas. Valida su expresividad diciendo: <em>"¡Veo que pintaste con mucha fuerza! Eso está genial."</em>';
      questions  = [
        '¿Cómo te sentías cuando pintabas tan rápido?',
        '¿Qué estaba pasando en tu dibujo?',
        '¿Quién vive en ese mundo de colores?'
      ];
      if (isPerfectionist) psychText += ` <br><br><strong>🧽 Nota:</strong> Se detectó uso frecuente del borrador (${eraserToggles} veces). Esto denota también rasgos de autocrítica y alta autoexigencia coexistiendo con la energía expresiva.`;
    } else if (archetype === 'Explorador Radiante') {
      psychText = `Dominado por colores cálidos vibrantes <strong>(${warmPct}%)</strong> con un ritmo constante y fluido, este dibujo irradia alegría, apertura social y deseos de conectar con el mundo. El niño proyecta un estado emocional extrovertido, con energía positiva y curiosidad activa.`;
      recText   = 'Fomenta su sociabilidad con actividades grupales, proyectos creativos compartidos o visitas a lugares nuevos. Pregúntale sobre los personajes de su dibujo con entusiasmo.';
      questions  = [
        '¿Hay personajes en tu dibujo? ¡Cuéntame sobre ellos!',
        '¿Este dibujo tiene un nombre especial?',
        '¿Con quién compartirías esta obra de arte?'
      ];
    } else if (archetype === 'Constructor Reflexivo') {
      psychText = `La abundancia de tonos fríos <strong>(${coolPct}%)</strong> con trazos pausados y controlados refleja una mente en estado de calma profunda. El niño procesa sus emociones con serenidad, busca el orden y la concentración, y usa el arte como un espacio de introspección tranquila.`;
      recText   = 'Protege estos momentos de quietud. Proporciónale libros ilustrados, rompecabezas o actividades que requieran concentración. Elogia específicamente su paciencia: <em>"Me encanta cómo tomaste tu tiempo para hacer cada detalle."</em>';
      questions  = [
        '¿Qué estabas pensando mientras dibujabas?',
        '¿Hay algo especial que quieras que yo vea en tu dibujo?',
        '¿Cómo se llama el lugar que dibujaste?'
      ];
    } else if (archetype === 'Observador Sensible') {
      psychText = `El color dominante <strong>Rosa (${pct['#ff2d55'] || 0}%)</strong> es una expresión de ternura, búsqueda de afecto y alta sensibilidad emocional. Los trazos delicados y armoniosos indican un niño receptivo al cariño que valora profundamente los vínculos familiares y los entornos de paz y amor.`;
      recText   = 'Este es un momento ideal para fortalecer lazos: dale un abrazo, comparte una charla cálida y asegúrale que está en un espacio seguro y amado. Pregúntale a quién le regalaría su dibujo.';
      questions  = [
        '¿A quién le darías este dibujo como regalo?',
        '¿Tu dibujo habla de alguien que quieres mucho?',
        '¿Cómo se siente el personaje de tu dibujo?'
      ];
    } else if (archetype === 'Pequeño Soñador') {
      psychText = `El predominio de tonos como <strong>Morado (${pct['#af52de'] || 0}%)</strong> sugiere una mente repleta de fantasía, intuición y espiritualidad. Los niños que eligen estos tonos suelen tener una imaginación sumamente desarrollada, disfrutan del juego simbólico y construyen mundos interiores ricos y profundos.`;
      recText   = 'Alimenta su mundo de fantasía con cuentos fantásticos, películas animadas y juegos de rol. Retádele a inventar una historia completa sobre su dibujo, preguntando "¿qué pasa en el siguiente capítulo?"';
      questions  = [
        '¿Existe magia en tu dibujo?',
        '¿Si tu dibujo fuera un cuento, cómo comenzaría?',
        '¿Cuál es el poder secreto de los colores que elegiste?'
      ];
    } else if (archetype === 'Guardián Interior') {
      psychText = `La presencia de tonos oscuros <strong>(${somberPct}%)</strong> como el negro y el marrón puede representar protección de la intimidad, necesidad de refugio o asimilación de preocupaciones. En la psicología infantil, esto no es alarmante: es una forma de procesamiento introspectivo. Si se repite constantemente, vale la pena abrir canales de diálogo.`;
      recText   = 'No te preocupes; a menudo es simple curiosidad estética. Observa si el patrón se repite. Abre canales suaves de conversación sin presionar: <em>"Me gustan mucho tus colores oscuros, ¿me cuentas qué hay en esa parte misteriosa?"</em>';
      questions  = [
        '¿Qué está escondido en las partes oscuras de tu dibujo?',
        '¿Cómo se siente el personaje de tu dibujo hoy?',
        '¿Qué color te gustaría que tuviera la parte más alegre?'
      ];
    } else {
      psychText = `El dibujo destaca por una distribución equilibrada de múltiples colores, con <strong>ninguno superando el 35%</strong>. Esta riqueza cromática revela una mentalidad muy curiosa, adaptable y en búsqueda constante de nuevos estímulos. El niño explora el lienzo con libertad y versatilidad intelectual.`;
      recText   = 'Apoya su curiosidad innata exponiéndole a diferentes texturas y materiales artísticos (témperas, plastilina, acuarelas). Su mente está lista para absorber y sintetizar nuevas experiencias creativas.';
      questions  = [
        '¿Por qué elegiste tantos colores diferentes?',
        '¿Cuál es tu zona favorita del dibujo?',
        '¿Qué sentías mientras usabas cada color?'
      ];
    }

    // Add zone insight
    const zoneInsights = {
      'Superior':   'Los trazos en la zona superior del lienzo están relacionados con el pensamiento imaginativo, los sueños y las aspiraciones del niño.',
      'Inferior':   'La actividad en la zona inferior indica una conexión con lo concreto, la seguridad y las necesidades básicas de estabilidad.',
      'Izquierda':  'Pintar principalmente en la zona izquierda puede reflejar apego al pasado, la figura materna o una tendencia introspectiva.',
      'Derecha':    'La actividad en la zona derecha sugiere orientación al futuro, apertura social y disposición a explorar lo desconocido.',
      'Centro':     'Concentrarse en el centro del lienzo refleja una fuerte autoconcepción y un buen equilibrio del yo interior.'
    };
    psychText += `<br><br><strong>🗺️ Zona de Actividad Predominante: ${dominantZone}</strong><br>${zoneInsights[dominantZone] || ''}`;

    if (isPerfectionist && archetype !== 'Volcán Expresivo') {
      recText += `<br><br><strong>⭐ Nota sobre perfeccionismo:</strong> Se detectó uso frecuente del borrador (${eraserToggles} correcciones y ${undoCount} deshaceres). Ayúdale a aceptar que en el arte los "errores" se convierten en nuevas oportunidades creativas.`;
    }

    // Stroke style addendum
    if (!isEmpty) {
      if (avgSize < 12 && avgLength < 80) {
        psychText += '<br><br><strong>✏️ Estilo de trazo:</strong> Trazos finos, cortos y cuidadosos. Puede indicar precaución, timidez o un temperamento meticuloso y detallista.';
      } else if (avgSize > 28 && avgLength > 120) {
        psychText += '<br><br><strong>✏️ Estilo de trazo:</strong> Trazos anchos, fluidos y amplios. Refleja seguridad, asertividad y una necesidad de ocupar el espacio con confianza.';
      }
    }

    return {
      archetype, archetypeEmoji, archetypeDesc,
      mood, moodEmoji,
      psychText, recText, questions,
      radarScores,
      colorData: colorAnalysis,
      spatialData: spatialAnalysis,
      stats: {
        strokes: totalStrokes,
        speed: avgSpeed,
        thickness: avgSize,
        eraser: eraserToggles,
        coverage: colorAnalysis.canvasCoveragePercent,
        favouriteTool: getFavouriteTool()
      }
    };
  }

  function getFavouriteTool() {
    const tools = Object.entries(toolUsageCounts);
    tools.sort((a, b) => b[1] - a[1]);
    const toolNames = {
      brush: '🖌️ Pincel', marker: '🖍️ Marcador',
      fill: '🪣 Relleno', spray: '✨ Spray', eraser: '🧽 Borrador'
    };
    return tools[0][1] > 0 ? toolNames[tools[0][0]] : '🖌️ Pincel';
  }

  /* ==========================================================
     EVAL MODAL — OPEN
  ========================================================== */
  function openEvalModal() {
    // Merge canvases for preview (drawing first, template on top with multiply)
    const merge = buildMergedCanvas();
    evalPreviewImg.src = merge.toDataURL('image/png');

    // Run evaluation
    const result = evaluateDrawing();

    // Populate header
    evalArchetypeEmoji.textContent = result.archetypeEmoji;
    evalArchetypeName.textContent  = result.archetype;
    evalTitle.textContent = `Análisis de tu Dibujo ${result.archetypeEmoji}`;

    // Mood strip
    moodIconContainer.textContent = result.moodEmoji;
    moodValue.textContent         = result.mood;

    // Populate Panel 1 — Art
    renderColorBar(result.colorData.percentages);
    renderSpatialGrid(result.spatialData.normalized);

    // Populate Panel 2 — Analysis
    renderRadarChart(result.radarScores);
    populateStats(result.stats);
    psychTextBody.innerHTML = result.psychText;

    // Populate Panel 3 — Advice
    adviceHeroEmoji.textContent    = result.archetypeEmoji;
    adviceArchetypeFull.textContent = result.archetype;
    adviceArchetypeDesc.textContent = result.archetypeDesc;
    advicePsychBody.innerHTML = result.psychText;
    adviceRecBody.innerHTML   = result.recText;
    renderQuestions(result.questions);

    // Launch confetti
    launchConfetti();

    // Open
    evalOverlay.classList.add('open');
  }

  function closeEvalModal() {
    evalOverlay.classList.remove('open');
  }

  /* ==========================================================
     RENDER — COLOR DISTRIBUTION BAR
  ========================================================== */
  function renderColorBar(percentages) {
    colorDistBar.innerHTML    = '';
    colorDistLegend.innerHTML = '';

    palette.forEach(color => {
      const pct = percentages[color.hex] || 0;
      if (pct > 0) {
        const seg = document.createElement('div');
        seg.className = 'color-dist-segment';
        seg.style.width = pct + '%';
        seg.style.background = color.hex;
        seg.style.borderRadius = '0';
        seg.title = `${color.name}: ${pct}%`;
        colorDistBar.appendChild(seg);

        const item = document.createElement('div');
        item.className = 'color-dist-item';
        item.innerHTML = `
          <span class="color-dist-dot" style="background:${color.hex};${color.hex === '#ffffff' ? 'border:1.5px solid #ddd' : ''}"></span>
          <span>${color.name} <strong>${pct}%</strong></span>
        `;
        colorDistLegend.appendChild(item);
      }
    });
  }

  /* ==========================================================
     RENDER — SPATIAL HEATMAP GRID
  ========================================================== */
  function renderSpatialGrid(normalized) {
    spatialGrid.innerHTML = '';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const val  = normalized[r][c];
        const cell = document.createElement('div');
        cell.className = 'spatial-cell';
        const alpha = Math.round(val * 100) / 100;
        cell.style.background = `rgba(63, 167, 181, ${0.08 + alpha * 0.72})`;
        cell.title = `${Math.round(val * 100)}% actividad`;
        spatialGrid.appendChild(cell);
      }
    }
  }

  /* ==========================================================
     RENDER — RADAR CHART (Pentagon SVG)
  ========================================================== */
  function renderRadarChart(scores) {
    radarSvg.innerHTML = '';
    radarLegend.innerHTML = '';

    const cx = 130, cy = 130, maxR = 100;
    const axes = [
      { label: 'Vitalidad',      key: 'vitalidad',     color: '#FF6B6B' },
      { label: 'Calma',          key: 'calma',          color: '#4ECDC4' },
      { label: 'Expresividad',   key: 'expresividad',   color: '#FFD166' },
      { label: 'Concentración',  key: 'concentracion',  color: '#A78BFA' },
      { label: 'Afecto',         key: 'afecto',         color: '#FF8E9B' }
    ];
    const n = axes.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    // Draw grid rings
    [0.25, 0.5, 0.75, 1].forEach(frac => {
      const pts = axes.map((_, i) => {
        const angle = startAngle + i * angleStep;
        return `${cx + Math.cos(angle) * maxR * frac},${cy + Math.sin(angle) * maxR * frac}`;
      });
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', pts.join(' '));
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', 'rgba(0,0,0,0.08)');
      poly.setAttribute('stroke-width', '1');
      radarSvg.appendChild(poly);
    });

    // Draw axis lines
    axes.forEach((axis, i) => {
      const angle = startAngle + i * angleStep;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', cx + Math.cos(angle) * maxR);
      line.setAttribute('y2', cy + Math.sin(angle) * maxR);
      line.setAttribute('stroke', 'rgba(0,0,0,0.1)');
      line.setAttribute('stroke-width', '1');
      radarSvg.appendChild(line);
    });

    // Draw data polygon
    const dataPoints = axes.map((axis, i) => {
      const val   = (scores[axis.key] || 0) / 100;
      const angle = startAngle + i * angleStep;
      return { x: cx + Math.cos(angle) * maxR * val, y: cy + Math.sin(angle) * maxR * val };
    });

    const polyPts = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

    // Fill gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    grad.setAttribute('id', 'radarGrad');
    grad.setAttribute('cx', '50%');
    grad.setAttribute('cy', '50%');
    grad.setAttribute('r', '50%');
    const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s1.setAttribute('offset', '0%');
    s1.setAttribute('stop-color', '#3FA7B5');
    s1.setAttribute('stop-opacity', '0.5');
    const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s2.setAttribute('offset', '100%');
    s2.setAttribute('stop-color', '#A78BFA');
    s2.setAttribute('stop-opacity', '0.2');
    grad.appendChild(s1);
    grad.appendChild(s2);
    defs.appendChild(grad);
    radarSvg.appendChild(defs);

    const fillPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    fillPoly.setAttribute('points', polyPts);
    fillPoly.setAttribute('fill', 'url(#radarGrad)');
    fillPoly.setAttribute('stroke', '#3FA7B5');
    fillPoly.setAttribute('stroke-width', '2');
    fillPoly.setAttribute('stroke-linejoin', 'round');
    radarSvg.appendChild(fillPoly);

    // Draw data points + labels
    dataPoints.forEach((pt, i) => {
      // Dot
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', axes[i].color);
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', '2');
      radarSvg.appendChild(circle);

      // Label
      const angle = startAngle + i * angleStep;
      const lx = cx + Math.cos(angle) * (maxR + 22);
      const ly = cy + Math.sin(angle) * (maxR + 22);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', lx);
      text.setAttribute('y', ly);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-family', 'Nunito, sans-serif');
      text.setAttribute('font-size', '10');
      text.setAttribute('font-weight', '700');
      text.setAttribute('fill', '#555');
      text.textContent = axes[i].label;
      radarSvg.appendChild(text);

      // Legend item
      const item = document.createElement('div');
      item.className = 'radar-legend-item';
      item.innerHTML = `
        <span class="radar-legend-dot" style="background:${axes[i].color}"></span>
        <span>${axes[i].label}: <strong>${Math.round(scores[axes[i].key] || 0)}%</strong></span>
      `;
      radarLegend.appendChild(item);
    });
  }

  /* ==========================================================
     RENDER — STATS CARDS
  ========================================================== */
  function populateStats(stats) {
    let speedLabel = 'Relajado 😌';
    if (stats.speed > 5.5) speedLabel = 'Rápido y Espontáneo ⚡';
    else if (stats.speed < 1.8 && stats.speed > 0) speedLabel = 'Lento y Detallista 🔍';

    let thicknessLabel = 'Medio';
    if (stats.thickness > 28) thicknessLabel = 'Grueso (Firme)';
    else if (stats.thickness < 12) thicknessLabel = 'Fino (Delicado)';

    statStrokes.textContent   = `${stats.strokes} ${stats.strokes === 1 ? 'trazo' : 'trazos'}`;
    statSpeed.textContent     = speedLabel;
    statThickness.textContent = `${thicknessLabel} (~${Math.round(stats.thickness)}px)`;
    statEraser.textContent    = `${stats.eraser} ${stats.eraser === 1 ? 'vez' : 'veces'}`;
    statCoverage.textContent  = `${stats.coverage}% del lienzo`;
    statTool.textContent      = stats.favouriteTool;
  }

  /* ==========================================================
     RENDER — QUESTION CARDS
  ========================================================== */
  function renderQuestions(questions) {
    adviceQuestions.innerHTML = '';
    questions.forEach(q => {
      const item = document.createElement('div');
      item.className = 'advice-question-item';
      item.textContent = `💬 ${q}`;
      adviceQuestions.appendChild(item);
    });
  }

  /* ==========================================================
     CONFETTI BURST
  ========================================================== */
  function launchConfetti() {
    evalConfetti.innerHTML = '';
    const colors = ['#FF6B6B','#FFD166','#06D6A0','#118AB2','#A78BFA','#FF8A65'];
    for (let i = 0; i < 28; i++) {
      const dot = document.createElement('div');
      dot.className = 'confetti-dot';
      const size = Math.random() * 10 + 5;
      dot.style.width  = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left   = Math.random() * 100 + '%';
      dot.style.top    = '-10px';
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.animationDelay = (Math.random() * 0.8) + 's';
      dot.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
      evalConfetti.appendChild(dot);
    }
  }

  /* ==========================================================
     DOWNLOAD ARTWORK
  ========================================================== */
  function downloadArtwork() {
    const merge = buildMergedCanvas();
    const link  = document.createElement('a');
    link.download = `chromind-obra-${Date.now()}.png`;
    link.href = merge.toDataURL('image/png');
    link.click();
  }

  function buildMergedCanvas() {
    const merge = document.createElement('canvas');
    merge.width  = CANVAS_W;
    merge.height = CANVAS_H;
    const mCtx  = merge.getContext('2d');
    mCtx.fillStyle = '#ffffff';
    mCtx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    mCtx.drawImage(drawingCanvas, 0, 0);
    if (currentTemplate !== 'none') {
      mCtx.globalCompositeOperation = 'multiply';
      mCtx.drawImage(templateCanvas, 0, 0);
      mCtx.globalCompositeOperation = 'source-over';
    }
    return merge;
  }



  /* ==========================================================
     UTILITIES
  ========================================================== */
  function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function hexToRgbObj(hex) {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    };
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ==========================================================
     SERVICE WORKER REGISTRATION (Offline PWA)
  ========================================================== */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('[Chromind] PWA Service Worker registrado correctamente:', reg.scope);
      })
      .catch(err => {
        console.warn('[Chromind] Error al registrar Service Worker:', err);
      });
  }

}); // DOMContentLoaded
