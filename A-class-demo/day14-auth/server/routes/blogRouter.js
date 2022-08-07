const express = require('express');

const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.authenticate);

router.get('/', blogController.getAll);
router.delete('/:id', authController.authorize, blogController.deleteById);


module.exports = router;