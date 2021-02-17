export const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomBinary = function (scalar) {
  const number = +(Math.random() * scalar).toFixed(0);
  return number < scalar ? 0 : 1;
};
