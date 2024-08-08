const express = require('express');
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')

// const connectDB = require('./Config/db')

// connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))
// const productRouters = require('./Routes/product')
// const authRouters = require('./Routes/auth')

const { readdirSync } = require('fs')

//Route 1
// app.get('/product',(req,res)=>{
//     res.send('Hello Endpoint')
// })

//Route 2
// app.use('/api',productRouters);
// app.use('/api',authRouters);

//Route 3
readdirSync('./Routes').map((r)=>app.use('/api',require('./Routes/'+r)))



app.listen(5000,()=>{
    console.log('server is running on port 5000');
})