/*
Create a simple Node script that converts 'www.miu.edu' domain name
to the equivalent IP address. (Search and learn 'dns' module, resolve4)*/
const miu = "www.miu.edu";

const dns = require("dns");

dns.lookup(miu, function (err, result) {
  console.log(result);
});
