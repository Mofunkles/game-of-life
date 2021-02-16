import * as model from './model.js';
import GridView from './view/gridView.js';

const controlWindowResolution = function (event) {
  // 1. destructure window resize event
  // 2. update state for new window width and height
  // 3. generate grid

  const [observer] = event;
  const { width, height } = observer.contentRect;
  model.state.screenWidth = width;
  model.state.screenHeight = height;
};

const controlGenerateGrid = function () {
  // 1. generate grid object
  // 2. render grid from grid object

  model.generateGrid();
  GridView.renderGrid(model.state.grid);
};

// Initialise
(function () {
  controlGenerateGrid();
  const resize = new ResizeObserver(controlWindowResolution);
  resize.observe(GridView.parentElement);
})();
