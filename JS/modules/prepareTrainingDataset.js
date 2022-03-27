
async function prepareDatasetComand() {
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