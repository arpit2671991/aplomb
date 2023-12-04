import Course from "../models/course.model.js"

export const createCourse = async(req, res, next) => {
    try {
        const course = await Course.create(req.body)
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json(error)
    }
}