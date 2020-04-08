const arr = [10, 20, 30, 40];

// pop 从数组末端弹出1个元素
// const popRes = arr.pop();
// console.log(popRes, arr);

// push 从数组末端弹出1个元素
// const pushRes = arr.push(50); //返回数组length
// console.log(pushRes, arr);

// unshift 从数组s首端弹出1个元素
// const unshiftRes = arr.unshift(5); //返回数组length
// console.log(unshiftRes, arr);

// shift 从数组首端弹出1个元素
// const shiftRes = arr.shift(); //返回数组length
// console.log(shiftRes, arr);

// 纯函数 1：不改变原数组  2. 返回一个数组

// concat
// const arr1 = arr.concat([50, 60, 70]);

// map
// const arr2 = arr.map(num => num * 10);

// fillter 
// const arr3 = arr.filter(num => num > 25);

// slice
const arr4 = arr.slice();
const arr5 = arr.slice(1, 4); //参数1:开始index,参数2：结束index 从0开始 参数2没有 相当于截取到最后 参数可以为负数 从后往前

// 非纯函数 (修改原数组)
// splice
const spliceRes = arr.splice(1, 2, "a", "b", "c"); //剪接功能
// push pop shift unshift
// forEach
// some every
// reduce


const res = [10, 20, 30].map(parseInt);
console.log(res);

[10, 20, 30].map((num, index) => {
    return parseInt(num, index);
})