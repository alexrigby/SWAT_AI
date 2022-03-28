const {d3} = require("d3-node");


function getMainChannel(txt){
        const clean = d3.tsvParse(txt
            // Remove the header line produced by SWAT+ Edito
            .substring(txt.indexOf('\n') + 1)
            // First, remove all spaces and replace with tabs
            .replace(/  +/gm, '\t')
            // Then remove all leading and trailing tabs
            .replace(/^\t|\t$/gm, '')
        );

        //finds channel with out tot = 0, i.e. the main channel
            const filteredData = clean.filter(record => record.out_tot == 0);
            // console.log(filteredData[0].name)
            return filteredData[0].name
        
        };

        module.exports = getMainChannel
