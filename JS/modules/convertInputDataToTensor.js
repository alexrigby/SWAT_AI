// /**CONVERTS THE INPUT DATA TO TENSOR

export function convertInputDataToTensor(inputData, numberOfInputFeatures) {
   
    return tf.tidy(() => {
        // Shuffle the data
        tf.util.shuffle(inputData);
        // Convert data to Tensor, xs values are the inputs
        const inputs = inputData.map(d => d.xs);
        //tensor has a shape of [number of examples, number of features per example]
        const inputTensor = tf.tensor2d(inputs, [inputs.length, numberOfInputFeatures]);
       
        return inputTensor
    });
}


export default {
    convertInputDataToTensor,
}