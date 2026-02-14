/* =========================================================
   diagramRenderer.js - Professioneller Diagramm-Renderer
   VOLLSTÄNDIG mit allen benötigten Diagrammtypen für pool.js
========================================================= */

(function() {
  "use strict";

  /* =========================================================
     PRÜFUNG AUF STATIC_DIAGRAMS
  ========================================================= */
  if (typeof STATIC_DIAGRAMS === "undefined") {
    console.warn(
      "⚠️ STATIC_DIAGRAMS wurde nicht geladen. " +
      "Bitte stellen Sie sicher, dass staticDiagrams.js vor diagramRenderer.js eingebunden wird."
    );
  }

  /* =========================================================
     KONFIGURATION & KONSTANTEN
  ========================================================= */
  const CONFIG = {
    sizes: {
      screen: { width: 400, height: 300 },
      print: { width: 600, height: 450 },
      thumbnail: { width: 200, height: 150 }
    },
    padding: 40,
    colors: {
      primary: '#1976d2',
      secondary: '#2e7d32',
      accent: '#d32f2f',
      warning: '#ff9800',
      background: '#f9f9f9',
      grid: '#ddd',
      axis: '#333',
      text: '#000',
      lightBlue: '#e3f2fd',
      lightGreen: '#e8f5e8',
      lightRed: '#ffcdd2',
      lightOrange: '#ffcc80'
    },
    responsive: {
      enableViewBox: true,
      preserveAspectRatio: 'xMidYMid meet'
    }
  };

  /* =========================================================
     ZENTRALE SKALIERUNGSFUNKTIONEN
  ========================================================= */
  const Scaler = {
    linear: (value, min, max, start, end) => {
      return start + ((value - min) / (max - min)) * (end - start);
    },
    calculateScale: (data, availableSpace, maxDataValue) => {
      const maxVal = maxDataValue || Math.max(...data);
      return availableSpace / maxVal;
    },
    findAxisBounds: (points, padding = 2) => {
      if (!points || points.length === 0) return { x: [0, 10], y: [0, 10] };
      
      const allX = points.flatMap(p => Array.isArray(p) ? p[0] : p.x);
      const allY = points.flatMap(p => Array.isArray(p) ? p[1] : p.y);
      
      const minX = Math.min(...allX) - padding;
      const maxX = Math.max(...allX) + padding;
      const minY = Math.min(...allY) - padding;
      const maxY = Math.max(...allY) + padding;
      
      return {
        x: [minX < 0 ? minX : 0, maxX],
        y: [minY < 0 ? minY : 0, maxY]
      };
    },
    getOptimalSize: (forPrint = false) => {
      return forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    }
  };

  /* =========================================================
     SVG-HILFSFUNKTIONEN
  ========================================================= */
  const SVG = {
    create: (width, height, forPrint = false) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      
      if (CONFIG.responsive.enableViewBox) {
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("preserveAspectRatio", CONFIG.responsive.preserveAspectRatio);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "auto");
        if (forPrint) svg.setAttribute("data-print-optimized", "true");
      } else {
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
      }
      
      svg.style.display = "block";
      svg.style.margin = "0 auto";
      svg.style.maxWidth = "100%";
      svg.style.height = "auto";
      
      return svg;
    },
    rect: (x, y, width, height, fill, stroke, strokeWidth = 1) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", width);
      rect.setAttribute("height", height);
      rect.setAttribute("fill", fill);
      if (stroke) rect.setAttribute("stroke", stroke);
      rect.setAttribute("stroke-width", strokeWidth);
      return rect;
    },
    line: (x1, y1, x2, y2, stroke, strokeWidth = 1, dasharray = null) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", stroke);
      line.setAttribute("stroke-width", strokeWidth);
      if (dasharray) line.setAttribute("stroke-dasharray", dasharray);
      return line;
    },
    circle: (cx, cy, r, fill, stroke = null, strokeWidth = 1) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", fill);
      if (stroke) circle.setAttribute("stroke", stroke);
      circle.setAttribute("stroke-width", strokeWidth);
      return circle;
    },
    text: (x, y, text, fontSize = '12px', fill = CONFIG.colors.text, anchor = 'start', fontWeight = 'normal') => {
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", x);
      txt.setAttribute("y", y);
      txt.setAttribute("font-size", fontSize);
      txt.setAttribute("fill", fill);
      txt.setAttribute("text-anchor", anchor);
      if (fontWeight !== 'normal') txt.setAttribute("font-weight", fontWeight);
      txt.textContent = text;
      return txt;
    },
    polygon: (points, fill, stroke, strokeWidth = 1) => {
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("points", points.map(p => p.join(',')).join(' '));
      polygon.setAttribute("fill", fill);
      polygon.setAttribute("stroke", stroke);
      polygon.setAttribute("stroke-width", strokeWidth);
      return polygon;
    },
    path: (d, fill, stroke, strokeWidth = 1) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", fill);
      path.setAttribute("stroke", stroke);
      path.setAttribute("stroke-width", strokeWidth);
      return path;
    },
    group: () => document.createElementNS("http://www.w3.org/2000/svg", "g"),
    ellipse: (cx, cy, rx, ry, fill, stroke, strokeWidth = 1) => {
      const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      ellipse.setAttribute("cx", cx);
      ellipse.setAttribute("cy", cy);
      ellipse.setAttribute("rx", rx);
      ellipse.setAttribute("ry", ry);
      ellipse.setAttribute("fill", fill);
      ellipse.setAttribute("stroke", stroke);
      ellipse.setAttribute("stroke-width", strokeWidth);
      return ellipse;
    }
  };

  /* =========================================================
     DIAGRAMM-REGISTRY
  ========================================================= */
  const DiagramRegistry = new Map();

  function registerDiagram(type, renderer) {
    if (typeof renderer !== 'function') {
      console.error(`Renderer für '${type}' muss eine Funktion sein`);
      return;
    }
    DiagramRegistry.set(type, renderer);
  }

  function validateDiagramData(diagramData) {
    if (!diagramData) throw new Error('Keine Diagrammdaten übergeben');
    if (!diagramData.type) throw new Error('Diagrammtyp fehlt');
    return true;
  }

  /* =========================================================
     HAUPTFUNKTION
  ========================================================= */
  function renderDiagram(diagramData, container, options = {}) {
    if (!container) {
      console.error('Kein Container-Element übergeben');
      return;
    }

    const opts = {
      forPrint: options.forPrint || false,
      size: options.size || (options.forPrint ? 'print' : 'screen'),
      ...options
    };

    container.innerHTML = '';
    container.classList.add('diagram-container');
    
    if (opts.forPrint) {
      container.style.pageBreakInside = 'avoid';
      container.style.breakInside = 'avoid';
    }

    try {
      validateDiagramData(diagramData);

      if (diagramData.params?.title) {
        const title = document.createElement('h3');
        title.textContent = diagramData.params.title;
        title.style.margin = '0 0 10px 0';
        title.style.fontSize = '16px';
        title.style.textAlign = 'center';
        container.appendChild(title);
      }

      const renderer = DiagramRegistry.get(diagramData.type);
      
      if (!renderer) {
        handleStaticDiagramFallback(diagramData, container, opts);
        return;
      }

      const svg = renderer(diagramData.params || {}, opts);

      if (svg) {
        container.appendChild(svg);
      } else {
        throw new Error(`Renderer für '${diagramData.type}' lieferte kein SVG`);
      }

    } catch (error) {
      console.error('Fehler beim Rendern des Diagramms:', error);
      renderError(container, error.message);
    }
  }

  function handleStaticDiagramFallback(diagramData, container, opts) {
    if (typeof STATIC_DIAGRAMS !== "undefined" && STATIC_DIAGRAMS[diagramData.type]) {
      console.log(`Verwende STATIC_DIAGRAMS für Typ: ${diagramData.type}`);
      const staticDiagram = STATIC_DIAGRAMS[diagramData.type];
      const renderer = DiagramRegistry.get(staticDiagram.type);
      
      if (renderer) {
        const params = { ...staticDiagram.params, ...diagramData.params };
        const svg = renderer(params, opts);
        if (svg) container.appendChild(svg);
        else renderPlaceholder(container, `Statisches Diagramm: ${diagramData.type}`);
      } else {
        renderPlaceholder(container, `Kein Renderer für ${diagramData.type}`);
      }
    } else {
      renderPlaceholder(container, `Unbekannter Diagrammtyp: ${diagramData.type}`);
    }
  }

  function renderError(container, message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.color = '#c62828';
    errorDiv.style.border = '1px solid #ef9a9a';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.margin = '10px 0';
    errorDiv.innerHTML = `❌ Diagramm-Fehler: ${message}`;
    container.appendChild(errorDiv);
  }

  function renderPlaceholder(container, message = 'Diagramm nicht verfügbar') {
    const size = CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height);
    
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, '#f5f5f5', '#ccc', 1));
    svg.appendChild(SVG.text(size.width/2, size.height/2 - 10, '📊', '24px Arial', '#999', 'middle'));
    svg.appendChild(SVG.text(size.width/2, size.height/2 + 20, message, '12px Arial', '#999', 'middle'));
    
    container.appendChild(svg);
    return svg;
  }

  /* =========================================================
     KOORDINATENSYSTEM-BASIS
  ========================================================= */
  function createCoordinateSystem(params, drawCallback, forPrint = false) {
    const {
      width = CONFIG.sizes.screen.width,
      height = CONFIG.sizes.screen.height,
      bounds,
      grid = true,
      axes = true,
      padding = CONFIG.padding
    } = params;

    const svg = SVG.create(width, height, forPrint);
    svg.appendChild(SVG.rect(0, 0, width, height, CONFIG.colors.background, '#ddd', 1));

    if (!bounds) return svg;

    const { x: [xMin, xMax], y: [yMin, yMax] } = bounds;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;

    const toX = (x) => padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const toY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * plotHeight;

    if (grid) {
      const steps = 10;
      for (let i = 0; i <= steps; i++) {
        const x = padding + (i / steps) * plotWidth;
        const y = padding + (i / steps) * plotHeight;
        svg.appendChild(SVG.line(x, padding, x, height - padding, CONFIG.colors.grid, 1));
        svg.appendChild(SVG.line(padding, y, width - padding, y, CONFIG.colors.grid, 1));
      }
    }

    if (axes) {
      svg.appendChild(SVG.line(padding, height - padding, width - padding, height - padding, CONFIG.colors.axis, 2));
      svg.appendChild(SVG.line(padding, height - padding, padding, padding, CONFIG.colors.axis, 2));
      svg.appendChild(SVG.text(width - 20, height - 20, 'x', '14px Arial', CONFIG.colors.axis, 'end'));
      svg.appendChild(SVG.text(25, 20, 'y', '14px Arial', CONFIG.colors.axis));
    }

    if (drawCallback) {
      const ctx = { svg, toX, toY, padding, plotWidth, plotHeight, bounds };
      drawCallback(ctx);
    }

    return svg;
  }

  /* =========================================================
     ALLE RENDERER-FUNKTIONEN (VOLLSTÄNDIG)
  ========================================================= */

  // 1. KOORDINATENSYSTEM
  registerDiagram('koordinatensystem', (params, opts) => {
    const { points = [], lines = [], bounds } = params;
    const calculatedBounds = bounds || Scaler.findAxisBounds([...points, ...lines.flatMap(l => [l.from, l.to])]);
    const forPrint = opts?.forPrint || false;

    return createCoordinateSystem({ ...params, bounds: calculatedBounds }, (ctx) => {
      const { svg, toX, toY } = ctx;

      lines.forEach(line => {
        const [x1, y1] = line.from;
        const [x2, y2] = line.to;
        svg.appendChild(SVG.line(
          toX(x1), toY(y1),
          toX(x2), toY(y2),
          line.stroke || CONFIG.colors.primary,
          line.strokeWidth || 2
        ));
      });

      points.forEach(point => {
        const x = toX(point.x);
        const y = toY(point.y);
        svg.appendChild(SVG.circle(x, y, 5, CONFIG.colors.primary, '#fff', 2));
        if (point.label) {
          svg.appendChild(SVG.text(x + 10, y - 10, point.label, '12px Arial', CONFIG.colors.text));
        }
      });
    }, forPrint);
  });

  // 2. FLÄCHE DREIECK KOORDINATEN (AUS POOL.JS)
  registerDiagram('flaeche_dreieck_koordinaten', (params, opts) => {
    const { points = [[2,2], [7,3], [4,8]], labels = ["A", "B", "C"] } = params;
    const bounds = Scaler.findAxisBounds(points);
    const forPrint = opts?.forPrint || false;

    return createCoordinateSystem({ bounds }, (ctx) => {
      const { svg, toX, toY } = ctx;

      const trianglePoints = points.map(p => [toX(p[0]), toY(p[1])]);
      svg.appendChild(SVG.polygon(trianglePoints, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

      points.forEach((p, i) => {
        const x = toX(p[0]);
        const y = toY(p[1]);
        svg.appendChild(SVG.circle(x, y, 5, CONFIG.colors.primary, '#fff', 2));
        svg.appendChild(SVG.text(x + 10, y - 10, labels[i], '12px Arial', CONFIG.colors.text));
      });
    }, forPrint);
  });

  // 3. VIERECK KOORDINATEN (AUS POOL.JS)
  registerDiagram('viereck_koordinaten', (params, opts) => {
    const { points = [[2,2], [8,2], [6,7], [3,7]], labels = ["A", "B", "C", "D"] } = params;
    const bounds = Scaler.findAxisBounds(points);
    const forPrint = opts?.forPrint || false;

    return createCoordinateSystem({ bounds }, (ctx) => {
      const { svg, toX, toY } = ctx;

      const quadPoints = points.map(p => [toX(p[0]), toY(p[1])]);
      svg.appendChild(SVG.polygon(quadPoints, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 2));

      points.forEach((p, i) => {
        const x = toX(p[0]);
        const y = toY(p[1]);
        svg.appendChild(SVG.circle(x, y, 5, CONFIG.colors.secondary, '#fff', 2));
        svg.appendChild(SVG.text(x + 10, y - 10, labels[i], '12px Arial', CONFIG.colors.text));
      });
    }, forPrint);
  });

  // 4. RECHTWINKLIGES DREIECK (PYTHAGORAS)
  registerDiagram('dreieck_pythagoras', (params, opts) => {
    const { a = 6, b = 8, c = null, labels = true } = params;
    const cValue = c || Math.sqrt(a*a + b*b);
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min((size.height - 100) / Math.max(a, b), (size.width - 100) / Math.max(a, b));
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const startX = 50;
    const startY = size.height - 50;
    const points = [
      [startX, startY],
      [startX + a * scale, startY],
      [startX, startY - b * scale]
    ];

    svg.appendChild(SVG.polygon(points, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

    const markerSize = 20;
    svg.appendChild(SVG.line(points[0][0] + markerSize, points[0][1], points[0][0] + markerSize, points[0][1] - markerSize, CONFIG.colors.accent, 2));
    svg.appendChild(SVG.line(points[0][0] + markerSize, points[0][1] - markerSize, points[0][0], points[0][1] - markerSize, CONFIG.colors.accent, 2));

    if (labels) {
      svg.appendChild(SVG.text(points[0][0] - 15, points[0][1] - 5, 'A', '12px Arial'));
      svg.appendChild(SVG.text(points[1][0] + 5, points[1][1] - 5, 'B', '12px Arial'));
      svg.appendChild(SVG.text(points[2][0] - 15, points[2][1] + 5, 'C', '12px Arial'));
      
      svg.appendChild(SVG.text(startX + a * scale / 2, startY - 20, `${a} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX - 30, startY - b * scale / 2, `${b} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX + a * scale / 2 + 15, startY - b * scale / 2 - 10, `${cValue.toFixed(1)} cm`, '11px Arial', CONFIG.colors.accent));
    }

    return svg;
  });

  // 5. RECHTWINKLIG PRÜFEN (AUS POOL.JS)
  registerDiagram('rechtwinklig_pruefen', (params, opts) => {
    const { a = 5, b = 6, c = 7, labels = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const points = [
      [70, size.height - 50],
      [70 + a * 12, size.height - 50],
      [70 + (a * 12) / 2, size.height - 50 - b * 10]
    ];

    svg.appendChild(SVG.polygon(points, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 2));

    if (labels) {
      svg.appendChild(SVG.text(points[0][0] - 20, points[0][1] - 5, 'A', '14px Arial'));
      svg.appendChild(SVG.text(points[1][0] + 10, points[1][1] - 5, 'B', '14px Arial'));
      svg.appendChild(SVG.text(points[2][0] - 5, points[2][1] - 15, 'C', '14px Arial'));
      
      const a2 = a*a, b2 = b*b, c2 = c*c;
      const isRight = Math.abs(a2 + b2 - c2) < 0.1;
      svg.appendChild(SVG.text(size.width/2, 40, `Prüfung: ${isRight ? '✓ rechtwinklig' : '✗ nicht rechtwinklig'}`, '14px Arial', isRight ? CONFIG.colors.secondary : CONFIG.colors.accent, 'middle'));
    }

    return svg;
  });

  // 6. WINKEL BERECHNEN DREIECK (AUS POOL.JS)
  registerDiagram('winkel_berechnen_dreieck', (params, opts) => {
    const { angleA = 50, angleB = 60, angleC = 70, labels = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const points = [
      [70, size.height - 50],
      [70 + 80, size.height - 50],
      [70 + 40, size.height - 50 - 70]
    ];

    svg.appendChild(SVG.polygon(points, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

    if (labels) {
      svg.appendChild(SVG.text(points[0][0] - 20, points[0][1] - 5, `A (${angleA}°)`, '12px Arial'));
      svg.appendChild(SVG.text(points[1][0] + 10, points[1][1] - 5, `B (${angleB}°)`, '12px Arial'));
      svg.appendChild(SVG.text(points[2][0] - 5, points[2][1] - 15, `C (${angleC}°)`, '12px Arial'));
      
      svg.appendChild(SVG.text(size.width/2, 40, `Winkelsumme: ${angleA + angleB + angleC}° (soll 180°)`, '14px Arial', CONFIG.colors.accent, 'middle'));
    }

    return svg;
  });

  // 7. ZUSAMMENGESETZTE FLÄCHE L-FORM (AUS POOL.JS)
  registerDiagram('zusammengesetzte_flaeche_lform', (params, opts) => {
    const { w1 = 8, h1 = 12, w2 = 5, h2 = 6, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min(8, (size.width - 100) / Math.max(w1, w2));
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const startX = 50;
    const startY = 50;

    svg.appendChild(SVG.rect(startX, startY + h1 * scale, w1 * scale, h2 * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));
    svg.appendChild(SVG.rect(startX, startY, w2 * scale, h1 * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

    if (dimensions) {
      svg.appendChild(SVG.text(startX + w1 * scale/2 - 15, startY + h1 * scale + 25, `${w1} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX - 35, startY + h1 * scale/2, `${h1} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX + w2 * scale/2 - 15, startY - 10, `${w2} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX + w1 * scale + 10, startY + h1 * scale + h2 * scale/2, `${h2} cm`, '11px Arial'));
      
      const totalArea = w1 * h1 + w2 * h2;
      svg.appendChild(SVG.text(size.width/2, size.height - 20, `Gesamtfläche: ${totalArea} cm²`, '12px Arial', CONFIG.colors.accent, 'middle'));
    }

    return svg;
  });

  // 8. QUADER NETZ ERGÄNZEN (AUS POOL.JS)
  registerDiagram('quader_netz_ergaenzen', (params, opts) => {
    const { a = 5, b = 3, c = 2, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min(15, (size.width - 100) / (a + b + 10));
    
    const svg = SVG.create(size.width, size.height, forPrint);
    const startX = 70;
    const startY = 50;

    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    svg.appendChild(SVG.rect(startX, startY + a * scale, b * scale, a * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 1.5));
    svg.appendChild(SVG.rect(startX + b * scale + 10, startY, b * scale, a * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 1.5));
    svg.appendChild(SVG.rect(startX - b * scale - 10, startY + a * scale, b * scale, c * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 1.5));
    svg.appendChild(SVG.rect(startX + b * scale, startY + a * scale, b * scale, c * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 1.5));
    svg.appendChild(SVG.rect(startX + 2 * b * scale + 10, startY + a * scale, b * scale, c * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 1.5));

    svg.appendChild(SVG.rect(startX + b * scale, startY + a * scale + c * scale + 5, b * scale, a * scale, CONFIG.colors.lightRed, CONFIG.colors.accent, 2));

    if (dimensions) {
      svg.appendChild(SVG.text(20, size.height - 50, `Maße: ${a} × ${b} × ${c} cm`, '12px Arial'));
      svg.appendChild(SVG.text(20, size.height - 30, 'Rot: fehlende Seite ergänzen', '11px Arial', CONFIG.colors.accent));
    }

    return svg;
  });

  // 9. PRISMA NETZ (AUS POOL.JS)
  registerDiagram('prisma_netz', (params, opts) => {
    const { base1 = 4, base2 = 5, base3 = 6, height = 7, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));
    svg.appendChild(SVG.text(size.width/2, 40, 'Prisma-Netz', '16px Arial', CONFIG.colors.primary, 'middle'));

    const trianglePoints = [
      [size.width/2 - 50, size.height/2 + 30],
      [size.width/2 + 50, size.height/2 + 30],
      [size.width/2, size.height/2 - 30]
    ];
    svg.appendChild(SVG.polygon(trianglePoints, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

    svg.appendChild(SVG.rect(size.width/2 + 60, size.height/2 - 20, 80, 40, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 1.5));
    svg.appendChild(SVG.rect(size.width/2 - 140, size.height/2 - 20, 80, 40, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 1.5));
    svg.appendChild(SVG.rect(size.width/2 - 40, size.height/2 + 40, 80, 40, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 1.5));

    if (dimensions) {
      svg.appendChild(SVG.text(size.width/2, size.height - 60, `Seiten: ${base1}, ${base2}, ${base3} cm · Höhe: ${height} cm`, '11px Arial', CONFIG.colors.text, 'middle'));
    }

    return svg;
  });

  // 10. ZYLINDER OBERFLÄCHE SKIZZE (AUS POOL.JS)
  registerDiagram('zylinder_oberflaeche_skizze', (params, opts) => {
    const { r = 4, h = 8, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const radius = r * (size.width / 50);
    const centerX = size.width / 2;
    const topY = size.height / 3;
    const bottomY = size.height * 2/3;

    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    svg.appendChild(SVG.ellipse(centerX, topY, radius, radius/3, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));
    svg.appendChild(SVG.ellipse(centerX, bottomY, radius, radius/3, '#bbdefb', CONFIG.colors.primary, 2));

    svg.appendChild(SVG.line(centerX - radius, topY + radius/3, centerX - radius, bottomY - radius/3, CONFIG.colors.primary, 2));
    svg.appendChild(SVG.line(centerX + radius, topY + radius/3, centerX + radius, bottomY - radius/3, CONFIG.colors.primary, 2));

    if (dimensions) {
      svg.appendChild(SVG.text(centerX - radius - 20, bottomY, `r = ${r} cm`, '11px Arial'));
      svg.appendChild(SVG.text(centerX + radius + 10, (topY + bottomY)/2, `h = ${h} cm`, '11px Arial'));
      
      const surface = 2 * 3.14 * r * r + 2 * 3.14 * r * h;
      svg.appendChild(SVG.text(size.width/2, size.height - 20, `Oberfläche ≈ ${surface.toFixed(0)} cm²`, '11px Arial', CONFIG.colors.accent, 'middle'));
    }

    return svg;
  });

  // 11. WERKSTÜCK VOLUMEN (AUS POOL.JS)
  registerDiagram('werkstueck_volumen', (params, opts) => {
    const { a = 6, b = 4, c = 3, d = 2, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min(8, (size.width - 100) / Math.max(a, d));

    const svg = SVG.create(size.width, size.height, forPrint);
    const startX = 70;
    const startY = size.height - 100;

    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    svg.appendChild(SVG.rect(startX, startY - c * scale, a * scale, c * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));
    svg.appendChild(SVG.rect(startX, startY, a * scale, b * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

    const cubeX = startX + (a * scale) / 2 - (d * scale) / 2;
    const cubeY = startY - c * scale - d * scale;
    svg.appendChild(SVG.rect(cubeX, cubeY, d * scale, d * scale, CONFIG.colors.lightOrange, CONFIG.colors.warning, 2));

    if (dimensions) {
      svg.appendChild(SVG.text(20, size.height - 40, `Quader: ${a}×${b}×${c} cm`, '11px Arial'));
      svg.appendChild(SVG.text(20, size.height - 20, `Würfel: ${d} cm`, '11px Arial', CONFIG.colors.warning));
      
      const volume = a * b * c + d * d * d;
      svg.appendChild(SVG.text(size.width/2, 40, `Gesamtvolumen: ${volume} cm³`, '12px Arial', CONFIG.colors.accent, 'middle'));
    }

    return svg;
  });

  // 12. TRANSPORT KARTONS LADERAUM (AUS POOL.JS)
  registerDiagram('transport_kartons_laderaum', (params, opts) => {
    const { truckL = 210, truckB = 125, boxL = 40, boxB = 30, grid = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    const startX = 50;
    const startY = 50;
    const width = size.width - 100;
    const height = size.height - 120;

    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));
    svg.appendChild(SVG.rect(startX, startY, width, height, '#fff', CONFIG.colors.primary, 2));

    if (grid) {
      const cols = Math.min(5, Math.floor(truckL / boxL));
      const rows = Math.min(4, Math.floor(truckB / boxB));
      const boxWidth = (boxL / truckL) * width;
      const boxHeight = (boxB / truckB) * height;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          svg.appendChild(SVG.rect(
            startX + i * boxWidth + 2,
            startY + j * boxHeight + 2,
            boxWidth - 4,
            boxHeight - 4,
            'transparent',
            '#aaa',
            1
          ));
        }
      }
    }

    const maxBoxes = Math.floor(truckL / boxL) * Math.floor(truckB / boxB);
    svg.appendChild(SVG.text(size.width/2, size.height - 40, 
      `Laderaum: ${truckL}×${truckB} cm · Kartons: ${boxL}×${boxB} cm · Max: ${maxBoxes}`, 
      '11px Arial', CONFIG.colors.text, 'middle'));

    return svg;
  });

  // 13. RAMPE VOLUMEN (AUS POOL.JS)
  registerDiagram('rampe_volumen', (params, opts) => {
    const { baseL = 50, baseH = 20, topL = 25, width = 30, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min(3, (size.width - 100) / baseL);
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const startX = 50;
    const startY = size.height - 50;
    const points = [
      [startX, startY],
      [startX + baseL * scale, startY],
      [startX + (baseL - topL) * scale + topL * scale, startY - baseH * scale],
      [startX + (baseL - topL) * scale, startY - baseH * scale]
    ];

    svg.appendChild(SVG.polygon(points, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 2));

    if (dimensions) {
      const volume = ((baseL + topL) * baseH / 2 * width);
      svg.appendChild(SVG.text(size.width/2, 50, 
        `Volumen = ${volume.toFixed(0)} cm³`, 
        '12px Arial', CONFIG.colors.accent, 'middle'));
      svg.appendChild(SVG.text(size.width/2, 70, 
        `Breite: ${width} cm`, 
        '11px Arial', CONFIG.colors.text, 'middle'));
    }

    return svg;
  });

  // 14. WEITERE STANDARD-DIAGRAMME
  registerDiagram('dreieck_allgemein', (params, opts) => {
    const { a = 5, b = 6, c = 7, labels = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const points = [
      [70, size.height - 50],
      [70 + a * 12, size.height - 50],
      [70 + (a * 12) / 2, size.height - 50 - b * 10]
    ];

    svg.appendChild(SVG.polygon(points, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 2));

    if (labels) {
      svg.appendChild(SVG.text(points[0][0] - 20, points[0][1] - 5, 'A', '14px Arial'));
      svg.appendChild(SVG.text(points[1][0] + 10, points[1][1] - 5, 'B', '14px Arial'));
      svg.appendChild(SVG.text(points[2][0] - 5, points[2][1] - 15, 'C', '14px Arial'));
    }

    return svg;
  });

  registerDiagram('lform', (params, opts) => {
    const { w1 = 8, h1 = 12, w2 = 5, h2 = 6, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min(8, (size.width - 100) / Math.max(w1, w2));
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const startX = 50;
    const startY = 50;

    svg.appendChild(SVG.rect(startX, startY + h1 * scale, w1 * scale, h2 * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));
    svg.appendChild(SVG.rect(startX, startY, w2 * scale, h1 * scale, CONFIG.colors.lightBlue, CONFIG.colors.primary, 2));

    if (dimensions) {
      svg.appendChild(SVG.text(startX + w1 * scale/2 - 15, startY + h1 * scale + 25, `${w1} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX - 35, startY + h1 * scale/2, `${h1} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX + w2 * scale/2 - 15, startY - 10, `${w2} cm`, '11px Arial'));
      svg.appendChild(SVG.text(startX + w1 * scale + 10, startY + h1 * scale + h2 * scale/2, `${h2} cm`, '11px Arial'));
    }

    return svg;
  });

  registerDiagram('laderaum', (params, opts) => {
    const { truckL = 210, truckB = 125, boxL = 40, boxB = 30, grid = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    const startX = 50;
    const startY = 50;
    const width = size.width - 100;
    const height = size.height - 120;

    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));
    svg.appendChild(SVG.rect(startX, startY, width, height, '#fff', CONFIG.colors.primary, 2));

    if (grid) {
      const cols = Math.min(5, Math.floor(truckL / boxL));
      const rows = Math.min(4, Math.floor(truckB / boxB));
      const boxWidth = (boxL / truckL) * width;
      const boxHeight = (boxB / truckB) * height;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          svg.appendChild(SVG.rect(
            startX + i * boxWidth + 2,
            startY + j * boxHeight + 2,
            boxWidth - 4,
            boxHeight - 4,
            'transparent',
            '#aaa',
            1
          ));
        }
      }
    }

    svg.appendChild(SVG.text(size.width/2, size.height - 40, 
      `Laderaum: ${truckL}×${truckB} cm · Kartons: ${boxL}×${boxB} cm`, 
      '12px Arial', CONFIG.colors.text, 'middle'));

    return svg;
  });

  registerDiagram('rampe', (params, opts) => {
    const { baseL = 50, baseH = 20, topL = 25, width = 30, dimensions = true } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const scale = Math.min(3, (size.width - 100) / baseL);
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const startX = 50;
    const startY = size.height - 50;
    const points = [
      [startX, startY],
      [startX + baseL * scale, startY],
      [startX + (baseL - topL) * scale + topL * scale, startY - baseH * scale],
      [startX + (baseL - topL) * scale, startY - baseH * scale]
    ];

    svg.appendChild(SVG.polygon(points, CONFIG.colors.lightGreen, CONFIG.colors.secondary, 2));

    if (dimensions) {
      const volume = ((baseL + topL) * baseH / 2 * width);
      svg.appendChild(SVG.text(size.width/2, 70, 
        `Volumen = ${volume.toFixed(0)} cm³ · Breite: ${width} cm`, 
        '12px Arial', CONFIG.colors.accent, 'middle'));
    }

    return svg;
  });

  registerDiagram('balkendiagramm', (params, opts) => {
    const { data = [45, 30, 60, 25, 50], labels = ['A', 'B', 'C', 'D', 'E'], color = CONFIG.colors.primary } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const padding = 50;
    const width = size.width - 2 * padding;
    const height = size.height - 2 * padding;

    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));
    svg.appendChild(SVG.line(padding, size.height - padding, padding + width, size.height - padding, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.line(padding, size.height - padding, padding, size.height - padding - height, CONFIG.colors.axis, 2));

    const maxVal = Math.max(...data);
    const barWidth = width / data.length - 10;

    data.forEach((val, i) => {
      const barHeight = (val / maxVal) * height;
      const x = padding + i * (barWidth + 10) + 10;
      const y = size.height - padding - barHeight;

      svg.appendChild(SVG.rect(x, y, barWidth, barHeight, color, color, 1));
      svg.appendChild(SVG.text(x + barWidth/2, y - 5, val.toString(), '10px Arial', CONFIG.colors.text, 'middle'));

      if (labels[i]) {
        svg.appendChild(SVG.text(x + barWidth/2, size.height - padding + 15, labels[i], '11px Arial', CONFIG.colors.text, 'middle'));
      }
    });

    return svg;
  });

  registerDiagram('kreisdiagramm', (params, opts) => {
    const { data = [30, 20, 25, 15, 10], labels = [], colors = ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'] } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    const centerX = size.width / 3;
    const centerY = size.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    data.forEach((val, i) => {
      const angle = (val / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;

      const x1 = centerX + radius * Math.sin(startAngle);
      const y1 = centerY - radius * Math.cos(startAngle);
      const x2 = centerX + radius * Math.sin(endAngle);
      const y2 = centerY - radius * Math.cos(endAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');

      svg.appendChild(SVG.path(pathData, colors[i % colors.length], '#fff', 1));

      startAngle = endAngle;
    });

    if (labels.length) {
      labels.slice(0, 5).forEach((label, i) => {
        const y = size.height/2 - 50 + i * 20;
        svg.appendChild(SVG.rect(size.width - 100, y, 15, 10, colors[i % colors.length], colors[i % colors.length], 0));
        svg.appendChild(SVG.text(size.width - 80, y + 10, label, '10px Arial', CONFIG.colors.text));
      });
    }

    return svg;
  });

  registerDiagram('zahlengerade', (params, opts) => {
    const { from = -5, to = 10, marks = [-3, 0, 2, 5, 8], labels = [] } = params;
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    
    const svg = SVG.create(size.width, size.height, forPrint);
    const startX = 50;
    const endX = size.width - 50;
    const y = size.height / 2;

    svg.appendChild(SVG.rect(0, 0, size.width, size.height, CONFIG.colors.background, '#ddd', 1));

    svg.appendChild(SVG.line(startX, y, endX, y, CONFIG.colors.axis, 2));

    svg.appendChild(SVG.line(endX, y, endX - 10, y - 5, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.line(endX, y, endX - 10, y + 5, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.line(startX, y, startX + 10, y - 5, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.line(startX, y, startX + 10, y + 5, CONFIG.colors.axis, 2));

    const range = to - from;
    marks.forEach((mark, i) => {
      if (mark >= from && mark <= to) {
        const x = startX + ((mark - from) / range) * (endX - startX);
        svg.appendChild(SVG.line(x, y - 5, x, y + 5, CONFIG.colors.axis, 2));

        const label = labels[i] !== undefined ? labels[i] : mark.toString();
        svg.appendChild(SVG.text(x - 8, y - 15, label, '11px Arial', CONFIG.colors.text));
      }
    });

    return svg;
  });

  registerDiagram('tabelle', (params, opts) => {
    const { headers = [], rows = [], caption = '' } = params;

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.margin = '10px 0';
    table.style.border = '1px solid #ddd';

    if (caption) {
      const cap = document.createElement('caption');
      cap.textContent = caption;
      cap.style.fontWeight = 'bold';
      cap.style.marginBottom = '8px';
      cap.style.padding = '8px';
      table.appendChild(cap);
    }

    if (headers.length) {
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.border = '1px solid #ddd';
        th.style.padding = '8px';
        th.style.backgroundColor = CONFIG.colors.primary;
        th.style.color = 'white';
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);
    }

    if (rows.length) {
      const tbody = document.createElement('tbody');
      rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          td.style.border = '1px solid #ddd';
          td.style.padding = '8px';
          td.style.textAlign = 'center';
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
    }

    const wrapper = document.createElement('div');
    wrapper.appendChild(table);
    return wrapper.firstChild;
  });

  /* =========================================================
     ERWEITERUNG: Diagrammtypen aus pool_113.js (Note 2–1 / 11.3 / 12.2)
     (Abwärtskompatibel – ergänzt nur neue Typen)
  ========================================================= */

  registerDiagram('holztisch', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const d = Number(params.diameter ?? 100);
    const t = Number(params.thickness ?? 3);
    const h = Number(params.height ?? 75);
    const legD = Number(params.legDiameter ?? 6);
    const legOffset = Number(params.legOffset ?? 30);

    const cx = size.width / 2;
    const topY = 70;
    const rx = Math.min(160, size.width * 0.38);
    const ry = Math.min(38, size.height * 0.10);

    svg.appendChild(SVG.ellipse(cx, topY, rx, ry, CONFIG.colors.lightOrange, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.ellipse(cx, topY + 18, rx, ry, "rgba(0,0,0,0.03)", CONFIG.colors.axis, 1));

    const legY = topY + 35;
    const legH = Math.min(170, size.height * 0.55);
    const legW = 14;

    const legXs = [
      cx - legOffset,
      cx + legOffset,
      cx - legOffset + 40,
      cx + legOffset - 40
    ];

    legXs.forEach(x => {
      svg.appendChild(SVG.rect(x - legW/2, legY, legW, legH, CONFIG.colors.secondary, CONFIG.colors.axis, 1));
    });

    svg.appendChild(SVG.text(cx, 20, `Holztisch (Skizze)`, CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text(15, size.height - 12, `Ø Platte: ${d} cm | Dicke: ${t} cm | Bein: Ø ${legD} cm, h=${h} cm`, CONFIG.colors.text, 12, "start"));

    return svg;
  });

  registerDiagram('skateboardrampe', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const baseL = Number(params.baseL ?? 180);
    const topL  = Number(params.topL  ?? 60);
    const baseH = Number(params.baseH ?? 40);

    const x0 = 70, y0 = size.height - 70;
    const x1 = size.width - 70;
    const yTop = 90;

    const p = [
      [x0, y0],
      [x1, y0],
      [x1 - 80, yTop + 40],
      [x0 + 60, yTop + 40]
    ];

    svg.appendChild(SVG.polygon(p, CONFIG.colors.lightBlue, CONFIG.colors.axis, 2));

    svg.appendChild(SVG.text(size.width/2, 24, "Skateboardrampe (Trapez-Prisma) – Skizze", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text(x0, y0 + 24, `unten: ${baseL} cm`, CONFIG.colors.text, 12, "start"));
    svg.appendChild(SVG.text(x0 + 60, yTop + 32, `oben: ${topL} cm`, CONFIG.colors.text, 12, "start"));
    svg.appendChild(SVG.text(x1 - 80, (y0+yTop)/2, `H: ${baseH} cm`, CONFIG.colors.text, 12, "start"));

    return svg;
  });

  registerDiagram('weideland_viereck', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const a = Number(params.a ?? 50), b = Number(params.b ?? 40), c = Number(params.c ?? 50), d = Number(params.d ?? 40);
    const diag = Number(params.diag ?? 60);

    const p = [
      [90, 90],
      [size.width - 90, 120],
      [size.width - 120, size.height - 90],
      [110, size.height - 120]
    ];

    svg.appendChild(SVG.polygon(p, CONFIG.colors.lightGreen, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.line(p[0][0], p[0][1], p[2][0], p[2][1], CONFIG.colors.accent, 2, "6,4"));

    svg.appendChild(SVG.text(size.width/2, 24, "Weideland (Viereck mit Diagonale) – Skizze", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text(p[0][0]-10, p[0][1]-8, `a=${a}m`, CONFIG.colors.text, 12, "end"));
    svg.appendChild(SVG.text(p[1][0]+10, p[1][1]-8, `b=${b}m`, CONFIG.colors.text, 12, "start"));
    svg.appendChild(SVG.text(p[2][0]+10, p[2][1]+18, `c=${c}m`, CONFIG.colors.text, 12, "start"));
    svg.appendChild(SVG.text(p[3][0]-10, p[3][1]+18, `d=${d}m`, CONFIG.colors.text, 12, "end"));
    svg.appendChild(SVG.text((p[0][0]+p[2][0])/2, (p[0][1]+p[2][1])/2 - 10, `diag=${diag}m`, CONFIG.colors.accent, 12, "middle"));

    return svg;
  });

  registerDiagram('flaechenberechnung_garten', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const outerW = Number(params.outerW ?? 25);
    const outerH = Number(params.outerH ?? 20);
    const cutW   = Number(params.cutW ?? 8);
    const cutH   = Number(params.cutH ?? 6);

    const x = 70, y = 70, w = size.width - 140, h = size.height - 160;

    svg.appendChild(SVG.rect(x, y, w, h, CONFIG.colors.lightGreen, CONFIG.colors.axis, 2));

    const cx = x + w*0.55, cy = y + h*0.35;
    const cw = w*0.28, ch = h*0.22;
    svg.appendChild(SVG.rect(cx, cy, cw, ch, CONFIG.colors.lightOrange, CONFIG.colors.axis, 2));

    svg.appendChild(SVG.text(size.width/2, 24, "Garten – Fläche (Skizze)", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text(x, y-10, `Außen: ${outerW}m × ${outerH}m`, CONFIG.colors.text, 12, "start"));
    svg.appendChild(SVG.text(cx, cy-10, `Beet: ${cutW}m × ${cutH}m`, CONFIG.colors.text, 12, "start"));

    return svg;
  });

  registerDiagram('rechte_winkel_argumentation', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const a = Number(params.a ?? 3), b = Number(params.b ?? 4), c = Number(params.c ?? 5);

    const pA = [110, size.height - 90];
    const pB = [size.width - 130, size.height - 90];
    const pC = [110, 110];

    svg.appendChild(SVG.polygon([pA,pB,pC], CONFIG.colors.lightBlue, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.rect(pA[0], pA[1]-30, 30, 30, "rgba(0,0,0,0)", CONFIG.colors.axis, 2));

    svg.appendChild(SVG.text(size.width/2, 24, "Rechtwinklig? – Argumentation (Skizze)", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text((pA[0]+pB[0])/2, pA[1]+24, `b=${b}`, CONFIG.colors.text, 12, "middle"));
    svg.appendChild(SVG.text(pA[0]-20, (pA[1]+pC[1])/2, `a=${a}`, CONFIG.colors.text, 12, "end"));
    svg.appendChild(SVG.text((pB[0]+pC[0])/2+10, (pB[1]+pC[1])/2, `c=${c}`, CONFIG.colors.text, 12, "start"));

    return svg;
  });

  registerDiagram('dreiseitiges_prisma', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const base = Number(params.base ?? 3);
    const side = Number(params.side ?? 4);
    const height = Number(params.height ?? 10);

    const A = [130, size.height - 110];
    const B = [size.width/2 - 40, size.height - 110];
    const C = [170, 120];

    const dx = 170, dy = -40;
    const A2 = [A[0]+dx, A[1]+dy];
    const B2 = [B[0]+dx, B[1]+dy];
    const C2 = [C[0]+dx, C[1]+dy];

    svg.appendChild(SVG.polygon([A,B,C], CONFIG.colors.lightBlue, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.polygon([A2,B2,C2], "rgba(0,0,0,0.02)", CONFIG.colors.axis, 2));

    svg.appendChild(SVG.line(A[0],A[1],A2[0],A2[1], CONFIG.colors.axis,2));
    svg.appendChild(SVG.line(B[0],B[1],B2[0],B2[1], CONFIG.colors.axis,2));
    svg.appendChild(SVG.line(C[0],C[1],C2[0],C2[1], CONFIG.colors.axis,2));

    svg.appendChild(SVG.text(size.width/2, 24, "Dreiseitiges Prisma – Skizze", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text((A[0]+B[0])/2, A[1]+24, `g=${base} cm`, CONFIG.colors.text, 12, "middle"));
    svg.appendChild(SVG.text(A[0]-10, (A[1]+C[1])/2, `h≈${side} cm`, CONFIG.colors.text, 12, "end"));
    svg.appendChild(SVG.text(size.width-120, size.height-30, `Prisma-Länge: ${height} cm`, CONFIG.colors.text, 12, "end"));

    return svg;
  });

  registerDiagram('zelt_prisma', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const g = Number(params.g ?? 3);
    const h = Number(params.h ?? 2);
    const length = Number(params.length ?? 4);

    const A = [130, size.height - 110];
    const B = [size.width/2 - 40, size.height - 110];
    const C = [180, 120];

    const dx = 180, dy = -35;
    const A2 = [A[0]+dx, A[1]+dy];
    const B2 = [B[0]+dx, B[1]+dy];
    const C2 = [C[0]+dx, C[1]+dy];

    svg.appendChild(SVG.polygon([A,B,C], CONFIG.colors.lightOrange, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.polygon([A2,B2,C2], "rgba(255,152,0,0.08)", CONFIG.colors.axis, 2));

    svg.appendChild(SVG.line(A[0],A[1],A2[0],A2[1], CONFIG.colors.axis,2));
    svg.appendChild(SVG.line(B[0],B[1],B2[0],B2[1], CONFIG.colors.axis,2));
    svg.appendChild(SVG.line(C[0],C[1],C2[0],C2[1], CONFIG.colors.axis,2));

    svg.appendChild(SVG.text(size.width/2, 24, "Zelt (Dreiecksprisma) – Skizze", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text((A[0]+B[0])/2, A[1]+24, `g=${g} m`, CONFIG.colors.text, 12, "middle"));
    svg.appendChild(SVG.text(A[0]-10, (A[1]+C[1])/2, `h=${h} m`, CONFIG.colors.text, 12, "end"));
    svg.appendChild(SVG.text(size.width-120, size.height-30, `Länge=${length} m`, CONFIG.colors.text, 12, "end"));

    return svg;
  });

  registerDiagram('dachgeschoss_prisma', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const width = Number(params.width ?? 10);
    const roofHeight = Number(params.roofHeight ?? 4);
    const prismDepth = Number(params.prismDepth ?? 8);

    const baseY = size.height - 90;
    const leftX = 130, rightX = size.width/2 + 60;
    const midX = (leftX + rightX) / 2;
    const roofY = 120;

    const tri = [[leftX, baseY], [rightX, baseY], [midX, roofY]];
    const dx = 180, dy = -40;
    const tri2 = tri.map(([x,y]) => [x+dx, y+dy]);

    svg.appendChild(SVG.polygon(tri, CONFIG.colors.lightBlue, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.polygon(tri2, "rgba(0,0,0,0.02)", CONFIG.colors.axis, 2));

    for (let i=0;i<3;i++){
      svg.appendChild(SVG.line(tri[i][0], tri[i][1], tri2[i][0], tri2[i][1], CONFIG.colors.axis, 2));
    }

    svg.appendChild(SVG.text(size.width/2, 24, "Dachgeschoss (Prisma) – Skizze", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text((leftX+rightX)/2, baseY+24, `Breite=${width} m`, CONFIG.colors.text, 12, "middle"));
    svg.appendChild(SVG.text(midX-10, (baseY+roofY)/2, `H=${roofHeight} m`, CONFIG.colors.text, 12, "end"));
    svg.appendChild(SVG.text(size.width-120, size.height-30, `Tiefe=${prismDepth} m`, CONFIG.colors.text, 12, "end"));

    return svg;
  });

  registerDiagram('keksverpackung', (params = {}, opts = {}) => {
    const forPrint = !!opts.forPrint;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const svg = SVG.create(size.width, size.height, forPrint);

    const a = Number(params.a ?? 6);
    const b = Number(params.b ?? 7);

    const A = [140, size.height - 110];
    const B = [size.width/2 - 60, size.height - 110];
    const C = [200, 140];

    const dx = 170, dy = -35;
    const A2 = [A[0]+dx, A[1]+dy];
    const B2 = [B[0]+dx, B[1]+dy];
    const C2 = [C[0]+dx, C[1]+dy];

    svg.appendChild(SVG.polygon([A,B,C], CONFIG.colors.lightGreen, CONFIG.colors.axis, 2));
    svg.appendChild(SVG.polygon([A2,B2,C2], "rgba(0,0,0,0.02)", CONFIG.colors.axis, 2));
    svg.appendChild(SVG.line(A[0],A[1],A2[0],A2[1], CONFIG.colors.axis,2));
    svg.appendChild(SVG.line(B[0],B[1],B2[0],B2[1], CONFIG.colors.axis,2));
    svg.appendChild(SVG.line(C[0],C[1],C2[0],C2[1], CONFIG.colors.axis,2));

    svg.appendChild(SVG.text(size.width/2, 24, "Keksverpackung (Prisma) – Skizze", CONFIG.colors.text, 14, "middle"));
    svg.appendChild(SVG.text((A[0]+B[0])/2, A[1]+24, `Seiten: a≈${a} cm, b≈${b} cm`, CONFIG.colors.text, 12, "middle"));

    return svg;
  });


  registerDiagram('placeholder', (params, opts) => {
    const forPrint = opts?.forPrint || false;
    const size = forPrint ? CONFIG.sizes.print : CONFIG.sizes.screen;
    const message = params?.message || 'Diagramm nicht verfügbar';
    
    const svg = SVG.create(size.width, size.height, forPrint);
    svg.appendChild(SVG.rect(0, 0, size.width, size.height, '#f5f5f5', '#ccc', 1));
    svg.appendChild(SVG.text(size.width/2, size.height/2 - 10, '📊', '24px Arial', '#999', 'middle'));
    svg.appendChild(SVG.text(size.width/2, size.height/2 + 20, message, '12px Arial', '#999', 'middle'));
    
    return svg;
  });

  /* =========================================================
     HILFSFUNKTIONEN
  ========================================================= */
  const renderDiagramHelpers = {
    getRenderer: (type) => DiagramRegistry.get(type) || DiagramRegistry.get('placeholder'),
    listRegisteredTypes: () => Array.from(DiagramRegistry.keys()),
    validate: validateDiagramData,
    scaler: Scaler,
    svg: SVG,
    config: CONFIG
  };

  /* =========================================================
     GLOBALE EXPORTE
  ========================================================= */
  if (typeof window !== "undefined") {
    window.renderDiagram = renderDiagram;
    window.DiagramRegistry = DiagramRegistry;
    window.__diagramHelpers = renderDiagramHelpers;
    
    window.renderDiagramForPrint = (diagramData, container) => {
      return renderDiagram(diagramData, container, { forPrint: true });
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      renderDiagram,
      DiagramRegistry,
      helpers: renderDiagramHelpers
    };
  }

  if (typeof window !== "undefined" && window.location.search.includes('debug')) {
    console.log('✅ diagramRenderer.js geladen mit Typen:', renderDiagramHelpers.listRegisteredTypes());
    if (typeof STATIC_DIAGRAMS !== "undefined") {
      console.log('✅ STATIC_DIAGRAMS gefunden mit Typen:', Object.keys(STATIC_DIAGRAMS));
    }
  }

})();
