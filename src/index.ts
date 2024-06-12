import express from "express";
import bodyParser from "body-parser";

import serverConfig from "./configs/server.config";
import appRouter from "./routes";
import serverAdapter from "./configs/bullBoard.config"; 
import SampleWorker from "./workers/sampleWorker";
import runJava from "./containers/runJavaDocker";

const app = express();
 
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use("/api" , appRouter);
app.use("/ui" , serverAdapter.getRouter())

app.listen(serverConfig.PORT , ()=>{
    console.log("Server started at...." , serverConfig.PORT);
    console.log("bull board is running at :" , `http://localhost:${serverConfig.PORT}/ui`);

    SampleWorker('sampleQueue'); // creating worker (or consumer) which will listen to async call through queue

//     const code = `x = input()
// y = input()
// print("Value of x is : " , x)
// print("Value of y is : " , y)
// `;

// const inputString = `10
// 20`

// const pythonCode = 
// `x = input();
// print("Value of x is : " , x)
// for i in range(int(x)):
//     print(i)
// `

const inputString = `10`

    // runPython(pythonCode , inputString);

const javaCode = `
import java.util.*;
class Main{

    public static void main(String a[]){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        System.out.println("value entered by user is : " + num);
        for(int i = 0 ; i<num ; i++){
            System.out.println(i);
        }
    }

}
`

    runJava(javaCode , inputString)

    // sampleQueueProducer("SampleJob" , {   // creating producer which will keep object in queue here object as { jobName ,  {name : Apoorv, location : Nainital } }
    //     name : "Apoorv" ,
    //     location : "Nainital"
    // });
});
