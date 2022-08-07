const Users = require("../models/users");
const Tweets = require("../models/tweets");

exports.getUsers = async (req, res) => {
  let users = [];
  if (req.params.username) {
    users = await Users.findByName(req.params.username);
  } else {
    users = await Users.find();
  }
  res.status(200).json(users);
};

//actually getUserByName
exports.getUserById = async (req, res, next) => {
  const user = await Users.findOne({ username: req.params.id });
  // console.log(user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(201).json(user);
  }
};

exports.save = async (req, res, next) => {
  const result = await new Users(req.body).save();
  res.status(201).json(result);
};

//actually getTweetByUserName
exports.getTweetById = async (req, res, next) => {
  // console.log(req.params.uId);
  const tw = await Tweet.findOne({ username: req.params.uId });
  console.log(tw);
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
