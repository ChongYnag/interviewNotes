let a;
for (let i = 0; i < 10; i++) {
    a = document.createElement("a");
    a.innerHTML = `${i}<br />`;
    a.addEventListener('click', (e) => {
        //取消事件的默认动作。
        e.preventDefault();
        alert(i);
    });
    document.body.appendChild(a);
}