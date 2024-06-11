import {z} from 'zod'

// export interface CreateSubmissionDto {
//     userId : string ,
//     problemId : string,
//     code: string,
//     language: string
// }

//the following type 'CreateSubmissionDto' is similar to 'interface CreateSubmissionDto anoter way to create interface in 'ZOD'
export type CreateSubmissionDto = z.infer<typeof createSubmissionZodSchema>

export const createSubmissionZodSchema = z.object({
    userId : z.string(),
    problemId : z.string(),
    code : z.string(),
    language : z.string()
});