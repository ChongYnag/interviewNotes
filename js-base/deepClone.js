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
function deepClone(obj){
    //获取type
    let type = Object.prototype.toString.call(obj).slice(8,-1);
    if(type === "Object" || type ==="Array"){
        let result = obj instanceof Array?[]:{};
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                result[key]=deepClone(obj[key]);
            }
        }
        return result;
    }
    if(type === "RegExp"){
        let reg = new RegExp(obj.source,/\w*$/.exec(obj));
        reg.lastIndex = obj.lastIndex;
        return reg
    }
    if(type === "Date"){
        return new Date(obj.getTime());
    }
    if(type === "Symbol"){
        return Object(Symbol.prototype.valueOf.call(obj));
    }
    
    return obj;
}

function deepClone(obj, cache = new WeakMap()) {
    const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    if (type === 'object' || type === 'array') {
        if (cache.get(obj)) return cache.get(o)
        const result = type === 'object' ? {} : [];
        cache.set(obj, result);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(o[key], cache)
            }
        }
        return result;
    }

    if (type === 'function') {
        return eval(`(${obj.toString()})`)
    }

    if (type === 'regexp') {
        const r = obj.constructor(o.source, /\w*$/.exec(obj))
        r.lastIndex = obj.lastIndex
        return r
    }

    if (type === 'date') {
        return new Date(o.getTime())
    }

    if (type === 'symbol') {
        return Object(Symbol.prototype.valueOf.call(obj))
    }

    return obj
}