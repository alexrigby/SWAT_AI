import { runTraining } from "./modules/runTraining.js";
import { runPrediction } from "./modules/runPrediction.js"


// document.addEventListener('DOMContentLoaded', await getData());

    document.getElementById("train").addEventListener("click", async () => {
        await runTraining();
    });




document.getElementById("predict").addEventListener("click", async () => {
    await runPrediction();
})








