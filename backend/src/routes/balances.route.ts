import { Router } from "express";
import {depositController ,getBalancesController,lockBalanceController,unlockBalanceController} from "../controller/balances.controller"

 const  balances = Router()

balances.post('/deposit' , depositController)
balances.get('/get' ,getBalancesController)
balances.post('/lock' ,lockBalanceController)
balances.post('/unlock' ,unlockBalanceController)


export default balances