import express from "express";
import serverConfig from "./configs/server.config";
import appRouter from "./routes";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import SampleWorker from "./workers/sampleWorker";

const app = express();

app.use("/api" , appRouter);

app.listen(serverConfig.PORT , ()=>{
    console.log("Server started at...." , serverConfig.PORT);

    SampleWorker('sampleQueue'); // creating worker (or consumer) which will listen to async call through queue

    sampleQueueProducer("SampleJob" , {   // creating producer which will keep object in queue here object as { jobName ,  {name : Apoorv, location : Nainital } }
        name : "Apoorv" ,
        location : "Nainital"
    });
});
