const Users = require("../models/users");
const Tweets = require("../models/tweets");

exports.getAll = async (req, res, next) => {
  const tw = await Tweets.find();
  res.status(200).json(tw);
};
//actually get tweet by username
exports.getTweetById = async (req, res, next) => {
  const userFollow = await Users.find({ username: req.params.id });
  if (userFollow.length !== 0) {
    let follower = userFollow[0].following;
    follower.push(req.params.id);
    const tw = await Tweets.find()
      .where("username")
      .in(follower)
      .sort({ date: "desc" });
    //console.log(tw);
    res.status(200).json(tw);
  } else {
    res.status(200).json({});
  }
};

exports.save = async (req, res, next) => {
  const user = await Users.find({ username: req.body.username });

  if (user.length < 1) {
    next({ message: "user not found" });
    return;
  }
  res.status(201).json(await Tweets(req.body).save());
};

// exports.follow= async (req,res,next)=>{
// // followingPerson // string
// const unFollowedUser = await Users.find({username: req.body.username})
// // userId -logged in // int
// const userId = await Users.find({_id: })

// // find User Model - user = Users.find(userId)
// // user.following.push(followingPerson);
// }

// exports.getTweetById = async (req, res, next) => {
//     const userTw = await Users.find({username: req.params.id});
//     console.log(userTw);
//     res.status(200).json(userTw);
// }
