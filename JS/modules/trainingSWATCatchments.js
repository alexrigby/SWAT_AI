export async function trainingSWATCatchments() {
    await fetch('http://localhost:8000/trainingswatcatchments')
        .then((response) => response.json())
        .then((data) => {
            const fileCount = data.length;
            
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