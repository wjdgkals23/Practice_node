"use strict";

const async = require('async');
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
        console.log("here", callback);
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

    async.each(links, (link, callback) => {
        spider(link, nesting-1, callback); //외부 콜백
    }, callback); // 내부콜백
}

const spidering = new Map();

function spider(url, nesting, callback) {
    const filename = utilities.urlToFilename(url);
    if(spidering.has(url)){
        return process.nextTick(callback);
    }
    spidering.set(url, true);
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

