import React, { useState } from 'react'
import {Link} from 'react-router-dom'


const SigninPage = () => {

  const [formData, setFormData] = useState({})
  console.log(formData)



  const handleInputChange = (e) => {

    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className="text-xl text-center font-semibold my-7">Signin your account </h1>
   
        <form className='flex flex-col gap-4'>
            <p>Email</p>
            <input type="email" id="email" className="border border-gray-900 p-3 rounded-lg focus: outline-none " onChange={handleInputChange} />
            <p>Password</p>
            <input type="password" id="password" className="border border-gray-900 p-3 rounded-lg focus: outline-none" onChange={handleInputChange} />
          <button  className='bg-orange-700 p-2 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Signin
          </button>
          <p className='text-xs'><span>Dont have an account ?</span><Link to='/signup' className='mx-2 font-semibold text-green-700'>Signup</Link></p>
        </form>
      </div>
   
  )
}

export default SigninPage