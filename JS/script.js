import { runTraining } from "./modules/runTraining.js";
import { runPrediction } from "./modules/runPrediction.js";
import { getInputCatchments } from "./modules/getInputCatchments.js";
import { getModels } from "./modules/getModels.js";
import { getTrainingDatasets } from "./modules/getTrainingDatsets.js";
import { prepareDataset } from"./modules/prepareDataset.js";

document.getElementById("dataPrepPage").style.display = "none";

document.getElementById("trainingPage").style.display = "none";
document.getElementById("predictionPage").style.display = "none";

await prepareDataset()

await getTrainingDatasets()

await getModels()

await getInputCatchments()



document.getElementById("train").addEventListener("click", async () => {
    await runTraining();
});


document.getElementById("predict").addEventListener("click", async () => {
    await runPrediction();
})








