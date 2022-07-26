const person = require('./pattern');   

console.log(person); 
console.log(person.getName); 
person.getName();

person.name = 'Jack';

person.getName();