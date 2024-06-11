import express from "express";
import serverConfig from "./configs/server.config";
import appRouter from "./routes";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import SampleWorker from "./workers/sampleWorker";
import serverAdapter from "./configs/bullBoard.config"; 

const app = express();

app.use("/api" , appRouter);
app.use("/ui" , serverAdapter.getRouter())

app.listen(serverConfig.PORT , ()=>{
    console.log("Server started at...." , serverConfig.PORT);
    console.log("bull board is running at :" , `http://localhost:${serverConfig.PORT}/ui`);

    SampleWorker('sampleQueue'); // creating worker (or consumer) which will listen to async call through queue

    sampleQueueProducer("SampleJob" , {   // creating producer which will keep object in queue here object as { jobName ,  {name : Apoorv, location : Nainital } }
        name : "Apoorv" ,
        location : "Nainital"
    });
});
