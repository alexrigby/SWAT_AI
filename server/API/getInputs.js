//GETS NAMES OF FILES IN './assets/inputData'

const path = require("path");
const { readdirSync } = require("fs");
const { config } = require("./config");

module.exports = () => {
 
  return readdirSync(path.resolve(__dirname, config().input_catchments), {
    withFileTypes: true,
  })
    .map((dirent) => dirent.name);
};
