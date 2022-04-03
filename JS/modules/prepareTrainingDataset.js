//ONCLICK EXTRACTS DATA FROM SWAT+ CATCHMENTS TO PREPARE TRAINING DATASET 
// data from './server/assets/SWATTrainingCatchments'
async function prepareDatasetComand() {
    //loading spinner appers when data is being prepared
    document.querySelector(
        "#spinner"
    ).innerHTML = `<div class="loading"> 
          <div class="swatloadingspinner"></div>
         </div>`;
    await fetch(`http://localhost:8000/preparetrainingdataset`)
        .then(async (res) => {
            await res.json().then(async (d) => {
                if (d.code === 1) {
                    document.querySelector("#spinner").innerHTML = ""
                }
            })
        })
}

export async function prepareTrainingDataset() {
    const trainingDatasetButton = document.getElementById("trainingDataPrep")
    trainingDatasetButton.addEventListener("click", async () => {
        await prepareDatasetComand()
    })

}

export default {
    prepareTrainingDataset
}