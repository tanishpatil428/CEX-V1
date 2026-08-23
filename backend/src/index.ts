import express from 'express'
import route from './routes/auth.route'
import balances  from './routes/balances.route'
import { authmiddleware } from './middleware/auth.middleware'
import order from "./routes/order.route"
import type{ Request,Response,NextFunction } from 'express'

import "dotenv/config"


const app = express()

app.use(express.json())
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    next(err);
  });



app.use('/auth',route)
app.use('/balances' ,authmiddleware, balances)
app.use('/order' ,authmiddleware ,order)



const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`your server is running on PORT ${PORT}`);
})