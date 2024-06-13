import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";
import runCpp from "../containers/runCppDocker";


export default class SubmissionJob implements IJob{

     name:string = ''  // this is name of job (i.e class name here)
     payload?: Record<string, SubmissionPayload>;

    // name of the class can be hard-coded or can be derived from this.constructor.name
    constructor(payload: Record<string, SubmissionPayload>){ 
        this.name = this.constructor.name
        this.payload = payload
    }

    handle = async (job?: Job<any, any, string>)=>{
        console.log("Handler called with payload " , this.payload);
        if (job) {
            const key = Object.keys(this.payload)[0]
            console.log(this.payload[key].language)
            if(this.payload[key].language === 'CPP'){
                let evaluatedRes = await runCpp(this.payload[key].code , this.payload[key].inputCase)
                console.log("Evaluated Response is " , evaluatedRes);
                //TODO: Follow stratgey pattern
            }
        }
    }

    failed = (job?: Job<any, any, string>) => {
        console.log("Job failed ");
        if(job){
            console.log("Job failed " , job.id);
        }
    }
}

