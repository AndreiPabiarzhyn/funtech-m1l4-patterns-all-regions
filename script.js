document.addEventListener('DOMContentLoaded', () => {
  renderText();          // загружаем все тексты из text.js
  renderLevelButtons();  // создаём кнопки уровней

  // 🟢 Стартовая модалка
  const startModal = document.getElementById('start-modal');
  const startBtn = document.getElementById('start-game');

  startBtn.addEventListener('click', () => {
    startModal.classList.add('hidden');
    startModal.classList.remove('visible');

    // запускаем игру с первого уровня
    selectLevel(1);
    startTimer();
  });

  // 🟢 Модалка успеха
  document.getElementById('close-success').addEventListener('click', () => {
    document.getElementById('success-modal').classList.add('hidden');
    nextLevel();
  });

  // 🟢 Модалка ошибки
  document.getElementById('close-fail').addEventListener('click', () => {
    document.getElementById('fail-modal').classList.add('hidden');
  });
    document.getElementById('restart-btn').addEventListener('click', () => {
    document.getElementById('final-victory-overlay').classList.add('hidden');
    maxUnlockedLevel = 1;
    selectLevel(1);
    });
  // 🟢 Основные кнопки управления
  document.getElementById('check-btn').addEventListener('click', checkPattern);
  document.getElementById('reset-btn').addEventListener('click', () => loadLevel(currentLevel));
  document.getElementById('contrast-btn').addEventListener('click', toggleContrastMode);
});
