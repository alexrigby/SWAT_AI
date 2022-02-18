//CLEANS SWAT+ channel sd day OUTPUT FILES, RETURNS CLEAN DATA


export function cleanCsvOutput(data) {
    const clean = d3.csvParse(data
        // Remove the header line produced by SWAT+ Editor
        .substring(data.indexOf('\n') + 1)
        // First, remove all spaces and replace with nothing
        .replace(/ +/gm, '')
        //might work, adds 0 in front of all single didgit numbers, test if vega-lite accepts it 
        .replace(/\b(\d{1})\b/g, '0$1'),
        
        //auto parse the data as correct type (e.g number)
        d3.autoType
    );
    
    const outputNames = clean.columns.splice(7)
   
    //removes the line which displays units from output data (where there is no name)
    const noUnits = clean.filter(clean => clean.name != null);
    // console.log(noUnits)

    // // returns only values for channel 1 (main channel for the ERCH, CHECK for other catchments)
    // const channelOneData = noUnits.filter(noUnits => noUnits.name == "cha001");
    
    //adds index collumn t the data to 'unshuffule' after model
    for (var i=0; i<noUnits.length; i++){
        noUnits[i].index = i;
    };
    
    return {
        csvData: noUnits, 
        outputNames: outputNames, 
    };
};



//CLEANS THE OBSERVED FLOW DATA CSV FILE
export function cleanPredictionInputCsv(data) {
    const clean = d3.csvParse(data
        // First, remove all spaces and replace with nothing
        .replace(/ +/gm, '')
        //might work, adds 0 in front of all single didgit numbers, test if vega-lite accepts it 
        .replace(/\b(\d{1})\b/g, '0$1')
        // Then remove all leading and trailing tabs
        .replace(/^\t|\t$/gm),
        d3.autoType
    );
    

    //loops through the observed data and adds an index collumn to 'un-shuffle' the time series data after modelling
    //left with a "" collumn for some reason, no issue now but SHOULD REMOVE
    for (var i=0; i<clean.length; i++){
        clean[i].index = i;
    }
console.log(clean)
   return clean
}



export default {
    cleanCsvOutput,
    cleanPredictionInputCsv,
}