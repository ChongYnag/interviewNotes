// 函数作为返回值
// function create(){
//     let a = 100;
//     return function(){
//         console.log(a);
//     }
// }

// const fn = create();
// let a = 200;
// fn();

// 函数作为参数被传递
function frint(fn){
    let a = 200;
    fn()
};
let a = 100;
function fn(){
    console.log(a)
}
frint(fn);

// 闭包： 自由变量的查找，是在函数定于的地方，向上级作用于查找
//        不是在执行的地方！！！