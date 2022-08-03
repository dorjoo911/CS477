const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", bookController.allBook);
router.post("/", bookController.addBook);
router.get("/:id", bookController.getBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
