const port = '8001'
const host = 'localhost'

const config =  {
    INPUT_CATCHMENTS: `http://${host}:${port}/server/assets/inputData/`,
    TRAINING_DATASETS: `http://${host}:${port}/server/assets/trainingDatasets/`,
    MODELS: `http://${host}:${port}/server/assets/models/`,
}

export default config