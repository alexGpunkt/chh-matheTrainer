/* =========================================================
   pool_113.js
   Anspruchsvolles Niveau (Note 1–2)
   VOLLSTÄNDIG ÜBERARBEITET: Dynamische Parameter + Lösungsschritte
   + VERBESSERT: Konkretere Aufgabenstellungen
========================================================= */

(function () {

  /* =========================================================
     HILFSFUNKTIONEN (aus pool.js übernommen & angepasst)
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
  const OPERATOR_GROUPS_113 = {
    BERECHNE: ["berechne", "bestimme", "ermittle", "gib an"],
    ERMITTLE: ["ermittle", "bestimme"],
    BEGRUENDE: ["begründe", "erläutere", "weise nach"],
    UEBERPRUEFE: ["überprüfe", "prüfe"],
    ENTSCHEIDE: ["entscheide"],
    STELLE_GLEICHUNG: ["stelle eine Gleichung auf", "modelliere"],
    ENTSCHEIDE_BEGRUENDE: ["entscheide und begründe"],
    WEISE_NACH: ["weise nach"]
  };

  function getOperatorPhrase(group) {
    const list = OPERATOR_GROUPS_113[group] || ["berechne"];
    const op = pickFrom(list);
    return op.charAt(0).toUpperCase() + op.slice(1);
  }

  /* =========================================================
     LÖSUNGSSCHRITTE GENERIEREN (analog pool.js)
  ========================================================= */
  function generateSteps(taskType, params, solution) {
    switch (taskType) {
      // ---------- PROZENT ----------
      case "prozent_rabattkette":
        return [
          `Erster Rabatt: ${params.preis} € · ${100 - params.rabatt1}% = ${params.preis * (100 - params.rabatt1) / 100} €`,
          `Zweiter Rabatt: ${round2(params.preis * (100 - params.rabatt1) / 100)} € · ${100 - params.rabatt2}% = ${round2(params.preis * (100 - params.rabatt1) / 100 * (100 - params.rabatt2) / 100)} €`,
          `Gesamtersparnis: ${params.preis} € − ${round2(params.endpreis)} € = ${round2(params.preis - params.endpreis)} €`,
          `Gesamtrabatt: ${round2((params.preis - params.endpreis) / params.preis * 100)}%`
        ];
      case "prozent_anzahlung":
        return [
          `Anzahlung: ${params.preis} € · ${params.prozent}%`,
          `${params.preis} · ${params.prozent / 100} = ${params.preis * params.prozent / 100} €`
        ];
      case "prozent_mwst":
        return [
          `Brutto = Netto · (1 + MwSt)`,
          `${params.netto} · ${1 + params.mwst/100} = ${round2(params.netto * (1 + params.mwst/100))} €`
        ];
      case "prozent_mwst_rueckwaerts":
        return [
          `Netto = Brutto : (1 + MwSt)`,
          `${params.brutto} : ${1 + params.mwst/100} = ${round2(params.brutto / (1 + params.mwst/100))} €`
        ];
      case "prozent_wertverlust":
        return [
          `Nach Jahr 1: ${params.kaufpreis} · ${100 - params.verlust1}% = ${params.kaufpreis * (100 - params.verlust1) / 100} €`,
          `Nach Jahr 2: ${round2(params.kaufpreis * (100 - params.verlust1) / 100)} · ${100 - params.verlust2}% = ${round2(params.restwert)} €`,
          `Anteil: ${round2(params.restwert)} / ${params.kaufpreis} = ${round2(params.restwert / params.kaufpreis * 100)}%`
        ];
      case "prozent_skonto":
        return [
          `Zahlungsbetrag = Rechnungsbetrag · (1 − Skonto)`,
          `${params.betrag} · ${1 - params.skonto/100} = ${round2(params.betrag * (1 - params.skonto/100))} €`
        ];
      case "prozent_rueckwaerts":
        return [
          `${100 + params.erhoehung}% = ${params.neupreis} €`,
          `1% = ${params.neupreis} : ${100 + params.erhoehung} = ${round2(params.neupreis / (100 + params.erhoehung))} €`,
          `100% = ${round2(params.neupreis / (100 + params.erhoehung) * 100)} €`
        ];
      case "zins_zeit":
        return [
          `Jahreszinsen: ${params.kapital} · ${params.zins/100} = ${params.kapital * params.zins/100} €`,
          `Zinsen für ${params.monate} Monate: ${round2(params.kapital * params.zins/100)} · ${params.monate}/12 = ${round2(params.kapital * params.zins/100 * params.monate/12)} €`
        ];
      case "prozent_rabatt_prozentsatz":
        return [
          `Ersparnis: ${params.alt} − ${params.neu} = ${params.alt - params.neu} €`,
          `Prozentsatz: (${params.alt - params.neu}) / ${params.alt} = ${round2((params.alt - params.neu) / params.alt)} = ${round2((params.alt - params.neu) / params.alt * 100)}%`
        ];
      case "zins_zinssatz":
        return [
          `Zinssatz = Zinsen / Kapital`,
          `${params.zinsen} / ${params.kapital} = ${round2(params.zinsen / params.kapital)} = ${round2(params.zinsen / params.kapital * 100)}%`
        ];

      // ---------- ZUORDNUNGEN ----------
      case "zuordnung_proportional_verbrauch":
        return [
          `Verbrauch pro km: ${params.verbrauch} L / ${params.strecke1} km = ${round2(params.verbrauch / params.strecke1)} L/km`,
          `Reichweite: ${params.tank} L : ${round2(params.verbrauch / params.strecke1)} L/km = ${round2(params.tank / (params.verbrauch / params.strecke1))} km`
        ];
      case "zuordnung_proportional_brötchen":
        return [
          `Preis pro Brötchen: ${params.preis} € : ${params.anzahl1} = ${round2(params.preis / params.anzahl1)} €`,
          `Preis für ${params.anzahl2} Brötchen: ${round2(params.preis / params.anzahl1)} · ${params.anzahl2} = ${round2(params.preis / params.anzahl1 * params.anzahl2)} €`
        ];
      case "zuordnung_proportional_zeit":
        return [
          `Preis pro Stunde: ${params.preis} €`,
          `Preis für ${params.stunden} h: ${params.preis} · ${params.stunden} = ${params.preis * params.stunden} €`
        ];
      case "zuordnung_antiproportional_arbeiter":
        return [
          `Gesamtarbeit: ${params.anz1} · ${params.stunden1} = ${params.anz1 * params.stunden1} Arbeitsstunden`,
          `Zeit für ${params.anz2} Arbeiter: ${params.anz1 * params.stunden1} : ${params.anz2} = ${round2(params.anz1 * params.stunden1 / params.anz2)} h`
        ];
      case "zuordnung_antiproportional_futter":
        return [
          `Futtervorrat: ${params.tiere1} · ${params.tage1} = ${params.tiere1 * params.tage1} Tier-Tage`,
          `${params.tiere2} Tiere: ${params.tiere1 * params.tage1} : ${params.tiere2} = ${round2(params.tiere1 * params.tage1 / params.tiere2)} Tage`
        ];
      case "zuordnung_proportional_maschinen":
        return [
          `Teile pro Maschine: ${params.teile} : ${params.maschinen1} = ${params.teile / params.maschinen1}`,
          `${params.maschinen2} Maschinen: ${params.teile / params.maschinen1} · ${params.maschinen2} = ${round2(params.teile / params.maschinen1 * params.maschinen2)} Teile`
        ];

      // ---------- PYTHAGORAS ----------
      case "pythagoras_schirm":
        return [
          `Diagonale: d² = l² + b²`,
          `d² = ${params.l}² + ${params.b}² = ${params.l * params.l} + ${params.b * params.b} = ${params.l * params.l + params.b * params.b}`,
          `d = √${params.l * params.l + params.b * params.b} = ${round2(params.d)} cm`,
          `Vergleich: d ${params.d > params.schirm ? '>' : '<'} ${params.schirm} → ${params.d > params.schirm ? 'passt' : 'passt nicht'}`
        ];
      case "pythagoras_rechtwinklig_pruefen":
        return [
          `Satz des Pythagoras: a² + b² = c²`,
          `${params.a}² + ${params.b}² = ${params.a * params.a + params.b * params.b}`,
          `${params.c}² = ${params.c * params.c}`,
          `${params.a * params.a + params.b * params.b} ${params.isRight ? '=' : '≠'} ${params.c * params.c}`,
          `Das Dreieck ist ${params.isRight ? 'rechtwinklig' : 'nicht rechtwinklig'}.`
        ];
      case "pythagoras_sendemast":
        return [
          `Seillänge: s² = h² + a²`,
          `s² = ${params.h}² + ${params.a}² = ${params.h * params.h} + ${params.a * params.a} = ${params.h * params.h + params.a * params.a}`,
          `s = √${params.h * params.h + params.a * params.a} = ${round2(params.s)} m`,
          `Gesamtlänge: 4 · ${round2(params.s)} = ${round2(4 * params.s)} m`
        ];
      case "pythagoras_leiter":
        return [
          `Satz des Pythagoras: h² + a² = l²`,
          `h² = l² − a² = ${params.l}² − ${params.a}² = ${params.l * params.l} − ${params.a * params.a} = ${params.l * params.l - params.a * params.a}`,
          `h = √${params.l * params.l - params.a * params.a} = ${round2(params.h)} m`
        ];
      case "pythagoras_diagonale":
        return [
          `d² = l² + b²`,
          `d² = ${params.l}² + ${params.b}² = ${params.l * params.l} + ${params.b * params.b} = ${params.l * params.l + params.b * params.b}`,
          `d = √${params.l * params.l + params.b * params.b} = ${round2(params.d)} cm`
        ];
      case "pythagoras_drachen":
        return [
          `Satz des Pythagoras: h² + a² = l²`,
          `h² = l² − a² = ${params.l}² − ${params.a}² = ${params.l * params.l} − ${params.a * params.a} = ${params.l * params.l - params.a * params.a}`,
          `h = √${params.l * params.l - params.a * params.a} = ${round2(params.h)} m`
        ];

      // ---------- KÖRPERBERECHNUNG ----------
      case "koerper_zylinder_kosten":
        return [
          `Volumen: V = π · r² · h`,
          `V = 3,14 · ${params.r}² · ${params.h} = 3,14 · ${params.r * params.r} · ${params.h} = ${round2(3.14 * params.r * params.r * params.h)} cm³`,
          `In Liter: ${round2(3.14 * params.r * params.r * params.h / 1000)} L`,
          `Kosten: ${round2(3.14 * params.r * params.r * params.h / 1000)} L · ${params.preisProLiter} € = ${round2(3.14 * params.r * params.r * params.h / 1000 * params.preisProLiter)} €`
        ];
      case "koerper_zylinder_volumen_liter":
        return [
          `r = d/2 = ${params.d}/2 = ${params.r} cm`,
          `V = π · r² · h = 3,14 · ${params.r}² · ${params.h} = 3,14 · ${params.r * params.r} · ${params.h} = ${round2(3.14 * params.r * params.r * params.h)} cm³`,
          `In Liter: ${round2(3.14 * params.r * params.r * params.h)} cm³ = ${round2(3.14 * params.r * params.r * params.h / 1000)} L`
        ];
      case "koerper_quader_liter":
        return [
          `V = l · b · h`,
          `V = ${params.l} · ${params.b} · ${params.h} = ${params.l * params.b * params.h} cm³`,
          `In Liter: ${params.l * params.b * params.h} cm³ = ${params.l * params.b * params.h / 1000} L`
        ];
      case "koerper_prisma_zelt":
        return [
          `Grundfläche (Dreieck): A = (g · h) : 2`,
          `A = (${params.g} · ${params.h}) : 2 = ${params.g * params.h / 2} m²`,
          `Volumen: V = A · l = ${params.g * params.h / 2} · ${params.l} = ${params.g * params.h / 2 * params.l} m³`
        ];
      case "koerper_zusammengesetzt_quader_wuerfel":
        return [
          `Volumen Quader: V1 = l · b · h = ${params.l} · ${params.b} · ${params.h1} = ${params.l * params.b * params.h1} cm³`,
          `Volumen Würfel: V2 = a³ = ${params.a}³ = ${params.a * params.a * params.a} cm³`,
          `Gesamtvolumen: ${params.l * params.b * params.h1} + ${params.a * params.a * params.a} = ${params.l * params.b * params.h1 + params.a * params.a * params.a} cm³`
        ];
      case "koerper_zusammengesetzt_quader_prisma":
        return [
          `Volumen Quader: V1 = l · b · h1 = ${params.l} · ${params.b} · ${params.h1} = ${params.l * params.b * params.h1} mm³`,
          `Grundfläche Prisma (Dreieck): A = (g · h2) : 2 = (${params.l} · ${params.h2}) : 2 = ${params.l * params.h2 / 2} mm²`,
          `Volumen Prisma: V2 = A · t = ${params.l * params.h2 / 2} · ${params.b} = ${params.l * params.h2 / 2 * params.b} mm³`,
          `Gesamtvolumen: ${params.l * params.b * params.h1} + ${params.l * params.h2 / 2 * params.b} = ${params.l * params.b * params.h1 + params.l * params.h2 / 2 * params.b} mm³`
        ];
      case "koerper_zylinder_mantel":
        return [
          `Mantelfläche: M = 2 · π · r · h`,
          `M = 2 · 3,14 · ${params.r} · ${params.h} = ${round2(2 * 3.14 * params.r * params.h)} cm²`
        ];
      case "koerper_wuerfel_kante_oberflaeche":
        return [
          `Kantenlänge: a = ∛V = ∛${params.volumen} = ${params.a} cm`,
          `Oberfläche: O = 6 · a² = 6 · ${params.a}² = 6 · ${params.a * params.a} = ${6 * params.a * params.a} cm²`
        ];
      case "koerper_quader_netz":
        return [
          `Volumen: V = l · b · h = ${params.l} · ${params.b} · ${params.h} = ${params.l * params.b * params.h} cm³`,
          `Oberfläche: O = 2·(l·b + l·h + b·h)`,
          `= 2·(${params.l}·${params.b} + ${params.l}·${params.h} + ${params.b}·${params.h})`,
          `= 2·(${params.l * params.b} + ${params.l * params.h} + ${params.b * params.h}) = ${2 * (params.l * params.b + params.l * params.h + params.b * params.h)} cm²`
        ];
      case "koerper_zylinder_volumen_liter_gross":
        return [
          `r = d/2 = ${params.d}/2 = ${params.r} cm`,
          `V = π · r² · h = 3,14 · ${params.r}² · ${params.h} = 3,14 · ${params.r * params.r} · ${params.h} = ${round2(3.14 * params.r * params.r * params.h)} cm³`,
          `In Liter: ${round2(3.14 * params.r * params.r * params.h)} cm³ = ${round2(3.14 * params.r * params.r * params.h / 1000)} L`
        ];

      // ---------- STATISTIK ----------
      case "statistik_mittelwert":
        return [
          `Summe: ${params.zahlen.join(' + ')} = ${params.summe}`,
          `Mittelwert: ${params.summe} : ${params.anzahl} = ${round2(params.summe / params.anzahl)}`
        ];
      case "statistik_gewichteter_durchschnitt":
        return [
          `Gewichtung Arbeiten: ${params.noteA} · ${params.gewichtA} = ${round2(params.noteA * params.gewichtA)}`,
          `Gewichtung Sonstiges: ${params.noteS} · ${params.gewichtS} = ${round2(params.noteS * params.gewichtS)}`,
          `Gesamtnote: ${round2(params.noteA * params.gewichtA)} + ${round2(params.noteS * params.gewichtS)} = ${round2(params.noteA * params.gewichtA + params.noteS * params.gewichtS)}`
        ];
      case "statistik_fehlender_wert":
        return [
          `Gesamtsumme: ${params.anzahl} · ${params.durchschnitt} = ${params.anzahl * params.durchschnitt}`,
          `Summe bekannter Zahlen: ${params.bekannte.join(' + ')} = ${params.summeBekannt}`,
          `Fehlende Zahl: ${params.anzahl * params.durchschnitt} − ${params.summeBekannt} = ${params.anzahl * params.durchschnitt - params.summeBekannt}`
        ];
      case "statistik_median_spannweite":
        return [
          `Sortierte Liste: ${params.sortiert.join(', ')}`,
          `Median (Mitte): ${params.median}`,
          `Spannweite: ${params.max} − ${params.min} = ${params.max - params.min}`
        ];
      case "statistik_min_max":
        return [
          `Minimum: ${params.min}`,
          `Maximum: ${params.max}`,
          `Spannweite: ${params.max} − ${params.min} = ${round2(params.max - params.min)}`
        ];
      case "statistik_durchschnittsgeschwindigkeit":
        return [
          `Gesamtstrecke: ${params.strecke1} km + ${params.strecke2} km = ${params.strecke1 + params.strecke2} km`,
          `Gesamtzeit: ${params.zeit1} min + ${params.zeit2} min = ${params.zeit1 + params.zeit2} min = ${round2((params.zeit1 + params.zeit2) / 60)} h`,
          `Durchschnittsgeschwindigkeit: ${params.strecke1 + params.strecke2} km : ${round2((params.zeit1 + params.zeit2) / 60)} h = ${round2((params.strecke1 + params.strecke2) / ((params.zeit1 + params.zeit2) / 60))} km/h`
        ];
      case "statistik_prozentanteil":
        return [
          `Anzahl: ${params.gesamt} · ${params.prozent / 100} = ${round2(params.gesamt * params.prozent / 100)}`
        ];

      // ---------- GLEICHUNGEN ----------
      case "gleichung_altersraetsel":
        return [
          `Gleichung: ${params.vater} + x = ${params.faktor} · (${params.sohn} + x)`,
          `${params.vater} + x = ${params.faktor * params.sohn} + ${params.faktor}x`,
          `${params.vater} − ${params.faktor * params.sohn} = ${params.faktor}x − x`,
          `${params.vater - params.faktor * params.sohn} = ${params.faktor - 1}x`,
          `x = ${params.vater - params.faktor * params.sohn} : ${params.faktor - 1} = ${(params.vater - params.faktor * params.sohn) / (params.faktor - 1)}`
        ];
      case "gleichung_tarif":
        return [
          `Gleichung: ${params.grund1} + ${params.preis1}x = ${params.grund2} + ${params.preis2}x`,
          `${params.preis1}x − ${params.preis2}x = ${params.grund2} − ${params.grund1}`,
          `${params.preis1 - params.preis2}x = ${params.grund2 - params.grund1}`,
          `x = ${params.grund2 - params.grund1} : ${params.preis1 - params.preis2} = ${(params.grund2 - params.grund1) / (params.preis1 - params.preis2)}`,
          `Ab ${Math.floor((params.grund2 - params.grund1) / (params.preis1 - params.preis2)) + 1} Minuten günstiger.`
        ];
      case "gleichung_tarif_entscheidung":
        return [
          `Anbieter 1: ${params.grund1} + ${params.preis1SMS}·${params.sms} + ${params.preis1Tel}·${params.tel} = ${round2(params.grund1 + params.preis1SMS * params.sms + params.preis1Tel * params.tel)} €`,
          `Anbieter 2: ${params.grund2} + ${params.preis2SMS}·${params.sms} + ${params.preis2Tel}·${params.tel} = ${round2(params.grund2 + params.preis2SMS * params.sms + params.preis2Tel * params.tel)} €`,
          `Vergleich: ${round2(params.kosten1)} € vs. ${round2(params.kosten2)} € → ${params.kosten1 < params.kosten2 ? 'Anbieter 1' : 'Anbieter 2'} ist günstiger.`
        ];
      case "gleichung_zahlenraetsel":
        return [
          `Gleichung: 3x + 15 = 5x − 7`,
          `15 + 7 = 5x − 3x`,
          `22 = 2x`,
          `x = 11`
        ];
      case "gleichung_summe":
        return [
          `x + 2x = ${params.summe}`,
          `3x = ${params.summe}`,
          `x = ${params.summe / 3}`,
          `Die Zahlen: ${params.summe / 3} und ${2 * params.summe / 3}`
        ];
      case "gleichung_umfang":
        return [
          `Gleichung: 2a + (3a+4) + 1,5a + 1,5a = ${params.umfang}`,
          `8a + 4 = ${params.umfang}`,
          `8a = ${params.umfang - 4}`,
          `a = ${(params.umfang - 4) / 8} cm`
        ];

      // ---------- FLÄCHENBERECHNUNG ----------
      case "flaeche_rechteck":
        return [
          `A = l · b`,
          `${params.l} · ${params.b} = ${params.l * params.b} m²`
        ];
      case "flaeche_rechteck_umfang":
        return [
          `Umfang: U = 2·(l + b) = 2·(${params.l} + ${params.b}) = ${2 * (params.l + params.b)} m`,
          `Fläche: A = l · b = ${params.l} · ${params.b} = ${params.l * params.b} m²`
        ];
      case "flaeche_dreieck":
        return [
          `A = (g · h) : 2`,
          `(${params.g} · ${params.h}) : 2 = ${params.g * params.h / 2} cm²`
        ];
      case "flaeche_lform":
        return [
          `Rechteck 1: ${params.l1} · ${params.b1} = ${params.l1 * params.b1} m²`,
          `Rechteck 2: ${params.l2} · ${params.b2} = ${params.l2 * params.b2} m²`,
          `Gesamtfläche: ${params.l1 * params.b1} + ${params.l2 * params.b2} = ${params.l1 * params.b1 + params.l2 * params.b2} m²`
        ];
      case "flaeche_rechteck_aus_quadraten":
        return [
          `Seitenlänge Quadrat: √${params.quadratFlaeche} = ${params.seite} cm`,
          `Anordnung: ${params.anzahlBreit} × ${params.anzahlHoch} Quadrate`,
          `Länge: ${params.anzahlBreit} · ${params.seite} = ${params.anzahlBreit * params.seite} cm`,
          `Breite: ${params.anzahlHoch} · ${params.seite} = ${params.anzahlHoch * params.seite} cm`,
          `Umfang: 2·(${params.anzahlBreit * params.seite} + ${params.anzahlHoch * params.seite}) = ${2 * (params.anzahlBreit * params.seite + params.anzahlHoch * params.seite)} cm`
        ];
      case "flaeche_kreis":
        return [
          `A = π · r²`,
          `3,14 · ${params.r}² = 3,14 · ${params.r * params.r} = ${round2(3.14 * params.r * params.r)} m²`
        ];
      case "flaeche_trapez":
        return [
          `A = (a + c) · h : 2`,
          `(${params.a} + ${params.c}) · ${params.h} : 2 = ${(params.a + params.c) * params.h / 2} m²`
        ];

      // ---------- WAHRSCHEINLICHKEIT ----------
      case "wsk_einfach":
        return [
          `Günstige: ${params.gunstig}`,
          `Mögliche: ${params.moglich}`,
          `P = ${params.gunstig}/${params.moglich} = ${round2(params.gunstig / params.moglich)} = ${round2(params.gunstig / params.moglich * 100)}%`
        ];
      case "wsk_gluecksrad":
        return [
          `Anzahl günstige Felder: ${params.gunstig}`,
          `Anzahl mögliche Felder: ${params.moglich}`,
          `P = ${params.gunstig}/${params.moglich} = ${round2(params.gunstig / params.moglich)} = ${round2(params.gunstig / params.moglich * 100)}%`
        ];
      case "wsk_mindestens_einmal":
        return [
          `P(kein Rot) = ${round2(1 - params.wskRot)} · ${round2(1 - params.wskRot)} = ${round2((1 - params.wskRot) * (1 - params.wskRot))}`,
          `P(mind. 1x Rot) = 1 − ${round2((1 - params.wskRot) * (1 - params.wskRot))} = ${round2(1 - (1 - params.wskRot) * (1 - params.wskRot))} = ${round2((1 - (1 - params.wskRot) * (1 - params.wskRot)) * 100)}%`
        ];
      case "wsk_ohne_zuruecklegen":
        return [
          `P(1. rot) = ${params.rot1}/${params.gesamt1} = ${round2(params.rot1 / params.gesamt1)}`,
          `P(2. rot | 1. rot) = ${params.rot2}/${params.gesamt2} = ${round2(params.rot2 / params.gesamt2)}`,
          `P = ${round2(params.rot1 / params.gesamt1)} · ${round2(params.rot2 / params.gesamt2)} = ${round2(params.rot1 / params.gesamt1 * params.rot2 / params.gesamt2)} = ${round2(params.rot1 / params.gesamt1 * params.rot2 / params.gesamt2 * 100)}%`
        ];
      case "wsk_wuerfel_zweimal":
        return [
          `P(6) = 1/6`,
          `P(6,6) = 1/6 · 1/6 = 1/36 = ${round2(1/36 * 100)}%`
        ];
      case "wsk_wuerfel_spezial":
        return [
          `Alle Zahlen sind gerade → P = 1 = 100%`
        ];

      // ---------- WACHSTUM ----------
      case "wachstum_zinseszins_vs_linear":
        return [
          `Linear nach ${params.jahre} Jahren: ${params.kapital} + ${params.jahre}·${params.zinsLinear} = ${params.kapital + params.jahre * params.zinsLinear} €`,
          `Zinseszins nach ${params.jahre} Jahren: ${params.kapital} · ${Math.pow(1 + params.zinsZins/100, params.jahre).toFixed(4)} = ${round2(params.kapital * Math.pow(1 + params.zinsZins/100, params.jahre))} €`,
          `Vergleich: ${params.kapital + params.jahre * params.zinsLinear < params.kapital * Math.pow(1 + params.zinsZins/100, params.jahre) ? 'Zinseszins' : 'Linear'} ist nach ${params.jahre} Jahren höher.`
        ];
      case "wachstum_wertverlust_vergleich":
        return [
          `Linear: ${params.kapital} − ${params.jahre}·${params.verlustLinear} = ${params.kapital - params.jahre * params.verlustLinear} €`,
          `Prozentual: ${params.kapital} · ${Math.pow(1 - params.verlustProzent/100, params.jahre).toFixed(4)} = ${round2(params.kapital * Math.pow(1 - params.verlustProzent/100, params.jahre))} €`,
          `Vergleich: ${params.kapital - params.jahre * params.verlustLinear < params.kapital * Math.pow(1 - params.verlustProzent/100, params.jahre) ? 'Prozentual' : 'Linear'} ist höher.`
        ];
      case "wachstum_zinseszins":
        return [
          `K_n = K_0 · (1 + p)^n`,
          `${params.kapital} · ${Math.pow(1 + params.zins/100, params.jahre).toFixed(4)} = ${round2(params.kapital * Math.pow(1 + params.zins/100, params.jahre))} €`
        ];

      // ---------- VOLUMEN/OBERFLÄCHE ----------
      case "volumen_quader":
        return [
          `V = l · b · h`,
          `${params.l} · ${params.b} · ${params.h} = ${params.l * params.b * params.h} cm³`
        ];
      case "oberflaeche_quader":
        return [
          `O = 2·(l·b + l·h + b·h)`,
          `2·(${params.l}·${params.b} + ${params.l}·${params.h} + ${params.b}·${params.h})`,
          `= 2·(${params.l * params.b} + ${params.l * params.h} + ${params.b * params.h}) = ${2 * (params.l * params.b + params.l * params.h + params.b * params.h)} cm²`
        ];
      case "volumen_zylinder":
        return [
          `V = π · r² · h`,
          `3,14 · ${params.r}² · ${params.h} = 3,14 · ${params.r * params.r} · ${params.h} = ${round2(3.14 * params.r * params.r * params.h)} cm³`
        ];
      case "volumen_wuerfel":
        return [
          `V = a³`,
          `${params.a}³ = ${params.a * params.a * params.a} cm³`
        ];

      // ---------- MAßSTAB ----------
      case "massstab":
        return [
          `Länge in Wirklichkeit = Modell · Maßstab`,
          `${params.laengeModell} · ${params.massstab} = ${params.laengeModell * params.massstab} cm = ${params.laengeModell * params.massstab / 100} m`
        ];

      // ---------- DIAGRAMME ----------
      case "diagramm_kreis_winkel":
        return [
          `Winkel = 360° · Anteil`,
          `360° · ${params.anteil / 100} = ${round2(360 * params.anteil / 100)}°`
        ];

      // ---------- FUNKTIONALE ZUSAMMENHÄNGE ----------
      case "funktion_parkgebuehr":
        return [
          `Für x=1: ${params.preis1} · 0 + ${params.grund} = ${params.grund} €`,
          `Für x=2: ${params.preis1} · 1 + ${params.grund} = ${params.preis1 + params.grund} €`,
          `Der Term ${params.preis1}·(x-1) + ${params.grund} ist richtig.`
        ];
      case "funktion_handytarif":
        return [
          `Kosten = Grundgebühr + Preis pro Minute · Minuten`,
          `${params.grund} + ${params.preisProMin} · ${params.minuten} = ${params.grund + params.preisProMin * params.minuten} €`
        ];

      // ---------- NEUE DIAGRAMMTYPEN 13-21 ----------
      case "prisma_dreiseitig":
        return [
          `Grundfläche (rechtwinkliges Dreieck): A = (a · b) : 2`,
          `A = (${params.base} · ${params.side}) : 2 = ${params.base * params.side / 2} cm²`,
          `Volumen: V = A · h = ${params.base * params.side / 2} · ${params.height} = ${params.base * params.side / 2 * params.height} cm³`
        ];
      case "dachgeschoss_prisma":
        return [
          `Grundfläche (Dreieck): A = (Breite · Höhe) : 2`,
          `A = (${params.width} · ${params.roofHeight}) : 2 = ${params.width * params.roofHeight / 2} m²`,
          `Volumen: V = A · Tiefe = ${params.width * params.roofHeight / 2} · ${params.prismDepth} = ${params.width * params.roofHeight / 2 * params.prismDepth} m³`
        ];
      case "zelt_prisma":
        return [
          `Grundfläche (Dreieck): A = (g · h) : 2`,
          `A = (${params.g} · ${params.h}) : 2 = ${params.g * params.h / 2} m²`,
          `Volumen: V = A · Länge = ${params.g * params.h / 2} · ${params.length} = ${params.g * params.h / 2 * params.length} m³`
        ];
      case "keksverpackung":
        return [
          `Berechnung mit Satz des Heron:`,
          `s = (${params.a} + ${params.b} + ${params.c})/2 = ${(params.a + params.b + params.c)/2}`,
          `A = √(s·(s-a)·(s-b)·(s-c))`,
          `A = √(${params.s}·${params.sa}·${params.sb}·${params.sc}) = √${round2(params.s * params.sa * params.sb * params.sc)} ≈ ${round2(params.area)} cm²`,
          `Volumen: V = A · h = ${round2(params.area)} · ${params.h} = ${round2(params.area * params.h)} cm³`
        ];
      case "holztisch":
        return [
          `Volumen Tischplatte: V1 = π · r² · dicke`,
          `r = d/2 = ${params.diameter}/2 = ${params.r} cm`,
          `V1 = 3,14 · ${params.r}² · ${params.thickness} = 3,14 · ${params.r * params.r} · ${params.thickness} = ${round2(3.14 * params.r * params.r * params.thickness)} cm³`,
          `Volumen ein Bein: V2 = π · r_bein² · h_bein`,
          `r_bein = d_bein/2 = ${params.legDiameter}/2 = ${params.legRadius} cm`,
          `V2 = 3,14 · ${params.legRadius}² · ${params.height} = 3,14 · ${params.legRadius * params.legRadius} · ${params.height} = ${round2(3.14 * params.legRadius * params.legRadius * params.height)} cm³`,
          `Gesamtvolumen: V1 + 4·V2 = ${round2(3.14 * params.r * params.r * params.thickness)} + 4·${round2(3.14 * params.legRadius * params.legRadius * params.height)} = ${round2(params.volGesamt)} cm³ = ${round2(params.volGesamt / 1000)} Liter`
        ];
      case "skateboardrampe":
        return [
          `Grundfläche (Trapez): A = (a + c) · h : 2`,
          `A = (${params.baseL} + ${params.topL}) · ${params.baseH} : 2 = ${(params.baseL + params.topL) * params.baseH / 2} cm²`,
          `Volumen: V = A · Breite = ${(params.baseL + params.topL) * params.baseH / 2} · ${params.width} = ${(params.baseL + params.topL) * params.baseH / 2 * params.width} cm³`,
          `In Liter: ${(params.baseL + params.topL) * params.baseH / 2 * params.width} cm³ = ${(params.baseL + params.topL) * params.baseH / 2 * params.width / 1000} L`
        ];
      case "weideland_viereck":
        return [
          `Zerlegung in zwei Dreiecke mit Diagonale ${params.diag} m`,
          `Dreieck 1: s1 = (${params.a} + ${params.b} + ${params.diag})/2 = ${(params.a + params.b + params.diag)/2}`,
          `A1 = √(s1·(s1-a)·(s1-b)·(s1-diag)) = √${round2(params.s1 * (params.s1 - params.a) * (params.s1 - params.b) * (params.s1 - params.diag))} ≈ ${round2(params.area1)} m²`,
          `Dreieck 2: s2 = (${params.c} + ${params.d} + ${params.diag})/2 = ${(params.c + params.d + params.diag)/2}`,
          `A2 = √(s2·(s2-c)·(s2-d)·(s2-diag)) = √${round2(params.s2 * (params.s2 - params.c) * (params.s2 - params.d) * (params.s2 - params.diag))} ≈ ${round2(params.area2)} m²`,
          `Gesamtfläche: ${round2(params.area1)} + ${round2(params.area2)} = ${round2(params.area1 + params.area2)} m² = ${round2((params.area1 + params.area2) / 10000)} ha`
        ];
      case "flaechenberechnung_garten":
        return [
          `Gartenfläche: ${params.outerW} · ${params.outerH} = ${params.outerW * params.outerH} m²`,
          `Blumenbeetfläche: ${params.cutW} · ${params.cutH} = ${params.cutW * params.cutH} m²`,
          `Rasenfläche: ${params.outerW * params.outerH} − ${params.cutW * params.cutH} = ${params.outerW * params.outerH - params.cutW * params.cutH} m²`
        ];
      case "rechte_winkel_argumentation":
        return [
          `Satz des Pythagoras: a² + b² = c²`,
          `${params.a}² + ${params.b}² = ${params.a * params.a} + ${params.b * params.b} = ${params.a * params.a + params.b * params.b}`,
          `${params.c}² = ${params.c * params.c}`,
          `${params.a * params.a + params.b * params.b} ${params.isRight ? '=' : '≠'} ${params.c * params.c}`,
          `Das Dreieck ist ${params.isRight ? 'rechtwinklig' : 'nicht rechtwinklig'}.`
        ];

      default:
        return [`Rechnung durchführen`, `Ergebnis: ${solution}`];
    }
  }

  /* =========================================================
     DYNAMISCHE AUFGABENGENERIERUNG (analog pool.js)
     VERBESSERT: Konkretere Aufgabenstellungen
  ========================================================= */
  const TASK_GENERATORS_113 = {

    // ---------- PROZENT / RABATT / ZINS / MwSt / SKONTO ----------
    prozent_modellierung: () => {
      const typen = ["rabattkette", "anzahlung", "mwst", "mwst_rueckwaerts", "wertverlust", "skonto", "rueckwaerts", "zins_zeit", "rabatt_prozentsatz", "zins_zinssatz"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "UEBERPRUEFE", "ERMITTLE"]));
      
      switch(typ) {
        case "rabattkette": {
          const preis = rand(50, 1000);
          const rabatt1 = rand(10, 30);
          const rabatt2 = rand(5, 20);
          const zwischen = preis * (100 - rabatt1) / 100;
          const endpreis = zwischen * (100 - rabatt2) / 100;
          const gesamtRabatt = (preis - endpreis) / preis * 100;
          
          return {
            text: `${op} Sie: Ein Artikel kostet ursprünglich ${preis} €. Er wird zuerst um ${rabatt1}% reduziert, dann nochmals um ${rabatt2}% auf den reduzierten Preis.`,
            question: `Berechne den Endpreis nach beiden Rabatten in € sowie den gesamten Rabatt in Prozent (bezogen auf den ursprünglichen Preis). Runde auf zwei Dezimalstellen.`,
            sol: round2(endpreis),
            fullSolution: `Endpreis: ${round2(endpreis)} €, Gesamtrabatt: ${round2(gesamtRabatt)}%`,
            steps: generateSteps("prozent_rabattkette", {preis, rabatt1, rabatt2, endpreis}, round2(endpreis)),
            category: "prozent_modellierung",
            params: {preis, rabatt1, rabatt2, endpreis, gesamtRabatt}
          };
        }
        case "anzahlung": {
          const preis = rand(500, 5000);
          const prozent = rand(10, 30);
          return {
            text: `${op} Sie: Ein Auto kostet ${preis} €. Beim Kauf wird eine Anzahlung von ${prozent}% verlangt.`,
            question: `Berechne den Anzahlungsbetrag in €.`,
            sol: round2(preis * prozent / 100),
            steps: generateSteps("prozent_anzahlung", {preis, prozent}, round2(preis * prozent / 100)),
            category: "prozent_modellierung",
            params: {preis, prozent}
          };
        }
        case "mwst": {
          const netto = rand(50, 800);
          const mwst = 19;
          return {
            text: `${op} Sie: Ein Laptop kostet netto ${netto} €. Die Mehrwertsteuer beträgt ${mwst}%.`,
            question: `Berechne den Bruttopreis (inkl. MwSt) in €.`,
            sol: round2(netto * (1 + mwst/100)),
            steps: generateSteps("prozent_mwst", {netto, mwst}, round2(netto * (1 + mwst/100))),
            category: "prozent_modellierung",
            params: {netto, mwst}
          };
        }
        case "mwst_rueckwaerts": {
          const brutto = rand(100, 1000);
          const mwst = 19;
          return {
            text: `${op} Sie: Ein Fernseher kostet brutto ${brutto} € (inkl. ${mwst}% MwSt).`,
            question: `Berechne den Nettopreis (ohne MwSt) in €.`,
            sol: round2(brutto / (1 + mwst/100)),
            steps: generateSteps("prozent_mwst_rueckwaerts", {brutto, mwst}, round2(brutto / (1 + mwst/100))),
            category: "prozent_modellierung",
            params: {brutto, mwst}
          };
        }
        case "wertverlust": {
          const kaufpreis = rand(15000, 50000);
          const verlust1 = rand(20, 30);
          const verlust2 = rand(10, 20);
          const nach1 = kaufpreis * (100 - verlust1) / 100;
          const restwert = nach1 * (100 - verlust2) / 100;
          return {
            text: `${op} Sie: Ein Neuwagen kostet ${kaufpreis} €. Er verliert im ersten Jahr ${verlust1}% an Wert, im zweiten Jahr weitere ${verlust2}% (vom Restwert des ersten Jahres).`,
            question: `Berechne den Restwert nach zwei Jahren in € und den prozentualen Anteil am ursprünglichen Preis.`,
            sol: round2(restwert),
            fullSolution: `Restwert: ${round2(restwert)} €, Anteil: ${round2(restwert / kaufpreis * 100)}%`,
            steps: generateSteps("prozent_wertverlust", {kaufpreis, verlust1, verlust2, restwert}, round2(restwert)),
            category: "prozent_modellierung",
            params: {kaufpreis, verlust1, verlust2, restwert}
          };
        }
        case "skonto": {
          const betrag = rand(200, 2000);
          const skonto = rand(2, 5);
          return {
            text: `${op} Sie: Eine Rechnung über ${betrag} € wird unter Abzug von ${skonto}% Skonto bezahlt.`,
            question: `Berechne den Zahlungsbetrag nach Skontoabzug in €.`,
            sol: round2(betrag * (1 - skonto/100)),
            steps: generateSteps("prozent_skonto", {betrag, skonto}, round2(betrag * (1 - skonto/100))),
            category: "prozent_modellierung",
            params: {betrag, skonto}
          };
        }
        case "rueckwaerts": {
          const erhoehung = rand(10, 25);
          const neupreis = rand(100, 300);
          return {
            text: `${op} Sie: Nach einer Preiserhöhung um ${erhoehung}% kostet ein Produkt nun ${neupreis} €.`,
            question: `Berechne den ursprünglichen Preis vor der Erhöhung in €.`,
            sol: round2(neupreis / (1 + erhoehung/100)),
            steps: generateSteps("prozent_rueckwaerts", {erhoehung, neupreis}, round2(neupreis / (1 + erhoehung/100))),
            category: "prozent_modellierung",
            params: {erhoehung, neupreis}
          };
        }
        case "zins_zeit": {
          const kapital = rand(2000, 10000);
          const zins = rand(1, 4);
          const monate = rand(3, 11);
          return {
            text: `${op} Sie: Ein Kapital von ${kapital} € wird zu ${zins}% pro Jahr angelegt.`,
            question: `Berechne die Zinsen nach ${monate} Monaten (einfache Verzinsung) in €.`,
            sol: round2(kapital * zins/100 * monate/12),
            steps: generateSteps("zins_zeit", {kapital, zins, monate}, round2(kapital * zins/100 * monate/12)),
            category: "prozent_modellierung",
            params: {kapital, zins, monate}
          };
        }
        case "rabatt_prozentsatz": {
          const alt = rand(20, 100);
          const neu = alt - rand(5, 30);
          return {
            text: `${op} Sie: Ein Produkt kostete ursprünglich ${alt} € und wird jetzt für ${neu} € angeboten.`,
            question: `Berechne den Rabatt in Prozent.`,
            sol: round2((alt - neu) / alt * 100),
            steps: generateSteps("prozent_rabatt_prozentsatz", {alt, neu}, round2((alt - neu) / alt * 100)),
            category: "prozent_modellierung",
            params: {alt, neu}
          };
        }
        case "zins_zinssatz": {
          const kapital = rand(1000, 5000);
          const zinsen = rand(50, 300);
          return {
            text: `${op} Sie: Ein Kredit von ${kapital} € kostet nach einem Jahr ${zinsen} € Zinsen.`,
            question: `Berechne den Zinssatz in Prozent.`,
            sol: round2(zinsen / kapital * 100),
            steps: generateSteps("zins_zinssatz", {kapital, zinsen}, round2(zinsen / kapital * 100)),
            category: "prozent_modellierung",
            params: {kapital, zinsen}
          };
        }
      }
    },

    // ---------- ZUORDNUNGEN (PROPORTIONAL/ANTIPROPORTIONAL) ----------
    zuordnung_transfer: () => {
      const typen = ["proportional_verbrauch", "proportional_brötchen", "proportional_zeit", "antiproportional_arbeiter", "antiproportional_futter", "proportional_maschinen", "antiproportional_zeit"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "ERMITTLE", "WEISE_NACH"]));
      
      switch(typ) {
        case "proportional_verbrauch": {
          const verbrauch = rand(5, 10);
          const strecke1 = 100;
          const tank = rand(40, 70);
          return {
            text: `${op} Sie: Ein Auto verbraucht auf ${strecke1} km genau ${verbrauch} Liter Benzin.`,
            question: `Berechne die Reichweite in km, wenn der Tank ${tank} Liter fasst. (proportionale Zuordnung)`,
            sol: round2(tank / (verbrauch / strecke1)),
            steps: generateSteps("zuordnung_proportional_verbrauch", {verbrauch, strecke1, tank}, round2(tank / (verbrauch / strecke1))),
            category: "zuordnung_transfer",
            params: {verbrauch, strecke1, tank}
          };
        }
        case "proportional_brötchen": {
          const anzahl1 = rand(3, 8);
          const preis = rand(2, 10) * 0.5;
          const anzahl2 = rand(5, 15);
          return {
            text: `${op} Sie: ${anzahl1} Brötchen kosten ${preis.toFixed(2)} €.`,
            question: `Berechne den Preis für ${anzahl2} Brötchen (gleicher Preis pro Brötchen) in €.`,
            sol: round2(preis / anzahl1 * anzahl2),
            steps: generateSteps("zuordnung_proportional_brötchen", {anzahl1, preis, anzahl2}, round2(preis / anzahl1 * anzahl2)),
            category: "zuordnung_transfer",
            params: {anzahl1, preis, anzahl2}
          };
        }
        case "proportional_zeit": {
          const preis = rand(3, 8);
          const stunden = rand(2, 6) + (rand(0,1) ? 0.5 : 0);
          return {
            text: `${op} Sie: Im Kletterpark kostet der Eintritt ${preis} € pro Stunde.`,
            question: `Berechne den Preis für ${stunden} Stunden in €.`,
            sol: preis * stunden,
            steps: generateSteps("zuordnung_proportional_zeit", {preis, stunden}, preis * stunden),
            category: "zuordnung_transfer",
            params: {preis, stunden}
          };
        }
        case "antiproportional_arbeiter": {
          const anz1 = rand(2, 5);
          const stunden1 = rand(8, 20);
          const anz2 = anz1 + rand(1, 4);
          return {
            text: `${op} Sie: ${anz1} Arbeiter benötigen für einen Auftrag ${stunden1} Stunden.`,
            question: `Berechne, wie viele Stunden ${anz2} Arbeiter bei gleicher Leistung für denselben Auftrag benötigen (antiproportionale Zuordnung).`,
            sol: round2(anz1 * stunden1 / anz2),
            steps: generateSteps("zuordnung_antiproportional_arbeiter", {anz1, stunden1, anz2}, round2(anz1 * stunden1 / anz2)),
            category: "zuordnung_transfer",
            params: {anz1, stunden1, anz2}
          };
        }
        case "antiproportional_futter": {
          const tiere1 = rand(10, 30);
          const tage1 = rand(20, 50);
          const reduzierteTiere = rand(2, 8);
          const tiere2 = tiere1 - reduzierteTiere;
          return {
            text: `${op} Sie: Ein Futtervorrat reicht für ${tiere1} Pferde genau ${tage1} Tage.`,
            question: `Berechne, wie viele Tage der Vorrat reicht, wenn ${reduzierteTiere} Pferde verkauft werden (antiproportionale Zuordnung).`,
            sol: round2(tiere1 * tage1 / tiere2),
            steps: generateSteps("zuordnung_antiproportional_futter", {tiere1, tage1, tiere2}, round2(tiere1 * tage1 / tiere2)),
            category: "zuordnung_transfer",
            params: {tiere1, tage1, tiere2}
          };
        }
        case "proportional_maschinen": {
          const maschinen1 = rand(3, 7);
          const teile = rand(100, 500);
          const maschinen2 = rand(4, 10);
          return {
            text: `${op} Sie: ${maschinen1} Maschinen stellen in einer Stunde ${teile} Bauteile her.`,
            question: `Berechne, wie viele Bauteile ${maschinen2} Maschinen in der gleichen Zeit herstellen (proportionale Zuordnung).`,
            sol: round2(teile / maschinen1 * maschinen2),
            steps: generateSteps("zuordnung_proportional_maschinen", {maschinen1, teile, maschinen2}, round2(teile / maschinen1 * maschinen2)),
            category: "zuordnung_transfer",
            params: {maschinen1, teile, maschinen2}
          };
        }
        case "antiproportional_zeit": {
          const maschinen1 = rand(2, 5);
          const stunden1 = rand(6, 15);
          const maschinen2 = maschinen1 + rand(1, 3);
          return {
            text: `${op} Sie: ${maschinen1} Maschinen benötigen für einen Auftrag ${stunden1} Stunden.`,
            question: `Berechne, wie viele Stunden ${maschinen2} Maschinen für denselben Auftrag benötigen (antiproportionale Zuordnung).`,
            sol: round2(maschinen1 * stunden1 / maschinen2),
            steps: generateSteps("zuordnung_antiproportional_arbeiter", {anz1: maschinen1, stunden1, anz2: maschinen2}, round2(maschinen1 * stunden1 / maschinen2)),
            category: "zuordnung_transfer",
            params: {maschinen1, stunden1, maschinen2}
          };
        }
      }
    },

    // ---------- PYTHAGORAS (SACHKONTEXT) ----------
    pythagoras_sachkontext: () => {
      const typen = ["schirm", "rechtwinklig_pruefen", "nicht_rechtwinklig", "sendemast", "leiter", "diagonale", "drachen"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "ENTSCHEIDE_BEGRUENDE", "UEBERPRUEFE", "ERMITTLE"]));
      
      switch(typ) {
        case "schirm": {
          const l = rand(50, 80);
          const b = rand(30, 60);
          const d = Math.sqrt(l*l + b*b);
          const schirm = rand(65, 85);
          return {
            text: `${op} Sie: Ein Regenschirm ist ${schirm} cm lang. Ein Koffer ist innen ${l} cm lang und ${b} cm breit.`,
            question: `Kann der Schirm diagonal im Koffer verstaut werden? Berechne die Länge der Diagonale des Koffers und vergleiche mit der Schirmlänge. Begründe deine Antwort.`,
            sol: d > schirm ? "Ja" : "Nein",
            fullSolution: d > schirm ? "Ja, die Diagonale ist größer." : "Nein, die Diagonale ist kleiner.",
            steps: generateSteps("pythagoras_schirm", {l, b, d, schirm}, d > schirm ? "Ja" : "Nein"),
            category: "pythagoras_sachkontext",
            params: {l, b, d, schirm}
          };
        }
        case "rechtwinklig_pruefen": {
          let a, b, c;
          do {
            a = rand(3, 15);
            b = rand(3, 15);
            c = rand(3, 20);
          } while (Math.abs(a*a + b*b - c*c) < 0.1 || Math.abs(a*a + c*c - b*b) < 0.1 || Math.abs(b*b + c*c - a*a) < 0.1);
          
          // Für eine rechtwinklige Aufgabe erzwingen wir ein Tripel
          const tripel = [
            [3,4,5], [5,12,13], [6,8,10], [7,24,25], [8,15,17], [9,12,15], [9,40,41]
          ];
          const gewaehlt = pickFrom(tripel);
          a = gewaehlt[0];
          b = gewaehlt[1];
          c = gewaehlt[2];
          
          return {
            text: `${op} Sie: Ein Dreieck hat die Seitenlängen ${a} cm, ${b} cm und ${c} cm.`,
            question: `Überprüfe mit dem Satz des Pythagoras, ob das Dreieck rechtwinklig ist.`,
            sol: "Ja",
            steps: generateSteps("pythagoras_rechtwinklig_pruefen", {a, b, c, isRight: true}, "Ja"),
            category: "pythagoras_sachkontext",
            params: {a, b, c, isRight: true}
          };
        }
        case "nicht_rechtwinklig": {
          let a, b, c;
          do {
            a = rand(3, 12);
            b = rand(3, 12);
            c = rand(3, 15);
          } while (Math.abs(a*a + b*b - c*c) < 1 && Math.abs(a*a + c*c - b*b) < 1 && Math.abs(b*b + c*c - a*a) < 1);
          
          return {
            text: `${op} Sie: Ein Dreieck hat die Seitenlängen ${a} cm, ${b} cm und ${c} cm.`,
            question: `Überprüfe mit dem Satz des Pythagoras, ob das Dreieck rechtwinklig ist.`,
            sol: "Nein",
            steps: generateSteps("pythagoras_rechtwinklig_pruefen", {a, b, c, isRight: false}, "Nein"),
            category: "pythagoras_sachkontext",
            params: {a, b, c, isRight: false}
          };
        }
        case "sendemast": {
          const h = rand(20, 40);
          const a = rand(5, 15);
          const s = Math.sqrt(h*h + a*a);
          return {
            text: `${op} Sie: Ein Sendemast ist ${h} m hoch. Er wird mit vier Seilen abgespannt, die jeweils im Abstand von ${a} m vom Mastfuß am Boden verankert werden.`,
            question: `Berechne die Länge eines Seils in m und daraus die Gesamtlänge aller vier Seile (ohne Verschnitt).`,
            sol: round2(4 * s),
            steps: generateSteps("pythagoras_sendemast", {h, a, s}, round2(4 * s)),
            category: "pythagoras_sachkontext",
            params: {h, a, s}
          };
        }
        case "leiter": {
          const l = rand(4, 8);
          const a = rand(1, 3) + (rand(0,1) ? 0.5 : 0);
          const h = Math.sqrt(l*l - a*a);
          return {
            text: `${op} Sie: Eine ${l} m lange Leiter wird an eine Hauswand gelehnt. Der Fuß der Leiter steht ${a.toFixed(2)} m von der Wand entfernt.`,
            question: `Berechne die Höhe in m, in der die Leiter die Wand berührt (Runde auf zwei Dezimalstellen).`,
            sol: round2(h),
            steps: generateSteps("pythagoras_leiter", {l, a, h}, round2(h)),
            category: "pythagoras_sachkontext",
            params: {l, a, h}
          };
        }
        case "diagonale": {
          const l = rand(40, 100);
          const b = rand(20, 60);
          const d = Math.sqrt(l*l + b*b);
          return {
            text: `${op} Sie: Ein Bildschirm ist ${l} cm breit und ${b} cm hoch.`,
            question: `Berechne die Länge der Bildschirmdiagonale in cm.`,
            sol: round2(d),
            steps: generateSteps("pythagoras_diagonale", {l, b, d}, round2(d)),
            category: "pythagoras_sachkontext",
            params: {l, b, d}
          };
        }
        case "drachen": {
          const l = rand(80, 150);
          const a = rand(40, 100);
          const h = Math.sqrt(l*l - a*a);
          return {
            text: `${op} Sie: Ein Drachen wird mit einer ${l} m langen Schnur gehalten. Eine Person steht genau ${a} m von der Stelle entfernt, über der der Drachen senkrecht ist.`,
            question: `Berechne die Flughöhe des Drachens in m.`,
            sol: round2(h),
            steps: generateSteps("pythagoras_drachen", {l, a, h}, round2(h)),
            category: "pythagoras_sachkontext",
            params: {l, a, h}
          };
        }
      }
    },

    // ---------- KÖRPERBERECHNUNG (VOLUMEN/OBERFLÄCHE) ----------
    koerper_mehrschritt: () => {
      const typen = ["zylinder_kosten", "zylinder_volumen_liter", "quader_liter", "prisma_zelt", "zusammengesetzt_quader_wuerfel", "zusammengesetzt_quader_prisma", "zylinder_mantel", "wuerfel_kante_oberflaeche", "quader_netz", "zylinder_volumen_liter_gross"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "ERMITTLE"]));
      
      switch(typ) {
        case "zylinder_kosten": {
          const r = rand(3, 10);
          const h = rand(10, 30);
          const preisProLiter = rand(5, 15);
          const volumen = 3.14 * r * r * h;
          const kosten = volumen / 1000 * preisProLiter;
          return {
            text: `${op} Sie: Eine zylinderförmige Kerze hat einen Radius von ${r} cm und eine Höhe von ${h} cm. 1 Liter Wachs kostet ${preisProLiter} €.`,
            question: `Berechne das Volumen der Kerze in cm³ und Liter sowie die Materialkosten in €.`,
            sol: round2(kosten),
            fullSolution: `Volumen: ${round2(volumen)} cm³ (${round2(volumen/1000)} L), Kosten: ${round2(kosten)} €`,
            steps: generateSteps("koerper_zylinder_kosten", {r, h, preisProLiter}, round2(kosten)),
            category: "koerper_mehrschritt",
            params: {r, h, preisProLiter, volumen, kosten}
          };
        }
        case "zylinder_volumen_liter": {
          const d = rand(4, 12);
          const h = rand(8, 20);
          const r = d/2;
          const volumen = 3.14 * r * r * h;
          return {
            text: `${op} Sie: Ein zylindrisches Glas hat einen Durchmesser von ${d} cm und eine Höhe von ${h} cm.`,
            question: `Berechne das Volumen in Litern (1 Liter = 1000 cm³).`,
            sol: round2(volumen / 1000),
            steps: generateSteps("koerper_zylinder_volumen_liter", {d, r, h}, round2(volumen / 1000)),
            category: "koerper_mehrschritt",
            params: {d, r, h, volumen}
          };
        }
        case "quader_liter": {
          const l = rand(40, 120);
          const b = rand(20, 80);
          const h = rand(30, 100);
          return {
            text: `${op} Sie: Ein Aquarium ist ${l} cm lang, ${b} cm breit und ${h} cm hoch.`,
            question: `Berechne das Volumen des Aquariums in Litern (1 Liter = 1000 cm³).`,
            sol: l * b * h / 1000,
            steps: generateSteps("koerper_quader_liter", {l, b, h}, l * b * h / 1000),
            category: "koerper_mehrschritt",
            params: {l, b, h}
          };
        }
        case "prisma_zelt": {
          const g = rand(2, 5);
          const h = rand(1, 4);
          const l = rand(3, 8);
          return {
            text: `${op} Sie: Ein Zelt hat die Form eines Dreiecksprismas. Die dreieckige Grundfläche hat eine Grundseite von ${g} m und eine Höhe von ${h} m. Das Zelt ist ${l} m lang.`,
            question: `Berechne das Volumen des Zeltes in m³.`,
            sol: g * h / 2 * l,
            steps: generateSteps("koerper_prisma_zelt", {g, h, l}, g * h / 2 * l),
            category: "koerper_mehrschritt",
            params: {g, h, l}
          };
        }
        case "zusammengesetzt_quader_wuerfel": {
          const l = rand(3, 10);
          const b = rand(2, 8);
          const h1 = rand(2, 7);
          const a = rand(1, 4);
          return {
            text: `${op} Sie: Ein Werkstück besteht aus einem Quader (${l} cm × ${b} cm × ${h1} cm) und einem aufgesetzten Würfel mit Kantenlänge ${a} cm.`,
            question: `Berechne das Gesamtvolumen des Werkstücks in cm³.`,
            sol: l * b * h1 + a * a * a,
            steps: generateSteps("koerper_zusammengesetzt_quader_wuerfel", {l, b, h1, a}, l * b * h1 + a * a * a),
            category: "koerper_mehrschritt",
            params: {l, b, h1, a}
          };
        }
        case "zusammengesetzt_quader_prisma": {
          const l = rand(30, 60);
          const b = rand(15, 40);
          const h1 = rand(8, 20);
          const h2 = rand(20, 50);
          return {
            text: `${op} Sie: Ein Werkstück besteht aus einem Quader (${l} mm × ${b} mm × ${h1} mm) und einem aufgesetzten Dreiecksprisma. Das Dreieck hat die Grundseite ${l} mm und die Höhe ${h2} mm, die Tiefe des Prismas beträgt ${b} mm.`,
            question: `Berechne das Gesamtvolumen in mm³.`,
            sol: l * b * h1 + l * h2 / 2 * b,
            steps: generateSteps("koerper_zusammengesetzt_quader_prisma", {l, b, h1, h2}, l * b * h1 + l * h2 / 2 * b),
            category: "koerper_mehrschritt",
            params: {l, b, h1, h2}
          };
        }
        case "zylinder_mantel": {
          const d = rand(6, 16);
          const r = d/2;
          const h = rand(8, 20);
          return {
            text: `${op} Sie: Eine Konservendose hat einen Durchmesser von ${d} cm und eine Höhe von ${h} cm.`,
            question: `Berechne die Mantelfläche der Dose in cm² (das ist die Fläche für das Etikett).`,
            sol: round2(2 * 3.14 * r * h),
            steps: generateSteps("koerper_zylinder_mantel", {r, h}, round2(2 * 3.14 * r * h)),
            category: "koerper_mehrschritt",
            params: {d, r, h}
          };
        }
        case "wuerfel_kante_oberflaeche": {
          const volumen = rand(27, 343);
          const a = Math.round(Math.pow(volumen, 1/3));
          return {
            text: `${op} Sie: Ein Würfel hat ein Volumen von ${a*a*a} cm³.`,
            question: `Ermittle die Kantenlänge a in cm und die Oberfläche des Würfels in cm².`,
            sol: a,
            fullSolution: `a = ${a} cm, O = ${6 * a * a} cm²`,
            steps: generateSteps("koerper_wuerfel_kante_oberflaeche", {volumen: a*a*a, a}, a),
            category: "koerper_mehrschritt",
            params: {a}
          };
        }
        case "quader_netz": {
          const l = rand(2, 8);
          const b = rand(2, 8);
          const h = rand(2, 8);
          return {
            text: `${op} Sie: Ein Quadernetz hat die Maße: Länge ${l} cm, Breite ${b} cm, Höhe ${h} cm.`,
            question: `Berechne das Volumen in cm³ und die Oberfläche in cm² des Quaders.`,
            sol: l * b * h,
            fullSolution: `V = ${l * b * h} cm³, O = ${2 * (l*b + l*h + b*h)} cm²`,
            steps: generateSteps("koerper_quader_netz", {l, b, h}, l * b * h),
            category: "koerper_mehrschritt",
            params: {l, b, h}
          };
        }
        case "zylinder_volumen_liter_gross": {
          const d = rand(50, 100);
          const r = d/2;
          const h = rand(80, 150);
          return {
            text: `${op} Sie: Eine zylindrische Regentonne hat einen Durchmesser von ${d} cm und eine Höhe von ${h} cm.`,
            question: `Berechne das Volumen der Regentonne in Litern (1 Liter = 1000 cm³).`,
            sol: round2(3.14 * r * r * h / 1000),
            steps: generateSteps("koerper_zylinder_volumen_liter_gross", {d, r, h}, round2(3.14 * r * r * h / 1000)),
            category: "koerper_mehrschritt",
            params: {d, r, h}
          };
        }
      }
    },

    // ---------- STATISTIK (MITTELWERT, MEDIAN, SPANNWEITE, GEWICHTUNG) ----------
    statistik_begruendung: () => {
      const typen = ["mittelwert", "mittelwert_zahlen", "gewichteter_durchschnitt", "fehlender_wert", "fehlender_wert_schnitzel", "median_spannweite", "min_max", "durchschnittsgeschwindigkeit", "prozentanteil"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "ERMITTLE"]));
      
      switch(typ) {
        case "mittelwert": {
          const noten = [rand(1,6), rand(1,6), rand(1,6), rand(1,6)];
          const summe = noten.reduce((a,b) => a+b, 0);
          return {
            text: `${op} Sie: Ein Schüler hat in vier Arbeiten die Noten: ${noten.join(', ')}.`,
            question: `Berechne den Notendurchschnitt (arithmetisches Mittel).`,
            sol: round2(summe / 4),
            steps: generateSteps("statistik_mittelwert", {zahlen: noten, summe, anzahl: 4}, round2(summe / 4)),
            category: "statistik_begruendung",
            params: {noten}
          };
        }
        case "mittelwert_zahlen": {
          const zahlen = [];
          for (let i = 0; i < 5; i++) zahlen.push(rand(10, 100));
          const summe = zahlen.reduce((a,b) => a+b, 0);
          return {
            text: `${op} Sie: In einer Tabelle sind die täglichen Verkaufszahlen von Montag bis Freitag: ${zahlen.join(', ')}.`,
            question: `Ermittle den durchschnittlichen Verkauf pro Tag.`,
            sol: round2(summe / 5),
            steps: generateSteps("statistik_mittelwert", {zahlen, summe, anzahl: 5}, round2(summe / 5)),
            category: "statistik_begruendung",
            params: {zahlen}
          };
        }
        case "gewichteter_durchschnitt": {
          const noteA = rand(2, 5) + (rand(0,1) ? 0.5 : 0);
          const noteS = rand(1, 4) + (rand(0,1) ? 0.5 : 0);
          const gewichtA = 0.6;
          const gewichtS = 0.4;
          return {
            text: `${op} Sie: In einem Fach zählen Klassenarbeiten 60% und sonstige Leistungen 40%. Ein Schüler hat in den Arbeiten einen Durchschnitt von ${noteA.toFixed(1)} und bei den sonstigen Leistungen einen Durchschnitt von ${noteS.toFixed(1)}.`,
            question: `Berechne die gewichtete Gesamtnote.`,
            sol: round2(noteA * gewichtA + noteS * gewichtS),
            steps: generateSteps("statistik_gewichteter_durchschnitt", {noteA, noteS, gewichtA, gewichtS}, round2(noteA * gewichtA + noteS * gewichtS)),
            category: "statistik_begruendung",
            params: {noteA, noteS, gewichtA, gewichtS}
          };
        }
        case "fehlender_wert": {
          const bekannte = [rand(5,15), rand(5,15), rand(5,15), rand(5,15)];
          const summeBekannt = bekannte.reduce((a,b) => a+b, 0);
          const durchschnitt = rand(10, 20);
          return {
            text: `${op} Sie: Der Durchschnitt von fünf Zahlen ist genau ${durchschnitt}. Vier der Zahlen sind bekannt: ${bekannte.join(', ')}.`,
            question: `Berechne die fünfte Zahl.`,
            sol: 5 * durchschnitt - summeBekannt,
            steps: generateSteps("statistik_fehlender_wert", {bekannte, summeBekannt, anzahl: 5, durchschnitt}, 5 * durchschnitt - summeBekannt),
            category: "statistik_begruendung",
            params: {bekannte, summeBekannt, durchschnitt}
          };
        }
        case "fehlender_wert_schnitzel": {
          const mo_sa = [rand(20,70), rand(20,70), rand(20,70), rand(20,70), rand(20,70), rand(20,70)];
          const summeMoSa = mo_sa.reduce((a,b) => a+b, 0);
          const durchschnitt = rand(30, 50);
          return {
            text: `${op} Sie: Ein Koch verkauft von Montag bis Samstag folgende Anzahl Schnitzel: ${mo_sa.join(', ')}. Der durchschnittliche Verkauf von Montag bis Sonntag beträgt ${durchschnitt} Schnitzel pro Tag.`,
            question: `Berechne, wie viele Schnitzel am Sonntag verkauft wurden.`,
            sol: 7 * durchschnitt - summeMoSa,
            steps: generateSteps("statistik_fehlender_wert", {bekannte: mo_sa, summeBekannt: summeMoSa, anzahl: 7, durchschnitt}, 7 * durchschnitt - summeMoSa),
            category: "statistik_begruendung",
            params: {mo_sa, summeMoSa, durchschnitt}
          };
        }
        case "median_spannweite": {
          const daten = [];
          for (let i = 0; i < 5; i++) daten.push(rand(150, 180));
          const sortiert = [...daten].sort((a,b) => a-b);
          return {
            text: `${op} Sie: Die Körpergrößen einer Kleingruppe sind (in cm): ${daten.join(', ')}.`,
            question: `Ermittle den Median (Zentralwert) und die Spannweite dieser Daten.`,
            sol: sortiert[2],
            fullSolution: `Median: ${sortiert[2]} cm, Spannweite: ${sortiert[4] - sortiert[0]} cm`,
            steps: generateSteps("statistik_median_spannweite", {sortiert, median: sortiert[2], min: sortiert[0], max: sortiert[4]}, sortiert[2]),
            category: "statistik_begruendung",
            params: {daten, sortiert}
          };
        }
        case "min_max": {
          const daten = [];
          for (let i = 0; i < 4; i++) daten.push(rand(350, 450) / 100);
          const min = Math.min(...daten);
          const max = Math.max(...daten);
          return {
            text: `${op} Sie: Die Weitsprung-Ergebnisse von vier Schüler:innen sind: ${daten.map(d => d.toFixed(2)).join(' m, ')} m.`,
            question: `Gib das Minimum, das Maximum und die Spannweite an (alle in Metern).`,
            sol: min,
            fullSolution: `Min: ${min.toFixed(2)} m, Max: ${max.toFixed(2)} m, Spannweite: ${(max - min).toFixed(2)} m`,
            steps: generateSteps("statistik_min_max", {min, max}, min),
            category: "statistik_begruendung",
            params: {daten, min, max}
          };
        }
        case "durchschnittsgeschwindigkeit": {
          const strecke1 = rand(50, 150);
          const zeit1 = rand(30, 90);
          const strecke2 = rand(50, 150);
          const zeit2 = rand(30, 90);
          return {
            text: `${op} Sie: Ein Zug fährt von Stadt A nach Stadt B (${strecke1} km in ${zeit1} Minuten) und von Stadt B nach Stadt C (${strecke2} km in ${zeit2} Minuten).`,
            question: `Berechne die Durchschnittsgeschwindigkeit für die gesamte Strecke von A nach C in km/h.`,
            sol: round2((strecke1 + strecke2) / ((zeit1 + zeit2) / 60)),
            steps: generateSteps("statistik_durchschnittsgeschwindigkeit", {strecke1, zeit1, strecke2, zeit2}, round2((strecke1 + strecke2) / ((zeit1 + zeit2) / 60))),
            category: "statistik_begruendung",
            params: {strecke1, zeit1, strecke2, zeit2}
          };
        }
        case "prozentanteil": {
          const gesamt = rand(100, 500);
          const prozent = rand(10, 40);
          return {
            text: `${op} Sie: Von ${gesamt} Mitarbeiter:innen bringen ${prozent}% ihr eigenes Lunchpaket mit.`,
            question: `Berechne, wie viele Mitarbeiter:innen das sind.`,
            sol: round2(gesamt * prozent / 100),
            steps: generateSteps("statistik_prozentanteil", {gesamt, prozent}, round2(gesamt * prozent / 100)),
            category: "statistik_begruendung",
            params: {gesamt, prozent}
          };
        }
      }
    },

    // ---------- LINEARE GLEICHUNGEN (MODELLIERUNG) ----------
    gleichungen_modellierung: () => {
      const typen = ["altersraetsel", "tarif", "tarif_entscheidung", "zahlenraetsel", "summe", "umfang"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["STELLE_GLEICHUNG", "BERECHNE", "ENTSCHEIDE_BEGRUENDE"]));
      
      switch(typ) {
        case "altersraetsel": {
          const vater = rand(30, 50);
          const sohn = rand(5, 15);
          const faktor = rand(2, 4);
          // Berechne x: vater + x = faktor * (sohn + x)
          // vater + x = faktor*sohn + faktor*x
          // vater - faktor*sohn = faktor*x - x = (faktor-1)*x
          // x = (vater - faktor*sohn) / (faktor-1)
          const x = (vater - faktor * sohn) / (faktor - 1);
          if (x < 0 || x > 50) return this.gleichungen_modellierung(); // Neustart bei ungültigem Ergebnis
          
          return {
            text: `${op} Sie: Ein Vater ist heute ${vater} Jahre alt, sein Sohn ist ${sohn} Jahre alt.`,
            question: `In wie vielen Jahren wird der Vater genau ${faktor}‑mal so alt sein wie sein Sohn? Stelle eine Gleichung auf und löse sie.`,
            sol: round2(x),
            steps: generateSteps("gleichung_altersraetsel", {vater, sohn, faktor}, round2(x)),
            category: "gleichungen_modellierung",
            params: {vater, sohn, faktor, x}
          };
        }
        case "tarif": {
          const grund1 = rand(3, 8);
          const preis1 = rand(5, 15) / 100;
          const grund2 = rand(8, 15);
          const preis2 = rand(3, 8) / 100;
          const x = (grund2 - grund1) / (preis1 - preis2);
          if (x < 0 || x > 500) return this.gleichungen_modellierung();
          
          return {
            text: `${op} Sie: Zwei Tarife für Mobilfunk: Tarif A: ${grund1} € Grundgebühr + ${(preis1*100).toFixed(0)} Cent pro Minute. Tarif B: ${grund2} € Grundgebühr + ${(preis2*100).toFixed(0)} Cent pro Minute.`,
            question: `Ab wie vielen Gesprächsminuten pro Monat ist Tarif B günstiger? Stelle eine Gleichung auf und löse sie.`,
            sol: Math.floor(x) + 1,
            steps: generateSteps("gleichung_tarif", {grund1, preis1, grund2, preis2}, Math.floor(x) + 1),
            category: "gleichungen_modellierung",
            params: {grund1, preis1, grund2, preis2, x}
          };
        }
        case "tarif_entscheidung": {
          const grund1 = rand(5, 15);
          const preis1SMS = rand(5, 15) / 100;
          const preis1Tel = rand(5, 15) / 100;
          const grund2 = rand(3, 10);
          const preis2SMS = rand(5, 15) / 100;
          const preis2Tel = rand(5, 15) / 100;
          const sms = rand(50, 200);
          const tel = rand(50, 200);
          const kosten1 = grund1 + preis1SMS * sms + preis1Tel * tel;
          const kosten2 = grund2 + preis2SMS * sms + preis2Tel * tel;
          
          return {
            text: `${op} Sie: Zwei Anbieter: Anbieter 1 verlangt ${grund1} € Grundgebühr, SMS kosten ${(preis1SMS*100).toFixed(0)} Cent, Telefonate ${(preis1Tel*100).toFixed(0)} Cent pro Minute. Anbieter 2 verlangt ${grund2} € Grundgebühr, SMS kosten ${(preis2SMS*100).toFixed(0)} Cent, Telefonate ${(preis2Tel*100).toFixed(0)} Cent pro Minute.`,
            question: `Tom schreibt ${sms} SMS und telefoniert ${tel} Minuten pro Monat. Berechne die monatlichen Kosten für beide Anbieter und entscheide, welcher Anbieter günstiger ist.`,
            sol: kosten1 < kosten2 ? "Anbieter 1" : "Anbieter 2",
            steps: generateSteps("gleichung_tarif_entscheidung", {grund1, preis1SMS, preis1Tel, grund2, preis2SMS, preis2Tel, sms, tel, kosten1, kosten2}, kosten1 < kosten2 ? "Anbieter 1" : "Anbieter 2"),
            category: "gleichungen_modellierung",
            params: {grund1, preis1SMS, preis1Tel, grund2, preis2SMS, preis2Tel, sms, tel, kosten1, kosten2}
          };
        }
        case "zahlenraetsel": {
          return {
            text: `${op} Sie: Das Dreifache einer Zahl, vermehrt um 15, ergibt das Fünffache der Zahl, vermindert um 7.`,
            question: `Bestimme die Zahl, indem du eine Gleichung aufstellst und löst.`,
            sol: 11,
            steps: generateSteps("gleichung_zahlenraetsel", {}, 11),
            category: "gleichungen_modellierung",
            params: {}
          };
        }
        case "summe": {
          const summe = rand(30, 90);
          return {
            text: `${op} Sie: Zwei Zahlen haben die Summe ${summe}. Die eine Zahl ist doppelt so groß wie die andere.`,
            question: `Bestimme die beiden Zahlen durch Aufstellen einer Gleichung.`,
            sol: summe / 3,
            fullSolution: `${summe/3} und ${2*summe/3}`,
            steps: generateSteps("gleichung_summe", {summe}, summe/3),
            category: "gleichungen_modellierung",
            params: {summe}
          };
        }
        case "umfang": {
          const a = rand(3, 15);
          const umfang = 8*a + 4;
          return {
            text: `${op} Sie: Eine Figur hat den Umfang ${umfang} cm. Die Seitenlängen sind: 2a, 3a+4, 1,5a, 1,5a (alle in cm).`,
            question: `Stelle eine Gleichung auf und berechne den Wert von a.`,
            sol: a,
            steps: generateSteps("gleichung_umfang", {umfang}, a),
            category: "gleichungen_modellierung",
            params: {umfang, a}
          };
        }
      }
    },

    // ---------- FLÄCHENBERECHNUNG (2D) ----------
    flaeche2d_modellierung: () => {
      const typen = ["rechteck", "rechteck_umfang", "dreieck", "lform", "rechteck_aus_quadraten", "kreis", "trapez"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "ERMITTLE"]));
      
      switch(typ) {
        case "rechteck": {
          const l = rand(10, 40);
          const b = rand(5, 30);
          return {
            text: `${op} Sie: Ein rechteckiges Grundstück ist ${l} m lang und ${b} m breit.`,
            question: `Berechne die Fläche des Grundstücks in m².`,
            sol: l * b,
            steps: generateSteps("flaeche_rechteck", {l, b}, l * b),
            category: "flaeche2d_modellierung",
            params: {l, b}
          };
        }
        case "rechteck_umfang": {
          const l = rand(3, 10);
          const b = rand(0.5, 3) * 2;
          return {
            text: `${op} Sie: Ein Rechteck ist ${l} m lang und ${b.toFixed(1)} m breit.`,
            question: `Berechne den Umfang in m und den Flächeninhalt in m².`,
            sol: 2 * (l + b),
            fullSolution: `U = ${2*(l+b)} m, A = ${l*b} m²`,
            steps: generateSteps("flaeche_rechteck_umfang", {l, b}, 2 * (l + b)),
            category: "flaeche2d_modellierung",
            params: {l, b}
          };
        }
        case "dreieck": {
          const g = rand(5, 20);
          const h = rand(4, 15);
          return {
            text: `${op} Sie: Ein Dreieck hat eine Grundseite von ${g} cm und eine zugehörige Höhe von ${h} cm.`,
            question: `Berechne den Flächeninhalt des Dreiecks in cm².`,
            sol: g * h / 2,
            steps: generateSteps("flaeche_dreieck", {g, h}, g * h / 2),
            category: "flaeche2d_modellierung",
            params: {g, h}
          };
        }
        case "lform": {
          const l1 = rand(4, 10);
          const b1 = rand(3, 8);
          const l2 = rand(2, 6);
          const b2 = rand(2, 5);
          return {
            text: `${op} Sie: Ein L‑förmiger Raum besteht aus zwei aneinanderstoßenden Rechtecken: Rechteck 1 hat die Maße ${l1} m × ${b1} m, Rechteck 2 hat die Maße ${l2} m × ${b2} m.`,
            question: `Berechne die Gesamtfläche des Raumes in m².`,
            sol: l1 * b1 + l2 * b2,
            steps: generateSteps("flaeche_lform", {l1, b1, l2, b2}, l1 * b1 + l2 * b2),
            category: "flaeche2d_modellierung",
            params: {l1, b1, l2, b2}
          };
        }
        case "rechteck_aus_quadraten": {
          const quadratFlaeche = rand(9, 25);
          const seite = Math.sqrt(quadratFlaeche);
          const anzahlBreit = rand(2, 4);
          const anzahlHoch = rand(2, 3);
          return {
            text: `${op} Sie: Ein Rechteck wird aus ${anzahlBreit * anzahlHoch} gleich großen Quadraten zusammengesetzt. Jedes Quadrat hat einen Flächeninhalt von ${quadratFlaeche} cm².`,
            question: `Berechne den Umfang des Rechtecks in cm.`,
            sol: 2 * (anzahlBreit * seite + anzahlHoch * seite),
            steps: generateSteps("flaeche_rechteck_aus_quadraten", {quadratFlaeche, seite, anzahlBreit, anzahlHoch}, 2 * (anzahlBreit * seite + anzahlHoch * seite)),
            category: "flaeche2d_modellierung",
            params: {quadratFlaeche, seite, anzahlBreit, anzahlHoch}
          };
        }
        case "kreis": {
          const r = rand(2, 8);
          return {
            text: `${op} Sie: Ein kreisförmiges Blumenbeet hat einen Radius von ${r} m.`,
            question: `Berechne die Fläche des Beetes in m² (verwende π = 3,14).`,
            sol: round2(3.14 * r * r),
            steps: generateSteps("flaeche_kreis", {r}, round2(3.14 * r * r)),
            category: "flaeche2d_modellierung",
            params: {r}
          };
        }
        case "trapez": {
          const a = rand(100, 250);
          const c = rand(80, 200);
          const h = rand(50, 200);
          return {
            text: `${op} Sie: Ein trapezförmiges Grundstück hat die parallelen Seiten a = ${a} m und c = ${c} m. Die Höhe (Abstand der parallelen Seiten) beträgt ${h} m.`,
            question: `Berechne die Fläche des Grundstücks in m².`,
            sol: (a + c) * h / 2,
            steps: generateSteps("flaeche_trapez", {a, c, h}, (a + c) * h / 2),
            category: "flaeche2d_modellierung",
            params: {a, c, h}
          };
        }
      }
    },

    // ---------- WAHRSCHEINLICHKEIT (MEHRSTUFIG) ----------
    wahrscheinlichkeit_mehrstufig: () => {
      const typen = ["einfach", "gluecksrad", "mindestens_einmal", "ohne_zuruecklegen", "ohne_zuruecklegen_kaugummi", "wuerfel_zweimal", "wuerfel_spezial"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      switch(typ) {
        case "einfach": {
          const rot = rand(2, 6);
          const blau = rand(1, 4);
          const gruen = rand(1, 3);
          const gesamt = rot + blau + gruen;
          return {
            text: `${op} Sie: In einer Lostrommel sind ${rot} rote, ${blau} blaue und ${gruen} grüne Kugeln.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, eine rote Kugel zu ziehen.`,
            sol: round2(rot / gesamt * 100),
            steps: generateSteps("wsk_einfach", {gunstig: rot, moglich: gesamt}, round2(rot / gesamt * 100)),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {rot, blau, gruen, gesamt}
          };
        }
        case "gluecksrad": {
          const felder = rand(6, 12);
          const gewinnfelder = rand(1, 3);
          return {
            text: `${op} Sie: Ein Glücksrad hat ${felder} gleich große Felder, davon sind ${gewinnfelder} Felder Gewinnfelder.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, bei einem Dreh ein Gewinnfeld zu erhalten.`,
            sol: round2(gewinnfelder / felder * 100),
            steps: generateSteps("wsk_gluecksrad", {gunstig: gewinnfelder, moglich: felder}, round2(gewinnfelder / felder * 100)),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {felder, gewinnfelder}
          };
        }
        case "mindestens_einmal": {
          const rotWsk = rand(20, 40) / 100;
          return {
            text: `${op} Sie: Ein Glücksrad hat zwei Sektoren: Blau (${round2((1-rotWsk)*100)}%) und Rot (${round2(rotWsk*100)}%). Es wird zweimal gedreht.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, dass mindestens einmal Rot erscheint.`,
            sol: round2((1 - (1-rotWsk)*(1-rotWsk)) * 100),
            steps: generateSteps("wsk_mindestens_einmal", {wskRot: rotWsk}, round2((1 - (1-rotWsk)*(1-rotWsk)) * 100)),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {rotWsk}
          };
        }
        case "ohne_zuruecklegen": {
          const gelb = rand(2, 4);
          const rot = rand(2, 4);
          const gesamt1 = gelb + rot;
          const rot1 = rot;
          const rot2 = rot - 1;
          const gesamt2 = gesamt1 - 1;
          return {
            text: `${op} Sie: In einer Tüte sind ${gelb} gelbe und ${rot} rote Gummibärchen. Du nimmst nacheinander zwei Gummibärchen heraus, ohne sie zurückzulegen.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, dass beide Gummibärchen rot sind.`,
            sol: round2(rot1/gesamt1 * rot2/gesamt2 * 100),
            steps: generateSteps("wsk_ohne_zuruecklegen", {rot1, gesamt1, rot2, gesamt2}, round2(rot1/gesamt1 * rot2/gesamt2 * 100)),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {gelb, rot, gesamt1, rot1, rot2, gesamt2}
          };
        }
        case "ohne_zuruecklegen_kaugummi": {
          const gelb = rand(2, 4);
          const rot = rand(1, 3);
          const blau = rand(1, 2);
          const gesamt1 = gelb + rot + blau;
          const gelb1 = gelb;
          const gelb2 = gelb - 1;
          const gesamt2 = gesamt1 - 1;
          return {
            text: `${op} Sie: Leyla hat ${gelb} gelbe, ${rot} rote und ${blau} blaue Kaugummis in einer Tüte. Sie nimmt nacheinander zwei Kaugummis heraus, ohne sie zurückzulegen.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, dass beide Kaugummis gelb sind.`,
            sol: round2(gelb1/gesamt1 * gelb2/gesamt2 * 100),
            steps: generateSteps("wsk_ohne_zuruecklegen", {rot1: gelb1, gesamt1, rot2: gelb2, gesamt2}, round2(gelb1/gesamt1 * gelb2/gesamt2 * 100)),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {gelb, rot, blau, gesamt1, gelb1, gelb2, gesamt2}
          };
        }
        case "wuerfel_zweimal": {
          return {
            text: `${op} Sie: Ein fairer Standardwürfel wird zweimal geworfen.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, zweimal hintereinander eine '6' zu würfeln.`,
            sol: round2(1/36 * 100),
            steps: generateSteps("wsk_wuerfel_zweimal", {}, round2(1/36 * 100)),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {}
          };
        }
        case "wuerfel_spezial": {
          return {
            text: `${op} Sie: Tom hat einen Würfel, dessen Netz die Augenzahlen 2, 4, 2, 4, 2, 4 zeigt.`,
            question: `Berechne die Wahrscheinlichkeit in Prozent, bei einem Wurf eine gerade Zahl zu würfeln.`,
            sol: 100,
            steps: generateSteps("wsk_wuerfel_spezial", {}, 100),
            category: "wahrscheinlichkeit_mehrstufig",
            params: {}
          };
        }
      }
    },

    // ---------- ZINSESZINS VS. LINEAR (VERGLEICH) ----------
    wachstum_vergleich: () => {
      const typen = ["zinseszins_vs_linear", "wertverlust_vergleich", "zinseszins"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "BEGRUENDE", "UEBERPRUEFE"]));
      
      switch(typ) {
        case "zinseszins_vs_linear": {
          const kapital = rand(5000, 20000);
          const zinsLinear = rand(300, 600);
          const zinsZins = rand(2, 5);
          const jahre = rand(5, 15);
          const linear = kapital + jahre * zinsLinear;
          const zinseszins = kapital * Math.pow(1 + zinsZins/100, jahre);
          return {
            text: `${op} Sie: Zwei Sparpläne für ein Startkapital von ${kapital} €: Plan A (linear) zahlt jährlich feste Zinsen von ${zinsLinear} €. Plan B (Zinseszins) verzinst das Kapital mit ${zinsZins}% pro Jahr.`,
            question: `Berechne das Kapital nach ${jahre} Jahren für beide Pläne und entscheide, welcher Plan nach dieser Zeit höher ist.`,
            sol: zinseszins > linear ? "Plan B (Zinseszins)" : "Plan A (linear)",
            steps: generateSteps("wachstum_zinseszins_vs_linear", {kapital, zinsLinear, zinsZins, jahre}, zinseszins > linear ? "Zinseszins" : "Linear"),
            category: "wachstum_vergleich",
            params: {kapital, zinsLinear, zinsZins, jahre}
          };
        }
        case "wertverlust_vergleich": {
          const kapital = rand(2000, 5000);
          const verlustLinear = rand(200, 500);
          const verlustProzent = rand(10, 20);
          const jahre = rand(2, 5);
          return {
            text: `${op} Sie: Ein E‑Bike kostet neu ${kapital} €. Modell A verliert jährlich einen festen Betrag von ${verlustLinear} € an Wert (linear). Modell B verliert jährlich ${verlustProzent}% seines aktuellen Wertes (prozentual).`,
            question: `Berechne den Restwert nach ${jahre} Jahren für beide Modelle und überprüfe, welches Modell den höheren Restwert hat.`,
            sol: kapital * Math.pow(1 - verlustProzent/100, jahre) > kapital - jahre * verlustLinear ? "Modell B (prozentual)" : "Modell A (linear)",
            steps: generateSteps("wachstum_wertverlust_vergleich", {kapital, verlustLinear, verlustProzent, jahre}, kapital * Math.pow(1 - verlustProzent/100, jahre) > kapital - jahre * verlustLinear ? "Prozentual" : "Linear"),
            category: "wachstum_vergleich",
            params: {kapital, verlustLinear, verlustProzent, jahre}
          };
        }
        case "zinseszins": {
          const kapital = rand(1000, 5000);
          const zins = rand(2, 5);
          const jahre = rand(3, 8);
          return {
            text: `${op} Sie: Ein Betrag von ${kapital} € wird für ${jahre} Jahre zu einem jährlichen Zinssatz von ${zins}% mit Zinseszins angelegt.`,
            question: `Berechne das Endkapital nach ${jahre} Jahren in €.`,
            sol: round2(kapital * Math.pow(1 + zins/100, jahre)),
            steps: generateSteps("wachstum_zinseszins", {kapital, zins, jahre}, round2(kapital * Math.pow(1 + zins/100, jahre))),
            category: "wachstum_vergleich",
            params: {kapital, zins, jahre}
          };
        }
      }
    },

    // ---------- VOLUMEN UND OBERFLÄCHE ----------
    volumen_oberflaeche: () => {
      const typen = ["quader_volumen", "quader_oberflaeche", "zylinder_volumen", "wuerfel_volumen"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      switch(typ) {
        case "quader_volumen": {
          const l = rand(3, 12);
          const b = rand(2, 10);
          const h = rand(2, 8);
          return {
            text: `${op} Sie: Ein Quader hat die Maße Länge l = ${l} cm, Breite b = ${b} cm, Höhe h = ${h} cm.`,
            question: `Berechne das Volumen des Quaders in cm³.`,
            sol: l * b * h,
            steps: generateSteps("volumen_quader", {l, b, h}, l * b * h),
            category: "volumen_oberflaeche",
            params: {l, b, h}
          };
        }
        case "quader_oberflaeche": {
          const l = rand(3, 10);
          const b = rand(2, 8);
          const h = rand(2, 6);
          return {
            text: `${op} Sie: Ein Quader hat die Maße Länge l = ${l} cm, Breite b = ${b} cm, Höhe h = ${h} cm.`,
            question: `Berechne die Oberfläche des Quaders in cm².`,
            sol: 2 * (l*b + l*h + b*h),
            steps: generateSteps("oberflaeche_quader", {l, b, h}, 2 * (l*b + l*h + b*h)),
            category: "volumen_oberflaeche",
            params: {l, b, h}
          };
        }
        case "zylinder_volumen": {
          const r = rand(2, 8);
          const h = rand(5, 15);
          return {
            text: `${op} Sie: Ein Zylinder hat den Radius r = ${r} cm und die Höhe h = ${h} cm (verwende π = 3,14).`,
            question: `Berechne das Volumen des Zylinders in cm³.`,
            sol: round2(3.14 * r * r * h),
            steps: generateSteps("volumen_zylinder", {r, h}, round2(3.14 * r * r * h)),
            category: "volumen_oberflaeche",
            params: {r, h}
          };
        }
        case "wuerfel_volumen": {
          const a = rand(3, 9);
          return {
            text: `${op} Sie: Ein Würfel hat die Kantenlänge a = ${a} cm.`,
            question: `Berechne das Volumen des Würfels in cm³.`,
            sol: a * a * a,
            steps: generateSteps("volumen_wuerfel", {a}, a * a * a),
            category: "volumen_oberflaeche",
            params: {a}
          };
        }
      }
    },

    // ---------- MAßSTAB ----------
    massstab: () => {
      const laengeModell = rand(5, 25);
      const massstab = rand(20, 100);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein Spielzeugauto ist ${laengeModell} cm lang. Es wurde im Maßstab 1:${massstab} nachgebaut.`,
        question: `Berechne die tatsächliche Länge des Autos in Metern.`,
        sol: round2(laengeModell * massstab / 100),
        steps: generateSteps("massstab", {laengeModell, massstab}, round2(laengeModell * massstab / 100)),
        category: "massstab",
        params: {laengeModell, massstab}
      };
    },

    // ---------- DIAGRAMME ----------
    diagramme: () => {
      const anteil = rand(5, 30) + (rand(0,1) ? 0.5 : 0);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Bei einer Umfrage gaben ${anteil}% der Schüler:innen an, dass sie einen Siegerpokal erhalten möchten.`,
        question: `Berechne den Mittelpunktswinkel (in Grad), der diesem Anteil in einem Kreisdiagramm entspricht.`,
        sol: round2(360 * anteil / 100),
        steps: generateSteps("diagramm_kreis_winkel", {anteil}, round2(360 * anteil / 100)),
        category: "diagramme",
        params: {anteil}
      };
    },

    // ---------- FUNKTIONALE ZUSAMMENHÄNGE ----------
    funktionale_zusammenhaenge: () => {
      const typen = ["parkgebuehr", "handytarif"];
      const typ = pickFrom(typen);
      const op = getOperatorPhrase(pickFrom(["BERECHNE", "ENTSCHEIDE_BEGRUENDE"]));
      
      switch(typ) {
        case "parkgebuehr": {
          const grund = rand(0.5, 1.5);
          const preis1 = rand(1, 2.5);
          return {
            text: `${op} Sie: In einem Parkhaus kostet die erste Stunde ${grund.toFixed(2)} €, jede weitere Stunde kostet ${preis1.toFixed(2)} €.`,
            question: `Welcher Term beschreibt die Parkgebühr für x Stunden richtig? (A) ${preis1.toFixed(2)}·x + ${grund.toFixed(2)}  oder (B) ${preis1.toFixed(2)}·(x‑1) + ${grund.toFixed(2)}? Begründe deine Wahl.`,
            sol: `${preis1.toFixed(2)}·(x-1) + ${grund.toFixed(2)}`,
            steps: generateSteps("funktion_parkgebuehr", {grund, preis1}, `${preis1.toFixed(2)}·(x-1) + ${grund.toFixed(2)}`),
            category: "funktionale_zusammenhaenge",
            params: {grund, preis1}
          };
        }
        case "handytarif": {
          const grund = rand(3, 10);
          const preisProMin = rand(5, 15) / 100;
          const minuten = rand(100, 300);
          return {
            text: `${op} Sie: Ein Handytarif besteht aus einer monatlichen Grundgebühr von ${grund} € und einem Minutenpreis von ${(preisProMin*100).toFixed(0)} Cent.`,
            question: `Berechne die monatlichen Kosten in €, wenn ${minuten} Minuten telefoniert werden.`,
            sol: round2(grund + preisProMin * minuten),
            steps: generateSteps("funktion_handytarif", {grund, preisProMin, minuten}, round2(grund + preisProMin * minuten)),
            category: "funktionale_zusammenhaenge",
            params: {grund, preisProMin, minuten}
          };
        }
      }
    },

    // ========== NEUE DIAGRAMMTYPEN 13-21 ==========

    // 1️⃣3️⃣ NEU: dreiseitiges_prisma
    dreiseitiges_prisma: () => {
      const base = rand(2, 8);
      const side = rand(2, 8);
      const height = rand(5, 15);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein dreiseitiges Prisma hat eine Grundfläche in Form eines rechtwinkligen Dreiecks. Die beiden Katheten sind ${base} cm und ${side} cm lang. Die Höhe (Länge) des Prismas beträgt ${height} cm.`,
        question: `Berechne das Volumen des Prismas in cm³.`,
        sol: base * side / 2 * height,
        steps: generateSteps("prisma_dreiseitig", {base, side, height}, base * side / 2 * height),
        category: "dreiseitiges_prisma",
        params: {base, side, height},
        diagram: {
          type: "dreiseitiges_prisma",
          dynamic: true,
          params: { base, side, height }
        }
      };
    },

    // 1️⃣4️⃣ NEU: dachgeschoss_prisma
    dachgeschoss_prisma: () => {
      const width = rand(6, 15);
      const roofHeight = rand(2, 6);
      const prismDepth = rand(5, 12);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein Dachgeschoss hat die Form eines dreiseitigen Prismas. Das Haus ist ${width} m breit, die Höhe des Daches (Dreieckshöhe) beträgt ${roofHeight} m. Die Tiefe des Hauses (Prismenhöhe) beträgt ${prismDepth} m.`,
        question: `Berechne das Volumen des Dachgeschosses in m³.`,
        sol: width * roofHeight / 2 * prismDepth,
        steps: generateSteps("dachgeschoss_prisma", {width, roofHeight, prismDepth}, width * roofHeight / 2 * prismDepth),
        category: "dachgeschoss_prisma",
        params: {width, roofHeight, prismDepth},
        diagram: {
          type: "dachgeschoss_prisma",
          dynamic: true,
          params: { width, roofHeight, prismDepth }
        }
      };
    },

    // 1️⃣5️⃣ NEU: zelt_prisma
    zelt_prisma: () => {
      const g = rand(2, 5);
      const h = rand(1, 4);
      const length = rand(3, 8);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein Zelt hat die Form eines Dreiecksprismas. Die Grundfläche ist ein Dreieck mit Grundseite g = ${g} m und Höhe h = ${h} m. Das Zelt ist ${length} m lang.`,
        question: `Berechne das Volumen des Zeltes in m³.`,
        sol: g * h / 2 * length,
        steps: generateSteps("zelt_prisma", {g, h, length}, g * h / 2 * length),
        category: "zelt_prisma",
        params: {g, h, length},
        diagram: {
          type: "zelt_prisma",
          dynamic: false
        }
      };
    },

    // 1️⃣6️⃣ NEU: keksverpackung
    keksverpackung: () => {
      const a = rand(4, 8);
      const b = rand(4, 8);
      const c = rand(4, 8);
      const h = rand(8, 15);
      
      // Heron-Formel
      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Eine Keksverpackung hat die Form eines dreiseitigen Prismas. Die Grundfläche ist ein Dreieck mit den Seitenlängen a = ${a} cm, b = ${b} cm und c = ${c} cm. Die Höhe (Länge) der Verpackung beträgt h = ${h} cm.`,
        question: `Berechne das Volumen der Verpackung in cm³ (verwende die Heron‑Formel für die Dreiecksfläche).`,
        sol: round2(area * h),
        steps: generateSteps("keksverpackung", {a, b, c, h, s, sa: s-a, sb: s-b, sc: s-c, area}, round2(area * h)),
        category: "keksverpackung",
        params: {a, b, c, h, s, area},
        diagram: {
          type: "keksverpackung",
          dynamic: true,
          params: { a, b }
        }
      };
    },

    // 1️⃣7️⃣ NEU: holztisch
    holztisch: () => {
      const diameter = rand(80, 120);
      const r = diameter / 2;
      const thickness = rand(2, 5);
      const legDiameter = rand(4, 8);
      const legRadius = legDiameter / 2;
      const height = rand(70, 85);
      
      const volPlatte = 3.14 * r * r * thickness;
      const volBein = 3.14 * legRadius * legRadius * height;
      const volGesamt = volPlatte + 4 * volBein;
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein runder Holztisch besteht aus einer Tischplatte mit Durchmesser ${diameter} cm und Dicke ${thickness} cm sowie vier zylindrischen Tischbeinen mit jeweils Durchmesser ${legDiameter} cm und Höhe ${height} cm.`,
        question: `Berechne das Gesamtvolumen des Tisches in Litern (1 Liter = 1000 cm³, π ≈ 3,14).`,
        sol: round2(volGesamt / 1000),
        steps: generateSteps("holztisch", {diameter, r, thickness, legDiameter, legRadius, height, volGesamt}, round2(volGesamt / 1000)),
        category: "holztisch",
        params: {diameter, r, thickness, legDiameter, legRadius, height, volGesamt},
        diagram: {
          type: "holztisch",
          dynamic: true,
          params: { diameter, thickness, height, legOffset: diameter/3 }
        }
      };
    },

    // 1️⃣8️⃣ NEU: skateboardrampe
    skateboardrampe: () => {
      const baseL = rand(120, 200);
      const topL = rand(40, 80);
      const baseH = rand(30, 60);
      const width = rand(80, 150);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Eine Skateboardrampe hat die Form eines Prismas mit trapezförmiger Grundfläche. Die untere Breite (lange Seite) beträgt ${baseL} cm, die obere Breite (kurze Seite) beträgt ${topL} cm. Die Höhe der Rampe (senkrecht) beträgt ${baseH} cm. Die Rampe ist insgesamt ${width} cm breit.`,
        question: `Berechne das Volumen der Rampe in Litern (1 Liter = 1000 cm³).`,
        sol: round2((baseL + topL) * baseH / 2 * width / 1000),
        steps: generateSteps("skateboardrampe", {baseL, baseH, topL, width}, round2((baseL + topL) * baseH / 2 * width / 1000)),
        category: "skateboardrampe",
        params: {baseL, baseH, topL, width},
        diagram: {
          type: "skateboardrampe",
          dynamic: true,
          params: { baseL, baseH, topL }
        }
      };
    },

    // 1️⃣9️⃣ NEU: weideland_viereck
    weideland_viereck: () => {
      const a = rand(30, 70);
      const b = rand(30, 60);
      const c = rand(30, 70);
      const d = rand(30, 60);
      const diag = rand(50, 90);
      
      // Heron für zwei Dreiecke
      const s1 = (a + b + diag) / 2;
      const area1 = Math.sqrt(s1 * (s1 - a) * (s1 - b) * (s1 - diag));
      const s2 = (c + d + diag) / 2;
      const area2 = Math.sqrt(s2 * (s2 - c) * (s2 - d) * (s2 - diag));
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein viereckiges Grundstück (Weideland) hat die Seitenlängen a = ${a} m, b = ${b} m, c = ${c} m, d = ${d} m. Die Diagonale zwischen den Seiten a und b beträgt ${diag} m.`,
        question: `Berechne die Fläche des Grundstücks in Hektar (ha), indem du es in zwei Dreiecke zerlegst (1 ha = 10.000 m²).`,
        sol: round2((area1 + area2) / 10000),
        steps: generateSteps("weideland_viereck", {a, b, c, d, diag, s1, s2, area1, area2}, round2((area1 + area2) / 10000)),
        category: "weideland_viereck",
        params: {a, b, c, d, diag, area1, area2},
        diagram: {
          type: "weideland_viereck",
          dynamic: true,
          params: { a, b, c, d }
        }
      };
    },

    // 2️⃣0️⃣ NEU: flaechenberechnung_garten
    flaechenberechnung_garten: () => {
      const outerW = rand(15, 35);
      const outerH = rand(15, 30);
      const cutW = rand(4, 12);
      const cutH = rand(3, 10);
      const op = getOperatorPhrase(pickFrom(["BERECHNE"]));
      
      return {
        text: `${op} Sie: Ein rechteckiger Garten ist ${outerW} m lang und ${outerH} m breit. In der Mitte des Gartens befindet sich ein rechteckiges Blumenbeet mit den Maßen ${cutW} m × ${cutH} m.`,
        question: `Berechne die Rasenfläche (Gartenfläche minus Blumenbeet) in m².`,
        sol: outerW * outerH - cutW * cutH,
        steps: generateSteps("flaechenberechnung_garten", {outerW, outerH, cutW, cutH}, outerW * outerH - cutW * cutH),
        category: "flaechenberechnung_garten",
        params: {outerW, outerH, cutW, cutH},
        diagram: {
          type: "flaechenberechnung_garten",
          dynamic: true,
          params: { outerW, outerH, cutW, cutH }
        }
      };
    },

    // 2️⃣1️⃣ NEU: rechte_winkel_argumentation
    rechte_winkel_argumentation: () => {
      // Klassisches Tripel 3-4-5 oder Vielfache
      const faktor = rand(1, 3);
      const a = 3 * faktor;
      const b = 4 * faktor;
      const c = 5 * faktor;
      const op = getOperatorPhrase(pickFrom(["BEGRUENDE"]));
      
      return {
        text: `${op} Sie: In einem Dreieck sind die Seitenlängen a = ${a} cm, b = ${b} cm und c = ${c} cm gegeben.`,
        question: `Prüfe mit dem Satz des Pythagoras, ob das Dreieck einen rechten Winkel besitzt, und begründe deine Antwort.`,
        sol: "Ja",
        steps: generateSteps("rechte_winkel_argumentation", {a, b, c, isRight: true}, "Ja"),
        category: "rechte_winkel_argumentation",
        params: {a, b, c},
        diagram: {
          type: "rechte_winkel_argumentation",
          dynamic: false
        }
      };
    }
  };

  /* =========================================================
     getTask_113 - Hauptfunktion zum Abrufen einer Aufgabe
  ========================================================= */
  function getTask_113(config) {
    const level = config?.level || "anspruchsvoll";
    const index = config?.index || 0;
    
    // Kategorien auswählen
    const categories = Object.keys(TASK_GENERATORS_113);
    const cat = pickFrom(categories);
    
    // Aufgabe generieren
    let task = TASK_GENERATORS_113[cat]();
    task.category = cat;
    
    // Vollständige Lösung formatieren
    if (!task.fullSolution) {
      task.fullSolution = task.sol;
    }
    
    // Lösungsschritte formatieren
    task.formattedSteps = formatSteps(task.steps, task.fullSolution);
    
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

  /* =========================================================
     GLOBAL BEREITSTELLEN
  ========================================================= */
  window.getTask_113 = getTask_113;
  window.TASK_GENERATORS_113 = TASK_GENERATORS_113;

})();
