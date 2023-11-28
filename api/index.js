import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.router.js'
dotenv.config()

// variables

const app = express()
const port = process.env.port || 5000

// mongoose connect db

mongoose.connect(process.env.URI).then(() => console.log('database connected successfully')).catch((error) => console.log(error))

// middlewares
app.use(express.json())
app.use('/api/auth/v1', authRoutes)














app.listen(port, () => console.log(`server is running on ${port}`))