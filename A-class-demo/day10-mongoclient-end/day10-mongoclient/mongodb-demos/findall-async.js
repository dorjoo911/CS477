const { MongoClient } = require('mongodb');

(async function(){
   const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
   console.log('connected...');

   const products = await client.db('shopping')
                            .collection('products').find().toArray();
    console.log(products);

    client.close();
})();


