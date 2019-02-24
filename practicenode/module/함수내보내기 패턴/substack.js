// substack은 exports에 메인기능을 담당하는 함수를 할당하는 방식이다.
// 이후에 부가적인 기능은 부가적인 이름으로 할당한다.

let temp = 0;

module.exports = function() {
    console.log(`exports main func ${temp}`);
}

module.exports.add = function() {
    temp++;
}
module.exports.detail = function() {
    console.log(`exports detail func ${temp}`);
}
