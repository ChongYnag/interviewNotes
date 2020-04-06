// const div1 = document.getElementById("div1");
// console.log("div", div1);

// const divList = document.getElementsByTagName("div");
// console.log(divList.length);
// console.log(divList[1]);

// const containerList = document.getElementsByClassName("container");
// console.log(containerList.length);
// console.log(containerList[1]);

// const pList = document.querySelectorAll('p');
// console.log(typeof pList)


const pList = document.querySelectorAll('p');
const p1 = pList[0];

// property 形式
// p1.style.width = "100px";
// console.log(p1.style.width);
// p1.className = "red";
// console.log(p1.className);
// console.log(p1.nodeName);
// console.log(p1.nodeType);

// attribute
p1.setAttribute("data-name", "chongyang");
console.log(p1.getAttribute("data-name"));
p1.setAttribute("style","font-size:50px");
console.log(p1.getAttribute("style"));
