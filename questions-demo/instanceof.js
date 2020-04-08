// 实现instanceOf
function instance_of(L,R){
    var r = R.prototype;
    L = Object.getPrototypeOf(L);
     while(true){
         if(L === null) return false;
         if(r === L) return true;
         L = Object.getPrototypeOf(L);
     }
 }