const { MongoClient, ObjectId } = require('mongodb');

(async function () {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    console.log('connected...');

    const result = await client.db('shopping').collection('products')
        .deleteOne({_id: new ObjectId('62e42ff8c3ee4b5dce3596e6')});
    console.log(result);

    client.close();
})();


