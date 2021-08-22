const express = require('express');
const router = express.Router();

//GETTERS
router.get('/', (req, res, next) => {
    res.status(200).send({
        msg: 'Get at movies OK'
    });
});

router.get('/:movie_id', (req, res, next) => {
    const movie_id = req.params.movie_id;
    let msg;
    if (movie_id == 1){
        msg = 'Id de usuario especial';
    } else {
        msg = 'Id de usuario normal';
    }

    res.status(200).send({
        msg,
        movie_id 
    });
});


//POST
router.post('/', (req, res, next) => {
    res.status(201).send({
        msg: 'Post at movies OK'
    });
});

//PATCH
router.patch('/', (req, res, next) => {
    res.status(202).send({
        msg: 'Patch at movies OK'
    });
});

//PATCH
router.delete('/', (req, res, next) => {
    res.status(203).send({
        msg: 'Delete at movies OK'
    });
});

module.exports = router;