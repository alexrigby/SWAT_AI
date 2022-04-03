//SAVE MODEL TO './assets/models'
//dosent work yet

const fs = require("fs");
const { config } = require("./config");
const path = require("path");


// API METHOD: SavePlant
// Save plant file to disk
module.exports = (files) => {

    // let model = req.body.model;

        fs.writeFileSync(
          path.resolve(
            __dirname,
            `${config().saved_models}/${files}`
          ),
        );

  }