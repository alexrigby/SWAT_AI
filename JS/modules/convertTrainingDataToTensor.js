// /**CONVERTS THETRAINING DATA TO TENSOR


export function convertTrainingDataToTensor(trainingData, numberOfFeatures) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.


    return tf.tidy(() => {
        // Step 1. Shuffle the data
        // shuffles all data so it is not in the order it was input, 
        // helps because the data is fed to the model in batches, removes bias
        tf.util.shuffle(trainingData);

        // Step 2. Convert data to Tensor
         
        //xs values are the inputs and ys are lables from 'trainingData' (in 'run.js')
        const inputs = trainingData.map(d => d.xs);
        const labels = trainingData.map(d => d.ys);

        const index = trainingData.map(d  => d.index);

        //tensor has a shape of [number of examples, number of features per example]
        const inputTensor = tf.tensor2d(inputs, [inputs.length, numberOfFeatures]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    

    
      
        return {
            tensorTrainingInputs: inputTensor,
            tensorTrainingLabels: labelTensor,
     
        }
    });
}


export default {
    convertTrainingDataToTensor,
}