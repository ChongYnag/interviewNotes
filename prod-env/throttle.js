const div1 = document.getElementById('div1')
// let timer = null;
// div1.addEventListener('drag', function (e) {
//     if (timer) {
//         return
//     }
//     timer = setTimeout(() => {
//         console.log(e.offsetX, e.offsetY);
//         timer = null
//     }, 500)
// })

// 节流函数  减少事件触发次数
function throttle(fn, delay = 100) {
    let timer = null;
    return function () {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
}
div1.addEventListener('drag', throttle(e => {
    console.log(e.offsetX, e.offsetY);
}, 500))


