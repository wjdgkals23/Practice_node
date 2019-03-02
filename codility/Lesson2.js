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
    A.sort(function(a,b) {
        if(a>b)
            return -1;
        else
            return 1;
    });

    if(A[0] !== A[1])
        return A[0];

    for(let i=0; i<A.length; i=i+2) {
        if(A[i] !== A[i+1]) {
            if(A[i] !== A[i-1])
                return A[i];
            else
                return A[i+1];
        }
    }
}

console.log(solution([11,3,7,3,11]));
