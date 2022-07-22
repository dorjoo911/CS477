const result = function (exports, module) {
  exports = module.exports; // module point exports
  exports.firstname = "John"; // exports has fistname John
  module.exports.lastname = "Smith"; // exports has lastname Smith
  exports = {
    // exports has method getFullname
    getFullName: function () {
      console.log("John Smith");
    },
  };
  return module.exports; // return exports only
}.apply(null, [null, { exports: {} }]); //apply(this==null, [arg1===null, arg2=={exports:{}}])

console.log(result); //method not used. So, print {firstname:"John",lastname:"Smith"}
