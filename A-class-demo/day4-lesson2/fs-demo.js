const fs = require('fs');
const path = require('path');

// const greeting = fs.readFileSync('./public/resources/greeting.txt', 'utf-8');

console.log('start');
const greeting = fs.readFileSync(path.join(__dirname, 'public', 'resources', 'greeting.txt'), 'utf8');
console.log(`1: ${greeting}`);

fs.readFile(path.join(__dirname, 'public', 'resources', 'greeting.txt'), 
                        'utf8', function(err, data){
    if(err){
        //deal error
        console.log(err);
    } else {
        console.log(`2: ${data}`);
    }

});

fs.writeFile(path.join(__dirname, 'hello.txt'), 'Hi from CS477', function(err){
    console.log(err);
});

console.log('end');