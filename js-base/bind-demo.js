function fn1(a, b, c) {
    console.log(this);
    console.log(a, b, c);
    return 'this is fn1';
}

const fn2 = fn1.bind({ x: 100 }, 10, 20, 30);
fn2();

// 实现bind
Function.prototype.myBind = function () {
    
} 