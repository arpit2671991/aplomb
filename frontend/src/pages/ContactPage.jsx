import React, {useState} from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: null,
    message: ""
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')


  const clearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      message: ""
    })
  }


  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/contact/v1/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(success){
        setSuccessMsg('There is an Error!')
      }else{
        setSuccessMsg('Message Sent!')
      }
      setFormData(data)
      clearForm()
      
    } catch (error) {
      console.log(error)
      setError(error)
      clearForm()
   
    }
    
  }
  const handleChange = (e) => {
    setFormData((prevData) => {
      return{
        ...prevData,
        [e.target.id]: e.target.value
      }
    })
  }
  return (
  
    <div className="bg-gray-500  mx-auto max-w-full p-5">
    <div className="block max-w-md mx-auto rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6 ">
        <label
            htmlFor="fullName"
            className=""
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
            id="fullName"
            placeholder="Fullname"
            required={true}
            value={formData.fullName}
            onChange={handleChange}
          />
          
        </div>

        <div className="relative mb-6">
        <label
            htmlFor="email"
        >
            Email address
          </label>
          <input
            type="email"
            className=" w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
            id="email"
            placeholder="Email address"
            required={true}
            value={formData.email}
            onChange={handleChange}
          />

        </div>
        <div className="relative mb-6">
        <label
            htmlFor="mobile"
          >
            Mobile No.
          </label>
          <input
            type="number"
            className=" w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
            id="mobile"
            placeholder="mobile"
            required={true}
            value={formData.mobile}
            onChange={handleChange}
          />
        
        </div>

        <div className="relative mb-6">
        <label
            htmlFor="message"
           
          >
            Message
          </label>
          <textarea
           className=" w-full border-2 border-gray-500 outline-none p-2 rounded-lg"
            id="message"
            rows="3"
            placeholder="Message"
            required={true}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
         
        </div>
        <button
         
          className=" bg-orange-700 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Send
        </button>

      </form>
    </div>
  </div>

  )
}

export default ContactPage