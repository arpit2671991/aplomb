import {useState, useEffect} from 'react'
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {
  const [allcourses, setAllCourses] = useState([])

  useEffect(() => {
    const fetcAllcourses = async(res) => {
      try {
        const res = await fetch("/api/course/v1/all-courses")
      const data = await res.json()
      setAllCourses(data)
      } catch (error) {
        res.status(500).json(error)
      }
      
    }
    fetcAllcourses()
  }, [])
  console.log(allcourses)
  return (
    <div className="max-w-6xl mx-auto p-3 mb-5">
      
        <h1 className="text-3xl font-medium mb-7">All Courses</h1>
     
<div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
  {allcourses.map((course) => (
  <CourseCard key={course._id}  title={course.title} thumbnail={course.thumbnail} description={course.description} fees={course.fees} id={course._id} />
  ))}

  
</div>
    </div>
  );
};

export default CoursesPage;
