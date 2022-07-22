let db = [
    {id:1, fname: 'John', lname: 'Smith'},
    {id:2, fname: 'Lucy', lname: 'Jark'},
    {id:3, fname: 'Edward', lname: 'Capton'}
];

class Student {
    constructor(id, firstname, lastname){
        this.id = id;
        this.fname = firstname;
        this.lname = lastname;
    }

    save(){
        console.log(this);
        const stu = db.find(user => user.id === this.id);
        if(stu){
            throw new Error('Student already exists with id: ' + this.id); 
        } else {
            db.push(this);
        }

    }

    edit(){
        const index = db.findIndex(stu => stu.id === this.id);
        if(index < 0) {
            throw new Error('Student does not exists with id: ' + this.id); 
        } else {
            db[index] = this;
        }
    }

    static getById(id){
        return db.find(user => user.id === id);
    }

    static getAll(){
        return db;
    }

    static deleteById(id){
        const index = db.findIndex(stu => stu.id === id);
        return db.splice(index, 1);
    }
}

new Student(4, 'Tina', 'Xing').save(); //save to db
console.log(db);
new Student(4, 'Miss', 'Xing').edit(); //edit studentId with id=4, if doesn't exist, throw error: student doesn't exist
console.log(db);
Student.deleteById(1); //remove studentId=4 from db
console.log(db);
console.log(Student.getAll()); //return db;
Student.getById(1); //return {id:1, fname: 'John', lname: 'Smith'}, if doesn't exist, throw error: student doesn't exist