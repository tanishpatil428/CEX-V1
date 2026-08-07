import type{ Request,Response } from "express";
import { deposit ,getBalance , lockBalance ,unlockBalance} from "../engine/balances";

export const depositController = (req:Request ,res:Response) =>{
    const userid = Number(req.body.userId)
    const amount = Number(req.body.amount)

   const deposited = deposit(userid ,amount)

    return res.status(200).json(deposited)
}

 export const getBalancesController = (req:Request, res:Response) =>{
    const userid = Number(req.params.userId)

    const balance = getBalance(userid)

   return res.status(200).json(balance)
}

export const lockBalanceController = (req:Request, res:Response) =>{

    const userId =  Number( req.body.userId)
    const amount = Number(req.body.amount)

   const userBalance = lockBalance(userId,amount)

    return res.status(200).json({message :"balance locked" , userBalance})
}

export const unlockBalanceController = (req:Request, res:Response)=>{
    const userId = Number(req.body.userId)
    const amount = Number(req.body.amount)

    const unlock = unlockBalance(userId ,amount)

    return res.status(200).json(unlock)
}