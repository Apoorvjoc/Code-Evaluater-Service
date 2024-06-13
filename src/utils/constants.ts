export const PYTHON_IMAGE = "python:3.8-slim";
export const JAVA_IMAGE = "openjdk:11-jdk-slim";
export const CPP_IMAGE = "gcc:latest";


export const SUBMISSION_QUEUE = 'SubmissionQueue'


// this represent size of header in docker stream by default it is of 8 bytes 
//(this header contains [type of stream] weather error[stderr] or outupt[stdout] stream)
// also it contains info about size of data   
export const DOCKER_STREAM_HEADER_SIZE = 8; 