import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { FaRegCircleCheck } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideCourse from "../components/SlideCourse";

const HomePage = () => {

  const [courses, setCourses] = useState([])



  useEffect(() => 
  {
      const fetchFeaturedCourses = async() => {
      try {
          const res = await fetch('/api/course/v1/all-courses')
          const data = await res.json()
          setCourses(data)
      } catch (error) {
          console.log(error)
      }
  };
  fetchFeaturedCourses()
}, [])

console.log(courses)
  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="max-w-full mx-auto">
      <div className="max-h-56 mb-5">Banner</div>

      <h1 className="mb-5 font-semibold text-3xl text-center">
        Start your English Learning Journey TODAY.
      </h1>
      <div className="bg-slate-100 mb-5">
        {" "}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-5">
          <div className="p-6 flex flex-col justify-center text-start font-semibold text-gray-600 text-lg">
            <h3 className="text-gray-500 uppercase text-2xl">
              Take your english to the next level
            </h3>
            <p className="text-sm text-slate-500 lowercase mb-5">with Aplomb</p>
            <ul className="flex flex-col justify-center gap-2 font-thin ite">
              <span className="flex items-center gap-3">
                <FaRegCircleCheck />
                <li>All levels: from Elementary to Proficiency</li>
              </span>
              <span className="flex gap-3 items-center">
                <FaRegCircleCheck />{" "}
                <li>General English, Grammar, Exam Preparation, Business</li>
              </span>
              <span className="flex gap-3 items-center">
                <FaRegCircleCheck />{" "}
                <li>Learning materials, tests & practice activities</li>
              </span>
              <span className="flex gap-3 items-center">
                <FaRegCircleCheck />{" "}
                <li>
                  Boost your confidence with Live & Interactive practice at your
                  level
                </li>
              </span>
              <span className="flex gap-3 items-center">
                <FaRegCircleCheck />{" "}
                <li>
                  Speaking Practice Groups, Live Classes and Masterclasses
                </li>
              </span>
            </ul>
          </div>
          <div className="bg-white shadow-lg  rounded-lg ">
            <div className="block max-w-md mx-auto rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <form>
                <div className="relative mb-6">
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput7"
                    placeholder="Name"
                  />
                  <label
                    for="exampleInput7"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Name
                  </label>
                </div>

                <div className="relative mb-6">
                  <input
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput8"
                    placeholder="Email address"
                  />
                  <label
                    for="exampleInput8"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Email address
                  </label>
                </div>
                <div className="relative mb-6">
                  <input
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput8"
                    placeholder="Email address"
                  />
                  <label
                    for="exampleInput8"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Mobile No.
                  </label>
                </div>

                <div className="relative mb-6">
                  <textarea
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlTextarea13"
                    rows="3"
                    placeholder="Message"
                  ></textarea>
                  <label
                    for="exampleFormControlTextarea13"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Message
                  </label>
                </div>
                <button
                  type="submit"
                  className=" bg-orange-700 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white max-w-6xl mx-auto">
        <div className="flex justify-between items-center"><h1 className="mb-3 font-semibold text-3xl text-center">
          Our Featured Courses
        </h1>
        <Link to='/courses' className="border border-gray-800 rounded-full px-6 py-1 font-semibold text-gray-600">View All</Link>
        </div>
        
        <div className="p-3">
          <Slider {...settings}>

            {courses.map((course) => {
              if(course.isFeatured === true){
                return (
                  <SlideCourse key={course._id} title={course.title.length > 30 ? `${course.title.substring(0, 20)}...`: course.title} thumbnail={course.thumbnail } discount={course.discount} fees={course.fees} courseId={course._id}/>
                )
              }
            })}
        
            {/* {
              courses.map((course) => (
                <SlideCourse key={course._id} title={course.title.length > 30 ? `${course.title.substring(0, 20)}...`: course.title} thumbnail={course.thumbnail } discount={course.discount} fees={course.fees}/>
              ))
            }  */}
           
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
