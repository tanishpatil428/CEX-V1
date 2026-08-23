import { Router } from "express";
import {depositController ,getBalancesController,lockBalanceController,unlockBalanceController, depositStockController} from "../controller/balances.controller"

 const  balances = Router()

balances.post('/deposit' , depositController)
balances.get('/get' ,getBalancesController)

//this routes are for testing psurpose 
balances.post('/lock' ,lockBalanceController)
balances.post('/unlock' ,unlockBalanceController)
balances.post('/stock' ,depositStockController )


export default balances