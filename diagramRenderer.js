/* =========================================================
   diagramRenderer.js  (PRODUKTIONSVERSION)
   - Hybrid: statisch + dynamisch
   - SVG-only (perfekt für Print/PDF)
   - Cache mit stable stringify
   - Unterstützt ALLE 21 Diagrammtypen aus deiner Liste
========================================================= */

/* global STATIC_DIAGRAMS, STATIC_ALIASES */

const DiagramCache = new Map();

/* -------------------------
   Stable Stringify (für Cache-Key)
------------------------- */
function stableStringify(obj) {
  const seen = new WeakSet();
  const sorter = (x) => {
    if (x === null || typeof x !== "object") return x;
    if (seen.has(x)) return "[Circular]";
    seen.add(x);
    if (Array.isArray(x)) return x.map(sorter);
    const keys = Object.keys(x).sort();
    const out = {};
    for (const k of keys) out[k] = sorter(x[k]);
    return out;
  };
  return JSON.stringify(sorter(obj));
}

/* -------------------------
   SVG Helpers
------------------------- */
function svgWrap(inner, w = 360, h = 240, viewBox = null) {
  const vb = viewBox || `0 0 ${w} ${h}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb}">${inner}</svg>`;
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function line(x1,y1,x2,y2, opt={}) {
  const { stroke="black", strokeWidth=2, dash=null } = opt;
  const dashAttr = dash ? ` stroke-dasharray="${dash}"` : "";
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"${dashAttr}/>`;
}

function rect(x,y,w,h,opt={}) {
  const { stroke="black", strokeWidth=2, fill="none", dash=null, rx=0 } = opt;
  const dashAttr = dash ? ` stroke-dasharray="${dash}"` : "";
  const rxAttr = rx ? ` rx="${rx}" ry="${rx}"` : "";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${dashAttr}${rxAttr}/>`;
}

function poly(points,opt={}) {
  const { stroke="black", strokeWidth=2, fill="none" } = opt;
  const p = points.map(pt => pt.join(",")).join(" ");
  return `<polygon points="${p}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function text(x,y,t,opt={}) {
  const { size=12, anchor="start" } = opt;
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${esc(t)}</text>`;
}

function rightAngleMarker(x,y, size=14) {
  // kleines L am Punkt (x,y)
  return `<path d="M${x} ${y} l${size} 0 l0 ${size}" fill="none" stroke="black" stroke-width="2"/>`;
}

/* -------------------------
   Render Entry
   diagram Objekt (Standard):
   {
     type: "dreieck_pythagoras",
     dynamic: true/false,
     params: {...}
   }
------------------------- */
function renderDiagram(diagram, container, opts = {}) {
  const wrap = document.createElement("div");
  wrap.className = opts.className || "diagram";

  // Alias-Auflösung
  const resolvedType = (STATIC_ALIASES && STATIC_ALIASES[diagram.type]) || diagram.type;

  // statisch?
  if (diagram.dynamic === false || STATIC_DIAGRAMS[resolvedType]) {
    const svg = STATIC_DIAGRAMS[resolvedType] || STATIC_DIAGRAMS[diagram.type];
    wrap.innerHTML = svg || `<div style="color:#a00">[Fehlendes statisches Diagramm: ${esc(diagram.type)}]</div>`;
    container.appendChild(wrap);
    return;
  }

  // dynamisch -> Cache
  const cacheKey = `${resolvedType}::${stableStringify(diagram.params || {})}`;
  if (DiagramCache.has(cacheKey)) {
    wrap.innerHTML = DiagramCache.get(cacheKey);
    container.appendChild(wrap);
    return;
  }

  const svg = generateDynamicDiagram(resolvedType, diagram.params || {});
  DiagramCache.set(cacheKey, svg);
  wrap.innerHTML = svg;
  container.appendChild(wrap);
}

/* =========================================================
   21 Diagrammtypen (1:1 zu deiner Liste)
========================================================= */

function generateDynamicDiagram(type, p) {
  switch (type) {

    // 1) flaeche_dreieck_koordinaten
    case "flaeche_dreieck_koordinaten":
      return drawCoordinateShape({
        points: p.points || [[2,3],[6,3],[4,7]],
        labels: p.labels || ["A","B","C"],
        title: "Koordinatensystem: Dreieck"
      });

    // 2) viereck_koordinaten
    case "viereck_koordinaten":
      return drawCoordinateShape({
        points: p.points || [[-2,4],[3,4],[4,1],[-1,0]],
        labels: p.labels || ["A","B","C","D"],
        title: "Koordinatensystem: Viereck"
      });

    // 3) dreieck_pythagoras
    case "dreieck_pythagoras":
      return drawRightTriangle({
        a: p.a ?? 6,
        b: p.b ?? 8,
        c: p.c ?? null,
        showRightAngle: true,
        showLabels: true,
        title: "Rechtwinkliges Dreieck"
      });

    // 4) rechtwinklig_pruefen (3 Seitenlängen)
    case "rechtwinklig_pruefen":
      return drawTriangleBySides({
        a: p.a ?? 6,
        b: p.b ?? 8,
        c: p.c ?? 10,
        title: "Dreieck (Seitenlängen gegeben)"
      });

    // 5) winkel_berechnen_dreieck
    case "winkel_berechnen_dreieck":
      return drawAngleTriangle({
        angleA: p.angleA ?? 52,
        angleB: p.angleB ?? null,
        angleC: p.angleC ?? null,
        title: "Dreieck mit Winkeln"
      });

    // 6) zusammengesetzte_flaeche_lform
    case "zusammengesetzte_flaeche_lform":
      return drawLShape({
        w1: p.w1 ?? 10, h1: p.h1 ?? 8,
        w2: p.w2 ?? 6,  h2: p.h2 ?? 5,
        title: "L-Form (zusammengesetzte Fläche)"
      });

    // 7) quader_netz_ergaenzen -> statisch (sollte nie hier landen)
    case "quader_netz_ergaenzen":
      return STATIC_DIAGRAMS.quader_netz_ergaenzen;

    // 8) prisma_netz -> statisch
    case "prisma_netz":
      return STATIC_DIAGRAMS.prisma_netz;

    // 9) zylinder_oberflaeche_skizze
    case "zylinder_oberflaeche_skizze":
      return drawCylinder({
        r: p.r ?? 3.7,
        h: p.h ?? 10,
        title: "Zylinder"
      });

    // 10) werkstueck_volumen (zusammengesetzter Körper)
    case "werkstueck_volumen":
      return drawCompositeWorkpiece({
        a: p.a ?? 46, b: p.b ?? 42, c: p.c ?? 24, d: p.d ?? 12,
        title: "Werkstück (zusammengesetzt)"
      });

    // 11) transport_kartons_laderaum
    case "transport_kartons_laderaum":
      return drawTruckPacking({
        truckL: p.truckL ?? 210, truckB: p.truckB ?? 125,
        boxL: p.boxL ?? 40, boxB: p.boxB ?? 40,
        title: "Ladefläche & Kartons (Skizze)"
      });

    // 12) rampe_volumen
    case "rampe_volumen":
      return drawRamp({
        baseL: p.baseL ?? 300,
        baseH: p.baseH ?? 120,
        topL:  p.topL  ?? 80,
        title: "Rampe (Quader + Dreieck)"
      });

    // 13) dreiseitiges_prisma
    case "dreiseitiges_prisma":
      return drawTriangularPrism({
        base: p.base ?? 8,
        side: p.side ?? 3,
        height: p.height ?? 2.5,
        title: "Dreiseitiges Prisma (Schrägbild)"
      });

    // 14) dachgeschoss_prisma
    case "dachgeschoss_prisma":
      return drawAtticPrism({
        width: p.width ?? 8,
        roofHeight: p.roofHeight ?? 3,
        prismDepth: p.prismDepth ?? 10,
        title: "Dachgeschoss (Prisma)"
      });

    // 15) zelt_prisma -> statisch
    case "zelt_prisma":
      return STATIC_DIAGRAMS.zelt_prisma;

    // 16) keksverpackung
    case "keksverpackung":
      return drawCookiePackage({
        a: p.a ?? 8,
        b: p.b ?? 15,
        title: "Keksverpackung (Skizze)"
      });

    // 17) holztisch
    case "holztisch":
      return drawTableSketch({
        diameter: p.diameter ?? 76,
        thickness: p.thickness ?? 1.5,
        height: p.height ?? 80,
        legOffset: p.legOffset ?? 42,
        title: "Holztisch (Skizze)"
      });

    // 18) skateboardrampe (hochwertige Variante)
    case "skateboardrampe":
      return drawRamp({
        baseL: p.baseL ?? 320,
        baseH: p.baseH ?? 140,
        topL:  p.topL  ?? 90,
        title: "Skateboard-Rampe"
      });

    // 19) weideland_viereck
    case "weideland_viereck":
      return drawWeideland({
        a: p.a ?? 172,
        b: p.b ?? 165,
        c: p.c ?? 180,
        d: p.d ?? 130,
        title: "Weideland (Viereck)"
      });

    // 20) flaechenberechnung_garten
    case "flaechenberechnung_garten":
      return drawGarden({
        outerW: p.outerW ?? 10,
        outerH: p.outerH ?? 8,
        cutW: p.cutW ?? 6,
        cutH: p.cutH ?? 5,
        title: "Garten (Rasen/Beet)"
      });

    // 21) rechte_winkel_argumentation -> statisch
    case "rechte_winkel_argumentation":
      return STATIC_DIAGRAMS.rechte_winkel_argumentation;

    default:
      return svgWrap(text(20,30,`Unbekannter Diagrammtyp: ${type}`,{size:14}), 420, 80);
  }
}

/* =========================================================
   Implementierungen der Diagramm-Generatoren
========================================================= */

function drawCoordinateShape({points, labels, title}) {
  // Koordinatensystem -10..10 (skalierbar)
  const w = 360, h = 280;
  const margin = 40;
  const scale = 10; // 1 Einheit = 10 px
  const cx = w/2, cy = h/2;

  let g = "";
  // Achsen
  g += line(margin, cy, w-margin, cy, {strokeWidth:2});
  g += line(cx, margin, cx, h-margin, {strokeWidth:2});
  // Ticks
  for (let i=-10;i<=10;i+=2) {
    const x = cx + i*scale;
    const y = cy - i*scale;
    g += line(x, cy-4, x, cy+4, {strokeWidth:1});
    g += line(cx-4, y, cx+4, y, {strokeWidth:1});
  }

  // Punkte in SVG-Koordinaten
  const pts = points.map(([x,y]) => [cx + x*scale, cy - y*scale]);

  // Polygon/Polyline
  g += `<polyline points="${pts.map(p=>p.join(",")).join(" ")} ${pts[0].join(",")}" fill="none" stroke="black" stroke-width="2"/>`;

  // Punkte + Labels
  pts.forEach((pt, idx) => {
    g += `<circle cx="${pt[0]}" cy="${pt[1]}" r="4" fill="black"/>`;
    g += text(pt[0]+8, pt[1]-8, labels[idx] || String.fromCharCode(65+idx), {size:12});
  });

  // Titel
  g += text(margin, margin-12, title || "Koordinatensystem", {size:13});

  return svgWrap(g, w, h);
}

function drawRightTriangle({a,b,c, showRightAngle, showLabels, title}) {
  const w=360,h=240;
  const margin=40;
  const scale = 18;

  const A = [margin, h-margin];               // rechter Winkel unten links
  const B = [margin + a*scale, h-margin];     // entlang a
  const C = [margin, h-margin - b*scale];     // entlang b

  let g = "";
  g += line(A[0],A[1],B[0],B[1]);
  g += line(A[0],A[1],C[0],C[1]);
  g += line(C[0],C[1],B[0],B[1]);

  if (showRightAngle) g += rightAngleMarker(A[0], A[1]-14, 14);

  if (showLabels) {
    g += text((A[0]+B[0])/2, A[1]+20, `a=${a}`, {anchor:"middle"});
    g += text(A[0]-15, (A[1]+C[1])/2, `b=${b}`, {anchor:"end"});
    if (c != null) g += text((C[0]+B[0])/2, (C[1]+B[1])/2 - 8, `c=${c}`, {anchor:"middle"});
  }

  g += text(margin, 18, title || "Dreieck", {size:13});

  return svgWrap(g,w,h);
}

function drawTriangleBySides({a,b,c,title}) {
  // Schematisches Dreieck + Beschriftung (nicht maßstabsgerecht)
  const w=360,h=240;
  const A=[60,170], B=[280,170];
  const C=[150,60];

  let g="";
  g+=line(A[0],A[1],B[0],B[1]);
  g+=line(B[0],B[1],C[0],C[1]);
  g+=line(C[0],C[1],A[0],A[1]);

  g+=text((A[0]+B[0])/2, A[1]+20, `c=${c}`, {anchor:"middle"});
  g+=text((B[0]+C[0])/2+10, (B[1]+C[1])/2, `a=${a}`);
  g+=text((A[0]+C[0])/2-10, (A[1]+C[1])/2, `b=${b}`, {anchor:"end"});
  g+=text(40,18,title||"Dreieck (Seiten)",{size:13});

  return svgWrap(g,w,h);
}

function drawAngleTriangle({angleA, angleB, angleC, title}) {
  const w=360,h=240;
  const A=[70,170], B=[290,170], C=[160,60];
  let g="";
  g+=line(A[0],A[1],B[0],B[1]);
  g+=line(B[0],B[1],C[0],C[1]);
  g+=line(C[0],C[1],A[0],A[1]);

  g+=text(A[0]-10,A[1]+18,`α=${angleA}°`,{anchor:"end"});
  if (angleB!=null) g+=text(B[0]+10,B[1]+18,`β=${angleB}°`);
  if (angleC!=null) g+=text(C[0],C[1]-10,`γ=${angleC}°`,{anchor:"middle"});

  g+=text(40,18,title||"Winkel im Dreieck",{size:13});
  return svgWrap(g,w,h);
}

function drawLShape({w1,h1,w2,h2,title}) {
  // Außen-Rechteck w1×h1, Innenausschnitt w2×h2 rechts oben (klassische L-Form)
  const w=360,h=240;
  const x=60,y=40;
  const scale=12;
  const W=w1*scale, H=h1*scale;
  const cutW=w2*scale, cutH=h2*scale;

  let g="";
  // L-Polygon
  const pts = [
    [x, y+H],
    [x+W, y+H],
    [x+W, y+H-cutH],
    [x+W-cutW, y+H-cutH],
    [x+W-cutW, y],
    [x, y]
  ];
  g+=poly(pts,{strokeWidth:2});

  // Maße (schematisch)
  g+=text(x+W/2, y+H+18, `${w1} m`, {anchor:"middle"});
  g+=text(x-10, y+H/2, `${h1} m`, {anchor:"end"});
  g+=text(x+W-cutW/2, y+H-cutH-6, `${w2} m`, {anchor:"middle", size:11});
  g+=text(x+W+10, y+H-cutH/2, `${h2} m`, {size:11});

  g+=text(40,18,title||"L-Form",{size:13});
  return svgWrap(g,w,h);
}

function drawCylinder({r,h,title}) {
  const w=360, H=240;
  const cx=180, topY=60, botY=170;
  const rx=70, ry=22;

  let g="";
  // Ellipsen
  g += `<ellipse cx="${cx}" cy="${topY}" rx="${rx}" ry="${ry}" fill="none" stroke="black" stroke-width="2"/>`;
  g += `<ellipse cx="${cx}" cy="${botY}" rx="${rx}" ry="${ry}" fill="none" stroke="black" stroke-width="2"/>`;
  // Seiten
  g += line(cx-rx, topY, cx-rx, botY);
  g += line(cx+rx, topY, cx+rx, botY);

  // Maße
  g += line(cx+rx+25, topY, cx+rx+25, botY, {strokeWidth:2});
  g += text(cx+rx+30, (topY+botY)/2, `h=${h}`, {size:12});
  g += line(cx, topY, cx+rx, topY, {strokeWidth:2, dash:"6 4"});
  g += text(cx+rx/2, topY-10, `r=${r}`, {anchor:"middle"});

  g += text(40,18,title||"Zylinder",{size:13});
  return svgWrap(g,w,H);
}

function drawCompositeWorkpiece({a,b,c,d,title}) {
  // Schematische Stufenform (quader+prisma-ähnlich) als 2D-Seitenansicht
  const w=420,h=240;
  const x=60,y=60, scale=2;

  const A=a*scale, B=b*scale, C=c*scale, D=d*scale;

  let g="";
  // Stufenprofil
  const pts = [
    [x, y+150],
    [x+A, y+150],
    [x+A, y+150-D],
    [x+C, y+150-D],
    [x+C, y],
    [x, y]
  ];
  g += poly(pts,{strokeWidth:2});

  // Maße
  g += text(x+A/2, y+175, `${a} mm`, {anchor:"middle"});
  g += text(x+C/2, y+150-D-8, `${c} mm`, {anchor:"middle", size:11});
  g += text(x-10, y+75, `${b} mm`, {anchor:"end"});
  g += text(x+A+10, y+150-D/2, `${d} mm`, {size:11});

  g += text(40,18,title||"Werkstück",{size:13});
  return svgWrap(g,w,h);
}

function drawTruckPacking({truckL, truckB, boxL, boxB, title}) {
  // Draufsicht: Ladefläche (truckL x truckB) + Raster mit Boxen
  const w=420,h=260;
  const margin=40;
  const scale=1; // wir skalieren automatisch in die Fläche
  const maxW = w - 2*margin;
  const maxH = h - 2*margin;

  // Ziel: truckL -> maxW, truckB -> maxH
  const s = Math.min(maxW/truckL, maxH/truckB);

  const L = truckL*s;
  const B = truckB*s;

  const x = margin;
  const y = margin;

  let g="";
  g += rect(x,y,L,B,{strokeWidth:2});
  g += text(x, y-10, title||"Ladefläche", {size:13});

  // Anzahl Boxen (ohne Stapeln) – reine Illustration
  const nx = Math.floor(truckL/boxL);
  const ny = Math.floor(truckB/boxB);

  for (let i=0;i<nx;i++){
    for (let j=0;j<ny;j++){
      g += rect(x+i*boxL*s, y+j*boxB*s, boxL*s, boxB*s, {strokeWidth:1});
    }
  }

  g += text(x+L+10, y+15, `${truckL}×${truckB} cm`, {size:11});
  g += text(x+L+10, y+35, `Karton ${boxL}×${boxB} cm`, {size:11});
  g += text(x+L+10, y+55, `Raster: ${nx}×${ny}`, {size:11});

  return svgWrap(g,w,h);
}

function drawRamp({baseL, baseH, topL, title}) {
  // Seitenansicht: Quader (topL) + Dreieck (rest)
  const w=420,h=240;
  const margin=50;
  const maxW = w-2*margin;
  const maxH = h-2*margin;

  const s = Math.min(maxW/baseL, maxH/baseH);
  const L = baseL*s;
  const H = baseH*s;
  const t = Math.max(0, Math.min(topL, baseL))*s;

  const x=margin, y=h-margin;

  let g="";
  // Grundlinie
  g += line(x,y,x+L,y);

  // Rampe: Dreieck + Deckfläche
  // Dreieck: von (x,y) nach (x+L-t,y) nach (x+L-t,y-H)
  g += line(x,y, x+L-t, y);
  g += line(x+L-t, y, x+L-t, y-H);
  g += line(x, y, x+L-t, y-H); // schräge
  // Top-Quader: von (x+L-t,y-H) nach (x+L,y-H) nach (x+L,y)
  g += line(x+L-t, y-H, x+L, y-H);
  g += line(x+L, y-H, x+L, y);

  // Maße
  g += text(x+L/2, y+18, `${baseL}`, {anchor:"middle"});
  g += text(x-10, y-H/2, `${baseH}`, {anchor:"end"});
  g += text(x+L-t/2, y-H-8, `${topL}`, {anchor:"middle", size:11});

  g += text(40,18,title||"Rampe",{size:13});
  return svgWrap(g,w,h);
}

function drawTriangularPrism({base, side, height, title}) {
  // Schrägbild schematisch
  const w=420,h=240;
  const A=[90,160], B=[160,80], C=[230,160];
  const dx=130, dy=25;

  let g="";
  // Vorderdreieck
  g += line(A[0],A[1],B[0],B[1]);
  g += line(B[0],B[1],C[0],C[1]);
  g += line(C[0],C[1],A[0],A[1]);

  // Hinterdreieck
  const A2=[A[0]+dx,A[1]+dy], B2=[B[0]+dx,B[1]+dy], C2=[C[0]+dx,C[1]+dy];
  g += line(A2[0],A2[1],B2[0],B2[1]);
  g += line(B2[0],B2[1],C2[0],C2[1]);
  g += line(C2[0],C2[1],A2[0],A2[1]);

  // Verbinder
  g += line(A[0],A[1],A2[0],A2[1]);
  g += line(B[0],B[1],B2[0],B2[1]);
  g += line(C[0],C[1],C2[0],C2[1]);

  // Labels
  g += text((A[0]+C[0])/2, A[1]+18, `Basis=${base}`, {anchor:"middle"});
  g += text(B[0]-10,(B[1]+A[1])/2, `Seite=${side}`, {anchor:"end", size:11});
  g += text((A2[0]+A[0])/2+10, (A2[1]+A[1])/2, `H=${height}`, {size:11});
  g += text(40,18,title||"Dreiseitiges Prisma",{size:13});

  return svgWrap(g,w,h);
}

function drawAtticPrism({width, roofHeight, prismDepth, title}) {
  // Vorderseite (Dreieck) + Tiefe als Prisma
  const w=420,h=240;
  const baseY=175;
  const leftX=90, rightX=250, topX=170, topY=70;
  const dx=130, dy=25;

  let g="";
  // Vorderdreieck
  g += line(leftX,baseY,rightX,baseY);
  g += line(leftX,baseY,topX,topY);
  g += line(rightX,baseY,topX,topY);

  // Hinterdreieck
  g += line(leftX+dx,baseY+dy,rightX+dx,baseY+dy);
  g += line(leftX+dx,baseY+dy,topX+dx,topY+dy);
  g += line(rightX+dx,baseY+dy,topX+dx,topY+dy);

  // Verbinder
  g += line(leftX,baseY,leftX+dx,baseY+dy);
  g += line(rightX,baseY,rightX+dx,baseY+dy);
  g += line(topX,topY,topX+dx,topY+dy);

  // Labels
  g += text((leftX+rightX)/2, baseY+18, `Breite=${width}`, {anchor:"middle"});
  g += text(topX, topY-10, `H=${roofHeight}`, {anchor:"middle", size:11});
  g += text(leftX+dx/2+5, baseY+dy/2, `Tiefe=${prismDepth}`, {size:11});
  g += text(40,18,title||"Dachgeschoss (Prisma)",{size:13});

  return svgWrap(g,w,h);
}

function drawCookiePackage({a,b,title}) {
  // Schematische Verpackung: Quader + "Keks"-Markierung
  const w=420,h=240;
  const x=90,y=70, dx=120, dy=25, W=140, H=110;

  let g="";
  // Vorderrechteck
  g += rect(x,y,W,H,{strokeWidth:2});
  // Hinterrechteck (schräg)
  g += rect(x+dx,y+dy,W,H,{strokeWidth:2});
  // Verbinder
  g += line(x,y,x+dx,y+dy);
  g += line(x+W,y,x+dx+W,y+dy);
  g += line(x,y+H,x+dx,y+dy+H);
  g += line(x+W,y+H,x+dx+W,y+dy+H);

  // Maße
  g += text(x+W/2,y+H+20,`${b} cm`,{anchor:"middle"});
  g += text(x-10,y+H/2,`${a} cm`,{anchor:"end"});

  g += text(40,18,title||"Keksverpackung",{size:13});
  return svgWrap(g,w,h);
}

function drawTableSketch({diameter, thickness, height, legOffset, title}) {
  // Seitenansicht: Platte (Zylinder) + Beine (Quader)
  const w=420,h=260;
  const baseY=220;

  let g="";
  // Tischplatte
  g += rect(120, baseY-height, 180, 12, {strokeWidth:2});
  g += text(210, baseY-height-10, `d=${diameter} cm`, {anchor:"middle", size:11});
  g += text(310, baseY-height+10, `h=${thickness} cm`, {size:11});

  // Beine
  g += rect(150, baseY-height+12, 18, height-12, {strokeWidth:2});
  g += rect(250, baseY-height+12, 18, height-12, {strokeWidth:2});
  g += text(40, 18, title || "Holztisch", {size:13});
  g += text(320, baseY-height/2, `H=${height} cm`, {size:11});

  // Versatz
  g += text(210, baseY-10, `Skizze (schematisch)`, {anchor:"middle", size:11});

  return svgWrap(g,w,h);
}

function drawWeideland({a,b,c,d,title}) {
  // Unregelmäßiges Viereck schematisch + Seitenlängen
  const w=420,h=260;
  const P1=[90,70], P2=[310,90], P3=[280,210], P4=[110,190];
  let g="";
  g+=poly([P1,P2,P3,P4],{strokeWidth:2});
  g+=text((P1[0]+P2[0])/2, (P1[1]+P2[1])/2-8, `${a} m`, {anchor:"middle"});
  g+=text((P2[0]+P3[0])/2+8, (P2[1]+P3[1])/2, `${c} m`, {size:11});
  g+=text((P3[0]+P4[0])/2, (P3[1]+P4[1])/2+16, `${b} m`, {anchor:"middle"});
  g+=text((P4[0]+P1[0])/2-8, (P4[1]+P1[1])/2, `${d} m`, {anchor:"end", size:11});
  g+=text(40,18,title||"Weideland",{size:13});
  return svgWrap(g,w,h);
}

function drawGarden({outerW, outerH, cutW, cutH, title}) {
  // Außenrechteck minus Innenrechteck (Beet) -> zeigt typische Gartenaufteilung
  const w=420,h=260;
  const margin=60;
  const maxW = w-2*margin;
  const maxH = h-2*margin;
  const s = Math.min(maxW/outerW, maxH/outerH);

  const W=outerW*s, H=outerH*s;
  const cw=cutW*s, ch=cutH*s;

  const x=margin, y=50;

  let g="";
  g += rect(x,y,W,H,{strokeWidth:2});
  // Beet innen (rechts unten oder beliebig – schematisch)
  g += rect(x+W-cw, y+H-ch, cw, ch, {strokeWidth:2, dash:"6 4"});
  g += text(x, y-10, title||"Garten", {size:13});
  g += text(x+W/2, y+H+18, `${outerW} m`, {anchor:"middle"});
  g += text(x-10, y+H/2, `${outerH} m`, {anchor:"end"});
  g += text(x+W-cw/2, y+H-ch-8, `${cutW} m`, {anchor:"middle", size:11});
  g += text(x+W+10, y+H-ch/2, `${cutH} m`, {size:11});

  return svgWrap(g,w,h);
}
