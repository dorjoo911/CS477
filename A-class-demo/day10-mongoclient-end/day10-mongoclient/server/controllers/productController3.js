const Product = require("../models/product3");

exports.getAll = async (req, res, next) => {
  res.json(await Product.getAll());
};

exports.getById = async (req, res, next) => {
  res.json(await Product.getById(req.params.id));
};

exports.save = async (req, res, next) => {
  let prod = new Product(
    null,
    req.body.title,
    req.body.price,
    req.body.description
  );
  const result = await prod.save();
  prod._id = result.insertedId;
  res.json(prod);
};

exports.update = async (req, res) => {
  let updateProd = new Product(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.description
  );
  await updateProd.update();
  res.json(updateProd);
};

exports.deleteById = async (req, res) => {
  await Product.deleteById(req.params.id);
  res.json({ _id: req.params.id });
};
