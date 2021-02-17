class GridView {
  parentElement = document.querySelector('.grid-container');

  addHandlerToggleCell(handler) {
    this.parentElement.addEventListener('mousedown', event => {
      const clicked = event.target.closest('.cell');
      if (!clicked) return;

      handler(clicked);
    });
  }

  toggleCellLiving(cell) {
    cell.classList.toggle('alive');
  }

  renderLoader() {
    this.parentElement.innerHTML = '';
    this.parentElement.style.gridTemplateColumns = `1fr`;
    this.parentElement.style.gridTemplateRows = `1fr`;
    this.parentElement.style.placeItems = 'center';

    const markup = `
      <div class="loader">
        <div class="loader__cell loader__cell--1"></div>
        <div class="loader__cell loader__cell--2"></div>
        <div class="loader__cell loader__cell--3"></div>
      </div>`;

    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderGrid(grid) {
    this.parentElement.innerHTML = '';
    this.parentElement.style.gridTemplateColumns = `repeat(${grid.cellWidth}, ${grid.cellSize}px)`;
    this.parentElement.style.gridTemplateRows = `repeat(${grid.cellHeight}, ${grid.cellSize}px)`;
    this.parentElement.style.placeItems = 'initial';

    const markup = grid.cells.reduce(
      (html, cell, index) => (html += this._generateMarkup(cell, index)),
      ''
    );

    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateGrid(grid) {
    const renderedCells = [...this.parentElement.querySelectorAll('.cell')];

    const differences = grid.cells
      .map((cell, index) => (cell !== grid.cellsBuffer[index] ? index : null))
      .filter(cell => cell !== null);

    differences.forEach(index => {
      this.toggleCellLiving(renderedCells[index]);
    });
  }

  _generateMarkup(cell, index) {
    return `<div class="cell ${
      cell === 1 ? 'alive' : ''
    }" data-index="${index}"></div>`;
  }
}

export default new GridView();
