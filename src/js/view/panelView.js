class PanelView {
  parentElement = document.querySelector('.control-panel');
  buttonStart = document.querySelector('.button-start');
  buttonStop = document.querySelector('.button-stop');

  addHandlerButton(handlers) {
    this.parentElement.addEventListener('click', event => {
      const clicked = event.target.closest('.button');
      if (!clicked) return;

      if (clicked.dataset.button === 'help') handlers.help();

      if (clicked.dataset.button === 'start' && !clicked.disabled) {
        clicked.disabled = true;
        this.buttonStop.disabled = false;
        handlers.start();
      }

      if (clicked.dataset.button === 'stop' && !clicked.disabled) {
        clicked.disabled = true;
        this.buttonStart.disabled = false;
        handlers.stop();
      }
    });
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
