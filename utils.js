function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function scaleGameContainer() {
  const container = document.getElementById('game-container');
  if (!container) return;
  const baseWidth = 1400;
  const scale = Math.min(window.innerWidth / baseWidth, 1);
  container.style.transform = `scale(${scale})`;
  container.style.transformOrigin = 'center top';
}

window.addEventListener('resize', scaleGameContainer);
window.addEventListener('load', scaleGameContainer);

let contrastMode = false;
const contrastMapping = {
  "red": "#d7191c",
  "blue": "#2c7bb6",
  "green": "#1a9641",
  "yellow": "#fdae61",
  "orange": "#f46d43",
  "purple": "#542788",
  "pink": "#e7298a",
  "brown": "#a6611a",
  "gray": "#999999",
  "black": "#000000",
  "white": "#ffffff",
  "beige": "#fdae61",
  "gold": "#ffffbf",
  "cyan": "#80cdc1",
  "magenta": "#f46d43",
  "lime": "#a6d96a",
  "coral": "#e6ab02",
  "teal": "#008080",
  "olive": "#b8b8b8",
  "navy": "#000080",
  "maroon": "#800000",
  "silver": "#cccccc",
  "#cd7f32": "#8c510a",
  "violet": "#8c510a",
  "indigo": "#5e4fa2",
  "crimson": "#d53e4f",
  "peru": "#bf812d",
  "slateblue": "#3288bd",
  "darkgreen": "#1b7837",
  "darkred": "#b2182b",
  "darkblue": "#2166ac",
  "darkorange": "#e66101",
  "darkmagenta": "#8e0152",
  "darkcyan": "#35978f",
  "darkgoldenrod": "#fdb863",
  "darkkhaki": "#c7eae5",
  "darkolivegreen": "#80cdc1",
  "darkslategray": "#01665e",
  "darkviolet": "#5e3c99",
  "#FF4500": "#f46d43",
  "#2E8B57": "#1a9641",
  "#1E90FF": "#2c7bb6",
  "#DA70D6": "#d53e4f",
  "#FFD700": "#ffffbf",
  "#00CED1": "#80cdc1",
  "#8A2BE2": "#542788",
  "#FF69B4": "#e7298a",
  "#7FFF00": "#a6d96a",
  "#DC143C": "#b2182b",
  "#4B0082": "#5e4fa2"
};

function getDisplayColor(color) {
  return contrastMode && contrastMapping[color] ? contrastMapping[color] : color;
}

function updateContrastColors() {
  document.querySelectorAll('.piece').forEach(piece => {
    const color = getDisplayColor(piece.dataset.color);
    if (piece.classList.contains('shape-triangle')) {
      piece.style.borderBottomColor = color;
    } else {
      piece.style.backgroundColor = color;
    }
  });
}

function toggleContrastMode() {
  contrastMode = !contrastMode;
  updateContrastColors();
  const btn = document.getElementById('contrast-btn');
  btn.classList.toggle('active', contrastMode);
}
