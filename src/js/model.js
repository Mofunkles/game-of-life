import {
  GRID_SIZE_SMALL,
  GRID_SIZE_MEDIUM,
  GRID_SIZE_LARGE,
  RANDOM_LOWER_BIAS,
  RANDOM_UPPER_BIAS,
} from './config.js';
import { randomNumber, randomBinary } from './utility.js';
import { generatePattern } from './patterns.js';

export const state = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  size: 'medium',
  pattern: 'random',
  resize: null,
  simulation: null,
  view: null,
  canvas: {
    context: null,
    path: null,
  },
  grid: {
    cells: [],
    cellsBuffer: [],
    cellNeighboursMap: [],
    cellWidth: 0,
    cellHeight: 0,
    cellSize: 0,
    cellCount: 0,
    generation: 0,
    liveCells: 0,
  },
};

const resetGrid = function () {
  state.grid.cells = [];
  state.grid.cellsBuffer = [];
  state.grid.cellNeighboursMap = [];
  state.grid.cellWidth = 0;
  state.grid.cellHeight = 0;
  state.grid.cellSize = 0;
  state.grid.cellCount = 0;
  state.grid.generation = 0;
  state.grid.liveCells = 0;
};

const generateCells = function () {
  const seed = randomNumber(RANDOM_LOWER_BIAS, RANDOM_UPPER_BIAS);
  const pattern =
    state.pattern !== 'random'
      ? generatePattern(state.pattern, state.grid, state.size)
      : null;

  for (let i = 0; i < state.grid.cellCount; i++) {
    if (state.pattern === 'random') state.grid.cells.push(randomBinary(seed));
    else state.grid.cells.push(pattern.some(coord => coord === i) ? 1 : 0);

    if (state.grid.cells[i] === 1) state.grid.liveCells++;
    state.grid.cellNeighboursMap.push(cellNeighbours(i));
  }

  state.grid.cellsBuffer = [...state.grid.cells];
};

export const generatePaths = function () {
  const { cellSize: size, cellWidth: width, cellHeight: height } = state.grid;
  const path = new Path2D();
  const shape = size > 3 ? 'arc' : 'rect';

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (
        (state.grid.cells[j * width + i] === 0 &&
          state.grid.cellsBuffer[j * width + i] === 0) ||
        (state.grid.cells[j * width + i] === 1 &&
          state.grid.cellsBuffer[j * width + i] === 0)
      )
        continue;

      path.moveTo(i * size, j * size);
      shape === 'arc'
        ? path.arc(i * size, j * size, size / 2, Math.PI * 2, false)
        : path.rect(i * size, j * size, size, size);
    }
  }

  state.canvas.path = path;
};

export const generateGrid = function (pattern, size) {
  resetGrid();
  if (size === 'small') state.size = GRID_SIZE_SMALL;
  if (size === 'medium') state.size = GRID_SIZE_MEDIUM;
  if (size === 'large') state.size = GRID_SIZE_LARGE;
  state.pattern = pattern;

  const long = state.screenWidth < state.screenHeight ? 'Height' : 'Width';
  const short = long === 'Height' ? 'Width' : 'Height';

  state.grid.cellSize = Math.floor(state[`screen${long}`] / state.size);
  if (state.grid.cellSize <= 1) state.grid.cellSize = 2;

  state.grid[`cell${long}`] =
    state.size +
    Math.floor(
      (state[`screen${long}`] - state.grid.cellSize * state.size) /
        state.grid.cellSize
    );

  state.grid[`cell${short}`] = Math.floor(
    state[`screen${short}`] / state.grid.cellSize
  );

  state.grid.cellCount = state.grid.cellWidth * state.grid.cellHeight;

  generateCells();
  generatePaths();
};

const checkRange = function (index) {
  const { cellCount } = state.grid;
  if (index >= 0 && index < cellCount) return true;
  return false;
};

const checkLeft = function (index) {
  const { cellWidth: width } = state.grid;
  if (checkRange(index - 1) && index % width !== 0) return true;
  return false;
};

const checkRight = function (index) {
  const { cellWidth: width } = state.grid;
  if (checkRange(index + 1) && (index + 1) % width !== 0) return true;
  return false;
};

const checkTop = function (index) {
  const { cellWidth: width } = state.grid;
  if (checkRange(index - width)) return true;
  return false;
};

const checkBottom = function (index) {
  const { cellWidth: width } = state.grid;
  if (checkRange(index + width)) return true;
  return false;
};

const checkTopLeft = function (index) {
  if (checkTop(index) && checkLeft(index)) return true;
  return false;
};

const checkTopRight = function (index) {
  if (checkTop(index) && checkRight(index)) return true;
  return false;
};

const checkBottomLeft = function (index) {
  if (checkBottom(index) && checkLeft(index)) return true;
  return false;
};

const checkBottomRight = function (index) {
  if (checkBottom(index) && checkRight(index)) return true;
  return false;
};

const cellNeighbours = function (index) {
  const { cellWidth: width } = state.grid;
  const neighbours = [];

  neighbours.push(checkTopLeft(index) ? index - width - 1 : null);
  neighbours.push(checkTop(index) ? index - width : null);
  neighbours.push(checkTopRight(index) ? index - width + 1 : null);
  neighbours.push(checkLeft(index) ? index - 1 : null);
  neighbours.push(checkRight(index) ? index + 1 : null);
  neighbours.push(checkBottomLeft(index) ? index + width - 1 : null);
  neighbours.push(checkBottom(index) ? index + width : null);
  neighbours.push(checkBottomRight(index) ? index + width + 1 : null);

  return neighbours;
};

const neighboursCount = function (index) {
  return state.grid.cellNeighboursMap[index]
    .filter(cell => cell != null)
    .map(cell => state.grid.cells[cell])
    .reduce((sum, cell) => (sum += cell), 0);
};

const deadOrAlive = function (cell, neighbours) {
  if (cell === 1 && neighbours >= 2 && neighbours <= 3) return true;
  if (cell === 0 && neighbours === 3) {
    state.grid.liveCells++;
    return true;
  }

  if (cell === 1) state.grid.liveCells--;
  return false;
};

export const swapBuffer = function () {
  state.grid.cells = [...state.grid.cellsBuffer];
};

export const simulateGeneration = function () {
  state.grid.cells.forEach((cell, index) => {
    state.grid.cellsBuffer[index] = deadOrAlive(cell, neighboursCount(index))
      ? 1
      : 0;
  });
  state.grid.generation++;
};
