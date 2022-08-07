const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    Product.getAll()
        .then(prods => {
            res.json(prods);
        })
};

exports.getById = (req, res, next) => {
    Product.getById(req.params.id)
        .then(prod => res.json(prod));
}

exports.save = (req, res, next) => {
    let prod = new Product(null, req.body.title, req.body.price, req.body.description)
    prod.save()
        .then(result => {
            console.log(result);
            prod._id = result.insertedId;
            res.json(prod);
        });
}

exports.update = (req, res) => {
    let updateProd = new Product(req.params.id, req.body.title, req.body.price, req.body.description);
    updateProd.update()
        .then(result => {
            res.json(updateProd);
        });
}


exports.deleteById = (req, res) => {
    Product.deleteById(req.params.id)
        .then(result => {
            res.json({_id: req.params.id});
        })
   
}