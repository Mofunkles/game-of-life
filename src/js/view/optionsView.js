class OptionsView {
  parentElement = document.querySelector('.options');
  modalBackground = document.querySelector('.modal-background');
  buttons = document.querySelectorAll('.button--grid-size');

  addHandlerShowOptions(handler) {
    this.modalBackground.addEventListener('mousedown', event => {
      handler();
    });
  }

  addHandlerButton(handler) {
    this.parentElement.addEventListener('mousedown', event => {
      const clicked = event.target.closest('.button');
      if (!clicked) return;

      if (clicked.dataset.button === 'small') {
        this.toggleControlButton(clicked);
        handler('small');
      }

      if (clicked.dataset.button === 'medium') {
        this.toggleControlButton(clicked);
        handler('medium');
      }
      if (clicked.dataset.button === 'large') {
        this.toggleControlButton(clicked);
        handler('large');
      }
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

  toggleControlButton(button) {
    this.buttons.forEach(button => (button.disabled = false));
    button.disabled = true;
  }
}

export default new OptionsView();
