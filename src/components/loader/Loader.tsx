import React from 'react'
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className=' w-full mt-[100px] mb-[50px]'>

    <ImSpinner2 className='animate-spin mx-auto' size={80}  />
    </div>
  )
}

export default Loader
