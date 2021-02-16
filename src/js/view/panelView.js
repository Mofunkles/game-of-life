class PanelView {
  parentElement = document.querySelector('.control-panel');
  buttonStart = document.querySelector('.button-start');
  buttonStop = document.querySelector('.button-stop');

  addHandlerButton(handlers) {
    this.parentElement.addEventListener('click', event => {
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
    const generations = this.parentElement.querySelector('.generations-number');
    generations.textContent = number;
  }

  updateLiveCells(number) {
    const liveCells = this.parentElement.querySelector('.livecells-number');
    liveCells.textContent = number;
  }
}

export default new PanelView();
