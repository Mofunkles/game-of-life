import { TICK_RATE } from './config.js';
import * as model from './model.js';
import GridView from './view/gridView.js';
import HelpView from './view/helpView.js';
import PanelView from './view/panelView.js';

/////////////////////////////////
/// TODO LIST
/////////////////////////////////
//
//  - Remake statistics panel to be opaque
//  - Cell painting when holding down mouse
//
/////////////////////////////////

const controlWindowResolution = function (event) {
  // 1. destructure window resize event
  // 2. update state for new window width and height
  // 3. generate grid

  const [observer] = event;
  const { width, height } = observer.contentRect;
  model.state.screenWidth = width;
  model.state.screenHeight = height;
};

const controlGenerateGrid = function (pattern = 'random') {
  // 1. generate grid object
  // 2. render grid from grid object
  // 3. update panel statistics

  model.generateGrid(pattern);
  model.state.canvas.context = GridView.context(model.state);
  GridView.renderCanvas(
    model.state.canvas.context,
    model.state.grid,
    model.state.canvas.paths
  );
  PanelView.updateGenerations(model.state.grid.generation);
  PanelView.updateLiveCells(model.state.grid.liveCells);
  HelpView.updateDetails(model.state.grid);
};

const controlShowHelp = function () {
  HelpView.toggleVisibility();
};

const controlStartSimulation = function () {
  model.state.simulation = setInterval(() => {
    model.simulateGeneration();
    GridView.renderCanvas(
      model.state.canvas.context,
      model.state.grid,
      model.state.canvas.paths
    );
    PanelView.updateGenerations(model.state.grid.generation);
    PanelView.updateLiveCells(model.state.grid.liveCells);
    model.swapBuffer();
  }, TICK_RATE);
};

const controlStopSimulation = function () {
  clearInterval(model.state.simulation);
  model.state.simulation = null;
};

const controlInitialClear = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('clear');
};

const controlInitialFill = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('fill');
};

const controlInitialRandom = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('random');
};

const controlInitialGosper = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('gosper');
};

// Initialise
(function () {
  controlGenerateGrid();
  const resize = new ResizeObserver(controlWindowResolution);
  resize.observe(GridView.parentElement);

  // send multiple handlers as an object
  PanelView.addHandlerButton({
    help: controlShowHelp,
    start: controlStartSimulation,
    stop: controlStopSimulation,
    clear: controlInitialClear,
    fill: controlInitialFill,
    random: controlInitialRandom,
    gosper: controlInitialGosper,
  });

  HelpView.addHandlerShowHelp(controlShowHelp);
})();
