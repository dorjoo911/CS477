const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Response = require('../models/responseobj');

const SECRET = "1234567890";

exports.login = async (req, res,next) => {
    const {username, password} = req.body;
    if (username && password) {
        let result;
        try {
            result = await User.findOne({ username, password });
        } catch (error) {
            return next(new Error('User NOT found'));
        }
        if (result) {
            const accessToken = jwt.sign({
                id: result._id,
                username: result.username,
                iat: Date.now()
            }, SECRET);
            res.status(200).json(new Response(false, null, { accessToken }));
        } else {
            res.status(400).json(new Response(true, "Invalid username and password", null));
        }
    } else {
        res.status(400).json(new Response(true, "Please input username and password", null))
    }
}