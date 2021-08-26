/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "24/08/2021",
        "description": "functions that can be reused throughout the app",
        "modified_at": "24/08/2021"
    }
*/

//MAX is not included
getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
  getRandomInt,
};
