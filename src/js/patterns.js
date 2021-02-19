export const generatePattern = function (initial, grid, size) {
  const { cellWidth: width, cellHeight: height } = grid;

  if (initial === 'line') return line(width, height);
  if (initial === 'bunnies') return bunnies(width, size);
  if (initial === 'gosper') return gosper(width, size);
};

const line = function (width, height) {
  const pattern = [];
  const rowTarget = Math.floor(height / 2) * width;

  for (let i = 0; i < width; i++) {
    pattern[i] = i + rowTarget;
  }

  return pattern;
};

const bunnies = function (width, size) {
  const baseWidth = 8;
  const start = Math.floor(
    width * Math.floor(size / 4) + Math.floor((width - baseWidth) / 2)
  );

  const basePattern = [0, 6, 10, 14, 18, 21, 23, 25, 27];

  return basePattern.map(coord => {
    const row = Math.floor(coord / baseWidth);
    const offset = row * width + (coord - row * baseWidth);
    return start + offset;
  });
};

const gosper = function (width, size) {
  const baseWidth = 36;
  const start = Math.floor(
    width * Math.floor(size / 8) + Math.floor((width - baseWidth) / 3)
  );

  // prettier-ignore
  const basePattern = [24, 58, 60, 84, 85, 92, 93, 106, 107, 119, 123, 128, 129, 142, 143, 144, 145, 154, 160, 164, 165, 180, 181, 190, 194, 196, 197, 202, 204, 226, 232, 240, 263, 267, 300, 301];

  return basePattern.map(coord => {
    const row = Math.floor(coord / baseWidth);
    const offset = row * width + (coord - row * baseWidth);
    return start + offset;
  });
};
