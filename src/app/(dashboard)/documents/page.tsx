
import React from 'react'
import { Header } from '@/components/header/Header'
// import Map from '@/components/map/Map'
// import dynamic from 'next/dynamic'

// const Map = dynamic(()=> import("@/components/map/Map"),{
//   ssr : false
// })





const Page = () => {
 
  return (
    <div className='w-full h-[500px]'>
      <Header text='Documents'/>

      {/* <Map/> */}

   
    </div>
  )
}

export default Page
