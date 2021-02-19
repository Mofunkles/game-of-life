import { TICK_RATE } from './config.js';
import * as model from './model.js';
import GridView from './view/gridView.js';
import HelpView from './view/helpView.js';
import PanelView from './view/panelView.js';

const controlWindowResolution = function (event) {
  const [observer] = event;
  const { width, height } = observer.contentRect;
  model.state.screenWidth = width;
  model.state.screenHeight = height;

  controlGenerateGrid();
};

const controlGenerateGrid = function (initial = 'random') {
  model.state.canvas.context = GridView.context(model.state);
  model.generateGrid(initial);
  GridView.renderCanvas(model.state.canvas, model.state.grid);
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
    model.generatePaths();
    GridView.renderCanvas(model.state.canvas, model.state.grid);
    PanelView.updateGenerations(model.state.grid.generation);
    PanelView.updateLiveCells(model.state.grid.liveCells);
    model.swapBuffer();
  }, TICK_RATE);
};

const controlStopSimulation = function () {
  clearInterval(model.state.simulation);
  model.state.simulation = null;
};

const controlInitialRandom = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('random');
};

const controlInitialLine = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('line');
};

const controlInitialBunnies = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('bunnies');
};

const controlInitialGosper = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('gosper');
};

(function () {
  const resize = new ResizeObserver(controlWindowResolution);
  resize.observe(GridView.parentElement);

  PanelView.addHandlerButton({
    help: controlShowHelp,
    start: controlStartSimulation,
    stop: controlStopSimulation,
    random: controlInitialRandom,
    line: controlInitialLine,
    bunnies: controlInitialBunnies,
    gosper: controlInitialGosper,
  });

  HelpView.addHandlerShowHelp(controlShowHelp);
})();
