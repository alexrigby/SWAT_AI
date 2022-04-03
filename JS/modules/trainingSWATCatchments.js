//GETS NAMES OF TRAINING CATCHMENTS IN './server/assets/SWATTrainingCatchments/.' AND ADDS THEM TO A LIST

export async function trainingSWATCatchments() {
    await fetch('http://localhost:8000/trainingswatcatchments')
        .then((response) => response.json())
        .then((data) => {
            const fileList = document.getElementById("trainingCatchments");

            fileList.innerHTML =""
            var str = '<ol>'
            data.forEach(function(data) {
                str += '<li>'+ data + '</li>';
              }); 
              str += '</ol>';
              fileList.innerHTML = str;
        })
}

export default {
    trainingSWATCatchments
}