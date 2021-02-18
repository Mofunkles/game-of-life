class GridView {
  parentElement = document.querySelector('.grid-canvas');

  renderCanvas = function (canvas, grid) {
    const { context, paths } = canvas;
    const { cellWidth: width, cellHeight: height } = grid;

    context.clearRect(
      0,
      0,
      this.parentElement.width,
      this.parentElement.height
    );
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (
          grid.cells[j * width + i] === 0 &&
          grid.cellsBuffer[j * width + i] === 0
        )
          continue;
        let deadOrAlive =
          grid.cells[j * width + i] === 1 ? `254, 96, 57` : '45, 50, 53';

        context.fillStyle = `rgb(${deadOrAlive})`;
        context.fill(paths[j * width + i]);
      }
    }
  };

  context(state) {
    if (!this.parentElement.getContext) return;

    const context = this.parentElement.getContext('2d');
    this.parentElement.setAttribute('width', state.screenWidth);
    this.parentElement.setAttribute('height', state.screenHeight);

    return context;
  }
}

export default new GridView();
