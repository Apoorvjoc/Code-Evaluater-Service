import express from "express";
import serverConfig from "./configs/server.config";
import appRouter from "./routes";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import SampleWorker from "./workers/sampleWorker";

const app = express();

app.use("/api" , appRouter);

app.listen(serverConfig.PORT , ()=>{
    console.log("Server started at...." , serverConfig.PORT);

    SampleWorker('sampleQueue');

    sampleQueueProducer("SampleJob" , {
        name : "Apoorv" ,
        location : "Blr"
    });
});
