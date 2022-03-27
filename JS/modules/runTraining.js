//COMPILES ALL FUNCTIONS TO INITIATE THE MODEL RUNNING AND DISPLAY RESULTS

import { createModel } from "./createModel.js";
import { convertTrainingDataToTensor } from "./convertTrainingDataToTensor.js";
import { trainModel } from "./trainModel.js";
import { testModel } from "./testModel.js";
import { getTrainingData } from "./getTrainingData.js";
import config from "./config.js"


export async function runTraining() {
    document.getElementById("train").addEventListener("click", async () => {

        const trainingDataset = document.getElementById("trainingDatasets").value

        //gets the csv from a url, maps data to a array xs: inputs, ys:labels (and returns number of features in the dataset for input shape)
        const { trainingData, numberOfFeatures } = await getTrainingData(`${config.TRAINING_DATASETS}${trainingDataset}`);


        //converts the training inputs and lables to tensors to pass to the model
        const { tensorTrainingInputs, tensorTrainingLabels } = convertTrainingDataToTensor(trainingData, numberOfFeatures);


        tfvis.visor().toggleFullScreen()

        //extracts inputs and lables created in convertToTensor function
        // Create the model
        const model = createModel(numberOfFeatures);


        //modelSummary gives a table of the layers in the model
        tfvis.show.modelSummary({ name: 'Model Summary' }, model);

        tfvis.show.layer({ name: 'Layer Summary' }, model)
        // Train the model


        await trainModel(model, tensorTrainingInputs, tensorTrainingLabels);
        console.log('Done Training');


        // Make some predictions using the model and compare them to the
        // original data
        await testModel(model, trainingData);

        const inputNodes = document.getElementById("inputNodes").value
        const hiddenNodes = document.getElementById("hiddenNodes").value
        const inputActivation = document.getElementById("inputActivation").value
        const hiddenActivation = document.getElementById("hiddenActivation").value
        const epochs = document.getElementById("epochs").value
        const numOfCatchments = trainingDataset.substring(0,2);
    
        const modelName = `${numOfCatchments}_${epochs}e_${inputNodes}${inputActivation}_${hiddenNodes}${hiddenActivation}`
    
        document.getElementById("modelName").value = modelName
        console.log(modelName)
    });

  

    document.getElementById("save").addEventListener("click", async () => {
        const modelName = document.getElementById("modelName").value;
        await model.save('downloads://' + modelName)

    })
}

export default {
    runTraining,
}