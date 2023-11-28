
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
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
              <Link to='/corporate'>
              <li className=' hover:text-orange-700'>Corporate Training</li>
              </Link>
            </ul>
          </div>
          <div >
            <ul className='flex gap-6'>
             
              <Link className='bg-orange-700 text-white border border-orange-700 rounded-lg px-4 text-center py-1 hover:opacity-95 disabled:opacity-80' to='/contact'>
                Contact Us
              </Link>

              {currentUser ? (<Link to="/profile"> <img src={currentUser.profilePicture} alt="profile picture"  className="rounded-full h-7 w-7" /></Link>) :
              (
                <Link className='border border-green-700 rounded-3xl px-6 text-center py-1 hover:bg-green-700 hover:text-white' to='/signin'>
                  <li>Sign In</li>
              </Link>
              )
              
            }
              
            </ul>
            </div>  
            </div> 
     </header>
  )
}

export default Header