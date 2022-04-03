//GETS NAMES OF FILES IN './assets/trainingDatasets'

const path = require("path");
const { readdirSync } = require("fs");
const { config } = require("./config");

module.exports = () => {
 
  return readdirSync(path.resolve(__dirname, config().training_datasets), {
    withFileTypes: true,
  })
    .map((dirent) => dirent.name);
};
