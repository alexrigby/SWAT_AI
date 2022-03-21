//ADDS OBSERVED FLOW DATA TO PREDICTED (SEDIMENT) DATA AND ASIGNES X AND Y
//ADDS ORIGIONAL EXAMPLES TO ARAY ASSINGED TO X AND Y
// USES TFVIS TO RENDER A SCATERPLOT WITH PREDICTED AND ORIGIONAL VALUES


export async function testModel(model, tensorInputs, inputData, trainingData) {
  



    // //creates tensor of predictions based on training input tensor 
    // const  preds = tf.tidy(() => {
    //     const pred = model.predict(tensorInputs);
    
    //     return pred.dataSync()
    // });

  

    // //adds predicted output and the index to an arrray to be plotted
    // const predictedVsIndexArray = inputData.map((d, i) => {
    //     return { x: d.index, y: preds[i] }
    // }).sort((a, b) => a.x - b.x);
 

    //adds the index and the training output data to an array to be plotted
    const trainingVsIndexArray = trainingData.map((d, i) => {
        return { x: d.index, y: d.ys }
    }).sort((a, b) => a.x - b.x);


    const date = trainingData.map((d) => {
          return {date: new Date(d.xs[4] + '-' + d.xs[5] + '-' + d.xs[6]),
                  index: d.index
        }
        });


    //render line chart with both predicted and training output data on it
    tfvis.render.linechart(
        { name: 'training and predicted data', styles: { width: 1000 } },
        { values: [ trainingVsIndexArray], series: [ "training" ], styles: { color: ["rgba(255, 0, 0, 0.5)", "rgba(0, 0, 255, 0.5)"] } },
        {
            xLabel: 'index',
            yLabel: 'flow',
            height: 300,
            width: 1000,
        }
    );

    // //calculates the difference between the predicted points and the training points,
    // //creates an array of difference and index to be plotted
    // const differenceArray = []

    // for (var i = 0; i < preds.length; i++) {
    //     const difference = diff(predictedVsIndexArray[i].y, trainingVsIndexArray[i].y);
    //     let o = {}
    //     o.y = difference;
    //     o.x = i;
    //     differenceArray.push(o)
    // }

    //plots the difference between the predicted and training
    // tfvis.render.linechart(
    //     { name: 'predicted data - training data', styles: { width: 1000 } },
    //     { values: [differenceArray] },
    //     {
    //         xLable: 'index',
    //         yLabel: 'difference',
    //         height: 300,
    //         width: 1000
    //     }
    // );

    
    // for (let i = 0; i< predictedVsIndexArray.length; i++) {
    //     if (predictedVsIndexArray[i].x < 0) {
    //         return predictedVsIndexArray[i].x == 0
    //     }
    // }
    
    // var csv = TsvOrCsvConverter(predictedVsIndexArray, ',')


    // console.log(csv)
    // return csv

}




export function TsvOrCsvConverter(data, seperator) {
    // Convert dataset to TSV and print
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(seperator),
      ...data.map(row => headers.map(fieldName => row[fieldName]).join(seperator))
    ].join('\r\n');
    return csv;
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