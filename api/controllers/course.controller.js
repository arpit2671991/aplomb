import Course from "../models/course.model.js";

export const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    return res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const allcourses = await Course.find();
    return res.status(200).json(allcourses);
  } catch (error) {
    next(error);
  }
};


export const getCourse = async(req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if(!course){
      return res.status(404).json('No Course Available')
    }
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json(error)
  }
}