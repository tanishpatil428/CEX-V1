import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const authmiddleware = (req:Request, res:Response, next:NextFunction)=>{
   try
     {
        const autheader = req.headers.authorization
        if(!autheader || !autheader.startsWith("Bearer")){
            return res.status(401).json({message:"No token provided"})
        }

        const token = autheader.split(" ")[1] 

        if(!token){
            return res.status(401).json({message:"plz login"})
        }

        const decode = jwt.verify(token ,JWT_SECRET !) as unknown as {userId : number}
        const id = decode.userId
       
        
        req.userId = id
        next()
     }catch(err){
        return res.status(401).json({message :"Invalid or expired token"})
     }
}