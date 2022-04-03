//PARSES THE TRAINING DATASET READY TO CONVERT TO TENSOR

export async function getTrainingData(url) {
    //uses tf.data.csv function to get csv from a url and parses it as a tf dataset
    const csvDataset = getCSVData(url);
  
    // number of training features = number of headers and subtracting 1 (the label header)
    const numberOfFeatures = (await csvDataset.columnNames()).length - 1;
  
    //xs are the features returend by tf.csv
    //ys are the labels returned by tf.csv
    const flattenedDataset = csvDataset.map(({ xs, ys }) => {
        // Convert xs(features) and ys(labels) from object form (keyed by column name) to array form.
        return { xs: Object.values(xs), ys: Object.values(ys) };
    });

    //uses the tf.toArray function to return an array of xs and ys vales from the flattendDataset
    const arrayFromDatset = await flattenedDataset.toArray();

    //adds an index to the dataset (to return to time series)
    for (var i = 0; i < arrayFromDatset.length; i++) {
        arrayFromDatset[i].index = i;
    };

    return {
        trainingData: arrayFromDatset,
        numberOfFeatures: numberOfFeatures,
    }
};

//uses tf.csv to return dataset from csv url, indicates that flo_out is the label
function getCSVData(csvUrl) {
    const csvDataset = tf.data.csv(
        csvUrl, {
        columnConfigs: {
            oFlow: {
                isLabel: true
            }
        }
    })
    return csvDataset
};



export default {
    getTrainingData
}