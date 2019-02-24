'use strict'

// 한 함수내에 콜백처리 방식을 비동기, 동기식 2가지를 혼재하여 사용하는 경우
const fs = require('fs');
const cache = {};

// cache 라는 객체를 이용해 해당 파일명의 내용이 존재하면 callback 함수로 해당 내용을 전달한다.
// 없을 시에는 비동기적 방식인 fs.readFile 방식을 통해 읽고 에러가 없을 경우 해당 내용을 저장한 후 callback으로 전달한다.
function inconsistentRead(filename, callback) {
    if(cache[filename]) {
        return process.nextTick(() => callback(cache[filename]));
    }
    else{
        fs.readFile(filename, "utf8", (err,data) => {
            if(err) {
                callback(err);
            }
            else{
                cache[filename] = data;
                console.log("readfinish");
                callback(data);
            }
        })
    }
}

// 해당 함수는 파일을 읽는 함수로
function createFileReader(filename) {
    const listeners = [];

    //비동기
    // fs.readFile의 비동기처리 요청으로 인해 콜백함수 부분이 %로 제어권이 넘어가고 listener를 listeners에 푸쉬하는 과정을 취하게된다.
    // 비동기 처리가 완료되었을때 실행하고 있는 곳의 제어권을 잠시 가져와 ^ 부분을 다시 실행되고 기존의 위치로 제어권을 반환한다.
    inconsistentRead(filename,
            // ^
            value => {
                listeners.forEach(listener => {
                    console.log("비동기요청완료로 제어권 가져오기!");
                    listener(value)
                });
            }
    );


    // %
    console.log("비동기처리요청으로 제어권을 넘겨받음!")
    return {
        onDataReady: listener => listeners.push(listener)
    }
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(
    data => {
        console.log(`First call data : ${data}`);

        //... 파일 읽기 수행....

        const reader2 = createFileReader('data.txt');
        reader2.onDataReady(data => {
            console.log(`Second call data: ${data}`);
        })
    } // 이거자체가 콜백 함수
)

