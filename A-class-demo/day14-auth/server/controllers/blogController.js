const Blog = require('../models/blog');
const Response = require('../models/responseobj');

exports.getAll = async (req, res, next) => {
    const blogs = await Blog.find();
    res.status(200).json(new Response(false, null, blogs));
};

exports.deleteById = async (req, res, next) => {
    const result = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(new Response(false, null, result));
}