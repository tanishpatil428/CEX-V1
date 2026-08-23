import { placeOrders,getBook } from "../controller/order.controller";
import { placeOrderMiddleware } from "../middleware/order.validate.middleware";
import { Router } from "express";

const order = Router()

order.post('/place' ,placeOrderMiddleware,placeOrders)
order.get('/book',getBook)



export default (order)