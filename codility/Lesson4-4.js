//max 잡고 풀어야하네.
function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    if(A.length === 1) {
        if (A[0] < 0)
            return 1;
        else
            return A[0]+1;
    }

    let allminus = true;
    let jumping = false;

    A.sort((pre,item) => {return pre-item});

    let pre = A[0];
    let ind = 0;
    for(let i=0; i<A.length; i++){
        if(A[i] > 0) {
            allminus = false;
        }
        if (Math.abs(pre - A[i]) > 1 && pre > 0) {
            jumping = true;
            ind = i-1;
        }
        pre = A[i];
    }

    if (allminus)
        return 1;

    if (jumping) {
        // console.log("here");
        return A[ind]+1;
    }

    return A[A.length-1]+1;
}

console.log(solution([-3, -1, 1]));
console.log(solution([1, 3, 6, 4, 1, 2]));
console.log(solution([-1,-3]));
