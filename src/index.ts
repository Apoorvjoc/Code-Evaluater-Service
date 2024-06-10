import express from "express";
import serverConfig from "./configs/server.config";


console.log("Hello");

const app = express();

app.listen(serverConfig.PORT , ()=>{
    console.log("Server started at...." , serverConfig.PORT);
})
