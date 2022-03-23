import { convertInputDataToTensor } from "./convertInputDataToTensor.js";
import { getInputData } from "./getInputData.js";
import { predictFlow } from "./predictFlow.js";
import config from "./config.js";

export async function runPrediction(){
      
     const inputCatchment = document.getElementById("inputFile").value
     const predictionModel = document.getElementById("model").value
      
     const { inputData, numberOfInputFeatures } = await getInputData(`${config.INPUT_CATCHMENTS}${inputCatchment}`);
     
     const tensorInputs = convertInputDataToTensor(inputData, numberOfInputFeatures);
    
      const model = await tf.loadLayersModel(`${config.MODELS}${predictionModel}`);

      await predictFlow(model, tensorInputs, inputData, inputCatchment);


}

export default {
  runPrediction,
}