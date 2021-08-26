//MAX is not included
getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
  getRandomInt,
};
