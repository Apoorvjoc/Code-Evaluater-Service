import express from "express";
import serverConfig from "./configs/server.config";
import appRouter from "./routes";

const app = express();

app.use("/api" , appRouter);

app.listen(serverConfig.PORT , ()=>{
    console.log("Server started at...." , serverConfig.PORT);
});
