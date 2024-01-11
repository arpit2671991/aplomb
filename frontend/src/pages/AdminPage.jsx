import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='py-7 max-w-6xl mx-auto'>
        <h1 className='flex justify-center font-semibold text-gray-700 underline text-xl'>Manage Your Contents</h1>
        <div className='flex flex-col sm:flex-row justify-center p-3 gap-20 my-11'>
            <div className=' flex text-center justify-center'>
            <Link to="/manage-course">
                <img src="https://www.freeiconspng.com/uploads/courses-icon-2.png" alt="courses" style={{height: 100, width: 100}} />
                <h1 className='text-gray-700 mt-3'>Manage Courses</h1>  
            </Link>
            </div>
            <div className=' flex text-center justify-center '>
            <Link to="/manage-training">
                <img src="https://www.freeiconspng.com/uploads/training-icon-11.png" alt="training" style={{height: 100, width: 100}} />
                <h1 className='text-gray-700 mt-3'>Manage Trainings</h1>  
            </Link>
            </div>
            <div className=' flex text-center justify-center '>
            <Link to="/galleries">
                <img src="https://icon-library.com/images/picture-gallery-icon/picture-gallery-icon-7.jpg" alt="training" style={{height: 100, width: 100}} />
                <h1 className='text-gray-700 mt-3'>Upload Gallaries</h1>  
            </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminPage