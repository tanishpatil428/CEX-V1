import type{ Request,Response,NextFunction } from "express";
import { ZodType } from "zod";
import { signupSchema, signinSchema} from "../valditation/auth.validation";

export const valditation = (schema : ZodType)=>{
    return (req:Request, res:Response, next: NextFunction)=>{
        const result = schema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({
                message:"Invalid data",
                error: result.error.issues
            })
        }
        next()
    }
}

