const obj1 = {
    a: 10,
    b: 20,
    sun: function () {

    }
};

const obj2 = new Object({
    a: 10,
    b: 20,
    sun: function () {

    }
});
const obj21 = new Object(obj1);

const obj3 = Object.create(null);
const obj4 = Object.create({
    a: 10,
    b: 20,
    sun: function () {

    }
});

console.log(obj1, obj2);
console.log(obj1 === obj2);
console.log(obj3);
console.log(obj4);