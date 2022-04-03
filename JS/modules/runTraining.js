//COMPILES ALL FUNCTIONS TO INITIATE MODEL TRAINING

import { createModel } from "./createModel.js";
import { convertTrainingDataToTensor } from "./convertTrainingDataToTensor.js";
import { trainModel } from "./trainModel.js";
import { getTrainingData } from "./getTrainingData.js";
import config from "./config.js"

export async function runTraining() {
    //when training button is clicked then ..... 
    document.getElementById("train").addEventListener("click", async () => {
        
        const trainingDataset = document.getElementById("trainingDatasets").value

        //gets the csv from a url, maps data to a array xs: inputs, ys:labels (and returns number of features in the dataset for input shape)
        const { trainingData, numberOfFeatures } = await getTrainingData(`${config.TRAINING_DATASETS}${trainingDataset}`);

        //converts the training inputs and lables to tensors to pass to the model
        const { tensorTrainingInputs, tensorTrainingLabels } = convertTrainingDataToTensor(trainingData, numberOfFeatures);

        tfvis.visor().toggleFullScreen()

        // Create the model
        const model = createModel(numberOfFeatures);


        //modelSummary gives a table of the layers in the model
        tfvis.show.modelSummary({ name: 'Model Summary' }, model);

        tfvis.show.layer({ name: 'Layer Summary' }, model)
        
        //gives the model a name based on training paramaters
        const inputNodes = document.getElementById("inputNodes").value
        const hiddenNodes = document.getElementById("hiddenNodes").value
        const inputActivation = document.getElementById("inputActivation").value
        const hiddenActivation = document.getElementById("hiddenActivation").value
        const epochs = document.getElementById("epochs").value
        const numOfCatchments = trainingDataset.substring(0, 2);

        const modelName = `${numOfCatchments}_${epochs}e_${inputNodes}${inputActivation}_${hiddenNodes}${hiddenActivation}`

        document.getElementById("modelName").value = modelName
        
        // Train the model
        await trainModel(model, tensorTrainingInputs, tensorTrainingLabels)

        //saves the trained models
        document.getElementById("save").addEventListener("click", async () => {
            const modelName = document.getElementById("modelName").value;
            await model.save('downloads://' + modelName)
            // await model.save(`http://localhost:8000/savemodel`)
        })
    });
}

export default {
    runTraining,
}