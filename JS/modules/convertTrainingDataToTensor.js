// /**CONVERTS THE CHANNEL SD DAY DATA TO TENSOR AND NORMALIZES
//  */
import { getTrainingData } from "./getTrainingData.js";

export async function convertTrainingDataToTensor() {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.
    // const inputOption = document.getElementById("inputNames").value
    // const outputOption = document.getElementById("outputNames").value
   const TData = await getTrainingData()
   const trainingData = TData.trainingData
   const numberOfFeatures = TData.numberOfFeatures
    return tf.tidy(() => {
        // Step 1. Shuffle the data
        // shuffles all data so it is not in the order it was input, 
        // helps because the data is fed to the model in batches, removes bias
        tf.util.shuffle(trainingData);

        // Step 2. Convert data to Tensor
         
        // console.log(data)
        //x values are the inputs and y are lables from 'trainingData' (in 'run.js')
        const inputs = trainingData.map(d => d.xs);
        const labels = trainingData.map(d => d.ys);

        const trainingIndex = trainingData.map(d => d.index)
       

        //tensor has a shape of [number of examples, number of features per example]
        const inputTensor = tf.tensor2d(inputs, [inputs.length, numberOfFeatures]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
          
      
        return {
            inputs: inputTensor,
            labels: labelTensor,
            numberOfFeatures: numberOfFeatures,
            trainingData: trainingData,
        }
    });
}


export default {
    convertTrainingDataToTensor,
}