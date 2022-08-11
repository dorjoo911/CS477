const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUser);
router.post("/", userController.save);
router.get("/:id", userController.getUserById);

module.exports = router;
