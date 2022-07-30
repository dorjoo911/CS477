const { MongoClient } = require('mongodb');

(async function(){
   const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
   console.log('connected...');

    const docs = [
        {title: 'Acer 2', price: 3332, description: 'Acer is good 2'},
        {title: 'Acer 3', price: 3333, description: 'Acer is good 3'}
    ];
    const result = await client.db('shopping').collection('products')
        .insertMany(docs);
    console.log(result);

    client.close();
})();
