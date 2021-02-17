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

  renderGrid(grid) {
    this.parentElement.style.gridTemplateColumns = `repeat(${grid.cellWidth}, ${grid.cellSize}px)`;
    this.parentElement.style.gridTemplateRows = `repeat(${grid.cellHeight}, ${grid.cellSize}px)`;

    const markup = grid.cells.reduce(
      (html, cell, index) => (html += this._generateMarkup(cell, index)),
      ''
    );

    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateGrid(grid) {}

  _generateMarkup(cell, index) {
    return `<div class="cell ${
      cell === 1 ? 'alive' : ''
    }" data-index="${index}"></div>`;
  }
}

export default new GridView();
