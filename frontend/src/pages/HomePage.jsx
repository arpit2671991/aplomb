import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideCourse from "../components/SlideCourse";
import MainSlide from "../components/MainSlide";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [allgalleries, setAllGalleries] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: null,
    message: ""
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const fetchAllGAlleries = async (res) => {
      try {
        const res = await fetch("/api/gallery/v1/all-galleries");
        const data = await res.json();
        setAllGalleries(data);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    fetchAllGAlleries();
  }, []);

  console.log(allgalleries);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const res = await fetch("/api/course/v1/all-courses");
        const data = await res.json();
        setCourses(data);
        setSuccess(true)
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeaturedCourses();
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => {
      return{
        ...prevData,
        [e.target.id]: e.target.value
      }
    })
  }

  const clearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      message: ""
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/contact/v1/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(success){
        setSuccessMsg('There is an Error!')
      }else{
        setSuccessMsg('Message Sent!')
      }
      setFormData(data)
      clearForm()
      
    } catch (error) {
      console.log(error)
      setError(error)
      clearForm()
   
    }
    
  }
  console.log(courses);
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
  const banners = {
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 2000
  };
  return (
    <div className="max-w-full mx-auto">
      <div className="mb-10">
        <Slider {...banners}>
          {allgalleries.map((item, index) => (
            <MainSlide img={item.images[0]} key={index} />
          ))}
        </Slider>
      </div>

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
              <form onSubmit={handleSubmit}>
                <div className="relative mb-6 ">
                <label
                    htmlFor="fullName"
                    className=""
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
                    id="fullName"
                    placeholder="Fullname"
                    required={true}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  
                </div>

                <div className="relative mb-6">
                <label
                    htmlFor="email"
                >
                    Email address
                  </label>
                  <input
                    type="email"
                    className=" w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
                    id="email"
                    placeholder="Email address"
                    required={true}
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>
                <div className="relative mb-6">
                <label
                    htmlFor="mobile"
                  >
                    Mobile No.
                  </label>
                  <input
                    type="number"
                    className=" w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
                    id="mobile"
                    placeholder="mobile"
                    required={true}
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                
                </div>

                <div className="relative mb-6">
                <label
                    htmlFor="message"
                   
                  >
                    Message
                  </label>
                  <textarea
                   className=" w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
                    id="message"
                    rows="3"
                    placeholder="Message"
                    required={true}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                 
                </div>
                <button
                 
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
        <div className="flex justify-between items-center">
          <h1 className="mb-3 font-semibold text-3xl text-center">
            Our Featured Courses
          </h1>
          <Link
            to="/courses"
            className="border border-gray-800 rounded-full px-6 py-1 font-semibold text-gray-600"
          >
            View All
          </Link>
        </div>

        <div className="p-3">
          <Slider {...settings}>
            {courses.map((course) => {
              if (course.isFeatured === true) {
                return (
                  <SlideCourse
                    key={course._id}
                    title={
                      course.title.length > 30
                        ? `${course.title.substring(0, 20)}...`
                        : course.title
                    }
                    thumbnail={course.thumbnail}
                    discount={course.discount}
                    fees={course.fees}
                    courseId={course._id}
                  />
                );
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
