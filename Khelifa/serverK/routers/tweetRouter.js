const express = require('express');

const tweetController = require('../controllers/tweetController');


const router = express.Router();

router.get('/', tweetController.getAll);
router.get('/:id', tweetController.getTweetById);
router.post('/', tweetController.save)

module.exports = router;