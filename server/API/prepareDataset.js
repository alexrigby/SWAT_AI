const path = require("path");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const {
  cleanCSV,
  trimWbJSON,
  parseFlo,
  parseRefList,
  parseLUSoilSlope,
  parseTopo,
  trimPwJSON,
  trimChannelJSON,
  getMainChannel,
  parseChannelCSV,
} = require("./lib/index.js");


const startDate = '01/01/2008'
const endDate = '31/12/2008'


const CATCHMENTS_DIR = "../assets/catchments/";
const REFERENCE_DIR = "../assets/reference/";
const LU_CODES_FILE = `${REFERENCE_DIR}landuse-codes.csv`;
const SOIL_CODES_FILE = `${REFERENCE_DIR}soil-codes.csv`;
const BASIN_WATER_BALANCE = "basin_wb_day.csv";
const FLOW_OUT_FILE_SUFFIX = "_dly_flo.csv";
const LU_SOIL_TOPO_FILE = "LanduseSoilSlopeRepSwat.txt";
const TOPO_FILE = "TopoRep.txt";
const BASIN_PLANT_WEATHER = "basin_pw_day.csv";
const CHANNEL_SD = "channel_sd_day.csv";
const CHANDEG = "chandeg.con"
const OUT_FILE = "../assets/out/out.csv";

const rfsOpts = {
  encoding: "utf8",
};


// Array of catchment directory names
const catchments = readdirSync(path.resolve(__dirname, CATCHMENTS_DIR));


function prep() {
  let catchmentsDataset = []
  for (let i = 0; i < catchments.length; i++) {
    let currentCatchment =  catchments[i] + '/';
  
    let catchmentDir = path.resolve(__dirname, CATCHMENTS_DIR, currentCatchment);

   
    let mainChannel = getMainChannel(
      readFileSync(path.resolve(__dirname, catchmentDir, CHANDEG), rfsOpts)
    );
  

    // Basin water balance
    let basinWb = prepareWbCSV(
      readFileSync(`${catchmentDir}${BASIN_WATER_BALANCE}`, rfsOpts)
    );

    let basinPw = preparePwCSV(
      readFileSync(`${catchmentDir}${BASIN_PLANT_WEATHER}`, rfsOpts)
    );

    let basinArea = parseLUSoilSlope(readFileSync(`${catchmentDir}${LU_SOIL_TOPO_FILE}`, rfsOpts)).basinArea;

    let swatFlow = prepareChannelCSV(
      readFileSync(`${catchmentDir}${CHANNEL_SD}`, rfsOpts), basinArea, mainChannel
      );

    let basinMerged = []
    for (let j = 0; j < basinWb.length; j++) {
        let merged = ({...basinWb[j], ...basinPw[j], ...swatFlow[j]} )
        basinMerged.push(merged)
    };



    // Parse LU Codes
    let luCodes = parseRefList(readFileSync(LU_CODES_FILE, rfsOpts));
    let luCodeCount = luCodes.length


    // Parse Soil Codes
    let soilCodes = parseRefList(readFileSync(SOIL_CODES_FILE, rfsOpts));
    let soilCodeCount = soilCodes.length

    // // Parse lu, soil, topo and water data
    let lu = parseLUSoilSlope(readFileSync(`${catchmentDir}${LU_SOIL_TOPO_FILE}`, rfsOpts)).landuse


    let soil = parseLUSoilSlope(readFileSync(`${catchmentDir}${LU_SOIL_TOPO_FILE}`, rfsOpts)).soil;


    let slope = parseLUSoilSlope(readFileSync(`${catchmentDir}${LU_SOIL_TOPO_FILE}`, rfsOpts)).slope;
    let slopeBandCount = 3

    let water = parseLUSoilSlope(readFileSync(`${catchmentDir}${LU_SOIL_TOPO_FILE}`, rfsOpts)).water;

    let elevation = parseTopo(readFileSync(`${catchmentDir}${TOPO_FILE}`, rfsOpts));
    let elevationBandCount = elevation.length

  
    // Flow Out
    let flowOut = parseFlo(
      readFileSync(
        `${catchmentDir}/${currentCatchment}${FLOW_OUT_FILE_SUFFIX}`,
        rfsOpts
      ),
      basinWb, basinArea
    );



    // let fieldCount = 1 + luCodeCount + soilCodeCount + slopeBandCount + waterCount + elevationBandCount
    // let fieldCount = 10 + luCodeCount + soilCodeCount + slopeBandCount + waterCount + elevationBandCount
    // let fieldHeadings = ['jday', 'mon', 'day', 'yr', 'precip', 'snofall', 'snomelt', 'et', 'date'];
    // let pwHeadings = ['lai', 'tmx', 'tmn', 'tmpav', 'solarad', 'phubas']
    let fieldHeadings = [];

    // for (let j = 0; j < pwHeadings.length; j++) {
    //   fieldHeadings.push(pwHeadings[j])
    // }
    //loop over lu codes
    for (let j = 0; j < luCodeCount; j++) {
      fieldHeadings.push(luCodes[j])
    }
    for (let j = 0; j < soilCodeCount; j++) {
      fieldHeadings.push(soilCodes[j])
    }
    for (let j = 0; j < slopeBandCount; j++) {
      fieldHeadings.push(slope[j].name)
    }
    fieldHeadings.push('water')
    for (let j = 0; j < elevationBandCount; j++) {
      fieldHeadings.push(elevation[j].name)
    }
    fieldHeadings.push('oFlow');
    fieldHeadings.push('flowMCubed')


    //creates copy of basinWb + basinPw to use as basis for dataset
    let fullCatchmentData = [...basinMerged]

    for (let j = 0; j < fullCatchmentData.length; j++) {
      for (let k = 0; k < fieldHeadings.length; k++) {
        fullCatchmentData[j][fieldHeadings[k]] = 0
      };
    };

    //loops over dataset and for each object(day) adds each header in feildHeadings and gives them the value 0 as placeholder
    for (let j = 0; j < fullCatchmentData.length; j++) {
      for (let k = 0; k < fieldHeadings.length; k++) {
        fullCatchmentData[j][fieldHeadings[k]] = 0
      };
    };

    //loops over dataset and replaces lu values with the catchment values
    for (let j = 0; j < fullCatchmentData.length; j++) {
      for (let k = 0; k < lu.length; k++) {
        fullCatchmentData[j][lu[k].landuse] = lu[k].area
      };
    };

    //loops over dataset and replaces soil values with ones found in catchment
    for (let j = 0; j < fullCatchmentData.length; j++) {
      for (let k = 0; k < soil.length; k++) {
        fullCatchmentData[j][soil[k].soil] = soil[k].area
      };
    };

    //adds slope band values 
    for (let j = 0; j < fullCatchmentData.length; j++) {
      for (let k = 0; k < slope.length; k++) {
        fullCatchmentData[j][slope[k].name] = slope[k].area
      };
    };

    //adds value for water to water field
    for (let j = 0; j < fullCatchmentData.length; j++) {
      fullCatchmentData[j].water = water.water
    };

    //adds slope band values 
    for (let j = 0; j < fullCatchmentData.length; j++) {
      for (let k = 0; k < elevation.length; k++) {
        fullCatchmentData[j][elevation[k].name] = elevation[k].area
      };
    };

    //adds the flo out values(indexed bu 1 as 0 is the date collumn)
    for (let j = 0; j < fullCatchmentData.length; j++) {
      fullCatchmentData[j].oFlow = convertFlow(flowOut[j][1], basinArea)
    };

    //adding flow in m cubed to remove all null values and -999 values
    for (let j = 0; j < fullCatchmentData.length; j++ ) {
      fullCatchmentData[j].flowMCubed = flowOut[j][1]
    }

    //removes entries where flow -999 (NRFA give value -999 for missing data) 
    let cd = fullCatchmentData.filter(d => d.flowMCubed !== '-999888' && d.flowMCubed !== 'weergerger')
    
    //loops over data and removes the flowout in m3
    for (let j = 0; j < cd.length; j++) {
      delete cd[j].flowMCubed 
      delete cd[j].date
    };
    
    catchmentsDataset.push(cd)

  }
  console.log(catchments.length + ' Catchments added to the dataset, checkout the "out" directory!')
   
  return csvConverter(catchmentsDataset.flat(catchments.length))

};


function convertFlow(d, area) {
  let flowM3 =  (d*1000*24*3600)/area
  
  return flowM3
}

function csvConverter(data) {
  // Convert dataset to TSV and print
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(fieldName => row[fieldName]).join(','))
  ].join('\r\n');
  return csv;
}



function prepareWbCSV(data) {
  return trimWbJSON(cleanCSV(data), startDate, endDate);
}

function preparePwCSV(data) {
  return trimPwJSON(cleanCSV(data), startDate, endDate)
}

function prepareChannelCSV(data, basinArea, mainChannel) {
  return trimChannelJSON(parseChannelCSV(data, mainChannel), startDate, endDate, basinArea)
}


module.exports =() => {
  
   let dataset = prep();

  writeFileSync( `${OUT_FILE}`, dataset)
}

// run();
