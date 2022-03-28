export async function inputSWATCatchments() {
    await fetch('http://localhost:8000/inputswatcatchments')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            const fileList = document.getElementById("prepInputData");

            for (let i = 0; i< fileCount; i++) {
                fileList.remove(fileList[i])
            }
            
            for (let i = 0; i < fileCount; i++) {
                fileList.appendChild(new Option(data[i], data[i]));
            }
        })
}

export default {
    inputSWATCatchments
}