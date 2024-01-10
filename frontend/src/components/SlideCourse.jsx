import React from 'react'
import {Link} from 'react-router-dom'

const SlideCourse = ({thumbnail, title, discount, fees, courseId}) => {
  return (
    <div className="relative mt-5 m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <Link
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  to={`/course/${courseId}`}
                >
                  <img
                    className="object-cover"
                    src={thumbnail}
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    {discount} Rs. OFF
                  </span>
               </Link>
                <div className="mt-4 px-5 pb-5">
                <Link   to={`/course/${courseId}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">
                    
                     {title}
                    </h5>
                 </Link>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        Rs. {fees}
                      </span>
                      
                    </p>
                    
                  </div>
                <Link
                      to={`/course/${courseId}`}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    
                    View Details
                 </Link>
                </div>
              </div>
  )
}

export default SlideCourse