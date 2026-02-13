/* =========================================================
   pool113.js – BBR Niveau 2-1 (Note 2–1)
   VOLLSTÄNDIG ergänzt mit allen BBR-Prüfungsaufgaben 2014-2019
   Enthält: Prozent (Rabattkette, Skonto, MwSt), Zinsrechnung,
   Pythagoras (Sachkontext), Körper (Zylinder, Prisma, Quader),
   Zusammengesetzte Körper, Statistik (Mittelwert, Median, Spannweite),
   Zuordnungen (proportional/antiproportional), Wahrscheinlichkeit (mehrstufig),
   Gleichungen (modellieren), Wachstumsvergleich, Flächen 2D,
   Volumen, Oberfläche, Maßstab, Diagramme
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
   OPERATOR-GRUPPEN (BBR-Stil)
========================================================= */
const OPERATOR_GROUPS = {
  BERECHNE: ["berechne", "ermittle", "bestimme"],
  ERMITTLE: ["ermittle", "bestimme", "berechne"],
  BESTIMME: ["bestimme", "ermittle", "berechne"],
  WEISE_NACH: ["weise nach", "zeige, dass"],
  UEBERPRUEFE: ["überprüfe", "prüfe"],
  BEGRUENDE: ["begründe", "erläutere"],
  ENTSCHEIDE_BEGRUENDE: ["entscheide und begründe"],
  STELLE_GLEICHUNG: ["stelle eine Gleichung auf und berechne"],
  ERGAENZE: ["ergänze"],
  ZEICHNE: ["zeichne", "vervollständige"]
};

function pickFrom(arr, rng = Math.random) {
  return arr[Math.floor(rng() * arr.length)];
}

function getOperatorPhrase(operatorGroup, rng = Math.random) {
  const list = OPERATOR_GROUPS[operatorGroup] || ["berechne"];
  if (operatorGroup === "ENTSCHEIDE_BEGRUENDE") return "Entscheide und begründe";
  const op = pickFrom(list, rng);
  return op.charAt(0).toUpperCase() + op.slice(1);
}

function formatTaskText(task, rng = Math.random) {
  const opPhrase = getOperatorPhrase(task.operatorGroup, rng);
  const header = `${opPhrase}:`;
  const parts = [
    `**${task.id}** (${task.thema} | ${task.kategorie} | ${task.punkte} P)`,
    ``,
    `${header}`,
    task.prompt.trim(),
    ``,
    task.question.trim()
  ];
  return parts.join("\n");
}

/* =========================================================
   POOL-DATEN (NUR BBR Niveau 2-1)
========================================================= */

const pool113 = {
  meta: {
    niveau: "BBR Niveau 2-1 (Note 2–1)",
    ziel: "BBR Prüfungsniveau, VA9 2014–2019",
    version: "2026-02-13 (vollständig ergänzt)"
  },

  // ---------- PROZENT / RABATT / ZINS / MwSt / SKONTO ----------
  prozent_modellierung: [
    // Rabattkette
    {
      id: "P113_PRO_01",
      thema: "Prozentrechnung - Rabattkette",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "UEBERPRUEFE",
      punkte: 3,
      prompt: `Ein Fernseher kostet ursprünglich 800 €. Er wird zuerst um 20 % reduziert und danach nochmals um 10 %. Ein Kunde behauptet: „Das sind insgesamt 30 % Rabatt.“`,
      question: `Überprüfe die Aussage rechnerisch und gib den tatsächlichen Gesamtrabatt in % an.`,
      solution: `Endpreis 576 €. Gesamtrabatt 28 % (nicht 30 %).`,
      steps: `1) 800 · 0,80 = 640 €; 2) 640 · 0,90 = 576 €; 3) 800 - 576 = 224 € Ersparnis; 4) 224/800 = 28 %.`
    },
    {
      id: "P113_PRO_01b",
      thema: "Prozentrechnung - Rabattkette",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Pullover kostet 60 €. Er wird erst um 20 %, dann um weitere 15 % reduziert.`,
      question: `Berechne den Endpreis und den Gesamtrabatt in Prozent.`,
      solution: `Endpreis 40,80 €, Gesamtrabatt 32 %.`,
      steps: `1) 60 · 0,80 = 48 €; 2) 48 · 0,85 = 40,80 €; 3) (60 - 40,80)/60 = 0,32 = 32 %.`
    },
    
    // Anzahlung
    {
      id: "P113_PRO_02",
      thema: "Prozentrechnung - Anzahlung",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Motorroller kostet 2.400 €. Du zahlst 20 % Anzahlung.`,
      question: `Berechne den Anzahlungsbetrag.`,
      solution: `480 €.`,
      steps: `2.400 € · 0,20 = 480 €.`
    },
    
    // Mehrwertsteuer
    {
      id: "P113_PRO_03",
      thema: "Mehrwertsteuer",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Fernseher kostet netto 650 €. Die Mehrwertsteuer beträgt 19 %.`,
      question: `Berechne den Bruttopreis.`,
      solution: `773,50 €.`,
      steps: `650 € · 1,19 = 773,50 €.`
    },
    {
      id: "P113_PRO_03b",
      thema: "Mehrwertsteuer rückwärts",
      kategorie: "prozent_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Fernseher kostet brutto 714 € (inkl. 19 % MwSt).`,
      question: `Berechne den Nettopreis.`,
      solution: `600 €.`,
      steps: `714 : 1,19 = 600 €.`
    },
    
    // Wertverlust
    {
      id: "P113_PRO_04",
      thema: "Prozent – Wertverlust",
      kategorie: "prozent_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Neuwagen verliert im ersten Jahr 25 % an Wert, im zweiten Jahr weitere 15 % (vom Restwert). Der Kaufpreis betrug 32.000 €.`,
      question: `Berechne den Restwert nach zwei Jahren und gib an, wie viel Prozent des ursprünglichen Preises noch vorhanden sind.`,
      solution: `Restwert 20.400 €. Anteil 63,75 %.`,
      steps: `1) Nach Jahr 1: 32.000 · 0,75 = 24.000 €; 2) Nach Jahr 2: 24.000 · 0,85 = 20.400 €; 3) 20.400 / 32.000 = 0,6375 = 63,75 %.`
    },
    
    // Skonto
    {
      id: "P113_PRO_05",
      thema: "Skonto",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Eine Rechnung über 1.200 € wird unter Abzug von 3 % Skonto bezahlt.`,
      question: `Berechne den Zahlungsbetrag.`,
      solution: `1.164 €.`,
      steps: `1.200 € · 0,97 = 1.164 €.`
    },
    
    // Prozent rückwärts
    {
      id: "P113_PRO_06",
      thema: "Prozent – Rückwärts",
      kategorie: "prozent_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Nach einer Preiserhöhung um 15 % kostet ein Paar Schuhe nun 138 €.`,
      question: `Berechne den ursprünglichen Preis der Schuhe vor der Erhöhung.`,
      solution: `120 €.`,
      steps: `1) 115 % = 138 €; 2) 138 / 1,15 = 120 €.`
    },
    
    // Zinsrechnung - Zeit
    {
      id: "P113_PRO_07",
      thema: "Zinsrechnung – Zeit",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Kapital von 5.000 € wird zu einem Zinssatz von 2 % p.a. angelegt.`,
      question: `Berechne die Zinsen, die nach genau 9 Monaten gutgeschrieben werden.`,
      solution: `75 €.`,
      steps: `1) Jahreszinsen: 5.000 · 0,02 = 100 €; 2) 100 · (9/12) = 75 €.`
    },
    
    // Rabatt Prozentsatz
    {
      id: "P113_PRO_08",
      thema: "Rabatt Prozentsatz",
      kategorie: "prozent_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein T-Shirt kostete 25 € und wird jetzt für 20 € angeboten.`,
      question: `Berechne den Rabatt in Prozent.`,
      solution: `20 %.`,
      steps: `1) Ersparnis: 25 - 20 = 5 €; 2) 5/25 = 0,20 = 20 %.`
    },
    
    // Zinsrechnung - Zinssatz
    {
      id: "P113_PRO_09",
      thema: "Zinsrechnung – Zinssatz",
      kategorie: "prozent_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Frau Mayer nimmt einen Kredit von 2.200 € auf und zahlt nach einem Jahr 121 € Zinsen.`,
      question: `Berechne den Zinssatz.`,
      solution: `5,5 %.`,
      steps: `1) 121 / 2200 = 0,055 = 5,5 %.`
    }
  ],

  // ---------- ZUORDNUNGEN (PROPORTIONAL/ANTIPROPORTIONAL) ----------
  zuordnung_transfer: [
    {
      id: "P113_ZUO_01",
      thema: "Proportionale Zuordnung - Verbrauch",
      kategorie: "zuordnung_transfer",
      typ: "überprüfen",
      operatorGroup: "WEISE_NACH",
      punkte: 3,
      prompt: `Ein Auto verbraucht auf 100 km 6 Liter Benzin. Ein Fahrer behauptet: „Mit einem 45-Liter-Tank komme ich genau 800 km weit.“`,
      question: `Weise rechnerisch nach, ob die Aussage stimmt, und gib die tatsächliche Reichweite an.`,
      solution: `Falsch. Reichweite 750 km.`,
      steps: `1) 45 / 6 = 7,5; 2) 7,5 · 100 = 750 km.`
    },
    {
      id: "P113_ZUO_01b",
      thema: "Proportionale Zuordnung - Kosten",
      kategorie: "zuordnung_transfer",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `3 Brötchen kosten 1,20 €.`,
      question: `Berechne den Preis für 5 Brötchen.`,
      solution: `2,00 €.`,
      steps: `1) 1,20 : 3 = 0,40 € pro Brötchen; 2) 0,40 · 5 = 2,00 €.`
    },
    {
      id: "P113_ZUO_02",
      thema: "Proportionale Zuordnung - Zeit",
      kategorie: "zuordnung_transfer",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Im Kletterpark kostet der Eintritt 4 € pro Stunde.`,
      question: `Berechne den Preis für 3,5 Stunden.`,
      solution: `14 €.`,
      steps: `4 € · 3,5 = 14 €.`
    },
    {
      id: "P113_ZUO_03",
      thema: "Antiproportionale Zuordnung - Arbeiter",
      kategorie: "zuordnung_transfer",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `3 Bagger benötigen 12 Stunden, um eine Baugrube auszuheben.`,
      question: `Ermittle, wie viele Stunden 4 Bagger bei gleicher Arbeitsleistung benötigen würden.`,
      solution: `9 Stunden.`,
      steps: `1) Gesamtleistung: 3 · 12 = 36 Baggerstunden; 2) 36 / 4 = 9 Stunden.`
    },
    {
      id: "P113_ZUO_04",
      thema: "Antiproportionale Zuordnung - Futter",
      kategorie: "zuordnung_transfer",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Futtervorrat reicht für 20 Pferde genau 30 Tage lang.`,
      question: `Berechne, wie lange der Vorrat reicht, wenn 5 Pferde verkauft werden.`,
      solution: `40 Tage.`,
      steps: `1) 20 Pferde · 30 Tage = 600 Pferdetage; 2) 20 - 5 = 15 Pferde; 3) 600 / 15 = 40 Tage.`
    },
    {
      id: "P113_ZUO_05",
      thema: "Proportionale Zuordnung - Maschinen",
      kategorie: "zuordnung_transfer",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `In einer Fabrik stellen 5 Maschinen in einer Stunde 250 Bauteile her.`,
      question: `Ermittle, wie viele Bauteile 8 Maschinen in der gleichen Zeit herstellen.`,
      solution: `400 Bauteile.`,
      steps: `1) 250 / 5 = 50 Bauteile pro Maschine; 2) 50 · 8 = 400 Bauteile.`
    },
    {
      id: "P113_ZUO_06",
      thema: "Antiproportionale Zuordnung - Zeit",
      kategorie: "zuordnung_transfer",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `2 Maschinen benötigen 9 Stunden für einen Auftrag.`,
      question: `Ermittle, wie viele Stunden 3 Maschinen benötigen.`,
      solution: `6 Stunden.`,
      steps: `1) 2 · 9 = 18 Maschinenstunden; 2) 18 / 3 = 6 Stunden.`
    }
  ],

  // ---------- PYTHAGORAS (SACHKONTEXT) ----------
  pythagoras_sachkontext: [
    {
      id: "P113_PYT_01",
      thema: "Satz des Pythagoras - Schirm",
      kategorie: "pythagoras_sachkontext",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 3,
      prompt: `Ein 70 cm langer Regenschirm soll in einen Koffer gelegt werden. Der Koffer ist innen 60 cm lang und 40 cm breit.`,
      question: `Entscheide und begründe rechnerisch, ob der Schirm diagonal hineinpasst.`,
      solution: `Ja. Diagonale ≈ 72,1 cm > 70 cm.`,
      steps: `1) d² = 60² + 40² = 3600 + 1600 = 5200; 2) d = √5200 ≈ 72,1 cm.`
    },
    {
      id: "P113_PYT_02",
      thema: "Pythagoras – rechtwinklig prüfen",
      kategorie: "pythagoras_sachkontext",
      typ: "überprüfen",
      operatorGroup: "UEBERPRUEFE",
      punkte: 3,
      prompt: `Ein Dreieck hat die Seitenlängen 12 cm, 16 cm und 20 cm.`,
      question: `Überprüfe, ob das Dreieck rechtwinklig ist.`,
      solution: `Ja. 20² = 400; 12² + 16² = 144 + 256 = 400.`,
      steps: `1) 20² = 400; 2) 12² + 16² = 144 + 256 = 400; 3) 400 = 400 → rechtwinklig.`
    },
    {
      id: "P113_PYT_02b",
      thema: "Pythagoras – nicht rechtwinklig",
      kategorie: "pythagoras_sachkontext",
      typ: "überprüfen",
      operatorGroup: "UEBERPRUEFE",
      punkte: 3,
      prompt: `Ein Dreieck hat die Seitenlängen 7 cm, 8 cm und 10 cm.`,
      question: `Überprüfe, ob das Dreieck rechtwinklig ist.`,
      solution: `Nein. 10² = 100, 7² + 8² = 49 + 64 = 113.`,
      steps: `1) 10² = 100; 2) 7² + 8² = 49 + 64 = 113; 3) 100 ≠ 113 → nicht rechtwinklig.`
    },
    {
      id: "P113_PYT_03",
      thema: "Pythagoras – Sendemast",
      kategorie: "pythagoras_sachkontext",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Sendemast ist 24 m hoch. Er soll mit vier Seilen abgespannt werden, die jeweils 7 m vom Mastfuß entfernt am Boden verankert werden.`,
      question: `Berechne die Gesamtlänge der benötigten Seile (ohne Verschnitt).`,
      solution: `100 m.`,
      steps: `1) s² = 24² + 7² = 576 + 49 = 625; 2) s = √625 = 25 m pro Seil; 3) 25 · 4 = 100 m.`
    },
    {
      id: "P113_PYT_04",
      thema: "Pythagoras – Leiter",
      kategorie: "pythagoras_sachkontext",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Eine 5 m lange Leiter wird an eine Hauswand gelehnt. Der Fuß der Leiter steht 1,50 m von der Wand entfernt.`,
      question: `Berechne, in welcher Höhe die Leiter die Hauswand berührt (Runde auf zwei Dezimalstellen).`,
      solution: `ca. 4,77 m.`,
      steps: `1) h² = 5² - 1,5² = 25 - 2,25 = 22,75; 2) h = √22,75 ≈ 4,77 m.`
    },
    {
      id: "P113_PYT_05",
      thema: "Pythagoras – TV Diagonale",
      kategorie: "pythagoras_sachkontext",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `Ein Bildschirm ist 48 cm breit und 27 cm hoch.`,
      question: `Ermittle die Bildschirmdiagonale in cm.`,
      solution: `ca. 55 cm.`,
      steps: `1) d² = 48² + 27² = 2304 + 729 = 3033; 2) d = √3033 ≈ 55,07 cm.`
    },
    {
      id: "P113_PYT_06",
      thema: "Pythagoras – Drachen",
      kategorie: "pythagoras_sachkontext",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Drachen wird mit einer 100 m langen Schnur gehalten. Brian steht 80 m von Long entfernt, der Drachen ist genau über Brian.`,
      question: `Berechne, wie hoch der Drachen fliegt.`,
      solution: `60 m.`,
      steps: `1) h² = 100² - 80² = 10000 - 6400 = 3600; 2) h = √3600 = 60 m.`
    }
  ],

  // ---------- KÖRPERBERECHNUNG (VOLUMEN/OBERFLÄCHE) ----------
  koerper_mehrschritt: [
    {
      id: "P113_KOE_01",
      thema: "Zylinder + Kosten",
      kategorie: "koerper_mehrschritt",
      typ: "mehrschritt",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Eine zylinderförmige Kerze hat r = 5 cm und h = 20 cm. 1 Liter Wachs kostet 8 €. (π = 3,14; 1 Liter = 1000 cm³)`,
      question: `a) Berechne das Volumen der Kerze. b) Berechne die Materialkosten pro Kerze.`,
      solution: `V ≈ 1570 cm³. Kosten ≈ 12,56 €.`,
      steps: `1) V = 3,14 · 5² · 20 = 3,14 · 25 · 20 = 1570 cm³; 2) 1570 cm³ = 1,57 L; 3) 1,57 · 8 = 12,56 €.`
    },
    {
      id: "P113_KOE_01b",
      thema: "Zylinder - Volumen in Liter",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Glas hat einen Durchmesser von 6 cm und eine Höhe von 10 cm.`,
      question: `Berechne das Volumen in Litern. (1 ℓ = 1 dm³)`,
      solution: `ca. 0,283 ℓ.`,
      steps: `1) r = 3 cm; 2) V = 3,14 · 3² · 10 = 3,14 · 9 · 10 = 282,6 cm³; 3) 282,6 cm³ = 0,2826 dm³ = 0,2826 ℓ.`
    },
    {
      id: "P113_KOE_02",
      thema: "Quader – Volumen und Liter",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Aquarium ist 80 cm lang, 40 cm breit und 50 cm hoch.`,
      question: `Berechne das Volumen in Litern.`,
      solution: `160 Liter.`,
      steps: `1) V = 80 · 40 · 50 = 160.000 cm³; 2) 160.000 cm³ = 160 dm³ = 160 Liter.`
    },
    {
      id: "P113_KOE_03",
      thema: "Prisma – Zelt",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Zelt hat die Form eines Dreiecksprismas. Die Grundfläche ist ein Dreieck mit g = 3 m und h = 2 m. Das Zelt ist 4 m lang.`,
      question: `Berechne das Volumen des Zeltes.`,
      solution: `12 m³.`,
      steps: `1) A_Dreieck = (3 · 2) : 2 = 3 m²; 2) V = 3 · 4 = 12 m³.`
    },
    {
      id: "P113_KOE_04",
      thema: "Zusammengesetzter Körper",
      kategorie: "koerper_mehrschritt",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Werkstück besteht aus einem Quader (5 cm × 4 cm × 3 cm) und einem aufgesetzten Würfel (Seite 2 cm).`,
      question: `Berechne das Gesamtvolumen.`,
      solution: `68 cm³.`,
      steps: `1) V_Quader = 5 · 4 · 3 = 60 cm³; 2) V_Würfel = 2 · 2 · 2 = 8 cm³; 3) 60 + 8 = 68 cm³.`
    },
    {
      id: "P113_KOE_04b",
      thema: "Zusammengesetzter Körper - Werkstück",
      kategorie: "koerper_mehrschritt",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Werkstück besteht aus einem Quader (42 mm × 24 mm × 12 mm) und einem aufgesetzten Dreiecksprisma (Dreieck: Grundseite 42 mm, Höhe 34 mm, Tiefe 24 mm).`,
      question: `Berechne das Gesamtvolumen.`,
      solution: `29.232 mm³.`,
      steps: `1) V_Quader = 42 · 24 · 12 = 12.096 mm³; 2) V_Prisma = (42 · 34 : 2) · 24 = 714 · 24 = 17.136 mm³; 3) 12.096 + 17.136 = 29.232 mm³.`
    },
    {
      id: "P113_KOE_05",
      thema: "Zylinder – Oberfläche",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Eine Konservendose hat einen Durchmesser von 10 cm und eine Höhe von 12 cm. (π = 3,14)`,
      question: `Berechne die Mantelfläche der Dose (Fläche für das Etikett).`,
      solution: `376,8 cm².`,
      steps: `1) r = 5 cm; 2) M = 2 · π · r · h = 2 · 3,14 · 5 · 12 = 376,8 cm².`
    },
    {
      id: "P113_KOE_06",
      thema: "Würfel – Kantenlänge",
      kategorie: "koerper_mehrschritt",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `Ein Würfel hat ein Volumen von 216 cm³.`,
      question: `Ermittle die Kantenlänge a und die Oberfläche des Würfels.`,
      solution: `a = 6 cm; O = 216 cm².`,
      steps: `1) a = ∛216 = 6 cm; 2) O = 6 · a² = 6 · 36 = 216 cm².`
    },
    {
      id: "P113_KOE_07",
      thema: "Quader - Volumen aus Netz",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Quadernetz hat die Maße: 3 cm, 9 cm und 6 cm.`,
      question: `Berechne das Volumen und die Oberfläche des Quaders.`,
      solution: `V = 162 cm³; O = 198 cm².`,
      steps: `1) V = 3 · 9 · 6 = 162 cm³; 2) O = 2·(3·9 + 3·6 + 9·6) = 2·(27 + 18 + 54) = 2·99 = 198 cm².`
    },
    {
      id: "P113_KOE_08",
      thema: "Zylinder - Volumen und Masse",
      kategorie: "koerper_mehrschritt",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Eine Regentonne hat einen Durchmesser von 80 cm und eine Höhe von 120 cm.`,
      question: `Berechne das Volumen in Litern.`,
      solution: `ca. 602,9 Liter.`,
      steps: `1) r = 40 cm; 2) V = 3,14 · 40² · 120 = 3,14 · 1600 · 120 = 602.880 cm³; 3) 602.880 cm³ = 602,88 dm³ = 602,88 Liter.`
    }
  ],

  // ---------- STATISTIK (MITTELWERT, MEDIAN, SPANNWEITE, GEWICHTUNG) ----------
  statistik_begruendung: [
    {
      id: "P113_STA_01",
      thema: "Mittelwert - Noten",
      kategorie: "statistik_begruendung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Schüler hat in vier Arbeiten die Noten: 2, 3, 4 und 3.`,
      question: `Berechne den Durchschnitt.`,
      solution: `3,0.`,
      steps: `1) Summe: 2 + 3 + 4 + 3 = 12; 2) 12 : 4 = 3,0.`
    },
    {
      id: "P113_STA_01b",
      thema: "Mittelwert - Verkaufszahlen",
      kategorie: "statistik_begruendung",
      typ: "modellieren",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `In einer Tabelle sind die Verkaufszahlen von Montag bis Freitag: 22, 43, 47, 38, 25.`,
      question: `Ermittle den durchschnittlichen Verkauf pro Tag.`,
      solution: `35.`,
      steps: `1) Summe: 22 + 43 + 47 + 38 + 25 = 175; 2) 175 : 5 = 35.`
    },
    {
      id: "P113_STA_02",
      thema: "Mittelwert - Diagramm",
      kategorie: "statistik_begruendung",
      typ: "modellieren",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `In einer Tabelle sind die Verkaufszahlen von Montag bis Freitag: 120, 150, 110, 130, 140.`,
      question: `Ermittle den durchschnittlichen Verkauf pro Tag.`,
      solution: `130.`,
      steps: `1) Summe: 120 + 150 + 110 + 130 + 140 = 650; 2) 650 : 5 = 130.`
    },
    {
      id: "P113_STA_03",
      thema: "Gewichteter Durchschnitt",
      kategorie: "statistik_begruendung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `In einem Fach zählen Klassenarbeiten 60 % und sonstige Leistungen 40 %. Ein Schüler hat in den Arbeiten den Schnitt 3,5 und bei Sonstigem den Schnitt 2,0.`,
      question: `Berechne die Gesamtnote.`,
      solution: `2,9.`,
      steps: `1) 3,5 · 0,6 = 2,1; 2) 2,0 · 0,4 = 0,8; 3) 2,1 + 0,8 = 2,9.`
    },
    {
      id: "P113_STA_04",
      thema: "Mittelwert – Fehlender Wert",
      kategorie: "statistik_begruendung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Der Durchschnitt von fünf Zahlen ist genau 10. Vier der Zahlen sind bekannt: 8, 12, 7 und 11.`,
      question: `Berechne die fünfte Zahl.`,
      solution: `12.`,
      steps: `1) Gesamtsumme muss sein: 5 · 10 = 50; 2) Vorhandene Summe: 8+12+7+11 = 38; 3) 50 - 38 = 12.`
    },
    {
      id: "P113_STA_04b",
      thema: "Mittelwert – Fehlender Wert (Schnitzel)",
      kategorie: "statistik_begruendung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Der Koch verkauft von Montag bis Samstag: 30, 27, 44, 65, 19, 53 Schnitzel. Der durchschnittliche Verkauf von Montag bis Sonntag beträgt 38 Schnitzel pro Tag.`,
      question: `Berechne, wie viele Schnitzel am Sonntag verkauft wurden.`,
      solution: `28.`,
      steps: `1) Summe Mo-Sa: 30+27+44+65+19+53 = 238; 2) Gesamtsumme 7 Tage: 7 · 38 = 266; 3) 266 - 238 = 28.`
    },
    {
      id: "P113_STA_05",
      thema: "Spannweite und Median",
      kategorie: "statistik_begruendung",
      typ: "modellieren",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `Die Körpergrößen einer Kleingruppe sind (in cm): 162, 158, 175, 168, 162.`,
      question: `Ermittle den Median und die Spannweite dieser Daten.`,
      solution: `Median: 162 cm; Spannweite: 17 cm.`,
      steps: `1) Sortieren: 158, 162, 162, 168, 175; 2) Median (Mitte) = 162; 3) Spannweite = 175 - 158 = 17.`
    },
    {
      id: "P113_STA_06",
      thema: "Minimum, Maximum, Spannweite",
      kategorie: "statistik_begruendung",
      typ: "modellieren",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `Die Weitsprung-Ergebnisse: 4,20 m, 4,12 m, 3,95 m, 4,27 m.`,
      question: `Gib Minimum, Maximum und Spannweite an.`,
      solution: `Min: 3,95 m, Max: 4,27 m, Spannweite: 0,32 m.`,
      steps: `1) Minimum = 3,95 m; 2) Maximum = 4,27 m; 3) Spannweite = 4,27 - 3,95 = 0,32 m.`
    },
    {
      id: "P113_STA_07",
      thema: "Durchschnittsgeschwindigkeit",
      kategorie: "statistik_begruendung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Zug fährt von A nach B (80 km in 60 min) und von B nach C (100 km in 75 min).`,
      question: `Berechne die Durchschnittsgeschwindigkeit für die Gesamtstrecke in km/h.`,
      solution: `80 km/h.`,
      steps: `1) Gesamtstrecke: 80 + 100 = 180 km; 2) Gesamtzeit: 60 + 75 = 135 min = 2,25 h; 3) v = 180 / 2,25 = 80 km/h.`
    },
    {
      id: "P113_STA_08",
      thema: "Prozentanteil im Diagramm",
      kategorie: "statistik_begruendung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Von 250 Mitarbeitern bringen 22 % ihr Lunchpaket mit.`,
      question: `Berechne, wie viele Mitarbeiter das sind.`,
      solution: `55 Mitarbeiter.`,
      steps: `250 · 0,22 = 55.`
    }
  ],

  // ---------- LINEARE GLEICHUNGEN (MODELLIERUNG) ----------
  gleichungen_modellierung: [
    {
      id: "P113_GLG_01",
      thema: "Altersrätsel",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 4,
      prompt: `Ein Vater ist heute 36 Jahre alt, sein Sohn ist 6.`,
      question: `In wie vielen Jahren ist der Vater genau dreimal so alt wie sein Sohn? Stelle eine Gleichung auf.`,
      solution: `In 9 Jahren.`,
      steps: `1) Gleichung: 36 + x = 3 · (6 + x); 2) 36 + x = 18 + 3x; 3) 18 = 2x; 4) x = 9.`
    },
    {
      id: "P113_GLG_02",
      thema: "Telefontarif",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 4,
      prompt: `Tarif A: 5 € Grundgebühr + 0,10 € pro Minute. Tarif B: 10 € Grundgebühr + 0,05 € pro Minute.`,
      question: `Ab wie vielen Minuten ist Tarif B günstiger? Stelle eine Gleichung auf.`,
      solution: `Ab 101 Minuten.`,
      steps: `1) 5 + 0,1x = 10 + 0,05x; 2) 0,05x = 5; 3) x = 100; 4) Ab 101 Minuten günstiger.`
    },
    {
      id: "P113_GLG_02b",
      thema: "Telefontarif - Entscheidung",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 4,
      prompt: `Anbieter 1: 10 € Flatrate für SMS, 0,08 € pro Minute. Anbieter 2: 0,06 € pro SMS, 0,09 € pro Minute, 5 € Grundgebühr.`,
      question: `Tom schreibt 100 SMS und telefoniert 100 Minuten. Für welchen Anbieter soll er sich entscheiden? Begründe.`,
      solution: `Anbieter 2 ist günstiger (20 € vs. 18 €).`,
      steps: `1) Anbieter 1: 10 + 0,08·100 = 10 + 8 = 18 €; 2) Anbieter 2: 5 + 0,06·100 + 0,09·100 = 5 + 6 + 9 = 20 €.`
    },
    {
      id: "P113_GLG_03",
      thema: "Zahlenrätsel",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 3,
      prompt: `Das Dreifache einer Zahl vermehrt um 15 ergibt das Fünffache der Zahl vermindert um 7.`,
      question: `Bestimme die Zahl mithilfe einer Gleichung.`,
      solution: `11.`,
      steps: `1) 3x + 15 = 5x - 7; 2) 22 = 2x; 3) x = 11.`
    },
    {
      id: "P113_GLG_04",
      thema: "Gleichungssystem einfach",
      kategorie: "gleichungen_modellierung",
      typ: "transfer",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 4,
      prompt: `Zwei Zahlen haben die Summe 45. Die eine Zahl ist doppelt so groß wie die andere.`,
      question: `Bestimme die beiden Zahlen.`,
      solution: `15 und 30.`,
      steps: `1) x + 2x = 45; 2) 3x = 45; 3) x = 15; 4) 2x = 30.`
    },
    {
      id: "P113_GLG_05",
      thema: "Gleichung - Umfang",
      kategorie: "gleichungen_modellierung",
      typ: "modellieren",
      operatorGroup: "STELLE_GLEICHUNG",
      punkte: 4,
      prompt: `Eine Figur hat den Umfang 104 cm. Die Seitenlängen sind: 2a, 3a+4, 1,5a, 1,5a.`,
      question: `Stelle eine Gleichung auf und berechne a.`,
      solution: `a = 10 cm.`,
      steps: `1) 2a + (3a+4) + 1,5a + 1,5a = 104; 2) 8a + 4 = 104; 3) 8a = 100; 4) a = 12,5 cm.`
    }
  ],

  // ---------- FLÄCHENBERECHNUNG (2D) ----------
  flaeche2d_modellierung: [
    {
      id: "P113_FL_01",
      thema: "Rechteckfläche",
      kategorie: "flaeche2d_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein rechteckiges Grundstück ist 25 m lang und 18 m breit.`,
      question: `Berechne die Fläche.`,
      solution: `450 m².`,
      steps: `A = 25 · 18 = 450 m².`
    },
    {
      id: "P113_FL_01b",
      thema: "Rechteckfläche - Umfang",
      kategorie: "flaeche2d_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Rechteck ist 5 m lang und 0,5 m breit.`,
      question: `Berechne Umfang und Flächeninhalt.`,
      solution: `U = 11 m, A = 2,5 m².`,
      steps: `1) U = 2·(5 + 0,5) = 11 m; 2) A = 5 · 0,5 = 2,5 m².`
    },
    {
      id: "P113_FL_02",
      thema: "Dreieckfläche",
      kategorie: "flaeche2d_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Dreieck hat eine Grundseite von 12 cm und eine Höhe von 8 cm.`,
      question: `Berechne die Fläche.`,
      solution: `48 cm².`,
      steps: `A = (12 · 8) : 2 = 48 cm².`
    },
    {
      id: "P113_FL_03",
      thema: "Zusammengesetzte Fläche (L-Form)",
      kategorie: "flaeche2d_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein L-förmiger Raum besteht aus einem Rechteck (6 m x 4 m) und einem angrenzenden Quadrat (Seite 3 m).`,
      question: `Berechne die Gesamtfläche des Raumes.`,
      solution: `33 m².`,
      steps: `1) A1 = 6 · 4 = 24 m²; 2) A2 = 3 · 3 = 9 m²; 3) Gesamt = 24 + 9 = 33 m².`
    },
    {
      id: "P113_FL_03b",
      thema: "Zusammengesetzte Fläche - Rechteck mit Quadraten",
      kategorie: "flaeche2d_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Rechteck besteht aus 6 gleich großen Quadraten. Jedes Quadrat hat einen Flächeninhalt von 16 cm².`,
      question: `Berechne den Umfang des Rechtecks.`,
      solution: `80 cm.`,
      steps: `1) Seitenlänge Quadrat: √16 = 4 cm; 2) Anordnung: 2x3 Quadrate; 3) Länge = 3·4 = 12 cm, Breite = 2·4 = 8 cm; 4) U = 2·(12+8) = 40 cm.`
    },
    {
      id: "P113_FL_04",
      thema: "Kreisfläche",
      kategorie: "flaeche2d_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein kreisförmiges Blumenbeet hat einen Radius von 3 m. (π = 3,14)`,
      question: `Berechne die Fläche des Beets.`,
      solution: `28,26 m².`,
      steps: `A = 3,14 · 3² = 3,14 · 9 = 28,26 m².`
    },
    {
      id: "P113_FL_05",
      thema: "Trapezfläche",
      kategorie: "flaeche2d_modellierung",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Trapez hat die parallelen Seiten a = 180 m und c = 130 m. Die Höhe beträgt 165 m.`,
      question: `Berechne die Fläche.`,
      solution: `25.575 m².`,
      steps: `1) A = (a + c) · h : 2 = (180 + 130) · 165 : 2; 2) 310 · 165 : 2 = 51.150 : 2 = 25.575 m².`
    }
  ],

  // ---------- WAHRSCHEINLICHKEIT (MEHRSTUFIG) ----------
  wahrscheinlichkeit_mehrstufig: [
    {
      id: "P113_WSK_01",
      thema: "Einfache Wahrscheinlichkeit",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `In einer Lostrommel sind 5 rote, 3 blaue und 2 grüne Kugeln.`,
      question: `Berechne die Wahrscheinlichkeit, eine rote Kugel zu ziehen (in %).`,
      solution: `50 %.`,
      steps: `1) Insgesamt 10 Kugeln; 2) 5/10 = 0,5 = 50 %.`
    },
    {
      id: "P113_WSK_01b",
      thema: "Einfache Wahrscheinlichkeit - Glücksrad",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Glücksrad hat 8 gleich große Felder, davon ist 1 Feld die "2".`,
      question: `Berechne die Wahrscheinlichkeit für eine "2".`,
      solution: `1/8 = 12,5 %.`,
      steps: `P = 1/8 = 0,125 = 12,5 %.`
    },
    {
      id: "P113_WSK_02",
      thema: "Kombinierte Wahrscheinlichkeit",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Glücksrad hat zwei Sektoren: Blau (75 %) und Rot (25 %). Es wird zweimal gedreht.`,
      question: `Berechne die Wahrscheinlichkeit, dass mindestens einmal Rot erscheint.`,
      solution: `43,75 %.`,
      steps: `1) P(kein Rot) = 0,75 · 0,75 = 0,5625; 2) P(mind. 1x Rot) = 1 - 0,5625 = 0,4375 = 43,75 %.`
    },
    {
      id: "P113_WSK_03",
      thema: "Ziehen ohne Zurücklegen",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `In einer Tüte sind 4 Gummibärchen (2 gelbe, 2 rote). Du nimmst nacheinander zwei Stück heraus, ohne sie zurückzulegen.`,
      question: `Berechne die Wahrscheinlichkeit, dass beide Gummibärchen rot sind.`,
      solution: `ca. 16,7 % (1/6).`,
      steps: `1) P(1. rot) = 2/4 = 1/2; 2) P(2. rot | 1. rot) = 1/3; 3) 1/2 · 1/3 = 1/6 ≈ 0,1667 = 16,67 %.`
    },
    {
      id: "P113_WSK_03b",
      thema: "Ziehen ohne Zurücklegen - Kaugummi",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Leyla hat 3 gelbe, 2 rote und 1 blauen Kaugummi. Sie nimmt nacheinander zwei Kaugummis ohne Zurücklegen.`,
      question: `Berechne die Wahrscheinlichkeit für zwei gelbe Kaugummis.`,
      solution: `20 % (1/5).`,
      steps: `1) P(1. gelb) = 3/6 = 1/2; 2) P(2. gelb | 1. gelb) = 2/5; 3) 1/2 · 2/5 = 2/10 = 1/5 = 0,2 = 20 %.`
    },
    {
      id: "P113_WSK_04",
      thema: "Würfel",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Standardwürfel wird zweimal geworfen.`,
      question: `Berechne die Wahrscheinlichkeit, zweimal hintereinander eine "6" zu würfeln.`,
      solution: `ca. 2,8 % (1/36).`,
      steps: `1) P(6) = 1/6; 2) P(6, 6) = 1/6 · 1/6 = 1/36 ≈ 0,0278 = 2,78 %.`
    },
    {
      id: "P113_WSK_05",
      thema: "Wahrscheinlichkeit - Würfel speziell",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Tom hat einen Würfel mit dem Netz: 2, 4, 2, 4, 2, 4.`,
      question: `Berechne die Wahrscheinlichkeit für eine gerade Zahl.`,
      solution: `100 %.`,
      steps: `Alle Zahlen sind gerade → P = 1 = 100 %.`
    }
  ],

  // ---------- ZINSESZINS VS. LINEAR (VERGLEICH) ----------
  wachstum_vergleich: [
    {
      id: "P113_WACH_01",
      thema: "Zinseszins vs. Linear",
      kategorie: "wachstum_vergleich",
      typ: "modellieren",
      operatorGroup: "BEGRUENDE",
      punkte: 5,
      prompt: `Zwei Sparpläne für 10.000 €: A) 400 € feste Zinsen pro Jahr. B) 3,5 % Zinseszins.`,
      question: `Begründe rechnerisch, ab welchem Jahr Sparplan B lukrativer ist.`,
      solution: `Ab dem 11. Jahr.`,
      steps: `1) A(10) = 10.000 + 10·400 = 14.000 €; 2) B(10) = 10.000 · 1,035^10 ≈ 14.106 €; 3) Ab Jahr 11 ist B besser.`
    },
    {
      id: "P113_WACH_02",
      thema: "Wertverlust linear vs. prozentual",
      kategorie: "wachstum_vergleich",
      typ: "transfer",
      operatorGroup: "UEBERPRUEFE",
      punkte: 5,
      prompt: `Ein E-Bike kostet 3.000 €. Modell A verliert jährlich 500 € an Wert (linear). Modell B verliert jährlich 15 % an Wert (prozentual).`,
      question: `Überprüfe rechnerisch, welches Modell nach 3 Jahren einen höheren Restwert hat.`,
      solution: `Modell B (Restwert ca. 1.842 € vs. 1.500 €).`,
      steps: `1) A: 3000 - 3·500 = 1500 €; 2) B: 3000 · 0,85³ = 3000 · 0,614125 ≈ 1842,38 €; 3) B ist höher.`
    },
    {
      id: "P113_WACH_03",
      thema: "Zinseszins Berechnung",
      kategorie: "wachstum_vergleich",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Betrag von 2.000 € wird für 4 Jahre zu einem Zinssatz von 3 % (mit Zinseszins) angelegt.`,
      question: `Berechne das Endkapital nach 4 Jahren.`,
      solution: `2.251,02 €.`,
      steps: `1) K_n = 2000 · 1,03⁴; 2) 1,03⁴ = 1,12550881; 3) 2000 · 1,12550881 = 2251,02 €.`
    }
  ],

  // ---------- VOLUMEN UND OBERFLÄCHE ----------
  volumen_oberflaeche: [
    {
      id: "P113_VOL_01",
      thema: "Quader - Volumen",
      kategorie: "volumen_oberflaeche",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Quader hat die Maße l = 8 cm, b = 5 cm, h = 3 cm.`,
      question: `Berechne das Volumen.`,
      solution: `120 cm³.`,
      steps: `V = 8 · 5 · 3 = 120 cm³.`
    },
    {
      id: "P113_VOL_02",
      thema: "Quader - Oberfläche",
      kategorie: "volumen_oberflaeche",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Quader hat die Maße l = 8 cm, b = 5 cm, h = 3 cm.`,
      question: `Berechne die Oberfläche.`,
      solution: `158 cm².`,
      steps: `1) O = 2·(l·b + l·h + b·h); 2) 2·(8·5 + 8·3 + 5·3) = 2·(40 + 24 + 15) = 2·79 = 158 cm².`
    },
    {
      id: "P113_VOL_03",
      thema: "Zylinder - Volumen",
      kategorie: "volumen_oberflaeche",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Zylinder hat r = 4 cm und h = 10 cm (π = 3,14).`,
      question: `Berechne das Volumen.`,
      solution: `502,4 cm³.`,
      steps: `V = 3,14 · 4² · 10 = 3,14 · 16 · 10 = 502,4 cm³.`
    },
    {
      id: "P113_VOL_04",
      thema: "Würfel - Volumen",
      kategorie: "volumen_oberflaeche",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Würfel hat die Kantenlänge a = 7 cm.`,
      question: `Berechne das Volumen.`,
      solution: `343 cm³.`,
      steps: `V = 7 · 7 · 7 = 343 cm³.`
    }
  ],

  // ---------- MAßSTAB ----------
  massstab: [
    {
      id: "P113_MAS_01",
      thema: "Maßstab",
      kategorie: "massstab",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 2,
      prompt: `Ein Spielzeugauto ist 10 cm lang. Es ist im Maßstab 1:50 nachgebaut.`,
      question: `Berechne die Länge des Autos in Wirklichkeit.`,
      solution: `5 m (500 cm).`,
      steps: `10 cm · 50 = 500 cm = 5 m.`
    }
  ],

  // ---------- DIAGRAMME ----------
  diagramme: [
    {
      id: "P113_DIA_01",
      thema: "Kreisdiagramm - Winkel",
      kategorie: "diagramme",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `8,5 % der Schüler erhalten einen Siegerpokal.`,
      question: `Berechne den Winkel im Kreisdiagramm für diesen Anteil.`,
      solution: `30,6°.`,
      steps: `360° · 0,085 = 30,6°.`
    }
  ],

  // ---------- FUNKTIONALE ZUSAMMENHÄNGE ----------
  funktionale_zusammenhaenge: [
    {
      id: "P113_FUN_01",
      thema: "Lineare Funktion - Parkgebühren",
      kategorie: "funktionale_zusammenhaenge",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 3,
      prompt: `Parkgebühren: 1. Stunde 0,60 €, jede weitere Stunde 1,50 €.`,
      question: `Welcher Term ist richtig? 1,50·x + 0,60 oder 1,50·(x-1) + 0,60? Begründe.`,
      solution: `1,50·(x-1) + 0,60 ist richtig.`,
      steps: `Für x=1: 1,50·0 + 0,60 = 0,60 €; Für x=2: 1,50·1 + 0,60 = 2,10 €.`
    },
    {
      id: "P113_FUN_02",
      thema: "Lineare Funktion - Handytarif",
      kategorie: "funktionale_zusammenhaenge",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Monatliche Kosten: 6 € Grundgebühr + 0,09 € pro Minute.`,
      question: `Berechne die Kosten für 225 Minuten.`,
      solution: `26,25 €.`,
      steps: `6 + 0,09 · 225 = 6 + 20,25 = 26,25 €.`
    }
  ]
};

/* =========================================================
   HILFSFUNKTIONEN & EXPORT
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
  const { category = null, rng = Math.random } = options;
  const tasks = category ? getTasksByCategory(category) : flattenPool(pool113);
  if (!tasks.length) return null;
  const t = tasks[Math.floor(rng() * tasks.length)];
  return { ...t, formattedText: formatTaskText(t, rng) };
}

const POOL_113 = {
  pool: pool113,
  flattenPool: () => flattenPool(pool113),
  getTasksByCategory,
  getRandomTask
};

if (typeof window !== "undefined") { window.POOL_113 = POOL_113; }
export { POOL_113 };
export default POOL_113;
