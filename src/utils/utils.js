/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "24/08/2021",
        "description": "functions that can be reused throughout the app",
        "modified_at": "24/08/2021"
    }
*/

//MAX is not included
//for random between 0 and 99 => getRandomInt(0, 100)
getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
  getRandomInt,
};
