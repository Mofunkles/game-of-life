export const gosper = function (width, height, index) {
  const start = width * (height / 2) + width / 2;
  // prettier-ignore
  const basePattern = [24, 58, 60, 84, 85, 92, 93, 106, 107, 119, 123, 128, 129, 142, 143, 144, 145, 154, 160, 164, 165, 180, 181, 190, 194, 196, 197, 202, 204, 226, 232, 240, 264, 268, 300, 301];
  const adjustedPattern = basePattern.map(coord => coord);

  return adjustedPattern.some(coord => coord === index) ? 1 : 0;
};

// 0.. 24 > X
// 0.. 22 > X > 24 > X
// 0.. 12 > X X > 15.. 20 > X X
