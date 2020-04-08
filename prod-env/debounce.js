const input1 = document.getElementById('input1')

// let timer = null;
// input1.addEventListener('keyup', function () {
//     if (timer) {
//         clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//         console.log(input1.value)
//         timer = null;
//     }, 300)
// });

//防抖函数 事件结束后 一次执行
function debounces(fn, delay = 500) {
    let timer = null;
    return function (...arg) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arg);
            timer = null;
        }, delay)
    }
}

input1.addEventListener('keyup', debounces(function () {
    console.log(this.value);
}, 500));
