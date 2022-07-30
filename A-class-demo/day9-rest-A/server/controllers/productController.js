const Product = require("../models/product");

exports.getAll = (req, res, next) => {
  res.json(Product.getAll());
};

exports.getById = (req, res, next) => {
  res.json(Product.getById(req.params.id));
};

exports.save = (req, res, next) => {
  let addProd = new Product(
    null,
    req.body.title,
    req.body.price,
    req.body.description
  ).save();
  res.json(addProd);
};

exports.update = (req, res) => {
  let updatedProd = Product.update(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.description
  );
  res.json(updatedProd);
};

exports.update2 = (req, res) => {
  let updatedProd = new Product(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.description
  ).update2();
  res.json(updatedProd);
};

exports.deleteById = (req, res) => {
  res.json(Product.deleteById(req.params.id));
};
