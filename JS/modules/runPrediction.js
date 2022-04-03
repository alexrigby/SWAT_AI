//BRINGS AL RELIVENT FUNCTIONS TOGETHER TO RUN MODEL AND MAKE PREDICTIONS
import { convertInputDataToTensor } from "./convertInputDataToTensor.js";
import { getInputData } from "./getInputData.js";
import { predictFlow } from "./predictFlow.js";
import config from "./config.js";
import { plotPredictions } from "./plotPredictions.js";

export async function runPrediction() {

  const inputCatchment = document.getElementById("inputFile").value
  const predictionModel = document.getElementById("model").value

  //converst csv data to tensorflow dataset 
  const { inputData, numberOfInputFeatures } = await getInputData(`${config.INPUT_CATCHMENTS}${inputCatchment}`);
  //converts dataset to tensor
  const tensorInputs = convertInputDataToTensor(inputData, numberOfInputFeatures);
  //assignes pre trained model from './server/assets/models/' to the const 'model'
  const model = await tf.loadLayersModel(`${config.MODELS}${predictionModel}`);
  //uses model to make predictions for input tensor
  const flowPredictions = await predictFlow(model, tensorInputs, inputData);
  
  //plots the predictions when model has ran
  plotPredictions(flowPredictions, inputCatchment)
  
  document.getElementById("downloadPreds").style.display = "block"

}

export default {
  runPrediction,
}