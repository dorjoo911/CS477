const mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://127.0.0.1:27017')
    .then(client => {
       console.log('connected...');
       const db = client.db('shopping');
       db.collection('products').find().toArray()
         .then(prods => {
            console.log(prods);
            client.close();
         });
    })
    .catch(error => console.log(error));