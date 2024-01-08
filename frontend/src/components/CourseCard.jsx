import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({title, thumbnail, description, fees, id }) => {

  
  return (
    <div
    className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
    <Link to={`/course/${id}`}>
      <img
        className="rounded-t-lg"
        src={thumbnail}
        alt={thumbnail} />
    </Link>
    <div className="p-6">
      <h5
        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {title}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {description.length > 100 ? `${description.substring(0, 50)}...`: description}
      </p>
      <h5
        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        <span className='text-red-700 font-semibold text-base'>Course Fees: </span><span className='text-base font-semibold text-green-700'>{fees} Only</span>
      </h5>
        <Link to={`/course/${id}`}
  
          className="text-green-700 font-semibold">
          More Info..
        </Link>
     
    </div>
  </div>
  )
}

export default CourseCard