//ADDS OBSERVED FLOW DATA TO PREDICTED (SEDIMENT) DATA AND ASIGNES X AND Y
//ADDS ORIGIONAL EXAMPLES TO ARAY ASSINGED TO X AND Y
// USES TFVIS TO RENDER A SCATERPLOT WITH PREDICTED AND ORIGIONAL VALUES


export async function predictFlow(model, tensorInputs, inputData, inputCatchment) {

    //creates tensor of predictions based on training input tensor 
    const preds = tf.tidy(() => {
        const pred = model.predict(tensorInputs);
        return pred.dataSync()
    });


    //adds predicted output and the index to an arrray to be plotted
    const predictedVsIndexArray = inputData.map((d, i) => {
        return { x: d.index, y: preds[i] }
    }).sort((a, b) => a.x - b.x);
   

    for (let i = 0; i < predictedVsIndexArray.length; i++) {
        if (predictedVsIndexArray[i].x < 0) {
            return predictedVsIndexArray[i].x == 0
        }
    }

    const flowVsDate = inputData.map((d, i) => {
        return {
            index: d.index, 
            predictedFlow: preds[i],
            SWATFlow: d.xs[20],
            date: d.xs[6] + '-' + d.xs[4] + '-' + d.xs[5],
        }  
    }) .sort((a, b) => a.index - b.index);
    // return { x: d.xs[5] + '/' + d.xs[4] + '/' + d.xs[6], y: preds[i], index: d.index }

    for (let j = 0; j < flowVsDate.length; j++) {
        delete flowVsDate[j].index
      };


    var csv = TsvOrCsvConverter(flowVsDate, ',')

    const downloadButton = document.getElementById("downloadPreds");
    downloadButton.addEventListener("click", () => {
        downloadPredictionsCSV(csv, "predictions")
    });

    // console.log(csv)

    return flowVsDate

  

}



//makes button to download csv file to downloads folder
function downloadPredictionsCSV(data, fileName) {
    document
        .getElementById("downloadPreds")
        .setAttribute("href", "data:text/csv;charset=utf-8," + escape(data));
    document.getElementById("downloadPreds").setAttribute("download", fileName);
}


function TsvOrCsvConverter(data, seperator) {
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
    predictFlow,
}