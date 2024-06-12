import { DockerStreamOutput } from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

// this function will take out input and output stream from provided buffer and conver it into string
export default function decodeDockerStream(buffer : Buffer) : DockerStreamOutput { // BUFFER IS COLLECTION OF BYTES
    
    let offset = 0; // this variable keeps track of the current position you are reading data (like index in array)
    const output : DockerStreamOutput = {stderr: "", stdout: ""}

    while(offset<buffer.length){

        const typeOfStream = buffer[offset] // first index (0) pe channel idx hoga agr value 1 to koi value hai if value 2 to error aya hai

        const length = buffer.readUInt32BE(offset+4); // increase index by +4 (so that we can read metadata)

         // now we have read header , we can now move forward to the value of the chunk
         offset += DOCKER_STREAM_HEADER_SIZE  // getting actual value by (offset=offset+8)

        if(typeOfStream === 1){
            //stdout stream
            output.stdout += buffer.toString( 'utf-8' , offset , offset+length);
        }else if(typeOfStream === 2){
            //stderr stream
            output.stderr += buffer.toString( 'utf-8' , offset , offset+length);
        }
        offset+= length; // moving to next chunk
    }

    return output;
 
}