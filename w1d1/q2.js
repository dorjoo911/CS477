let db = [
  { id: 1, fname: "John", lname: "Smith" },
  { id: 2, fname: "Lucy", lname: "Jark" },
  { id: 3, fname: "Edward", lname: "Capton" },
];

class Student {
  constructor(id, firstname, lastname) {
    this.id = id;
    this.fname = firstname;
    this.lname = lastname;
  }

  save() {
    const stu = db.find((user) => user.id === this.id);
    if (stu) {
      throw new Error("Student already exists with id: " + this.id);
    } else {
      db.push(this);
    }
  }

  edit() {
    const index = db.findIndex((stu) => stu.id === this.id);
    if (!index) {
      throw new Error(`Student doesn't exist with id ${this.id}`);
    } else {
      db[index] = this;
    }
  }

  static getById(id) {
    const stu = db.find((user) => user.id === id);
    if (!stu) {
      throw new Error(`Student doesn't exist with id ${id}`);
    } else {
      console.log(stu);
    }
  }

  static getAll() {
    if (db.length === 0) {
      throw new Error(`There is no data`);
    } else {
      return console.log(db);
    }
  }

  static deleteById(id) {
    const index = db.findIndex((stu) => stu.id === id);
    if (!index) {
      throw new Error(`Student doesn't exist with id ${id}`);
    } else {
      db.splice(index, 1);
    }
  }
}

new Student(4, "Tina", "Xing").save(); //save to db
console.log(JSON.parse(JSON.stringify(db[3])));
new Student(4, "Miss", "Xing").edit(); //edit studentId with id=4
console.log(JSON.parse(JSON.stringify(db[3])));
Student.deleteById(4); //remove studentId=4 from db
Student.getAll(); //return db;
Student.getById(1); //return {id:1, fname: 'John', lname: 'Smith'}
console.log(db);
