const Person = require("./export");
const person = new Person();
person.getName();

person.name = "Sara Conner";
person.getName();

const Person2 = require("./export");
const person2 = new Person2();
person2.getName();
