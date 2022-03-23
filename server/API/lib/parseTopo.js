const d3 = require("d3-node");

//checks for word in string
const hasWord = (str, word) => str.split(/\s+/).includes(word);

module.exports = (txt) => {

    //trims all uselses data
    let dataset = txt.trim().split("\n");
    let topTrim = dataset.slice(findWordIndex(dataset, '%'))
    let allData = topTrim.slice(0, findWordIndex(topTrim, '------------------------------------------------------------------------------') - 1).join('\n')
    //converts data to JSON
    let topoJSON = txtToJSON(allData)
    // console.log(allData)

    let topoBands = {
    band1: [],
    band2: [],
    band3: [],
    band4: [],
    band5: [],
    band6: [],
    band7: [],
    band8: [],
    band9: [],
    band10: [],
    band11:[],
    };
    

    //loops over all elevation entries and adds ones between 0 -100, 100-200 etc. to array
    for (var i = 0; i < topoJSON.length; i++) {
        if (topoJSON[i].Elevation >= 0 && topoJSON[i].Elevation < 100) {
            topoBands.band1.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 100 && topoJSON[i].Elevation < 200) {
            topoBands.band2.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 200 && topoJSON[i].Elevation < 300) {
            topoBands.band3.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 300 && topoJSON[i].Elevation < 400) {
            topoBands.band4.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 400 && topoJSON[i].Elevation < 500) {
            topoBands.band5.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 500 && topoJSON[i].Elevation < 600) {
            topoBands.band6.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 600 && topoJSON[i].Elevation < 700) {
            topoBands.band7.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 700 && topoJSON[i].Elevation < 800) {
            topoBands.band8.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 800 && topoJSON[i].Elevation < 900) {
            topoBands.band9.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 900 && topoJSON[i].Elevation < 1000) {
            topoBands.band10.push(topoJSON[i]['% area of watershed'])
        } else if (topoJSON[i].Elevation >= 1000 && topoJSON[i].Elevation < 1100) {
            topoBands.band11.push(topoJSON[i]['% area of watershed'])
        }
    };

      // array of the sum of each topo band (should loop but cant work it out so did it mannualy)
        // const topoBandsSum = {
        // eBand1: sumArray(topoBands.band1),
        // eBand2: sumArray(topoBands.band2),
        // eBand3: sumArray(topoBands.band3),
        // eBand4: sumArray(topoBands.band4),
        // eBand5: sumArray(topoBands.band5),
        // eBand6: sumArray(topoBands.band6),
        // eBand7: sumArray(topoBands.band7),
        // eBand8: sumArray(topoBands.band8),
        // eBand9: sumArray(topoBands.band9),
        // eBand10: sumArray(topoBands.band10),
        // };

        return [
            {
                name: 'eBand1',
                area: sumArray(topoBands.band1)
            }, 
            {
                name: 'eBand2',
                area: sumArray(topoBands.band2)
            },
            {
                name: 'eBand3',
                area: sumArray(topoBands.band3)
            },
            {
                name: 'eBand4',
                area: sumArray(topoBands.band4)
            },
            {
                name: 'eBand5',
                area: sumArray(topoBands.band5)
            },
            {
                name: 'eBand6',
                area: sumArray(topoBands.band6)
            },
            {
                name: 'eBand6',
                area: sumArray(topoBands.band6)
            },
            {
                name: 'eBand7',
                area: sumArray(topoBands.band7)
            },
            {
                name: 'eBand8',
                area: sumArray(topoBands.band8)
            },
            {
                name: 'eBand9',
                area: sumArray(topoBands.band9)
            },
            {
                name: 'eBand10',
                area: sumArray(topoBands.band10)
            },
            {
                name: 'eBand11',
                area: sumArray(topoBands.band11)
            }
        ]
}



//calculates the summ of an array 
function sumArray(array) {
    if (array.length == 0) {
        return 0; 
    } else {
        const sum = array.reduce((total, item) => total + item); 
        return sum;
    }
  }



function txtToJSON(data) {
    return d3.tsvParse(data
        // / First, remove all spaces and replace with tabs
        .replace(/  +/gm, '\t')
        // Then remove all leading and trailing tabs
        .replace(/^\t|\t$/gm, ''),
        d3.autoType
    )
};

function findWordIndex(data, word) {
    for (var i = 0; i < data.length; i++) {
        if (hasWord(data[i], word) === true) {
            return i
        }
    }
}