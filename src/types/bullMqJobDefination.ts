import { Job } from "bullmq";

export interface IJob{
    name : string,
    payload?: Record<string , unknown>,
    handle : (job?: Job) => void    //it is processor function what to do when job coming without error 
    failed : (job?: Job) => void    //it is processor function what to do when job coming with error 
}