function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    console.log(A.length-1);
    if(A.length === 1 || A.length === 2)
        return 0;
    let max = -1;
    let min = 10000001;
    for(let i=0; i<A.length; i++) {
        if(max < A[i])
            max = A[i];
        if(min > A[i])
            min = A[i];
    }
    console.log(max,min);
    return (max-min)%(A.length-1)===0? 1:0
}

function solution2(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    if(A.length === 1 || A.length === 2)
        return 0;

    A.sort((a,b) => { return a-b });

    let temp = A[1]-A[0];
    let ans = 1;

    for(let i=1; i<A.length-1; i++) {
        if(temp !== (A[i+1]-A[i])) {
            // console.log("here", temp, A[i+1]-A[i]);
            return 0;
        }
        temp = A[i+1]-A[i];
    }
    return ans;
}


console.log(solution2([2,1,3,4]));
console.log(solution2([1,3,4]));
console.log(solution2([2]));
