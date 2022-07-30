const mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://127.0.0.1:27017')
    .then(client => {
       console.log('connected...');
       const obj = {title: 'Acer', price: 333, description: 'Acer is good'};
       const db = client.db('shopping');
       db.collection('products')
        .insertOne(obj)
        .then(result => {
            console.log(result);
            obj._id = result.insertedId;
            console.log(obj);
            client.close();
        })
    })
    .catch(error => console.log(error));