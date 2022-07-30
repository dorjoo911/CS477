const { getDB } = require("../utils/database3");
const { ObjectId } = require("mongodb");

module.exports = class Product {
  constructor(id, title, price, description) {
    this._id = id;
    this.title = title;
    this.price = price;
    this.description = description;
  }

  static getAll() {
    return getDB().collection("products").find().toArray();
  }

  static getById(id) {
    return getDB().collection("products").findOne({ _id: id }).toArray();
  }

  save() {}

  update() {}

  static deleteById(id) {}
};
