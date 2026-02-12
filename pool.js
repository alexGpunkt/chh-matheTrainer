/* =========================================================
   ZENTRALE POOL.JS
   Für 5.7 (Trainer) und 10.1 (Prüfung)
   Enthält ALLE Aufgaben + Generatorlogik + Lösungsschritte
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

    // ---------------------- EINHEITEN ----------------------
    case "einheiten_m_cm":
      return [
        `1 m = 100 cm`,
        `${params.m} · 100 = ${params.m * 100} cm`
      ];
    case "einheiten_cm_m":
      return [
        `100 cm = 1 m`,
        `${params.cm} : 100 = ${round2(params.cm / 100)} m`
      ];
    case "einheiten_kg_g":
      return [
        `1 kg = 1000 g`,
        `${params.kg} · 1000 = ${params.kg * 1000} g`
      ];
    case "einheiten_g_kg":
      return [
        `1000 g = 1 kg`,
        `${params.g} : 1000 = ${round2(params.g / 1000)} kg`
      ];
    case "einheiten_min_h":
      return [
        `60 min = 1 h`,
        `${params.mins} : 60 = ${round2(params.mins / 60)} h`
      ];

    // ---------------------- GEOMETRIE ----------------------
    case "geometrie_quadrat_umfang":
      return [
        `Formel Umfang Quadrat: U = 4 · a`,
        `Einsetzen: 4 · ${params.a}`,
        `Ausrechnen: ${4 * params.a} cm`
      ];
    case "geometrie_quadrat_flaeche":
      return [
        `Formel Fläche Quadrat: A = a · a`,
        `Einsetzen: ${params.a} · ${params.a}`,
        `Ausrechnen: ${params.a * params.a} cm²`
      ];
    case "geometrie_rechteck_umfang":
      return [
        `Formel Umfang Rechteck: U = 2 · (l + b)`,
        `Einsetzen: 2 · (${params.l} + ${params.b})`,
        `Ausrechnen: ${2 * (params.l + params.b)} cm`
      ];
    case "geometrie_rechteck_flaeche":
      return [
        `Formel Fläche Rechteck: A = l · b`,
        `Einsetzen: ${params.l} · ${params.b}`,
        `Ausrechnen: ${params.l * params.b} cm²`
      ];
    case "geometrie_dreieck_flaeche":
      return [
        `Formel Fläche Dreieck: A = (g · h) : 2`,
        `Einsetzen: (${params.g} · ${params.h}) : 2`,
        `Ausrechnen: ${round2((params.g * params.h) / 2)} cm²`
      ];
    case "geometrie_kreis_durchmesser":
      return [
        `Formel Durchmesser: d = 2 · r`,
        `Einsetzen: 2 · ${params.r}`,
        `Ausrechnen: ${2 * params.r} cm`
      ];

    // ---------------------- SACHAUFGABEN ----------------------
    case "sach_einkauf":
      return [
        `Preis pro Stück: ${params.price} €`,
        `Anzahl: ${params.amount}`,
        `Gesamtpreis: ${params.amount} · ${params.price} = ${params.price * params.amount} €`
      ];
    case "sach_geschwindigkeit":
      return [
        `Formel: v = s : t`,
        `Einsetzen: ${params.km} : ${params.h}`,
        `Geschwindigkeit: ${round2(params.km / params.h)} km/h`
      ];
    case "sach_seiten_pro_tag":
      return [
        `Gesamtseiten: ${params.pages}`,
        `Tage: ${params.days}`,
        `Pro Tag: ${params.pages} : ${params.days} = ${round2(params.pages / params.days)} Seiten`
      ];
    case "sach_zeit":
      return [
        `${params.km * params.factor} km = ${params.factor} · ${params.km} km`,
        `Zeit proportional: ${params.factor} · ${params.min}`,
        `${params.min * params.factor} Minuten`
      ];
    case "sach_tickets":
      return [
        `Bezahlt: ${params.paid} €`,
        `Preis pro Ticket: ${params.price} €`,
        `Anzahl: ${params.paid} : ${params.price} = ${round2(params.paid / params.price)}`
      ];

    // ---------------------- PROZENTRECHNUNG ----------------------
    case "prozent_prozentwert":
      return [
        `Formel: W = G · p / 100`,
        `Einsetzen: ${params.g} · ${params.p} / 100`,
        `Ausrechnen: ${round2(params.g * params.p / 100)}`
      ];
    case "prozent_rabatt":
      return [
        `Zahlungsanteil: 100% − ${params.p}% = ${100 - params.p}%`,
        `Formel: ${params.price} · ${100 - params.p} / 100`,
        `Ausrechnen: ${round2(params.price * (100 - params.p) / 100)} €`
      ];
    case "prozent_grundwert":
      return [
        `Formel: G = W · 100 / p`,
        `Einsetzen: ${params.w} · 100 / ${params.p}`,
        `Ausrechnen: ${round2(params.w * 100 / params.p)}`
      ];
    case "prozent_steigerung":
      return [
        `Zunahme: ${params.newVal} − ${params.g} = ${params.diff}`,
        `Formel: p = (Zunahme / Grundwert) · 100`,
        `(${params.diff} / ${params.g}) · 100 = ${round2((params.diff / params.g) * 100)}%`
      ];
    case "prozent_prozentsatz":
      return [
        `Formel: p = (W / G) · 100`,
        `Einsetzen: (${params.w} / ${params.g}) · 100`,
        `Ausrechnen: ${round2((params.w / params.g) * 100)}%`
      ];

    // ---------------------- STERNAUFGABEN ----------------------
    case "star_rabattkette":
      return [
        `1. Rabatt: 20% → Zahlungsanteil 80%`,
        `${params.g} · 0,8 = ${params.g * 0.8} €`,
        `2. Rabatt: 10% → Zahlungsanteil 90%`,
        `${round2(params.g * 0.8)} · 0,9 = ${round2(params.g * 0.8 * 0.9)} €`
      ];
    case "star_dreieck":
      return [
        `Formel Fläche Dreieck: A = (g · h) : 2`,
        `Einsetzen: (${params.g} · ${params.h}) : 2`,
        `Ausrechnen: ${round2(params.g * params.h / 2)} cm²`
      ];
    case "star_zeit_pro_km":
      return [
        `${params.km} km → ${params.min} Minuten`,
        `Pro km: ${params.min} : ${params.km} = ${round2(params.min / params.km)} Minuten`
      ];
    case "star_klammern":
      return [
        `Klammer zuerst: (${params.a} + ${params.b}) = ${params.a + params.b}`,
        `Multiplizieren: ${params.a + params.b} · ${params.c} = ${(params.a + params.b) * params.c}`,
        `Subtrahieren: ${(params.a + params.b) * params.c} − ${params.a} = ${(params.a + params.b) * params.c - params.a}`
      ];
    case "star_rabatt_einfach":
      return [
        `Rabatt: ${params.p}% → Zahlungsanteil: ${100 - params.p}%`,
        `${params.price} · ${100 - params.p} / 100`,
        `Neuer Preis: ${round2(params.price * (100 - params.p) / 100)} €`
      ];
    case "star_flaechen":
      return [
        `Rechteckfläche: ${params.a} · ${params.b} = ${params.a * params.b} cm²`,
        `Quadratfläche: ${params.b} · ${params.b} = ${params.b * params.b} cm²`,
        `Gesamtfläche: ${params.a * params.b} + ${params.b * params.b} = ${(params.a * params.b) + (params.b * params.b)} cm²`
      ];

    default:
      return [`Rechnung durchführen`, `Ergebnis: ${solution}`];
  }
}

/* =========================================================
   KATEGORIEN & GEWICHTUNG
========================================================= */
const weightedCategories = [
  "rechnen", "rechnen", "rechnen",
  "einheiten", "einheiten",
  "geometrie", "geometrie",
  "sach", "sach",
  "prozent", "prozent"
];

function pickCategoryWeighted() {
  return weightedCategories[rand(0, weightedCategories.length - 1)];
}

/* =========================================================
   BASIS-AUFGABEN (BOA + BBR) mit Lösungsschritten
========================================================= */
const TASKS = {

  // ---------------------- RECHNEN ----------------------
  rechnen: (level) => {
    const type = rand(1, 5);
    
    // Multiplikation
    if (type === 1) {
      let a = level === "boa" ? rand(10, 70) : rand(20, 200);
      let b = level === "boa" ? rand(2, 10) : rand(3, 25);
      let sol = a * b;
      return {
        text: `Berechne: ${a} · ${b}`,
        sol: sol,
        steps: generateSteps("rechnen_multiplikation", {a, b}, sol),
        stepType: "rechnen_multiplikation",
        params: {a, b}
      };
    }
    
    // Division
    if (type === 2) {
      let b = level === "boa" ? rand(2, 9) : rand(3, 12);
      let ans = level === "boa" ? rand(5, 40) : rand(10, 100);
      let a = ans * b;
      return {
        text: `Berechne: ${a} : ${b}`,
        sol: ans,
        steps: generateSteps("rechnen_division", {a, b, ans}, ans),
        stepType: "rechnen_division",
        params: {a, b, ans}
      };
    }
    
    // Addition
    if (type === 3) {
      let a = level === "boa" ? rand(50, 300) : rand(200, 1200);
      let b = level === "boa" ? rand(10, 180) : rand(50, 900);
      let sol = a + b;
      return {
        text: `Berechne: ${a} + ${b}`,
        sol: sol,
        steps: generateSteps("rechnen_addition", {a, b}, sol),
        stepType: "rechnen_addition",
        params: {a, b}
      };
    }
    
    // Subtraktion
    if (type === 4) {
      let a = level === "boa" ? rand(50, 300) : rand(200, 1200);
      let b = level === "boa" ? rand(10, 180) : rand(50, 900);
      if (b > a) [a, b] = [b, a];
      let sol = a - b;
      return {
        text: `Berechne: ${a} − ${b}`,
        sol: sol,
        steps: generateSteps("rechnen_subtraktion", {a, b}, sol),
        stepType: "rechnen_subtraktion",
        params: {a, b}
      };
    }
    
    // Punkt-vor-Strich
    let a = level === "boa" ? rand(20, 80) : rand(60, 180);
    let b = level === "boa" ? rand(2, 7) : rand(3, 12);
    let c = level === "boa" ? rand(2, 6) : rand(3, 10);
    let sol = a - b * c;
    return {
      text: `Berechne: ${a} − ${b} · ${c}`,
      sol: sol,
      steps: generateSteps("rechnen_punktvorstrich", {a, b, c}, sol),
      stepType: "rechnen_punktvorstrich",
      params: {a, b, c}
    };
  },

  // ---------------------- EINHEITEN ----------------------
  einheiten: (level) => {
    const type = rand(1, 5);
    
    // m → cm
    if (type === 1) {
      let m = level === "boa" ? rand(1, 12) : rand(2, 35);
      let sol = m * 100;
      return {
        text: `Rechne um: ${m} m = ? cm`,
        sol: sol,
        steps: generateSteps("einheiten_m_cm", {m}, sol),
        stepType: "einheiten_m_cm",
        params: {m}
      };
    }
    
    // cm → m
    if (type === 2) {
      let cm = level === "boa" ? rand(100, 1200) : rand(250, 5000);
      let sol = round2(cm / 100);
      return {
        text: `Rechne um: ${cm} cm = ? m`,
        sol: sol,
        steps: generateSteps("einheiten_cm_m", {cm}, sol),
        stepType: "einheiten_cm_m",
        params: {cm}
      };
    }
    
    // kg → g
    if (type === 3) {
      let kg = level === "boa" ? rand(1, 8) : rand(2, 20);
      let sol = kg * 1000;
      return {
        text: `Rechne um: ${kg} kg = ? g`,
        sol: sol,
        steps: generateSteps("einheiten_kg_g", {kg}, sol),
        stepType: "einheiten_kg_g",
        params: {kg}
      };
    }
    
    // g → kg
    if (type === 4) {
      let g = level === "boa" ? rand(500, 3000) : rand(1000, 8000);
      let sol = round2(g / 1000);
      return {
        text: `Rechne um: ${g} g = ? kg`,
        sol: sol,
        steps: generateSteps("einheiten_g_kg", {g}, sol),
        stepType: "einheiten_g_kg",
        params: {g}
      };
    }
    
    // min → h
    let mins = level === "boa" 
      ? [60, 90, 120, 150, 180][rand(0, 4)]
      : [75, 105, 135, 165, 195, 225, 255, 285][rand(0, 7)];
    let sol = round2(mins / 60);
    return {
      text: `Rechne um: ${mins} min = ? h`,
      sol: sol,
      steps: generateSteps("einheiten_min_h", {mins}, sol),
      stepType: "einheiten_min_h",
      params: {mins}
    };
  },

  // ---------------------- GEOMETRIE ----------------------
  geometrie: (level) => {
    const type = rand(1, 6);
    
    // Quadrat Umfang
    if (type === 1) {
      let a = level === "boa" ? rand(2, 12) : rand(4, 25);
      let sol = 4 * a;
      return {
        text: `Quadrat: Seite ${a} cm → Umfang?`,
        sol: sol,
        steps: generateSteps("geometrie_quadrat_umfang", {a}, sol),
        stepType: "geometrie_quadrat_umfang",
        params: {a}
      };
    }
    
    // Quadrat Fläche
    if (type === 2) {
      let a = level === "boa" ? rand(2, 12) : rand(4, 20);
      let sol = a * a;
      return {
        text: `Quadrat: Seite ${a} cm → Fläche?`,
        sol: sol,
        steps: generateSteps("geometrie_quadrat_flaeche", {a}, sol),
        stepType: "geometrie_quadrat_flaeche",
        params: {a}
      };
    }
    
    // Rechteck Umfang
    if (type === 3) {
      let l = level === "boa" ? rand(3, 18) : rand(6, 35);
      let b = level === "boa" ? rand(2, 14) : rand(4, 28);
      let sol = 2 * (l + b);
      return {
        text: `Rechteck: ${l} cm × ${b} cm → Umfang?`,
        sol: sol,
        steps: generateSteps("geometrie_rechteck_umfang", {l, b}, sol),
        stepType: "geometrie_rechteck_umfang",
        params: {l, b}
      };
    }
    
    // Rechteck Fläche
    if (type === 4) {
      let l = level === "boa" ? rand(3, 18) : rand(6, 35);
      let b = level === "boa" ? rand(2, 14) : rand(4, 28);
      let sol = l * b;
      return {
        text: `Rechteck: ${l} cm × ${b} cm → Fläche?`,
        sol: sol,
        steps: generateSteps("geometrie_rechteck_flaeche", {l, b}, sol),
        stepType: "geometrie_rechteck_flaeche",
        params: {l, b}
      };
    }
    
    // Dreieck Fläche
    if (type === 5) {
      let g = level === "boa" ? rand(4, 20) : rand(8, 40);
      let h = level === "boa" ? rand(3, 15) : rand(6, 30);
      let sol = round2((g * h) / 2);
      return {
        text: `Dreieck: Grundseite ${g} cm, Höhe ${h} cm → Fläche?`,
        sol: sol,
        steps: generateSteps("geometrie_dreieck_flaeche", {g, h}, sol),
        stepType: "geometrie_dreieck_flaeche",
        params: {g, h}
      };
    }
    
    // Kreis Durchmesser
    let r = level === "boa" ? rand(2, 10) : rand(3, 20);
    let sol = 2 * r;
    return {
      text: `Kreis: Radius ${r} cm → Durchmesser?`,
      sol: sol,
      steps: generateSteps("geometrie_kreis_durchmesser", {r}, sol),
      stepType: "geometrie_kreis_durchmesser",
      params: {r}
    };
  },

  // ---------------------- SACHAUFGABEN ----------------------
  sach: (level) => {
    const type = rand(1, 5);
    
    // Einkauf
    if (type === 1) {
      let price = level === "boa" ? rand(1, 5) : rand(2, 9);
      let amount = level === "boa" ? rand(2, 10) : rand(4, 18);
      let sol = price * amount;
      return {
        text: `${amount} Artikel kosten je ${price} €. Gesamtpreis?`,
        sol: sol,
        steps: generateSteps("sach_einkauf", {price, amount}, sol),
        stepType: "sach_einkauf",
        params: {price, amount}
      };
    }
    
    // Geschwindigkeit
    if (type === 2) {
      let km = level === "boa" ? rand(30, 200) : rand(80, 420);
      let h = level === "boa" ? rand(1, 5) : rand(2, 7);
      let sol = round2(km / h);
      return {
        text: `Ein Auto fährt ${km} km in ${h} h. Geschwindigkeit?`,
        sol: sol,
        steps: generateSteps("sach_geschwindigkeit", {km, h}, sol),
        stepType: "sach_geschwindigkeit",
        params: {km, h}
      };
    }
    
    // Seiten pro Tag
    if (type === 3) {
      let pages = level === "boa" ? rand(30, 120) : rand(80, 300);
      let days = level === "boa" ? rand(2, 8) : rand(3, 14);
      let sol = round2(pages / days);
      return {
        text: `${pages} Seiten in ${days} Tagen. Wie viele Seiten pro Tag?`,
        sol: sol,
        steps: generateSteps("sach_seiten_pro_tag", {pages, days}, sol),
        stepType: "sach_seiten_pro_tag",
        params: {pages, days}
      };
    }
    
    // Zeit
    if (type === 4) {
      let km = level === "boa" ? rand(20, 120) : rand(60, 300);
      let min = level === "boa" ? rand(10, 40) : rand(15, 60);
      let factor = level === "boa" ? 2 : rand(2, 4);
      let sol = min * factor;
      return {
        text: `Ein Bus fährt ${km} km in ${min} Minuten. Wie lange für ${km * factor} km?`,
        sol: sol,
        steps: generateSteps("sach_zeit", {km, min, factor}, sol),
        stepType: "sach_zeit",
        params: {km, min, factor}
      };
    }
    
    // Tickets
    let price = level === "boa" ? rand(2, 6) : rand(5, 15);
    let paid = level === "boa" ? rand(10, 50) : rand(20, 120);
    let sol = round2(paid / price);
    return {
      text: `Ein Ticket kostet ${price} €. Du bezahlst ${paid} €. Wie viele Tickets?`,
      sol: sol,
      steps: generateSteps("sach_tickets", {price, paid}, sol),
      stepType: "sach_tickets",
      params: {price, paid}
    };
  },

  // ---------------------- PROZENTRECHNUNG ----------------------
  prozent: (level) => {
    const type = rand(1, 5);
    
    // Prozentwert
    if (type === 1) {
      let g = level === "boa" ? rand(80, 250) : rand(120, 600);
      let p = level === "boa" 
        ? [10, 20, 25, 50][rand(0, 3)] 
        : rand(10, 40);
      let sol = round2(g * p / 100);
      return {
        text: `Berechne ${p}% von ${g}.`,
        sol: sol,
        steps: generateSteps("prozent_prozentwert", {g, p}, sol),
        stepType: "prozent_prozentwert",
        params: {g, p}
      };
    }
    
    // Rabatt
    if (type === 2) {
      let price = level === "boa" ? rand(20, 180) : rand(50, 450);
      let p = level === "boa" 
        ? [10, 20, 25][rand(0, 2)] 
        : [10, 15, 20, 25, 30][rand(0, 4)];
      let sol = round2(price * (100 - p) / 100);
      return {
        text: `${p}% Rabatt auf ${price} €. Neuer Preis?`,
        sol: sol,
        steps: generateSteps("prozent_rabatt", {price, p}, sol),
        stepType: "prozent_rabatt",
        params: {price, p}
      };
    }
    
    // Grundwert
    if (type === 3) {
      let w = level === "boa" ? rand(20, 120) : rand(40, 250);
      let p = level === "boa" 
        ? [10, 20, 25, 50][rand(0, 3)] 
        : rand(5, 60);
      let sol = round2(w * 100 / p);
      return {
        text: `${w} ist ${p}%. Wie groß ist der Grundwert?`,
        sol: sol,
        steps: generateSteps("prozent_grundwert", {w, p}, sol),
        stepType: "prozent_grundwert",
        params: {w, p}
      };
    }
    
    // Prozentuale Steigerung
    if (type === 4) {
      let g = level === "boa" ? rand(100, 300) : rand(150, 700);
      let diff = level === "boa" ? rand(10, 80) : rand(20, 200);
      let newVal = g + diff;
      let sol = round2((diff / g) * 100);
      return {
        text: `Der Preis steigt von ${g} € auf ${newVal} €. Wie viel Prozent?`,
        sol: sol,
        steps: generateSteps("prozent_steigerung", {g, diff, newVal}, sol),
        stepType: "prozent_steigerung",
        params: {g, diff, newVal}
      };
    }
    
    // Prozentsatz
    let w = level === "boa" ? rand(15, 90) : rand(30, 240);
    let g = level === "boa" ? rand(50, 200) : rand(100, 400);
    if (w > g) [w, g] = [g, w];
    let sol = round2((w / g) * 100);
    return {
      text: `Wie viel Prozent sind ${w} von ${g}?`,
      sol: sol,
      steps: generateSteps("prozent_prozentsatz", {w, g}, sol),
      stepType: "prozent_prozentsatz",
      params: {w, g}
    };
  }
};

/* =========================================================
   STERN-AUFGABEN (nur BBR, ab Aufgabe 7) mit Lösungsschritten
========================================================= */
function starTask() {
  const type = rand(1, 6);
  
  // Rabattkette
  if (type === 1) {
    const g = rand(200, 400);
    const sol = round2(g * 0.8 * 0.9);
    return {
      text: `⭐ Ein Artikel kostet ${g} €.
20% Rabatt, danach 10% Rabatt.
Berechne den Endpreis.`,
      sol: sol,
      steps: generateSteps("star_rabattkette", {g}, sol),
      stepType: "star_rabattkette",
      params: {g},
      star: true
    };
  }
  
  // Dreieck Fläche
  if (type === 2) {
    const g = rand(6, 12);
    const h = rand(4, 8);
    const sol = round2(g * h / 2);
    return {
      text: `⭐ Dreieck mit Grundseite ${g} cm und Höhe ${h} cm.
Berechne den Flächeninhalt.`,
      sol: sol,
      steps: generateSteps("star_dreieck", {g, h}, sol),
      stepType: "star_dreieck",
      params: {g, h},
      star: true
    };
  }
  
  // Zeit pro km
  if (type === 3) {
    const km = rand(30, 50);
    const min = rand(20, 40);
    const sol = round2(min / km);
    return {
      text: `⭐ Ein Auto fährt ${km} km in ${min} Minuten.
Wie viele Minuten pro km?`,
      sol: sol,
      steps: generateSteps("star_zeit_pro_km", {km, min}, sol),
      stepType: "star_zeit_pro_km",
      params: {km, min},
      star: true
    };
  }
  
  // Klammern mit Subtraktion
  if (type === 4) {
    const a = rand(10, 30);
    const b = rand(5, 15);
    const c = rand(2, 8);
    const sol = (a + b) * c - a;
    return {
      text: `⭐ Berechne: (${a} + ${b}) × ${c} − ${a}`,
      sol: sol,
      steps: generateSteps("star_klammern", {a, b, c}, sol),
      stepType: "star_klammern",
      params: {a, b, c},
      star: true
    };
  }
  
  // Rabatt einfach
  if (type === 5) {
    const price = rand(50, 150);
    const p = rand(15, 30);
    const sol = round2(price * (100 - p) / 100);
    return {
      text: `⭐ Ein Artikel kostet ${price} €, erhält ${p}% Rabatt.
Berechne den neuen Preis.`,
      sol: sol,
      steps: generateSteps("star_rabatt_einfach", {price, p}, sol),
      stepType: "star_rabatt_einfach",
      params: {price, p},
      star: true
    };
  }
  
  // Zusammengesetzte Fläche
  const a = rand(5, 10);
  const b = rand(3, 7);
  const sol = (a * b) + (b * b);
  return {
    text: `⭐ Ein Rechteck (${a} cm × ${b} cm) und ein Quadrat (Seite ${b} cm).
Berechne die Gesamtfläche.`,
    sol: sol,
    steps: generateSteps("star_flaechen", {a, b}, sol),
    stepType: "star_flaechen",
    params: {a, b},
    star: true
  };
}

/* =========================================================
   ZENTRALE TASK-FUNKTION
   Wird von 5.7.html und 10.1.html aufgerufen
========================================================= */
function getTask(config) {
  const { mode, level, stars, index } = config;
  
  // PRÜFUNGSMODUS: Stern-Aufgaben nur für BBR ab Aufgabe 7
  if (mode === "exam" && level === "bbr" && stars === true && index >= 6) {
    return starTask();
  }
  
  // TRAINERMODUS oder normale Prüfungsaufgaben
  const cat = pickCategoryWeighted();
  const task = TASKS[cat](level);
  task.star = false;
  task.category = cat;
  
  return task;
}

/* =========================================================
   HILFSFUNKTION FÜR 5.7.HTML
   Formatiert Lösungsschritte für Anzeige
========================================================= */
function formatSteps(stepArray, solution) {
  let html = "";
  stepArray.forEach((line, i) => {
    html += `Schritt ${i + 1}: ${line}<br>`;
  });
  html += `<br><b>Ergebnis: ${solution}</b>`;
  return html;
}

/* =========================================================
   EXPORT (für modulare Nutzung)
   Im Browser einfach global verfügbar
========================================================= */
// Alles ist bereits global definiert
