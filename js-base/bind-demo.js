function fn1(a, b, c) {
    console.log(this);
    console.log(a, b, c);
    return 'this is fn1';
}

const fn2 = fn1.bind({ x: 100 }, 10, 20, 30);
fn2();

// 实现bind
Function.prototype.myBind =  function(context){
    if(typeof this !== "function"){
        throw `${this} is not a function`
    }
    let args = Array.prototype.slice.call(arguments,1);
    let self = this,
        fn = function(){
              return self.apply(this instanceof fn?this:context, [...args,...arguments]);     
        };
    if(this.prototype){
        fn.prototype = this.prototype;
    }
    return fn;
};