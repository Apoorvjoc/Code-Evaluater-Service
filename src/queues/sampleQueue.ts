import { Queue } from "bullmq";
import redisConnection from "../configs/redis.config";


export default new Queue('sampleQueue' , {connection : redisConnection});