let books = [
  {
    id: 1,
    title: "The Java",
    ISBN: 8452,
    publishedDate: "2020-10-02",
    author: "Mike Erdene",
  },
  {
    id: 2,
    title: "Blue Book",
    ISBN: 6415,
    publishedDate: "2021-10-02",
    author: "Mike Erdene",
  },
  {
    id: 3,
    title: "Best book",
    ISBN: 3216,
    publishedDate: "2022-10-02",
    author: "Mike Erdene",
  },
];
let counter = 4;

module.exports = class Book {
  constructor(id, title, ISBN, publishedDate, author) {
    this.id = id;
    this.title = title;
    this.ISBN = ISBN;
    this.publishedDate = publishedDate;
    this.author = author;
  }

  static allBook() {
    return books;
  }

  addBook() {
    this.id = counter++;
    books.push(this);
    return this;
  }

  static getBook(id) {
    const index = books.findIndex((book) => book.id == id);
    if (index < -1) {
      throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
    } else {
      return books[index]; // books[id]
    }
  }

  static updateBook(id) {
    const book = books.find((book) => book.id == id);
    if (book) {
      book.title = title;
      book.ISBN = ISBN;
      book.publishedDate = publishedDate;
      book.author = author;
      return book;
    } else {
      throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
    }
  }

  update(id) {
    const index = books.findIndex((book) => book.id == this.id);
    if (index < -1) {
      throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
    } else {
      books[index]; // books[id]
      return this;
    }
  }
  static deleteBook(id) {
    const index = books.findIndex((book) => book.id == id);
    if (index < -1) {
      throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
    } else {
      let book = books[index];
      books.splice(index, 1);
      return book;
    }
  }
};
