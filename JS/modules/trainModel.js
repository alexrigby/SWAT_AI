//TRAINS MODEL BASED ON TRAINING DATASET

export async function trainModel(model, tensorTrainingInputs, tensorTrainingLabels) {

    const valSplit = document.getElementById("validationSplit").value
    
    //optimize = algorithm that governs updates to the model 
    //loss = tells the model how well it is doing learning
    model.compile({
        optimizer: tf.train.adam(),
        loss: [tf.losses.meanSquaredError],
        metrics: [tf.metrics.meanAbsoluteError]
    });

    //number of examples per batch (model fed 32 examples each itteration)
    const batchSize = 32;
    //number of times model looks at entire dataset
    const epochs = document.getElementById("epochs").value
    
    //placeholder for RMSE loss values
    const trainLogs = [];

    const rmse = { name: 'Training Performance (RMSE)', styles: { width: 1000} };
    const rrse = { name: 'Training Performance (MAE)', styles: { width: 1000} };

    //model.fit is a function to start the training loop
    const hs = await model.fit(tensorTrainingInputs, tensorTrainingLabels, {
        batchSize,
        epochs,
        shuffle: true,
        validationSplit: valSplit,
        // callbacks to monitor the training progress, rendered as plot with tfvis
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                //at the end of each epoch unNormalise the mse, find its squroot, push it to the object 'trainLogs'
                trainLogs.push({
                    rmse: Math.sqrt(logs.loss),
                    validation_rmse: Math.sqrt(logs.val_loss), 
                    mae: logs.meanAbsoluteError,
                    validation_mae: logs.val_meanAbsoluteError,
                });
               // show.history plots either history, or 'history like object'.
                tfvis.show.history(rmse,  trainLogs,
                    ['rmse', 'validation_rmse'],
                    { height: 200, width: 1000, callbacks: ['onEpochEnd'] }
                )
                tfvis.show.history(rrse, trainLogs,
                    ['mae', 'validation_mae'],
                    { height: 200, width: 1000, callbacks: ['onEpochEnd'] }
                )

            }
            
        }
    });

    // gets final loss metrics for the model
    const valRMSE = trainLogs[epochs -1].validation_rmse
    const trainRMSE = trainLogs[epochs -1].rmse
    const valMAE = trainLogs[epochs -1].validation_mae
    const trainMAE = trainLogs[epochs -1].mae

    //adds record of loss to the interface
    document.getElementById("modelAcuracy").innerHTML = `Validation RMSE:  ${valRMSE} <br>
    Training RMSE: ${trainRMSE} <br>
    Validation MAE: ${valMAE} <br>
    Training MAE: ${trainMAE}`
    
    document.getElementById("afterTraining").style.display = "block"

}




export default {
    trainModel,
}