import { GRID_SIZE } from './config.js';

export const gosper = function (width) {
  // calculate starting position from grid width
  const baseWidth = 36;
  const start = Math.floor(
    width * Math.floor(GRID_SIZE / 8) + Math.floor((width - baseWidth) / 3)
  );
  // prettier-ignore
  const basePattern = [24, 58, 60, 84, 85, 92, 93, 106, 107, 119, 123, 128, 129, 142, 143, 144, 145, 154, 160, 164, 165, 180, 181, 190, 194, 196, 197, 202, 204, 226, 232, 240, 263, 267, 300, 301];

  return basePattern.map(coord => {
    // divide by base width to determine row number
    const row = Math.floor(coord / baseWidth);
    // multiply row number by grid width
    // flatten old coordinates to determine inset number
    // add both together to get new coordinate
    const offset = row * width + (coord - row * baseWidth);
    return start + offset;
  });
};
