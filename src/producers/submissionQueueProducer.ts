import submissionQueue from "../queues/submissionQueue";
import { SubmissionPayload } from "../types/submissionPayload";

export default async function (payload : Record<string , SubmissionPayload>) {
    await submissionQueue.add('SubmissionJob' , payload) // producer is adding object in queue as => jobname (which is class name for this example 'SampleJob') and payload as data =>  {name : Apoorv, location : Nainital }
}