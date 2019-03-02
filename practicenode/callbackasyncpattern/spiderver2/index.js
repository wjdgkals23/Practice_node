// 오류 검사에서 else 를 최대한 제거한다. return을 활용한다.
// 최소한의 기능을 가진 함수들로 단위를 나누어 재사용성을 높힌다.
"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

// 해당 함수는
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

    function iterate(index) {
        if(index === links.length) {
            return callback();
        }

        spider(links[index], nesting-1, err => {
            if(err) {
                return callback(err);
            }

            iterate(index + 1);
        })
    }

    iterate(0);
}

// ver2 에서는 파일 다운로드를 확인하는 과정을 파일을 읽는 과정으로 대체한다.
// 읽은 이후 읽은 문서의 내부의 링크들을 수집하여 순차적으로 크롤링하는 과정을 진행한다.
function spider(url, nesting, callback) {
    const filename = utilities.urlToFilename(url);
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


// 해당 어플리케이션의 callback 함수는 첫번째인자에 값이 들어있을경우 err 상황으로 파악하는 방식을 이용한다.
spider(process.argv[2], 2, (err) => {
    if(err) {
        console.log(err);
        process.exit();
    } else {
        console.log('Download complete');
    }
});

