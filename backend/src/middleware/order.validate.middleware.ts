import type { Request, Response, NextFunction } from "express";
import { orderValidation } from "../valditation/orders.validation";

export const placeOrderMiddleware = (req:Request, res:Response ,next:NextFunction)=>{
    const check = orderValidation.safeParse(req.body)
    if(!check.success){
        return res.status(401).json({
            error : check.error.issues
        })
    }

    next()
}