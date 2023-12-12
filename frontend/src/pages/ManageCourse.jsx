import {useState, useEffect} from 'react'
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from 'react-router-dom';







const ManageCourse = () => {
    const [allcourses, setAllCourses] = useState([])
    
   
    useEffect(() => 
    {
        const fetchAllCourses = async() => {
        try {
            const res = await fetch('/api/course/v1/all-courses')
            const data = await res.json()
            setAllCourses(data)
        } catch (error) {
            console.log(error)
        }
    };
    fetchAllCourses()
}, [])

    console.log(allcourses)

    const handleChange = (e) => {
        
       
    }
  return (
    <div className='max-w-6xl mx-auto py-10'>
        <h1 className='text-center text-sm sm:text-lg font-semibold text-gray-700 underline'>All Courses Provided</h1>
        <div className='flex justify-end py-4'><Link to="/add-new-course" type="button" className="px-3 py-2 text-sm font-sm sm:font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Course</Link></div>
        
       

<div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                    Course Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Is Active
                </th>
                <th scope="col" className="px-6 py-3">
                    Is Featured
                </th>
                <th scope="col" className="px-6 py-3">
                    Is Offer
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {allcourses.length > 0 && allcourses.map((course, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={ index}>
               
                    
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link className='text-sm font-semibold text-slate-900 hover:text-orange-700' to={`/course/${course._id}`}>
                   {course.title}
                   </Link>
                </th>
                <td className="px-6 py-4">
                <div className="flex items-center">
                        <input id="isActive" type="checkbox" checked={course.isActive} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center">
                        <input id="isFeatured" type="checkbox" onChange={handleChange} checked={course.isFeatured}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center">
                        <input id="isOffer" type="checkbox" onChange={handleChange} checked={course.isOffer}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className='flex flex-row  gap-3 hover:cursor-pointer'>
                    <CiEdit  className='text-xl font-bold text-orange-700 hover:text-green-800' />
                    <CiTrash className='text-xl font-bold text-orange-700 hover:text-green-800' />
                    </div>
                  
                </td>
              
               
                
            </tr>
            ))}
        </tbody>
    </table>
    {/* <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
            </li>
            <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav> */}
</div>

    </div>
  )
}

export default ManageCourse