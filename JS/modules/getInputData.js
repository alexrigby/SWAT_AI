// PARSES THE DATA FROM THE CATCHMENT DATASETS USING THE TENSORFLOW FUNCTION (TF.DATA.CSV)

export async function getInputData(url) {
    //uses tf.csv function to get csv from a url and parses it as a tf dataset
    const csvDataset = getCSVData(url);

    const numberOfFeatures = (await csvDataset.columnNames()).length

    // Prepare the Dataset for training by 'flattening the dataset' 
    const flattenedDataset = csvDataset.map((xs) => {
        // Convert xs(features) from object form (keyed by column name) to array form.
        return { xs: Object.values(xs)} ;
    });

    //uses the tf.toArray function to return an array of xs vales from the flattendDataset
    const arrayFromDatset = await flattenedDataset.toArray();

    //adds an index to the dataset (to return to time series)
    for (var i = 0; i < arrayFromDatset.length; i++) {
        arrayFromDatset[i].index = i;
    };
   
    return { 
        inputData: arrayFromDatset, 
        numberOfInputFeatures: numberOfFeatures,
    }
};

//uses tf.csv to return dataset from csv url, no label selected
function getCSVData(csvUrl) {
    const csvDataset = tf.data.csv(
        csvUrl,
    )
    return csvDataset
        
};



export default {
    getInputData
}