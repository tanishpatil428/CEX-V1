import { Router } from "express";
import {depositController ,getBalancesController,lockBalanceController,unlockBalanceController, depositStockController} from "../controller/balances.controller"
import { balanceSchema } from "../valditation/balances.validation";
import { valditation } from "../middleware/validate.middleware";

 const  balances = Router()

balances.post('/deposit',valditation(balanceSchema) , depositController)
balances.get('/get' ,getBalancesController)

//this routes are for testing psurpose 
balances.post('/lock' ,lockBalanceController)
balances.post('/unlock' ,unlockBalanceController)
balances.post('/stock' ,depositStockController )


export default balances