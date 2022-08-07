const Users = require('../models/users');
const Tweets = require('../models/tweets');

exports.getAll = async (req,res,next) => {
    const tw = await Tweets.find();
    res.status(200).json(tw);
}

exports.getTweetById = async (req, res, next) => {
    const userFollow = await Users.find({username: req.params.id});
    let follower = userFollow[0].following;
    const tw = await  Tweets.find().where('username').in(follower).sort({date: 'desc' });
    res.status(200).json(tw);
}

exports.save = async (req,res, next) => {
    const tweet = await new Tweets(req.body).save();
    res.status(201).json(tweet);
}

