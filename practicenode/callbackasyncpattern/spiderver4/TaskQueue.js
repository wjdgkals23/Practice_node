module.exports = class TaskQueue {
    constructor (concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    pushTask (task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task (() => { // done 함수, 각 task에 부여되어 프로세스의 수를 조절한다.
                this.running--;
                this.next();
            });
            this.running++;
        }
    }
};
