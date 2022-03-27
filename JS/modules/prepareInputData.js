
async function prepareDatasetComand(){
    const catchment = document.getElementById("prepInputData")
    const start = document.getElementById("startDate")
    const end = document.getElementById("endDate")

    document.querySelector("#spinner").innerHTML = `<div class="loading"> 
    <div class="swatloadingspinner"></div>
   </div>`;
    await fetch(`http://localhost:8000/prepareinputdata?catchment=${catchment.value}&start=${start.value}&end=${end.value}`)
    .then(async (res) => {
        await res.json().then(async (d) => {
            if (d.code === 1) {
                document.querySelector("#spinner").innerHTML = ""
            }
        })
    })
}

export async function prepareInputData(){
    const end = document.getElementById("endDate")
    console.log(end.value)
    const trainingDatasetButton = document.getElementById("inputDataPrep")
    trainingDatasetButton.addEventListener("click", async () => { 
        await prepareDatasetComand()
    })
  
}

export default {
    prepareInputData
}