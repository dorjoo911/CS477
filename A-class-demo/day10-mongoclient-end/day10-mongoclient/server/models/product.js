let products = [
    { id: 1, title: 'HP', price: 299, description: 'HP is good' },
    { id: 2, title: 'Apple', price: 1299, description: 'Apple is good' },
    { id: 3, title: 'ThinkPad', price: 999, description: 'ThinkPad is good' },
    { id: 4, title: 'DELL', price: 999, description: 'Dell is good' }
];

let counter = 5;


module.exports = class Product {

    constructor(id, title, price, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    static getAll() {
        return products;
    }

    static getById(id) {
        const index = products.findIndex(prod => prod.id == id);
        if (index < -1) {
            throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
        } else {
            return products[index];
        }
    }

    save() {
        this.id = counter++;
        products.push(this);
        return this;
    }

    static update(id, title, price, description) {
        let prod = products.find(prod => prod.id == id);
        if (prod) {
            prod.title = title;
            prod.price = price;
            prod.description = description;
            return prod;
        } else {
            throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
        }
    }

    update2() {
        const index = products.findIndex(prod => prod.id == this.id);
        if (index < -1) {
            throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
        } else {
            products[index] = this;
            return this;
        }
    }

    static deleteById(id) {
        const index = products.findIndex(prod => prod.id == id);
        if (index < -1) {
            throw new Error(`NO PRODUCT FOUND with ID: ${id}`);
        } else {
            let temp = products[index];
            products.splice(index, 1);
            return temp;
        }

    }
}