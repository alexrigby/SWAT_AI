const {d3} = require("d3-node");

//checks for word in string
const hasWord = (str, word) => str.split(/\s+/).includes(word);

// Return an object array from cleaned TSV data with D3.tsvParse
module.exports = (txt) => {

    let dataset = txt.trim().split("\r\n");
    // console.log(dataset)
    // Headings if needed:
    // let headings = dataset[0].split(",");
    let topTrim = dataset.slice(findWordIndex(dataset, '%Watershed'))
    let allData = topTrim.slice(0, findWordIndex(topTrim, '------------------------------------------------------------------------------'))
    let landuseHeaders = ['landuse      area        percentArea']
    let soilHeaders = ['soil      area        percentArea']
    let slopeHeaders = ['slope      area        percentArea']

    let basinAreaHa = dataset.slice(findWordIndex(dataset, 'Watershed'), findWordIndex(dataset, 'Watershed') + 1)
        .join('\n')
        // First, remove all spaces and replace with tabs
        .replace(/  +/gm, '\t')
        
    let basinAreaM = parseArea(basinAreaHa)

    //extracts lu, soil and slope data, gives each array headers, returns arrays to plain txt
    //slices from top of landuse to top of soil
    let landuse = (landuseHeaders.concat(allData.slice(findWordIndex(allData, 'Landuse') + 1, findWordIndex(allData, 'Soil')))).join('\n');
    //slices from top of soil to top of slope
    let soil = (soilHeaders.concat(allData.slice(findWordIndex(allData, 'Soil') + 1, findWordIndex(allData, 'Slope')))).join('\n');
    //slices the 3 slope bands out every time 
    let slope = (slopeHeaders.concat(allData.slice(findWordIndex(allData, 'Slope') + 1, (findWordIndex(allData, 'Slope') + 4)))).join('\n');

    //makes JSON from txt array 
    let landuseJSON = txtToJSON(landuse).map(d => ({
        landuse: d.landuse,
        area: d.percentArea,
    }));
    // let landuseJSON = txtToJSON(landuse)
    // let landuseJSONShort = []
    // for (var i = 0; i < landuseJSON.length; i++) {
    //     var lu =  {landuseJSON[i].land }
    //   }

    let soilJSON = txtToJSON(soil).map(d => ({
        soil: d.soil,
        area: d.percentArea,
    }));

    let slopeJSON = txtToJSON(slope).map((d, i) => ({
        name: `slopeBand${i + 1}`,
        slope: d.slope,
        area: d.percentArea,
    }));


    //if the file has a water value then extract that value
    if (findWord(allData, 'Water') === true) {
        let water = allData.slice(findWordIndex(allData, 'Water'))
            .join('\n')
            // First, remove all spaces and replace with tabs
            .replace(/  +/gm, '\t')
            // Then remove all leading and trailing tabs
            .replace(/^\t|\t$/gm, '');
        let waterJSON = parseWater(water)

        return {
            landuse: landuseJSON,
            soil: soilJSON,
            slope: slopeJSON,
            water: waterJSON,
            basinArea: basinAreaM,
        }

        //otherwise give water a value of 0
    } else {
        let waterJSON = {
            water: 0
        }

        return {
            landuse: landuseJSON,
            soil: soilJSON,
            slope: slopeJSON,
            water: waterJSON,
            basinArea: basinAreaM,
        }
    }
}

function parseWater(d) {
    let res = d.split("\t");
    return {
        water: `${res[2]}`
    };
}

function parseArea(d) {
    let res = d.split("\t");
    //converts ha to M2
    let resM = res[1] / 0.0001
    return resM
}



function txtToJSON(data) {
    return d3.tsvParse(data
        // / First, remove all spaces and replace with tabs
        .replace(/  +/gm, '\t')
        // Then remove all leading and trailing tabs
        .replace(/^\t|\t$/gm, '')
    )
};

function findWord(data, word) {
    for (var i = 0; i < data.length; i++) {
        if (hasWord(data[i], word) === true) {
            return true
        }
    }
}
function findWordIndex(data, word) {
    for (var i = 0; i < data.length; i++) {
        if (hasWord(data[i], word) === true) {
            return i
        }
    }
}
