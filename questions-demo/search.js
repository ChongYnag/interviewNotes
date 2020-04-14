/**
 * 查找算法
 */

// 二分查找
function binarySearch(arr, target) {
    let max = arr.length - 1;
    let min = 0;
    while (min <= max) {
        let mid = Math.floor((max + min) / 2)
        if (target < arr[mid]) {
            max = mid - 1;
        }else if(target > arr[mid]){
            min = mid + 1;
        }else{
            return mid;
        }
    }
    return -1;
}

//线性查找
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i
        }
    }
    return -1;
}