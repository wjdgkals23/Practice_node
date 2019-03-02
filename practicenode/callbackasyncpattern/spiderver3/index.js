// 오류 검사에서 else 를 최대한 제거한다. return을 활용한다.
// 최소한의 기능을 가진 함수들로 단위를 나누어 재사용성을 높힌다.
"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function saveFile(filename, contents, callback) {
    mkdirp(path.dirname(filename), err => {
        if(err)
            return callback(err);
        fs.writeFile(filename, contents, err => {
            if(err)
                return callback(err);
            return callback(null, filename, true);
        })
    })
}

function download(url, filename, callback) {
    console.log(`Downloading ${url}`);
    request(url, (err, response, body) => {
        if(err) {
            return callback(err);
        }

        saveFile(filename, body, err => {
            if(err) {
                return callback(err);
            }
            console.log(`Downloaded and saved ${url}`);
            return callback(null, body);
        });
    })
}

function spiderLinks(currentUrl, body, nesting, callback) {
    if (nesting === 0) {
        return process.nextTick(callback);
    }
    const links = utilities.getPageLinks(currentUrl, body);
    if (links.length === 0) {
        return process.nextTick(callback);
    }

    let completed = 0, hasErrors = false;

    function done(err) { // spiderlinks 함수의 내부함수로 외부함수의 변수를 참조할 수 있다.
        if(err) {
            hasErrors = true;
            return callback(err);
        }

        if(++completed === links.length && !hasErrors) {
            return callback();
        }
    }

    links.forEach(link => {
        spider(link, nesting-1, done);
    });
}

// ver2 에서는 파일 다운로드를 확인하는 과정을 파일을 읽는 과정으로 대체한다.
// 읽은 이후 읽은 문서의 내부의 링크들을 수집하여 순차적으로 크롤링하는 과정을 진행한다.
// 이 함수에서 경쟁상황은 읽기 대상의 url이 똑같은 것이 2번 들어오는 경우이다.
// 비동기적으로 처리되기때문에 연달아 동일한 2개의 url이 들어온다면 다운로드를 2번 진행하는 상황을 보게된다.
// Map을 이용해서 경쟁상태에 대한 체크를 진행하며 수행하는 것이 좋은 방식이다.

const spidering = new Map();

function spider(url, nesting, callback) {
    const filename = utilities.urlToFilename(url);
    if(spidering.has(url)){
        return process.nextTick(callback);
    }
    spidering(url, true);
    fs.readFile(url, 'utf8', (err,body) => {
        if(err){
            if(err.code !== 'ENOENT') {
                return callback(err);
            } // No such file or directory

            return download(url, filename, (err, body) => {
                if(err){
                    return callback(err);
                }
                spiderLinks(url, body, nesting, callback);
            });
        }

        spiderLinks(url, body, nesting, callback);
    });
}

spider(process.argv[2], 4, (err) => {
    if(err) {
        console.log(err);
        process.exit();
    } else {
        console.log('Download complete');
    }
});

