import { convertInputDataToTensor } from "./convertInputDataToTensor.js";
import { getInputData } from "./getInputData.js";
import { predictFlow } from "./predictFlow.js";
import config from "./config.js";
import { plotPredictions } from "./plotPredictions.js";

export async function runPrediction(){
      
     const inputCatchment = document.getElementById("inputFile").value
     const predictionModel = document.getElementById("model").value
      
     const { inputData, numberOfInputFeatures } = await getInputData(`${config.INPUT_CATCHMENTS}${inputCatchment}`);
     
     const tensorInputs = convertInputDataToTensor(inputData, numberOfInputFeatures);
    
      const model = await tf.loadLayersModel(`${config.MODELS}${predictionModel}`);

     const flowPredictions = await predictFlow(model, tensorInputs, inputData, inputCatchment);

     

     plotPredictions(flowPredictions, inputCatchment)

     

}

export default {
  runPrediction,
}