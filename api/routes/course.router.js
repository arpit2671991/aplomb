import express from 'express'
import { createCourse, getAllCourses } from '../controllers/course.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create-course', verifyToken, createCourse)

router.get('/all-courses', getAllCourses)



export default router