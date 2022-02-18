import fetchData from "./fetchData.js"
import { cleanCsvOutput, cleanPredictionInputCsv } from "./cleanCsvOutput.js";

/**
 * FETCHES CHANNEL SD DATA AND MAKES DATASETOF FLOW AND SEDIMENT  
 */
export async function getData(url, IOOption) {
    const data = await fetchData(url);
    const cleanData = cleanCsvOutput(data)
    const cleanCsvData = cleanData.csvData
    const cleaned = cleanCsvData.map(csv => ({
        [IOOption]: csv[IOOption],
        index: csv.index,

    }))

    // const cleaned = cleanCsvData.map(csv => ({
    //     [outputOption]: csv[outputOption],
    //     flow: csv.flo_out,
    //     date: csv.date,
    //     index: csv.index,
    // }))

        // .filter(csv => (csv.flow != null && csv[outputOption] != null));
    return cleaned;
}


// export async function getOptionNames(url, id) {
//     const data = await fetchData(url);
//     const cleanData = cleanCsvOutput(data)
//     const inputNames = cleanData.outputNames.map((el, i) => {
//         return `<option value=${el}>${el}</option>`;
//     });
//     document.getElementById(id).innerHTML = inputNames
// }




//FETCHES INPUT DATA FOR PREDICTION 
export async function getPredictionInput() {
    const inputOption = document.getElementById("inputNames").value 

    const data = await fetchData("data/dwyfor_SWAT_Percip.csv");
    // const flowData = await fetchData("./Erch_dly_flow.csv");
    // const flowData = await fetchData("./swatData.csv");
    const clean = cleanPredictionInputCsv(data)

    const cleaned = clean.map(observed => ({
        [inputOption]: observed[inputOption],
        // date: observed.Date,
        index: observed.index,
    }));

    return cleaned
}

export default {
    getData,
    getPredictionInput,
    // getOptionNames,
}