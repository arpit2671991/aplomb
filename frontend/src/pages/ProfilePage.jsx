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
import {app}   from '../firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import DropdownList from '../components/DropdownList.jsx';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState()
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({})
  const [dob, setDob] = useState('')
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const dispatch = useDispatch()
  console.log(fileRef)
console.log(file)
console.log(filePerc)
console.log(fileUploadError)
console.log(formData)

  useEffect(() => {
    if(file){
      handleUpload(file)
    }
  }, [file])



  const handleUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
        console.log(filePerc)

      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...formData, profilePicture: downloadURL}))
      }
    )
  }




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
    <main className="bg-gray-500 max-w-full p-2  ">
      <div className='flex flex-col gap-4 p-5'>
        <div className='flex flex-col gap-4 flex-2'>
        <form className='bg-white p-10 rounded-lg flex flex-col gap-1 flex-1 mx-auto' onSubmit={handleSubmit}>
        <input type="file" 
          ref={fileRef}
          hidden
          accept="image/*" onChange={(e) => setFile(e.target.files[0])} /><br />
          <img onClick={() => fileRef.current.click()} className='border shadow-lg p-2 mx-auto object-fill rounded-full'  src={formData.profilePicture || currentUser.profilePicture} alt="pro" style={{width: 250, height: 250}} />
          {currentUser.role === "Admin" && <Link to="/admin" className='bg-green-700 text-white text-sm font-semibold p-1 w-full sm:w-44'>Manage Your Website</Link>}
          
          
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>
                Error while uploading 
              </span>
            ): filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image Uploaded Successfully</span>
            ): ""}
          </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <label>FirstName</label>
            <input type='text' className='p-1 rounded border' id='firstName' defaultValue={currentUser.firstName} onChange={handleChange} />
            <label>LastName</label>
            <input type='text' className='p-1 rounded border' id='lastName'  defaultValue={currentUser.lastName}  onChange={handleChange}/>
        
            {currentUser.role ==='Admin' && <> <label>Role</label><select id='role' onChange={handleChange} defaultValue={currentUser.role}>
              <option value={currentUser.role} disabled>{currentUser.role}</option>
              <option>User</option>
              <option>Admin</option>
            </select></> }
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
            <select id='city' onChange={handleChange} defaultValue={currentUser.city}>
              <option value={currentUser.city} disabled>{currentUser.city}</option>
              <option>Udaipur</option>
              <option>Jaipur</option>
            </select>
            <label>State</label>
            <select id='state' onChange={handleChange} defaultValue={currentUser.state}>
              <option value={currentUser.state} disabled>{currentUser.state}</option>
              <option>Rajasthan</option>
              <option>Gujrat</option>
            </select>
            <label>Country</label>
            <select id='country' onChange={handleChange} defaultValue={currentUser.country}>
              <option value={currentUser.country} disabled>{currentUser.country}</option>
              <option>INDIA</option>
              <option>Kuwait</option>
            </select>
            <button className='bg-orange-700 text-white broder rounded-lg shadow-lg p-2'>{loading ? 'Loading' : "Update"}</button>
          
          </form>
        
      </div>
     </div>
  </main>
  )
}

export default ProfilePage