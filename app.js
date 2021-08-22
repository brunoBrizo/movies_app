const express = require('express');
const app = express();
const morgan = require('morgan');

const userRoutes = require('./src/routes/user');
const movieRoutes = require('./src/routes/movie');

app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);

//404 NOT FOUND
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//ERROR HANDLER
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            msg: error.message
        }
    })
});

module.exports = app;