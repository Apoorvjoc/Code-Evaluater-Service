import { Request , Response , NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema : ZodSchema<any>) => //making this as common validator service by passing args as : (schema : ZodSchema<any>) istead of (schema : ZodSchema<CreateSubmissionDto>)
    (req : Request , res : Response , next :NextFunction) => {
        try {
            schema.parse({
                ...req.body
            })
            
            next()

        } catch (error) {
            console.log("Error " , error);
            return res.status(400).json({
                success: false,
                message:'Invalid request params recieved',
                data:{},
                error:error
            })
        }
}