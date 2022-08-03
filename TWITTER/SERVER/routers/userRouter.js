const express = require("express");
const userController = require("../controllers/userConroller");

const router = express.Router();

router.get("/", userController.allUser);
router.post("/", userController.addUser);
// router.get("/:id", userController.getUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
