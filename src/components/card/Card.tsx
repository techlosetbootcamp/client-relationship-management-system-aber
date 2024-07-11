import DoughnutChart from '@/charts/doughnutChart/DoughnutChart'
import React from 'react'

const Card = () => {
  return (
    <div className='flex flex-col gap-[8px] justify-center items-center text-white  w-[160px] h-[240px] rounded-[10.5px] py-[24px] px-[12px] bg-gradient-to-b from-[#9A55FF] to-[57.79%] to-[#D355FF]'>
        <div className=' h-[143px] flex justify-center items-center '>
            <DoughnutChart/>
        </div>

        <div className='text-center'>
            <p className='text-[24px] leading-[36px] font-albertSans font-[700]'>2,040/<span className='text-[16px]'>3,000</span></p>
            <p className='text-[12px] font-[600] font-barlow text-lightGray'>Target Orders</p>
        </div>
      
    </div>
  )
}

export default Card
// background: linear-gradient(336.19deg, #D355FF 0%, #9A55FF 57.79%);
