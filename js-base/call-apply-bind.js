

let obj = {
    name: "一个"
}

function allName(firstName, laseName) {
    console.log(this);
    console.log(`我的全名是"${firstName}${this.name}${laseName}"`)
}

allName("我是", "前端");
// Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
//我的全名是"我是前端"

/**
 * call 接受多个参数，第一个参数为函数上下文也就是this，后边参数为函数本身参数
 */
allName.call(obj, "我是", "前端");
//{name: "一个"}  
//我的全名是"我是一个前端"

/**
 * apply 参数列表是个数组
 */
allName.apply(obj, ["我是", "前端"]);
//{name: "一个"}  
//我的全名是"我是一个前端"

/**
 * bind 参数列表多个，返回一个可执行函数,切参数不能是数组
 */

let fnBind = allName.bind(obj, ...["我是"]);
fnBind("前端");

/**
 *  实现call、apply、bind
 */

Function.prototype.newCall = function (context) {
    //异常处理
    if (typeof this !== "function") {
        throw `${this} is not a function`;
    }
    //第一个参数如果没传 那么sele指向window
    context = context || window;
    context.fn = this;
    //去除第一个元素
    let args = [...arguments].slice(1);
    context.fn(...args);
    delete context.fn;
}
//测试newCall
allName.newCall(obj, "我是", "前端");

/**
 *  实现apply
 */
Function.prototype.newApply = function (context) {
    //异常处理
    if (typeof this !== "function") {
        throw `${this} is not a function`;
    }
    context = context || window;
    context.fn = this;
    //apply 传递参数是数组 所以这里不需要解构了
    let args = arguments[1] || [];
    context.fn(...args);
    delete context.fn;
}
//测试newApply
allName.newApply(obj, ["我是", "前端"]);

/**
 *  实现bind
 */
Function.prototype.newBind = function (context) {
    //异常处理
    if (typeof this !== "function") {
        throw `${this} is not a function`;
    }
    let self = this;
    // 讲参数解析为数组
    let args = [...arguments].slice(1);
    return function () {
        self.apply(context, args);
    }
}
//测试newBind
let newBind = allName.newBind(obj, "我是", "前端");
newBind();