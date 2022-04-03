// /**CONVERTS THE TRAINING DATA TO TENSOR

export function convertTrainingDataToTensor(trainingData, numberOfFeatures) {
    // Wrapping  in a tidy() disposes of an intermediate tensors.

    return tf.tidy(() => {
        // Shuffle the data
        tf.util.shuffle(trainingData);

        // Convert data to Tensor
        //xs values are the inputs and ys are lables (flow) from 'trainingData'
        const inputs = trainingData.map(d => d.xs);
        const labels = trainingData.map(d => d.ys);

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