//MODEL LOOKS AT EXAMPLE DATA AND TRAINS ITSELF FROM IT


export async function trainModel(model, tensorTrainingInputs, tensorTrainingLabels, normTrainingData) {
    const { labelMin, labelMax } = normTrainingData;
    // Prepare the model for training.
    //'complie the model'
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
    const epochs = 25;

    const trainLogs = [];

    const rmse = { name: 'Training Performance (RMSE)', styles: { width: 1000} };
    const rrse = { name: 'Training Performance (MAE)', styles: { width: 1000} };
    //model.fit is a function to start the training loop
    const hs = await model.fit(tensorTrainingInputs, tensorTrainingLabels, {
        batchSize,
        epochs,
        shuffle: true,
        // validationSplit: 0.1,
        // callbacks to monitor the training progress, rendered as plot with tfvis
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                //at the end of each epoch unNormalise the mse, find its squroot, push it to the object 'trainLogs'
                trainLogs.push({
                    rmse: unNormLoss(Math.sqrt(logs.loss), labelMax, labelMin),
                    mae: unNormLoss(logs.meanAbsoluteError, labelMax, labelMin)
                    // val_rmse: unNormLoss(Math.sqrt(logs.val_loss), labelMax, labelMin)
                });
               // show.history plots either history, or 'history like object'.
                tfvis.show.history(rmse, trainLogs,
                    ['rmse'],
                    { height: 200, width: 1000, callbacks: ['onEpochEnd'] }
                )
                tfvis.show.history(rrse, trainLogs,
                    ['mae'],
                    { height: 200, width: 1000, callbacks: ['onEpochEnd'] }
                )

            }
            
        }
    });
    console.log(hs.history)
    return hs

}


// unNormalises the loss values so they are easier to interpret 
function unNormLoss(normLoss, labelMax, labelMin){

const normLossTensor = tf.tensor1d([normLoss])
const unNormLoss = normLossTensor
.mul(labelMax.sub(labelMin))
.add(labelMin);

return unNormLoss.arraySync()

}



export default {
    trainModel,
}