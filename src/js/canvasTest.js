import { randomNumber } from './utility.js';

const canvas = document.querySelector('.canvas');

export const context = function (state) {
  if (!canvas.getContext) return;

  const dpi = window.devicePixelRatio;
  const context = canvas.getContext('2d');
  canvas.setAttribute('width', state.screenWidth * dpi);
  canvas.setAttribute('height', state.screenHeight * dpi);

  return context;
};

export const paths = function (grid) {
  const size = grid.cellSize;
  const width = grid.cellWidth;
  const height = grid.cellHeight;

  const paths = [];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = new Path2D();
      cell.arc(i * size, j * size, size / 2, Math.PI * 2, false);
      paths[j * width + i] = cell;
    }
  }

  return paths;
};

export const updateCanvas = function (context, grid, paths) {
  const size = grid.cellSize;
  const width = grid.cellWidth;
  const height = grid.cellHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let deadOrAlive =
        grid.cells[j * width + i] === 1 ? `254, 96, 57` : '45, 50, 53';

      //context.clearRect(i * size, j * size, size, size);
      context.fillStyle = `rgb(${deadOrAlive})`;
      context.fill(paths[j * width + i]);
    }
  }
};
