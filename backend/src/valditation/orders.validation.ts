import {z} from 'zod'

export const orderValidation =z.object({
    symbol :z.string().min(1 ,"symbol is requried"),
    price :z.number().positive("price must be positive"),
    qty : z.number().positive("Quantity must be positive"),
    side :z.enum(["BUY" ,"SELL"]),
    type :z.enum(["LIMIT", "MARKET"])
})