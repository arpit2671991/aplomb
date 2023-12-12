import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
 
  FaShare,
} from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
const CoursePage = () => {

  SwiperCore.use([Navigation]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false)
  const params = useParams();
  console.log(course)

  useEffect(() => {
    const fetchCourse = async () => {
     
      try {
        setLoading(true);
        const res = await fetch(`/api/course/v1/course/${params.courseId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setCourse(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCourse();
    
  }, [params.courseId]);

  return (
    <main>
      {loading && (
        <div
          className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {error && (
      <p className="text-center my-7 text-2xl text-red-700">
          Something went wrong!
        </p>)}
        {course && !error && !loading && (
        <>
        <Swiper navigation>
            {course.thumbnail.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="h-[550px] bg-cover bg-center" style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}></div>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* link copied */}
        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
     
        <hr
  className="my-12 h-0.5 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
  <div className="container my-24 mx-auto md:px-6">

  <section className="mb-32">
   
    <div className="container mx-auto text-center lg:text-left xl:px-32">
      <div className="flex grid items-center lg:grid-cols-2">
        <div className="mb-12 lg:mb-0">
          <div
            className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
            <h2 className="mb-8 text-3xl font-bold">{course.title}</h2>
            {course.offer && <p className="mb-8 pb-2 text-neutral-500 dark:text-neutral-300 lg:pb-0">
             Avail The Opportunity Right Away
             <div className="flex justify-start gap-4 text-center mt-2"><span className="text-gray-900 font-semibold text-xl">Offer!!!!!</span><BiSolidOffer className="text-yellow-600 font-extrabold text-3xl flex" /><span className="text-red-800 text-lg font-bold">Discount {course.discount} INR</span></div>
             
            </p>}
            

            <div className="mx-auto mb-8 flex flex-col md:flex-row md:justify-around lg:justify-between">
              <p className="mx-auto mb-4 flex items-center md:mx-0 md:mb-2 lg:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" className="mr-2 h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Best team
              </p>

              <p className="mx-auto mb-4 flex items-center md:mx-0 md:mb-2 lg:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" className="mr-2 h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Best quality
              </p>

              <p className="mx-auto mb-2 flex items-center md:mx-0 lg:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" className="mr-2 h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Best experience
              </p>
            </div>

            <p className="mb-0 text-neutral-500 dark:text-neutral-300">
            {course.description}
            </p>
            <div className="flex justify-center mt-12"><span className="text-green-700 font-bold text-lg">Fees: Rs {course.fees} Only</span></div>
          </div>
        </div>

        <div>
          <img src={course.thumbnail[0]}
            className="w-full rounded-lg shadow-lg dark:shadow-black/20" alt="image" />
        </div>
        
      </div>
      
    </div>
    <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="mt-12 lg:mt-0">
          <h1 className="mt-0 mb-12 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
            Are you ready <br /><span className="text-primary">to learn English ?</span>
          </h1>

        </div>
        <div className="mb-12 lg:mb-0">
          <div
            className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-lg shadow-lg"
            style={{paddingTop: "56.25%"}}>
            <iframe className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
              src={`${course.link}&amp;origin=https%3A%2F%2Fmdbootstrap.com`}
              allowFullScreen data-gtm-yt-inspected-2340190_699="true" id="240632615"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>

</div>



</>
       ) }
    </main>
  );
};

export default CoursePage;

// 