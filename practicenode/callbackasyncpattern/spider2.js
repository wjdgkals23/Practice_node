// 오류 검사에서 else 를 최대한 제거한다. return을 활용한다.
// 최소한의 기능을 가진 함수들로 단위를 나누어 재사용성을 높힌다.
"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function spider(url, callback) {
    const filename = utilities.urlToFilename(url);
    fs.exists(filename, (exist) => {
        if(exist) {
            return callback(null, filename, false);
        }
        download(url, filename, err => {
            if(err) {
                return callback(err);
            }

            return callback(null, filename, true);
        })
    });
}

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

spider(process.argv[2], (err, filename, downloaded) => {
    if(err){
        console.log(err);
    } else if(downloaded) {
        console.log(`Completed the download of "${filename}"`);
    } else {
        console.log(`"${filename}" was already downloaded`);
    }
});


