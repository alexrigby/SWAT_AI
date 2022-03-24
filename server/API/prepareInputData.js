const path = require("path");
const d3 = require("d3-node");
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





const CATCHMENTS_DIR = `../assets/SWATInputCatchments/`;
const WATERSHED_TEXT = "watershed/Text/";
const TXTINOUT = `Scenarios/Default/TxtInOut/`;
const REFERENCE_DIR = "../assets/reference/";
const LU_CODES_FILE = `${REFERENCE_DIR}/SWATCodes/landuse-codes.csv`;
const SOIL_CODES_FILE = `${REFERENCE_DIR}/SWATCodes/soil-codes.csv`;
const BASIN_WATER_BALANCE = `${TXTINOUT}basin_wb_day.csv`;
const FLOW_DIR = `${REFERENCE_DIR}flowObservations/`
const FLOW_OUT_FILE_SUFFIX = `_dly_flo.csv`;
const LU_SOIL_TOPO_FILE = `${WATERSHED_TEXT}LanduseSoilSlopeRepSwat.txt`;
const TOPO_FILE = `${WATERSHED_TEXT}TopoRep.txt`;
const BASIN_PLANT_WEATHER = `${TXTINOUT}basin_pw_day.csv`;
const CHANNEL_SD = `${TXTINOUT}channel_sd_day.csv`;
const CHANDEG = `${TXTINOUT}chandeg.con`;
const OUT_DATA = `../assets/inputData/`;

const rfsOpts = {
  encoding: "utf8",
};



// Array of catchment directory names
const catchments = readdirSync(path.resolve(__dirname, CATCHMENTS_DIR));


function prep(catchment, start, end) {

    const startDate = start
    const endDate = end
  
    let currentCatchment =  catchment
  
    let catchmentDir = path.resolve(__dirname, CATCHMENTS_DIR, currentCatchment + '/');

   
    let mainChannel = getMainChannel(
      readFileSync(path.resolve(__dirname, catchmentDir, CHANDEG), rfsOpts)
    );
  

    // Basin water balance
    let basinWb = prepareWbCSV(
      readFileSync(path.resolve(__dirname, catchmentDir, BASIN_WATER_BALANCE), rfsOpts), startDate, endDate
    );

    let basinPw = preparePwCSV(
      readFileSync(path.resolve(__dirname, catchmentDir, BASIN_PLANT_WEATHER), rfsOpts), startDate, endDate
    );

    let basinArea = parseLUSoilSlope(readFileSync(path.resolve(__dirname, catchmentDir, LU_SOIL_TOPO_FILE), rfsOpts)).basinArea;

    let swatFlow = prepareChannelCSV(
      readFileSync(path.resolve(__dirname, catchmentDir, CHANNEL_SD), rfsOpts), startDate, endDate, basinArea, mainChannel
      );

    let basinMerged = []
    for (let j = 0; j < basinWb.length; j++) {
        let merged = ({...basinWb[j], ...basinPw[j], ...swatFlow[j]} )
        basinMerged.push(merged)
    };


    // Parse LU Codes
    let luCodes = parseRefList(readFileSync(path.resolve(__dirname, LU_CODES_FILE), rfsOpts));
    let luCodeCount = luCodes.length


    // Parse Soil Codes
    let soilCodes = parseRefList(readFileSync(path.resolve(__dirname, SOIL_CODES_FILE), rfsOpts));
    let soilCodeCount = soilCodes.length

    // // Parse lu, soil, topo and water data
    let lu = parseLUSoilSlope(readFileSync(path.resolve(__dirname, catchmentDir, LU_SOIL_TOPO_FILE), rfsOpts)).landuse


    let soil = parseLUSoilSlope(readFileSync(path.resolve(__dirname, catchmentDir, LU_SOIL_TOPO_FILE), rfsOpts)).soil;


    let slope = parseLUSoilSlope(readFileSync(path.resolve(__dirname, catchmentDir, LU_SOIL_TOPO_FILE), rfsOpts)).slope;
    let slopeBandCount = 3

    let water = parseLUSoilSlope(readFileSync(path.resolve(__dirname, catchmentDir,LU_SOIL_TOPO_FILE), rfsOpts)).water;

    let elevation = parseTopo(readFileSync(path.resolve(__dirname, catchmentDir, TOPO_FILE), rfsOpts));
    let elevationBandCount = elevation.length

  console.log(currentCatchment)
    // Flow Out





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



    
    //loops over data and removes the flowout in m3
    for (let j = 0; j < fullCatchmentData.length; j++) {
      delete fullCatchmentData[j].date
    };

  console.log(catchments.length + ' Catchments added to the dataset, checkout the "inputCatchments" directory!')
   
  return csvConverter(fullCatchmentData.flat(catchments.length))

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



function prepareWbCSV(data, startDate, endDate) {
  return trimWbJSON(cleanCSV(data), startDate, endDate);
}

function preparePwCSV(data, startDate, endDate) {
  return trimPwJSON(cleanCSV(data), startDate, endDate)
}

function prepareChannelCSV(data, startDate, endDate, basinArea, mainChannel) {
  return trimChannelJSON(parseChannelCSV(data, mainChannel), startDate, endDate, basinArea)
}


module.exports = (req, res) => {
    const catchment = req.query.catchment
    const start = req.query.start
    const end = req.query.end

    const startYr = start.substring(start.length - 4)
    const endYr = end.substring(end.length - 4)
    console.log(start.substring(start.length - 4))
  
   let dataset = prep(catchment, start, end);

  writeFileSync( path.resolve(__dirname, OUT_DATA, `${catchment}_${startYr}-${endYr}.csv`) , dataset)
}