const {MongoClient} = require('mongodb');
function mongoConnect(callback){
    return MongoClient.connect('mongodb://127.0.0.1:27017')
    .then(client => {
       return callback(client);      
    })
    .catch(error => console.log(error));
}



module.exports =  mongoConnect;