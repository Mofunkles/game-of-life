class PanelView {
  parentElement = document.querySelector('.control-panel');

  addHandlerButton(handlers) {
    this.parentElement.addEventListener('click', event => {
      const clicked = event.target.closest('.button');
      if (!clicked) return;

      if (clicked.dataset.button === 'help') handlers.help();

      if (
        clicked.dataset.button === 'start' &&
        clicked.classList.contains('button--active')
      ) {
        const stop = this.parentElement.querySelector('.button--inactive');
        stop.classList.remove('button--inactive');
        stop.classList.add('button--active');
        clicked.classList.remove('button--active');
        clicked.classList.add('button--inactive');
        handlers.start();
      }
    });
  }

  updateGenerations(number) {}
}

export default new PanelView();
