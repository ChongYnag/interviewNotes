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
function trottle(fn,delay=500){
    let timer = null;
    return function(...arg){
        if(timer) return;
        timer = setTimeout(()=>{
            fn.apply(this,arg);
            timer = null;
        },delay)
    }
}
div1.addEventListener('drag', throttle(e => {
    console.log(e.offsetX, e.offsetY);
}, 500))


