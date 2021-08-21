const express = require('express');
//const { route } = require('../../app');
const router = express.Router();

//GETTERS
router.get('/', (req, res, next) => {
    res.status(200).send({
        msg: 'Get at users OK'
    });
});

router.get('/:user_id', (req, res, next) => {
    const userId = req.params.user_id;
    let msg;
    if (userId == 1){
        msg = 'Id de usuario especial';
    } else {
        msg = 'Id de usuario normal';
    }

    res.status(200).send({
        msg: msg,
        user_id: userId 
    });
});


//POST
router.post('/', (req, res, next) => {
    res.status(201).send({
        msg: 'Post at users OK'
    });
});

//PATCH
router.patch('/', (req, res, next) => {
    res.status(202).send({
        msg: 'Patch at users OK'
    });
});

//PATCH
router.delete('/', (req, res, next) => {
    res.status(203).send({
        msg: 'Delete at users OK'
    });
});

module.exports = router;