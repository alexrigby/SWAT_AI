import { runTraining } from "./modules/runTraining.js";
import { runPrediction } from "./modules/runPrediction.js";
import { getInputCatchment } from "./modules/getInputCatchment.js";
import { getModels } from "./modules/getModels.js";

await getModels()

await getInputCatchment()



document.getElementById("trainingPage").style.display = "none";
document.getElementById("predictionPage").style.display = "none";

document.getElementById("train").addEventListener("click", async () => {
    await runTraining();
});


document.getElementById("predict").addEventListener("click", async () => {
    await runPrediction();
})








