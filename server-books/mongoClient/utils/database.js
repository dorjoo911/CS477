const { MongoClient } = require("mongodb"); //MongoClient obj from mongodb
let _db; //our _db

async function mongoConnect(callback) {
  //mongoConnect has callback fn
  try {
    // client has connection with mongoDB
    const client = await MongoClient.connect("mongodb://localhost:27017");
    // our _db get that mongoDB "shopping"
    _db = client.db("shopping");
    // callback work for ... ?
    callback();
    console.log("DATA BASE CONNECTION IN PIPE ... ... ...");
  } catch (error) {
    console.log(error);
  }
}

function getDB() {
  // if connection has get DB's data /shopping/
  if (_db) {
    return _db;
  } else {
    throw new Error("Database connection failed");
  }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
