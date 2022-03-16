//DEFINES MODEL ARCHITECTURE (LAYERS ETC.)

export function createModel(numberOfInputs) {
    const inputLayerShape  = numberOfInputs;
    const inputLayerNeurons = 100;
    const rnnInputLayerFeatures = 10;
    const rnnInputLayerTimesteps = inputLayerNeurons / rnnInputLayerFeatures;
    const rnnInputShape = [rnnInputLayerTimesteps, rnnInputLayerFeatures];

    const rnnOutputNeurons = 20;
    const hiddenLayers = 4;
    var lstmCells = [];
    for (let index = 0; index < hiddenLayers; index++) {
        lstmCells.push(tf.layers.lstmCell({units: rnnOutputNeurons}));
    }

    const outputLayerShape = rnnOutputNeurons;
    const outputLayerNeurons = 1;
    

    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [inputLayerShape], units: inputLayerNeurons}));

    model.add(tf.layers.reshape({ targetShape: rnnInputShape }));

   model.add(tf.layers.rnn({cell: lstmCells,
    inputShape: rnnInputShape, returnSequences: false
   }));
    // ReLU gives  better fit than sigmoid 
    //    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    // model.add(tf.layers.dense({units: 10, activation: 'ReLU'}));
    // Add an output layer
    model.add(tf.layers.dense({ units: outputLayerNeurons, inputShape: [outputLayerShape] }));

    return model;
}

export default {
    createModel,
}