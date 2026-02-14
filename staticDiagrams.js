/* =========================================================
   staticDiagrams.js  (PRODUKTIONSVERSION)
   - Enthält NUR die wirklich statischen Schaubilder als SVG-Strings
   - Wird 1× geladen und nie neu berechnet
========================================================= */

const STATIC_DIAGRAMS = {
  // 1) Unvollständiges Quader-Netz (Form bleibt gleich)
  quader_netz_ergaenzen: `
  <svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
    <rect x="130" y="80" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
    <rect x="70"  y="80" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
    <rect x="190" y="80" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
    <rect x="130" y="20" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
    <rect x="130" y="140" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
    <!-- fehlende Fläche angedeutet -->
    <rect x="250" y="80" width="60" height="60" fill="none" stroke="black" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="257" y="112" font-size="12">fehlend</text>
  </svg>`,

  // 2) Prisma-Netz (generisches Prisma-Netz – Form bleibt gleich)
  prisma_netz: `
  <svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
    <polygon points="70,90 120,40 170,90" fill="none" stroke="black" stroke-width="2"/>
    <rect x="70" y="90" width="100" height="70" fill="none" stroke="black" stroke-width="2"/>
    <rect x="170" y="90" width="70" height="70" fill="none" stroke="black" stroke-width="2"/>
    <rect x="240" y="90" width="70" height="70" fill="none" stroke="black" stroke-width="2"/>
    <polygon points="310,90 260,40 210,90" fill="none" stroke="black" stroke-width="2"/>
    <text x="66" y="178" font-size="12">Netz (schematisch)</text>
  </svg>`,

  // 3) Zelt-Prisma (Netzform bleibt gleich)
  zelt_prisma: `
  <svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
    <!-- Dreiecksgrundflächen -->
    <polygon points="70,120 120,70 170,120" fill="none" stroke="black" stroke-width="2"/>
    <polygon points="290,120 240,70 190,120" fill="none" stroke="black" stroke-width="2"/>
    <!-- Mantelflächen -->
    <rect x="70" y="120" width="120" height="60" fill="none" stroke="black" stroke-width="2"/>
    <rect x="190" y="120" width="100" height="60" fill="none" stroke="black" stroke-width="2"/>
    <text x="70" y="205" font-size="12">Zelt-Netz (schematisch)</text>
  </svg>`,

  // 4) Rechte-Winkel-Argumentation (Diagonalen schneiden sich rechtwinklig – Gegenbeispiel/Skizze)
  rechte_winkel_argumentation: `
  <svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
    <!-- bewusst KEINE Raute: ein Drachenviereck / allgemeines Viereck -->
    <polygon points="80,60 240,80 210,170 100,150" fill="none" stroke="black" stroke-width="2"/>
    <!-- Diagonalen -->
    <line x1="80" y1="60" x2="210" y2="170" stroke="black" stroke-width="2"/>
    <line x1="240" y1="80" x2="100" y2="150" stroke="black" stroke-width="2"/>
    <!-- rechter Winkel Marker -->
    <path d="M155 112 L170 108 L174 122" fill="none" stroke="black" stroke-width="2"/>
    <text x="70" y="205" font-size="12">Diagonalen ⟂, aber keine Raute</text>
  </svg>`
};

// Optional: Alias-Namen (falls deine Aufgaben andere Typstrings nutzen)
const STATIC_ALIASES = {
  quader_netz: "quader_netz_ergaenzen",
  prismaNetz: "prisma_netz",
  zelt_prisma_netz: "zelt_prisma",
  diagonalen_rechtwinklig: "rechte_winkel_argumentation"
};
