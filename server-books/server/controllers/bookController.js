const Book = require("../models/bookModel");

exports.allBook = async (req, res, next) => {
  res.json(await Book.allBook());
};

exports.addBook = async (req, res, next) => {
  let book = new Book(
    null,
    req.body.title,
    req.body.ISBN,
    req.body.publishedDate,
    req.body.author
  );
  const result = await book.addBook();
  book._id = result.insertedId;
  res.json(book);
};

exports.getBook = async (req, res, next) => {
  res.json(await Book.getBook(req.params.id));
};

exports.updateBook = async (req, res) => {
  console.log(req.body);
  let updateBook = new Book(
    req.params.id,
    req.body.title,
    req.body.ISBN,
    req.body.publishedDate,
    req.body.author
  );
  await updateBook.update();
  res.json(updateBook);
};

exports.deleteBook = async (req, res, next) => {
  await Book.deleteBook(req.params.id);
  res.json({ _id: req.params.id });
};
