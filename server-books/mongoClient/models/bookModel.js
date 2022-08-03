const { getDB } = require("../utils/database"); //getDB obj from database /exports.getDB = getDB;/
const { ObjectId } = require("mongodb"); //ObjectId boj from mongodb
// we will ues those ADT, so far
module.exports = class Book {
  constructor(id, title, ISBN, publishedDate, author) {
    this._id = id;
    this.title = title;
    this.ISBN = ISBN;
    this.publishedDate = new Date();
    this.author = author;
  }

  static allBook() {
    return getDB().collection("books").find().toArray(); //get all data of books from shopping DB to Array obj
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
    const self = Object.assign({}, this); //modify this/obj key as self /made copy of this/
    delete self._id; // delete obj/self's property===_id from modified this as self

    return getDB()
      .collection("books") //collection book at DB shopping
      .updateOne({ _id: new ObjectId(this._id) }, { $set: self });
    //update({new ObjectId of this book/obj's _id to give into _id}, replace with that self/obj without _id)
  }

  static deleteBook(id) {
    return getDB()
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });
  }
};
