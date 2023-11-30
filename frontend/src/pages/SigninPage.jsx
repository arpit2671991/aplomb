import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'



const SigninPage = () => {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  // const handleFormSubmit = async(e) => {
  //   e.preventDefault()
  //   try {
  //     dispatch(signInStart())
  //     const res = await fetch("/api/auth/v1/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData)
  //     });
  //     const data = await res.json()

  //     if(data.success === false){
  //       dispatch(signInFailure(data.message));
  //       return;
  //     }
  //     dispatch(signInSuccess(data))
  //     navigate('/')


  //   } catch (error) {
  //     dispatch(signInFailure(error))      
  //   }
  // }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/v1/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
       if(data.success === false){
        dispatch(signInFailure(data.message))
       }

       dispatch(signInSuccess(data))
       navigate('/')
     
 
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className="text-xl text-center font-semibold my-7">Signin your account </h1>
   
        <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
            <p>Email</p>
            <input type="email" id="email" className="border border-gray-900 p-3 rounded-lg focus: outline-none " onChange={handleInputChange} />
            <p>Password</p>
            <input type="password" id="password" className="border border-gray-900 p-3 rounded-lg focus: outline-none" onChange={handleInputChange} />
          <button  className='bg-orange-700 p-2 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? "Signing in..." : " Signin"}
          </button>
          <p className='text-xs'><span>Dont have an account ?</span><Link to='/signup' className='mx-2 font-semibold text-green-700'>Signup</Link></p>
          {error && <p>{error.msg}</p>}
        </form>
      </div>
   
  )
}

export default SigninPage