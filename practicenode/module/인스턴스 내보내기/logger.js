function Logger(name) {
    if(!new.target){
        return new Logger(name);
    }
    this.count = 0;
    this.name = name;
}

Logger.prototype.log = function(message) {
    console.log(`[${this.name}] ${message}`);
};

Logger.prototype.info = function(message) {
    this.log(`Info: ${message}`);
};

Logger.prototype.add = function() {
    this.count++;
}

module.exports = new Logger("DEFAULT");
