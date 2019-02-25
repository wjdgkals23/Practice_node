// function solution(A) {
//     // write your code in JavaScript (Node.js 8.9.4)
//     let ans = 0;
//     let temp = new Map();
//     A.forEach((item)=>{
//         if(temp.has(item)){
//             temp.set(item, temp.get(item)+1);
//         }
//         else{
//             temp.set(item, 1);
//         }
//     })
//
//     for(let [key,value] of temp){
//         if(value == 1) {
//             ans = key;
//         }
//     }
//
//     return ans;
// }

function solution(A) {
    let ans = 0;
    let temp = new Map();
    A.forEach((item)=>{
        if(temp.has(item)){
            temp.set(item, temp.get(item)+1);
        }
        else{
            temp.set(item, 1);
        }
    });

    let iter = temp[Symbol.iterator]();
    for(let item of iter){
        if(item[1] === 1)
            console.log(item[0]);
    }
    return temp;
}

solution([11,3,7,3,11]);
