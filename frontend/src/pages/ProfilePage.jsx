import {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    address,
    city,
    state,
    country,
    dob,
    profilePicture
  })
  
  useEffect(() => {
    const fetchProfile = async() => {
      const userId = params.userId
    
    }
  }, [])
  return (
    <div className='max-w-4xl mx-auto py-7'>
      <div className='bg-white p-3 shadow-md rounded-lg' >
        <form className='flex flex-col justify-center p-3 gap-4' >
          <input type='file' />
          <img src="" alt="" />
          <input type="text" placeholder='First Name' className='p-3 border rounded-lg' />
          <input type="text" placeholder='Last Name' className='p-3 border rounded-lg' />
          <input type="text" placeholder='email' className='p-3 border rounded-lg' />
          <input type="text" placeholder='password' className='p-3 border rounded-lg' />
          <input type="text" placeholder='Mobile Number' className='p-3 border rounded-lg' />
          <input type="text" placeholder='Address' className='p-3 border rounded-lg' />
          <input type="text" placeholder='City' className='p-3 border rounded-lg' />
          <input type="text" placeholder='State' className='p-3 border rounded-lg' />
          <input type="text" placeholder='Country' className='p-3 border rounded-lg' />
          <input type="text" placeholder='Date of Birth' className='p-3 border rounded-lg' />
          <button className='bg-orange-700 p-3 text-white rounded-lg'>Update Profile</button>        
        </form>
      </div>
    </div>
  )
}

export default ProfilePage