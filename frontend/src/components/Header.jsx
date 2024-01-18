
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/user/userSlice.js";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = async() => {
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/v1/signout')
      const data = res.json()
      if(data === false){
        dispatch(signOutFailure(data.msg))
        setIsOpen(false)
        return
      }
      dispatch(signOutSuccess(data))
      setIsOpen(false)
    } catch (error) {
      dispatch(signOutFailure(error))
      setIsOpen(false)
  
      
    }
  }
  return (
    <header className= ' bg-slate-50 shadow-md'>
      <div className='max-w-6xl mx-auto p-3 flex justify-between items-center'>
      <div className='font-bold text-lg sm:text-xl flex flex-wrap'>
        <Link to='/'>
          <h1 className='text-orange-700'>
            <span>Aplomb</span>
          </h1>
        </Link>
        </div>
        <div className="hidden sm:flex">
            <ul className='flex gap-4'>
              <Link to='/'>
              <li className=' hover:text-orange-700'>Home</li>
              </Link>
              <Link to='/about'>
              <li className=' hover:text-orange-700'>About</li>
              </Link>
              <Link to='/courses'>
              <li className=' hover:text-orange-700'>Courses</li>
              </Link>
            
              <Link to='/all-galleries'>
              <li className=' hover:text-orange-700'>Gallary</li>
              </Link>
           
           
            </ul>
            
          </div>
          <div >
            <ul className='flex gap-6'>
             
              <Link className='bg-orange-700 text-white border border-orange-700 rounded-lg px-4 text-center py-1 hover:opacity-95 disabled:opacity-80' to='/contact'>
                Contact Us
              </Link>

              
             
                {currentUser ?  ( <div className="relative"> <button
        onClick={toggleDropdown}
        className="flex items-center justify-center h-8 w-8 rounded-full"
      >
       <img src={currentUser.profilePicture} alt="profile picture"  className="rounded-full h-7 w-7" />
              
                
              
            
        
      </button></div>) : <Link className='border border-green-700 rounded-3xl px-6 text-center py-1 hover:bg-green-700 hover:text-white' to='/signin'>
                  <li>Sign In</li>
              </Link>
              }
    

      {isOpen && (
        <div className="absolute right-15 mt-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg" style={{zIndex: 100}}>
          <div className="py-1">
            <Link to="/profile" onClick={() => setIsOpen(!isOpen)}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            {/* <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a> */}
            <button
            onClick={handleSignout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    
            </ul>
            </div>  
            </div> 
     </header>
  )
}

export default Header