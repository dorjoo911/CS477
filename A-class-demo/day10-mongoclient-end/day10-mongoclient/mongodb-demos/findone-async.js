const { MongoClient, ObjectId} = require('mongodb');

async function run(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    const product = await client.db('shopping').collection('products').findOne({_id: new ObjectId('62e42fdec3ee4b5dce3596e5')});
    console.log(product);
    client.close();
}

run();


