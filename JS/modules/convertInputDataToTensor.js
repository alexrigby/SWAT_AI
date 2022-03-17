// /**CONVERTS THETRAINING DATA TO TENSOR

export function convertInputDataToTensor(inputData, numberOfInputFeatures) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.


    return tf.tidy(() => {
        // Step 1. Shuffle the data
        // shuffles all data so it is not in the order it was input, 
        // helps because the data is fed to the model in batches, removes bias
        tf.util.shuffle(inputData);
        

        // Step 2. Convert data to Tensor
         
        //xs values are the inputs and ys are lables from 'trainingData' (in 'run.js')
        const inputs = inputData.map(d => d.xs);
        const index = inputData.map(d  => d.index);
        

        //tensor has a shape of [number of examples, number of features per example]
        const inputTensor = tf.tensor2d(inputs, [inputs.length, numberOfInputFeatures]);


        return inputTensor
    
    });
}


export default {
    convertInputDataToTensor,
}