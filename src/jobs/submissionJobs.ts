import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/ExecutorFactory";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";


export default class SubmissionJob implements IJob{

     name:string = ''  // this is name of job (i.e class name here)
     payload: Record<string, SubmissionPayload>;

    // name of the class can be hard-coded or can be derived from this.constructor.name
    constructor(payload: Record<string, SubmissionPayload>){ 
        this.name = this.constructor.name
        this.payload = payload
    }

    handle = async (job?: Job<any, any, string>)=>{
        console.log("Handler called with payload " , this.payload);
        if (job) {
            const key = Object.keys(this.payload)[0]
            const codeLanguage = this.payload[key].language
            const code = this.payload[key].code;
            const inputCase = this.payload[key].inputCase;

            const stratgey = createExecutor(codeLanguage)

            if(stratgey!==null){
               const response :ExecutionResponse = await stratgey.execute(code , inputCase);
               if(response.status==="COMPLETED"){
                console.log("Code executed successfully");
                console.log(response.output);
               }else{
                console.log("Something went wrong!!");
                console.log(response.output);
               }
            }else{
                throw new Error("Invalid language selected");
                
            }
        }
    };

    failed = (job?: Job<any, any, string>) => {
        console.log("Job failed ");
        if(job){
            console.log("Job failed " , job.id);
        }
    }
}