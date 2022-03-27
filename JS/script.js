import { runTraining } from "./modules/runTraining.js";
import { runPrediction } from "./modules/runPrediction.js";
import { getInputCatchments } from "./modules/getInputCatchments.js";
import { getModels } from "./modules/getModels.js";
import { getTrainingDatasets } from "./modules/getTrainingDatasets.js";
import { prepareTrainingDataset } from "./modules/prepareTrainingDataset.js";
import { prepareInputData } from "./modules/prepareInputData.js";
import { openPage } from "./modules/openPage.js";
import { inputSWATCatchments } from "./modules/inputSWATCatchments.js";
import { trainingSWATCatchments } from "./modules/trainingSWATCatchments.js"

await trainingSWATCatchments()

document.getElementById("dataPrepContainer").addEventListener("click", async () => {
    await openPage(event, "dataPrepPage")
    await trainingSWATCatchments()
    await getTrainingDatasets()
    await inputSWATCatchments()
});

document.getElementById("trainContainer").addEventListener("click", async () => {
    await openPage(event, "trainingPage")
    await getModels()

});

document.getElementById("predictContainer").addEventListener("click", async () => {
    await openPage(event, "predictionPage")
    await getInputCatchments()
});





await inputSWATCatchments()

await prepareTrainingDataset()

await getTrainingDatasets()

await getModels()

await getInputCatchments()

await prepareInputData()




await runTraining();



document.getElementById("predict").addEventListener("click", async () => {
    await runPrediction();
})









