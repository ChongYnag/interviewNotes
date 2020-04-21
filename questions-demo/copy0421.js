//手写深度比较
let obj1 = { a: 100, b: { x: 200, y: 300 } };
let obj2 = { a: 100, b: { x: 200, y: 300 } };

function isEqual(obj1, obj2) {
    //校验是否是对象
    if ((typeof obj1 !== "object" && obj1 !== null) || (typeof obj2 !== "object" && obj2 !== null)) {
        return obj1 === obj2;
    }
    //考虑2个对象完全相等
    if (obj1 === obj2) {
        return true;
    }
    //考虑对象的key的length数
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    //深度比较
    for (let key in obj1) {
        let res = isEqual(obj1[key], obj2[key])
        if (!res) {
            return false
        }
    }
    return true;
}

//最值默认行为 冒泡
// e.preventDefault();
// e.stopPropagation();

// dom 增删改查
document.getElementById();
document.getElementsByTagName();
document.getElementsByClassName();

document.createElement();
document.createDocumentFragment();

document.removeChild();
document.appendChild();
document.insertBefore();


// 手写 ajax
function ajax(url, method, params) {
    let type = method === "GET" ? null : JSON.stringify(params);
    new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    //其他情况
                    reject(new Error("其他情况"))
                }
            }
        }
        if (type) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        xhr.send(type);
    })
}

// 手写trim()
String.prototype.myTrim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//获取最大值
function max() {
    let arr = Array.prototype.slice.call(arguments);
    let maxNum = 0;
    arr.forEach(it => {
        if (it > maxNum) {
            maxNum = it;
        }
    })
    return maxNum;
}

//获取url参数 qs  //http://www.baidu.com/?a=10&b20&c=56#hash

// 返回对象 参数
function qs(name = null) {
    let search = location.search.substr(1);
    let result = {};
    let arr = search.split("&");
    arr.forEach(it => {
        let item = it.split("=");
        let key = item[0];
        let value = item[1];
        result[key] = value;
    })
    return name ? result[name] : result;
}

function qsApi() {
    let arr = new URLSearchParams(location.search);
    console.log(arr.get("a"));
}

// 数组flat
let arr = [10, 20, 30, [10, 20], 60, [10, [20, [10]]]];
function flat(arr) {
    let isDeep = arr.some(it => it instanceof Array);
    if (!isDeep) {
        return arr;
    }
    return flat([].concat(...arr))
}

//数组去重
let arr = [2, 3, 4, 5, 6, 6, 4, 3, 3, 4, 4, 5, 5, 3, 3]
function unique(arr) {
    let result = [];
    arr.forEach(it => {
        if (result.indexOf(it) < 0) {
            result.push(it)
        }
    })
    return result;
}

//使用set 去重
console.log(new Set(arr))

//手写深拷贝
function deepClone(obj, hash = new WeakMap()) {
    // 获取obj的类型
    let type = Object.prototype.toString.call(obj).substr(8, -1);

    // 对象或者数组
    if (type === "Object" || type === "Array") {
        let result = {};
        if (hash.get(obj)) return hash.get(obj);
        hash.set(obj, result)
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(obj[key])
            }
        }
        return result;
    }
    // 函数
    if (type === "Function") {
        return eval(`(${obj.toString()})`)
    }
    // 日期对象
    if (type === "Data") {
        return new Data(obj.getTime());
    }
    // 正则
    if (type === "RegExp") {
        let res = new RegExp(obj.source, /^\w*$/.exec(obj))
        res.lastIndex = obj.lastIndex;
        return res;
    }
    // Symbol
    if (type === "Symbol") {
        return object(Symbol.prototype.valueOf.call(obj))
    }
    return obj
}

// 手写 call
Function.prototype.myCall = function (context) {
    if (typeof this !== "function") {
        throw `${this} is not function`
    }
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    context.fn(...args);
    delete context.fn;
}

Function.prototype.myApply = function (context) {
    if (typeof this !== "function") {
        throw `${this} is not function`
    }
    context = context || window;
    context.fn = this;
    let args = arguments[1] || [];
    context.fn(...args);
    delete context.fn;
}

Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
        throw `${this} is not function`
    }
    let fn = this;
    let args = Array.prototype.slice.call(arguments, 1);
    let bFn = function () {
        fn.apply(this instanceof bFn ? this : context, [...args, ...arguments]);
    }
    if (fn.prototype) {
        bFn.prototype = Object.create(fn.prototypef)
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
        return args.reduce((x, y) => x + y)
    }
    return fn;
}