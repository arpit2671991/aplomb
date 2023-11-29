import {useState, useEffect, useRef} from 'react'
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/user/userSlice.js";

const ProfilePage = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState(undefined)


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
 
  return (
    <main className="max-w-4xl p-3 mx-auto my-5 ">
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-2'>
          <img onClick={() => fileRef.current.click()} className='border shadow-lg p-3 mx-auto object-contain rounded-lg'  src={formData.avatar || currentUser.avatar} alt="pro" style={{width: 250, height: 250}} />
          <input type="file" 
          ref={fileRef}
          hidden
          accept="image/*" onChange={(e) => setFile(e.target.file)} /><br />
          <button className='bg-orange-700 text-white p-2 border shadow-md rounded-lg'>Upload</button>
        </div>
       
          <form className='flex flex-col gap-1 flex-1'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <label>FirstName</label>
            <input type='text' className='p-1 rounded border' id='firstName' />
            <label>LastName</label>
            <input type='text' className='p-1 rounded border' id='lastName'/>
            </div>
            <label>Date of Birth</label>
            <input type='date' className='p-1 rounded border' id='dob'/>
            <label>Email</label>
            <input type='email' className='p-1 rounded border' id='email'/>
            <label>Password</label>
            <input type='password' className='p-1 rounded border' id='password'/>
            <label>Mobile Number</label>
            <input type='tel' className='p-1 rounded border' id='mobileNumber'/>
            <label>Address</label>
            <textarea  rows="3" id='address'></textarea>
            <label>City</label>
            <input type='text' className='p-1 rounded border' id='city'/>
            <label>State</label>
            <input type='text' className='p-1 rounded border' id='state'/>
            <label>Country</label>
            <input type='text' className='p-1 rounded border' id='country'/>
            <button className='bg-orange-700 text-white broder rounded-lg shadow-lg p-2'>Update</button>
          </form>
        
      </div>
     
  </main>
  )
}

export default ProfilePage