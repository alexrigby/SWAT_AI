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
    saveModel,
    inputSWATCatchment,
    trainingSWATCatchments
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

app.get("/inputswatcatchments", (_,res) => {
    res.send(inputSWATCatchment())
});

app.get("/trainingswatcatchments", (_, res) => {
    res.send(trainingSWATCatchments())
});

app.get("/preparetrainingdataset", (req, res) => {
    prepareTrainingDataset(),
    res.send({ code: 1, message: "dataset ready" });
})

app.get("/prepareinputdata", (req, res) => {
    prepareInputData(req, res)
    res.send({code: 1, message: "input catchmnet ready"})
})

app.post("/savemodel", saveModel)










const server = http.createServer(app);
// server.writeHead({"Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"})

server.listen(config().server_port);
console.log(`SWAT Server Listening on Port ${config().server_port}`);