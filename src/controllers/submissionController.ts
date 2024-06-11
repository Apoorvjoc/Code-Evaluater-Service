import { Request , Response } from "express"; 
import { CreateSubmissionDto } from "../dtos/createSubmissionDto";

function addSubmission(req : Request , res : Response){
    const submissionDto = req.body as CreateSubmissionDto

    //TODO : add validation

    res.status(201).json({
        success:true,
        error:{},
        message:'Successfully submitted submission',
        data: submissionDto
    })
}

export default addSubmission;