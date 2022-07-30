// class Person {
//   constructor(name = "John Don") {
//     this.name = name;
//   }

//   getName() {
//     console.log(this.name);
//   }
// }
// module.exports = Person;
exports.getName = function () {
  console.log("exports");
};
