const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

module.exports = class Book {
  constructor(id, title, ISBN, publishedDate, author) {
    this._id = id;
    this.title = title;
    this.ISBN = ISBN;
    this.publishedDate = new Date();
    this.author = author;
  }

  static allBook() {
    return getDB().collection("books").find().toArray();
  }

  addBook() {
    return getDB().collection("books").insertOne(this);
  }

  static getBook(id) {
    return getDB()
      .collection("books")
      .findOne({ _id: new ObjectId(id) });
  }

  update() {
    // return getDB().collection('books')
    //     .updateOne({_id: new ObjectId(this._id)},
    //         {$set: {title: this.title, ISBN: this.ISBN, publishedDate: this.publishedDate, author: this.author}});
    const self = Object.assign({}, this);
    delete self._id;

    return getDB()
      .collection("books")
      .updateOne({ _id: new ObjectId(this._id) }, { $set: self });
  }

  static deleteBook(id) {
    return getDB()
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });
  }
};
