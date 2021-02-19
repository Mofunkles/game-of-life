class OptionsView {
  parentElement = document.querySelector('.options');
  buttons = document.querySelectorAll('.button--grid-size');

  addHandlerShowOptions(handler) {
    this.parentElement.addEventListener('mousedown', event => {
      const clicked =
        event.target.closest('.button') || event.target.closest('.options');
      if (!clicked) return;

      if (clicked.classList.contains('options')) handler.options();
      if (clicked.dataset.button === 'small') {
        this.toggleControlButton(clicked);
        handler.button('small');
      }

      if (clicked.dataset.button === 'medium') {
        this.toggleControlButton(clicked);
        handler.button('medium');
      }
      if (clicked.dataset.button === 'large') {
        this.toggleControlButton(clicked);
        handler.button('large');
      }
    });
  }

  toggleVisibility() {
    this.parentElement.classList.toggle('hidden');
  }

  toggleControlButton(button) {
    this.buttons.forEach(button => (button.disabled = false));
    button.disabled = true;
  }
}

export default new OptionsView();
