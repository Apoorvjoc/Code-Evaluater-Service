import createContainer from "./containerFactory";
import { JAVA_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";
import pullDockerImage from "./pullDockerImage";
import CodeExecutorStrategy, { ExecutionResponse } from "../types/CodeExecutorStrategy";


class JavaExecutor implements CodeExecutorStrategy{
    async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
    
            console.log("Initializing new Java container "+inputTestCase," code ",code);
        
            const runCmd = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
            
            await pullDockerImage(JAVA_IMAGE);
        
            const javaDockerContainer = await createContainer(JAVA_IMAGE , 
                ['/bin/sh','-c' , runCmd]
            );
        
            // const pythonDockerContainer = await createContainer(PYTHON_IMAGE , ['python3','-c' , code , 'stty -echo']);  // -c flag runs python code in string format [ex : python3 -c "print('Hello')"]
            // stty -echo it temporaily disable the echoing of character you type in screen 
            // ex : x = input("Enter value of x : ")
            // print("value of x is : " + x)
        
            // terminal will show Enter value of x : 8 --> here you enter 8
            // value of x is : 8 --> output 
            // so these 2 lines will be disabled with stty echo flag
        
            await javaDockerContainer.start(); // starting / booting repective docker container
        
            console.log("Started Docker container :)");
        
        
            const logStream = await javaDockerContainer.logs({
                stdout:true, // as it is a read stream 
                stderr:true,
                timestamps: false,
                follow:true // weather logs are streamed(true) or return as string(false)
            })
        
            const rawLogBuffer: Buffer[] = []
        
            //attach events on the steam object to start and stop reading
            logStream.on('data' , (chunk)=>{ // koi bhi data log hoga docker container me it will be going to recieved in a form of chunk
                rawLogBuffer.push(chunk)
            })


            try {
                const response : string = await this.fetchDockerResponse(logStream , rawLogBuffer)
                return {output:response , status: "COMPLETED"}
            } catch (error) {
                return {output:error as string , status: "COMPLETED"}
            }finally{
                await javaDockerContainer.remove(); // it removes docker container once work completed
            }
           
    }

    async fetchDockerResponse(logStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]): Promise<string> {
        return await new Promise((res , rej)=>{
            logStream.on('end' , ()=>{
                console.log("Ended " , rawLogBuffer);
                const completeBuffer = Buffer.concat(rawLogBuffer);  // jitte bhi buffer honge unko concat karega
                const decodeStream = decodeDockerStream(completeBuffer);
                console.log("Stream ", decodeStream);
                console.log("decoded str " , decodeStream.stdout);
                if(decodeStream.stdout){
                    res(decodeStream.stdout)
                }else{
                    rej(decodeStream.stderr)
                }
            })
        })
    }  
    
}

export default JavaExecutor