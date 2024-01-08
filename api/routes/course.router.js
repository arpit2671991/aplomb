import express from 'express'
import { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create-course', verifyToken, createCourse)
router.post('/update-course/:id', verifyToken, updateCourse)
router.get('/all-courses', getAllCourses)
router.get('/course/:id', getCourse)
router.delete('/delete/:id', verifyToken, deleteCourse )



export default router