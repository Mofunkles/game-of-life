import { SIMULATION_RATE, VIEW_RATE } from './config.js';
import * as model from './model.js';
import GridView from './view/gridView.js';
import HelpView from './view/helpView.js';
import OptionsView from './view/optionsView.js';
import PanelView from './view/panelView.js';

// mousedown -> +mousemove -> mouseup -> -mousemove
// mousemove -> find coords -> add to grid

const controlWindowResolution = function (event) {
  const [observer] = event;
  const { width, height } = observer.contentRect;
  model.state.screenWidth = width;
  model.state.screenHeight = height;

  clearTimeout(model.state.resize);
  model.state.resize = setTimeout(() => {
    controlGenerateGrid(model.state.pattern, model.state.size);
  }, VIEW_RATE);
};

const controlGenerateGrid = function (initial, size) {
  model.state.canvas.context = GridView.context(model.state);
  model.generateGrid(initial, size);
  GridView.renderCanvas(model.state.canvas);
  PanelView.updateGenerations(model.state.grid.generation);
  PanelView.updateLiveCells(model.state.grid.liveCells);
  HelpView.updateDetails(model.state.grid);
};

const controlGridSize = function (size) {
  controlGenerateGrid(model.state.pattern, size);
};

const controlShowHelp = function (visible) {
  HelpView.toggleVisibility(visible);
};

const controlShowOptions = function (visible) {
  OptionsView.toggleVisibility(visible);
};

const controlStartSimulation = function () {
  model.state.simulation = setInterval(() => {
    model.simulateGeneration();
    model.generatePaths();
    GridView.renderCanvas(model.state.canvas);
    model.swapBuffer();
  }, SIMULATION_RATE);

  model.state.view = setInterval(() => {
    PanelView.updateGenerations(model.state.grid.generation);
    PanelView.updateLiveCells(model.state.grid.liveCells);
  }, VIEW_RATE);
};

const controlStopSimulation = function () {
  clearInterval(model.state.simulation);
  clearInterval(model.state.view);
  model.state.simulation = null;
  model.state.view = null;
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

const controlPaint = function (event) {
  event.type === 'touchmove'
    ? model.updateCell(event.touches[0].clientX, event.touches[0].clientY)
    : model.updateCell(event.clientX, event.clientY);
  model.generatePaths();
  GridView.renderCanvas(model.state.canvas);
  PanelView.updateLiveCells(model.state.grid.liveCells);
};

(function () {
  const resize = new ResizeObserver(controlWindowResolution);
  resize.observe(GridView.parentElement);

  GridView.addHandlerPaint(controlPaint);

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
  OptionsView.addHandlerShowOptions(controlShowOptions);
  OptionsView.addHandlerButton(controlGridSize);
})();
