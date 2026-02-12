/* =========================================================
   ZENTRALE POOL.JS (Erweitert)
   BBR-Niveau Berlin - Ergänzt um 2 Aufgaben pro Kategorie
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
  ERMITTLE: ["ermittle"]
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
    // ----- RECHNEN -----
    case "rechnen_multiplikation":
      return [`Multiplikation: ${params.a} · ${params.b}`, `Ergebnis: ${params.a * params.b}`];
    case "rechnen_division":
      return [`Division: ${params.a} : ${params.b}`, `Ergebnis: ${params.ans}`];
    case "rechnen_addition":
      return [`Addition: ${params.a} + ${params.b}`, `Ergebnis: ${params.a + params.b}`];
    case "rechnen_subtraktion":
      return [`Subtraktion: ${params.a} − ${params.b}`, `Ergebnis: ${params.a - params.b}`];
    case "rechnen_punktvorstrich":
      return [`Punkt-vor-Strich: zuerst ${params.b} · ${params.c} = ${params.b * params.c}`, 
              `Dann: ${params.a} − ${params.b * params.c}`, 
              `Ergebnis: ${params.a - params.b * params.c}`];
    case "rechnen_quadrat":
      return [`Quadratzahl: ${params.a}² = ${params.a} · ${params.a}`, `Ergebnis: ${params.a * params.a}`];
    case "rechnen_ergaenzen":
      return [`Rechnung: ${params.target} − ${params.a}`, `Ergebnis: ${params.target - params.a}`];
    case "rechnen_halbe":
      return [`Rechnung: ${params.a} : 2`, `Ergebnis: ${params.a / 2}`];

    // ----- EINHEITEN -----
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
    case "einheiten_l_ml":
      return [`1 l = 1000 ml`, `${params.l} · 1000 = ${params.l * 1000} ml`];
    case "einheiten_t_kg":
      return [`1 t = 1000 kg`, `${params.t} · 1000 = ${params.t * 1000} kg`];

    // ----- GEOMETRIE -----
    case "geometrie_quadrat_umfang":
      return [`Formel: U = 4 · a`, `4 · ${params.a} = ${4 * params.a} cm`];
    case "geometrie_quadrat_flaeche":
      return [`Formel: A = a · a`, `${params.a} · ${params.a} = ${params.a * params.a} cm²`];
    case "geometrie_rechteck_umfang":
      return [`Formel: U = 2 · (l + b)`, `2 · (${params.l} + ${params.b}) = ${2 * (params.l + params.b)} cm`];
    case "geometrie_rechteck_flaeche":
      return [`Formel: A = l · b`, `${params.l} · ${params.b} = ${params.l * params.b} cm²`];
    case "geometrie_dreieck_flaeche":
      return [`Formel: A = (g · h) : 2`, `(${params.g} · ${params.h}) : 2 = ${round2((params.g * params.h) / 2)} cm²`];
    case "geometrie_wuerfel_volumen":
      return [`Formel: V = a · a · a`, `${params.a} · ${params.a} · ${params.a} = ${params.a * params.a * params.a} cm³`];
    case "geometrie_quader_volumen":
      return [`Formel: V = l · b · h`, `${params.l} · ${params.b} · ${params.h} = ${params.l * params.b * params.h} cm³`];
    case "geometrie_quader_oberflaeche":
      return [`Formel: O = 2·(l·b + l·h + b·h)`, `2 · (${params.l}·${params.b} + ${params.l}·${params.h} + ${params.b}·${params.h})`, `Ergebnis: ${2 * (params.l * params.b + params.l * params.h + params.b * params.h)} cm²`];
    case "geometrie_parallelogramm_flaeche":
      return [`Formel: A = g · h`, `${params.g} · ${params.h} = ${params.g * params.h} cm²`];

    // ----- SACHAUFGABEN -----
    case "sach_einkauf":
      return [`Preis pro Stück: ${params.price} €`, `Anzahl: ${params.amount}`, 
              `Gesamtpreis: ${params.amount} · ${params.price} = ${params.price * params.amount} €`];
    case "sach_geschwindigkeit":
      return [`Formel: v = s : t`, `${params.km} km : ${params.h} h = ${round2(params.km / params.h)} km/h`];
    case "sach_seiten_pro_tag":
      return [`Gesamtseiten: ${params.pages}`, `Tage: ${params.days}`, 
              `Pro Tag: ${params.pages} : ${params.days} = ${round2(params.pages / params.days)} Seiten`];
    case "sach_zeit":
      return [`${params.km * params.factor} km = ${params.factor} · ${params.km} km`, 
              `Zeit: ${params.factor} · ${params.min} = ${params.min * params.factor} Minuten`];
    case "sach_tickets":
      return [`Bezahlt: ${params.paid} €`, `Preis pro Ticket: ${params.price} €`, 
              `Anzahl: ${params.paid} : ${params.price} = ${round2(params.paid / params.price)}`];
    case "sach_durchschnitt":
      return [`Summe: ${params.v1} + ${params.v2} + ${params.v3} = ${params.v1 + params.v2 + params.v3}`, 
              `Durchschnitt: ${params.v1 + params.v2 + params.v3} : 3 = ${round2((params.v1 + params.v2 + params.v3) / 3)}`];
    case "sach_wechselgeld":
      return [`Gesamtpreis: ${params.amount} · ${params.price} = ${params.total} €`, `Wechselgeld: ${params.bill} − ${params.total} = ${params.bill - params.total} €`];
    case "sach_verteilen":
      return [`Gesamt: ${params.total}`, `Teile: ${params.parts}`, `Ergebnis: ${params.total / params.parts}`];

    // ----- PROZENTRECHNUNG -----
    case "prozent_prozentwert":
      return [`Formel: W = G · p / 100`, `${params.g} · ${params.p} / 100 = ${round2(params.g * params.p / 100)}`];
    case "prozent_rabatt":
      return [`Zahlungsanteil: 100% − ${params.p}% = ${100 - params.p}%`, 
              `${params.price} · ${100 - params.p} / 100 = ${round2(params.price * (100 - params.p) / 100)} €`];
    case "prozent_grundwert":
      return [`Formel: G = W · 100 / p`, `${params.w} · 100 / ${params.p} = ${round2(params.w * 100 / params.p)}`];
    case "prozent_steigerung":
      return [`Zunahme: ${params.newVal} − ${params.g} = ${params.diff}`, 
              `p = (Zunahme / Grundwert) · 100`, 
              `(${params.diff} / ${params.g}) · 100 = ${round2((params.diff / params.g) * 100)}%`];
    case "prozent_prozentsatz":
      return [`Formel: p = (W / G) · 100`, `(${params.w} / ${params.g}) · 100 = ${round2((params.w / params.g) * 100)}%`];
    case "prozent_mehrwertsteuer":
      return [`Brutto = Netto · (1 + p/100)`, `${params.netto} · 1,${params.p} = ${round2(params.netto * (1 + params.p/100))} €`];
    case "prozent_anteil_bruch":
      return [`Bruch: ${params.zähler}/${params.nenner}`, `Rechnung: (${params.zähler} : ${params.nenner}) · 100`, `Ergebnis: ${round2((params.zähler / params.nenner) * 100)}%`];
    case "prozent_skonto":
      return [`Skonto: ${params.p}% von ${params.g} €`, `${params.g} · ${params.p / 100} = ${round2(params.g * (params.p / 100))} €`, `Endpreis: ${params.g} − ${round2(params.g * (params.p / 100))} €`];

    // ----- STERNAUFGABEN -----
    case "star_rabattkette":
      return [`1. Rabatt: 20% → Zahlungsanteil 80%`, `${params.g} · 0,8 = ${params.g * 0.8} €`, 
              `2. Rabatt: 10% → Zahlungsanteil 90%`, `${round2(params.g * 0.8)} · 0,9 = ${round2(params.g * 0.8 * 0.9)} €`];
    case "star_dreieck":
      return [`Formel: A = (g · h) : 2`, `(${params.g} · ${params.h}) : 2 = ${round2(params.g * params.h / 2)} cm²`];
    case "star_zeit_pro_km":
      return [`${params.km} km → ${params.min} Minuten`, `Pro km: ${params.min} : ${params.km} = ${round2(params.min / params.km)} Minuten`];
    case "star_klammern":
      return [`Klammer zuerst: (${params.a} + ${params.b}) = ${params.a + params.b}`, 
              `Multiplizieren: ${params.a + params.b} · ${params.c} = ${(params.a + params.b) * params.c}`, 
              `Subtrahieren: ${(params.a + params.b) * params.c} − ${params.a} = ${(params.a + params.b) * params.c - params.a}`];
    case "star_rabatt_einfach":
      return [`Rabatt: ${params.p}% → Zahlungsanteil: ${100 - params.p}%`, 
              `${params.price} · ${100 - params.p} / 100 = ${round2(params.price * (100 - params.p) / 100)} €`];
    case "star_zinsen":
      return [`Formel: Z = K · p / 100`, `${params.k} · ${params.p} / 100 = ${round2(params.k * params.p / 100)} €`];
    case "star_radius_aus_umfang":
      return [`Annahme: U = d · 3`, `Durchmesser d = ${params.u} : 3 = ${round2(params.u / 3)}`, `Radius r = d : 2 = ${round2(params.u / 6)} cm`];
    case "star_mischung":
      return [`Menge A: ${params.m1}l, Menge B: ${params.m2}l`, `Gesamt: ${params.m1 + params.m2}l`, `Konzentration: (${params.m1}·${params.p1} + ${params.m2}·${params.p2}) : ${params.m1 + params.m2}`, `Ergebnis: ${round2((params.m1 * params.p1 + params.m2 * params.p2) / (params.m1 + params.m2))}%`];

    default:
      return [`Rechnung durchführen`, `Ergebnis: ${solution}`];
  }
}

/* =========================================================
   KATEGORIEN
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
   BASIS-AUFGABEN
========================================================= */
const TASKS = {

  rechnen: (level) => {
    const type = rand(1, 8); // Von 6 auf 8 erhöht
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    
    if (type <= 6) {
        // ... (Existierende Typen 1-6 bleiben gleich)
        if (type === 1) {
            let a = level === "boa" ? rand(10, 70) : rand(20, 200);
            let b = level === "boa" ? rand(2, 10) : rand(3, 25);
            return { text: `${opBerechne}: ${a} · ${b}`, sol: a * b, steps: generateSteps("rechnen_multiplikation", {a, b}), stepType: "rechnen_multiplikation", params: {a, b} };
        }
        if (type === 2) {
            let b = level === "boa" ? rand(2, 9) : rand(3, 12);
            let ans = level === "boa" ? rand(5, 40) : rand(10, 100);
            let a = ans * b;
            return { text: `${opBerechne}: ${a} : ${b}`, sol: ans, steps: generateSteps("rechnen_division", {a, b, ans}), stepType: "rechnen_division", params: {a, b, ans} };
        }
        if (type === 3) {
            let a = level === "boa" ? rand(50, 300) : rand(200, 1200);
            let b = level === "boa" ? rand(10, 180) : rand(50, 900);
            return { text: `${opBerechne}: ${a} + ${b}`, sol: a + b, steps: generateSteps("rechnen_addition", {a, b}), stepType: "rechnen_addition", params: {a, b} };
        }
        if (type === 4) {
            let a = level === "boa" ? rand(50, 300) : rand(200, 1200);
            let b = level === "boa" ? rand(10, 180) : rand(50, 900);
            if (b > a) [a, b] = [b, a];
            return { text: `${opBerechne}: ${a} − ${b}`, sol: a - b, steps: generateSteps("rechnen_subtraktion", {a, b}), stepType: "rechnen_subtraktion", params: {a, b} };
        }
        if (type === 5) {
            let a = level === "boa" ? rand(20, 80) : rand(60, 180);
            let b = level === "boa" ? rand(2, 7) : rand(3, 12);
            let c = level === "boa" ? rand(2, 6) : rand(3, 10);
            return { text: `${opBerechne}: ${a} − ${b} · ${c}`, sol: a - b * c, steps: generateSteps("rechnen_punktvorstrich", {a, b, c}), stepType: "rechnen_punktvorstrich", params: {a, b, c} };
        }
        if (type === 6) {
            let a = level === "boa" ? rand(2, 12) : rand(11, 25);
            return { text: `${opBerechne}: Die Quadratzahl von ${a}`, sol: a * a, steps: generateSteps("rechnen_quadrat", {a}), stepType: "rechnen_quadrat", params: {a} };
        }
    }
    // NEU: Ergänzen
    if (type === 7) {
        let a = rand(15, 50);
        let target = rand(60, 100);
        return { text: `${opBerechne}: Wie viel fehlt von ${a} bis zur ${target}?`, sol: target - a, steps: generateSteps("rechnen_ergaenzen", {a, target}), stepType: "rechnen_ergaenzen", params: {a, target} };
    }
    // NEU: Halbe/Hälfte
    let a = rand(10, 50) * 2;
    return { text: `${opBerechne}: Die Hälfte von ${a}`, sol: a / 2, steps: generateSteps("rechnen_halbe", {a}), stepType: "rechnen_halbe", params: {a} };
  },

  einheiten: (level) => {
    const type = rand(1, 8); // Von 6 auf 8
    const opRechneUm = getOperatorPhraseBasis("RECHNE_UM");
    // ... (Typen 1-6 bleiben gleich wie im Original)
    if (type <= 6) {
        if (type === 1) { let m = level === "boa" ? rand(1, 12) : rand(2, 35); return { text: `${opRechneUm}: ${m} m in cm`, sol: m * 100, steps: generateSteps("einheiten_m_cm", {m}), stepType: "einheiten_m_cm", params: {m} }; }
        if (type === 2) { let cm = level === "boa" ? rand(100, 1200) : rand(250, 5000); return { text: `${opRechneUm}: ${cm} cm in m`, sol: round2(cm / 100), steps: generateSteps("einheiten_cm_m", {cm}), stepType: "einheiten_cm_m", params: {cm} }; }
        if (type === 3) { let kg = level === "boa" ? rand(1, 8) : rand(2, 20); return { text: `${opRechneUm}: ${kg} kg in g`, sol: kg * 1000, steps: generateSteps("einheiten_kg_g", {kg}), stepType: "einheiten_kg_g", params: {kg} }; }
        if (type === 4) { let g = level === "boa" ? rand(500, 3000) : rand(1000, 8000); return { text: `${opRechneUm}: ${g} g in kg`, sol: round2(g / 1000), steps: generateSteps("einheiten_g_kg", {g}), stepType: "einheiten_g_kg", params: {g} }; }
        if (type === 5) { let mins = level === "boa" ? [60, 90, 120, 150, 180][rand(0, 4)] : [75, 105, 135, 165, 195, 225, 255, 285][rand(0, 7)]; return { text: `${opRechneUm}: ${mins} min in h`, sol: round2(mins / 60), steps: generateSteps("einheiten_min_h", {mins}), stepType: "einheiten_min_h", params: {mins} }; }
        if (type === 6) { let km = level === "boa" ? rand(1, 5) : round2(rand(10, 50) / 10); return { text: `${opRechneUm}: ${km} km in m`, sol: km * 1000, steps: generateSteps("einheiten_km_m", {km}), stepType: "einheiten_km_m", params: {km} }; }
    }
    // NEU: Liter in ml
    if (type === 7) {
        let l = rand(1, 5);
        return { text: `${opRechneUm}: ${l} l in ml`, sol: l * 1000, steps: generateSteps("einheiten_l_ml", {l}), stepType: "einheiten_l_ml", params: {l} };
    }
    // NEU: Tonnen in kg
    let t = rand(1, 4);
    return { text: `${opRechneUm}: ${t} t in kg`, sol: t * 1000, steps: generateSteps("einheiten_t_kg", {t}), stepType: "einheiten_t_kg", params: {t} };
  },

  geometrie: (level) => {
    const type = rand(1, 9); // Von 7 auf 9
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    // ... (Typen 1-7 bleiben gleich wie im Original)
    if (type <= 7) {
        if (type === 1) { let a = level === "boa" ? rand(2, 12) : rand(4, 25); return { text: `${opBerechne}: Umfang eines Quadrats mit a = ${a} cm`, sol: 4 * a, steps: generateSteps("geometrie_quadrat_umfang", {a}), stepType: "geometrie_quadrat_umfang", params: {a} }; }
        if (type === 2) { let a = level === "boa" ? rand(2, 12) : rand(4, 20); return { text: `${opErmittle}: Fläche eines Quadrats mit a = ${a} cm`, sol: a * a, steps: generateSteps("geometrie_quadrat_flaeche", {a}), stepType: "geometrie_quadrat_flaeche", params: {a} }; }
        if (type === 3) { let l = level === "boa" ? rand(3, 18) : rand(6, 35); let b = level === "boa" ? rand(2, 14) : rand(4, 28); return { text: `${opBerechne}: Umfang eines Rechtecks mit l = ${l} cm, b = ${b} cm`, sol: 2 * (l + b), steps: generateSteps("geometrie_rechteck_umfang", {l, b}), stepType: "geometrie_rechteck_umfang", params: {l, b} }; }
        if (type === 4) { let l = level === "boa" ? rand(3, 18) : rand(6, 35); let b = level === "boa" ? rand(2, 14) : rand(4, 28); return { text: `${opErmittle}: Fläche eines Rechtecks mit l = ${l} cm, b = ${b} cm`, sol: l * b, steps: generateSteps("geometrie_rechteck_flaeche", {l, b}), stepType: "geometrie_rechteck_flaeche", params: {l, b} }; }
        if (type === 5) { let g = level === "boa" ? rand(4, 20) : rand(8, 40); let h = level === "boa" ? rand(3, 15) : rand(6, 30); return { text: `${opBerechne}: Fläche eines Dreiecks mit g = ${g} cm, h = ${h} cm`, sol: round2((g * h) / 2), steps: generateSteps("geometrie_dreieck_flaeche", {g, h}), stepType: "geometrie_dreieck_flaeche", params: {g, h} }; }
        if (type === 6) { let l = level === "boa" ? rand(3, 10) : rand(5, 20); let b = level === "boa" ? rand(2, 8) : rand(4, 15); let h = level === "boa" ? rand(2, 6) : rand(3, 12); return { text: `${opBerechne}: Volumen eines Quaders mit l = ${l} cm, b = ${b} cm, h = ${h} cm`, sol: l * b * h, steps: generateSteps("geometrie_quader_volumen", {l, b, h}), stepType: "geometrie_quader_volumen", params: {l, b, h} }; }
        if (type === 7) { let a = level === "boa" ? rand(2, 5) : rand(4, 10); return { text: `${opBerechne}: Volumen eines Würfels mit Seite a = ${a} cm`, sol: a * a * a, steps: generateSteps("geometrie_wuerfel_volumen", {a}), stepType: "geometrie_wuerfel_volumen", params: {a} }; }
    }
    // NEU: Oberflächeninhalt Quader
    if (type === 8) {
        let l = rand(3, 6), b = rand(2, 4), h = rand(2, 5);
        let sol = 2 * (l * b + l * h + b * h);
        return { text: `${opBerechne}: Oberflächeninhalt eines Quaders (l=${l}, b=${b}, h=${h})`, sol, steps: generateSteps("geometrie_quader_oberflaeche", {l, b, h}), stepType: "geometrie_quader_oberflaeche", params: {l, b, h} };
    }
    // NEU: Parallelogramm
    let g = rand(5, 15), h = rand(4, 10);
    return { text: `${opErmittle}: Fläche eines Parallelogramms (g=${g} cm, h=${h} cm)`, sol: g * h, steps: generateSteps("geometrie_parallelogramm_flaeche", {g, h}), stepType: "geometrie_parallelogramm_flaeche", params: {g, h} };
  },

  sach: (level) => {
    const type = rand(1, 8); // Von 6 auf 8
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    const opGibAn = getOperatorPhraseBasis("GIB_AN");
    // ... (Typen 1-6 bleiben gleich wie im Original)
    if (type <= 6) {
        if (type === 1) { let price = level === "boa" ? rand(1, 5) : rand(2, 9); let amount = level === "boa" ? rand(2, 10) : rand(4, 18); return { text: `${opBerechne}: Gesamtpreis für ${amount} Artikel zu je ${price} €`, sol: price * amount, steps: generateSteps("sach_einkauf", {price, amount}), stepType: "sach_einkauf", params: {price, amount} }; }
        if (type === 2) { let km = level === "boa" ? rand(30, 200) : rand(80, 420); let h = level === "boa" ? rand(1, 5) : rand(2, 7); return { text: `${opErmittle}: Geschwindigkeit (${km} km in ${h} h)`, sol: round2(km / h), steps: generateSteps("sach_geschwindigkeit", {km, h}), stepType: "sach_geschwindigkeit", params: {km, h} }; }
        if (type === 3) { let pages = level === "boa" ? rand(30, 120) : rand(80, 300); let days = level === "boa" ? rand(2, 8) : rand(3, 14); return { text: `${opGibAn}: Seiten pro Tag (${pages} Seiten in ${days} Tagen)`, sol: round2(pages / days), steps: generateSteps("sach_seiten_pro_tag", {pages, days}), stepType: "sach_seiten_pro_tag", params: {pages, days} }; }
        if (type === 4) { let km = level === "boa" ? rand(20, 120) : rand(60, 300); let min = level === "boa" ? rand(10, 40) : rand(15, 60); let factor = level === "boa" ? 2 : rand(2, 4); return { text: `${opBerechne}: Zeit für ${km * factor} km (${km} km in ${min} min)`, sol: min * factor, steps: generateSteps("sach_zeit", {km, min, factor}), stepType: "sach_zeit", params: {km, min, factor} }; }
        if (type === 5) { let price = level === "boa" ? rand(2, 6) : rand(5, 15); let paid = level === "boa" ? rand(10, 50) : rand(20, 120); return { text: `${opBerechne}: Anzahl Tickets (${paid} €, Preis pro Ticket ${price} €)`, sol: round2(paid / price), steps: generateSteps("sach_tickets", {price, paid}), stepType: "sach_tickets", params: {price, paid} }; }
        if (type === 6) { let v1 = rand(10, 30), v2 = rand(10, 30), v3 = rand(10, 30); return { text: `${opErmittle}: Den Durchschnittswert von ${v1}, ${v2} und ${v3}`, sol: round2((v1 + v2 + v3) / 3), steps: generateSteps("sach_durchschnitt", {v1, v2, v3}), stepType: "sach_durchschnitt", params: {v1, v2, v3} }; }
    }
    // NEU: Wechselgeld
    if (type === 7) {
        let price = rand(2, 4), amount = rand(2, 5), bill = 20;
        let total = price * amount;
        return { text: `${opBerechne}: Wechselgeld bei ${bill}€ (Kauf von ${amount} Stück zu ${price}€)`, sol: bill - total, steps: generateSteps("sach_wechselgeld", {price, amount, bill, total}), stepType: "sach_wechselgeld", params: {price, amount, bill, total} };
    }
    // NEU: Gleichmäßiges Verteilen
    let total = rand(10, 25) * 4;
    return { text: `${opGibAn}: Wie viel erhält jeder, wenn ${total} Äpfel auf 4 Kisten verteilt werden?`, sol: total / 4, steps: generateSteps("sach_verteilen", {total, parts: 4}), stepType: "sach_verteilen", params: {total, parts: 4} };
  },

  prozent: (level) => {
    const type = rand(1, 8); // Von 6 auf 8
    const opBerechne = getOperatorPhraseBasis("BERECHNE");
    const opErmittle = getOperatorPhraseBasis("ERMITTLE");
    // ... (Typen 1-6 bleiben gleich wie im Original)
    if (type <= 6) {
        if (type === 1) { let g = level === "boa" ? rand(80, 250) : rand(120, 600); let p = level === "boa" ? [10, 20, 25, 50][rand(0, 3)] : rand(10, 40); return { text: `${opBerechne}: ${p}% von ${g}`, sol: round2(g * p / 100), steps: generateSteps("prozent_prozentwert", {g, p}), stepType: "prozent_prozentwert", params: {g, p} }; }
        if (type === 2) { let price = level === "boa" ? rand(20, 180) : rand(50, 450); let p = level === "boa" ? [10, 20, 25][rand(0, 2)] : [10, 15, 20, 25, 30][rand(0, 4)]; return { text: `${opBerechne}: Preis nach ${p}% Rabatt (${price} €)`, sol: round2(price * (100 - p) / 100), steps: generateSteps("prozent_rabatt", {price, p}), stepType: "prozent_rabatt", params: {price, p} }; }
        if (type === 3) { let w = level === "boa" ? rand(20, 120) : rand(40, 250); let p = level === "boa" ? [10, 20, 25, 50][rand(0, 3)] : rand(5, 60); return { text: `${opErmittle}: Grundwert (${w} sind ${p}%)`, sol: round2(w * 100 / p), steps: generateSteps("prozent_grundwert", {w, p}), stepType: "prozent_grundwert", params: {w, p} }; }
        if (type === 4) { let g = level === "boa" ? rand(100, 300) : rand(150, 700); let diff = level === "boa" ? rand(10, 80) : rand(20, 200); let newVal = g + diff; return { text: `${opErmittle}: Prozentuale Steigerung (${g} € auf ${newVal} €)`, sol: round2((diff / g) * 100), steps: generateSteps("prozent_steigerung", {g, diff, newVal}), stepType: "prozent_steigerung", params: {g, diff, newVal} }; }
        if (type === 5) { let w = level === "boa" ? rand(15, 90) : rand(30, 240); let g = level === "boa" ? rand(50, 200) : rand(100, 400); if (w > g) [w, g] = [g, w]; return { text: `${opErmittle}: Prozentsatz (${w} von ${g})`, sol: round2((w / g) * 100), steps: generateSteps("prozent_prozentsatz", {w, g}), stepType: "prozent_prozentsatz", params: {w, g} }; }
        if (type === 6) { let netto = level === "boa" ? rand(50, 200) : rand(100, 500); let p = 19; return { text: `${opBerechne}: Bruttopreis (Netto ${netto} €, ${p}% MwSt.)`, sol: round2(netto * 1.19), steps: generateSteps("prozent_mehrwertsteuer", {netto, p}), stepType: "prozent_mehrwertsteuer", params: {netto, p} }; }
    }
    // NEU: Anteil als Bruch in Prozent
    if (type === 7) {
        let z = 1, n = 4;
        return { text: `${opGibAn}: Wie viel Prozent sind ${z}/${n}?`, sol: (z/n)*100, steps: generateSteps("prozent_anteil_bruch", {zähler: z, nenner: n}), stepType: "prozent_anteil_bruch", params: {zähler: z, nenner: n} };
    }
    // NEU: Skonto-Abzug
    let g = rand(200, 1000), p = 2;
    return { text: `${opBerechne}: Endbetrag nach ${p}% Skonto auf ${g} €`, sol: round2(g * 0.98), steps: generateSteps("prozent_skonto", {g, p}), stepType: "prozent_skonto", params: {g, p} };
  }
};

/* =========================================================
   STERN-AUFGABEN (BBR)
========================================================= */
function starTask() {
  const type = rand(1, 8); // Von 6 auf 8
  const opBerechne = getOperatorPhraseBasis("BERECHNE");
  const opErmittle = getOperatorPhraseBasis("ERMITTLE");
  
  // ... (Typen 1-6 bleiben gleich)
  if (type <= 6) {
      if (type === 1) { const g = rand(200, 400); return { text: `⭐ ${opBerechne}: Endpreis (${g} €, 20% Rabatt, danach 10% Rabatt)`, sol: round2(g * 0.8 * 0.9), steps: generateSteps("star_rabattkette", {g}), stepType: "star_rabattkette", params: {g}, star: true }; }
      if (type === 2) { const g = rand(6, 12); const h = rand(4, 8); return { text: `⭐ ${opBerechne}: Fläche eines Dreiecks (g = ${g} cm, h = ${h} cm)`, sol: round2(g * h / 2), steps: generateSteps("star_dreieck", {g, h}), stepType: "star_dreieck", params: {g, h}, star: true }; }
      if (type === 3) { const km = rand(30, 50); const min = rand(20, 40); return { text: `⭐ ${opErmittle}: Minuten pro km (${km} km in ${min} min)`, sol: round2(min / km), steps: generateSteps("star_zeit_pro_km", {km, min}), stepType: "star_zeit_pro_km", params: {km, min}, star: true }; }
      if (type === 4) { const a = rand(10, 30); const b = rand(5, 15); const c = rand(2, 8); return { text: `⭐ ${opBerechne}: (${a} + ${b}) × ${c} − ${a}`, sol: (a + b) * c - a, steps: generateSteps("star_klammern", {a, b, c}), stepType: "star_klammern", params: {a, b, c}, star: true }; }
      if (type === 5) { const price = rand(50, 150); const p = rand(15, 30); return { text: `⭐ ${opBerechne}: Preis nach ${p}% Rabatt (${price} €)`, sol: round2(price * (100 - p) / 100), steps: generateSteps("star_rabatt_einfach", {price, p}), stepType: "star_rabatt_einfach", params: {price, p}, star: true }; }
      if (type === 6) { const k = rand(500, 2000); const p = rand(1, 5); return { text: `⭐ ${opBerechne}: Die Jahreszinsen für ein Kapital von ${k} € bei ${p}% Zinssatz`, sol: round2(k * p / 100), steps: generateSteps("star_zinsen", {k, p}), stepType: "star_zinsen", params: {k, p}, star: true }; }
  }
  
  // NEU: Radius aus Umfang schätzen (BBR Typisch: Pi ~ 3)
  if (type === 7) {
      const u = rand(18, 30);
      return { text: `⭐ ${opErmittle}: Radius eines Kreises mit Umfang ≈ ${u} cm (Nutze π ≈ 3)`, sol: round2(u / 6), steps: generateSteps("star_radius_aus_umfang", {u}), stepType: "star_radius_aus_umfang", params: {u}, star: true };
  }
  // NEU: Mischungsrechnung (einfach)
  const m1 = 2, p1 = 10, m2 = 3, p2 = 20;
  return { text: `⭐ ${opBerechne}: Mischprozent (${m1}l mit ${p1}% und ${m2}l mit ${p2}% Saft)`, sol: round2((m1*p1 + m2*p2)/(m1+m2)), steps: generateSteps("star_mischung", {m1, p1, m2, p2}), stepType: "star_mischung", params: {m1, p1, m2, p2}, star: true };
}

/* =========================================================
   ZENTRALE TASK-FUNKTION & EXPORT
========================================================= */
function getTask(config) {
  const { mode, level, stars, index } = config;
  if (mode === "exam" && level === "bbr" && stars === true && index >= 6) {
    return starTask();
  }
  const cat = pickCategoryWeighted();
  const task = TASKS[cat](level);
  task.star = false;
  task.category = cat;
  return task;
}

function formatSteps(stepArray, solution) {
  let html = "";
  stepArray.forEach((line, i) => {
    html += `Schritt ${i + 1}: ${line}<br>`;
  });
  html += `<br><b>Ergebnis: ${solution}</b>`;
  return html;
}

if (typeof window !== "undefined") {
  window.getTask = getTask;
  window.formatSteps = formatSteps;
  window.starTask = starTask;
}

export { getTask, formatSteps, starTask };
export default { getTask, formatSteps, starTask };
