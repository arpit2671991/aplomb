import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.router.js'
import userRoutes from './routes/user.router.js'
import courseRoutes from './routes/course.router.js'
import galleryRoutes from './routes/gallery.router.js'
import contactRoutes from './routes/contactRoutes.js'


dotenv.config()
import cookieParser from "cookie-parser";

// variables

mongoose.connect(process.env.URI).then(() => console.log('database connected successfully')).catch((error) => console.log(error))

const app = express()
const port = process.env.port || 5000

// mongoose connect db



// middlewares
app.use(express.json())
app.use(cookieParser());

app.use('/api/auth/v1', authRoutes)
app.use('/api/user/v1', userRoutes)
app.use('/api/course/v1', courseRoutes)
app.use('/api/gallery/v1', galleryRoutes)
app.use('/api/contact/v1', contactRoutes)















app.listen(port, () => console.log(`server is running on ${port}`))