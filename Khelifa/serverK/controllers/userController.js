const Users = require("../models/users");

exports.getUsers = async (req, res, next) => {
  const users = await Users.find();
  res.status(200).json(users);
};

exports.getUserById = async (req, res, next) => {
  const user = await Users.findOne({ userId: req.params.id });
  res.status(200).json(user);
};

exports.save = async (req, res, next) => {
  const result = await new Users(req.body).save();
  res.status(201).json(result);
};

exports.getTweetById = async (req, res, next) => {
  console.log(req.params.uId);
  const tw = await Tweet.findOne({ userId: req.params.uId });
  res.status(200).send(tw);
};

exports.updateUserByUsername = async (req, res, next) => {
  const result = await Users.findOneAndUpdate(
    { username: req.params.id },
    req.body
  );
  console.log(req.body.following);
  res.status(200).send(result);
};
exports.getUserByUserName = async (req, res, next) => {
  const user = await Users.findOne({ username: req.params.username });
  res.status(200).json(user);
};
