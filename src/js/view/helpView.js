class HelpView {
  parentElement = document.querySelector('.help');
  modalBackground = document.querySelector('.modal-background');
  gridWidth = this.parentElement.querySelector('.gridwidth-number');
  gridHeight = this.parentElement.querySelector('.gridheight-number');
  cellCount = this.parentElement.querySelector('.cellcount-number');
  cellSize = this.parentElement.querySelector('.cellsize-number');

  addHandlerShowHelp(handler) {
    this.modalBackground.addEventListener('mousedown', event => {
      handler();
    });
  }

  toggleVisibility(visible = false) {
    this.parentElement.classList.add('hidden');
    this.modalBackground.classList.add('hidden');

    if (visible) {
      this.parentElement.classList.remove('hidden');
      this.modalBackground.classList.remove('hidden');
    }
  }

  updateDetails(grid) {
    this.gridWidth.textContent = grid.cellWidth.toLocaleString();
    this.gridHeight.textContent = grid.cellHeight.toLocaleString();
    this.cellCount.textContent = grid.cellCount.toLocaleString();
    this.cellSize.textContent = grid.cellSize.toLocaleString();
  }
}

export default new HelpView();
