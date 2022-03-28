const path = require("path");
const { readdirSync } = require("fs");
const { config } = require("./config");

module.exports = () => {
 
  return readdirSync(path.resolve(__dirname, config().swat_trainig_catchments), {
    withFileTypes: true,
  })
    .map((dirent) => dirent.name);
};


// const catchments = readdirSync(path.resolve(__dirname, CATCHMENTS_DIR));