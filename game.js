// === Глобальные переменные ===
const levels = [
// Уровень 1
  [
    { shape: 'square', color: 'red' },
    { shape: 'circle', color: 'blue' },
    { shape: 'triangle', color: 'green' },
    { shape: 'square', color: 'yellow' }
  ],
  // Уровень 2
  [
    { shape: 'circle', color: 'orange' },
    { shape: 'triangle', color: 'purple' },
    { shape: 'square', color: 'pink' },
    { shape: 'circle', color: 'brown' },
    { shape: 'triangle', color: 'gray' }
  ],
  // Уровень 3
  [
    { shape: 'triangle', color: 'black' },
    { shape: 'square', color: 'white' },
    { shape: 'circle', color: 'beige' },
    { shape: 'triangle', color: 'gold' },
    { shape: 'square', color: 'cyan' },
    { shape: 'circle', color: 'magenta' }
  ],
  // Уровень 4 – 7 элементов
  [
    { shape: 'square', color: 'red' },
    { shape: 'triangle', color: 'blue' },
    { shape: 'circle', color: 'green' },
    { shape: 'square', color: 'purple' },
    { shape: 'triangle', color: 'orange' },
    { shape: 'circle', color: 'yellow' },
    { shape: 'square', color: 'pink' }
  ],
  // Уровень 5 – 8 элементов
  [
    { shape: 'circle', color: 'magenta' },
    { shape: 'square', color: 'cyan' },
    { shape: 'triangle', color: 'lime' },
    { shape: 'circle', color: 'coral' },
    { shape: 'square', color: 'teal' },
    { shape: 'triangle', color: 'olive' },
    { shape: 'circle', color: 'navy' },
    { shape: 'square', color: 'maroon' }
  ],
  // Уровень 6 – 9 элементов
  [
    { shape: 'triangle', color: 'gold' },
    { shape: 'circle', color: 'silver' },
    { shape: 'square', color: '#cd7f32' }, // бронзовый
    { shape: 'triangle', color: 'violet' },
    { shape: 'circle', color: 'indigo' },
    { shape: 'square', color: 'crimson' },
    { shape: 'triangle', color: 'peru' },
    { shape: 'circle', color: 'slateblue' },
    { shape: 'square', color: 'darkgreen' }
  ],
  // Уровень 7 – 10 элементов
  [
    { shape: 'square', color: 'darkred' },
    { shape: 'circle', color: 'darkblue' },
    { shape: 'triangle', color: 'darkorange' },
    { shape: 'square', color: 'darkmagenta' },
    { shape: 'circle', color: 'darkcyan' },
    { shape: 'triangle', color: 'darkgoldenrod' },
    { shape: 'square', color: 'darkkhaki' },
    { shape: 'circle', color: 'darkolivegreen' },
    { shape: 'triangle', color: 'darkslategray' },
    { shape: 'square', color: 'darkviolet' }
  ],
  // Уровень 8 – 11 элементов
  [
    { shape: 'triangle', color: '#FF4500' },
    { shape: 'square', color: '#2E8B57' },
    { shape: 'circle', color: '#1E90FF' },
    { shape: 'triangle', color: '#DA70D6' },
    { shape: 'square', color: '#FFD700' },
    { shape: 'circle', color: '#00CED1' },
    { shape: 'triangle', color: '#8A2BE2' },
    { shape: 'square', color: '#FF69B4' },
    { shape: 'circle', color: '#7FFF00' },
    { shape: 'triangle', color: '#DC143C' },
    { shape: 'square', color: '#4B0082' }
  ]
];

let currentLevel = 0;
let startTime;
let timerInterval;
let maxUnlockedLevel = 1;

function loadLevel(levelIndex) {
  currentLevel = levelIndex;
  const patternArea = document.getElementById('pattern');
  const workspace = document.getElementById('workspace');
  const piecesArea = document.getElementById('pieces');

  patternArea.innerHTML = '';
  workspace.innerHTML = '';
  piecesArea.innerHTML = '';

  const data = levels[levelIndex];

  data.forEach(item => patternArea.appendChild(createPiece(item)));

  shuffleArray([...data]).forEach(item => {
    const piece = createPiece(item);
    piece.setAttribute('draggable', true);
    piece.addEventListener('dragstart', dragStart);
    piecesArea.appendChild(piece);
  });

  makeDroppable(workspace);
  updateLevelButtons();
}

function startTimer() {
  clearInterval(timerInterval);
  const timer = document.getElementById('timer');
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const m = Math.floor(seconds / 60);
    const s = (seconds % 60).toString().padStart(2, '0');
    timer.textContent = `${TEXT.timerLabel}: ${m}:${s}`;
  }, 1000);
}

function checkPattern() {
  const ws = Array.from(document.getElementById('workspace').children)
    .map(p => ({ shape: p.dataset.shape, color: p.dataset.color }));
  const correct = JSON.stringify(ws) === JSON.stringify(levels[currentLevel]);

  if (correct) {
    clearInterval(timerInterval);
    document.getElementById('success-modal').classList.remove('hidden');

    maxUnlockedLevel = Math.max(maxUnlockedLevel, currentLevel + 2);
    updateLevelButtons();
  } else {
    document.getElementById('fail-modal').classList.remove('hidden');
  }
}

function updateLevelButtons() {
  for (let i = 1; i <= levels.length; i++) {
    const btn = document.getElementById(`level-${i}`);
    if (btn) {
      btn.disabled = i > maxUnlockedLevel;
      btn.classList.toggle('active', i - 1 === currentLevel);
    }
  }
}

function selectLevel(levelNum) {
  if (levelNum > maxUnlockedLevel) return;
  currentLevel = levelNum - 1;
  loadLevel(currentLevel);
  startTimer();
  updateLevelButtons();
}

function nextLevel() {
  document.getElementById('success-modal').classList.add('hidden');

  if (currentLevel < levels.length - 1) {
    selectLevel(currentLevel + 2);
  } else {
    document.getElementById('final-victory-overlay').classList.remove('hidden');
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
