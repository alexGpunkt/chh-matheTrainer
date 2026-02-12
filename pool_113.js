/* =========================================================
   pool_113.js  — BBR Niveau 11.3 (Note 2–1)
   BEREINIGT auf VA9 2014–2019
   Ergänzt um weitere Aufgaben pro Kategorie
   ========================================================= */

/* =========================================================
   1) Operator-Steuerung (BBR-Stil)
========================================================= */

const OPERATOR_GROUPS = {
  BERECHNE: ["berechne", "ermittle", "bestimme"],
  ERMITTLE: ["ermittle", "bestimme", "berechne"],
  BESTIMME: ["bestimme", "ermittle", "berechne"],
  WEISE_NACH: ["weise nach", "zeige, dass"],
  UEBERPRUEFE: ["überprüfe", "prüfe"],
  BEGRUENDE: ["begründe", "erläutere"],
  ENTSCHEIDE_BEGRUENDE: ["entscheide und begründe"],
  STELLE_GLEICHUNG: ["stelle eine Gleichung auf und berechne"]
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

/* =========================================================
   2) Aufgabenformat
========================================================= */

function formatTaskText(task, rng = Math.random) {
  const opPhrase = getOperatorPhrase(task.operatorGroup, rng);
  const header = `${opPhrase}:`;
  const parts = [
    `**${task.id}** (${task.thema} | ${task.kategorie} | ${task.punkte} P)`,
    "",
    `${header}`,
    task.prompt.trim(),
    "",
    task.question.trim()
  ];
  return parts.join("\n");
}

/* =========================================================
   3) Pool-Daten (NUR prüfungsrelevante Aufgaben)
========================================================= */

const pool113 = {
  meta: {
    niveau: "11.3",
    ziel: "BBR Note 2–1 (prüfungsorientiert, VA9 2014–2019)",
    version: "2026-02-12"
  },

  // ---------- PROZENT / RABATT / ZINS ----------
  prozent_modellierung: [
    {
      id: "P113_PRO_01",
      thema: "Prozentrechnung",
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
      id: "P113_PRO_02",
      thema: "Zinsrechnung",
      kategorie: "prozent_modellierung",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Motorroller kostet 2.400 €. Du zahlst 20 % Anzahlung.`,
      question: `Berechne den Anzahlungsbetrag.`,
      solution: `480 €.`,
      steps: `2.400 € · 0,20 = 480 €.`
    },
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
    }
  ],

  // ---------- ZUORDNUNGEN (PROPORTIONAL/ANTIPROPORTIONAL) ----------
  zuordnung_transfer: [
    {
      id: "P113_ZUO_01",
      thema: "Proportionale Zuordnung",
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
      id: "P113_ZUO_02",
      thema: "Proportionale Zuordnung",
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
      thema: "Antiproportionale Zuordnung",
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
      thema: "Antiproportionale Zuordnung",
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
      thema: "Proportionale Zuordnung",
      kategorie: "zuordnung_transfer",
      typ: "transfer",
      operatorGroup: "ERMITTLE",
      punkte: 3,
      prompt: `In einer Fabrik stellen 5 Maschinen in einer Stunde 250 Bauteile her.`,
      question: `Ermittle, wie viele Bauteile 8 Maschinen in der gleichen Zeit herstellen.`,
      solution: `400 Bauteile.`,
      steps: `1) 250 / 5 = 50 Bauteile pro Maschine; 2) 50 · 8 = 400 Bauteile.`
    }
  ],

  // ---------- PYTHAGORAS (SACHKONTEXT) ----------
  pythagoras_sachkontext: [
    {
      id: "P113_PYT_01",
      thema: "Satz des Pythagoras",
      kategorie: "pythagoras_sachkontext",
      typ: "modellieren",
      operatorGroup: "ENTSCHEIDE_BEGRUENDE",
      punkte: 3,
      prompt: `Ein 70 cm langer Regenschirm soll in einen Koffer gelegt werden. Der Koffer ist innen 60 cm lang und 40 cm breit.`,
      question: `Entscheide und begründe rechnerisch, ob der Schirm diagonal hineinpasst.`,
      solution: `Ja. Diagonale ≈ 72,1 cm > 70 cm.`,
      steps: `1) d² = 60² + 40² = 5200; 2) d = √5200 ≈ 72,1 cm.`
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
      id: "P113_PYT_03",
      thema: "Pythagoras – Seilspannung",
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
      steps: `1) V = 3,14 · 5² · 20 = 1570 cm³; 2) 1,57 L · 8 € = 12,56 €.`
    },
    {
      id: "P113_KOE_02",
      thema: "Quader – Volumen und Masse",
      kategorie: "koerper_mehrschritt",
      typ: "modellieren",
      operatorGroup: "BERECHNE",
      punkte: 3,
      prompt: `Ein Aquarium ist 80 cm lang, 40 cm breit und 50 cm hoch.`,
      question: `Berechne das Volumen in Litern.`,
      solution: `160 Liter.`,
      steps: `1) V = 80 · 40 · 50 = 160.000 cm³; 2) 160.000 cm³ = 160 Liter.`
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
    }
  ],

  // ---------- STATISTIK (MITTELWERT, DIAGRAMM, GEWICHTUNG) ----------
  statistik_begruendung: [
    {
      id: "P113_STA_01",
      thema: "Mittelwert",
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
      id: "P113_STA_02",
      thema: "Diagramm lesen",
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
    }
  ],

  // ---------- LINEARE GLEICHUNGEN ----------
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
    }
  ],

  // ---------- WAHRSCHEINLICHKEIT ----------
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
      id: "P113_WSK_02",
      thema: "Kombinierte Wahrscheinlichkeit",
      kategorie: "wahrscheinlichkeit_mehrstufig",
      typ: "transfer",
      operatorGroup: "BERECHNE",
      punkte: 4,
      prompt: `Ein Glücksrad hat zwei Sektoren: Blau (75 %) und Rot (25 %). Es wird zweimal gedreht.`,
      question: `Berechne die Wahrscheinlichkeit, dass mindestens einmal Rot erscheint.`,
      solution: `43,75 %.`,
      steps: `1) P(kein Rot) = 0,75 · 0,75 = 0,5625; 2) P(mind. 1x Rot) = 1 - 0,5625 = 0,4375.`
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
      steps: `1) P(1. rot) = 2/4 = 1/2; 2) P(2. rot | 1. rot) = 1/3; 3) 1/2 · 1/3 = 1/6 ≈ 0,1667.`
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
      steps: `1) P(6) = 1/6; 2) P(6, 6) = 1/6 · 1/6 = 1/36 ≈ 0,0278.`
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
      steps: `1) A(10) = 14.000, B(10) = 14.106; 2) Vergleich der Werte zeigt den Vorteil von B ab dem 11. Jahr.`
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
      steps: `1) A: 3000 - 3·500 = 1500 €; 2) B: 3000 · 0,85³ ≈ 1842,38 €; 3) B ist höher.`
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
      solution: `2251,02 €.`,
      steps: `1) K_n = 2000 · 1,03⁴; 2) K_n ≈ 2251,017...`
    }
  ]
};

/* =========================================================
   4) Hilfsfunktionen & Export
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
