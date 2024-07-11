import { CountrySalesStats } from '@/components/countrySalesStats/CountrySalesStats'
import { Header } from '@/components/header/Header'
import Table from '@/components/table/Table'
import { WeeklySalesStats } from '@/components/weeklySalesStats/WeeklySalesStats'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col w-full gap-[22px]">
      
      <Header text='Order Overview'/>

      <div className='flex gap-[26px]'>


      <div className='flex flex-col gap-[20px]'>
      <WeeklySalesStats/>
      <Table width='w-[631px]' height='h-[403px]'/>
      </div>

      <CountrySalesStats/>
      </div>

     
      </div>
  )
}

export default Page