import { CountrySalesStats } from '@/components/countrySalesStats/CountrySalesStats'
import { Header } from '@/components/header/Header'
import Table from '@/components/table/Table'
import { WeeklySalesStats } from '@/components/weeklySalesStats/WeeklySalesStats'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col w-full border gap-[22px]">
      
      <Header text='Order Overview'/>

      <div className='flex gap-[26px] border border-secondaryGreen justify-between'>


      <div className='flex flex-col flex-1 border border-secondaryGreen min-w-[w-[631px]] gap-[20px]'>
      <WeeklySalesStats/>
      <Table width='w-full' height='h-[403px]'/>
      </div>

      <CountrySalesStats/>
      </div>

     
      </div>
  )
}

export default Page