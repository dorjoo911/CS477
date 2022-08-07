const Category = require('../models/category');

exports.save = (req, res, next) => {
    new Category(req.body).save()
        .then(cate => {
            res.status(201).json(cate);
        });
}