import type{ Request,Response } from "express";
import { deposit ,getBalance , lockBalance ,unlockBalance,depositStock} from "../engine/balances";


export const depositController = (req:Request ,res:Response) =>{
    const userid = req.userId
    const amount = Number(req.body.amount)

   const deposited = deposit(userid ,amount)

    return res.status(200).json(deposited)
} 

 export const getBalancesController = (req:Request, res:Response) =>{
    const userid = req.userId

    const balance = getBalance(userid)

   return res.status(200).json(balance)
}



//this routes are for testing purpose not for real use

export const lockBalanceController = (req:Request, res:Response) =>{

    const userId =  req.userId
    const {qty,price} = req.body

   const userBalance = lockBalance(userId,qty,price)

    return res.status(200).json({ userBalance})
}

export const unlockBalanceController = (req:Request, res:Response)=>{
    const userId = req.userId
    const amount = Number(req.body.amount)

    const unlock = unlockBalance(userId ,amount)

    return res.status(200).json(unlock)
}


export const depositStockController = (req:Request, res:Response)=>{
    const userId = req.userId
   const {symbol,qty}=  req.body
    
    const addstock = depositStock(symbol,Number(qty),userId)

    return res.json(addstock)

}