/* Write the necessary Node script to make this code work for all 
arrays: 
[1,2,3,4,5,6,7,8].even(); // [2,4,6,8] 
[1,2,3,4,5,6,7,8].odd(); // [1,3,5,7] Test your code in Node.JS CLI */

let arr = [1, 2, 3, 4, 5, 6, 7, 8];

Array.prototype.even = function () {
  return this.filter((number) => number % 2 == 0);
};
Array.prototype.odd = function () {
  return this.filter((number) => number % 2 !== 0);
};
let temp = arr.even();
console.log(temp);

arr = [1, 2, 3, 4, 5, 6, 7, 8];
temp = arr.odd();
console.log(temp);

/* 
1.Explain why do we want sometimes to use setImmediate instead of using setTimeout?
- setImmediate() and setTimeout() are similar, but behave in different ways 
depending on when they are called. 
setImmediate() is designed to execute a script once the current poll phase completes. 
setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
The main advantage to using setImmediate() over setTimeout() is setImmediate() will 
always be executed before any timers if scheduled within an I/O cycle, independently 
of how many timers are present.

2.Explain the difference between process.nextTick and setImmediate?
process.nextTick() fires immediately on the same phase
setImmediate() fires on the following iteration or 'tick' of the event loop
process.nextTick() fires more immediately than setImmediate()

3.Name 10 global modules/methods available in Node environment.
module
process
console
fetch 
require()
Response
Request
setImmediate(callback[, ...args])
setInterval(callback, delay[, ...args])
setTimeout(callback, delay[, ...args])
*/

// Fix the slow function to be asynchronous/non-blocking
function slow(callback) {
  for (let i = 0; i <= 5e8; i++) {} // not effective you can remove
  if (Math.random() > 0.5) {
    return callback("Error", null);
  }
  callback(null, { id: 12345 });
}

function exec(fn) {
  let obj = {};
  //slow(callback("Error", { id: 12345 }))
  fn(function (err, data) {
    obj.done = function (cb) {
      if (err === null) {
        cb(data); //.done(function (data)
      }
      return this; //this whole obj returns again
    };
    obj.fail = function (cb) {
      if (err !== null) {
        cb(err); //.fail(function (err)
      }
      return this; //this whole obj returns again
    };
  });
  return obj;
}

exec(slow)
  //           cb(data);
  .done(function (data) {
    console.log(data);
  })
  //           cb(err);
  .fail(function (err) {
    console.log("Error: " + err);
  });
