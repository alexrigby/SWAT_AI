//GETS NAMES OF INPuT DATASETS FROM './server/assets/inputData'

export async function getInputCatchments() {
    await fetch('http://localhost:8000/getinputs')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            const fileList = document.getElementById("inputFile");
            
            //clears select list when the function is called so the names arent duplicated
            for (let i = 0; i< fileCount; i++) {
                fileList.remove(fileList[i])
            }
            //adds names to select list after the names have been cleared
            for (let i = 0; i < fileCount; i++) {
                fileList.appendChild(new Option(data[i], data[i]))
            }
       
        })
}



export default {
    getInputCatchments,
}
