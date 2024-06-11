import sampleQueue from "../queues/sampleQueue";

export default async function (name : string , payload : Record<string , unknown>) {
    await sampleQueue.add(name , payload) // name is class name for this example 'SampleJob'
}