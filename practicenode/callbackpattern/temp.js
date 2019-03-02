const fs = require("fs");
const limit = 2;
let cur = 0;

function task1(callback){
    fs.readFile("data.txt", 'utf8', (err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

function temp(callback) {
    console.log("temp func process");
    cur++;
    if(cur < limit) {
        return process.nextTick(() => {
            task1(callback);
            console.log("temp func process async complete");
        });
    }
    console.log("over limit");
}

temp((err,data) => {
    if(err){
        console.log(err);
    }
    if(data)
        console.log(data);
    cur--;
});
temp((err,data) => {
    if(err){
        console.log(err);
    }
    if(data)
        console.log(data);
    cur--;
});
temp((err,data) => {
    if(err){
        console.log(err);
    }
    if(data)
        console.log(data);
    cur--;
});
temp((err,data) => {
    if(err){
        console.log(err);
    }
    if(data)
        console.log(data);
    cur--;
});
temp((err,data) => {
    if(err){
        console.log(err);
    }
    if(data)
        console.log(data);
    cur--;
});
temp((err,data) => {
    if(err){
        console.log(err);
    }
    if(data)
        console.log(data);
    cur--;
});
console.log("pass the process");
