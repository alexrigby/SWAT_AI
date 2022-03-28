const {d3} = require("d3-node");

//checks for word in string
const hasWord = (str, word) => str.split(/\s+/).includes(word);

module.exports = (data) => {
  // console.log(data)
  
  if (hasWord(data, "SWAT+") === true) {
    const clean = d3.csvParse(
      data
        // Remove the heade(r line produced by SWAT+ Editor
        .substring(data.indexOf("\n") + 1)
        // First, remove all spaces and replace with nothing
        .replace(/ +/gm, "")
    );
    // console.log(noUnits)
    //removes the line which displays units from output data (where there is no name)
    const noUnits = clean.filter((clean) => clean.name != "");
    
    return noUnits;
  } else {
    const clean = d3.csvParse(
      data
        // First, remove all spaces and replace with nothing
        .replace(/ +/gm, "")
        //might work, adds 0 in front of all single didgit numbers, test if vega-lite accepts it
        .replace(/\b(\d{1})\b/g, "0$1")
    );
// console.log(noUnits)
    for (var i = 0; i < clean.columns.length; i++) {
      clean.columns[i].toLowerCase();
    }
 
    const noUnits = clean.filter((clean) => clean.name != "");
    return noUnits;
  }
};
