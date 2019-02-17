"use strict"

// if(false) {
//     var x = "hello";
// }
// console.log(x);

// 기존의 자바스크립트의 변수 스코프
// 함수레벨의 스코프를 가진다. 블록레벨로 변수를 설정해도 유효하지 않으며 전역변수 취급을 받게 된다.

//
// if(false) {
//     let x = "hello";
// }
// console.log(x);

for(let i=0; i<10; i++){

}
// console.log(i);

const y = {};
y.name = "John";
console.log(y);

// 중요한 모듈의 경우 çonst를 통해 선언해놓는다면 변수명을 중복으로 사용하는 실수를 하지 않게 될 것이다.

// Objectd.freeze?
// 완전한 동결 - 객체의 속성마저 변경 불가하다.

const main_const = Object.freeze({ name:"hamin", grade:"a" });
// main_const.name = "temp"; //불가하다.
console.log(main_const)

