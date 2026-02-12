/* =========================================================
   pool_113.js
   ZENTRALER AUFGABENPOOL – Mathematik BBR / BOA
   Anforderungsbereich 11.3 / Note 2-1
   
   ❗ WICHTIG: Diese Datei muss im GLEICHEN Ordner liegen wie:
   - 11.3.html
   - 12.2.html
========================================================= */

/* -------------------------
   HILFSFUNKTIONEN
------------------------- */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round2(x) {
    return Math.round(x * 100) / 100;
}

/* =========================================================
   GEWICHTETE KATEGORIEN FÜR PRÜFUNGSREALISTISCHE VERTEILUNG
========================================================= */
const weightedCategories = [
    "rechnen", "rechnen", "rechnen", "rechnen", "rechnen",
    "sach", "sach", "sach", "sach", "sach",
    "prozent", "prozent", "prozent", "prozent",
    "geometrie", "geometrie", "geometrie", "geometrie",
    "koerper", "koerper",
    "pythagoras", "pythagoras",
    "zylinder", "zylinder"
];

/* =========================================================
   KATEGORIEN-FOLGE FÜR 11.3.HTML (FESTE REIHENFOLGE)
========================================================= */
const examCategories = [
    "rechnen",
    "prozent",
    "geometrie",
    "koerper",
    "pythagoras",
    "zylinder",
    "sach",
    "rechnen",
    "prozent",
    "koerper"
];

/* =========================================================
   HILFSFUNKTION: Schritt-für-Schritt-Lösung formatieren
========================================================= */
function steps(...lines) {
    let html = "";
    lines.forEach((line, i) => {
        html += `Schritt ${i + 1}: ${line}<br>`;
    });
    return html;
}

/* =========================================================
   HAUPT-AUFGABENPOOL
   Alle Kategorien mit ihren Generatoren
========================================================= */
const TASKPOOL = {

    /* =====================
       RECHNEN / ALGEBRA
    ===================== */
    rechnen: [
        // Aufgabe 1: Term mit Klammern
        () => {
            const x = rand(-3, 8);
            const ans = 2 * (3 * x - 4) - (x - 5);
            return {
                task: `Berechne den Wert des Terms für x = ${x}:<br><b>2·(3x − 4) − (x − 5)</b>`,
                answer: ans,
                solution: steps(
                    `Klammern auflösen: 2·3x = 6x und 2·(-4) = -8 → 6x - 8`,
                    `Minusklammer auflösen: − (x − 5) = −x + 5`,
                    `Zusammenfassen: 6x - 8 - x + 5 = 5x - 3`,
                    `x = ${x} einsetzen: 5·${x} - 3 = ${5 * x} - 3 = ${ans}`
                )
            };
        },
        // Aufgabe 2: Gleichung lösen
        () => {
            const x = rand(-5, 10);
            const result = 3 * (x - 2) + 4;
            return {
                task: `Löse nach x auf:<br><b>3(x − 2) + 4 = ${result}</b>`,
                answer: x,
                solution: steps(
                    `Klammer auflösen: 3·x = 3x und 3·(-2) = -6 → 3x - 6 + 4`,
                    `Zusammenfassen: 3x - 2 = ${result}`,
                    `+2 auf beiden Seiten: 3x = ${result + 2}`,
                    `÷3: x = ${result + 2} ÷ 3 = ${x}`
                )
            };
        },
        // Aufgabe 3: Term mit zwei Klammern
        () => {
            const a = rand(2, 6);
            const b = rand(1, 8);
            const c = rand(3, 9);
            const x = rand(-4, 9);
            const ans = a * (b * x + c) - (x - a);
            return {
                task: `Berechne für x = ${x}:<br><b>${a}·(${b}x + ${c}) − (x − ${a})</b>`,
                answer: ans,
                solution: steps(
                    `Erste Klammer: ${a}·${b}x = ${a * b}x und ${a}·${c} = ${a * c}`,
                    `→ ${a * b}x + ${a * c}`,
                    `Zweite Klammer: − (x − ${a}) = −x + ${a}`,
                    `Zusammenfassen: ${a * b}x + ${a * c} − x + ${a} = ${a * b - 1}x + ${a * c + a}`,
                    `x = ${x} einsetzen: ${a * b - 1}·${x} + ${a * c + a} = ${ans}`
                )
            };
        },
        // Aufgabe 4: Klammerausdruck mit Quadrat
        () => {
            const x = rand(-3, 6);
            const a = rand(2, 5);
            const ans = a * (x + 2) * (x - 1);
            return {
                task: `Berechne für x = ${x}:<br><b>${a}·(x + 2)·(x − 1)</b>`,
                answer: ans,
                solution: steps(
                    `(x + 2)(x - 1) = x² - x + 2x - 2 = x² + x - 2`,
                    `Mit ${a} multiplizieren: ${a}x² + ${a}x - ${2 * a}`,
                    `x = ${x} einsetzen: ${a}·${x}² + ${a}·${x} - ${2 * a}`,
                    `= ${a * x * x} + ${a * x} - ${2 * a} = ${ans}`
                )
            };
        },
        // Aufgabe 5: Einfache lineare Gleichung
        () => {
            const x = rand(2, 12);
            const a = rand(2, 5);
            const b = rand(1, 7);
            return {
                task: `Löse die Gleichung:<br><b>${a}x + ${b} = ${a * x + b}</b>`,
                answer: x,
                solution: steps(
                    `${a}x + ${b} = ${a * x + b}`,
                    `${a}x = ${a * x + b} - ${b} = ${a * x}`,
                    `x = ${a * x} ÷ ${a} = ${x}`
                )
            };
        }
    ],

    /* =====================
       PROZENTRECHNUNG
    ===================== */
    prozent: [
        // Aufgabe 1: Prozentwert
        () => {
            const g = rand(120, 500);
            const p = rand(10, 30);
            const ans = round2(g * p / 100);
            return {
                task: `Berechne ${p}% von ${g} €.`,
                answer: ans,
                solution: steps(
                    `Formel: Prozentwert = Grundwert × Prozentsatz ÷ 100`,
                    `${g} € × ${p} ÷ 100`,
                    `${g} € × 0,${p} = ${ans} €`
                )
            };
        },
        // Aufgabe 2: Preiserhöhung
        () => {
            const g = rand(150, 600);
            const p = rand(10, 35);
            const ans = round2(g * (1 + p / 100));
            return {
                task: `Ein Produkt kostet ${g} €. Der Preis wird um ${p}% erhöht.<br><b>Bestimme den neuen Preis.</b>`,
                answer: ans,
                solution: steps(
                    `100% + ${p}% = ${100 + p}%`,
                    `Neuer Preis = ${g} € × ${100 + p} ÷ 100`,
                    `= ${g} € × ${(100 + p) / 100} = ${ans} €`
                )
            };
        },
        // Aufgabe 3: Rabatt
        () => {
            const g = rand(200, 800);
            const p = rand(15, 40);
            const ans = round2(g * (1 - p / 100));
            return {
                task: `Ein Preis von ${g} € wird um ${p}% reduziert.<br><b>Neuer Preis?</b>`,
                answer: ans,
                solution: steps(
                    `100% - ${p}% = ${100 - p}%`,
                    `Neuer Preis = ${g} € × ${100 - p} ÷ 100`,
                    `= ${g} € × ${(100 - p) / 100} = ${ans} €`
                )
            };
        },
        // Aufgabe 4: Grundwert rückwärts
        () => {
            const g = rand(120, 400);
            const p = rand(10, 40);
            const w = round2(g * p / 100);
            return {
                task: `${w} € entsprechen ${p}% eines Grundwertes.<br><b>Bestimme den Grundwert.</b>`,
                answer: round2(g),
                solution: steps(
                    `Formel: Grundwert = Prozentwert × 100 ÷ Prozentsatz`,
                    `${w} € × 100 ÷ ${p}`,
                    `${w * 100} € ÷ ${p} = ${g} €`
                )
            };
        },
        // Aufgabe 5: Prozentuale Steigerung
        () => {
            const alt = rand(150, 400);
            const neu = alt + rand(30, 100);
            const prozent = round2(((neu - alt) / alt) * 100);
            return {
                task: `Preis steigt von ${alt} € auf ${neu} €.<br><b>Prozentuale Steigerung?</b>`,
                answer: prozent,
                solution: steps(
                    `Absolute Änderung: ${neu} € - ${alt} € = ${neu - alt} €`,
                    `Relative Änderung: ${neu - alt} ÷ ${alt} = ${round2((neu - alt) / alt)}`,
                    `In Prozent: × 100 = ${prozent}%`
                )
            };
        }
    ],

    /* =====================
       GEOMETRIE
    ===================== */
    geometrie: [
        // Aufgabe 1: Rechteck Fläche
        () => {
            const a = rand(8, 20);
            const b = rand(10, 25);
            return {
                task: `Rechteck: Länge ${a} cm, Breite ${b} cm.<br><b>Berechne die Fläche.</b>`,
                answer: a * b,
                solution: steps(
                    `Formel: A = a × b`,
                    `A = ${a} cm × ${b} cm = ${a * b} cm²`
                )
            };
        },
        // Aufgabe 2: Kreis Umfang
        () => {
            const r = rand(5, 12);
            const ans = round2(2 * 3.14 * r);
            return {
                task: `Kreis: Radius ${r} cm.<br><b>Berechne den Umfang (π ≈ 3,14).</b>`,
                answer: ans,
                solution: steps(
                    `Formel: U = 2 × π × r`,
                    `U = 2 × 3,14 × ${r} cm = ${ans} cm`
                )
            };
        },
        // Aufgabe 3: Dreieck Fläche
        () => {
            const g = rand(8, 18);
            const h = rand(6, 15);
            return {
                task: `Dreieck: Grundseite ${g} cm, Höhe ${h} cm.<br><b>Berechne die Fläche.</b>`,
                answer: round2(g * h / 2),
                solution: steps(
                    `Formel: A = (g × h) ÷ 2`,
                    `A = (${g} cm × ${h} cm) ÷ 2 = ${g * h} cm² ÷ 2 = ${round2(g * h / 2)} cm²`
                )
            };
        },
        // Aufgabe 4: Kreis Fläche
        () => {
            const r = rand(4, 10);
            const ans = round2(3.14 * r * r);
            return {
                task: `Kreis: Radius ${r} cm.<br><b>Berechne die Fläche (π ≈ 3,14).</b>`,
                answer: ans,
                solution: steps(
                    `Formel: A = π × r²`,
                    `r² = ${r}² = ${r * r} cm²`,
                    `A = 3,14 × ${r * r} cm² = ${ans} cm²`
                )
            };
        }
    ],

    /* =====================
       KÖRPER / PRISMEN
    ===================== */
    koerper: [
        // Aufgabe 1: Prisma rechteckig - Volumen
        () => {
            const a = rand(4, 10);
            const b = rand(5, 12);
            const h = rand(6, 18);
            return {
                task: `Ein Prisma hat eine rechteckige Grundfläche mit a = ${a} cm und b = ${b} cm. Die Höhe beträgt ${h} cm.<br><b>Berechne das Volumen.</b>`,
                answer: a * b * h,
                solution: steps(
                    `Grundfläche: G = a × b = ${a} cm × ${b} cm = ${a * b} cm²`,
                    `Volumen: V = G × h = ${a * b} cm² × ${h} cm = ${a * b * h} cm³`
                )
            };
        },
        // Aufgabe 2: Prisma quadratisch - Oberfläche
        () => {
            const a = rand(4, 10);
            const h = rand(6, 16);
            return {
                task: `Ein Prisma hat eine quadratische Grundfläche mit a = ${a} cm und die Höhe h = ${h} cm.<br><b>Berechne die Oberfläche.</b>`,
                answer: 2 * a * a + 4 * a * h,
                solution: steps(
                    `Grundfläche: G = a² = ${a}² = ${a * a} cm²`,
                    `Mantelfläche: M = 4 × a × h = 4 × ${a} × ${h} = ${4 * a * h} cm²`,
                    `Oberfläche: O = 2 × G + M = 2 × ${a * a} + ${4 * a * h} = ${2 * a * a + 4 * a * h} cm²`
                )
            };
        },
        // Aufgabe 3: Würfel Volumen
        () => {
            const a = rand(3, 9);
            return {
                task: `Ein Würfel hat die Kantenlänge a = ${a} cm.<br><b>Berechne das Volumen.</b>`,
                answer: a * a * a,
                solution: steps(
                    `Formel: V = a³`,
                    `V = ${a} cm × ${a} cm × ${a} cm = ${a * a * a} cm³`
                )
            };
        }
    ],

    /* =====================
       PYTHAGORAS
    ===================== */
    pythagoras: [
        // Aufgabe 1: Hypotenuse
        () => {
            const a = rand(6, 15);
            const b = rand(8, 20);
            const hyp = round2(Math.sqrt(a * a + b * b));
            return {
                task: `Bestimme die Länge der Hypotenuse eines rechtwinkligen Dreiecks mit Katheten ${a} cm und ${b} cm.`,
                answer: hyp,
                solution: steps(
                    `Satz des Pythagoras: c² = a² + b²`,
                    `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b} cm²`,
                    `c = √${a * a + b * b} cm = ${hyp} cm`
                )
            };
        },
        // Aufgabe 2: Kathete
        () => {
            const c = rand(13, 25);
            const a = rand(5, 12);
            const b = round2(Math.sqrt(c * c - a * a));
            return {
                task: `In einem rechtwinkligen Dreieck ist die Hypotenuse c = ${c} cm und eine Kathete a = ${a} cm.<br><b>Berechne die Länge der Kathete b.</b>`,
                answer: round2(b),
                solution: steps(
                    `Satz des Pythagoras: a² + b² = c²`,
                    `b² = c² - a² = ${c}² - ${a}² = ${c * c} - ${a * a} = ${c * c - a * a} cm²`,
                    `b = √${c * c - a * a} cm = ${round2(b)} cm`
                )
            };
        },
        // Aufgabe 3: Raumdiagonale Quader
        () => {
            const a = rand(4, 10);
            const b = rand(5, 12);
            const h = rand(6, 14);
            const d = round2(Math.sqrt(a * a + b * b + h * h));
            return {
                task: `Ein Quader hat die Kantenlängen a = ${a} cm, b = ${b} cm und h = ${h} cm.<br><b>Bestimme die Länge der Raumdiagonale.</b>`,
                answer: d,
                solution: steps(
                    `Raumdiagonale: d² = a² + b² + h²`,
                    `d² = ${a}² + ${b}² + ${h}² = ${a * a} + ${b * b} + ${h * h} = ${a * a + b * b + h * h} cm²`,
                    `d = √${a * a + b * b + h * h} cm = ${d} cm`
                )
            };
        }
    ],

    /* =====================
       ZYLINDER
    ===================== */
    zylinder: [
        // Aufgabe 1: Volumen
        () => {
            const r = rand(3, 8);
            const h = rand(8, 20);
            const ans = round2(3.14 * r * r * h);
            return {
                task: `Ein Zylinder hat Radius r = ${r} cm und Höhe h = ${h} cm.<br>(π ≈ 3,14)<br><b>Berechne das Volumen.</b>`,
                answer: ans,
                solution: steps(
                    `Formel: V = π × r² × h`,
                    `r² = ${r}² = ${r * r} cm²`,
                    `V = 3,14 × ${r * r} cm² × ${h} cm = ${ans} cm³`
                )
            };
        },
        // Aufgabe 2: Oberfläche
        () => {
            const r = rand(4, 10);
            const h = rand(6, 18);
            const ans = round2(2 * 3.14 * r * r + 2 * 3.14 * r * h);
            return {
                task: `Berechne die Oberfläche eines Zylinders mit Radius r = ${r} cm und Höhe h = ${h} cm.<br>(π ≈ 3,14)`,
                answer: ans,
                solution: steps(
                    `Formel: O = 2πr² + 2πrh`,
                    `2πr² = 2 × 3,14 × ${r}² = 2 × 3,14 × ${r * r} = ${round2(2 * 3.14 * r * r)} cm²`,
                    `2πrh = 2 × 3,14 × ${r} × ${h} = ${round2(2 * 3.14 * r * h)} cm²`,
                    `O = ${round2(2 * 3.14 * r * r)} + ${round2(2 * 3.14 * r * h)} = ${ans} cm²`
                )
            };
        }
    ],

    /* =====================
       SACH- & ANWENDUNGSAUFGABEN
    ===================== */
    sach: [
        // Aufgabe 1: Geschwindigkeit
        () => {
            const km = rand(80, 420);
            const h = rand(2, 7);
            const ans = round2(km / h);
            return {
                task: `Ein Auto fährt ${km} km in ${h} h.<br><b>Berechne die Durchschnittsgeschwindigkeit.</b>`,
                answer: ans,
                solution: steps(
                    `Formel: v = s ÷ t`,
                    `v = ${km} km ÷ ${h} h = ${ans} km/h`
                )
            };
        },
        // Aufgabe 2: Ankunftszeit
        () => {
            const startH = rand(8, 14);
            const durMin = rand(85, 240);
            const total = startH * 60 + durMin;
            const hh = Math.floor(total / 60) % 24;
            const mm = String(total % 60).padStart(2, "0");
            const ans = `${hh}:${mm}`;
            return {
                task: `Ein Zug startet um <b>${startH}:00</b> Uhr und fährt <b>${durMin}</b> Minuten.<br><b>Ankunftszeit?</b>`,
                answer: ans,
                solution: steps(
                    `Startzeit in Minuten: ${startH} × 60 = ${startH * 60} min`,
                    `+ Fahrzeit: ${startH * 60} + ${durMin} = ${total} min`,
                    `Stunden: ${Math.floor(total / 60)} h, Minuten: ${total % 60} min`,
                    `Uhrzeit: ${hh}:${mm} Uhr`
                )
            };
        },
        // Aufgabe 3: Mischungsaufgabe
        () => {
            const c1 = rand(10, 30);
            const m1 = rand(100, 300);
            const c2 = rand(40, 60);
            const m2 = rand(50, 150);
            const gesamt = m1 + m2;
            const substanz1 = round2(c1 * m1 / 100);
            const substanz2 = round2(c2 * m2 / 100);
            const konz = round2((c1 * m1 + c2 * m2) / gesamt);
            return {
                task: `${m1}g einer ${c1}%igen Lösung werden mit ${m2}g einer ${c2}%igen Lösung gemischt.<br><b>Konzentration der Mischung?</b>`,
                answer: konz,
                solution: steps(
                    `Reine Substanz 1: ${c1}% von ${m1}g = ${substanz1} g`,
                    `Reine Substanz 2: ${c2}% von ${m2}g = ${substanz2} g`,
                    `Gesamte reine Substanz: ${substanz1} g + ${substanz2} g = ${round2(substanz1 + substanz2)} g`,
                    `Gesamtmasse: ${m1} g + ${m2} g = ${gesamt} g`,
                    `Konzentration = (${round2(substanz1 + substanz2)} ÷ ${gesamt}) × 100 = ${konz}%`
                )
            };
        }
    ]
};

/* =========================================================
   API-FUNKTIONEN FÜR 11.3.HTML (Prüfungsmodus)
========================================================= */
function getTask113(config) {
    // Wenn config.index verwendet wird (alte Version)
    if (config && config.index !== undefined) {
        const idx = config.index;
        const cat = examCategories[idx % examCategories.length];
        const pool = TASKPOOL[cat];
        if (!pool || pool.length === 0) {
            return { text: "Fehler: Keine Aufgabe verfügbar", sol: 0 };
        }
        const randomIndex = rand(0, pool.length - 1);
        const task = pool[randomIndex]();
        return {
            text: task.task,
            sol: task.answer
        };
    }
    
    // Wenn config.category und config.generatorIndex verwendet werden
    if (config && config.category && config.generatorIndex !== undefined) {
        const cat = config.category;
        const pool = TASKPOOL[cat];
        if (!pool || pool.length === 0) {
            return { text: "Fehler: Keine Aufgabe verfügbar", sol: 0 };
        }
        const idx = config.generatorIndex % pool.length;
        const task = pool[idx]();
        return {
            text: task.task,
            sol: task.answer
        };
    }
    
    // Fallback
    return { text: "Fehler: Ungültige Konfiguration", sol: 0 };
}

/* =========================================================
   API-FUNKTIONEN FÜR 12.2.HTML (Trainer mit Lösungen)
========================================================= */
function getTask113Trainer(config) {
    const cat = config.category || getWeightedCategory();
    const pool = TASKPOOL[cat];
    if (!pool || pool.length === 0) {
        return { task: "Fehler: Keine Aufgabe verfügbar", answer: 0, solution: "—" };
    }
    const genIndex = config.generatorIndex !== undefined
        ? config.generatorIndex
        : rand(0, pool.length - 1);
    return pool[genIndex % pool.length]();
}

function getWeightedCategory() {
    return weightedCategories[rand(0, weightedCategories.length - 1)];
}

function getTaskPoolSize(cat) {
    return TASKPOOL[cat] ? TASKPOOL[cat].length : 0;
}

function pickTaskFromCategory(cat) {
    const pool = TASKPOOL[cat];
    if (!pool || pool.length === 0) return null;
    const idx = rand(0, pool.length - 1);
    return pool[idx]();
}

function getAvailableCategories() {
    return Object.keys(TASKPOOL);
}

/* =========================================================
   GLOBALES OBJEKT - WICHTIG FÜR FILE:// ZUGRIFF!
========================================================= */
window.rand = rand;
window.round2 = round2;
window.getTask113 = getTask113;
window.getTask113Trainer = getTask113Trainer;
window.getWeightedCategory = getWeightedCategory;
window.getTaskPoolSize = getTaskPoolSize;
window.pickTaskFromCategory = pickTaskFromCategory;
window.getAvailableCategories = getAvailableCategories;
window.TASKPOOL = TASKPOOL;
window.weightedCategories = weightedCategories;
window.examCategories = examCategories;

// Test-Ausgabe zur Bestätigung
console.log("✅ pool_113.js erfolgreich geladen!");
console.log("📚 Verfügbare Kategorien:", Object.keys(TASKPOOL));
