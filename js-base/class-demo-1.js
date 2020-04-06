//类
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHai() {
        console.log(
            `姓名 ${this.name},年龄 ${this.age}`
        )
    }
    study() {

    }
}

//通过类声明对象/实例

const xiaohua = new Student("小花", 17);
console.log(xiaohua.name) // 小花
xiaohua.sayHai();         //姓名 小花,年龄 17