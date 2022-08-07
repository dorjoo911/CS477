const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    price: Number,
    description: String,
    created: Date,
    updated: Date,
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}]
}, {
    versionKey: false
});

productSchema.methods.saveWithTitleChecking = function(){
    if(this.title.length < 4) {
        throw new Error("Product Title must be greater than 4");
    } else {
       return this.save();
    }
}

productSchema.statics.filterByPrice = function(price) {
    return this.find().where('price').gt(price);
}

productSchema.pre(['save', 'saveWithTitleChecking'], function(next) {
    this.created = new Date();
    this.updated = new Date();
    next();
})

const Model = mongoose.model('Product', productSchema);

module.exports = Model;



