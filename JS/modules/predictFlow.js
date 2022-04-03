//USES 'tf.model.predict' TO PREDICT FLOW BASED ON INUT TENSORS AND CHOSEN MODEL. 

export async function predictFlow(model, tensorInputs, inputData) {

    //predicts flow for the input tensor
    const preds = tf.tidy(() => {
        const pred = model.predict(tensorInputs);
        return pred.dataSync()
    });

    //adds predicted output and the index to an arrray to be plotted
    const predictedVsIndexArray = inputData.map((d, i) => {
        return { x: d.index, y: preds[i] }
    }).sort((a, b) => a.x - b.x);
   
    // makes values that are lower than 0 to 0
    for (let i = 0; i < predictedVsIndexArray.length; i++) {
        if (predictedVsIndexArray[i].x < 0) {
            return predictedVsIndexArray[i].x == 0
        }
    }
    
    //creates json of predicted flow, date and index, sorts the json in order of the index
    const flowVsDate = inputData.map((d, i) => {
        return {
            index: d.index, 
            predictedFlow: preds[i],
            SWATFlow: d.xs[20],
            date: d.xs[6] + '-' + d.xs[4] + '-' + d.xs[5],
        }  
    }) .sort((a, b) => a.index - b.index);
    // return { x: d.xs[5] + '/' + d.xs[4] + '/' + d.xs[6], y: preds[i], index: d.index }
 
    //removes index once the json array is orderd
    for (let j = 0; j < flowVsDate.length; j++) {
        delete flowVsDate[j].index
      };

    //converst the JSOn to a csv
    var csv = TsvOrCsvConverter(flowVsDate, ',')
    
    //downloads the CSV
    const downloadButton = document.getElementById("downloadPreds");
    downloadButton.addEventListener("click", () => {
        downloadPredictionsCSV(csv, "predictions")
    });
    return flowVsDate
}


//makes button to download csv file to downloads folder
function downloadPredictionsCSV(data, fileName) {
    document
        .getElementById("downloadPreds")
        .setAttribute("href", "data:text/csv;charset=utf-8," + escape(data));
    document.getElementById("downloadPreds").setAttribute("download", fileName);
}

//converts JSOn to TSV or CSV
function TsvOrCsvConverter(data, seperator) {
    // Convert dataset to TSV and print
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(seperator),
        ...data.map(row => headers.map(fieldName => row[fieldName]).join(seperator))
    ].join('\r\n');
    return csv;
}


export default {
    predictFlow,
}