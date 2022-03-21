//DEFINES MODEL ARCHITECTURE (LAYERS ETC.)

export function createModel(numberOfInputs) {
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [numberOfInputs], units: 22, useBias: true, activation: 'ReLU'}));

    // ReLU gives  better fit than sigmoid 
    //    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    model.add(tf.layers.dense({units: 14, activation: 'ReLU'}));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
}

export default {
    createModel,
}