class GridView {
  parentElement = document.querySelector('.grid-canvas');

  renderCanvas = function (context, grid, paths) {
    const width = grid.cellWidth;
    const height = grid.cellHeight;

    context.clearRect(
      0,
      0,
      this.parentElement.width,
      this.parentElement.height
    );
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
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
