function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.onload = () => {
            resolve(img);
        }
        img.onerror = () => {
            reject(new Error(`图片加载失败 ${url}`))
        }
        img.src = src;
    })
}

const url1 = "https://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg";
const url2 = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586148273626&di=957f75de2743ecebee9acd5c5b319a21&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg";

// loadImg(url).then(img => {
//     console.log(img);
//     document.body.appendChild(img);
//     return img;
// }).then(img => {
//     console.log(img.width)
// }).catch(err => {
//     console.log(err);
// })

loadImg(url1).then(img1 => {
    console.log(img1.width);
    return img1;           // 普通对象
}).then(img1 => {
    console.log(img1.height);
    return loadImg(url2);  // promise 实例
}).then(img2 => {
    console.log(img2.width);
    return img2;
}).then(img2 => {
    console.log(img2.height);
}).catch(err => {
    console.log(err);
})