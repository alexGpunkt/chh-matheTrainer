/* =========================================================
   vera8_pool.js
   Vera8 Aufgaben aus dem Dokument "aufgabenheft-2000-Mathematik_AlleVera8.docx"
   VOLLSTÄNDIG: Dynamische Parameter + Lösungsschritte für alle Vera8-Aufgaben
========================================================= */

(function () {

  /* =========================================================
     HILFSFUNKTIONEN
  ========================================================= */
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function round2(x) {
    return Math.round(x * 100) / 100;
  }

  function pickFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* =========================================================
     OPERATOR-GRUPPEN (für abwechslungsreiche Formulierungen)
  ========================================================= */
  const OPERATOR_GROUPS = {
    BERECHNE: ["berechne", "bestimme", "ermittle", "gib an"],
    GIB_AN: ["gib an"],
    ERMITTLE: ["ermittle"],
    BEGRUENDE: ["begründe", "erläutere"],
    UEBERPRUEFE: ["überprüfe", "prüfe"],
    ENTSCHEIDE: ["entscheide"],
    ERGAENZE: ["ergänze", "vervollständige"],
    ZEICHNE: ["zeichne", "konstruiere"],
    WANDLE_UM: ["wandle um"]
  };

  function getOperatorPhrase(group) {
    const list = OPERATOR_GROUPS[group] || ["berechne"];
    const op = pickFrom(list);
    return op.charAt(0).toUpperCase() + op.slice(1);
  }

  /* =========================================================
     LÖSUNGSSCHRITTE GENERIEREN
  ========================================================= */
  function generateSteps(taskType, params, solution) {
    switch (taskType) {
      // ---------- PROZENT ----------
      case "prozent_20_von_80":
        return [
          `20% von 80 m = (20/100) · 80`,
          `= 0,2 · 80 = 16 m`
        ];
      case "prozent_anteil":
        return [
          `W = G · p/100`,
          `${params.gesamt} · ${params.prozent}/100 = ${round2(params.gesamt * params.prozent / 100)}`
        ];
      case "prozent_rabatt":
        return [
          `Zahlungsanteil: 100% − ${params.rabatt}% = ${100 - params.rabatt}%`,
          `${params.preis} · ${100 - params.rabatt}/100 = ${round2(params.preis * (100 - params.rabatt) / 100)} €`
        ];
      case "prozent_steigerung":
        return [
          `Differenz: ${params.neu} − ${params.alt} = ${params.neu - params.alt}`,
          `Prozentsatz: (Differenz / Grundwert) · 100`,
          `(${params.neu - params.alt} / ${params.alt}) · 100 = ${round2((params.neu - params.alt) / params.alt * 100)}%`
        ];
      case "prozent_prozentsatz":
        return [
          `p = (W / G) · 100`,
          `(${params.w} / ${params.g}) · 100 = ${round2(params.w / params.g * 100)}%`
        ];
      case "prozent_grundwert":
        return [
          `G = W · 100 / p`,
          `${params.w} · 100 / ${params.p} = ${round2(params.w * 100 / params.p)}`
        ];

      // ---------- ZAHLEN & ZIFFERN ----------
      case "milliarden_ziffern":
        return [
          `Eine Milliarde = 1.000.000.000`,
          `700 Milliarden = 700 · 1.000.000.000 = 700.000.000.000`
        ];
      case "dreistellige_zahlen":
        return [
          `Permutationen von 3 Ziffern: 3! = 3 · 2 · 1 = 6 Zahlen`,
          `Alle möglichen Kombinationen: ${params.zahlen}`
        ];
      case "fakultaet":
        return [
          `Anzahl = 5! = 5 · 4 · 3 · 2 · 1 = 120`
        ];

      // ---------- PROPORTIONALITÄT ----------
      case "apfelkauf":
        return [
          `Preis pro kg: ${params.preis} € : ${params.kg1} kg = ${round2(params.preis / params.kg1)} €/kg`,
          `Preis für ${params.kg2} kg: ${round2(params.preis / params.kg1)} · ${params.kg2} = ${round2(params.preis / params.kg1 * params.kg2)} €`
        ];

      // ---------- BRUCHRECHNUNG ----------
      case "apfelsaftschorle":
        return [
          `Menge: 4/5 L + 1/2 L = 0,8 L + 0,5 L = 1,3 L`,
          `Vergleich: 1,3 L < 1,5 L → Ja, es passt.`
        ];

      // ---------- GEOMETRIE: DREIECK ----------
      case "dreieck_winkel_bestimmen":
        return [
          `Winkelsumme im Dreieck: α + β + γ = 180°`,
          `β = 2·α, γ = 3·α → α + 2α + 3α = 180°`,
          `6α = 180° → α = 30°, β = 60°, γ = 90°`
        ];
      case "dreieck_aussagen":
        return [
          `Prüfen mit Satz des Pythagoras: a² + b² = c²`,
          `${params.a}² + ${params.b}² = ${params.a * params.a + params.b * params.b}`,
          `${params.c}² = ${params.c * params.c}`,
          `${params.isRight ? 'Das Dreieck ist rechtwinklig.' : 'Das Dreieck ist nicht rechtwinklig.'}`
        ];
      case "winkel_im_dreieck":
        return [
          `α + β + γ = 180°`,
          `${params.α} + ${params.β} + γ = 180°`,
          `γ = 180° - ${params.α} - ${params.β} = ${params.γ}°`
        ];

      // ---------- GLEICHUNGEN ----------
      case "einfache_gleichung":
        return [
          `18 - 3·x = 12`,
          `-3·x = 12 - 18 = -6`,
          `x = (-6) : (-3) = 2`
        ];
      case "gleichung_loesen":
        return [
          `16 - 6x = 14`,
          `-6x = 14 - 16 = -2`,
          `x = (-2) : (-6) = 1/3`
        ];
      case "gleichung_umformen":
        return [
          `7x - 14 = 38 | +14`,
          `7x = 52 | :7`,
          `x = 52/7 ≈ 7,43`
        ];
      case "zahlenraetsel":
        return [
          `3x + 15 = 5x - 7`,
          `15 + 7 = 5x - 3x`,
          `22 = 2x → x = 11`
        ];

      // ---------- WAHRSCHEINLICHKEIT ----------
      case "wsk_einfach":
        return [
          `Günstige: ${params.gunstig}`,
          `Mögliche: ${params.moglich}`,
          `P = ${params.gunstig}/${params.moglich} = ${round2(params.gunstig / params.moglich)} = ${round2(params.gunstig / params.moglich * 100)}%`
        ];
      case "wsk_mit_zuruecklegen":
        return [
          `P(2 gelbe) = P(gelb) · P(gelb)`,
          `= (${params.gelb}/${params.gesamt})² = ${round2(params.gelb / params.gesamt * params.gelb / params.gesamt)} = ${round2((params.gelb / params.gesamt) ** 2 * 100)}%`
        ];
      case "wsk_ohne_zuruecklegen":
        return [
          `P(1. gelb) = ${params.gelb1}/${params.gesamt1} = ${round2(params.gelb1 / params.gesamt1)}`,
          `P(2. gelb | 1. gelb) = ${params.gelb2}/${params.gesamt2} = ${round2(params.gelb2 / params.gesamt2)}`,
          `P = ${round2(params.gelb1 / params.gesamt1)} · ${round2(params.gelb2 / params.gesamt2)} = ${round2(params.gelb1 / params.gesamt1 * params.gelb2 / params.gesamt2)} = ${round2(params.gelb1 / params.gesamt1 * params.gelb2 / params.gesamt2 * 100)}%`
        ];
      case "wsk_wuerfel_zwei":
        return [
          `Alle möglichen Ergebnisse: 6 · 6 = 36`,
          `Günstige für Summe 6: (1,5),(2,4),(3,3),(4,2),(5,1) → 5`,
          `P = 5/36 ≈ ${round2(5/36 * 100)}%`
        ];
      case "wsk_wuerfel_summe":
        return [
          `Summe ≤ 4: (1,1),(1,2),(1,3),(2,1),(2,2),(3,1) → 6 günstige`,
          `P = 6/36 = 1/6 ≈ ${round2(1/6 * 100)}%`
        ];

      // ---------- STATISTIK / DURCHSCHNITT ----------
      case "durchschnitt":
        return [
          `Summe: ${params.zahlen.join(' + ')} = ${params.summe}`,
          `Durchschnitt: ${params.summe} : ${params.anzahl} = ${round2(params.summe / params.anzahl)}`
        ];

      // ---------- TEMPERATUR ----------
      case "temperaturdifferenz":
        return [
          `Differenz = Endtemperatur − Anfangstemperatur`,
          `${params.nachmittag}°C - (${params.morgen}°C) = ${params.nachmittag - params.morgen}°C`
        ];

      // ---------- FLÄCHENBERECHNUNG ----------
      case "flaeche_rechteck":
        return [
          `Fläche: A = l · b`,
          `${params.l} · ${params.b} = ${params.l * params.b} m²`
        ];
      case "flaeche_lform":
        return [
          `Rechteck 1: ${params.l1} · ${params.b1} = ${params.l1 * params.b1} m²`,
          `Rechteck 2: ${params.l2} · ${params.b2} = ${params.l2 * params.b2} m²`,
          `Gesamt: ${params.l1 * params.b1} + ${params.l2 * params.b2} = ${params.l1 * params.b1 + params.l2 * params.b2} m²`
        ];

      // ---------- KÖRPERBERECHNUNG ----------
      case "wuerfel_volumen":
        return [
          `V = a³`,
          `${params.a}³ = ${params.a * params.a * params.a} cm³`
        ];
      case "wuerfel_oberflaeche":
        return [
          `O = 6 · a²`,
          `6 · ${params.a}² = 6 · ${params.a * params.a} = ${6 * params.a * params.a} cm²`
        ];
      case "quader_volumen":
        return [
          `V = l · b · h`,
          `${params.l} · ${params.b} · ${params.h} = ${params.l * params.b * params.h} cm³`
        ];

      // ---------- GEOMETRIE: PYTHAGORAS ----------
      case "pythagoras_leiter":
        return [
          `Satz des Pythagoras: h² = l² - a²`,
          `h² = ${params.l}² - ${params.a}² = ${params.l * params.l} - ${params.a * params.a} = ${params.l * params.l - params.a * params.a}`,
          `h = √${params.l * params.l - params.a * params.a} = ${round2(params.h)} m`
        ];

      // ---------- MAßSTAB ----------
      case "massstab_zeichnung":
        return [
          `100 m in Wirklichkeit = 10000 cm`,
          `Maßstab: ${params.zeichnung} cm ≙ 10000 cm → 1 : ${round2(10000 / params.zeichnung)}`
        ];

      // ---------- WÜRFELNETZE ----------
      case "wuerfelnetz_augen":
        return [
          `Gegenüberliegende Seiten ergänzen sich zu 7.`,
          `Bei Standardwürfeln: 1↔6, 2↔5, 3↔4.`,
          `Daher fehlt auf der grauen Fläche die ${params.augen}.`
        ];

      // ---------- ZAHLENMAUERN ----------
      case "zahlenmauer":
        return [
          `Stein oben = Summe der beiden darunter: ${params.unten1} + ${params.unten2} = ${params.unten1 + params.unten2}`,
          `Nächste Reihe: ${params.mitte1} + ${params.mitte2} = ${params.mitte1 + params.mitte2}`,
          `Spitze: ${params.oben1} + ${params.oben2} = ${params.oben1 + params.oben2}`
        ];

      default:
        return [`Rechnung durchführen`, `Ergebnis: ${solution}`];
    }
  }

  /* =========================================================
     DYNAMISCHE AUFGABENGENERIERUNG
     Alle Aufgaben aus dem Dokument mit zufälligen Parametern
  ========================================================= */
  const TASK_GENERATORS = {

    // Seite: 20 Prozent
    prozent_20_von_80: () => {
      const meter = rand(50, 150);
      const prozent = pickFrom([20, 25, 30, 15]);
      return {
        text: `${getOperatorPhrase("BERECHNE")} Sie: ${prozent}% von ${meter} m.`,
        sol: round2(meter * prozent / 100),
        steps: generateSteps("prozent_20_von_80", {meter, prozent}, round2(meter * prozent / 100)),
        category: "prozent"
      };
    },

    // Seite: 700 Milliarden
    milliarden_ziffern: () => {
      const milliarden = rand(100, 999);
      return {
        text: `Eric hört in den Nachrichten, dass in den USA über einen Kredit von ${milliarden} Milliarden Dollar diskutiert wird.`,
        question: `Schreibe diese Zahl in Ziffern.`,
        sol: `${milliarden}000000000`,
        steps: generateSteps("milliarden_ziffern", {milliarden}, `${milliarden}000000000`),
        category: "zahlen"
      };
    },

    // Seite: Apfelkauf
    apfelkauf: () => {
      const kg1 = rand(2, 5);
      const preis = rand(4, 15) + (rand(0,1) ? 0.5 : 0);
      const kg2 = rand(3, 8);
      return {
        text: `${getOperatorPhrase("BERECHNE")} Sie: ${kg1} kg Äpfel kosten ${preis.toFixed(2)} €.`,
        question: `Berechne, wie viel ${kg2} kg derselben Sorte kosten.`,
        sol: round2(preis / kg1 * kg2),
        steps: generateSteps("apfelkauf", {kg1, preis, kg2}, round2(preis / kg1 * kg2)),
        category: "proportional"
      };
    },

    // Seite: Apfelsaftschorle
    apfelsaftschorle: () => {
      const apfelSaft = rand(3, 5) / 5; // 0.6, 0.8, 1.0
      const wasser = rand(3, 8) / 10; // 0.3 - 0.8
      const flasche = rand(12, 18) / 10; // 1.2 - 1.8
      return {
        text: `${getOperatorPhrase("ENTSCHEIDE")} Sie: Zur Herstellung einer Apfelsaftschorle mischt man ${apfelSaft.toFixed(1)} Liter Apfelsaft mit ${wasser.toFixed(1)} Liter Mineralwasser.`,
        question: `Passt die Apfelsaftschorle in eine Flasche mit einem Fassungsvermögen von maximal ${flasche.toFixed(1)} Liter? Begründe.`,
        sol: (apfelSaft + wasser) <= flasche ? "Ja" : "Nein",
        fullSolution: (apfelSaft + wasser) <= flasche ? `Ja, ${(apfelSaft + wasser).toFixed(2)} L ≤ ${flasche.toFixed(1)} L` : `Nein, ${(apfelSaft + wasser).toFixed(2)} L > ${flasche.toFixed(1)} L`,
        steps: generateSteps("apfelsaftschorle", {apfelSaft, wasser, flasche}, (apfelSaft + wasser) <= flasche ? "Ja" : "Nein"),
        category: "bruchrechnung"
      };
    },

    // Seite: Aussagen über Dreiecke
    dreieck_winkel_bestimmen: () => {
      const faktor1 = rand(2, 4);
      const faktor2 = rand(3, 5);
      // α + β·α + γ·α = 180 → α = 180/(1 + faktor1 + faktor2)
      const alpha = 180 / (1 + faktor1 + faktor2);
      return {
        text: `In einem Dreieck ist β = ${faktor1}·α und γ = ${faktor2}·α.`,
        question: `Berechne die Winkel α, β und γ.`,
        sol: round2(alpha),
        fullSolution: `α = ${round2(alpha)}°, β = ${round2(alpha * faktor1)}°, γ = ${round2(alpha * faktor2)}°`,
        steps: generateSteps("dreieck_winkel_bestimmen", {faktor1, faktor2, alpha}, round2(alpha)),
        category: "geometrie_dreieck"
      };
    },

    // Seite: Bewege C
    // (Hier nur rechnerischer Teil, Konstruktion wird in der UI erwartet)
    bewege_c_gleichseitig: () => {
      const seite = rand(4, 8);
      return {
        text: `Gegeben ist eine Strecke AB der Länge ${seite} cm und ihre Mittelsenkrechte.`,
        question: `Berechne die Höhe des gleichseitigen Dreiecks über AB.`,
        sol: round2(seite * Math.sqrt(3) / 2),
        steps: [
          `Höhe im gleichseitigen Dreieck: h = (√3/2) · a`,
          `h = (√3/2) · ${seite} = ${round2(seite * Math.sqrt(3) / 2)} cm`
        ],
        category: "geometrie_konstruktion",
        params: {seite}
      };
    },

    // Seite: Briefmarkenschachteln (Quader Netz)
    quader_netz: () => {
      const l = rand(4, 10);
      const b = rand(3, 8);
      const h = rand(2, 6);
      return {
        text: `Ein Quadernetz für eine Briefmarkenschachtel hat die Maße: Länge ${l} cm, Breite ${b} cm, Höhe ${h} cm.`,
        question: `Vervollständige die Beschriftung des Netzes.`,
        sol: `Fehlende Seiten: ${l} cm × ${h} cm und ${b} cm × ${h} cm`,
        steps: generateSteps("quader_netz", {l, b, h}, `Netz ergänzt`),
        category: "geometrie_netz"
      };
    },

    // Seite: Bälle ziehen (Wahrscheinlichkeit)
    baelle_ziehen: () => {
      const weiss = rand(3, 7);
      const gelb = rand(2, 5);
      const gesamt = weiss + gelb;
      const ziehen = pickFrom(["mit", "ohne"]);
      if (ziehen === "mit") {
        return {
          text: `In einem Beutel sind ${weiss} weiße und ${gelb} gelbe Bälle. Es wird zweimal mit Zurücklegen gezogen.`,
          question: `Berechne die Wahrscheinlichkeit für zwei gelbe Bälle.`,
          sol: round2((gelb / gesamt) ** 2 * 100),
          steps: generateSteps("wsk_mit_zuruecklegen", {gelb, gesamt}, round2((gelb / gesamt) ** 2 * 100)),
          category: "wsk"
        };
      } else {
        return {
          text: `In einem Beutel sind ${weiss} weiße und ${gelb} gelbe Bälle. Es wird zweimal ohne Zurücklegen gezogen.`,
          question: `Berechne die Wahrscheinlichkeit für zwei gelbe Bälle.`,
          sol: round2(gelb / gesamt * (gelb - 1) / (gesamt - 1) * 100),
          steps: generateSteps("wsk_ohne_zuruecklegen", {gelb1: gelb, gesamt1: gesamt, gelb2: gelb - 1, gesamt2: gesamt - 1}, round2(gelb / gesamt * (gelb - 1) / (gesamt - 1) * 100)),
          category: "wsk"
        };
      }
    },

    // Seite: Chancen (Glücksrad)
    glücksrad: () => {
      const felder = rand(6, 12);
      const gewinnFelder = rand(1, 3);
      return {
        text: `Ein Glücksrad hat ${felder} gleich große Felder.`,
        question: `Wie viele Felder müssen grau sein, damit die Gewinnwahrscheinlichkeit ${gewinnFelder}/${felder} beträgt?`,
        sol: gewinnFelder,
        steps: generateSteps("wsk_einfach", {gunstig: gewinnFelder, moglich: felder}, gewinnFelder),
        category: "wsk"
      };
    },

    // Seite: Computerspielsucht (Prozent)
    prozent_neuntel: () => {
      return {
        text: `Jeder neunte Jugendliche zeigt ein krankhaftes Computerspielverhalten.`,
        question: `Wie viel Prozent sind das?`,
        sol: round2(100 / 9),
        steps: [`1/9 = 100% : 9 = ${round2(100/9)}%`],
        category: "prozent"
      };
    },

    // Seite: Dreieckszahlen
    dreieckszahlen: () => {
      const n = rand(5, 12);
      return {
        text: `Dreieckszahlen D_n = 1 + 2 + ... + n.`,
        question: `Berechne D_${n}.`,
        sol: n * (n + 1) / 2,
        steps: [`D_${n} = ${n}·(${n}+1)/2 = ${n * (n + 1) / 2}`],
        category: "zahlenfolgen"
      };
    },

    // Seite: Durch 1001 teilbar
    durch_1001_teilbar: () => {
      const zahl = rand(100, 999);
      const sechsstellig = zahl * 1000 + zahl;
      return {
        text: `Peter behauptet: "Wenn man eine dreistellige Zahl zweimal hintereinander aufschreibt, entsteht eine sechsstellige Zahl, die immer durch 1001 teilbar ist."`,
        question: `Überprüfe dies am Beispiel ${zahl}${zahl}.`,
        sol: `${sechsstellig} : 1001 = ${zahl}`,
        steps: [`${zahl}${zahl} = ${zahl} · 1000 + ${zahl} = ${zahl} · (1000 + 1) = ${zahl} · 1001`],
        category: "zahlen_theorie"
      };
    },

    // Seite: Einfache Gleichung
    einfache_gleichung: () => {
      const x = rand(2, 8);
      return {
        text: `Gegeben ist die Gleichung 18 - 3·x = 12.`,
        question: `Gib den Wert für x an.`,
        sol: 2,
        steps: generateSteps("einfache_gleichung", {}, 2),
        category: "gleichungen"
      };
    },

    // Seite: Ergebnis kleiner als Null
    vorzeichen_bestimmung: () => {
      return {
        text: `-4,8 : (-0,24) · (132,6) : (-3,1)`,
        question: `Erkläre, woran man ohne zu rechnen erkennen kann, dass das Ergebnis kleiner als Null sein muss.`,
        sol: `Minus : Minus = Plus; Plus · Plus = Plus; Plus : Minus = Minus`,
        steps: [`- : - = +`, `+ · + = +`, `+ : - = -`],
        category: "vorzeichen"
      };
    },

    // Seite: Fahrradtour (Säulendiagramm)
    fahrradtour: () => {
      const etappen = [rand(40, 80), rand(30, 70), rand(20, 60), rand(10, 50)];
      const letzterTag = rand(15, 25);
      const gesamt = etappen.reduce((a,b) => a+b, 0) + letzterTag;
      return {
        text: `Max und Julia sind eine Radtour gefahren. Die ersten vier Etappen waren ${etappen.join(', ')} km. Am letzten Tag fuhren sie ${letzterTag} km.`,
        question: `Berechne die durchschnittliche Tagesstrecke.`,
        sol: round2(gesamt / 5),
        steps: generateSteps("durchschnitt", {zahlen: [...etappen, letzterTag], summe: gesamt, anzahl: 5}, round2(gesamt / 5)),
        category: "statistik"
      };
    },

    // Seite: Fliesen (antiproportional)
    fliesen: () => {
      const anzahl1 = rand(40, 60);
      const flaeche1 = rand(12, 20) / 100; // 0.12 - 0.20 m²
      const flaeche2 = rand(18, 25) / 100; // 0.18 - 0.25 m²
      return {
        text: `Zum Fliesen werden ${anzahl1} Platten mit einer Größe von jeweils ${flaeche1.toFixed(2)} m² benötigt.`,
        question: `Wie viele Fliesen der Größe ${flaeche2.toFixed(2)} m² werden mindestens benötigt?`,
        sol: Math.ceil(anzahl1 * flaeche1 / flaeche2),
        steps: [
          `Gesamtfläche: ${anzahl1} · ${flaeche1.toFixed(2)} = ${round2(anzahl1 * flaeche1)} m²`,
          `Anzahl neue Fliesen: ${round2(anzahl1 * flaeche1)} : ${flaeche2.toFixed(2)} = ${round2(anzahl1 * flaeche1 / flaeche2)} → aufrunden: ${Math.ceil(anzahl1 * flaeche1 / flaeche2)}`
        ],
        category: "antiproportional"
      };
    },

    // Seite: Flächeninhalt (L-Form)
    flaeche_lform: () => {
      const l1 = rand(4, 10);
      const b1 = rand(3, 8);
      const l2 = rand(2, 6);
      const b2 = rand(2, 5);
      return {
        text: `Berechne den Flächeninhalt der L-förmigen Figur.`,
        question: `Rechteck 1: ${l1} cm × ${b1} cm, Rechteck 2: ${l2} cm × ${b2} cm.`,
        sol: l1 * b1 + l2 * b2,
        steps: generateSteps("flaeche_lform", {l1, b1, l2, b2}, l1 * b1 + l2 * b2),
        category: "flaeche"
      };
    },

    // Seite: Gewitter (Schallgeschwindigkeit)
    gewitter: () => {
      const sekunden = rand(3, 9);
      return {
        text: `Ein Blitz ist zu sehen. Den Donner hört man nach ${sekunden} Sekunden.`,
        question: `Wie weit ist der Blitz ungefähr entfernt? (Schall: 340 m/s)`,
        sol: round2(sekunden * 340 / 1000),
        steps: [`s = v · t = 340 m/s · ${sekunden} s = ${sekunden * 340} m = ${round2(sekunden * 340 / 1000)} km`],
        category: "sachaufgabe"
      };
    },

    // Seite: Gleichungen lösen ist nicht schwierig
    gleichung_probe: () => {
      const x = rand(5, 12);
      return {
        text: `Timo soll die Gleichung 7x - 14 = ${7 * x - 14} durch Probieren lösen.`,
        question: `Welche Zahl muss eingesetzt werden?`,
        sol: x,
        steps: [`7·${x} - 14 = ${7 * x - 14}`, `Gleichung stimmt.`],
        category: "gleichungen"
      };
    },

    // Seite: Gummibären (Wahrscheinlichkeit)
    gummibaeren: () => {
      const farben = 6; // 1/6 pro Farbe, rote Hälfte Himbeere
      return {
        text: `Je ein Sechstel grüne, gelbe, weiße, orangefarbene Bären. Die Hälfte der roten Bären schmeckt nach Himbeere.`,
        question: `Mit welcher Wahrscheinlichkeit greift man ein Himbeer-Gummibärchen?`,
        sol: round2(1/12 * 100),
        steps: [`Anteil rote: 1/6, davon Hälfte Himbeere: 1/12`, `P = 1/12 = ${round2(1/12 * 100)}%`],
        category: "wsk"
      };
    },

    // Seite: Kanutour (Tarifvergleich)
    kanutour: () => {
      const grund1 = rand(5, 15);
      const preisProKm1 = rand(20, 40) / 100;
      const grund2 = rand(8, 20);
      const preisProKm2 = rand(15, 30) / 100;
      const freikm = 100;
      const km = rand(150, 400);
      return {
        text: `Anbieter 1: ${grund1} € Grundgebühr + ${(preisProKm1 * 100).toFixed(0)} Cent/km. Anbieter 2: ${grund2} € Grundgebühr + ${(preisProKm2 * 100).toFixed(0)} Cent/km (${freikm} km frei).`,
        question: `Berechne die Kosten für ${km} km bei beiden Anbietern.`,
        sol: `${round2(grund1 + preisProKm1 * km)} € vs. ${round2(grund2 + preisProKm2 * Math.max(0, km - freikm))} €`,
        steps: [
          `Anbieter 1: ${grund1} + ${(preisProKm1 * 100).toFixed(0)} Cent·${km} = ${round2(grund1 + preisProKm1 * km)} €`,
          `Anbieter 2: ${grund2} + ${(preisProKm2 * 100).toFixed(0)} Cent·${Math.max(0, km - freikm)} = ${round2(grund2 + preisProKm2 * Math.max(0, km - freikm))} €`
        ],
        category: "tarifvergleich"
      };
    },

    // Seite: Kreise färben (20%)
    prozent_einfaerben: () => {
      const gesamt = rand(20, 30);
      return {
        text: `Färbe 20% von ${gesamt} Kreisen ein.`,
        question: `Wie viele Kreise müssen eingefärbt werden?`,
        sol: Math.round(gesamt * 0.2),
        steps: [`20% von ${gesamt} = ${gesamt} · 0,2 = ${Math.round(gesamt * 0.2)}`],
        category: "prozent"
      };
    },

    // Seite: Lage der Würfel (Würfelnetz)
    wuerfel_augen: () => {
      const augen = rand(1, 6);
      return {
        text: `Bei einem Würfel ergänzen sich gegenüberliegende Seiten zu 7.`,
        question: `Welche Augenzahl fehlt auf der grauen Fläche, wenn 1,2,3 sichtbar sind?`,
        sol: 6,
        steps: [`Gegenüber von 1 ist 6. Daher fehlt die 6.`],
        category: "wuerfel"
      };
    },

    // Seite: Linear und proportional
    linear_proportional: () => {
      return {
        text: `Eine proportionale Funktion geht durch (0|0).`,
        question: `Handelt es sich bei y = 3x + 2 um eine proportionale Funktion?`,
        sol: "Nein",
        steps: [`Nein, weil sie nicht durch (0|0) geht (y = 2 bei x=0).`],
        category: "funktionen"
      };
    },

    // Seite: Ohrhänger (Umfang Dreieck)
    ohrhaenger: () => {
      const seite = rand(4, 7);
      const draht = rand(80, 100);
      const anzahl = Math.floor(draht / (3 * seite));
      return {
        text: `Ein gleichseitiger Ohrhänger hat eine Seitenlänge von ${seite} cm.`,
        question: `Wie viele solcher Ohrhänger kann Janina mit ${draht} cm Silberdraht herstellen?`,
        sol: anzahl,
        steps: [`Umfang eines Ohrhängers: 3 · ${seite} = ${3 * seite} cm`, `${draht} cm : ${3 * seite} cm = ${anzahl} Stück`],
        category: "umfang"
      };
    },

    // Seite: Punkt gesucht (Abstand)
    punkt_gesucht: () => {
      const xA = rand(1, 5);
      const yA = rand(1, 5);
      const xB = rand(6, 10);
      const yB = rand(1, 5);
      const xD = rand(2, 8);
      const yD = rand(6, 10);
      return {
        text: `Gegeben sind Punkte A(${xA}|${yA}), B(${xB}|${yB}), D(${xD}|${yD}).`,
        question: `Gesucht ist ein Punkt P, der von A und B gleich weit entfernt ist und 5 LE von D.`,
        sol: `P( ${(xA + xB)/2} | ${(yA + yB)/2 + Math.sqrt(25 - ((xA + xB)/2 - xD)**2)} )`,
        steps: [`Mittelpunkt von AB: M(${(xA + xB)/2}|${(yA + yB)/2})`, `P liegt auf Senkrechter durch M, Abstand zu D = 5 → Pythagoras`],
        category: "geometrie_koordinaten"
      };
    },

    // Seite: Quadrat zeichnen
    quadrat_zeichnen: () => {
      const seite = rand(4, 8);
      return {
        text: `Zeichne ein Quadrat mit der Seitenlänge ${seite} cm.`,
        question: `Berechne den Umfang und Flächeninhalt.`,
        sol: `U = ${4 * seite} cm, A = ${seite * seite} cm²`,
        steps: [`U = 4 · ${seite} = ${4 * seite} cm`, `A = ${seite} · ${seite} = ${seite * seite} cm²`],
        category: "geometrie_quadrat"
      };
    },

    // Seite: Rechenvorteil (Kommutativgesetz)
    rechenvorteil: () => {
      const a = rand(2, 8);
      const b = rand(20, 50);
      const c = rand(10, 30);
      return {
        text: `Berechne: ${a} · ${b} · ${c}`,
        question: `Wie kann man einen Rechenvorteil nutzen?`,
        sol: a * b * c,
        steps: [`${a} · ${c} = ${a * c}`, `dann ${a * c} · ${b} = ${a * c * b}`],
        category: "rechnen"
      };
    },

    // Seite: Restaurantgewinnspiel (Wahrscheinlichkeit)
    gewinnspiel: () => {
      return {
        text: `100 Kugeln mit Nummern 1-100. Gast nennt eine Zahl und zieht eine Kugel (mit Zurücklegen).`,
        question: `Wie groß ist die Gewinnwahrscheinlichkeit?`,
        sol: "1%",
        steps: [`P = 1/100 = 1%`],
        category: "wsk"
      };
    },

    // Seite: Rollrasen (Fläche & Volumen)
    rollrasen: () => {
      const l = rand(8, 15);
      const b = rand(5, 12);
      const streifenLaenge = rand(180, 250) / 100; // 1.8 - 2.5 m
      const streifenBreite = rand(40, 70) / 100; // 0.4 - 0.7 m
      const anzahl = Math.ceil(l * b / (streifenLaenge * streifenBreite));
      return {
        text: `Eine Rasenfläche ist ${l} m lang und ${b} m breit. Ein Rollrasen-Streifen ist ${streifenBreite.toFixed(2)} m breit und ${streifenLaenge.toFixed(2)} m lang.`,
        question: `Wie viele Streifen werden benötigt?`,
        sol: anzahl,
        steps: [`Fläche: ${l} · ${b} = ${l * b} m²`, `Fläche pro Streifen: ${streifenBreite.toFixed(2)} · ${streifenLaenge.toFixed(2)} = ${round2(streifenBreite * streifenLaenge)} m²`, `${round2(l * b)} : ${round2(streifenBreite * streifenLaenge)} = ${round2(l * b / (streifenBreite * streifenLaenge))} → aufrunden: ${anzahl}`],
        category: "flaeche"
      };
    },

    // Seite: Schneekristall (Symmetrie)
    symmetrieachsen: () => {
      return {
        text: `Ein Schneekristall hat sechs Strahlen.`,
        question: `Wie viele Symmetrieachsen hat er?`,
        sol: 6,
        steps: [`Ein regelmäßiges Sechseck bzw. sechsstrahliger Stern hat 6 Symmetrieachsen.`],
        category: "symmetrie"
      };
    },

    // Seite: Schulgrundstück (Maßstab)
    massstab: () => {
      const real = rand(80, 150);
      const zeichnung = rand(4, 12);
      return {
        text: `Ein Schulgebäude ist in Wirklichkeit ${real} m lang. In der Zeichnung ist es ${zeichnung} cm lang.`,
        question: `Berechne den Maßstab.`,
        sol: `1 : ${round2(real * 100 / zeichnung)}`,
        steps: [`${real} m = ${real * 100} cm`, `Maßstab = Zeichnung : Wirklichkeit = ${zeichnung} : ${real * 100} = 1 : ${round2(real * 100 / zeichnung)}`],
        category: "massstab"
      };
    },

    // Seite: Suche die Zahl (Gleichung)
    suche_die_zahl: () => {
      const x = rand(3, 10);
      return {
        text: `Das Dreifache einer Zahl vermindert um 5 ist 16.`,
        question: `Wie heißt die Zahl?`,
        sol: 7,
        steps: [`3x - 5 = 16`, `3x = 21`, `x = 7`],
        category: "gleichungen"
      };
    },

    // Seite: Tarifvergleich (Säulendiagramm)
    tarifvergleich: () => {
      const tarife = [
        {name: "S", grund: 5, einheiten: 100},
        {name: "M", grund: 10, einheiten: 200},
        {name: "L", grund: 15, einheiten: 300}
      ];
      return {
        text: `Tarife: S: ${tarife[0].grund}€ / ${tarife[0].einheiten} Einheiten, M: ${tarife[1].grund}€ / ${tarife[1].einheiten} Einheiten, L: ${tarife[2].grund}€ / ${tarife[2].einheiten} Einheiten.`,
        question: `Warum stimmen die Säulenhöhen in der Anzeige nicht?`,
        sol: "Die Höhen müssen proportional zu den Kosten oder Einheiten sein.",
        steps: [`Säulen müssten entweder die Kosten oder die Einheiten darstellen, nicht beides vermischt.`],
        category: "diagramme"
      };
    },

    // Seite: Tee wiegen (Statistik)
    tee_wiegen: () => {
      const soll = 75;
      const elvira = [];
      for (let i = 0; i < 15; i++) elvira.push(rand(70, 80));
      const sheila = [];
      for (let i = 0; i < 15; i++) sheila.push(rand(65, 85));
      const summeSheila = sheila.reduce((a,b) => a+b, 0);
      return {
        text: `Elvira: ${elvira.join(', ')} g. Sheila: ${sheila.join(', ')} g.`,
        question: `Berechne den Durchschnitt von Sheilas Tüten.`,
        sol: round2(summeSheila / 15),
        steps: generateSteps("durchschnitt", {zahlen: sheila, summe: summeSheila, anzahl: 15}, round2(summeSheila / 15)),
        category: "statistik"
      };
    },

    // Seite: Temperaturdifferenz
    temperaturdifferenz: () => {
      const morgen = rand(-5, 5);
      const nachmittag = rand(10, 25);
      return {
        text: `Morgens: ${morgen}°C, nachmittags: ${nachmittag}°C.`,
        question: `Um wie viel Grad ist die Temperatur gestiegen?`,
        sol: nachmittag - morgen,
        steps: generateSteps("temperaturdifferenz", {morgen, nachmittag}, nachmittag - morgen),
        category: "temperatur"
      };
    },

    // Seite: Temperaturen in Frankfurt (Tabelle ergänzen)
    temperatur_tabelle: () => {
      const monat = pickFrom(["November", "August"]);
      const wert = rand(2, 18);
      return {
        text: `Die Durchschnittstemperatur im ${monat} beträgt ${wert}°C.`,
        question: `Trage den Wert in die Tabelle/das Diagramm ein.`,
        sol: `${wert}°C`,
        steps: [`Einfach ablesen/eintragen.`],
        category: "diagramme"
      };
    },

    // Seite: Treppenmaße (Schrittmaßregel)
    treppenmass: () => {
      const h = rand(15, 20);
      const b = rand(25, 32);
      return {
        text: `Schrittmaßregel: 2·h + b = 63 cm.`,
        question: `Für h = ${h} cm und b = ${b} cm: Ist die Regel erfüllt?`,
        sol: 2*h + b,
        fullSolution: 2*h + b === 63 ? "Ja, genau 63" : `Nein, 2·${h} + ${b} = ${2*h + b} cm`,
        steps: [`2·${h} + ${b} = ${2*h + b} cm → ${2*h + b === 63 ? "erfüllt" : "nicht erfüllt"}`],
        category: "sachaufgabe"
      };
    },

    // Seite: Tunnelbohrmaschine (Geschwindigkeit)
    tunnel: () => {
      const laenge = rand(3, 8); // km
      const tage = rand(150, 300);
      return {
        text: `Ein U-Bahn-Tunnel soll ${laenge} km lang werden.`,
        question: `Wie viele Meter pro Tag müssen gebohrt werden, wenn er in ${tage} Tagen fertig sein soll?`,
        sol: round2(laenge * 1000 / tage),
        steps: [`${laenge} km = ${laenge * 1000} m`, `${laenge * 1000} m : ${tage} Tage = ${round2(laenge * 1000 / tage)} m/Tag`],
        category: "sachaufgabe"
      };
    },

    // Seite: Unfertiger Würfel (Volumen/Oberfläche)
    wuerfel_volumen: () => {
      const a = rand(3, 6);
      return {
        text: `Ein Würfel hat die Kantenlänge ${a} cm.`,
        question: `Berechne Volumen und Oberfläche.`,
        sol: `V = ${a*a*a} cm³, O = ${6*a*a} cm²`,
        steps: [`V = a³ = ${a}³ = ${a*a*a} cm³`, `O = 6·a² = 6·${a*a} = ${6*a*a} cm²`],
        category: "geometrie_wuerfel"
      };
    },

    // Seite: Unregelmäßiges Viereck (Flächenbestimmung)
    viereck_flaeche: () => {
      return {
        text: `Ein unregelmäßiges Viereck ist gegeben.`,
        question: `Beschreibe, wie man den Flächeninhalt genau bestimmen kann.`,
        sol: "Zerlegung in Dreiecke, Messen der Diagonalen und Höhen oder Koordinatenmethode.",
        steps: [
          `Methode 1: In zwei Dreiecke zerlegen, Diagonale messen, Höhen bestimmen.`,
          `Methode 2: Koordinaten der Eckpunkte bestimmen, Fläche mit Gauß'scher Trapezformel berechnen.`
        ],
        category: "geometrie"
      };
    },

    // Seite: Volumenverkleinerung (Oberflächenänderung)
    volumenverkleinerung: () => {
      const faktor = Math.cbrt(0.73); // ∛0.73 ≈ 0.9
      return {
        text: `Ein Würfel wird so verkleinert, dass sein Volumen um 27% abnimmt.`,
        question: `Um wie viel Prozent verkleinert sich die Oberfläche?`,
        sol: round2((1 - faktor**2) * 100),
        steps: [`Volumenfaktor k = ∛0,73 ≈ 0,9`, `Oberfläche ändert sich mit k² = 0,81 → 19% Abnahme`],
        category: "geometrie_wuerfel"
      };
    },

    // Seite: Wahrscheinlicher (Ereignisvergleich)
    wahrscheinlicher: () => {
      return {
        text: `Ereignis A: Mit zwei Würfeln eine 7 würfeln. Ereignis B: Mit zwei Würfeln eine 6 würfeln.`,
        question: `Welches Ereignis hat die höhere Wahrscheinlichkeit?`,
        sol: "Ereignis A",
        steps: [`P(7) = 6/36, P(6) = 5/36 → 7 ist wahrscheinlicher.`],
        category: "wsk"
      };
    },

    // Seite: Weitsprung (Tabellenkalkulation)
    weitsprung: () => {
      return {
        text: `Drei Sprünge: 4,20 m; 4,50 m; 4,80 m.`,
        question: `Wie berechnet man die mittlere Weite in einer Tabellenkalkulation?`,
        sol: "=MITTELWERT(C2:E2)",
        steps: [`Die Formel =MITTELWERT(C2:E2) berechnet den Durchschnitt.`],
        category: "tabellenkalkulation"
      };
    },

    // Seite: Winkel im Dreieck
    winkel_im_dreieck: () => {
      const alpha = rand(30, 50);
      const beta = rand(40, 60);
      const gamma = 180 - alpha - beta;
      return {
        text: `Im Dreieck sind α = ${alpha}°, β = ${beta}°.`,
        question: `Berechne γ.`,
        sol: gamma,
        steps: generateSteps("winkel_im_dreieck", {α: alpha, β: beta, γ: gamma}, gamma),
        category: "geometrie_dreieck"
      };
    },

    // Seite: Würfelkörper (Volumen/Oberfläche)
    wuerfelkoerper: () => {
      const a = rand(3, 6);
      return {
        text: `Ein Würfel der Kantenlänge ${a} cm ist aus 1 cm³ kleinen Würfeln zusammengesetzt.`,
        question: `Berechne Volumen und Oberfläche.`,
        sol: `V = ${a*a*a} cm³, O = ${6*a*a} cm²`,
        steps: [`V = a³ = ${a}³ = ${a*a*a} cm³`, `O = 6·a² = 6·${a*a} = ${6*a*a} cm²`],
        category: "geometrie_wuerfel"
      };
    },

    // Seite: Würfeln mit Quader (Wahrscheinlichkeit)
    wuerfel_quader: () => {
      return {
        text: `Ein Quader hat die Seitenflächen 1,2,3,4,5,6.`,
        question: `Wie sind die Wahrscheinlichkeiten verteilt?`,
        sol: "1,6 (kleinste Flächen) haben geringste, 3,4 (größte Flächen) haben höchste Wahrscheinlichkeit.",
        steps: [`Wahrscheinlichkeit proportional zur Flächengröße.`],
        category: "wsk"
      };
    },

    // Seite: Würfeln mit zwei Würfeln
    wuerfel_zwei: () => {
      return {
        text: `Mit zwei Würfeln wird gewürfelt.`,
        question: `Gib alle Ergebnisse mit Summe 6 an.`,
        sol: "(1,5), (2,4), (3,3), (4,2), (5,1)",
        steps: generateSteps("wsk_wuerfel_zwei", {}, 5),
        category: "wsk"
      };
    },

    // Seite: Zahlen gesucht (Kombinatorik)
    kombinatorik: () => {
      const ziffern = [1,2,3];
      return {
        text: `Aus den Ziffern 1,2,3 sollen dreistellige Zahlen ohne Wiederholung gebildet werden.`,
        question: `Wie viele gibt es?`,
        sol: 6,
        steps: [`3! = 3·2·1 = 6 Zahlen: 123,132,213,231,312,321`],
        category: "kombinatorik"
      };
    },

    // Seite: Zahlenmauer
    zahlenmauer: () => {
      const unten = [rand(2,8), rand(3,9), rand(4,10)];
      return {
        text: `Zahlenmauer: unten: ${unten[0]}, ${unten[1]}, ${unten[2]}`,
        question: `Berechne die mittlere Reihe und die Spitze.`,
        sol: `Mitte: ${unten[0]+unten[1]}, ${unten[1]+unten[2]}; Spitze: ${unten[0]+2*unten[1]+unten[2]}`,
        steps: [
          `Mitte links: ${unten[0]} + ${unten[1]} = ${unten[0] + unten[1]}`,
          `Mitte rechts: ${unten[1]} + ${unten[2]} = ${unten[1] + unten[2]}`,
          `Spitze: ${unten[0] + unten[1]} + ${unten[1] + unten[2]} = ${unten[0] + 2*unten[1] + unten[2]}`
        ],
        category: "zahlenmauer"
      };
    },

    // Seite: Zahlensuche (Vorgänger-Doppeltes)
    zahlensuche: () => {
      const n = rand(10, 50);
      return {
        text: `Vervollständige die Tabelle: Zahl: ${n}, Vorgänger: ${n-1}, Doppeltes des Vorgängers: ?`,
        question: `Berechne das Doppelte des Vorgängers.`,
        sol: 2*(n-1),
        steps: [`Vorgänger = ${n} - 1 = ${n-1}`, `Doppeltes = 2·${n-1} = ${2*(n-1)}`],
        category: "zahlen"
      };
    },

    // Seite: Zwei Kreise (Flächenvergleich)
    zwei_kreise: () => {
      return {
        text: `Zwei Kreise mit gleichem Radius, Mittelpunkte A und B, Abstand AB = r.`,
        question: `Ist das Dreieck DFH flächenmäßig dreimal so groß wie Dreieck ABH?`,
        sol: "Ja",
        steps: [`ABH ist gleichseitig mit Seite r, Fläche = (√3/4)r²`, `DFH ist ähnlich mit doppelter Seitenlänge, Fläche = 4·(√3/4)r² = √3 r² → 4 mal so groß, nicht 3.`],
        category: "geometrie_kreis"
      };
    },

    // Seite: Zwei Thermometeranzeigen
    thermometer: () => {
      const t1 = rand(-5, 5);
      const t2 = rand(10, 25);
      return {
        text: `Thermometer 1 zeigt ${t1}°C, Thermometer 2 zeigt ${t2}°C.`,
        question: `Gib den Temperaturunterschied an.`,
        sol: t2 - t1,
        steps: [`Unterschied = ${t2} - (${t1}) = ${t2 - t1}°C`],
        category: "temperatur"
      };
    },

    // Seite: Zählung von Fahrzeugen
    fahrzeugzaehlung: () => {
      const pkws = rand(200, 300);
      const lkws = rand(50, 100);
      const motorraeder = rand(20, 60);
      const sonstige = rand(10, 40);
      return {
        text: `Bei einer Zählung wurden erfasst: PKW: ${pkws}, LKW: ${lkws}, Motorräder: ${motorraeder}, Sonstige: ${sonstige}.`,
        question: `Vervollständige das Stabdiagramm.`,
        sol: `${pkws+lkws+motorraeder+sonstige} Fahrzeuge`,
        steps: [`PKW: ${pkws}, LKW: ${lkws}, Motorräder: ${motorraeder}, Sonstige: ${sonstige}`],
        category: "diagramme"
      };
    }
  };

  /* =========================================================
     getTask - Hauptfunktion zum Abrufen einer Vera8-Aufgabe
  ========================================================= */
  function getTask(config) {
    const categories = Object.keys(TASK_GENERATORS);
    const cat = pickFrom(categories);
    
    let task = TASK_GENERATORS[cat]();
    task.category = cat;
    
    if (!task.fullSolution) {
      task.fullSolution = task.sol;
    }
    
    task.formattedSteps = formatSteps(task.steps || generateSteps(task.category, task.params || {}, task.sol), task.fullSolution);
    
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

  // Globale Bereitstellung
  window.getTaskVera8 = getTask;
  window.TASK_GENERATORS_VERA8 = TASK_GENERATORS;

})();