const Book = require("../models/bookModel");

exports.createBook = async (req, res, next) => {
  console.log(req.boby);
  try {
    const book = await Book.create(req.boby);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({
        success: true,
        error: `book isn't found with ID ${req.params.is}`,
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(400).json({
        success: true,
        error: `book isn't found with ID ${req.params.is}`,
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(400).json({
        success: true,
        error: `book isn't found with ID ${req.params.is}`,
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};
