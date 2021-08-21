const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user');


app.use('/user', userRoutes);



module.exports = app;