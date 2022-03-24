const http = require("http");
const express = require("express");
const cors = require("cors");
const { config } = require("./config");
const {
    getInputs,
    getModels,
    getTrainingDatasets,
    prepareTrainingDataset,
    prepareInputData,
} = require("./api");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));


app.get("/getinputs", (_, res) => {
    res.send(getInputs());
});

app.get("/getmodels", (_, res) => {
    res.send(getModels());
});

app.get("/gettrainingdatasets", (_, res) => {
    res.send(getTrainingDatasets());
});

app.get("/preparetrainingdataset", prepareTrainingDataset)

app.get("/prepareinputdata", prepareInputData)










const server = http.createServer(app);
// server.writeHead({"Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"})

server.listen(config().server_port);
console.log(`SWAT Server Listening on Port ${config().server_port}`);