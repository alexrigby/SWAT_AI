

export function getCSVData(csvUrl){
    // const csvConfig = { hasHeader: true}
const csvDataset = tf.data.csv(
    csvUrl, {
        columnConfigs: {
            flo_out: {
                isLabel: true
            }
        }
    }
    // csvConfig, 
    )
    return csvDataset
};

  
export async function getTrainingData(){
//uses tf.csv function to get csv from a url and pares it as a tf dataset
const csvDataset = getCSVData('http://127.0.0.1:5500/server/assets/basin_wb_day.csv');
//calculates the number of features by looking at number of headers ans subtracting 1 (the label header)
const numberOfFeatures = (await csvDataset.columnNames()).length - 1;
console.log(numberOfFeatures);


// Prepare the Dataset for training by 'flattening the dataset' 
//xs are the features returend by tf.csv
//ys are the labels returned by tf.csv
const flattenedDataset = csvDataset.map(({ xs, ys }) => {
    // Convert xs(features) and ys(labels) from object form (keyed by
    // column name) to array form.
    return { xs: Object.values(xs), ys: Object.values(ys) };
});

//uses the tf.toArray function to return an array of xs and ys vales from the flattendDataset
const arrayFromDatset = await flattenedDataset.toArray();

for (var i = 0; i<arrayFromDatset.length; i++){
    arrayFromDatset[i].index = i;
};


return {
    trainingData: arrayFromDatset,
    numberOfFeatures: numberOfFeatures,
}
};



export default {
    getTrainingData
}