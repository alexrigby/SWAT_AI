import { convertInputDataToTensor } from "./convertInputDataToTensor.js";
import { getInputData } from "./getInputData.js";
import { predictFlow } from "./predictFlow.js";

export async function runPrediction(){
      
     const { inputData, numberOfInputFeatures } = await getInputData('http://127.0.0.1:5500/server/assets/Dwyfor_2005.csv');
     
     const tensorInputs = convertInputDataToTensor(inputData, numberOfInputFeatures);
    
      const model = await tf.loadLayersModel('http://127.0.0.1:5500/server/models/11c_50e_1422.json');

      await predictFlow(model, tensorInputs, inputData);


}

export default {
  runPrediction,
}