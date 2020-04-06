// 通用的事件绑定函数
// function bindEvent(elem, type, fn) {
//     elem.addEventListener(type, fn);
// };

function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector;
        selector = null;
    }
    elem.addEventListener(type, event => {
        const target = event.target;
        if (selector) {
            // 代理绑定
            if (target.matches(selector)) {
                fn.call(target, event);
            }
        } else {
            // 普通绑定
            fn.call(target, event);
        }
    })
}

const p1 = document.getElementById("p1");
bindEvent(p1, "click", event => {
    event.stopPropagation(); // 组织冒泡
    console.log("激活")
})

const body = document.body;
bindEvent(body, "click", event => {
    console.log("取消")
    // console.log(event.target);
})


const div2 = document.getElementById("div2");
bindEvent(div2, "click", event => {
    console.log("div2 click")
    console.log(event.target);
})

// 普通绑定
const btn1 = document.getElementById("btn1");
bindEvent(btn1, "click", function (event) {
    event.preventDefault();
    alert(this.innerHTML)
})

// 代理绑定
const div3 = document.getElementById("div3");
bindEvent(div3, 'click', "a", function (event) {
    event.preventDefault();
    alert(this.innerHTML)
})
