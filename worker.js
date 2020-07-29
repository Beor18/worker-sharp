const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");

async function resize() {
  try {
    const outputPath = "./public/images/" + Date.now() +  ".png";;
    const { image, width, height } = workerData;

    await sharp(image).resize(width, height, { fit: "cover" }).toFile(outputPath);
    parentPort.postMessage(outputPath);
  } catch (error) {
      console.log('fernando error >>>> ', error)
  }
}

resize();
