
const xhr = new XMLHttpRequest();
/**
 *  xhr.readyState 状态
 *  0 (未初始化) 还没有调用send()方法
 *  1 （载入） 已经调用send()方法，正在发送请求
 *  2 （载入完成） send()方法执行完成，已经接收到全部响应内容
 *  3 (交互)正在解析响应内容
 *  4 (完成)响应内容解析完成，可以再客户端调用
 */

/**
 *  xhr.status 就是http 状态码
 *  2xx  表示成功处理请求，如200
 *  3xx  需要重定向，浏览器直接跳转，如301(永久) 302(临时) 304(资源未改变)
 *  4xx  客户端请求错误，如404(请求地址错误) 403(客户端没有权限)
 *  5xx  服务端错误
 */

//GET
// xhr.open("GET", "data/test2.json", false); //false 是同步请求 true是异步
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             console.log(JSON.parse(xhr.responseText));
//         } else {
//             console.log("其他情况")
//         }
//     }
// }
// xhr.send(null);

//post
// xhr.open("POST", "/post/post.json", false);
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             JSON.parse(xhr.responseText)
//         } else {
//             console.log("其他情况")
//         }
//     }
// }
// let params = {
//     username: "asdsad",
//     pwd: "asdsad"
// }
// xhr.send(JSON.stringify(params));

function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false); //false 是同步请求 true是异步
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error("其他情况"))
                }
            }
        }
        xhr.send(null);
    })
}

const url = "data/test.json";
ajax(url).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err)
})