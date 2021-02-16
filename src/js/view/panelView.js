class PanelView {
  parentElement = document.querySelector('.control-panel');

  addHandlerButton(handlers) {
    this.parentElement.addEventListener('click', event => {
      const clicked = event.target.closest('.button');
      if (!clicked) return;

      if (clicked.dataset.button === 'help') handlers.help();
      if (clicked.dataset.button === 'start') handlers.start();
    });
  }
}

export default new PanelView();
