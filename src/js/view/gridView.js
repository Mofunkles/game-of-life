class GridView {
  parentElement = document.querySelector('.grid-container');

  renderGrid(grid) {
    this.parentElement.style.gridTemplateColumns = `repeat(${grid.cellWidth}, ${grid.cellSize}px)`;
    this.parentElement.style.gridTemplateRows = `repeat(${grid.cellHeight}, ${grid.cellSize}px)`;

    const markup = grid.cells.reduce(
      (html, cell) => (html += this._generateMarkup(cell)),
      ''
    );

    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateGrid(grid) {}

  _generateMarkup(cell) {
    return `<div class="cell ${cell === 1 ? 'alive' : ''}"></div>`;
  }
}

export default new GridView();
