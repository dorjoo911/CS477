const User = require('../models/user');
 
const Response = require('../models/responseobj');

exports.save = async (req, res, next) => {
    const user = await new User(req.body).save();
    res.status(201).json(new Response(false, null, user));
}