import React from 'react'
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className=' w-full'>

    <ImSpinner2 className='animate-spin mx-auto' size={80}  />
    </div>
  )
}

export default Loader
