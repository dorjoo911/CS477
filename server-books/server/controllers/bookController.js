const Book = require("../models/bookModel");

exports.allBook = (req, res, next) => {
  res.json(Book.allBook());
};

exports.addBook = (req, res, next) => {
  let addBook = new Book(
    null,
    req.body.title,
    req.body.ISBN,
    req.body.publishedDate,
    req.body.author
  ).addBook();
  res.json(addBook);
};

exports.getBook = (req, res, next) => {
  res.json(Book.getBook(req.params.id));
};

exports.updateBook = (req, res, next) => {
  let updateBook = new Book(
    req.params.id,
    req.body.title,
    req.body.ISBN,
    req.body.publishedDate,
    req.body.author
  ).update();
  res.json(updateBook);
};

exports.deleteBook = (req, res, next) => {
  res.json(Book.deleteBook(req.params.id));
};
