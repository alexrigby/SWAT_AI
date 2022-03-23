const path = require("path");
const { readdirSync } = require("fs");
const { config } = require("./config");

module.exports = () => {

    const files = readdirSync(path.resolve(__dirname, config().ml_models),
        { withFileTypes: true },
    )
        .map((dirent) => dirent.name);

        // returns only JSON files (model used by tensorflow than links to the .bin file)
    const JSONFiles = [];
    files.forEach(file => {
        if (path.extname(file) == ".json") {
            JSONFiles.push(file)
        }
    })

    return JSONFiles

};