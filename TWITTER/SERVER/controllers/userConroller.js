const User = require("../models/userModel"); // Book from ATD of model

exports.allUser = async (req, res, next) => {
  res.status(200).json(await User.find()); //responce into router using ATD of BOOK's allBook method in json type
};
exports.addUser = async (req, res, next) => {
  res.status(201).json(await new User(req.body).save());
};
