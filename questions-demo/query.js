// 传统方式 正则
// function qs(name) {
//     const search = location.search.substr(1);
//     //a=10&b=30&c=20
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
//     const res = search.match(reg);
//     if (res === null) {
//         return null
//     }
//     console.log(res);
//     return res[2];
// }

// 循环遍历字符
// function qs(name) {
//     const search = location.search.substr(1);
//     //a=10&b=30&c=20
//     let arr = search.split("&");
//     let res;
//     arr.forEach(it => {
//         let nameArr = it.split("=");
//         if (nameArr[0] === name) {
//             res = nameArr[1];
//         }
//     })
//     return res;
// }

// 转换成对象
function qs() {
    const result = {};
    const search = location.search.substr(1);
    //a=10&b=30&c=20
    let arr = search.split("&");
    arr.forEach(it => {
        let nameArr = it.split("=");
        let key = nameArr[0];
        let value = nameArr[1];
        result[key] = value;
    })
    return result;
}

console.log(qs());

// URLSearchParams
function qsUrl(name) {
    const search = location.search;
    const p = new URLSearchParams(search);
    return p.get(name);
}
