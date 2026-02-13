<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Mathematik – BBR Prüfungsmodus (Note 1–2)</title>

<style>
html, body {
  overflow: hidden;
  touch-action: manipulation;
}
* {
  box-sizing: border-box;
  touch-action: manipulation;
}
body {
  font-family: system-ui, Arial, sans-serif;
  background: #e9e9e9;
  margin: 0;
  padding: 12px;
}
h1 {
  text-align: center;
  font-size: clamp(1.3rem, 4vw, 2rem);
  margin-bottom: 10px;
}
#topbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}
select, button, label {
  font-size: 1rem;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #999;
}
button {
  background: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
}
button:active {
  background: #0d47a1;
}
button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
#timer {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: darkred;
}
#card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  max-width: 900px;
  margin: auto;
}
#task {
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  margin-bottom: 14px;
}
#answerArea {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  font-size: 1.3rem;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #aaa;
  width: 100%;
}
.hidden { display: none; }
#navButtons {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
#navButtons button { flex: 1; }
#result {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>

<!-- Integrierter Aufgabenpool (falls pool_113.js nicht verfügbar) -->
<script>
// =========================================================
// INTEGRIERTER AUFGABENPOOL für BBR Niveau 1-2
// =========================================================

// Hilfsfunktionen
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round2(x) {
  return Math.round(x * 100) / 100;
}

// TASKPOOL Definition
window.TASKPOOL = {
  rechnen: [
    function() { 
      let a = rand(12, 30);
      let b = rand(2, 8);
      return { task: `Berechne: ${a} · ${b}`, answer: a * b };
    },
    function() { 
      let a = rand(40, 120);
      let b = rand(3, 10);
      return { task: `Berechne: ${a} : ${b}`, answer: round2(a / b) };
    },
    function() { 
      let a = rand(15, 45);
      let b = rand(15, 45);
      return { task: `Berechne: ${a} + ${b}`, answer: a + b };
    },
    function() { 
      let a = rand(50, 150);
      let b = rand(20, 80);
      return { task: `Berechne: ${a} - ${b}`, answer: a - b };
    },
    function() { 
      let a = rand(5, 15);
      return { task: `Berechne: ${a}²`, answer: a * a };
    },
    function() { 
      let a = rand(20, 60);
      let b = rand(2, 5);
      let c = rand(2, 4);
      return { task: `Berechne: ${a} - ${b} · ${c}`, answer: a - b * c };
    }
  ],

  prozent: [
    function() { 
      let g = rand(120, 350);
      let p = [15, 20, 25, 30, 40][rand(0, 4)];
      return { task: `Berechne: ${p}% von ${g} €`, answer: round2(g * p / 100) };
    },
    function() { 
      let price = rand(45, 180);
      let p = [10, 15, 20, 25][rand(0, 3)];
      return { task: `Preis nach ${p}% Rabatt: ${price} €`, answer: round2(price * (100 - p) / 100) };
    },
    function() { 
      let w = rand(24, 90);
      let p = [15, 20, 25, 30][rand(0, 3)];
      return { task: `${w} sind ${p}% von?`, answer: round2(w * 100 / p) };
    },
    function() { 
      let g = rand(80, 250);
      let w = rand(20, 70);
      return { task: `${w} von ${g} = ?%`, answer: round2(w / g * 100) };
    },
    function() { 
      let netto = rand(60, 240);
      return { task: `Bruttopreis (netto ${netto} €, 19% MwSt)`, answer: round2(netto * 1.19) };
    }
  ],

  geometrie: [
    function() { 
      let a = rand(3, 12);
      return { task: `Umfang eines Quadrats mit a = ${a} cm`, answer: 4 * a };
    },
    function() { 
      let a = rand(3, 10);
      return { task: `Fläche eines Quadrats mit a = ${a} cm`, answer: a * a };
    },
    function() { 
      let l = rand(5, 15);
      let b = rand(3, 10);
      return { task: `Umfang Rechteck (l=${l} cm, b=${b} cm)`, answer: 2 * (l + b) };
    },
    function() { 
      let l = rand(4, 14);
      let b = rand(3, 9);
      return { task: `Fläche Rechteck (l=${l} cm, b=${b} cm)`, answer: l * b };
    },
    function() { 
      let g = rand(6, 18);
      let h = rand(4, 12);
      return { task: `Fläche Dreieck (g=${g} cm, h=${h} cm)`, answer: round2((g * h) / 2) };
    }
  ],

  koerper: [
    function() { 
      let a = rand(2, 6);
      return { task: `Volumen Würfel (a = ${a} cm)`, answer: a * a * a };
    },
    function() { 
      let l = rand(3, 8);
      let b = rand(2, 6);
      let h = rand(2, 5);
      return { task: `Volumen Quader (${l}·${b}·${h} cm)`, answer: l * b * h };
    },
    function() { 
      let l = rand(3, 7);
      let b = rand(2, 5);
      let h = rand(2, 4);
      return { task: `Oberfläche Quader (${l}·${b}·${h} cm)`, answer: 2 * (l*b + l*h + b*h) };
    }
  ],

  pythagoras: [
    function() { 
      let a = rand(3, 6);
      let b = rand(4, 8);
      let c = Math.sqrt(a*a + b*b);
      return { task: `Hypotenuse (a=${a} cm, b=${b} cm)`, answer: round2(c) };
    },
    function() { 
      let a = rand(3, 7);
      let c = rand(8, 13);
      let b = Math.sqrt(c*c - a*a);
      return { task: `Kathete (a=${a} cm, c=${c} cm)`, answer: round2(b) };
    }
  ],

  zylinder: [
    function() { 
      let r = rand(2, 5);
      let h = rand(3, 8);
      return { task: `Zylinder-Volumen (r=${r} cm, h=${h} cm)`, answer: round2(3.14 * r * r * h) };
    },
    function() { 
      let r = rand(2, 4);
      let h = rand(4, 9);
      return { task: `Zylinder-Oberfläche (r=${r} cm, h=${h} cm)`, answer: round2(2 * 3.14 * r * (r + h)) };
    }
  ],

  sach: [
    function() { 
      let km = rand(60, 180);
      let h = rand(2, 4);
      return { task: `Geschwindigkeit (${km} km in ${h} h)`, answer: round2(km / h) };
    },
    function() { 
      let price = rand(2, 6);
      let amount = rand(3, 10);
      return { task: `Gesamtpreis (${amount} Stück à ${price} €)`, answer: price * amount };
    },
    function() { 
      let v1 = rand(12, 25);
      let v2 = rand(12, 25);
      let v3 = rand(12, 25);
      return { task: `Durchschnitt (${v1}, ${v2}, ${v3})`, answer: round2((v1 + v2 + v3) / 3) };
    }
  ]
};

// Globale Zugriffsfunktion
function getTask113(config) {
  if (!config || !config.category) {
    // Fallback: zufällige Kategorie
    const cats = Object.keys(window.TASKPOOL);
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const pool = window.TASKPOOL[cat];
    const idx = Math.floor(Math.random() * pool.length);
    const task = pool[idx]();
    return {
      text: task.task,
      sol: task.answer
    };
  }
  
  const cat = config.category;
  const pool = window.TASKPOOL[cat];
  
  if (!pool) {
    console.error(`Kategorie ${cat} nicht gefunden`);
    return {
      text: `Berechne: 2 + 2`,
      sol: 4
    };
  }
  
  const idx = (config.generatorIndex !== undefined) 
    ? config.generatorIndex % pool.length 
    : Math.floor(Math.random() * pool.length);
  
  const task = pool[idx]();
  return {
    text: task.task,
    sol: task.answer
  };
}

console.log("Integrierter Aufgabenpool geladen");
</script>

</head>

<body>

<h1>📝 Mathematik – BBR Prüfungsmodus (Note 1–2)</h1>

<div id="topbar">
  <button id="startBtn">Prüfung starten</button>
  <div id="timer" class="hidden"></div>
</div>

<div id="card">
  <div id="task">Noch keine Prüfung gestartet.</div>

  <div id="answerArea" class="hidden">
    <input id="answer" type="text" inputmode="decimal" placeholder="Antwort eingeben">
    <div id="navButtons">
      <button id="nextBtn">Weiter</button>
      <button id="finishBtn">Abgeben</button>
    </div>
  </div>

  <div id="result"></div>
</div>

<script>
/* =====================
   BASIS - PRÜFUNGSLOGIK
===================== */
const EXAM_TIME = 90 * 60;     // 90 Minuten
const TASKS_TOTAL = 10;
const POINTS_PER_TASK = 3;
const TOTAL_POINTS = TASKS_TOTAL * POINTS_PER_TASK;
const TEACHER_PIN = "1234";

/* =====================
   HILFSFUNKTIONEN
===================== */
function parseNum(v) {
  if (!v) return NaN;
  return parseFloat(v.replace(",", "."));
}

/* =====================
   STATE
===================== */
let tasks = [];
let current = 0;
let points = 0;
let timeLeft = 0;
let timerInt = null;
let running = false;

/* =====================
   PRÜFUNG - UI-LOGIK
===================== */
function startExam() {
  console.log("=== Prüfung wird gestartet ===");
  
  // Reset
  tasks = [];
  current = 0;
  points = 0;
  timeLeft = EXAM_TIME;
  running = true;

  // Alle verfügbaren Kategorien
  const allCategories = Object.keys(window.TASKPOOL);
  console.log("Verfügbare Kategorien:", allCategories);

  // Aufgaben generieren - verschiedene Kategorien
  for (let i = 0; i < TASKS_TOTAL; i++) {
    try {
      // Kategorie abwechselnd auswählen
      const catIndex = i % allCategories.length;
      const cat = allCategories[catIndex];
      
      // Zufällige Aufgabe aus dieser Kategorie
      const pool = window.TASKPOOL[cat];
      const randomIndex = Math.floor(Math.random() * pool.length);
      const taskData = pool[randomIndex]();
      
      tasks.push({
        text: taskData.task,
        sol: taskData.answer,
        category: cat
      });
      
      console.log(`Aufgabe ${i+1}: Kategorie ${cat} - generiert`);
    } catch (error) {
      console.error("Fehler:", error);
      // Fallback
      tasks.push({
        text: `Berechne: ${rand(10, 50)} + ${rand(10, 50)}`,
        sol: rand(20, 100),
        category: "fallback"
      });
    }
  }

  // UI aktualisieren
  document.getElementById("answerArea").classList.remove("hidden");
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("result").innerHTML = "";
  document.getElementById("startBtn").disabled = true;
  document.getElementById("answer").value = "";

  // Timer starten
  clearInterval(timerInt);
  timerInt = setInterval(updateTimer, 1000);
  
  // Erste Aufgabe anzeigen
  showTask();
}

function showTask() {
  if (current >= tasks.length) {
    finishExam();
    return;
  }
  
  const task = tasks[current];
  const categoryText = task.category ? ` (${task.category})` : '';
  document.getElementById("task").innerHTML =
    `<b>Aufgabe ${current+1}/${TASKS_TOTAL}${categoryText}</b><br>${task.text}`;
  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();
}

function saveAnswer() {
  const answerInput = document.getElementById("answer");
  const v = parseNum(answerInput.value);
  
  if (isNaN(v)) return false;
  
  const task = tasks[current];
  if (!task || typeof task.sol === 'undefined') return false;
  
  // Toleranz für Gleitkommazahlen
  const tolerance = Math.max(0.05, Math.abs(task.sol) * 0.01);
  const correct = Math.abs(v - task.sol) <= tolerance;
  
  if (correct) {
    points += POINTS_PER_TASK;
    console.log(`✓ Aufgabe ${current+1} richtig: ${v} = ${task.sol}`);
  } else {
    console.log(`✗ Aufgabe ${current+1} falsch: ${v} ≠ ${task.sol}`);
  }
  
  return correct;
}

function nextTask() {
  if (!running) return;
  
  saveAnswer();
  current++;
  
  if (current < TASKS_TOTAL) {
    showTask();
  } else {
    finishExam();
  }
}

function finishExam() {
  console.log("Prüfung wird beendet");
  
  if (!running) return;
  
  clearInterval(timerInt);
  running = false;

  // Letzte Aufgabe auswerten
  if (current < TASKS_TOTAL) {
    saveAnswer();
  }

  // PIN abfragen
  const pin = prompt("Lehrer-PIN eingeben (Demo: 1234):");
  if (pin !== TEACHER_PIN) {
    alert("Falsche PIN - Prüfung kann nicht abgeschlossen werden.");
    
    document.getElementById("answerArea").classList.add("hidden");
    document.getElementById("timer").classList.add("hidden");
    document.getElementById("startBtn").disabled = false;
    document.getElementById("result").innerHTML = "❌ Prüfung abgebrochen";
    
    return;
  }

  // Note berechnen
  const pct = Math.round(points / TOTAL_POINTS * 100);
  let note = "3";
  let noteText = "";
  
  if (pct >= 92) { note = "1"; noteText = "sehr gut"; }
  else if (pct >= 80) { note = "2"; noteText = "gut"; }
  else if (pct >= 67) { note = "3"; noteText = "befriedigend"; }
  else if (pct >= 50) { note = "4"; noteText = "ausreichend"; }
  else { note = "5"; noteText = "mangelhaft"; }

  // UI aktualisieren
  document.getElementById("answerArea").classList.add("hidden");
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("result").innerHTML = `
    <div style="background: #f0f8ff; padding: 20px; border-radius: 12px; border: 2px solid #1976d2;">
      <h2 style="margin-top: 0; color: #1976d2;">Prüfung abgeschlossen</h2>
      <div style="font-size: 1.5rem; margin: 15px 0;">
        Punkte: <b>${points}/${TOTAL_POINTS}</b> (${pct}%)
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #1976d2;">
        Note: ${note} (${noteText})
      </div>
    </div>
  `;
  
  document.getElementById("startBtn").disabled = false;
}

/* =====================
   TIMER
===================== */
function updateTimer() {
  if (!running) return;
  
  timeLeft--;
  
  if (timeLeft <= 0) {
    document.getElementById("timer").innerText = `⏱ 0:00 - Zeit abgelaufen!`;
    finishExam();
    return;
  }
  
  const m = Math.floor(timeLeft/60);
  const s = String(timeLeft%60).padStart(2,"0");
  document.getElementById("timer").innerText = `⏱ ${m}:${s}`;
  
  // Warnung bei weniger als 5 Minuten
  if (timeLeft < 300) {
    document.getElementById("timer").style.color = "#ff0000";
    document.getElementById("timer").style.fontWeight = "bold";
  } else {
    document.getElementById("timer").style.color = "darkred";
    document.getElementById("timer").style.fontWeight = "normal";
  }
}

/* =====================
   EVENTS
===================== */
document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const finishBtn = document.getElementById("finishBtn");
  const answerInput = document.getElementById("answer");
  
  console.log("TASKPOOL verfügbar:", Object.keys(window.TASKPOOL));
  
  startBtn.addEventListener("click", startExam);
  nextBtn.addEventListener("click", nextTask);
  finishBtn.addEventListener("click", finishExam);
  
  // Enter-Taste
  answerInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      nextTask();
    }
  });
});
</script>

</body>
</html>
