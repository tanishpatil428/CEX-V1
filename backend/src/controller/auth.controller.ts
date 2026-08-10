import type{ Request,Response } from "express";
import{prisma} from "../db/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

const JWT_SECRET =process.env.JWT_SECRET as string

export const signup = async (req:Request, res:Response)=>{
    const{ username ,password} = req.body

    const userCheck = await prisma.users.findUnique({
        where:{
            username
        }
    })

    if(userCheck){
        return res.status(409).json({message: "user with this username already exists"})
    }

    const haspass = await bcrypt.hash(password,10)

    const newUser = await prisma.users.create({
        data:{
            username,
            password:haspass
        }
    })

    const token = jwt.sign({userId:newUser.id},JWT_SECRET)

    return res.status(201).json(token)
}

export const signin = async (req:Request, res:Response)=>{
    const{ username ,password} = req.body

    const userCheck = await prisma.users.findUnique({
        where:{
            username
        }
    })

    if(!userCheck){
        return res.status(401).json({message: "incorrect credentials"})
    }

    const pass = await bcrypt.compare(password,userCheck.password)

    if(!pass){
        return res.status(401).json({message: "incorrect credentials"})
    }

    
    

    const token = jwt.sign({userId:userCheck.id},JWT_SECRET)

    return res.status(201).json(token)
}
