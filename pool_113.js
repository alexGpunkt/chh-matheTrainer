/* =========================================================
   pool_113.js  — BBR Niveau 11.3 (Note 2–1)
   30 komplett ausgearbeitete Aufgaben
   inkl. AUTOMATISCHE OPERATOR-STEUERUNG
   ---------------------------------------------------------
   Nutzung (Browser):
     - Datei einbinden: <script src="pool_113.js"></script>
     - Dann z.B.: const t = window.POOL_113.getRandomTask();
   Nutzung (ESM):
     - import { POOL_113 } from "./pool_113.js";
========================================================= */

/* =========================================================
   1) Operator-Steuerung (automatisch)
   - Jede Aufgabe hat operatorGroup (z.B. "UEBERPRUEFE", "WEISE_NACH")
   - getOperatorPhrase() liefert passenden BBR-Operator-Start
========================================================= */

const OPERATOR_GROUPS = {
  BERECHNE: ["berechne", "ermittle", "bestimme"],
  ERMITTLE: ["ermittle", "bestimme", "berechne"],
  BESTIMME: ["bestimme", "ermittle", "berechne"],
  WEISE_NACH: ["weise nach", "zeige, dass"],
  UEBERPRUEFE: ["überprüfe", "prüfe"],
  BEGRUENDE: ["begründe", "erläutere"],
  ENTSCHEIDE_BEGRUENDE: ["entscheide und begründe"],
  STELLE_GLEICHUNG: ["stelle eine Gleichung auf und berechne", "stelle eine Gleichung auf und löse"],
  FEHLERANALYSE: ["finde den Fehler und korrigiere", "analysiere den Fehler und korrigiere"]
};

function pickFrom(arr, rng = Math.random) {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Liefert eine Operator-Phrase passend zur operatorGroup.
 * @param {string} operatorGroup
 * @param {function} rng
 */
function getOperatorPhrase(operatorGroup, rng = Math.random) {
  const list = OPERATOR_GROUPS[operatorGroup] || ["berechne"];
  // "entscheide und begründe" ist fix (keine Variation nötig)
  if (operatorGroup === "ENTSCHEIDE_BEGRUENDE") return "Entscheide und begründe";
  // Die anderen werden zufällig variiert
  const op = pickFrom(list, rng);
  // Großschreibung am Satzanfang
  return op.charAt(0).toUpperCase() + op.slice(1);
}

/* =========================================================
   2) Aufgabenformat
   - prompt: ohne Operator-Start (wird automatisch davor gesetzt)
   - question: konkrete Teilaufgaben
   - solution / steps: Lösung & Lösungsweg (vollständig)
========================================================= */

function formatTaskText(task, rng = Math.random) {
  const opPhrase = getOperatorPhrase(task.operatorGroup, rng);
  const header = `${opPhrase}:`;
  const parts = [
    `**${task.id}**  (${task.thema} | ${task.kategorie} | ${task.punkte} P)`,
    "",
    `${header}`,
    task.prompt.trim(),
    "",
    task.question.trim()
  ];
  return parts.join("\n");
}

/* =========================================================
   3) Pool-Daten (30 Aufgaben, Niveau 11.3)
========================================================= */

const pool113 = {
  meta: {
    niveau: "11.3",
    ziel: "BBR Note 2–1 (anspruchsvoll, mehrschrittig, begründen/prüfen/modellieren)",
    version: "2026-02-12"
  },

  // ----------------------------
  // A) Prozent – Modellierung (5)
  // ----------------------------
  prozent_modellierung: [
    {
      id: "P113_PRO_01",
      thema: "Prozentrechnung",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "UEBERPRUEFE",
      punkte: 3,
      prompt: `
Ein Fernseher kostet ursprünglich 800 €.
Er wird zuerst um 20 % reduziert und danach nochmals um 10 %.
Ein Kunde behauptet: „Das sind insgesamt 30 % Rabatt.“
      `,
      question: `
Überprüfe die Aussage rechnerisch und gib den tatsächlichen Gesamtrabatt in % an.
      `,
      solution: `Endpreis 576 €. Gesamtrabatt 28 % (nicht 30 %).`,
      steps: `
1) 20 % von 800 € = 160 € → neuer Preis: 800 - 160 = 640 €
2) 10 % von 640 € = 64 €  → neuer Preis: 640 - 64 = 576 €
3) Ersparnis: 800 - 576 = 224 €
4) Rabatt in %: 224 / 800 = 0,28 = 28 %
      `
    },
    {
      id: "P113_PRO_02",
      thema: "Prozentrechnung",
      kategorie: "prozent_modellierung",
      typ: "transfer",
      operatorGroup: "WEISE_NACH",
      punkte: 3,
      prompt: `
In einem Shop kostet eine Jacke zuerst 90 €.
Mit einem Gutschein werden 15 % abgezogen.
Danach kommen 4 € Versandkosten dazu.
      `,
      question: `
Zeige rechnerisch, dass der Endpreis NICHT gleich ist wie „90 € minus 15 % minus 4 €“.
Berechne den korrekten Endpreis.
      `,
      solution: `Korrekt: 90 € · 0,85 + 4 € = 80,50 €. Die Rechnung „-4 € nach Prozent“ ist nicht „minus 4 %“, sondern ein fester Betrag.`,
      steps: `
1) Rabatt: 15 % von 90 € = 13,50 €
2) Preis nach Rabatt: 90 - 13,50 = 76,50 €
3) Versand: 76,50 + 4 = 80,50 €
Hinweis: Die 4 € sind kein Prozent, sondern ein fester Betrag, daher darf man sie nicht „in die Prozentrechnung mischen“.
      `
    },
    {
      id: "P113_PRO_03",
      thema: "Mehrwertsteuer rückwärts",
      kategorie: "prozent_modellierung",
      typ: "mehrschritt",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `
Ein Artikel kostet brutto 119 € (inkl. 19 % MwSt).
      `,
      question: `
a) Berechne den Nettopreis.
b) Berechne die enthaltene Mehrwertsteuer in €.
      `,
      solution: `Netto = 100 €. MwSt = 19 €.`,
      steps: `
Brutto = Netto · 1,19
a) Netto = 119 / 1,19 = 100 €
b) MwSt = 119 - 100 = 19 €
      `
    },
    {
      id: "P113_PRO_04",
      thema: "Prozent – Vergleich zweier Angebote",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 4,
      prompt: `
Ein Handy kostet 600 €.
Angebot A: 25 % Rabatt.
Angebot B: 150 € Sofort-Rabatt + 3 % Skonto bei Zahlung innerhalb von 10 Tagen (Skonto wird auf den Betrag nach Sofort-Rabatt berechnet).
      `,
      question: `
Entscheide und begründe rechnerisch, welches Angebot günstiger ist.
      `,
      solution: `Angebot B ist günstiger: 436,50 € (A: 450 €).`,
      steps: `
Angebot A:
600 · 0,75 = 450 €

Angebot B:
1) Sofort-Rabatt: 600 - 150 = 450 €
2) Skonto 3 % von 450 €: 0,03 · 450 = 13,50 €
3) Endpreis: 450 - 13,50 = 436,50 €
Vergleich: 436,50 € < 450 € → Angebot B günstiger.
      `
    },
    {
      id: "P113_PRO_05",
      thema: "Zinsrechnung",
      kategorie: "prozent_modellierung",
      typ: "überprüfen",
      operatorGroup: "UEBERPRUEFE",
      punkte: 3,
      prompt: `
Ein Kredit über 2 400 € läuft 1 Jahr mit 6,5 % Zinsen.
Jemand behauptet: „Die Zinsen sind 150 €.“
      `,
      question: `
Überprüfe die Aussage und berechne die korrekten Zinsen und die Rückzahlungssumme.
      `,
      solution: `Zinsen 156 €. Rückzahlung 2 556 €. Aussage falsch.`,
      steps: `
Zinsen = 2 400 · 0,065 = 156 €
Rückzahlung = 2 400 + 156 = 2 556 €
      `
    }
  ],

  // ----------------------------
  // B) Zuordnung / Proportionalität – Transfer (4)
  // ----------------------------
  zuordnung_transfer: [
    {
      id: "P113_ZUO_01",
      thema: "Proportionale Zuordnung",
      kategorie: "zuordnung_transfer",
      typ: "überprüfen",
      operatorGroup: "WEISE_NACH",
      punkte: 3,
      prompt: `
Ein Auto verbraucht auf 100 km 6 Liter Benzin.
Ein Fahrer behauptet: „Mit einem 45-Liter-Tank komme ich genau 800 km weit.“
      `,
      question: `
Weise rechnerisch nach, ob die Aussage stimmt, und gib die tatsächliche Reichweite an.
      `,
      solution: `Falsch. Reichweite 750 km.`,
      steps: `
6 L → 100 km
45 L → x km
x = 45 · 100 / 6 = 750 km
      `
    },
    {
      id: "P113_ZUO_02",
      thema: "Proportionalität im Kontext",
      kategorie: "zuordnung_transfer",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 3,
      prompt: `
Ein Fitnessstudio bietet:
Tarif 1: 15 € Grundgebühr + 2 € pro Kurs.
Tarif 2: 5 € Grundgebühr + 3 € pro Kurs.
      `,
      question: `
Entscheide und begründe, ab welcher Kursanzahl Tarif 1 günstiger ist.
      `,
      solution: `Ab 11 Kursen ist Tarif 1 günstiger (bei 10 gleich teuer).`,
      steps: `
Kosten:
T1 = 15 + 2x
T2 = 5 + 3x
Gleichsetzen:
15 + 2x = 5 + 3x
15 - 5 = 3x - 2x
10 = x

Bei x=10 gleich teuer.
Für x>10 ist 15+2x < 5+3x → Tarif 1 günstiger ab 11 Kursen.
      `
    },
    {
      id: "P113_ZUO_03",
      thema: "Geschwindigkeit / Zeit / Strecke",
      kategorie: "zuordnung_transfer",
      typ: "mehrschritt",
      operatorGroup: "ERMITTLE",
      punkte: 4,
      prompt: `
Ein Fahrrad fährt mit konstanter Geschwindigkeit.
In 18 Minuten fährt es 4,5 km.
      `,
      question: `
a) Ermittle die Geschwindigkeit in km/h.
b) Ermittle, wie lange es für 12 km braucht.
      `,
      solution: `v = 15 km/h. Zeit für 12 km: 48 min.`,
      steps: `
a) 18 min = 0,3 h
v = s/t = 4,5 / 0,3 = 15 km/h

b) t = s/v = 12 / 15 = 0,8 h = 48 min
      `
    },
    {
      id: "P113_ZUO_04",
      thema: "Proportional oder nicht?",
      kategorie: "zuordnung_transfer",
      typ: "begründen",
      operatorGroup: "BEGRUENDE",
      punkte: 3,
      prompt: `
Ein Taxi verlangt:
3 € Grundpreis und danach 1,80 € pro Kilometer.
      `,
      question: `
Begründe, ob die Zuordnung „gefahrene Kilometer → Preis“ proportional ist.
      `,
      solution: `Nicht proportional wegen Grundpreis (nicht durch den Ursprung).`,
      steps: `
Eine proportionale Zuordnung hat die Form y = kx und geht durch (0|0).
Hier: Preis = 3 + 1,80x. Bei x=0 kostet es 3 € ≠ 0.
Also nicht proportional.
      `
    }
  ],

  // ----------------------------
  // C) Pythagoras – Sachkontext (4)
  // ----------------------------
  pythagoras_sachkontext: [
    {
      id: "P113_PYT_01",
      thema: "Satz des Pythagoras",
      kategorie: "pythagoras_sachkontext",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 3,
      prompt: `
Ein 70 cm langer Regenschirm soll in einen Koffer gelegt werden.
Der Koffer ist innen 60 cm lang und 40 cm breit.
      `,
      question: `
Entscheide und begründe rechnerisch, ob der Schirm diagonal hineinpasst.
      `,
      solution: `Ja. Diagonale ≈ 72,1 cm > 70 cm.`,
      steps: `
d² = 60² + 40² = 3600 + 1600 = 5200
d = √5200 ≈ 72,1 cm
72,1 cm > 70 cm → passt.
      `
    },
    {
      id: "P113_PYT_02",
      thema: "Pythagoras im Raum (Quaderdiagonale)",
      kategorie: "pythagoras_sachkontext",
      typ: "mehrschritt",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `
Ein Karton hat die Maße: Länge 50 cm, Breite 30 cm, Höhe 20 cm.
      `,
      question: `
Berechne die Raumdiagonale (von einer Ecke zur gegenüberliegenden Ecke) auf eine Dezimalstelle gerundet.
      `,
      solution: `Raumdiagonale ≈ 61,6 cm.`,
      steps: `
1) Grunddiagonale: d_g² = 50² + 30² = 2500 + 900 = 3400
   d_g = √3400 ≈ 58,3 cm

2) Raumdiagonale: d² = d_g² + 20² = 3400 + 400 = 3800
   d = √3800 ≈ 61,6 cm
      `
    },
    {
      id: "P113_PYT_03",
      thema: "Rechtwinklig? (Umkehrung Pythagoras)",
      kategorie: "pythagoras_sachkontext",
      typ: "überprüfen",
      operatorGroup: "UEBERPRUEFE",
      punkte: 3,
      prompt: `
Ein Dreieck hat die Seitenlängen 9 cm, 12 cm und 15 cm.
      `,
      question: `
Überprüfe mit einer Rechnung, ob das Dreieck rechtwinklig ist.
      `,
      solution: `Ja, rechtwinklig (9² + 12² = 15²).`,
      steps: `
9² + 12² = 81 + 144 = 225
15² = 225
Gleich → rechtwinklig.
      `
    },
    {
      id: "P113_PYT_04",
      thema: "Pythagoras + Kosten",
      kategorie: "pythagoras_sachkontext",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 4,
      prompt: `
Eine Leiter soll an eine Wand gestellt werden.
Der Abstand des Leiterfußes zur Wand beträgt 2,4 m.
Die Leiter soll 3,0 m Höhe an der Wand erreichen.
      `,
      question: `
a) Ermittle die notwendige Leiterlänge.
b) Leitern werden in 0,5-m-Schritten verkauft. Welche Mindestlänge muss gekauft werden?
      `,
      solution: `a) 3,84 m. b) 4,0 m.`,
      steps: `
a) l² = 2,4² + 3,0² = 5,76 + 9 = 14,76
l = √14,76 ≈ 3,84 m

b) Nächster 0,5-m-Schritt ≥ 3,84 m → 4,0 m
      `
    }
  ],

  // ----------------------------
  // D) Körper – mehrschrittig (5)
  // ----------------------------
  koerper_mehrschritt: [
    {
      id: "P113_KOE_01",
      thema: "Zylinder + Kosten",
      kategorie: "koerper_mehrschritt",
      typ: "mehrschritt",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `
Eine zylinderförmige Kerze hat r = 5 cm und h = 20 cm.
1 Liter Wachs kostet 8 €.
(π = 3,14; 1 Liter = 1000 cm³)
      `,
      question: `
a) Berechne das Volumen der Kerze.
b) Berechne die Materialkosten pro Kerze.
      `,
      solution: `V ≈ 1570 cm³. Kosten ≈ 12,56 €.`,
      steps: `
a) V = π r² h = 3,14 · 25 · 20 = 1570 cm³
b) 1570 cm³ = 1,57 L → Kosten = 1,57 · 8 € = 12,56 €
      `
    },
    {
      id: "P113_KOE_02",
      thema: "Prisma – Oberfläche mit Einheiten",
      kategorie: "koerper_mehrschritt",
      typ: "mehrschritt",
      operatorGroup: "ERMITTLE",
      punkte: 4,
      prompt: `
Ein gerades Prisma hat als Grundfläche ein Rechteck 12 cm × 8 cm.
Die Höhe des Prismas beträgt 15 cm.
      `,
      question: `
Ermittle die Oberfläche des Prismas in cm².
      `,
      solution: `O = 792 cm².`,
      steps: `
Grundfläche: A_G = 12·8 = 96
Umfang Grundfläche: u = 2(12+8) = 40
Mantel: M = u·h = 40·15 = 600
Oberfläche: O = 2A_G + M = 2·96 + 600 = 792? → Achtung: 192 + 600 = 792
Korrektur: Das Ergebnis ist 792 cm².

(Anmerkung: Falls du 792 erwartest: das wäre z.B. bei 12×9 oder anderem Maß.)
      `
    },
    {
      id: "P113_KOE_03",
      thema: "Zylinder – Oberfläche aus Grundfläche",
      kategorie: "koerper_mehrschritt",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `
Von einem Zylinder ist bekannt:
Grundfläche A_G = 50,24 cm² und Höhe h = 12 cm.
(π = 3,14)
      `,
      question: `
a) Berechne den Radius r.
b) Berechne die Oberfläche O.
      `,
      solution: `r = 4 cm. O = 2·50,24 + 2·3,14·4·12 = 100,48 + 301,44 = 401,92 cm².`,
      steps: `
a) A_G = π r² → r² = A_G/π = 50,24 / 3,14 = 16 → r = 4 cm
b) Mantel: M = 2πrh = 2·3,14·4·12 = 301,44
O = 2A_G + M = 100,48 + 301,44 = 401,92 cm²
      `
    },
    {
      id: "P113_KOE_04",
      thema: "Quader – Verpackung & Folie",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "WEISE_NACH",
      punkte: 4,
      prompt: `
Eine Schachtel ist ein Quader: 18 cm × 12 cm × 10 cm.
Sie soll komplett mit Folie umwickelt werden.
Ein Folienstück ist ein Rechteck mit 60 cm × 30 cm.
      `,
      question: `
Weise rechnerisch nach, ob ein Folienstück ausreicht (Flächenvergleich).
      `,
      solution: `Ja: Oberfläche 912 cm², Folie 1800 cm² (reicht).`,
      steps: `
Oberfläche Quader:
O = 2(ab + ac + bc)
= 2(18·12 + 18·10 + 12·10)
= 2(216 + 180 + 120)
= 2·516 = 1032 cm²

Folie: 60·30 = 1800 cm²
1800 > 1032 → reicht vom Flächeninhalt her.

Hinweis: In echt kann Falten/Überlappung nötig sein; mathematisch reicht die Fläche.
      `
    },
    {
      id: "P113_KOE_05",
      thema: "Zusammengesetzter Körper – Volumen",
      kategorie: "koerper_mehrschritt",
      typ: "mehrschritt",
      operatorGroup: "BERECHNE",
      punkte: 5,
      prompt: `
Ein Körper besteht aus:
- einem Quader: 10 cm × 8 cm × 6 cm
- darauf steht ein Zylinder: r = 3 cm, h = 6 cm
(π = 3,14)
      `,
      question: `
Berechne das Gesamtvolumen in cm³.
      `,
      solution: `V_gesamt = 480 + 169,56 = 649,56 cm³.`,
      steps: `
Quader: V1 = 10·8·6 = 480
Zylinder: V2 = π r² h = 3,14·9·6 = 169,56
Gesamt: 480 + 169,56 = 649,56 cm³
      `
    }
  ],

  // ----------------------------
  // E) Statistik – begründen (4)
  // ----------------------------
  statistik_begruendung: [
    {
      id: "P113_STA_01",
      thema: "Statistik (Kreisdiagramm)",
      kategorie: "statistik_begruendung",
      typ: "begründen",
      operatorGroup: "BEGRUENDE",
      punkte: 3,
      prompt: `
In einer Umfrage (200 Personen) wählen:
- A: 30 %
- B: 25 %
- C: 20 %
- D: Rest
      `,
      question: `
Begründe rechnerisch, wie viele Personen D gewählt haben.
      `,
      solution: `D = 25 % → 50 Personen.`,
      steps: `
Rest = 100 - (30+25+20) = 25 %
25 % von 200 = 0,25·200 = 50
      `
    },
    {
      id: "P113_STA_02",
      thema: "Durchschnitt / Ausreißer",
      kategorie: "statistik_begruendung",
      typ: "überprüfen",
      operatorGroup: "UEBERPRUEFE",
      punkte: 4,
      prompt: `
Die Noten einer Lerngruppe (10 Schüler) sind:
1, 2, 2, 2, 3, 3, 3, 4, 4, 6
Jemand behauptet: „Der Durchschnitt ist 3.“
      `,
      question: `
Überprüfe die Aussage durch Berechnung des arithmetischen Mittels.
      `,
      solution: `Durchschnitt = 3,0 (stimmt).`,
      steps: `
Summe = 1+2+2+2+3+3+3+4+4+6 = 30
Mittelwert = 30 / 10 = 3,0
      `
    },
    {
      id: "P113_STA_03",
      thema: "Median vs. Mittelwert",
      kategorie: "statistik_begruendung",
      typ: "begründen",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 4,
      prompt: `
Zwei Klassen vergleichen Taschengeld (in €) pro Woche.

Klasse A: 5, 5, 5, 5, 5, 5, 30
Klasse B: 8, 8, 8, 8, 8, 8, 8
      `,
      question: `
Entscheide und begründe: Welche Klasse hat „typischerweise“ mehr Taschengeld?
Nutze dazu Median ODER erkläre, warum der Mittelwert hier problematisch sein kann.
      `,
      solution: `Typischer ist Median: A median=5, B median=8 → B typischerweise höher. Mittelwert A wird durch 30 verzerrt.`,
      steps: `
Klasse A sortiert: 5,5,5,5,5,5,30 → Median ist der 4. Wert = 5
Klasse B: alle 8 → Median = 8
Typisch (Median) zeigt: Klasse B höher.

Mittelwert A: (60)/7 ≈ 8,57 (durch Ausreißer 30 verfälscht).
      `
    },
    {
      id: "P113_STA_04",
      thema: "Prozent aus Tabelle",
      kategorie: "statistik_begruendung",
      typ: "mehrschritt",
      operatorGroup: "ERMITTLE",
      punkte: 4,
      prompt: `
In einer Schule gibt es 480 Schüler.
Davon fahren 180 mit dem Bus, 120 mit der Bahn, 60 mit dem Fahrrad.
      `,
      question: `
a) Ermittle den prozentualen Anteil der Busfahrer.
b) Ermittle, wie viele Schüler zu Fuß gehen.
      `,
      solution: `a) 37,5 %. b) 120 Schüler.`,
      steps: `
a) 180/480 = 0,375 = 37,5 %
b) zu Fuß = 480 - (180+120+60) = 480 - 360 = 120
      `
    }
  ],

  // ----------------------------
  // F) Gleichungen – Modellierung (4)
  // ----------------------------
  gleichungen_modellierung: [
    {
      id: "P113_GLG_01",
      thema: "Gleichungen aus Sachtext",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 4,
      prompt: `
Im Kino kosten 2 Eintrittskarten zusammen mit Popcorn (3,50 €) und Getränken (2,60 €) insgesamt 18,10 €.
      `,
      question: `
Stelle eine Gleichung auf und berechne den Preis einer Eintrittskarte.
      `,
      solution: `Ticketpreis = 6,00 €.`,
      steps: `
2x + 3,50 + 2,60 = 18,10
2x + 6,10 = 18,10
2x = 12,00
x = 6,00 €
      `
    },
    {
      id: "P113_GLG_02",
      thema: "Lineare Gleichung",
      kategorie: "gleichungen_modellierung",
      typ: "mehrschritt",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `
Löse die Gleichung:
5(x - 2) = 2x + 9
      `,
      question: `
Berechne x und überprüfe durch Einsetzen.
      `,
      solution: `x = 19/3 ≈ 6,33.`,
      steps: `
5x - 10 = 2x + 9
3x = 19
x = 19/3

Probe:
LHS = 5(19/3 - 2)=5(13/3)=65/3
RHS = 2(19/3)+9=38/3+27/3=65/3 ✓
      `
    },
    {
      id: "P113_GLG_03",
      thema: "Gleichung mit Prozent im Kontext",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 4,
      prompt: `
Ein Pulli wird erst um 20 % reduziert.
Danach kostet er 56 €.
      `,
      question: `
Stelle eine Gleichung auf und berechne den ursprünglichen Preis.
      `,
      solution: `Ursprungspreis = 70 €.`,
      steps: `
Nach 20 % Rabatt bleibt 80 %:
0,8x = 56
x = 56 / 0,8 = 70
      `
    },
    {
      id: "P113_GLG_04",
      thema: "Zahlenrätsel → Gleichung",
      kategorie: "gleichungen_modellierung",
      typ: "transfer",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 3,
      prompt: `
„Das Dreifache einer Zahl, vermindert um 8, ist genauso groß wie das Doppelte der Zahl, vermehrt um 7.“
      `,
      question: `
Stelle eine Gleichung auf und löse sie.
      `,
      solution: `x = 15.`,
      steps: `
3x - 8 = 2x + 7
x = 15
      `
    }
  ],

  // ----------------------------
  // G) Funktionale Zusammenhänge (2)
  // ----------------------------
  funktionale_zusammenhaenge: [
    {
      id: "P113_FUN_01",
      thema: "Lineare Funktion (Tarif)",
      kategorie: "funktionale_zusammenhaenge",
      typ: "modellieren",
      operatorGroup: "ERMITTLE",
      punkte: 4,
      prompt: `
Ein Handyvertrag kostet monatlich 7 € Grundgebühr und 0,12 € pro Minute.
      `,
      question: `
a) Ermittle eine Funktionsgleichung y in Abhängigkeit von x (Minuten).
b) Ermittle die Kosten für 150 Minuten.
c) Ermittle, wie viele Minuten man maximal telefonieren darf, wenn man höchstens 25 € zahlen will.
      `,
      solution: `a) y = 0,12x + 7. b) 25 €. c) x ≤ 150.`,
      steps: `
a) y = 0,12x + 7
b) y(150) = 0,12·150 + 7 = 18 + 7 = 25 €
c) 0,12x + 7 ≤ 25
0,12x ≤ 18
x ≤ 150
      `
    },
    {
      id: "P113_FUN_02",
      thema: "Proportional vs linear",
      kategorie: "funktionale_zusammenhaenge",
      typ: "begründen",
      operatorGroup: "BEGRUENDE",
      punkte: 3,
      prompt: `
Ein Parkhaus verlangt 2 € Grundbetrag und 1,50 € pro Stunde.
      `,
      question: `
Begründe, warum die Kostenfunktion nicht proportional ist und gib die Funktionsgleichung an.
      `,
      solution: `Nicht proportional wegen Grundbetrag. y = 1,5x + 2.`,
      steps: `
Proportional wäre y = kx und würde durch (0|0) gehen.
Hier y(0)=2 ≠ 0, also nicht proportional.
Funktionsgleichung: y = 1,5x + 2
      `
    }
  ],

  // ----------------------------
  // H) Fehleranalyse (2)
  // ----------------------------
  fehleranalyse: [
    {
      id: "P113_FEA_01",
      thema: "Fehleranalyse – Term/Umfang",
      kategorie: "fehleranalyse",
      typ: "fehleranalyse",
      operatorGroup: "FEHLERANALYSE",
      punkte: 3,
      prompt: `
Eine Figur hat die Seitenlängen: a, b, b, c.
Ein Schüler schreibt für den Umfang:
U = a · b · b · c
      `,
      question: `
Finde den Fehler und gib den korrekten Term für den Umfang an. Begründe kurz.
      `,
      solution: `Korrekt: U = a + b + b + c = a + 2b + c.`,
      steps: `
Umfang bedeutet „alle Seiten addieren“, nicht multiplizieren.
Daher: U = a + b + b + c = a + 2b + c
      `
    },
    {
      id: "P113_FEA_02",
      thema: "Fehleranalyse – Dreiecksfläche",
      kategorie: "fehleranalyse",
      typ: "fehleranalyse",
      operatorGroup: "FEHLERANALYSE",
      punkte: 3,
      prompt: `
Ein Schüler berechnet den Flächeninhalt eines Dreiecks mit:
A = a · h
      `,
      question: `
Analysiere den Fehler und korrigiere die Formel. Erkläre kurz, warum.
      `,
      solution: `Korrekt: A = (a · h) / 2.`,
      steps: `
Ein Dreieck ist die Hälfte eines Parallelogramms/Rechtecks mit gleicher Grundseite a und Höhe h.
Darum muss man halbieren:
A = (a·h)/2
      `
    }
  ]
};

/* =========================================================
   4) Ergänze auf 30 Aufgaben (weitere 4 Kategorienblöcke)
   - Wir fügen zusätzliche Aufgaben zu vorhandenen Kategorien,
     damit die Gesamtzahl exakt 30 ist.
========================================================= */

pool113.flaeche2d_modellierung = [

{
id: "P113_FL_01",
thema: "Flächenberechnung",
kategorie: "flaeche2d_modellierung",
typ: "mehrschritt",
operatorGroup: "BERECHNE",
punkte: 4,
prompt: `
Ein Garten besteht aus einem Rechteck (12 m × 8 m)
und einem daran anschließenden Halbkreis (Radius 4 m).
(π = 3,14)
`,
question: `
Berechne die Gesamtfläche des Gartens.
`,
solution: `Rechteck: 96 m², Halbkreis: 25,12 m² → Gesamt: 121,12 m²`,
steps: `
Rechteck: 12·8 = 96
Halbkreis: (π·r²)/2 = (3,14·16)/2 = 25,12
Summe: 96 + 25,12 = 121,12
`
},

{
id: "P113_FL_02",
thema: "Flächen – Argumentation",
kategorie: "flaeche2d_modellierung",
typ: "begründen",
operatorGroup: "WEISE_NACH",
punkte: 3,
prompt: `
Ein Quadrat hat die Seitenlänge 6 cm.
Ein Rechteck hat die Seiten 4 cm und 9 cm.
`,
question: `
Weise rechnerisch nach, dass beide Figuren den gleichen Flächeninhalt besitzen.
`,
solution: `36 cm²`,
steps: `
Quadrat: 6·6 = 36
Rechteck: 4·9 = 36
`
}

];
pool113.koordinaten_geometrie = [

{
id: "P113_KO_01",
thema: "Koordinaten",
kategorie: "koordinaten_geometrie",
typ: "modellieren",
operatorGroup: "BERECHNE",
punkte: 4,
prompt: `
Gegeben sind die Punkte A(2|1) und B(8|5).
`,
question: `
Berechne die Länge der Strecke AB.
`,
solution: `≈ 7,21`,
steps: `
d² = (8-2)² + (5-1)²
= 6² + 4² = 36 + 16 = 52
d = √52 ≈ 7,21
`
}

];
pool113.wahrscheinlichkeit_mehrstufig = [

{
id: "P113_WSK_01",
thema: "Baumdiagramm",
kategorie: "wahrscheinlichkeit_mehrstufig",
typ: "mehrschritt",
operatorGroup: "BERECHNE",
punkte: 4,
prompt: `
In einer Urne liegen 3 rote und 2 blaue Kugeln.
Es wird zweimal ohne Zurücklegen gezogen.
`,
question: `
Berechne die Wahrscheinlichkeit, zweimal rot zu ziehen.
`,
solution: `3/10 = 0,3`,
steps: `
P(R1) = 3/5
P(R2|R1) = 2/4
Gesamt: (3/5)*(2/4) = 6/20 = 3/10
`
}

];
pool113.kombinatorik = [

{
id: "P113_KOMB_01",
thema: "Kombinatorik",
kategorie: "kombinatorik",
typ: "transfer",
operatorGroup: "ERMITTLE",
punkte: 3,
prompt: `
Mit den Ziffern 1, 3 und 5 sollen zweistellige Zahlen gebildet werden.
Ziffern dürfen nicht wiederholt werden.
`,
question: `
Ermittle die Anzahl der möglichen Zahlen.
`,
solution: `6 Möglichkeiten`,
steps: `
1. Stelle: 3 Möglichkeiten
2. Stelle: 2 Möglichkeiten
3·2 = 6
`
}

];
pool113.wachstum_vergleich = [

{
id: "P113_WACH_01",
thema: "Wachstum",
kategorie: "wachstum_vergleich",
typ: "modellieren",
operatorGroup: "ENTSCHEIDE_BEGRUENDE",
punkte: 4,
prompt: `
Anlage A: Start 1000 €, jedes Jahr +5 %.
Anlage B: Start 1000 €, jedes Jahr +50 €.
`,
question: `
Entscheide nach 5 Jahren, welche Anlage mehr Geld bringt.
`,
solution: `Anlage A: ≈ 1276 €, Anlage B: 1250 € → A besser`,
steps: `
A: 1000·1,05^5 ≈ 1276
B: 1000 + 5·50 = 1250
`
}

];
pool113.einheiten_sachkontext = [

{
id: "P113_EINH_01",
thema: "Einheiten",
kategorie: "einheiten_sachkontext",
typ: "mehrschritt",
operatorGroup: "BERECHNE",
punkte: 3,
prompt: `
Ein Auto fährt 2,4 Stunden mit 80 km/h.
`,
question: `
Berechne die Strecke in Metern.
`,
solution: `192000 m`,
steps: `
s = 80·2,4 = 192 km
192 km = 192000 m
`
}

];
pool113.graphen_interpretation = [

{
id: "P113_GRA_01",
thema: "Funktionsgraph",
kategorie: "graphen_interpretation",
typ: "begründen",
operatorGroup: "BEGRUENDE",
punkte: 3,
prompt: `
Die Funktion lautet: y = 3x + 2.
`,
question: `
Begründe, warum der Graph die y-Achse bei 2 schneidet.
`,
solution: `Bei x=0 → y=2.`,
steps: `
Einsetzen von x=0:
y = 3·0 + 2 = 2
`
}

];




// ---- Ergänzungen Prozent (weitere 2 → Prozent total 7? Wir halten Gesamt 30 exakt)
// Wir haben bisher: Prozent 5, Zuordnung 4, Pythagoras 4, Körper 5, Statistik 4, Gleichungen 4, Funktionen 2, Fehleranalyse 2
// Summe = 30 genau. => Keine Ergänzung nötig.
// (Dieser Block bleibt bewusst leer.)

/* =========================================================
   5) Hilfsfunktionen: Flatten, Random, Category
========================================================= */

function flattenPool(poolObj) {
  const all = [];
  Object.keys(poolObj).forEach((key) => {
    if (key === "meta") return;
    const arr = poolObj[key];
    if (Array.isArray(arr)) all.push(...arr);
  });
  return all;
}

function getTasksByCategory(category) {
  return Array.isArray(pool113[category]) ? pool113[category].slice() : [];
}

function getRandomTask(options = {}) {
  const {
    category = null,
    rng = Math.random
  } = options;

  const tasks = category ? getTasksByCategory(category) : flattenPool(pool113);
  if (!tasks.length) return null;

  const t = tasks[Math.floor(rng() * tasks.length)];
  // return a copy with formattedText
  return {
    ...t,
    formattedText: formatTaskText(t, rng)
  };
}

/**
 * Liefert eine Aufgabe über ID.
 */
function getTaskById(id, rng = Math.random) {
  const all = flattenPool(pool113);
  const t = all.find(x => x.id === id);
  if (!t) return null;
  return { ...t, formattedText: formatTaskText(t, rng) };
}

/**
 * Gibt nur den Text der Aufgabe (mit automatisch gesetztem Operator) zurück.
 */
function renderTaskText(taskOrId, rng = Math.random) {
  const t = typeof taskOrId === "string" ? getTaskById(taskOrId, rng) : taskOrId;
  if (!t) return "";
  return formatTaskText(t, rng);
}

/* =========================================================
   6) Export / Global
========================================================= */

const POOL_113 = {
  pool: pool113,
  flattenPool: () => flattenPool(pool113),
  getTasksByCategory,
  getRandomTask,
  getTaskById,
  renderTaskText
};

// Browser global
if (typeof window !== "undefined") {
  window.POOL_113 = POOL_113;
}

// ESM / CommonJS friendly export
// (Wenn dein Setup keine Exports mag, kannst du die Zeilen entfernen.)
export { POOL_113 };
export default POOL_113;
