//手写深度比较
let obj1 = { a: 100, b: { x: 200, y: 300 } };
let obj2 = { a: 100, b: { x: 200, y: 300 } };

function isEqual(obj1, obj2) {
    if ((typeof obj1 !== "object" && typeof obj1 !== null)
        || (typeof obj2 !== "object" && typeof obj2 !== null)
    ) {
        return obj1 === obj2;
    }
    if (obj === obj2) {
        return true;
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (let key in obj1) {
        let res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return false;
        }
    }
    return true;
}
console.log(isEqual(obj1, obj2));

//最值默认行为 冒泡
e.preventDefault();
e.stopPropagation();

// dom 查找 添加 删除 DOM节点

// 手写AJAX
let xhr = new XMLHttpRequest();
xhr.open();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {

        }
    }
};
xhr.send();

// 用Promise 封装一个AJAX

function ajax(url, data = null) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error("其他情况"));
                }
            }
        };
        xhr.send(data);
    })
}


// new Object()  和 Object.create() 区别;
//Object.create() 创建了一个空对象，并把空对象的原型指向了传入的对象


// 手写 trim
String.prototype.myTrim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//获取最大值
function max() {
    let arr = Array.prototype.slice.call(arguments);
    let max = 0;
    arr.forEach(it => {
        if (it > max) max = it;
    })
    return max;
}
//Math.max()  Math.min()

//捕获 js中的异常
try {

} catch (error) {

}
window.onerror = function () {

}

window.localStorage

//获取url参数 qs  //http://www.baidu.com/?a=10&b20&c=56#hash


// 返回参数
function qs(name) {
    let search = location.search.substr(1);   //a=10&b20&c=56
    let arr = search.split("&");
    let res;
    arr.forEach(it => {
        let params = it.split("=");
        if (params[0] === name) {
            res = params[1];
        }
    })
    return res;
}


// 返回对象
function qs() {
    let search = location.search.substr(1);   //a=10&b20&c=56
    let result = {};
    let arr = search.split("&");
    arr.forEach(it => {
        let params = it.split("=");
        let key = params[0];
        let value = params[1];
        result[key] = value;
    })
    return result;
}

// URLSearchParams
function qs(name) {
    let search = location.search;
    const p = new URLSearchParams(search);
    return p.get(name)
}

// 数组flat
let arr = [10, 20, 30, [10, 20], 60, [10, [20, [10]]]];
function flat(arr) {
    let isDeep = arr.some(it => Array.isArray(it));
    if (!isDeep) {
        return arr;
    }
    let res = Array.prototype.concat.call([], ...arr);
    return flat(res);
}

//数组去重
function unique(arr) {
    const result = [];
    arr.forEach(it => {
        if (result.indexOf(it) < 0) {
            result.push(it);
        }
    })
    return result;
}

//使用set去重
function unique(arr) {
    const result = new Set(arr);
    return [...result];
}

//手写深拷贝
function deepClone(obj) {
    let type = String.prototype.toString.call(obj).substr(8, -1);
    if (type === "Object" || type === "Array") {
        let result = obj instanceof Array ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(obj[key])
            }
        }
        return result;
    }
    if (type === "Function") {
        return eval(`(${obj.toString()})`)
    }
    if (type === "Date") {
        return new Date(obj.getTime())
    }
    if (type === "RegExp") {
        let reg = new RegExp(obj.source, /^\w*$/.exec(obj))
        reg.lastIndex = obj.lastIndex;
        return reg;
    }
    if (type === "Symbol") {
        return Object(Symbol.prototype.valueOf.call(obj))
    }
    return obj;
}

// 手写 call
Function.prototype.myCall = function (context) {
    if (typeof this !== "function") {
        throw `this is not a function`
    }
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    context.fn(...args);
    delete context.fn;
}

//手写 apply
Function.prototype.myApply = function (context) {
    if (typeof this !== "function") {
        throw `this is not a function`
    }
    context = context || window;
    context.fn = this;
    let args = arguments[1] || [];
    context.fn(...args);
    delete context.fn;
}

//手写bind 
Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
        throw `this is not a function`
    }
    let fn = this, bFn;
    let arg = Array.prototype.slice.call(arguments, 1);

    bFn = function () {
        fn.apply(this instanceof bFn ? this : context, [...arg, ...arguments])
    }
    if (fn.prototype) {
        bFn.prototype = fn.prototype;
    }
    return bFn;
}

//add(1)(2)(3) == 6;
function add(x) {
    let args = [x];
    let fn = function (y) {
        args.push(y);
        return fn;
    }
    fn.toString = function () {
        args.reduce((x, y) => x + y)
        return args.reduce((x, y) => x + y)
    }
    return fn;
}
add(1)(2)(3) == 6
function add(x) {
    let args = [x];
    let fn = function (y) {
        args.push(y);
        return fn;
    }
    fn.toString = function () {
        return args.reduce((x, y) => x + y);
    }
    return fn;
}


Function.prototype.myBind = function (contenx) {
    if (typeof this !== "function") {
        return new Error("不是一个function")
    }
    let fn = this;
    let args = Array.prototype.slice.call(arguments, 1);
    let bFn = function () {
        fn.apply(this instanceof bFn ? this : contenx, [...args, ...arguments])
    }
    if(fn.prototype){
        bFn.prototype = Object.create(fn.prototype);
    }
    return bFn;
}