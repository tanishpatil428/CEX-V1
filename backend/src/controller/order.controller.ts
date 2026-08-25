import type { Request,Response } from "express";
import {prisma} from '../db/prisma'
import { lockBalance, lockStock } from "../engine/balances";
import { addOrderBook,GetorderBook } from "../engine/orderbook";


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
        lockBalance(userId,qty,price)
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

    const orderBook ={
        userId,
        orderId:order.id,
        price,
        qty,
        createdAt:Date.now()
    }
    
    addOrderBook(symbol,side,orderBook)

    return res.status(202).json({message:"order placed" ,order})

}

 export const getBook = async(req:Request, res:Response)=>{
    const symbol = req.params.symbol

    if(!symbol ||typeof symbol !=="string"){
        return res.status(403).json({message:"plz enter symbol"})
    }

    const stockCheck = await prisma.stocks.findUnique({where:{symbol}})
        if(!stockCheck){
            return res.status(403).json({message:"no stock found"})
        }

   const book = GetorderBook(symbol)

   return res.status(200).json(book)
 }