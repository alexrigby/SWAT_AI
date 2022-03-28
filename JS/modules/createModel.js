//DEFINES MODEL ARCHITECTURE (LAYERS ETC.)

export function createModel(numberOfInputs) {

    const inputNodes = document.getElementById("inputNodes").value
    const hiddenNodes = document.getElementById("hiddenNodes").value
    const inputActivation = document.getElementById("inputActivation").value
    const hiddenActivation = document.getElementById("hiddenActivation").value
   
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [numberOfInputs], units: parseInt(inputNodes), useBias: true, activation: inputActivation}));

    // ReLU gives  better fit than sigmoid 
    //    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    model.add(tf.layers.dense({units: parseInt(hiddenNodes), activation: hiddenActivation}));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
}

export default {
    createModel,
}