const Users = require("../model/userModel");

exports.save = async (req, res) => {
  res.status(201).json(await new Users(req.body).save());
};

exports.getAllUser = async (req, res) => {
  res.status(200).json(await Users.find());
};
exports.getUserById = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  console.log(user);
  res.status(200).json(user);
};
