const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/", postController.save);
router.get("/", postController.getAllPost);
router.get("/:userId", postController.getPostsByUserId);

module.exports = router;
