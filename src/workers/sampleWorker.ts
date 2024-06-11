import { Job, Worker } from "bullmq";    
import SampleJob from "../jobs/sampleJobs";
import redisConnection from "../configs/redis.config";

export default function SampleWorker(queueName : string){
    new Worker(queueName ,
        async (job : Job)=>{
            console.log("Worker kicking " , job);
    
            if(job.name==="SampleJob"){
                const sampleJobInstance = new SampleJob(job.data);
                sampleJobInstance.handle(job);
                return true
            }
        } , {
            connection : redisConnection
        }
     )
}