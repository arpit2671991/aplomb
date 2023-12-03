import {useState} from 'react'
import { useSelector } from "react-redux";

const DropdownList = ({User, Admin, selectedOption, setSelectedOption}) => {

    const { currentUser, loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };
  return (
    <div className="relative inline-block">
    <select
      
      
     
      className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
      id='role'
      defaultValue={currentUser.role}
    >
      <option value="" disabled>
        
      </option>
      <option>{User}</option>
      <option>{Admin}</option>
      
    </select>

    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 6.293a1 1 0 0 1 1.414 0L10 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414z"
        />
      </svg>
    </div>
  </div>
  )
}

export default DropdownList