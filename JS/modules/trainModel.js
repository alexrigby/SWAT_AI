//MODEL LOOKS AT EXAMPLE DATA AND TRAINS ITSELF FROM IT

export async function trainModel(model, tensorTrainingInputs, tensorTrainingLabels) {
    // Prepare the model for training.
    //'complie the model'
    //optimize = algorithm that governs updates to the model 
    //loss = tells the model how well it is doing learning
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
    });

    //number of examples per batch (model fed 32 examples each itteration)
    const batchSize = 32;
    //number of times model looks at entire dataset
    const epochs = 20;

    //model.fit is a function to start the training loop
    return await model.fit(tensorTrainingInputs, tensorTrainingLabels, {
        batchSize,
        epochs,
        shuffle: true,
        // callbacks to monitor the training progress, rendered as plot with tfvis
        callbacks: tfvis.show.fitCallbacks(
            { name: 'Training Performance', styles: {width: 1000} },
            ['mse'],
            { height: 200, width: 1000, callbacks: ['onEpochEnd'] }
        )
    });
}

export default {
 trainModel,
}