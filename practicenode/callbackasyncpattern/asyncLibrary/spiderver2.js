const async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');
const fs = require('fs');
const request = require('request');

function download(url, filename, callback) {
    console.log(`Downloading ${url}`);
    let body;

    async.series([ // 업무흐름 작성, 특성상 일에 순서는 있지만 각 업무의 결과값이 다음 업무에 꼭 필요하지 않을때 사용되는 느낌
        callback => {
            request(url, (err, response, resBody) => {
                if(err)
                    return callback(err);
                console.log("0");
                body = resBody;
                callback(); // task 완료후 다음작업 진행
            })
        },

        callback => {
            mkdirp(path.dirname(filename), callback)
        },

        callback => {
            console.log("2");
            fs.writeFile(filename, body, callback);
        }

    ], err => {
        if(err)
            return callback(err);

        console.log(`Downloaded and saved ${url}`);
        callback(null, body);
    })
}

function spiderLinks(currentUrl, body, nesting, callback) {
    if (nesting === 0) {
        return process.nextTick(callback);
    }

    let links = utilities.getPageLinks(currentUrl, body);

    if(links.length === 0) {
        return process.nextTick(callback);
    }

    async.eachSeries(links, (link, callback) => {
        spider(link, nesting - 1, callback);
    }, callback);
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
