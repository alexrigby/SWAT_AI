//GETS THE NAMES OF TRAINING DATASETS FROM './server/assets/trainingDatasets/'

export async function getTrainingDatasets() {
    await fetch('http://localhost:8000/gettrainingdatasets')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            const fileList = document.getElementById("trainingDatasets");
            //removes names from select list when the function is called before adding so names arent duplicated
            for (let i = 0; i< fileCount; i++) {
                fileList.remove(fileList[i])
            }
            // adds the names to select list
            for (let i = 0; i < fileCount; i++) {
                fileList.appendChild(new Option(data[i], data[i]));
            }
        })
}

export default {
    getTrainingDatasets
}