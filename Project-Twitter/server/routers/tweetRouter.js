const express = require("express");
const authToken = require("./jwt");

const tweetController = require("../controllers/tweetController");

const router = express.Router();

router.get("/", tweetController.getAll);
router.post("/", authToken, tweetController.save);
// router.get("/:id", tweetController.getTweetById);
router.get("/:user/:page/:limit", tweetController.getTweetById);

module.exports = router;
