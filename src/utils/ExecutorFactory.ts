import CodeExecutorStrategy from "../types/CodeExecutorStrategy";
import PythonExecutor from "../containers/PythonExecutor";
import CppExecutor from "../containers/CppExecutor";
import JavaExecutor from "../containers/JavaExecutor";

export default function createExecutor(codeLanguage:string) : CodeExecutorStrategy | null {
    if(codeLanguage === 'CPP'){
        return new CppExecutor()
    }else if(codeLanguage === "JAVA"){
        return new JavaExecutor()
    }else if(codeLanguage === "Python"){
        return new PythonExecutor()
    }else{
        return null
    }
}