setTimeout(() => console.log('timeout'));
setImmediate(() => console.log('immediate'));
process.nextTick(()=> console.log('nextTick'));