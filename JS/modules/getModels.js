//GETS THE MODEL NAMES FROM './server/assets/models/'
export async function getModels() {
    await fetch('http://localhost:8000/getmodels')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            const fileList = document.getElementById("model");
           
            //removes model names from the select list when function is called so names arent dulicated
            for (let i = 0; i< fileCount; i++) {
                fileList.remove(fileList[i])
            }
            
            //adds the model names to select list
            for (let i = 0; i < fileCount; i++) {
                fileList.appendChild(new Option(data[i], data[i]));
            }
        })
}

export default {
    getModels,
}