const user = {
    firstname: 'John',
    lastname: 'Smith',
    getFullName: function(){
        return this.firstname + ' ' + this.lastname;
    }
}

const logMe = function(weight, height){
    return `${this.getFullName()}, weight: ${weight}, ${height}`;
}

console.log(logMe.apply(user, [180, 90]));
console.log(logMe.call(user, 99, 89));
console.log(logMe.bind(user, 77, 66)());
