
async function prepareDatasetComand(){
    const catchment = document.getElementById("prepInputData")
    const start = document.getElementById("startDate")
    const end = document.getElementById("endDate")
    await fetch(`http://localhost:8000/prepareinputdata?catchment=${catchment.value}&start=${start.value}&end=${end.value}`)
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