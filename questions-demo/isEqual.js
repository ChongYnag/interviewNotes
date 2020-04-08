const obj1 = {
    a: 100,
    b: {
        x: 100,
        y: 200
    }
}

const obj2 = {
    a: 100,
    b: {
        x: 100,
        y: 200,
        z: 300
    }
}

console.log(isEqual(obj1, obj2));

// 深度比较
function isEqual(obj1, obj2) {
    // 校验参数为对象或者数组 
    if (!(typeof obj1 === "object" && obj1 !== null)
        || !(typeof obj2 === "object" && obj2 !== null)) {
        return obj1 === obj2
    }
    // 对象的属性length不等 那肯定不等
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }
    for (let key in obj1) {
        let res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return false;
        }
    }
    return true;
}