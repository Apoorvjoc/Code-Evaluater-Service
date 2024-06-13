import { Job, Worker } from "bullmq";    
import redisConnection from "../configs/redis.config";
import SubmissionJob from "../jobs/submissionJobs";

export default function SubmissionWorker(queueName : string){

    /**
     * this is worker (aka consumer) which will consume data from queue where data was added by producer (here  name of producer is sampleQueueProducer)
     * 
     * queueName : queue name (which queue to be used)
     * callback : business logic (consuming the data from queue)
     * connection object
     */

    new Worker(queueName ,
        async (job : Job)=>{
            console.log("Worker kicking " , job);
    
            if(job.name==="SubmissionJob"){
                const submissionJobInstance = new SubmissionJob(job.data); // creating obj for job instance
                submissionJobInstance.handle(job); 
                return true
            }
        } , {
            connection : redisConnection
        }
     )
}