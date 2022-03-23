export async function getModels() {
    await fetch('http://localhost:8000/getmodels')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const fileCount = data.length;
            const fileList = document.getElementById("model");
            for (let i = 0; i < fileCount; i++) {
                console.log(data[i])
                fileList.appendChild(new Option(data[i], data[i]));
            }
        })
}

export default {
    getModels,
}