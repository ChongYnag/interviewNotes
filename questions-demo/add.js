function add(x) {
    let args = [x];
    let fn = function (y) {
        args.push(y);
        return fn;
    };
    fn.toString = function () {
        return args.reduce((x, y) =>  x + y )
    }
    return fn;
}
add(1)(2)(3) == 6;