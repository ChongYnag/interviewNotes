/**
 *  继承
 */

// 定义一个父类
function Animal(name) {
    // 属性
    this.name = name || 'Animal';
    //  实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
}


/**
 *  1. 原型链继承
 *     核心：将父类的实例作为子类的原型
 *     特点：
 *          1: 实例是子类的实例,也是父类的实例
 *          2：父类新增的原型方法/属性，子类都可以访问到
 *     缺点：
 *          1：继承单一，无法实现多继承
 *          2：新实例无法向父类构造函数传参
 *          3：所有实例都会共享父类实例的属性（一个实例修改原型属性，另一个实例的原型属性也会被修改）
 */
// function Cat() {
// }
// Cat.prototype = new Animal();
// Cat.prototype.name = "cat";

// let cat = new Cat();
// console.log(cat.name);               //cat
// console.log(cat.eat('fish'));        //cat正在吃：fish
// console.log(cat.sleep());            //cat正在睡觉！   
// console.log(cat instanceof Animal);  //true 
// console.log(cat instanceof Cat);     //true


/**
 *  2.借用构造函数继承
 *    核心：用.call()和.apply()将父类构造函数引入子类函数  （在子类函数中做了父类函数的自执行（复制））
 *    特点：
 *          1: 只继承了父类构造函数的属性，没有继承父类原型的属性。
 *          2：可以实现多继承（call多个父类对象）
 *          3: 创建子类实例时，可以向父类传递参数
 *    缺点：
 *          1：实例并不是父类的实例，只是子类的实例
 *          2：只能继承父类的实例属性和方法，不能继承原型属性/方法
 *          3：无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
 *          
 */
// function Cat(name) {
//     Animal.call(this, '参数'); //可以接受参数
//     this.name = name || "Tom";
// }

// let cat = new Cat();
// console.log(cat.name);                  //Tom
// console.log(cat.sleep());               //Tom正在睡觉！
// console.log(cat instanceof Animal);     //false
// console.log(cat instanceof Cat);        //true


/**
 *  3.组合继承 （组合原型链继承和借用构造函数继承）（常用）
 *    核心：结合了两种模式的优点，传参和复用
 *    特点：
 *          1: 可以继承父类原型上的属性，可以传参，可复用。
 *          2：每个新实例引入的构造函数属性是私有的。
 */

function Cat(name) {
    Animal.call(this, "参数") //可以接受参数
    this.name = name || "Tom"
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat; //组合继承也是需要修复构造函数指向的。

var cat = new Cat();
console.log(cat.name);              //Tom
console.log(cat.sleep());           //Tom正在睡觉！
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat);    //true

/**
 * 4.原型式继承
 *    核心：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
 *    特点：
 *          1: 类似于复制一个对象，用函数来包装。
 *    缺点：
 *          1：所有实例都会继承原型上的属性。
 *          2：无法实现复用。（新实例属性都是后面添加的）
 */