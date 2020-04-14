/**
 * 排序
 */

//冒泡排序
function bubbleSort(arr) {
    console.time("冒泡排序耗时");
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var lemp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = lemp;
            }
        }
    }
    console.timeEnd("冒泡排序耗时")
    return arr
}
// 冒泡排序耗时: 0.027099609375ms
let arr = [4, 4, 87, 9, 7, 1, 2, 8, 9, 51, 40]
bubbleSort(arr)

//快排
function quickSort(arr) {
    // 如果数组长度小于1,直接返回
    if (arr.length <= 1) {
        return arr;
    }
    // 取基准点
    let pivotIndex = Math.floor(arr.length / 2);
    // 从数组中取出基准元素 
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    arr.forEach(it => {
        if (it < pivot) {
            left.push(it);
        } else {
            right.push(it);
        }
    })
    return quickSort(left).concat(pivot, quickSort(right));
}

//插入
function insertion(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        // 当前值小于上一个值 就移动位置
        while (preIndex >= 0 && current < arr[preIndex]) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}


// 二叉树遍历
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

let tree = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3))

// 广度优先
function bfs(root) {
    const queue = [root]
    while (queue.length) {
        p = queue.shift();
        console.log(p.data);
        if (p.left) queue.push(p.left);
        if (p.right) queue.push(p.right)
    }
}

// 深度优先  
/**
 *  1.前序遍历  根左右   
 *  2.中序遍历  左根右
 *  3.后序遍历  左右根
 *
 */

function preOrder(p) {
    if(!p) return;
    console.log(p.data);
    preOrder(p.left);
    preOrder(p.right);
}


function preOrder(p) {
    if(!p) return;
    preOrder(p.left);
    console.log(p.data);
    preOrder(p.right);
}


function preOrder(p) {
    if(!p) return;
    preOrder(p.left);
    preOrder(p.right);
    console.log(p.data);
}