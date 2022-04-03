//GETS THE NAMES OF INPUT SWAT CATCHMENTS FOR DATA PREP

export async function inputSWATCatchments() {
    await fetch('http://localhost:8000/inputswatcatchments')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            const fileList = document.getElementById("prepInputData");
            
            //remove all names from the select so they are not duplicated when function is called
            for (let i = 0; i< fileCount; i++) {
                fileList.remove(fileList[i])
            }
            
            //adds te names to list when function is called
            for (let i = 0; i < fileCount; i++) {
                fileList.appendChild(new Option(data[i], data[i]));
            }
        })
}

export default {
    inputSWATCatchments
}