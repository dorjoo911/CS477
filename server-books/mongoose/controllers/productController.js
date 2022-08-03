const Product = require("../models/productModel");

exports.getAll = (req, res, next) => {
  res.json(Product.getAll());
};

exports.getById = (req, res, next) => {
  console.log(req.param.id);
  res.json(Product.getById(req.params.id));
};

exports.save = (req, res, next) => {
  // req.body; //app.use(express.json()); //req.body={}
  let addProduct = new Product(
    null,
    req.body.title,
    req.body.price,
    req.body.description
  ).save();
  res.json(addProduct);
};

exports.update = (req, res, next) => {
  let updateProd = new Product(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.description
  ).update2();
  res.json(updateProd);
};

exports.delete = (req, res, next) => {
  res.json(Product.deleteById(req.params.id));
};
