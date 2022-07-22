/*Using Node Stream API, create a script to unzip a file 
(after you zip it). (Use zlib.createGunzip() stream)*/
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const gzip = zlib.createGzip();
const readable = fs.createReadStream(path.join(__dirname, "source.txt"));
const compressed = fs.createWriteStream(
  path.join(__dirname, "compressed.txt.gz")
);
readable.pipe(gzip).pipe(compressed);

setTimeout(() => {
  fs.createReadStream("./compressed.txt.gz")
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream("./input.txt"));

  console.log("File Decompressed.");
}, 500);
