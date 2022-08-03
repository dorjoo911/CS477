const Book = require("../models/bookModel"); // Book from ATD of model

exports.allBook = async (req, res, next) => {
  res.status(200).json(await Book.find()); //responce into router using ATD of BOOK's allBook method in json type
};

exports.addBook = async (req, res, next) => {
  res.status(201).json(await new Book(req.body).save());
};

exports.getBook = async (req, res, next) => {
  res.json(await Book.findById(req.params.id));
};

exports.updateBook = async (req, res) => {
  res.status(200).json(await Book.findByIdAndUpdate(req.params.id, req.body));
};

exports.deleteBook = async (req, res, next) => {
  res.json(await Book.findByIdAndDelete(req.params.id));
};
