class EventEmeitter{
    _events = {};
    on(eventName,callback){
        if(!this._events[eventName]){
           this._events[eventName] = [];
        }
         this._events[eventName].push(callback)
    }
    emit(eventName,...args){
        if(this._events[eventName]){
            this._events[eventName].forEach(fn => fn(...args))
        }
    }
    off(eventName,fn){
        if(this._events[eventName]){
            this._events[eventName] = this._events[eventName].filter(eFn => eFn!== fn)
        }
    }
}
let e = new EventEmeitter();
e.on("listen",(arr)=>{
    console.log(arr);
})
e.emit("listen",[1,2,3])

function test(){
    console.log("test");
}
e.on("listen",test);
e.emit("listen")

e.off("listen",test)
e.emit("listen")

e.emit("listen")