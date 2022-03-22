export async function getInputCatchment() {
    await fetch('http://localhost:8000/getinputs')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            const fileList = document.getElementById("inputFile");
            for (let i = 0; i < fileCount; i++) {
                console.log(data[i])
                fileList.appendChild(new Option(data[i], data[i]));
            }
        })
}

export default {
    getInputCatchment,
}
