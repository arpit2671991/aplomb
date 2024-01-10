import Gallery from "../models/gallary.model.js";

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

export const updateCourse = async(req, res, next) => {
  const course = await Course.findById(req.params.id);
  if(!course){
    return res.status(404).json('No course found!')
  }
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedCourse)
  } catch (error) {
    res.status(500).json(error)
  }
} 


// {
//   const course = await Course.findById(req.params.id)
//     if(!course){
//       return res.status(404).json('There is no course available!')
//     }
//   try {
//     await Course.findByIdAndDelete(req.params.id)
//     res.status(200).json('Course Deleted!')
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }


export const deleteCourse = async(req, res, next) => {
    const course = await Course.findById(req.params.id)
    if(!course) return res.status(404).json('There is no course available!')
    try {
      await Course.findByIdAndDelete(req.params.id)
      res.status(200).json('Course has been deleted!')
    } catch (error) {
      res.status(500).json(error)
    }
}