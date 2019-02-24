// 올바른 오류 전파 방식 예시

const fs = require('fs');

function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {

        let parsed;

        if(err) {
            return callback(err);
        }

        try {
            parsed = JSON.parse(data);
        }
        catch (e) {
            return callback(e);
        }

        callback(null, parsed);
    })
}
