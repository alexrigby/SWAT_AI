import { convertInputDataToTensor } from "./convertInputDataToTensor.js";
import { getInputData } from "./getInputData.js";
import { predictFlow } from "./predictFlow.js";

export async function runPrediction(){
      
     const inputCatchment = document.getElementById("inputFile").value
      
     const { inputData, numberOfInputFeatures } = await getInputData(`http://127.0.0.1:5500/server/assets/inputCatchments/${inputCatchment}`);
     
     const tensorInputs = convertInputDataToTensor(inputData, numberOfInputFeatures);
    
      const model = await tf.loadLayersModel('http://127.0.0.1:5500/server/models/11c_50e_1422.json');

      await predictFlow(model, tensorInputs, inputData, inputCatchment);


}

export default {
  runPrediction,
}