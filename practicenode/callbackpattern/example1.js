// CPS 방식 : 함수형 프로그래밍에서 결과를 전달할 때 다른 함수(콜백)에 인수로 전달하는 방식
function add(a,b,callback) {
    callback(a+b);
}

console.log("before");
add(1,2,result => {console.log(`RESULT IS ${result}`)});
console.log("after");

console.log("------------------ setTimeout example ------------------");

function additionAsync(a,b,callback) {
    setTimeout(() => callback(a+b),500);
}

console.log("before");
additionAsync(1,2,(result) => {console.log(`RESULT IS ${result}`)});
console.log("after");
