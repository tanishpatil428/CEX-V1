import { placeOrders } from "../controller/order.controller";
import { placeOrderMiddleware } from "../middleware/order.validate.middleware";
import { Router } from "express";

const order = Router()

order.post('/place' ,placeOrderMiddleware,placeOrders)

export default (order)