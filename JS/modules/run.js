//COMPILES ALL FUNCTIONS TO INITIATE THE MODEL RUNNING AND DISPLAY RESULTS

import { createModel } from "./createModel.js"
import { convertTrainingDataToTensor } from "./convertTrainingDataToTensor.js"
import { trainModel } from "./trainModel.js"
import { testModel } from "./testModel.js"
import { getTrainingData } from "./getTrainingData.js"


export async function run() {
    
    //gets the csv from a url, maps data to a array xs: inputs, ys:labels (and returns number of features in the dataset for input shape)
    const { trainingData, numberOfFeatures } = await getTrainingData('http://127.0.0.1:5500/server/assets/basin_wb_day.csv')

    //converts the training inputs and lables to tensors to pass to the model
    const {trainingInputs, trainingLabels} = convertTrainingDataToTensor(trainingData, numberOfFeatures);
   

    tfvis.visor().toggleFullScreen()

    //extracts inputs and lables created in convertToTensor function
    // Create the model
    const model = createModel(numberOfFeatures);


    //modelSummary gives a table of the layers in the model
    tfvis.show.modelSummary({ name: 'Model Summary' }, model);
    // Convert the data to a form we can use for training.
    
   

    // Train the model
    await trainModel(model, trainingInputs, trainingLabels);
    console.log('Done Training');

    // Make some predictions using the model and compare them to the
    // original data
   await testModel(model, trainingInputs, trainingData);
}

export default {
    run,
}