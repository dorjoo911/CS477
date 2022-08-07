const express = require('express');

const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.authenticate);

router.get('/', authController.authenticate, blogController.getAll);


module.exports = router;