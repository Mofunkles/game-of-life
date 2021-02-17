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

      if (!event.target.classList.contains('rules__link')) handler();
    });
  }

  toggleVisibility() {
    this.parentElement.classList.toggle('hidden');
  }

  updateDetails(grid) {
    this.gridWidth.textContent = grid.cellWidth;
    this.gridHeight.textContent = grid.cellHeight;
    this.cellCount.textContent = grid.cellCount;
    this.cellSize.textContent = grid.cellSize;
  }
}

export default new HelpView();
