import express from 'express'
import { createCourse, getAllCourses, getCourse } from '../controllers/course.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create-course', verifyToken, createCourse)
router.get('/all-courses', getAllCourses)
router.get('/course/:id', getCourse)



export default router