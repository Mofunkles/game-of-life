import { GRID_SIZE } from './config.js';
import { randomBinary } from './utility.js';
import { gosper } from './patterns.js';

export const state = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  simulation: null,
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

const generateCells = function (pattern) {
  //1. loop over cell count
  //2. generate corresponding pattern
  //3. map cell neighbours for each cell

  // custom pattern
  const prefab = pattern === 'gosper' ? gosper(state.grid.cellWidth) : null;

  for (let i = 0; i < state.grid.cellCount; i++) {
    if (pattern === 'clear') state.grid.cells.push(0);
    if (pattern === 'fill') state.grid.cells.push(1);
    if (pattern === 'random') state.grid.cells.push(randomBinary());
    if (prefab)
      state.grid.cells.push(prefab.some(coord => coord === i) ? 1 : 0);
    if (state.grid.cells[i] === 1) state.grid.liveCells++;
    state.grid.cellNeighboursMap.push(cellNeighbours(i));
  }
};

export const generateGrid = function (pattern) {
  resetGrid();

  // determine long / short axis
  const long = state.screenWidth < state.screenHeight ? 'Height' : 'Width';
  const short = long === 'Height' ? 'Width' : 'Height';

  // cell size is to be a square at any screen resolution or orientation
  // cell size is the longer screen axis divided by desired grid size
  // longer grid axis is assigned grid size from config
  // shorter grid axis is the shorter screen axis devided by cell size
  state.grid.cellSize = Math.ceil(state[`screen${long}`] / GRID_SIZE);
  state.grid[`cell${long}`] = GRID_SIZE;
  state.grid[`cell${short}`] = Math.ceil(
    state[`screen${short}`] / state.grid.cellSize
  );
  state.grid.cellCount = state.grid.cellWidth * state.grid.cellHeight;

  generateCells(pattern);
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
  // apply the game rules
  if (cell === 1 && neighbours >= 2 && neighbours <= 3) return true;
  if (cell === 0 && neighbours === 3) {
    state.grid.liveCells++;
    return true;
  }

  if (cell === 1) state.grid.liveCells--;
  return false;
};

export const simulateGeneration = function () {
  // 1. generate cell buffer
  // 2. apply rules to buffer
  // 3. swap buffer

  state.grid.cellsBuffer = [...state.grid.cells];
  state.grid.cells.forEach((cell, index) => {
    state.grid.cellsBuffer[index] = deadOrAlive(cell, neighboursCount(index))
      ? 1
      : 0;
  });
  state.grid.cells = [...state.grid.cellsBuffer];
  state.grid.generation++;
};

export const updateCell = function (index) {
  state.grid.cells[index] = state.grid.cells[index] === 1 ? 0 : 1;
};
