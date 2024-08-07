import express from "express";
import bodyParser from "body-parser";

import serverConfig from "./configs/server.config";
import appRouter from "./routes";
import serverAdapter from "./configs/bullBoard.config"; 
import SampleWorker from "./workers/sampleWorker";
import SubmissionWorker from "./workers/submissionWorker";
import submissionQueueProducer from "./producers/submissionQueueProducer";

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
    SubmissionWorker('SubmissionQueue')

    const code = `x = input()
y = input()
print("Value of x is : " , x)
print("Value of y is : " , y)
`;

const inputString = `10
20`

// const pythonCode = 
// `x = input();
// print("Value of x is : " , x)
// for i in range(int(x)):
//     print(i)
// `

// const inputString = `10`

    // runPython(pythonCode , inputString);

// const javaCode = `
// import java.util.*;
// class Main{

//     public static void main(String a[]){
//         Scanner sc = new Scanner(System.in);
//         int num = sc.nextInt();
//         System.out.println("value entered by user is : " + num);
//         for(int i = 0 ; i<num ; i++){
//             System.out.println(i);
//         }
//     }

// }
// `

    // runJava(javaCode , inputString)

    // const cppCode = `
    // #include<iostream>
    // using namespace std;

    // int main(){
    //     int x;
    //     cin>>x;
    //     cout<<"Value of x is "<<x<<endl;

    //     for(int i = 0 ; i<x ;i++){
    //         cout<<i<<endl; //this endl is imp for triggering fflush which is used by cpp to run code this can be at last 
    //     }
    //     cout<<endl; //this can be at last endl for trigger fflush
    //     return 0;
    // }
    // `

    submissionQueueProducer({
        "some_submision_id":{
            code:code,
            language:"Python",
            inputCase:inputString
        }
    })


    // sampleQueueProducer("SampleJob" , {   // creating producer which will keep object in queue here object as { jobName ,  {name : Apoorv, location : Nainital } }
    //     name : "Apoorv" ,
    //     location : "Nainital"
    // });
});
