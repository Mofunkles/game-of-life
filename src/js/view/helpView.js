class HelpView {
  parentElement = document.querySelector('.rules');

  addHandlerShowHelp(handler) {
    this.parentElement.addEventListener('click', event => {
      const clicked = event.target.closest('.rules');
      if (!clicked) return;

      handler();
    });
  }

  toggleVisibility() {
    this.parentElement.classList.toggle('hidden');
  }
}

export default new HelpView();
