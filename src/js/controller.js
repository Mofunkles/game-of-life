import { TICK_RATE } from './config.js';
import * as model from './model.js';
import GridView from './view/gridView.js';
import HelpView from './view/helpView.js';
import OptionsView from './view/optionsView.js';
import PanelView from './view/panelView.js';

const controlWindowResolution = function (event) {
  const [observer] = event;
  const { width, height } = observer.contentRect;
  model.state.screenWidth = width;
  model.state.screenHeight = height;

  controlGenerateGrid(model.state.pattern, model.state.size);
};

const controlGenerateGrid = function (initial, size) {
  model.state.canvas.context = GridView.context(model.state);
  model.generateGrid(initial, size);
  GridView.renderCanvas(model.state.canvas, model.state.grid);
  PanelView.updateGenerations(model.state.grid.generation);
  PanelView.updateLiveCells(model.state.grid.liveCells);
  HelpView.updateDetails(model.state.grid);
};

const controlGridSize = function (size) {
  controlGenerateGrid(model.state.pattern, size);
};

const controlShowHelp = function () {
  HelpView.toggleVisibility();
};

const controlShowOptions = function () {
  OptionsView.toggleVisibility();
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

  controlGenerateGrid('random', model.state.size);
};

const controlInitialLine = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('line', model.state.size);
};

const controlInitialBunnies = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('bunnies', model.state.size);
};

const controlInitialGosper = function () {
  if (model.state.simulation) {
    controlStopSimulation();
    PanelView.toggleControlButton();
  }

  controlGenerateGrid('gosper', model.state.size);
};

(function () {
  const resize = new ResizeObserver(controlWindowResolution);
  resize.observe(GridView.parentElement);

  PanelView.addHandlerButton({
    start: controlStartSimulation,
    stop: controlStopSimulation,
    random: controlInitialRandom,
    line: controlInitialLine,
    bunnies: controlInitialBunnies,
    gosper: controlInitialGosper,
    help: controlShowHelp,
    options: controlShowOptions,
  });

  HelpView.addHandlerShowHelp(controlShowHelp);
  OptionsView.addHandlerShowOptions({
    options: controlShowOptions,
    button: controlGridSize,
  });
})();
