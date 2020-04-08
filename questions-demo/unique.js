// 传统方式
function unique(arr) {
    const res = [];
    arr.forEach(it => {
        if (res.indexOf(it) < 0) {
            res.push(it);
        }
    })
    return res;
};

// 使用 es6 Set 
// function unique(arr) {
//     return [...new Set(arr)]
// };

const arr = [2, 4, 5, 6, 3, 4, 5, 2];
console.log(unique(arr))