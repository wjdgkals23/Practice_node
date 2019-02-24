function Logger(name) {
    if(!(new.target)) { // == this instanceof Logger
        return new Logger(name);
    }
    this.name = name;

    // new 연산자를 통해 객체를 생성하지 않았을 때 안전하게 생성하는 방식
}

Logger.prototype.log = function(message) {
    console.log(`[${this.name}] ${message}`);
};
Logger.prototype.info = function(message) {
    this.log(`info: ${message}`);
};
Logger.prototype.verbose = function(message) {
    this.log(`verbose: ${message}`);
};

module.exports = Logger;
