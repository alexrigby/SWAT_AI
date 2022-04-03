//DEFINES MODEL ARCHITECTURE (LAYERS ETC.)

export function createModel(numberOfInputs) {

    // gets user defined values and assignes as the model parmaters
    const inputNodes = document.getElementById("inputNodes").value  //'best' value = 22
    const hiddenNodes = document.getElementById("hiddenNodes").value  //'best' value = 14
    const inputActivation = document.getElementById("inputActivation").value   //'best' value = 'ReLU'
    const hiddenActivation = document.getElementById("hiddenActivation").value  //'best' value = 'ReLU'

   
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer (input layer is technically another hidden layer)
    model.add(tf.layers.dense({ inputShape: [numberOfInputs], units: parseInt(inputNodes), useBias: true, activation: inputActivation}));

    // ReLU gives  better fit than sigmoid 
    model.add(tf.layers.dense({units: parseInt(hiddenNodes), activation: hiddenActivation}));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
}

export default {
    createModel,
}