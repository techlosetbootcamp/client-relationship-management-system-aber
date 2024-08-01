
import React from 'react'
import { Header } from '@/components/header/Header'
import Table from '@/components/table/Table'
import { DocumentsTableHeadings } from '@/constants/TableHeadings'
import { DocumentsTableData } from '@/constants/TableData'
// import Map from '@/components/map/Map'
// import dynamic from 'next/dynamic'

// const Map = dynamic(()=> import("@/components/map/Map"),{
//   ssr : false
// })





const Page = () => {
 
  return (
    <div className="flex flex-col gap-[22px] ml-[12px] w-full">
      <Header text='Documents'/>
      <Table
      heading='tabs will be here'
      width='w-full'
      height='h-[940px]'
      pagination={false}
      divider={false}
      checkbox={true}
      background='bg-white'
      bgRows='bg-white'
      bgHeader='bg-lightPurple'
      tableHeading={DocumentsTableHeadings}
      tableData={DocumentsTableData}
      />

    </div>
  )
}

export default Page
