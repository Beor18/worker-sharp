const { Worker } = require("worker_threads");

module.exports = function imageResizer(image, width, height) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__dirname + "/worker.js", {
            workerData: {image, width, height}
        });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", code => {
            if(code !== 0) {
                reject(new Error('Worker stopped!'))
            }
        })
    })
}