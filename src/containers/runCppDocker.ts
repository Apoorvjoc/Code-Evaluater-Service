import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";


async function runCpp(code:string , inputTestCase : string) {

    console.log("Initializing new Cpp container "+inputTestCase," code ",code);

    const runCmd = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | stdbuf -oL -eL ./main`;
    
    const cppDockerContainer = await createContainer(CPP_IMAGE , 
        ['/bin/sh','-c' , runCmd]
    );

    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE , ['python3','-c' , code , 'stty -echo']);  // -c flag runs python code in string format [ex : python3 -c "print('Hello')"]
    // stty -echo it temporaily disable the echoing of character you type in screen 
    // ex : x = input("Enter value of x : ")
    // print("value of x is : " + x)

    // terminal will show Enter value of x : 8 --> here you enter 8
    // value of x is : 8 --> output 
    // so these 2 lines will be disabled with stty echo flag

    await cppDockerContainer.start(); // starting / booting repective docker container

    console.log("Started Docker container :)");


    const logStream = await cppDockerContainer.logs({
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

    await new Promise((res , _)=>{
        logStream.on('end' , ()=>{
            console.log("Ended " , rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);  // jitte bhi buffer honge unko concat karega
            const decodeStream = decodeDockerStream(completeBuffer);
            console.log("Stream ", decodeStream);
            console.log("decoded str " , decodeStream.stdout);
            res(decodeDockerStream)
        })
    })

    await cppDockerContainer.remove(); // it removes docker container once work completed
}

export default runCpp;