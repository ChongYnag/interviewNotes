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
function add() {
    let args = [...arguments];
    let fn = function () {
        args.push(...arguments);
        return fn;
    }

    fn.toString = function () {
        return args.reduce((x, y) => x + y)
    }
    return fn;
}

// 防抖函数
function fandou(fn, delay = 500) {
    let timer = null;
    return function (...arg) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arg);
            timer = null;
        }, delay)
    }
}

// 节流函数
function jieliu(fn, delay = 500) {
    let timer = null;
    return function (...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        })
    }
}

// 自定义事件
class EventEmeitter {
    _events = {};
    on(eventName, callback) {
        if (!this._events[eventName]) this._events[eventName] = [];
        this._events[eventName].push(callback);
    }
    emit(eventName, ...arg) {
        if (this._events[eventName]) {
            this._events[eventName].forEach(fn => fn(...arg))
        }
    }
    off(eventName, fn) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(efn => efn !== fn)
        }
    }
}

//实现 intanceof
function intance_of(L, R) {
    L = L.__proto__; // Object.getPropertyOf(L)
    let r = R.prototype;
    while (true) {
        if (R === null) return false;
        if (L === r) return true;
        L = L.__proto__;
    }
}

// 实现new
function myNew() {
    // 创建了1个空对象
    let obj = {};
    // 获取构造函数
    let Constrctor = Array.prototype.shift.call(arguments);
    // 连接原型
    obj.__proto__ = Constrctor.prototype;
    // 绑定this
    let result = Constrctor.apply(obj, arguments);
    // //如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象
    return result instanceof Object ? result : obj
}

// 冒泡排序
function maopao(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let lemp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = lemp;
            }
        }
    }
    return arr;
}

// 快排
function kuaipai(arr) {
    // 如果数组长度小于1,直接返回
    if (arr.length <= 1) {
        return arr;
    }
    // 取基准点
    let pivotIndex = Math.floor(arr.length / 2);
    // 去基准元素
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    arr.forEach(it => {
        if (it < pivot) {
            left.push(it);
        } else {
            right.push(it);
        }
    })
    return kuaipai(left).concat(pivot, kuaipai(right))
}

// 插入
function charu(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[1];
        while (preIndex >= 0 && current < arr[preIndex]) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}


// 快排
function kuaipai(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    arr.forEach(it => {
        if (it < pivot) {
            left.push(it);
        } else {
            right.push(it);
        }
    })
    return kuaipai(left).concat(pivot, kuaipai(right))
}

// 插入
function charu(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        // 当前元素比上一个元素小交换位置
        if (preIndex >= 0 && current < arr[preIndex]) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

// 二分查找 数组要先排序好
function erfen(arr, target) {
    let max = arr.length - 1;
    let min = 0;
    while (min <= max) {
        let mid = Math.floor((max + min) / 2);
        if (target < arr[mid]) {
            max = mid - 1;
        } else if(target > arr[mid]){
            min = mid + 1;
        }else{
            return mid
        }
    }
    return -1;
}

// 字符串模板解析
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template,data)
function render(template, data){
    let reg = /\{\{(\w+)\}\}/;
    if(reg.test(template)){
        let key = reg.exec(template)[1];
        console.log(reg.exec(template));
        template= template.replace(reg,data[key]);
        return render(template, data);
    }
    return template;
}

// 转化为驼峰命名

let s1 = "get-element-by-id";
function f(s1){
    return s1.replace(/-\w/g,(x)=>{
        return x.slice(1).toUpperCase();
    })
}
f(s1);

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

let tree = new Node(1, new Node(2, new Node(4, new Node(5), new Node(6))), new Node(3, new Node(6, new Node(7), new Node(8))))


//             1
//         2       3
//     4                 6
//  5      6           7     8  

}
// 广度优先
function bfs(rrot){
    const arr = [root];
    while(arr.length){
        p = arr.shift();
        console.log(p.data);
        if(p.left) arr.push(p.left)
        if(p.right) arr.push(p.right)
    }
}

bfs(tree) //   1 2 3 4 6 5 6 7 8

// 深度优先
/**
 *  1.前序遍历  根左右   
 *  2.中序遍历  左根右
 *  3.后序遍历  左右根
 *
 */

 function preOrder(tree){
    if(!tree) return;
    console.log(tree.data);
    preOrder(tree.left);
    preOrder(tree.right);
 }


 
 function preOrder(tree){
    if(!tree) return;
    preOrder(tree.left);
    console.log(tree.data);
    preOrder(tree.right);
 }

 function preOrder(tree){
    if(!tree) return;
    preOrder(tree.left);
    preOrder(tree.right);
    console.log(tree.data);
 }