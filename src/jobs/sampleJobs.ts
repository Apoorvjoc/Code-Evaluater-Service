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

    handle = (job?: Job<any, any, string> | undefined)=>{
        console.log("Handler called with payload " , this.payload);
        if (job) {
            console.log("Handler called" , job.name , " " , job.id , " " , job.data);
        }
    }

    failed = (job?: Job<any, any, string> | undefined) => {
        console.log("Job failed ");
        if(job){
            console.log("Job failed " , job.id);
        }
    }
}

