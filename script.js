const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "Stay focused and keep improving every day.",
  "Speed and accuracy are key in typing tests.",
  "Consistency is more important than speed."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerText = document.getElementById("timer");
const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const themeSwitch = document.getElementById("themeSwitch");
const highScoreEl = document.getElementById("highScore");

let quote = "";
let timer = 0;
let interval = null;
let started = false;

function getHighScore() {
  const data = JSON.parse(localStorage.getItem("highScore")) || { wpm: 0, accuracy: 0 };
  highScoreEl.textContent = `WPM ${data.wpm}, Accuracy ${data.accuracy}%`;
}

function setHighScore(wpm, accuracy) {
  const current = JSON.parse(localStorage.getItem("highScore")) || { wpm: 0, accuracy: 0 };
  if (wpm > current.wpm || (wpm === current.wpm && accuracy > current.accuracy)) {
    localStorage.setItem("highScore", JSON.stringify({ wpm, accuracy }));
    getHighScore();
  }
}

function startTest() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = quote.split('').map(c => `<span>${c}</span>`).join('');
  quoteInput.value = '';
  quoteInput.disabled = false;
  quoteInput.focus();
  timer = 0;
  timerText.textContent = 0;
  wpmText.textContent = 0;
  accuracyText.textContent = 100;
  started = true;

  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerText.textContent = timer;
    calculateWPM();
  }, 1000);
}

function resetTest() {
  clearInterval(interval);
  quoteInput.value = '';
  quoteInput.disabled = true;
  quoteDisplay.innerHTML = '';
  timerText.textContent = 0;
  wpmText.textContent = 0;
  accuracyText.textContent = 100;
  started = false;
}

function calculateWPM() {
  const words = quoteInput.value.trim().split(/\s+/).filter(Boolean);
  const wpm = Math.round((words.length / timer) * 60) || 0;
  wpmText.textContent = wpm;
}

function calculateAccuracy() {
  const input = quoteInput.value;
  const quoteSpans = quoteDisplay.querySelectorAll('span');
  let correct = 0;

  quoteSpans.forEach((span, i) => {
    const char = input[i];
    if (!char) {
      span.classList.remove('correct', 'incorrect');
    } else if (char === span.textContent) {
      span.classList.add('correct');
      span.classList.remove('incorrect');
      correct++;
    } else {
      span.classList.add('incorrect');
      span.classList.remove('correct');
    }
  });

  const accuracy = Math.round((correct / quote.length) * 100) || 0;
  accuracyText.textContent = accuracy;
  return { correct, accuracy };
}

quoteInput.addEventListener("input", () => {
  calculateAccuracy();
  if (quoteInput.value === quote) {
    clearInterval(interval);
    quoteInput.disabled = true;
    const { accuracy } = calculateAccuracy();
    const wpm = parseInt(wpmText.textContent);
    setHighScore(wpm, accuracy);
  }
});

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);

themeSwitch.addEventListener("change", () => {
  const isLight = themeSwitch.checked;
  document.body.classList.toggle("light", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Load saved theme
window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
    themeSwitch.checked = true;
  }
  getHighScore();
};
