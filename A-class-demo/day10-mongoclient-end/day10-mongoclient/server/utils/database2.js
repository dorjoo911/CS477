const { MongoClient } = require('mongodb');
let _db;

function mongoConnect(callback) {
    MongoClient.connect('mongodb://127.0.0.1:27017')
        .then(client => {
            console.log('connected..');
            _db = client.db('shopping');
            callback();
        })
        .catch(error => console.log(error));
}

function getDB(){
    if(_db){
        return _db;
    } else {
        throw new Error('Database connection failed');
    }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;