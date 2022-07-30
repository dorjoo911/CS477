const { MongoClient , ObjectId} = require('mongodb');
MongoClient.connect('mongodb://127.0.0.1:27017')
    .then(client => {
       client.db('shopping').collection('products')
        .updateOne({_id: new ObjectId('62e42fdec3ee4b5dce3596e5')}, 
                {$set: {title: 'HP 2222', updated_date: new Date()}})
        .then(result => {
            console.log(result);
            client.close();
        })
       
    })
    .catch(error => console.log(error));