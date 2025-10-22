function renderText() {
  // Заголовки и правила
  const gameTitle = document.getElementById("game-title");
  if (gameTitle) gameTitle.textContent = TEXT.title;

  const rulesTitle = document.getElementById("rules-title");
  if (rulesTitle) rulesTitle.textContent = TEXT.rulesTitle;

  const rulesList = document.getElementById("rules-list");
  if (rulesList) {
    rulesList.innerHTML = "";
    TEXT.rules.forEach(line => {
      const li = document.createElement("li");
      li.textContent = line;
      rulesList.appendChild(li);
    });
  }

  // Кнопки
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("check-btn", TEXT.buttons.check);
  setText("reset-btn", TEXT.buttons.reset);
  setText("contrast-btn", TEXT.buttons.contrast);
  setText("next-btn", TEXT.buttons.next);
  setText("restart-btn", TEXT.buttons.restart);

  // Модалки
  const startGame = document.getElementById("start-game");
  if (startGame) startGame.textContent = TEXT.start;

  const successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.querySelector("h2").textContent = TEXT.modals.successTitle;
    successModal.querySelector("img").src = TEXT.modals.successImg;
    successModal.querySelector("button").textContent = TEXT.buttons.ok;
  }

  const failModal = document.getElementById("fail-modal");
  if (failModal) {
    failModal.querySelector("h2").textContent = TEXT.modals.failTitle;
    failModal.querySelector("img").src = TEXT.modals.failImg;
    failModal.querySelector("button").textContent = TEXT.buttons.ok;
  }

  const finalVictory = document.getElementById("final-victory-overlay");
  if (finalVictory) {
    finalVictory.querySelector("h2").textContent = TEXT.modals.finalTitle;
    finalVictory.querySelector("p").textContent = TEXT.modals.finalText;
  }
}

function renderLevelButtons(totalLevels = 8) {
  const levelsContainer = document.getElementById("levels");
  levelsContainer.innerHTML = "";

  for (let i = 1; i <= totalLevels; i++) {
    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.id = `level-${i}`;
    btn.textContent = `${TEXT.levelPrefix} ${i}`;
    btn.disabled = i > maxUnlockedLevel;
    btn.addEventListener("click", () => {
      if (!btn.disabled) selectLevel(i);
    });
    levelsContainer.appendChild(btn);
  }
}


function createPiece(item) {
  const piece = document.createElement('div');
  piece.className = 'piece';
  piece.dataset.shape = item.shape;
  piece.dataset.color = item.color;

  switch (item.shape) {
    case 'circle':
      piece.classList.add('shape-circle');
      piece.style.backgroundColor = item.color;
      break;
    case 'triangle':
      piece.classList.add('shape-triangle');
      piece.style.borderBottomColor = item.color;
      break;
    default:
      piece.classList.add('shape-square');
      piece.style.backgroundColor = item.color;
  }
  return piece;
}

function dragStart(event) {
  const piece = event.target;
  event.dataTransfer.setData("shape", piece.dataset.shape);
  event.dataTransfer.setData("color", piece.dataset.color);
}

function makeDroppable(area) {
  if (area.dataset.droppable === 'true') return;
  area.dataset.droppable = 'true';
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', e => {
    e.preventDefault();
    const shape = e.dataTransfer.getData("shape");
    const color = e.dataTransfer.getData("color");
    addPieceToWorkspace({ shape, color });
  });
}

function addPieceToWorkspace(item) {
  const piece = createPiece(item);
  piece.removeAttribute('draggable');
  piece.addEventListener('click', () => piece.remove());
  document.getElementById('workspace').appendChild(piece);
}
