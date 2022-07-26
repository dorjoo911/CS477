console.log("start sync - 1"); //sync - 1

setTimeout(() => {
  console.log("timeout 1 async immediately-5"); //async immediate-5
}, 0);

process.nextTick(() => {
  console.log("next tick 2 async more immedaite-3"); //async more immedaite-3
});

setImmediate(() => {
  console.log("setImmediate 3 async-6"); //async-6
});

process.nextTick(() => {
  console.log("nect tick 4 async more immedaite-4"); //async more immedaite-4
});

console.log("end sync - 2"); //sync - 2
