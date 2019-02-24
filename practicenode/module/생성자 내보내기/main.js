const Logger = require('./function');
const cLogger = require('./class');

let log = Logger("hamin"); // new 생성자 없이 인스턴스 생성하기
log.info("hello");
log.verbose("verb");

let clog = new cLogger("hamin2");
clog.log("temp");
clog.info("hello");
