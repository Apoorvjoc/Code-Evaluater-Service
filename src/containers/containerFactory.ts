import Docker from 'dockerode';

/**
 * 
 * @param imageName docker image name 
 * @param cmdExecutable command to be executed in docker container 
 */

async function createContainer(imageName:string , cmdExecutable:string[]) {
    const docker = new Docker()

    const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true, // enable input streams
        AttachStdout: true, // enable output stream
        AttachStderr: true, // enable err streams
        Tty: false,
        OpenStdin: true
    });

    return container;
}

export default createContainer;

