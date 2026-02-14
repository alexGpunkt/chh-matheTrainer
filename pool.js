/* =========================================================
   pool.js – BBR BASIS (Niveau 1-3, Noten 4-3)
   VOLLSTÄNDIG ergänzt mit allen BBR-Prüfungsaufgaben 2014-2019
   Enthält: Rechnen, Einheiten, Geometrie, Sachaufgaben, Prozent,
   Zuordnungen, Diagramme, Wahrscheinlichkeit, Gleichungen, Körper
   ERWEITERT mit Diagrammtypen 1-12
========================================================= */

/* =========================================================
   UTIL
========================================================= */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round2(x) {
  return Math.round(x * 100) / 100;
}

/* =========================================================
   OPERATOR-GRUPPEN
========================================================= */
const OPERATOR_GROUPS_BASIS = {
  BERECHNE: ["berechne", "bestimme", "ermittle", "gib an"],
  RECHNE_UM: ["rechne um", "wandle um"],
  GIB_AN: ["gib an"],
  ERMITTLE: ["ermittle"],
  BEGRUENDE: ["begründe", "erläutere"],
  UEBERPRUEFE: ["überprüfe", "prüfe"],
  ENTSCHEIDE: ["entscheide"],
  ZEICHNE: ["zeichne", "ergänze"]
};

function pickFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getOperatorPhraseBasis(group) {
  const list = OPERATOR_GROUPS_BASIS[group] || ["berechne"];
  const op = pickFrom(list);
  return op.charAt(0).toUpperCase() + op.slice(1);
}

/* =========================================================
   LÖSUNGSSCHRITTE GENERIEREN
========================================================= */
function generateSteps(taskType, params, solution) {
  switch(taskType) {
    // ---------------------- RECHNEN ----------------------
    case "rechnen_multiplikation":
      return [
        `Multiplikation: ${params.a} · ${params.b}`,
        `Ausrechnen: ${params.a * params.b}`
      ];
    case "rechnen_division":
      return [
        `Division: ${params.a} : ${params.b}`,
        `Ausrechnen: ${params.ans}`
      ];
    case "rechnen_addition":
      return [
        `Addition: ${params.a} + ${params.b}`,
        `Ausrechnen: ${params.a + params.b}`
      ];
    case "rechnen_subtraktion":
      return [
        `Subtraktion: ${params.a} − ${params.b}`,
        `Ausrechnen: ${params.a - params.b}`
      ];
    case "rechnen_punktvorstrich":
      return [
        `Punkt-vor-Strich: zuerst ${params.b} · ${params.c} = ${params.b * params.c}`,
        `Dann: ${params.a} − ${params.b * params.c}`,
        `Ausrechnen: ${params.a - params.b * params.c}`
      ];
    case "rechnen_klammer":
      return [
        `Klammer zuerst: (${params.a} + ${params.b}) = ${params.a + params.b}`,
        `Dann: ${params.a + params.b} · ${params.c} = ${(params.a + params.b) * params.c}`
      ];
    case "rechnen_quadrat":
      return [
        `Quadratzahl von ${params.a} berechnen`,
        `${params.a} · ${params.a} = ${params.a * params.a}`
      ];

    // ---------------------- EINHEITEN ----------------------
    case "einheiten_m_cm":
      return [`1 m = 100 cm`, `${params.m} · 100 = ${params.m * 100} cm`];
    case "einheiten_cm_m":
      return [`100 cm = 1 m`, `${params.cm} : 100 = ${round2(params.cm / 100)} m`];
    case "einheiten_kg_g":
      return [`1 kg = 1000 g`, `${params.kg} · 1000 = ${params.kg * 1000} g`];
    case "einheiten_g_kg":
      return [`1000 g = 1 kg`, `${params.g} : 1000 = ${round2(params.g / 1000)} kg`];
    case "einheiten_min_h":
      return [`60 min = 1 h`, `${params.mins} : 60 = ${round2(params.mins / 60)} h`];
    case "einheiten_km_m":
      return [`1 km = 1000 m`, `${params.km} · 1000 = ${params.km * 1000} m`];
    case "einheiten_cm_dm":
      return [`10 cm = 1 dm`, `${params.cm} : 10 = ${params.cm / 10} dm`];
    case "einheiten_euro_cent":
      return [`1 € = 100 ct`, `${params.euro} · 100 = ${params.euro * 100} ct`];
    case "einheiten_cent_euro":
      return [`100 ct = 1 €`, `${params.cent} : 100 = ${round2(params.cent / 100)} €`];
    case "einheiten_tage_stunden":
      return [`1 Tag = 24 h`, `${params.tage} · 24 = ${params.tage * 24} h`];
    case "einheiten_s_min":
      return [`60 s = 1 min`, `${params.s} : 60 = ${Math.floor(params.s / 60)} min ${params.s % 60} s`];

    // ---------------------- GEOMETRIE ----------------------
    case "geometrie_quadrat_umfang":
      return [`U = 4 · a`, `4 · ${params.a} = ${4 * params.a} cm`];
    case "geometrie_quadrat_flaeche":
      return [`A = a · a`, `${params.a} · ${params.a} = ${params.a * params.a} cm²`];
    case "geometrie_rechteck_umfang":
      return [`U = 2 · (l + b)`, `2 · (${params.l} + ${params.b}) = ${2 * (params.l + params.b)} cm`];
    case "geometrie_rechteck_flaeche":
      return [`A = l · b`, `${params.l} · ${params.b} = ${params.l * params.b} cm²`];
    case "geometrie_dreieck_flaeche":
      return [`A = (g · h) : 2`, `(${params.g} · ${params.h}) : 2 = ${round2((params.g * params.h) / 2)} cm²`];
    case "geometrie_kreis_durchmesser":
      return [`d = 2 · r`, `2 · ${params.r} = ${2 * params.r} cm`];
    case "geometrie_kreis_umfang":
      return [`U = π · d`, `3,14 · ${params.d} = ${round2(3.14 * params.d)} cm`];
    case "geometrie_kreis_flaeche":
      return [`A = π · r²`, `3,14 · ${params.r}² = 3,14 · ${params.r * params.r} = ${round2(3.14 * params.r * params.r)} cm²`];
    case "geometrie_wuerfel_volumen":
      return [`V = a · a · a`, `${params.a} · ${params.a} · ${params.a} = ${params.a * params.a * params.a} cm³`];
    case "geometrie_quader_volumen":
      return [`V = l · b · h`, `${params.l} · ${params.b} · ${params.h} = ${params.l * params.b * params.h} cm³`];
    case "geometrie_quader_oberflaeche":
      return [`O = 2 · (l·b + l·h + b·h)`, `2 · (${params.l}·${params.b} + ${params.l}·${params.h} + ${params.b}·${params.h}) = ${2 * (params.l*params.b + params.l*params.h + params.b*params.h)} cm²`];
    case "geometrie_zylinder_volumen":
      return [`V = π · r² · h`, `3,14 · ${params.r}² · ${params.h} = 3,14 · ${params.r * params.r} · ${params.h} = ${round2(3.14 * params.r * params.r * params.h)} cm³`];
    
    // ---------------------- NEUE GEOMETRIE-DIAGRAMME ----------------------
    case "geometrie_dreieck_koordinaten":
      return [
        `Dreieck mit Punkten A(${params.x1},${params.y1}), B(${params.x2},${params.y2}), C(${params.x3},${params.y3})`,
        `Flächenberechnung mit Determinantenformel:`,
        `A = 1/2 · |(x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2))|`,
        `A = 1/2 · |(${params.x1}(${params.y2} - ${params.y3}) + ${params.x2}(${params.y3} - ${params.y1}) + ${params.x3}(${params.y1} - ${params.y2}))|`,
        `A = 1/2 · |${params.det}| = ${round2(params.area)} cm²`
      ];
    case "geometrie_viereck_koordinaten":
      return [
        `Viereck mit Punkten A(${params.x1},${params.y1}), B(${params.x2},${params.y2}), C(${params.x3},${params.y3}), D(${params.x4},${params.y4})`,
        `Flächenberechnung durch Zerlegung in Dreiecke:`,
        `Fläche = ${round2(params.area)} cm²`
      ];
    case "geometrie_pythagoras":
      return [
        `Satz des Pythagoras: a² + b² = c²`,
        `${params.a}² + ${params.b}² = c²`,
        `${params.a * params.a} + ${params.b * params.b} = c²`,
        `${params.a * params.a + params.b * params.b} = c²`,
        `c = √${params.a * params.a + params.b * params.b} = ${round2(params.c)} cm`
      ];
    case "geometrie_rechtwinklig_pruefen":
      return [
        `Prüfen mit Satz des Pythagoras: a² + b² = c²`,
        `${params.a}² + ${params.b}² = ${params.a * params.a + params.b * params.b}`,
        `${params.c}² = ${params.c * params.c}`,
        `${params.a * params.a + params.b * params.b} ${params.isRight ? '=' : '≠'} ${params.c * params.c}`,
        `Das Dreieck ist ${params.isRight ? 'rechtwinklig' : 'nicht rechtwinklig'}.`
      ];
    case "geometrie_winkel_berechnen":
      return [
        `Winkelsumme im Dreieck: 180°`,
        `Winkel A = ${params.angleA}°, Winkel B = ${params.angleB}°, Winkel C = ${params.angleC}°`,
        `${params.angleA}° + ${params.angleB}° + ${params.angleC}° = ${params.angleA + params.angleB + params.angleC}°`
      ];
    case "geometrie_lform_flaeche":
      return [
        `Zusammengesetzte L-Form in Rechtecke zerlegen:`,
        `Rechteck 1: ${params.w1} cm × ${params.h1} cm = ${params.w1 * params.h1} cm²`,
        `Rechteck 2: ${params.w2} cm × ${params.h2} cm = ${params.w2 * params.h2} cm²`,
        `Gesamtfläche = ${params.w1 * params.h1 + params.w2 * params.h2} cm²`
      ];
    case "geometrie_quader_netz":
      return [
        `Quader-Netz ergänzen:`,
        `Die fehlende Seite muss die Maße ${params.missingDim1} cm × ${params.missingDim2} cm haben.`
      ];
    case "geometrie_prisma_netz":
      return [
        `Prisma-Netz:`,
        `Die Grundfläche ist ein Dreieck mit Seiten ${params.base1} cm, ${params.base2} cm, ${params.base3} cm.`,
        `Die Höhe des Prismas beträgt ${params.height} cm.`
      ];
    case "geometrie_zylinder_skizze":
      return [
        `Zylinder mit Radius r = ${params.r} cm und Höhe h = ${params.h} cm`,
        `Mantelfläche: M = 2πrh = 2 · 3,14 · ${params.r} · ${params.h} = ${round2(2 * 3.14 * params.r * params.h)} cm²`,
        `Oberfläche: O = 2πr² + 2πrh = 2 · 3,14 · ${params.r * params.r} + ${round2(2 * 3.14 * params.r * params.h)} = ${round2(2 * 3.14 * params.r * params.r + 2 * 3.14 * params.r * params.h)} cm²`
      ];
    case "geometrie_werkstueck_volumen":
      return [
        `Werkstück zusammengesetzt aus Quader und aufgesetztem Körper:`,
        `Quader: ${params.a} cm × ${params.b} cm × ${params.c} cm = ${params.a * params.b * params.c} cm³`,
        `Aufsatz: Volumen = ${params.extraVol} cm³`,
        `Gesamtvolumen = ${params.a * params.b * params.c + params.extraVol} cm³`
      ];
    case "geometrie_transport_kartons":
      return [
        `Laderaum: ${params.truckL} cm × ${params.truckB} cm`,
        `Karton: ${params.boxL} cm × ${params.boxB} cm`,
        `Anzahl in der Länge: ${Math.floor(params.truckL / params.boxL)}`,
        `Anzahl in der Breite: ${Math.floor(params.truckB / params.boxB)}`,
        `Maximale Anzahl: ${Math.floor(params.truckL / params.boxL) * Math.floor(params.truckB / params.boxB)} Kartons`
      ];
    case "geometrie_rampe_volumen":
      return [
        `Rampe (Prisma mit trapezförmiger Grundfläche):`,
        `Grundfläche (Trapez): A = (${params.baseL} + ${params.topL}) · ${params.baseH} : 2`,
        `A = ${(params.baseL + params.topL)} · ${params.baseH} : 2 = ${round2((params.baseL + params.topL) * params.baseH / 2)} cm²`,
        `Volumen: V = A · Breite = ${round2((params.baseL + params.topL) * params.baseH / 2)} · ${params.width} = ${round2((params.baseL + params.topL) * params.baseH / 2 * params.width)} cm³`
      ];

    // ---------------------- SACHAUFGABEN ----------------------
    case "sach_einkauf":
      return [`Preis pro Stück: ${params.price} €`, `Anzahl: ${params.amount}`, `${params.amount} · ${params.price} = ${params.price * params.amount} €`];
    case "sach_geschwindigkeit":
      return [`v = s : t`, `${params.km} : ${params.h} = ${round2(params.km / params.h)} km/h`];
    case "sach_seiten_pro_tag":
      return [`Gesamt: ${params.pages} Seiten`, `${params.days} Tage`, `Pro Tag: ${params.pages} : ${params.days} = ${round2(params.pages / params.days)} Seiten`];
    case "sach_zeit_proportional":
      return [`${params.km} km → ${params.min} min`, `${params.factor} · ${params.km} km → ${params.factor} · ${params.min} = ${params.min * params.factor} min`];
    case "sach_antiproportional":
      return [`Gesamtarbeit: ${params.anz1} · ${params.zeit1} = ${params.anz1 * params.zeit1}`, `${params.anz2} benötigen: ${params.anz1 * params.zeit1} : ${params.anz2} = ${round2(params.anz1 * params.zeit1 / params.anz2)} Stunden`];
    case "sach_durchschnitt":
      return [`Summe: ${params.v1} + ${params.v2} + ${params.v3} = ${params.v1 + params.v2 + params.v3}`, `Durch 3: ${params.v1 + params.v2 + params.v3} : 3 = ${round2((params.v1 + params.v2 + params.v3) / 3)}`];
    case "sach_tickets":
      return [`Bezahlt: ${params.paid} €`, `Preis pro Ticket: ${params.price} €`, `Anzahl: ${params.paid} : ${params.price} = ${round2(params.paid / params.price)}`];
    case "sach_zeitdifferenz":
      return [`Start: ${params.start}:${params.startMin < 10 ? '0'+params.startMin : params.startMin}`, `Dauer: ${params.h}h ${params.min}min`, `Ende: ${params.start + params.h}:${(params.startMin + params.min) % 60 < 10 ? '0' + ((params.startMin + params.min) % 60) : (params.startMin + params.min) % 60}`];

    // ---------------------- PROZENTRECHNUNG ----------------------
    case "prozent_prozentwert":
      return [`W = G · p / 100`, `${params.g} · ${params.p} / 100 = ${round2(params.g * params.p / 100)}`];
    case "prozent_rabatt":
      return [`Zahlungsanteil: 100% − ${params.p}% = ${100 - params.p}%`, `${params.price} · ${100 - params.p} / 100 = ${round2(params.price * (100 - params.p) / 100)} €`];
    case "prozent_grundwert":
      return [`G = W · 100 / p`, `${params.w} · 100 / ${params.p} = ${round2(params.w * 100 / params.p)}`];
    case "prozent_steigerung":
      return [`Differenz: ${params.newVal} − ${params.g} = ${params.diff}`, `p = (Differenz / Grundwert) · 100`, `(${params.diff} / ${params.g}) · 100 = ${round2((params.diff / params.g) * 100)}%`];
    case "prozent_prozentsatz":
      return [`p = (W / G) · 100`, `(${params.w} / ${params.g}) · 100 = ${round2((params.w / params.g) * 100)}%`];
    case "prozent_mehrwertsteuer":
      return [`Brutto = Netto · (1 + p/100)`, `${params.netto} · ${1 + params.p/100} = ${round2(params.netto * (1 + params.p/100))} €`];
    case "prozent_skonto":
      return [`Zahlungsbetrag = Rechnungsbetrag · (1 − p/100)`, `${params.betrag} · ${1 - params.p/100} = ${round2(params.betrag * (1 - params.p/100))} €`];

    // ---------------------- ZUORDNUNGEN ----------------------
    case "zuordnung_proportional":
      return [`Je mehr, desto mehr`, `Quotientengleichheit`, `${params.y1} / ${params.x1} = ${round2(params.y1 / params.x1)}`, `${params.x2} · ${round2(params.y1 / params.x1)} = ${round2(params.x2 * params.y1 / params.x1)}`];
    case "zuordnung_antiproportional":
      return [`Je mehr, desto weniger`, `Produktgleichheit`, `${params.x1} · ${params.y1} = ${params.x1 * params.y1}`, `${params.x2} benötigt: ${params.x1 * params.y1} : ${params.x2} = ${round2(params.x1 * params.y1 / params.x2)}`];

    // ---------------------- GLEICHUNGEN ----------------------
    case "gleichung_einfach":
      return [`x + ${params.a} = ${params.sum}`, `x = ${params.sum} − ${params.a}`, `x = ${params.sum - params.a}`];
    case "gleichung_2x":
      return [`2x = ${params.b}`, `x = ${params.b} : 2`, `x = ${params.b / 2}`];
    case "gleichung_klammer":
      return [`${params.faktor} · (x + ${params.k}) = ${params.erg}`, `x + ${params.k} = ${params.erg} : ${params.faktor} = ${params.erg / params.faktor}`, `x = ${params.erg / params.faktor} − ${params.k} = ${params.erg / params.faktor - params.k}`];

    // ---------------------- WAHRSCHEINLICHKEIT ----------------------
    case "wsk_einfach":
      return [`Günstige: ${params.gunstig}`, `Mögliche: ${params.moglich}`, `P = ${params.gunstig} / ${params.moglich} = ${round2(params.gunstig / params.moglich)} = ${round2(params.gunstig / params.moglich * 100)}%`];
    case "wsk_mehrstufig_mit_zurueck":
      return [`P = ${round2(params.p1)} · ${round2(params.p2)}`, `${round2(params.p1)} · ${round2(params.p2)} = ${round2(params.p1 * params.p2)} = ${round2(params.p1 * params.p2 * 100)}%`];

    // ---------------------- DIAGRAMME ----------------------
    case "diagramm_saeule":
      return [`Säulenhöhe proportional zum Wert`, `Maßstab: 1 cm = ${params.scale} Einheiten`, `Höhe = ${params.wert} : ${params.scale} = ${round2(params.wert / params.scale)} cm`];

    default:
      return [`Rechnung durchführen`, `Ergebnis: ${solution}`];
  }
}

/* =========================================================
   KATEGORIEN & GEWICHTUNG
========================================================= */
const weightedCategories = [
  "rechnen", "rechnen",
  "einheiten", "einheiten",
  "geometrie", "geometrie",
  "sach", "sach",
  "prozent", "prozent",
  "zuordnung",
  "gleichung",
  "wsk",
  "diagramm"
];

function pickCategoryWeighted() {
  return weightedCategories[rand(0, weightedCategories.length - 1)];
}

/* =========================================================
   BASIS-AUFGABEN (BBR Niveau 1-3) - ERWEITERT MIT NEUEN DIAGRAMMTYPEN
========================================================= */
const TASKS = {
  rechnen: (level) => {
    const type = rand(1, 7);
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    if (type === 1) {
      let a = rand(10, 200);
      let b = rand(2, 20);
      return {
        text: `${opBerechne}: ${a} · ${b}`,
        sol: a * b,
        steps: generateSteps("rechnen_multiplikation", {a, b}, a * b),
        category: "rechnen",
        params: {a, b}
      };
    }
    if (type === 2) {
      let b = rand(2, 12);
      let ans = rand(5, 50);
      let a = ans * b;
      return {
        text: `${opBerechne}: ${a} : ${b}`,
        sol: ans,
        steps: generateSteps("rechnen_division", {a, b, ans}, ans),
        category: "rechnen",
        params: {a, b, ans}
      };
    }
    if (type === 3) {
      let a = rand(50, 500);
      let b = rand(20, 300);
      return {
        text: `${opBerechne}: ${a} + ${b}`,
        sol: a + b,
        steps: generateSteps("rechnen_addition", {a, b}, a + b),
        category: "rechnen",
        params: {a, b}
      };
    }
    if (type === 4) {
      let a = rand(100, 600);
      let b = rand(30, 200);
      if (b > a) [a, b] = [b, a];
      return {
        text: `${opBerechne}: ${a} − ${b}`,
        sol: a - b,
        steps: generateSteps("rechnen_subtraktion", {a, b}, a - b),
        category: "rechnen",
        params: {a, b}
      };
    }
    if (type === 5) {
      let a = rand(40, 150);
      let b = rand(2, 8);
      let c = rand(2, 7);
      return {
        text: `${opBerechne}: ${a} − ${b} · ${c}`,
        sol: a - b * c,
        steps: generateSteps("rechnen_punktvorstrich", {a, b, c}, a - b * c),
        category: "rechnen",
        params: {a, b, c}
      };
    }
    if (type === 6) {
      let a = rand(2, 12);
      return {
        text: `${opBerechne}: Die Quadratzahl von ${a}`,
        sol: a * a,
        steps: generateSteps("rechnen_quadrat", {a}, a * a),
        category: "rechnen",
        params: {a}
      };
    }
    let a = rand(5, 20);
    let b = rand(3, 15);
    let c = rand(2, 6);
    return {
      text: `${opBerechne}: (${a} + ${b}) · ${c}`,
      sol: (a + b) * c,
      steps: generateSteps("rechnen_klammer", {a, b, c}, (a + b) * c),
      category: "rechnen",
      params: {a, b, c}
    };
  },

  einheiten: (level) => {
    const type = rand(1, 11);
    const opRechneUm = getOperatorPhraseBasis("RECHNE_UM");
    
    if (type === 1) {
      let m = rand(1, 15);
      return {
        text: `${opRechneUm}: ${m} m in cm`,
        sol: m * 100,
        steps: generateSteps("einheiten_m_cm", {m}, m * 100),
        category: "einheiten",
        params: {m}
      };
    }
    if (type === 2) {
      let cm = rand(150, 2500);
      return {
        text: `${opRechneUm}: ${cm} cm in m`,
        sol: round2(cm / 100),
        steps: generateSteps("einheiten_cm_m", {cm}, round2(cm / 100)),
        category: "einheiten",
        params: {cm}
      };
    }
    if (type === 3) {
      let kg = rand(1, 10);
      return {
        text: `${opRechneUm}: ${kg} kg in g`,
        sol: kg * 1000,
        steps: generateSteps("einheiten_kg_g", {kg}, kg * 1000),
        category: "einheiten",
        params: {kg}
      };
    }
    if (type === 4) {
      let g = rand(500, 5000);
      return {
        text: `${opRechneUm}: ${g} g in kg`,
        sol: round2(g / 1000),
        steps: generateSteps("einheiten_g_kg", {g}, round2(g / 1000)),
        category: "einheiten",
        params: {g}
      };
    }
    if (type === 5) {
      let mins = [60, 90, 120, 150, 180][rand(0, 4)];
      return {
        text: `${opRechneUm}: ${mins} min in h`,
        sol: round2(mins / 60),
        steps: generateSteps("einheiten_min_h", {mins}, round2(mins / 60)),
        category: "einheiten",
        params: {mins}
      };
    }
    if (type === 6) {
      let km = rand(1, 8);
      return {
        text: `${opRechneUm}: ${km} km in m`,
        sol: km * 1000,
        steps: generateSteps("einheiten_km_m", {km}, km * 1000),
        category: "einheiten",
        params: {km}
      };
    }
    if (type === 7) {
      let cm = rand(20, 150);
      return {
        text: `${opRechneUm}: ${cm} cm in dm`,
        sol: cm / 10,
        steps: generateSteps("einheiten_cm_dm", {cm}, cm / 10),
        category: "einheiten",
        params: {cm}
      };
    }
    if (type === 8) {
      let euro = rand(1, 10);
      return {
        text: `${opRechneUm}: ${euro} € in Cent`,
        sol: euro * 100,
        steps: generateSteps("einheiten_euro_cent", {euro}, euro * 100),
        category: "einheiten",
        params: {euro}
      };
    }
    if (type === 9) {
      let cent = rand(150, 999);
      return {
        text: `${opRechneUm}: ${cent} Cent in €`,
        sol: round2(cent / 100),
        steps: generateSteps("einheiten_cent_euro", {cent}, round2(cent / 100)),
        category: "einheiten",
        params: {cent}
      };
    }
    if (type === 10) {
      let tage = rand(1, 5);
      return {
        text: `${opRechneUm}: ${tage} Tage in Stunden`,
        sol: tage * 24,
        steps: generateSteps("einheiten_tage_stunden", {tage}, tage * 24),
        category: "einheiten",
        params: {tage}
      };
    }
    let s = rand(100, 300);
    let mins = Math.floor(s / 60);
    let secs = s % 60;
    return {
      text: `${opRechneUm}: ${s} s in min und s`,
      sol: `${mins} min ${secs} s`,
      steps: generateSteps("einheiten_s_min", {s}, `${mins} min ${secs} s`),
      category: "einheiten",
      params: {s}
    };
  },

  geometrie: (level) => {
    const type = rand(1, 18); // Erweitert auf 18 Typen
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    
    // Bestehende Geometrie-Aufgaben (1-12)
    if (type === 1) {
      let a = rand(2, 15);
      return {
        text: `${opBerechne}: Umfang eines Quadrats mit a = ${a} cm`,
        sol: 4 * a,
        steps: generateSteps("geometrie_quadrat_umfang", {a}, 4 * a),
        category: "geometrie",
        params: {a}
      };
    }
    if (type === 2) {
      let a = rand(2, 15);
      return {
        text: `${opErmittle}: Fläche eines Quadrats mit a = ${a} cm`,
        sol: a * a,
        steps: generateSteps("geometrie_quadrat_flaeche", {a}, a * a),
        category: "geometrie",
        params: {a}
      };
    }
    if (type === 3) {
      let l = rand(4, 25);
      let b = rand(3, 20);
      return {
        text: `${opBerechne}: Umfang eines Rechtecks mit l = ${l} cm, b = ${b} cm`,
        sol: 2 * (l + b),
        steps: generateSteps("geometrie_rechteck_umfang", {l, b}, 2 * (l + b)),
        category: "geometrie",
        params: {l, b}
      };
    }
    if (type === 4) {
      let l = rand(4, 25);
      let b = rand(3, 20);
      return {
        text: `${opErmittle}: Fläche eines Rechtecks mit l = ${l} cm, b = ${b} cm`,
        sol: l * b,
        steps: generateSteps("geometrie_rechteck_flaeche", {l, b}, l * b),
        category: "geometrie",
        params: {l, b}
      };
    }
    if (type === 5) {
      let g = rand(4, 20);
      let h = rand(3, 15);
      return {
        text: `${opBerechne}: Fläche eines Dreiecks mit g = ${g} cm, h = ${h} cm`,
        sol: round2((g * h) / 2),
        steps: generateSteps("geometrie_dreieck_flaeche", {g, h}, round2((g * h) / 2)),
        category: "geometrie",
        params: {g, h}
      };
    }
    if (type === 6) {
      let r = rand(2, 12);
      return {
        text: `${opBerechne}: Durchmesser eines Kreises mit r = ${r} cm`,
        sol: 2 * r,
        steps: generateSteps("geometrie_kreis_durchmesser", {r}, 2 * r),
        category: "geometrie",
        params: {r}
      };
    }
    if (type === 7) {
      let d = rand(4, 20);
      return {
        text: `${opBerechne}: Umfang eines Kreises mit d = ${d} cm (π = 3,14)`,
        sol: round2(3.14 * d),
        steps: generateSteps("geometrie_kreis_umfang", {d}, round2(3.14 * d)),
        category: "geometrie",
        params: {d}
      };
    }
    if (type === 8) {
      let r = rand(2, 10);
      return {
        text: `${opErmittle}: Fläche eines Kreises mit r = ${r} cm (π = 3,14)`,
        sol: round2(3.14 * r * r),
        steps: generateSteps("geometrie_kreis_flaeche", {r}, round2(3.14 * r * r)),
        category: "geometrie",
        params: {r}
      };
    }
    if (type === 9) {
      let a = rand(2, 6);
      return {
        text: `${opBerechne}: Volumen eines Würfels mit a = ${a} cm`,
        sol: a * a * a,
        steps: generateSteps("geometrie_wuerfel_volumen", {a}, a * a * a),
        category: "geometrie",
        params: {a}
      };
    }
    if (type === 10) {
      let l = rand(3, 12);
      let b = rand(2, 10);
      let h = rand(2, 8);
      return {
        text: `${opBerechne}: Volumen eines Quaders mit l = ${l} cm, b = ${b} cm, h = ${h} cm`,
        sol: l * b * h,
        steps: generateSteps("geometrie_quader_volumen", {l, b, h}, l * b * h),
        category: "geometrie",
        params: {l, b, h}
      };
    }
    if (type === 11) {
      let l = rand(3, 10);
      let b = rand(2, 8);
      let h = rand(2, 6);
      return {
        text: `${opBerechne}: Oberfläche eines Quaders mit l = ${l} cm, b = ${b} cm, h = ${h} cm`,
        sol: 2 * (l*b + l*h + b*h),
        steps: generateSteps("geometrie_quader_oberflaeche", {l, b, h}, 2 * (l*b + l*h + b*h)),
        category: "geometrie",
        params: {l, b, h}
      };
    }
    if (type === 12) {
      let r = rand(2, 8);
      let h = rand(3, 12);
      return {
        text: `${opBerechne}: Volumen eines Zylinders mit r = ${r} cm, h = ${h} cm (π = 3,14)`,
        sol: round2(3.14 * r * r * h),
        steps: generateSteps("geometrie_zylinder_volumen", {r, h}, round2(3.14 * r * r * h)),
        category: "geometrie",
        params: {r, h}
      };
    }
    
    // 1️⃣ NEU: flaeche_dreieck_koordinaten
    if (type === 13) {
      // Koordinaten für ein Dreieck generieren
      let x1 = rand(1, 10);
      let y1 = rand(1, 10);
      let x2 = rand(1, 10);
      let y2 = rand(1, 10);
      let x3 = rand(1, 10);
      let y3 = rand(1, 10);
      
      // Determinantenformel für Fläche
      let det = Math.abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2));
      let area = det / 2;
      
      return {
        text: `${opBerechne}: Fläche des Dreiecks mit den Punkten A(${x1},${y1}), B(${x2},${y2}) und C(${x3},${y3}) im Koordinatensystem (in cm²)`,
        sol: round2(area),
        steps: generateSteps("geometrie_dreieck_koordinaten", {
          x1, y1, x2, y2, x3, y3, det, area
        }, round2(area)),
        category: "geometrie",
        params: {x1, y1, x2, y2, x3, y3, det, area},
        diagram: {
          type: "flaeche_dreieck_koordinaten",
          dynamic: true,
          params: {
            points: [[x1, y1], [x2, y2], [x3, y3]],
            labels: ["A", "B", "C"]
          }
        }
      };
    }
    
    // 2️⃣ NEU: viereck_koordinaten
    if (type === 14) {
      // Koordinaten für ein Viereck generieren (einfaches Rechteck oder Parallelogramm)
      let x1 = rand(1, 5);
      let y1 = rand(1, 5);
      let x2 = x1 + rand(3, 8);
      let y2 = y1;
      let x3 = x2 - rand(1, 3);
      let y3 = y2 + rand(3, 8);
      let x4 = x1 - rand(1, 3);
      let y4 = y3;
      
      // Fläche durch Zerlegung in zwei Dreiecke (vereinfacht)
      let area1 = Math.abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2;
      let area2 = Math.abs(x1*(y3 - y4) + x3*(y4 - y1) + x4*(y1 - y3)) / 2;
      let area = area1 + area2;
      
      return {
        text: `${opBerechne}: Fläche des Vierecks mit den Punkten A(${x1},${y1}), B(${x2},${y2}), C(${x3},${y3}) und D(${x4},${y4}) im Koordinatensystem (in cm²)`,
        sol: round2(area),
        steps: generateSteps("geometrie_viereck_koordinaten", {
          x1, y1, x2, y2, x3, y3, x4, y4, area
        }, round2(area)),
        category: "geometrie",
        params: {x1, y1, x2, y2, x3, y3, x4, y4, area},
        diagram: {
          type: "viereck_koordinaten",
          dynamic: true,
          params: {
            points: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
            labels: ["A", "B", "C", "D"]
          }
        }
      };
    }
    
    // 3️⃣ NEU: dreieck_pythagoras
    if (type === 15) {
      let a = rand(3, 10);
      let b = rand(3, 10);
      let c = Math.sqrt(a*a + b*b);
      
      return {
        text: `${opBerechne}: Im rechtwinkligen Dreieck sind die Katheten a = ${a} cm und b = ${b} cm. Berechne die Länge der Hypotenuse c.`,
        sol: round2(c),
        steps: generateSteps("geometrie_pythagoras", {a, b, c}, round2(c)),
        category: "geometrie",
        params: {a, b, c},
        diagram: {
          type: "dreieck_pythagoras",
          dynamic: true,
          params: { a, b, c: null }
        }
      };
    }
    
    // 4️⃣ NEU: rechtwinklig_pruefen
    if (type === 16) {
      let a = rand(3, 12);
      let b = rand(3, 12);
      let c = rand(3, 12);
      
      // Prüfen ob rechtwinklig (mit Toleranz)
      let a2 = a*a, b2 = b*b, c2 = c*c;
      let isRight = Math.abs(a2 + b2 - c2) < 0.1 || 
                    Math.abs(a2 + c2 - b2) < 0.1 || 
                    Math.abs(b2 + c2 - a2) < 0.1;
      
      return {
        text: `${opUeberpruefe || "Überprüfe"}: Ist das Dreieck mit den Seiten a = ${a} cm, b = ${b} cm und c = ${c} cm rechtwinklig?`,
        sol: isRight ? "Ja" : "Nein",
        steps: generateSteps("geometrie_rechtwinklig_pruefen", {a, b, c, isRight}, isRight ? "Ja" : "Nein"),
        category: "geometrie",
        params: {a, b, c, isRight},
        diagram: {
          type: "rechtwinklig_pruefen",
          dynamic: true,
          params: { a, b, c }
        }
      };
    }
    
    // 5️⃣ NEU: winkel_berechnen_dreieck
    if (type === 17) {
      let angleA = rand(30, 70);
      let angleB = rand(30, 70);
      let angleC = 180 - angleA - angleB;
      
      return {
        text: `${opBerechne}: Im Dreieck sind die Winkel A = ${angleA}° und B = ${angleB}° gegeben. Berechne den fehlenden Winkel C.`,
        sol: angleC,
        steps: generateSteps("geometrie_winkel_berechnen", {angleA, angleB, angleC}, angleC),
        category: "geometrie",
        params: {angleA, angleB, angleC},
        diagram: {
          type: "winkel_berechnen_dreieck",
          dynamic: true,
          params: { angleA, angleB, angleC }
        }
      };
    }
    
    // 6️⃣ NEU: zusammengesetzte_flaeche_lform
    if (type === 18) {
      let w1 = rand(5, 15);
      let h1 = rand(5, 15);
      let w2 = rand(3, 10);
      let h2 = rand(3, 10);
      
      return {
        text: `${opBerechne}: Berechne die Gesamtfläche der L-förmigen Figur. Rechteck 1: ${w1} cm × ${h1} cm, Rechteck 2: ${w2} cm × ${h2} cm.`,
        sol: w1 * h1 + w2 * h2,
        steps: generateSteps("geometrie_lform_flaeche", {w1, h1, w2, h2}, w1 * h1 + w2 * h2),
        category: "geometrie",
        params: {w1, h1, w2, h2},
        diagram: {
          type: "zusammengesetzte_flaeche_lform",
          dynamic: true,
          params: { w1, h1, w2, h2 }
        }
      };
    }
    
    // Fallback
    let r = rand(2, 8);
    let h = rand(3, 12);
    return {
      text: `${opBerechne}: Volumen eines Zylinders mit r = ${r} cm, h = ${h} cm (π = 3,14)`,
      sol: round2(3.14 * r * r * h),
      steps: generateSteps("geometrie_zylinder_volumen", {r, h}, round2(3.14 * r * r * h)),
      category: "geometrie",
      params: {r, h}
    };
  },

  // 7️⃣ NEU: quader_netz_ergaenzen (eigener Kategorie-Eintrag)
  quader_netz: (level) => {
    const opErgaenze = getOperatorPhraseBasis("ERGAENZE") || "Ergänze";
    
    let a = rand(3, 8);
    let b = rand(2, 6);
    let c = rand(2, 5);
    
    return {
      text: `${opErgaenze}: Das abgebildete Quadernetz ist unvollständig. Ergänze die fehlende Seite. Gegeben: Länge = ${a} cm, Breite = ${b} cm, Höhe = ${c} cm.`,
      sol: `Die fehlende Seite muss ${a} cm × ${c} cm oder ${b} cm × ${c} cm haben, je nach Position.`,
      steps: generateSteps("geometrie_quader_netz", {missingDim1: a, missingDim2: c}, "Netz ergänzt"),
      category: "quader_netz",
      params: {a, b, c},
      diagram: {
        type: "quader_netz_ergaenzen",
        dynamic: false
      }
    };
  },

  // 8️⃣ NEU: prisma_netz
  prisma_netz: (level) => {
    const opZeichne = getOperatorPhraseBasis("ZEICHNE");
    
    let base1 = rand(3, 6);
    let base2 = rand(3, 6);
    let base3 = rand(3, 6);
    let height = rand(4, 8);
    
    return {
      text: `${opZeichne}: Das Netz eines Dreiecksprismas ist abgebildet. Beschrifte die fehlenden Kantenlängen. Grundfläche: Dreieck mit Seiten ${base1} cm, ${base2} cm, ${base3} cm. Prismahöhe: ${height} cm.`,
      sol: "Netz beschriftet",
      steps: generateSteps("geometrie_prisma_netz", {base1, base2, base3, height}, "Netz beschriftet"),
      category: "prisma_netz",
      params: {base1, base2, base3, height},
      diagram: {
        type: "prisma_netz",
        dynamic: false
      }
    };
  },

  // 9️⃣ NEU: zylinder_oberflaeche_skizze (in Geometrie integriert, aber hier als separate Funktion)
  zylinder_skizze: (level) => {
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    let r = rand(2, 8);
    let h = rand(4, 15);
    
    return {
      text: `${opBerechne}: Berechne die Oberfläche des abgebildeten Zylinders mit r = ${r} cm und h = ${h} cm.`,
      sol: round2(2 * 3.14 * r * r + 2 * 3.14 * r * h),
      steps: generateSteps("geometrie_zylinder_skizze", {r, h}, round2(2 * 3.14 * r * r + 2 * 3.14 * r * h)),
      category: "zylinder_skizze",
      params: {r, h},
      diagram: {
        type: "zylinder_oberflaeche_skizze",
        dynamic: true,
        params: { r, h }
      }
    };
  },

  // 🔟 NEU: werkstueck_volumen
  werkstueck: (level) => {
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    let a = rand(4, 10);
    let b = rand(3, 8);
    let c = rand(2, 6);
    let d = rand(1, 3);
    let extraVol = a * d * d; // Einfacher Aufsatz (z.B. kleiner Würfel)
    
    return {
      text: `${opBerechne}: Das Werkstück besteht aus einem Quader (${a} cm × ${b} cm × ${c} cm) und einem aufgesetzten Würfel mit Kantenlänge ${d} cm. Berechne das Gesamtvolumen.`,
      sol: a * b * c + d * d * d,
      steps: generateSteps("geometrie_werkstueck_volumen", {a, b, c, d, extraVol: d*d*d}, a * b * c + d * d * d),
      category: "werkstueck",
      params: {a, b, c, d, extraVol: d*d*d},
      diagram: {
        type: "werkstueck_volumen",
        dynamic: true,
        params: { a, b, c, d }
      }
    };
  },

  // 1️⃣1️⃣ NEU: transport_kartons_laderaum
  transport_kartons: (level) => {
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    let truckL = 210;
    let truckB = 125;
    let boxL = [40, 30, 25][rand(0, 2)];
    let boxB = [40, 30, 25][rand(0, 2)];
    
    return {
      text: `${opBerechne}: Ein LKW hat einen Laderaum von ${truckL} cm Länge und ${truckB} cm Breite. Wie viele Kartons mit den Maßen ${boxL} cm × ${boxB} cm können pro Lage maximal geladen werden?`,
      sol: Math.floor(truckL / boxL) * Math.floor(truckB / boxB),
      steps: generateSteps("geometrie_transport_kartons", {truckL, truckB, boxL, boxB}, 
                          Math.floor(truckL / boxL) * Math.floor(truckB / boxB)),
      category: "transport_kartons",
      params: {truckL, truckB, boxL, boxB},
      diagram: {
        type: "transport_kartons_laderaum",
        dynamic: true,
        params: {
          truckL: truckL,
          truckB: truckB,
          boxL: boxL,
          boxB: boxB
        }
      }
    };
  },

  // 1️⃣2️⃣ NEU: rampe_volumen
  rampe_volumen: (level) => {
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    let baseL = rand(30, 60);
    let baseH = rand(10, 25);
    let topL = rand(15, 30);
    let width = rand(20, 40);
    
    return {
      text: `${opBerechne}: Eine Rampe hat die Form eines Prismas mit trapezförmiger Grundfläche. Die parallelen Seiten sind ${baseL} cm und ${topL} cm, die Höhe des Trapezes beträgt ${baseH} cm. Die Rampe ist ${width} cm breit. Berechne das Volumen.`,
      sol: round2((baseL + topL) * baseH / 2 * width),
      steps: generateSteps("geometrie_rampe_volumen", {baseL, baseH, topL, width}, 
                          round2((baseL + topL) * baseH / 2 * width)),
      category: "rampe_volumen",
      params: {baseL, baseH, topL, width},
      diagram: {
        type: "rampe_volumen",
        dynamic: true,
        params: { baseL, baseH, topL }
      }
    };
  },

  sach: (level) => {
    const type = rand(1, 8);
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    const opGibAn = getOperatorPhraseBasis("GIB_AN");
    
    if (type === 1) {
      let price = rand(1, 8);
      let amount = rand(2, 12);
      return {
        text: `${opBerechne}: Gesamtpreis für ${amount} Artikel zu je ${price} €`,
        sol: price * amount,
        steps: generateSteps("sach_einkauf", {price, amount}, price * amount),
        category: "sach",
        params: {price, amount}
      };
    }
    if (type === 2) {
      let km = rand(40, 300);
      let h = rand(1, 6);
      return {
        text: `${opErmittle}: Geschwindigkeit (${km} km in ${h} h)`,
        sol: round2(km / h),
        steps: generateSteps("sach_geschwindigkeit", {km, h}, round2(km / h)),
        category: "sach",
        params: {km, h}
      };
    }
    if (type === 3) {
      let pages = rand(40, 200);
      let days = rand(2, 10);
      return {
        text: `${opGibAn}: Seiten pro Tag (${pages} Seiten in ${days} Tagen)`,
        sol: round2(pages / days),
        steps: generateSteps("sach_seiten_pro_tag", {pages, days}, round2(pages / days)),
        category: "sach",
        params: {pages, days}
      };
    }
    if (type === 4) {
      let km = rand(20, 100);
      let min = rand(10, 40);
      let factor = rand(2, 4);
      return {
        text: `${opBerechne}: Zeit für ${km * factor} km (${km} km in ${min} min)`,
        sol: min * factor,
        steps: generateSteps("sach_zeit_proportional", {km, min, factor}, min * factor),
        category: "sach",
        params: {km, min, factor}
      };
    }
    if (type === 5) {
      let anz1 = rand(2, 6);
      let zeit1 = rand(4, 12);
      let anz2 = anz1 + rand(1, 3);
      return {
        text: `${opErmittle}: Zeit für ${anz2} Arbeiter (${anz1} benötigen ${zeit1} h)`,
        sol: round2(anz1 * zeit1 / anz2),
        steps: generateSteps("sach_antiproportional", {anz1, zeit1, anz2}, round2(anz1 * zeit1 / anz2)),
        category: "sach",
        params: {anz1, zeit1, anz2}
      };
    }
    if (type === 6) {
      let v1 = rand(10, 30);
      let v2 = rand(10, 30);
      let v3 = rand(10, 30);
      return {
        text: `${opErmittle}: Durchschnitt von ${v1}, ${v2} und ${v3}`,
        sol: round2((v1 + v2 + v3) / 3),
        steps: generateSteps("sach_durchschnitt", {v1, v2, v3}, round2((v1 + v2 + v3) / 3)),
        category: "sach",
        params: {v1, v2, v3}
      };
    }
    if (type === 7) {
      let price = rand(3, 12);
      let paid = rand(15, 80);
      return {
        text: `${opBerechne}: Anzahl Tickets (${paid} €, Preis pro Ticket ${price} €)`,
        sol: round2(paid / price),
        steps: generateSteps("sach_tickets", {price, paid}, round2(paid / price)),
        category: "sach",
        params: {price, paid}
      };
    }
    let start = rand(8, 14);
    let startMin = [0, 15, 30, 45][rand(0, 3)];
    let dauerH = rand(1, 3);
    let dauerMin = rand(0, 55);
    let endH = start + dauerH;
    let endMin = startMin + dauerMin;
    let endMinFormatted = (endMin % 60) < 10 ? '0' + (endMin % 60) : (endMin % 60);
    return {
      text: `${opBerechne}: Ankunftszeit (Start ${start}:${startMin < 10 ? '0'+startMin : startMin}, Dauer ${dauerH}h ${dauerMin}min)`,
      sol: `${endH}:${endMinFormatted}`,
      steps: generateSteps("sach_zeitdifferenz", {start, startMin, h: dauerH, min: dauerMin}, `${endH}:${endMinFormatted}`),
      category: "sach",
      params: {start, startMin, h: dauerH, min: dauerMin}
    };
  },

  prozent: (level) => {
    const type = rand(1, 7);
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    
    if (type === 1) {
      let g = rand(80, 400);
      let p = [10, 20, 25, 30, 50][rand(0, 4)];
      return {
        text: `${opBerechne}: ${p}% von ${g}`,
        sol: round2(g * p / 100),
        steps: generateSteps("prozent_prozentwert", {g, p}, round2(g * p / 100)),
        category: "prozent",
        params: {g, p}
      };
    }
    if (type === 2) {
      let price = rand(20, 200);
      let p = [10, 15, 20, 25, 30][rand(0, 4)];
      return {
        text: `${opBerechne}: Preis nach ${p}% Rabatt (${price} €)`,
        sol: round2(price * (100 - p) / 100),
        steps: generateSteps("prozent_rabatt", {price, p}, round2(price * (100 - p) / 100)),
        category: "prozent",
        params: {price, p}
      };
    }
    if (type === 3) {
      let w = rand(20, 150);
      let p = [10, 20, 25, 30, 40][rand(0, 4)];
      return {
        text: `${opErmittle}: Grundwert (${w} sind ${p}%)`,
        sol: round2(w * 100 / p),
        steps: generateSteps("prozent_grundwert", {w, p}, round2(w * 100 / p)),
        category: "prozent",
        params: {w, p}
      };
    }
    if (type === 4) {
      let g = rand(100, 400);
      let diff = rand(10, 80);
      let newVal = g + diff;
      return {
        text: `${opErmittle}: Prozentuale Steigerung (${g} € auf ${newVal} €)`,
        sol: round2((diff / g) * 100),
        steps: generateSteps("prozent_steigerung", {g, diff, newVal}, round2((diff / g) * 100)),
        category: "prozent",
        params: {g, diff, newVal}
      };
    }
    if (type === 5) {
      let w = rand(20, 150);
      let g = rand(50, 300);
      if (w > g) [w, g] = [g, w];
      return {
        text: `${opErmittle}: Prozentsatz (${w} von ${g})`,
        sol: round2((w / g) * 100),
        steps: generateSteps("prozent_prozentsatz", {w, g}, round2((w / g) * 100)),
        category: "prozent",
        params: {w, g}
      };
    }
    if (type === 6) {
      let netto = rand(50, 300);
      return {
        text: `${opBerechne}: Bruttopreis (netto ${netto} €, 19% MwSt)`,
        sol: round2(netto * 1.19),
        steps: generateSteps("prozent_mehrwertsteuer", {netto, p: 19}, round2(netto * 1.19)),
        category: "prozent",
        params: {netto, p: 19}
      };
    }
    let betrag = rand(200, 800);
    let p = [2, 3][rand(0, 1)];
    return {
      text: `${opBerechne}: Zahlungsbetrag (${betrag} €, ${p}% Skonto)`,
      sol: round2(betrag * (1 - p/100)),
      steps: generateSteps("prozent_skonto", {betrag, p}, round2(betrag * (1 - p/100))),
      category: "prozent",
      params: {betrag, p}
    };
  },

  zuordnung: (level) => {
    const type = rand(1, 2);
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    
    if (type === 1) {
      let x1 = rand(2, 8);
      let y1 = rand(10, 50);
      let x2 = rand(3, 12);
      return {
        text: `${opErmittle}: Proportionaler Wert (${x1} → ${y1}, ${x2} → ?)`,
        sol: round2(x2 * y1 / x1),
        steps: generateSteps("zuordnung_proportional", {x1, y1, x2}, round2(x2 * y1 / x1)),
        category: "zuordnung",
        params: {x1, y1, x2}
      };
    }
    let x1 = rand(2, 6);
    let y1 = rand(8, 20);
    let x2 = x1 + rand(1, 4);
    return {
      text: `${opErmittle}: Antiproportionaler Wert (${x1} → ${y1}, ${x2} → ?)`,
      sol: round2(x1 * y1 / x2),
      steps: generateSteps("zuordnung_antiproportional", {x1, y1, x2}, round2(x1 * y1 / x2)),
      category: "zuordnung",
      params: {x1, y1, x2}
    };
  },

  gleichung: (level) => {
    const type = rand(1, 3);
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    if (type === 1) {
      let a = rand(5, 30);
      let sum = rand(20, 70);
      return {
        text: `${opBerechne}: x + ${a} = ${sum}`,
        sol: sum - a,
        steps: generateSteps("gleichung_einfach", {a, sum}, sum - a),
        category: "gleichung",
        params: {a, sum}
      };
    }
    if (type === 2) {
      let b = rand(10, 50);
      return {
        text: `${opBerechne}: 2x = ${b}`,
        sol: b / 2,
        steps: generateSteps("gleichung_2x", {b}, b / 2),
        category: "gleichung",
        params: {b}
      };
    }
    let faktor = rand(2, 5);
    let k = rand(2, 10);
    let erg = faktor * (k + rand(3, 12));
    return {
      text: `${opBerechne}: ${faktor} · (x + ${k}) = ${erg}`,
      sol: erg / faktor - k,
      steps: generateSteps("gleichung_klammer", {faktor, k, erg}, erg / faktor - k),
      category: "gleichung",
      params: {faktor, k, erg}
    };
  },

  wsk: (level) => {
    const type = rand(1, 2);
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    if (type === 1) {
      let gunstig = rand(1, 5);
      let moglich = rand(6, 12);
      return {
        text: `${opBerechne}: Wahrscheinlichkeit in % (${gunstig} von ${moglich})`,
        sol: round2(gunstig / moglich * 100),
        steps: generateSteps("wsk_einfach", {gunstig, moglich}, round2(gunstig / moglich * 100)),
        category: "wsk",
        params: {gunstig, moglich}
      };
    }
    let p1 = 1/6;
    let p2 = 1/6;
    return {
      text: `${opBerechne}: Wahrscheinlichkeit zweimal 6 (Würfel) in %`,
      sol: round2(p1 * p2 * 100),
      steps: generateSteps("wsk_mehrstufig_mit_zurueck", {p1, p2}, round2(p1 * p2 * 100)),
      category: "wsk",
      params: {p1, p2}
    };
  },

  diagramm: (level) => {
    const opZeichne = getOperatorPhraseBasis("ZEICHNE");
    let wert = rand(20, 80);
    let scale = rand(5, 15);
    return {
      text: `${opZeichne}: Säulendiagramm - Höhe für ${wert} (Maßstab 1 cm = ${scale})`,
      sol: `${round2(wert / scale)} cm`,
      steps: generateSteps("diagramm_saeule", {wert, scale}, `${round2(wert / scale)} cm`),
      category: "diagramm",
      params: {wert, scale}
    };
  }
};

/* =========================================================
   EXPORT
========================================================= */
function getTask(config) {
  // Standard-Konfiguration
  const mode = config.mode || "trainer";
  const level = config.level || "bbr";
  const useStars = config.stars || false;
  const index = config.index || 0;
  
  // Kategorie zufällig auswählen
  let cat = pickCategoryWeighted();
  
  // Für die neuen Kategorien auch zufällig auswählen können
  const newCategories = ["quader_netz", "prisma_netz", "zylinder_skizze", "werkstueck", "transport_kartons", "rampe_volumen"];
  if (Math.random() < 0.2 && config.includeNewDiagrams !== false) {
    cat = newCategories[rand(0, newCategories.length - 1)];
  }
  
  // Aufgabe aus der entsprechenden Kategorie generieren
  let task = TASKS[cat] ? TASKS[cat](level) : TASKS.rechnen(level);
  
  // Kategorie setzen (falls nicht schon vorhanden)
  task.category = cat;
  
  // Stern-Aufgaben für BBR (optional)
  task.star = (level === "bbr" && useStars && Math.random() > 0.5);
  
  return task;
}

function formatSteps(stepArray, solution) {
  if (!stepArray || !Array.isArray(stepArray)) {
    return "Keine Schritt-für-Schritt-Lösung verfügbar.";
  }
  
  let html = "";
  stepArray.forEach((line, i) => {
    html += `Schritt ${i + 1}: ${line}<br>`;
  });
  html += `<br><b>Ergebnis: ${solution}</b>`;
  return html;
}

// Globale Bereitstellung für Browser
if (typeof window !== "undefined") {
  window.getTask = getTask;
  window.formatSteps = formatSteps;
  window.TASKS = TASKS;
  window.rand = rand;
  window.round2 = round2;
}

// Für Module-Export (falls benötigt)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getTask, formatSteps, TASKS };
}
