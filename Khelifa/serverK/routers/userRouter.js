const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:username', userController.getUserByUserName)
router.put('/:id', userController.updateUserByUsername);
router.get('/:id', userController.getUserById);
router.post('/', userController.save);


module.exports = router;