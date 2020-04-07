/**
 *  深拷贝
 */

const obj1 = {
    age: 20,
    name: "obj1",
    address: {
        city: "beijing"
    },
    arr: ["a", "b", "c"]
};

const obj2 = deepClone(obj1);
obj2.address.city = "shanghai";
obj2.arr[0] = "a1";
console.log(obj1.address.city);
console.log(obj1.arr[0]);

/**
 * 深拷贝 
 * @param {*} obj 要拷贝的对象
 */
function deepClone(obj) {
    if (typeof obj !== "object" || obj == null) {
        // obj 是null，或者不是对象和数组，直接返回
        return obj;
    }
    let result = obj instanceof Array ? [] : {};
    for (let key in obj) {
        // 保证 key 不是原型的属性
        if (obj.hasOwnProperty(key)) {
            //递归调用！！1
            result[key] = deepClone(obj[key]);
        }
    }
    return result;
}


function deepClone(o, cache = new WeakMap()) {
    const type = Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
    if(type === 'object' || type === 'array') {
        if(cache.get(o)) return cache.get(o)
        const result = type === 'object' ? {} : [];
        cache.set(o, result);
        for(let key in o) {
            if(o.hasOwnProperty(key)) {
                result[key] = deepClone(o[key], cache)
            }
        }

        return result
    }

    if(type === 'function') {
        return eval(`(${ o.toString()})`)
    }

    if(type === 'regexp') {
        const r = o.constructor(o.source, /\w*$/.exec(o))
        r.lastIndex = o.lastIndex
        return r   
    }

    if(type === 'date') {
        return new Date(o.getTime())
    }

    if(type === 'symbol') {
        return Object(Symbol.prototype.valueOf.call(o))
    }
    
    return o
}