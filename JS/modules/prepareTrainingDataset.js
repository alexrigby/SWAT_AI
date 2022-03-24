
async function prepareDatasetComand(){
    await fetch(`http://localhost:8000/preparetrainingdataset`)
}

export async function prepareTrainingDataset(){
    const trainingDatasetButton = document.getElementById("trainingDataPrep")
    trainingDatasetButton.addEventListener("click", async () => { 
        await prepareDatasetComand()
    })
  
}

export default {
    prepareTrainingDataset
}