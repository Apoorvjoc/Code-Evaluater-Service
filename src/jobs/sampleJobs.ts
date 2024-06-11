import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";


export default class SampleJob implements IJob{

     name:string = ''  // this is name of job (i.e class name here)
     payload?: Record<string, unknown> | undefined;

    // name of the class can be hard-coded or can be derived from this.constructor.name
    constructor(payload: Record<string, unknown> | undefined){ 
        this.name = this.constructor.name
        this.payload = payload
    }

    handle = ()=>{
        console.log("Handler called");
    }

    failed = (job?: Job<any, any, string> | undefined) => {
        console.log("Job failed ");
        if(job){
            console.log("Job failed " , job.id);
        }
    }
}

