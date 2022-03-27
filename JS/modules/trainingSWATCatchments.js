export async function trainingSWATCatchments() {
    await fetch('http://localhost:8000/trainingswatcatchments')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            
            const fileList = document.getElementById("trainingCatchments");

         
            fileList.innerHTML =""
            
            for (let i = 0; i < fileCount; i++) {
                fileList.innerHTML = `${i + 1}. ${data[i]} </br>`
           
            }
        })
}

export default {
    trainingSWATCatchments
}