function Logger(name) {
    if(!new.target){
        return new Logger(name);
    }

    this.name = name;
}

Logger.prototype.log = function(message) {
    console.log(`[${this.name}] ${message}`);
};

Logger.prototype.info= function(message) {
    this.log(`Info: ${message}`);
};

module.exports = new Logger("DEFAULT");
