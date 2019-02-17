class Person {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName() {
        return this.name + " " + this.surname;
    }

    static older (person1, person2) {
        return (person1.age > person2.age) ? person1 : person2;
    }
}

class PersonWithMiddle extends Person{
    constructor(props) {
        super(props.name, props.surname, props.age);
        this.middle = props.middle;
    }

    getFullName() { //오버라이드
        return this.name + " " + this.middle + " " + this.surname;
    }
}

let p1 = new PersonWithMiddle({name:"lee", surname:"jin", middle:"su", age:32});
let p2 = new PersonWithMiddle({name:"chang", surname:"ra", middle:"gu", age:34});

console.log(p1.getFullName());
console.log(Person.older(p1,p2).name);
