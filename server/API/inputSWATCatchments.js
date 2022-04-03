//GETS NAMES OF FILES IN './assets/SWATInputCatchments'

const path = require("path");
const { readdirSync } = require("fs");
const { config } = require("./config");

module.exports = () => {
  return readdirSync(path.resolve(__dirname, config().swat_input_catchments), {
    withFileTypes: true,
  })
    .map((dirent) => dirent.name);
};