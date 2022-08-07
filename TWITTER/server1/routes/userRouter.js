const express = require("express");

const userController = require("../controllers/userConroller");

const router = express.Router();

router.post("/", userController.save); //register

module.exports = router;
