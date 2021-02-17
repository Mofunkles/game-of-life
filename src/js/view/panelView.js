class PanelView {
  parentElement = document.querySelector('.control-panel');
  buttonStart = this.parentElement.querySelector('.button-start');
  buttonStop = this.parentElement.querySelector('.button-stop');
  generations = this.parentElement.querySelector('.generations-number');
  liveCells = this.parentElement.querySelector('.livecells-number');

  addHandlerButton(handlers) {
    this.parentElement.addEventListener('mousedown', event => {
      const clicked = event.target.closest('.button');
      if (!clicked) return;

      if (clicked.dataset.button === 'start' && !clicked.disabled) {
        this.toggleControlButton();
        handlers.start();
      }

      if (clicked.dataset.button === 'stop' && !clicked.disabled) {
        this.toggleControlButton();
        handlers.stop();
      }

      if (clicked.dataset.button === 'clear') handlers.clear();
      if (clicked.dataset.button === 'fill') handlers.fill();
      if (clicked.dataset.button === 'random') handlers.random();
      if (clicked.dataset.button === 'gosper') handlers.gosper();
      if (clicked.dataset.button === 'help') handlers.help();
    });
  }

  toggleControlButton() {
    this.buttonStart.disabled = !this.buttonStart.disabled;
    this.buttonStop.disabled = !this.buttonStop.disabled;
  }

  updateGenerations(number) {
    this.generations.textContent = number.toLocaleString();
  }

  updateLiveCells(number) {
    this.liveCells.textContent = number.toLocaleString();
  }
}

export default new PanelView();
