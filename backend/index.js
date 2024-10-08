import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tour.js'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import bookingRoute from './routes/book.js'


dotenv.config()
const app = express()
const port = process.env.PORT || 8000


const connect = async()=>
{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('MongoDb connection successful')
    } catch (err) {
        console.log('MongoDb connection failed')
    }
}

// middleware
app.use(express.json())
app.use(cors( { origin: 'http://localhost:3000',credentials: true,}))
app.use(cookieParser())
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/book', bookingRoute)

app.listen(port, ()=>
{
    connect()
    console.log('server is listening on port ',port)
})