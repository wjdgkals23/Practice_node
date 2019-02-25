const FindPattern = require('./extendsEventEmitter');

const fpobj = new FindPattern(/hello \w+/);

fpobj
    .addFile('./fileA.txt')
    .addFile('./fileB.json')
    .find()
    .on('found', (file, elem) => { console.log(`${file} has this pattern ${fpobj.Getregex()}`)})
    .on('ERROR', err => { console.log(err)});

console.log("hello");
