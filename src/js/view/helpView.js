class HelpView {
  parentElement = document.querySelector('.help');
  gridWidth = this.parentElement.querySelector('.gridwidth-number');
  gridHeight = this.parentElement.querySelector('.gridheight-number');
  cellCount = this.parentElement.querySelector('.cellcount-number');
  cellSize = this.parentElement.querySelector('.cellsize-number');

  addHandlerShowHelp(handler) {
    this.parentElement.addEventListener('mousedown', event => {
      const clicked = event.target.closest('.help');
      if (!clicked) return;

      if (!event.target.classList.contains('information-link')) handler();
    });
  }

  toggleVisibility() {
    this.parentElement.classList.toggle('hidden');
  }

  updateDetails(grid) {
    this.gridWidth.textContent = grid.cellWidth.toLocaleString();
    this.gridHeight.textContent = grid.cellHeight.toLocaleString();
    this.cellCount.textContent = grid.cellCount.toLocaleString();
    this.cellSize.textContent = grid.cellSize.toLocaleString();
  }
}

export default new HelpView();
