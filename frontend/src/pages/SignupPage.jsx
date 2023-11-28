import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {

  const [file, setFile] = useState(null)

  const handleInputChange = (e) => {}

  const uploadingImage = () =>{}

  const handleSubmitImages = () => {}
  return (
    <div className='max-w-4xl mx-auto p-3'>
    <h1 className="text-xl text-center font-semibold my-7">Create your account! </h1>
      <form className='flex flex-col sm:flex-row  gap-4'>
      <div className="flex flex-col gap-4 flex-1"> <p>First Name</p>
          <input type="text" id="firstname" className="border border-gray-900 p-3 rounded-lg focus: outline-none " onChange={handleInputChange} />
          <p>Last Name</p>
          <input type="text" id="firstname" className="border border-gray-900 p-3 rounded-lg focus: outline-none " onChange={handleInputChange} />
          <p>Email</p>
          <input type="email" id="email" className="border border-gray-900 p-3 rounded-lg focus: outline-none " onChange={handleInputChange} />
          <p>Mobile No.</p>
          <input type="number" id="firstname" className="border border-gray-900 p-3 rounded-lg focus: outline-none " onChange={handleInputChange} />
          <p>Password</p>
          <input type="password" id="password" className="border border-gray-900 p-3 rounded-lg focus: outline-none" onChange={handleInputChange} />
       </div>
        <div className="flex flex-col flex-1 gap-4 py-9">
        
          <div className="flex gap-4">
           
            <input
              onChange={(e) => setFile(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />

            <button
              disabled={uploadingImage}
              type="button"
              onClick={handleSubmitImages}
              className="p-3 border text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploadingImage ? "Uploading..." : "Upload"}
            </button>
        </div>
        <button  className='bg-orange-700 p-2 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Signin
        </button>
        <p className='text-xs'><span>Dont have an account ?</span><Link to='/signin' className='mx-2 font-semibold text-green-700'>Signin</Link></p>
        </div>
        
      </form>
    </div>
  )
}

export default SignupPage