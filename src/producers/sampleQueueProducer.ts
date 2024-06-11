import sampleQueue from "../queues/sampleQueue";

export default async function (name : string , payload : Record<string , unknown>) {
    await sampleQueue.add(name , payload) // producer is adding object in queue as => jobname (which is class name for this example 'SampleJob') and payload as data =>  {name : Apoorv, location : Nainital }
}