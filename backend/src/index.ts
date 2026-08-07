import express from 'express'
import route from './routes/auth.route'
import balances  from './routes/balances.route'

import "dotenv/config"


const app = express()

app.use(express.json())
app.use('/auth',route)
app.use('/balances' , balances)


const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`your server is running on PORT ${PORT}`);
})