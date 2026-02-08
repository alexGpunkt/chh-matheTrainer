/* =========================================================
   pool_113.js
   Aufgabenpool – Mathematik BBR / BOA
   Anforderungsbereich 11.3
========================================================= */

/* -------------------------
   HILFSFUNKTIONEN
------------------------- */
export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function round2(x) {
  return Math.round(x * 100) / 100;
}

/* =========================================================
   AUFGABENPOOL 11.3
   Jede Aufgabe erfordert:
   - mehrere Rechenschritte ODER
   - Umformen / Transfer / Interpretation
========================================================= */
export function generateTask113(index) {

  const POOL = [

    /* =====================
       ALGEBRA – TERME
       Umformen + Einsetzen
    ===================== */
    () => {
      const x = rand(-3, 8);
      return {
        text: `
          Berechne den Wert des Terms für x = ${x}:<br>
          <b>2·(3x − 4) − (x − 5)</b>
        `,
        sol: 2 * (3 * x - 4) - (x - 5)
      };
    },

    /* =====================
       ALGEBRA – GLEICHUNGEN
       Struktur erkennen
    ===================== */
    () => {
      const x = rand(-5, 10);
      return {
        text: `
          Löse die Gleichung nach x:<br>
          <b>3(x − 2) + 4 = ${3 * (x - 2) + 4}</b>
        `,
        sol: x
      };
    },

    /* =====================
       PROZENT – PREISÄNDERUNG
       Transfer statt Formel
    ===================== */
    () => {
      const g = rand(150, 600);
      const p = rand(10, 35);
      return {
        text: `
          Ein Produkt kostet ${g} €.<br>
          Der Preis wird um ${p}% erhöht.<br>
          <b>Bestimme den neuen Preis.</b>
        `,
        sol: round2(g * (1 + p / 100))
      };
    },

    /* =====================
       PROZENT – RÜCKRECHNUNG
       Umkehraufgabe
    ===================== */
    () => {
      const g = rand(120, 400);
      const p = rand(10, 40);
      const w = round2(g * p / 100);
      return {
        text: `
          ${w} € entsprechen ${p}% eines Grundwertes.<br>
          <b>Bestimme den Grundwert.</b>
        `,
        sol: round2(g)
      };
    },

    /* =====================
       PRISMA – VOLUMEN
       Formel auswählen
    ===================== */
    () => {
      const a = rand(4, 10);
      const b = rand(5, 12);
      const h = rand(6, 18);
      return {
        text: `
          Ein Prisma hat eine rechteckige Grundfläche
          mit a = ${a} cm und b = ${b} cm.<br>
          Die Höhe beträgt ${h} cm.<br>
          <b>Berechne das Volumen.</b>
        `,
        sol: a * b * h
      };
    },

    /* =====================
       PRISMA – OBERFLÄCHE
       Mehrere Teilflächen
    ===================== */
    () => {
      const a = rand(4, 10);
      const h = rand(6, 16);
      return {
        text: `
          Ein Prisma besitzt eine quadratische Grundfläche
          mit a = ${a} cm und die Höhe h = ${h} cm.<br>
          <b>Berechne die Oberfläche.</b>
        `,
        sol: 2 * a * a + 4 * a * h
      };
    },

    /* =====================
       PYTHAGORAS IM RAUM
       Raumdiagonale
    ===================== */
    () => {
      const a = rand(4, 10);
      const b = rand(5, 12);
      const h = rand(6, 14);
      return {
        text: `
          Ein Quader besitzt die Kantenlängen
          a = ${a} cm, b = ${b} cm und h = ${h} cm.<br>
          <b>Bestimme die Länge der Raumdiagonale.</b>
        `,
        sol: round2(Math.sqrt(a * a + b * b + h * h))
      };
    },

    /* =====================
       ZYLINDER – VOLUMEN
       Formel + Näherung
    ===================== */
    () => {
      const r = rand(3, 8);
      const h = rand(8, 20);
      return {
        text: `
          Ein Zylinder hat den Radius r = ${r} cm
          und die Höhe h = ${h} cm.<br>
          (π ≈ 3,14)<br>
          <b>Berechne das Volumen.</b>
        `,
        sol: round2(3.14 * r * r * h)
      };
    },

    /* =====================
       ZYLINDER – MANTEL + PYTHAGORAS
       Transferaufgabe
    ===================== */
    () => {
      const r = rand(3, 8);
      const h = rand(8, 18);
      const u = round2(2 * 3.14 * r);
      return {
        text: `
          Der Mantel eines Zylinders wird als Rechteck dargestellt.<br>
          Umfang der Grundfläche: ${u} cm<br>
          Höhe: ${h} cm<br>
          <b>Berechne die Länge der Diagonale.</b>
        `,
        sol: round2(Math.sqrt(u * u + h * h))
      };
    }

  ];

  return POOL[index % POOL.length]();
}
