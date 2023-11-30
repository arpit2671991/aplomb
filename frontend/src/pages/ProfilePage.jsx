import {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from "react-redux";
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
  const [dob, setDob] = useState('')
  const [file, setFile] = useState(undefined)
  const dispatch = useDispatch()


  console.log(formData)


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/v1/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
 
  return (
    <main className="max-w-6xl p-3 mx-auto my-5 ">
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-2'>
          <img onClick={() => fileRef.current.click()} className='border shadow-lg p-3 mx-auto object-contain rounded-lg'  src={formData.profilePicture || currentUser.profilePicture} alt="pro" style={{width: 250, height: 250}} />
          <input type="file" 
          ref={fileRef}
          hidden
          accept="image/*" onChange={(e) => setFile(e.target.file)} /><br />
          <button className='bg-orange-700 text-white p-2 border shadow-md rounded-lg'>Upload</button>
        </div>
       
          <form className='flex flex-col gap-1 flex-1' onSubmit={handleSubmit}>
            <div className='flex flex-col sm:flex-row gap-4'>
              <label>FirstName</label>
            <input type='text' className='p-1 rounded border' id='firstName' defaultValue={currentUser.firstName} onChange={handleChange} />
            <label>LastName</label>
            <input type='text' className='p-1 rounded border' id='lastName'  defaultValue={currentUser.lastName}  onChange={handleChange}/>
            <label>Role</label>
            <input type='text' className='p-1 rounded border' id='role'  defaultValue={currentUser.role} onChange={handleChange}/>
            </div>
            <label>Date of Birth</label>
            <input type='date' className='p-1 rounded border' id='dob'  defaultValue={currentUser.dob}  onChange={handleChange} />
            <label>Email</label>
            <input type='email' className='p-1 rounded border' id='email'  defaultValue={currentUser.email} onChange={handleChange}/>
            <label>Password</label>
            <input type='password' className='p-1 rounded border' id='password'  defaultValue={currentUser.password} onChange={handleChange}/>
            <label>Mobile Number</label>
            <input type='tel' className='p-1 rounded border' id='mobileNumber'  defaultValue={currentUser.mobileNumber} onChange={handleChange}/>
            <label>Address</label>
            <textarea  rows="3" id='address'  defaultValue={currentUser.address} onChange={handleChange}></textarea>
            <label>City</label>
            <input type='text' className='p-1 rounded border' id='city'  defaultValue={currentUser.city} onChange={handleChange}/>
            <label>State</label>
            <input type='text' className='p-1 rounded border' id='state'  defaultValue={currentUser.state} onChange={handleChange}/>
            <label>Country</label>
            <input type='text' className='p-1 rounded border' id='country'  defaultValue={currentUser.country} onChange={handleChange}/>
            <button className='bg-orange-700 text-white broder rounded-lg shadow-lg p-2'>Update</button>
          </form>
        
      </div>
     
  </main>
  )
}

export default ProfilePage