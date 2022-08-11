const mongoose = require("mongoose");
const Product = require("../model/productModel");

exports.save = async (req, res, next) => {
  const product = await new Product(req.body).save();
  try {
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const car = await Product.findByIdAndUpdate(req.params.id);
  try {
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};
exports.showAll = async (req, res, next) => {
  const products = await Product.find();
  try {
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.deleteById = async (req, res, next) => {
  console.log(`deleteById: `, req.params.id);
  const product = await Product.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteByTag = async (req, res, next) => {
  console.log(`deleteByTag: `, req.params);
  const product = await Product.findOne({ tag: req.params.tag }).deleteOne();
  try {
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.findByOwner = async (req, res, next) => {
  console.log(`findByOwner: `, req.params.owner);
  const cars = await Product.find({ owner: req.params.owner });
  try {
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

exports.getByTag = async (req, res, next) => {
  console.log(`getByTag: `, req.params.tag);
  const cars = await Product.find({ tag: req.params.tag });
  try {
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
exports.getById = async (req, res, next) => {
  console.log(`getById: `, req.params.id);
  const cars = await Product.findById(req.params.id);
  try {
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
