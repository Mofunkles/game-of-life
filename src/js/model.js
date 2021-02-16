import { GRID_SIZE } from './config.js';
import { randomBinary } from './utility.js';

export const state = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  grid: {
    cells: [],
    cellsBuffer: [],
    cellWidth: 0,
    cellHeight: 0,
    cellSize: 0,
    cellCount: 0,
  },
};

export const generateGrid = function () {
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

  generateCells();
};

export const generateCells = function (pattern = 'random') {
  //1. loop over cell count
  //2. generate corresponding pattern

  for (let i = 0; i < state.grid.cellCount; i++) {
    if (pattern === 'random') state.grid.cells.push(randomBinary());
  }
};
