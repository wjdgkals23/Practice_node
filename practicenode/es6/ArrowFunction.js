function DelayedGreeter(name) {
    this.name = name;
}

// DelayedGreeter.prototype.greet = function() {
//     setTimeout((function(){
//         console.log(this.name + "hello");
//         console.log(this);
//     }).bind(this), 500);
// }

DelayedGreeter.prototype.greet = function() {
    setTimeout(() => { console.log(this.name) }, 500);
};

DelayedGreeter.prototype.secondname = "twoname";

const dg = new DelayedGreeter("LEE"); // prototype에 정의되어있는 프로퍼티들을 그대로 받게된다.
dg.greet();
console.log(dg.secondname);

