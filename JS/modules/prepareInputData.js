//ON CLICK EXTRACTS DATA FROM SWAT+ FILES AND CREATES INPUT DATASET
// data from './server/assets/SWATInputCatchments'

async function prepareDatasetComand(){
    const catchment = document.getElementById("prepInputData")
    const start = document.getElementById("startDate")
    const end = document.getElementById("endDate")
    // loading spinner appers when data is being prepared
    document.querySelector("#spinner").innerHTML = `<div class="loading"> 
    <div class="swatloadingspinner"></div>
   </div>`;
    //http response sending catchment name, start date and end date for input period
    await fetch(`http://localhost:8000/prepareinputdata?catchment=${catchment.value}&start=${start.value}&end=${end.value}`)
    //if code 1 is sent back then stop the loading spinner
    .then(async (res) => {
        await res.json().then(async (d) => {
            if (d.code === 1) {
                document.querySelector("#spinner").innerHTML = ""
            }
        })
    })
}


export async function prepareInputData(){
    const trainingDatasetButton = document.getElementById("inputDataPrep")
    trainingDatasetButton.addEventListener("click", async () => { 
        await prepareDatasetComand()
    })
  
}

export default {
    prepareInputData
}