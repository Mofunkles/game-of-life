class PanelView {
  parentElement = document.querySelector('.control-panel');

  addHandlerShowHelp(handler) {
    this.parentElement.addEventListener('click', event => {
      const clicked = event.target.closest('.button');
      if (!clicked || clicked.dataset.button !== 'help') return;

      handler();
    });
  }
}

export default new PanelView();
