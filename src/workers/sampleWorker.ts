import { Job, Worker } from "bullmq";    
import SampleJob from "../jobs/sampleJobs";
import redisConnection from "../configs/redis.config";

export default function SampleWorker(queueName : string){

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
    
            if(job.name==="SampleJob"){
                const sampleJobInstance = new SampleJob(job.data); // creating obj for job instance
                sampleJobInstance.handle(job); 
                return true
            }
        } , {
            connection : redisConnection
        }
     )
}