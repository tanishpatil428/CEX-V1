import { placeOrders,getBook } from "../controller/order.controller";
import { valditation } from "../middleware/validate.middleware";
import { Router } from "express";
import { placeOrderSchema } from "../valditation/orders.validation";

const order = Router()

order.post('/place' ,valditation(placeOrderSchema),placeOrders)
order.get('/book/:symbol',getBook)



export default (order)