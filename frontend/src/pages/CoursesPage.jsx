import React from "react";
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-3 mb-5 overflow-x-hidden">
      
        <h1 className="text-3xl font-medium mb-7">All Courses</h1>
     
<div className=" flex  flex-col justify-center max-w-lg  mx-auto gap-4">
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
  <CourseCard />
</div>
    </div>
  );
};

export default CoursesPage;
