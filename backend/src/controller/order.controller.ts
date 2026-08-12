import type { Request,Response } from "express";
import {prisma} from '../db/prisma'
import { lockBalance, lockStock } from "../engine/balances";




export const placeOrders =async (req:Request, res:Response)=>{
   
    const userId =req.userId
    const {symbol, qty, price ,side, type} =req.body

    const stockCheck = await prisma.stocks.findUnique({
        where:{
            symbol
        }
    })

    if(!stockCheck){
        return res.status(403).json({message:"no such stock found"})
    }

    if(side === "BUY"){
        const totalCost = qty*price
       const balance = lockBalance(userId ,totalCost)
    }else{
        lockStock(userId,symbol,qty)
    }

    const order = await prisma.orders.create({
        data:{
            userId :userId,
            stockId:stockCheck.id,
            qty,
            price,
            side,
            type,
            fillQty:0,
            status: "PENDING"
        }
    })
     
    return res.status(202).json({message:"order placed" ,order})

}