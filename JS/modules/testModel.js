//ADDS OBSERVED FLOW DATA TO PREDICTED (SEDIMENT) DATA AND ASIGNES X AND Y
//ADDS ORIGIONAL EXAMPLES TO ARAY ASSINGED TO X AND Y
// USES TFVIS TO RENDER A SCATERPLOT WITH PREDICTED AND ORIGIONAL VALUES


import { getData } from "./getData.js";
import { convertPredictionInputToTensor } from "./converPredictionInputToTensor.js";



export async function testModel(model, inputData, trainingData, index) {
    //gets the label max and min values to un-normalise predictions
    // const { labelMin, labelMax } = normalizationData;

    // const inputOption = document.getElementById("inputNames").value
    // const outputOption = document.getElementById("outputNames").value
   
    
    // const predictionInputData = await getData('data/basin_wb_day.csv', inputOption)
    
    //converts to tensor
    // const tensorPredictedInputData = convertPredictionInputToTensor(predictionInputData)

    //extracts array of unnormalized observed flow values 
    // const unNormPredictionInput = tensorPredictedInputData.unNormPredictionInputs.dataSync()
    // //normalized observed flow values
    // const normPredictionInput = tensorPredictedInputData.normPredictionInputs


    // const predictionInput = inputData

    //clreates tensor of predictions based on shape of normal observed flow value tensor 
    const preds = tf.tidy(() => {
        // same shape as to training data ([number of examples, features per example])
        const pred = model.predict(inputData);
        // unnormalizes the predictions
        // const unNormPreds = pred
        //     .mul(labelMax.sub(labelMin))
        //     .add(labelMin);

        // Un-normalize the data
        const predArray = pred.dataSync();
        return predArray
    });


    // // creates array from predictions and observed flow and assignes to x and y axis
    // const predictedPoints = Array.from(unNormPredictionInput).map((val, i) => {
    //     return { x: val, y: preds[i] }
    // });


    // //creates array from origial examples and output and assignes to x and y axis
    // const originalPoints = inputData.map(d => ({
    //      x: d.x, y: d.y 
    // }));


    // //renders scatterplot with both arrayes plotted
    // tfvis.render.scatterplot(
    //     { name: 'Model Predictions vs Original Data', styles: { width: 1000 } },
    //     { values: [originalPoints, predictedPoints], series: ['original', 'predicted'] },
    //     {
    //         xLabel: `${inputOption}`,
    //         yLabel: `${outputOption}` ,
    //         height: 300,
    //         width: 1000,
    //         seriesColors: ["red", "blue"]
    //     },


    // );


    // TRYING TO UNSHUFFLE THE DATA AND PLOT AS A TIME SERIES

    // const inputFlowTimeSeries = tensorPredictedInputData.inputIndex.map(d => ({
    //     x: d.index, y: d.flow,
    // }));

    // // This works, plots the flow data as a time series (uses index instead of date for now)
    // tfvis.render.linechart(
    //     { name: 'Observed Flow', styles: {width: 1000} },
    //     { values: [inputFlowTimeSeries], series: ['input flow'] },
    //     {
    //         xLabel: 'index',
    //         yLabel: 'flow',
    //         height: 300,
    //         width: 1000,
    //     }
    // );



    //adds predicted output and the index to an arrray to be plotted
    const predictedVsIndexArray = trainingData.map((d, i) => {
        return { x: d.index, y: preds[i] }
    }).sort((a, b) => a.x - b.x);
    
    // console.log(predictedVsIndexArray)

    //training output data in an array
    const training = trainingData.map(d => d.ys)


    //adds the index and the training output data to an array to be plotted
    const trainingVsIndexArray = trainingData.map((d, i) => {
        return { x: d.index, y: training[i] }
    }).sort((a, b) => a.x - b.x);

    //render line chart with both predicted and training output data on it
    tfvis.render.linechart(
        { name: 'training and predicted data', styles: { width: 1000 } },
        { values: [predictedVsIndexArray, trainingVsIndexArray], series: ["predicted", "training"], styles: { color: ["rgba(255, 0, 0, 0.5)", "rgba(0, 0, 255, 0.5)"] } },
        {
            xLabel: 'index',
            yLabel: 'flow',
            height: 300,
            width: 1000,
        }
    );

    //calculates the difference between the predicted points and the training points,
    //creates an array of difference and index to be plotted
    const differenceArray = []

    for (var i = 0; i < preds.length; i++) {
        const difference = diff(predictedVsIndexArray[i].y, trainingVsIndexArray[i].y);
        // const fractionDiff = (difference / trainingVsIndexArray[i].y)
       
        // const percentDiff = (fractionDiff * 100)
        // console.log(percentDiff)
        let o = {}
        o.y = difference;
        o.x = i;
        differenceArray.push(o)
    }

    //plots the difference between the predicted and training
    tfvis.render.linechart(
        { name: 'predicted data - training data', styles: { width: 1000 } },
        { values: [differenceArray] },
        {
            xLable: 'index',
            yLabel: 'difference',
            height: 300,
            width: 1000
        }
    );
}


//function to calculate the diffenrence between 2 numbers
function diff(num1, num2) {
    return num1 - num2
    // if (num1 > num2) {
    //     return num1 - num2
    // } else {
    //     return num2 - num1
    // }
}


export default {
    testModel,
}