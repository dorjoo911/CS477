const express = require("express");

const {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

//if: "api/v1/books"===>"api/v1/books/"
router.route("/").get(getAllBooks);
router.route("/").post(createBook);
//if: "api/v1/books"===>"api/v1/books/:id"
router.route("/:id").get(getBook);
router.route("/:id").put(updateBook);
router.route("/:id").delete(deleteBook);

module.exports = router;
