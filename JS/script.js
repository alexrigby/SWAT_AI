import { run } from "./modules/run.js";
// import { getOptionNames } from "./modules/getData.js";
import { getTrainingData } from "./modules/getTrainingData.js";
import { convertTrainingDataToTensor } from "./modules/convertTrainingDataToTensor.js"

// await getTrainingData()
// await convertTrainingDataToTensor()



// await getOptionNames('data/basin_wb_day.csv', "inputNames");
// await getOptionNames('data/channel_sd_day.csv', "outputNames");

// document.addEventListener('DOMContentLoaded', await getData());
document.getElementById("run").addEventListener("click", () => {
    run();
});
// document.getElementById("outputNames").addEventListener("change", run())


// const a = tf.tensor2d([[1, 2], [3, 4], [11,200]]);
// console.log('a shape:', a.shape);
// a.print();

// const b = a.reshape([6, 1]);
// console.log('b shape:', b.shape);
// b.print()







