const express = require('express');
const path = require('path');

const CustomError = require('../errors-handlers/custom-error');

const router = express.Router();

router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html'));
});

router.post('/add', (req, res) => {
    console.log(req.body);
    res.send('save USER successfully');
});

router.get('/edit', (req, res) => {
    throw new CustomError('API not Supported', 'edit');
});

router.get('/delete', (req, res) => {
    // console.log(1/0);
    throw new Error('API not supported', 'delete');
});



module.exports = router;