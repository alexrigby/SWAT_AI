//COMPILES ALL FUNCTIONS TO INITIATE THE MODEL RUNNING AND DISPLAY RESULTS


import { getData } from "./getData.js"
import { createModel } from "./createModel.js"
import { convertTrainingDataToTensor } from "./convertTrainingDataToTensor.js"
import { trainModel } from "./trainModel.js"
import { testModel } from "./testModel.js"


export async function run() {
    // Loads the cleaned data
    // const inputOption = document.getElementById("inputNames").value
    // const outputOption = document.getElementById("outputNames").value


    // const inputTrainingData = await getData('data/basin_wb_day.csv', inputOption);
    // const outputTrainingData = await getData('data/channel_sd_day.csv', outputOption);
  
    // //adds the values to an object (x and y) to plot
    // const trainingData = inputTrainingData.map((d, i) => {
    //     return { x: d[inputOption], y: outputTrainingData[i][outputOption], i: d.index }
    // });
    
    // tfvis.visor().toggleFullScreen()
    // // renders a scatterplot of the origional trining data
    // tfvis.render.scatterplot(
    //     { name: `training data`, styles: {width: 1000} },
    //     { values: [trainingData] },
    //     {
    //         xLabel: `${inputOption}`,
    //         yLabel: `${outputOption}`,
    //         height: 300, 
    //         width: 1000,
    //     }
    // );

    const tensorTrainingData = await convertTrainingDataToTensor();
  

    //extracts inputs and lables created in convertToTensor function
    const { inputs, labels, numberOfFeatures, trainingData } = tensorTrainingData;
    // Create the model
    const model = createModel(numberOfFeatures);

    //modelSummary gives a table to the layers in the model
    tfvis.show.modelSummary({ name: 'Model Summary' }, model);
    // Convert the data to a form we can use for training.
    
   

    // Train the model
    await trainModel(model, inputs, labels);
    console.log('Done Training');

    // Make some predictions using the model and compare them to the
    // original data
   await testModel(model, inputs, trainingData);
}

export default {
    run,
}