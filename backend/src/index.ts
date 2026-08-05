import express from 'express'
import route from './routes/auth.route'
import "dotenv/config"


const app = express()

app.use(express.json())
app.use('/auth',route)

const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`your server is running on PORT ${PORT}`);
})