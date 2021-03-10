class GridView {
  parentElement = document.querySelector('.grid-canvas');

  renderCanvas = function (canvas) {
    const { context, path } = canvas;
    const width = this.parentElement.width;
    const height = this.parentElement.height;

    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgb(254, 96, 57)';
    context.fill(path);
  };

  context(state) {
    if (!this.parentElement.getContext) return;

    const context = this.parentElement.getContext('2d');
    this.parentElement.setAttribute('width', state.screenWidth);
    this.parentElement.setAttribute('height', state.screenHeight);

    return context;
  }

  addHandlerPaint(handler) {
    this.parentElement.addEventListener('mousedown', event => {
      this.parentElement.addEventListener('mousemove', handler);
    });

    this.parentElement.addEventListener('mouseup', event => {
      this.parentElement.removeEventListener('mousemove', handler);
    });
  }
}

export default new GridView();
