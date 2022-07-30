const { getDB } = require('../utils/database3');
const { ObjectId } = require('mongodb');


module.exports = class Product {

    constructor(id, title, price, description) {
        this._id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    static getAll() {
        return getDB().collection('products').find().toArray();
    }

    static getById(id) {
        return getDB().collection('products').findOne({ _id: new ObjectId(id) });
    }

    save() {
        return getDB().collection('products').insertOne(this);
    }

    update() {
        // return getDB().collection('products')
        //     .updateOne({_id: new ObjectId(this._id)}, 
        //         {$set: {title: this.title, price: this.price, description: this.description}});
        const self = Object.assign({}, this);
        delete self._id;

        return getDB().collection('products')
            .updateOne({ _id: new ObjectId(this._id) }, { $set: self });
    }

    static deleteById(id) {
        return getDB().collection('products').deleteOne({ _id: new ObjectId(id) });
    }
}