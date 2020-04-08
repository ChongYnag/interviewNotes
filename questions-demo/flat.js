function flat(arr) {
    //验证 arr中 还有没有深层数组
    const isDeep = arr.some(it => it instanceof Array)
    if (!isDeep) {
        return arr;
    }
    const res = Array.prototype.concat.apply([], arr);
    return flat(res);
}

// function flat(arr) {
//     return arr.toString().split(",")
// }

const res = flat([1, 2, [3, 4, [5, 8, 8]], 5]);
console.log(res);