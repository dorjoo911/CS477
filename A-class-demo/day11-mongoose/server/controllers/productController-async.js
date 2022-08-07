const Product = require('../models/product');
const {ObjectId} = require('mongodb');

exports.getAll = async (req, res, next) => {
    if(req.query.price) {
        res.json(await Product.filterByPrice(req.query.price));
    } else {
        res.json(await Product.find());
    }
    
};

exports.getById = async (req, res, next) => { 
    res.json(await Product.findById(req.params.id).populate("categories"));
}

exports.save = async (req, res, next) => {
    try{
        const result = await new Product(req.body).save(); //instance methods
        res.json(result);
    } catch(error) {
       next(error);
    } 
}

exports.update = async (req, res) => {
    const result = await Product.updateOne({_id: new ObjectId(req.params.id)} , req.body);
    res.json(result);
}


exports.deleteById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({_id: req.params.id});
}