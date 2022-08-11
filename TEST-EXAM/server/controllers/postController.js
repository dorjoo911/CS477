const Post = require("../model/postModel");

exports.getAllPost = async (req, res) => {
  res.status(200).json(await Post.find());
};

exports.save = async (req, res) => {
  const post = await new Post(req.body).save();
  res.status(201).json(post);
};

exports.getPostsByUserId = async (req, res) => {
  console.log(req.params.userId);
  const myPosts = await Post.find(req.params.userId);
  res.status(200).json(myPosts);
};
