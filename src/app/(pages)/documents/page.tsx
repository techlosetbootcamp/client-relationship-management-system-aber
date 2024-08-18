"use client"
import React, { useState } from "react";
import { Header } from "@/components/header/Header";
import Table from "@/components/table/Table";
import { DocumentsTableHeadings } from "@/constants/TableHeadings";
import { DocumentsTableData } from "@/constants/TableData";
import { MdOutlineAddBox, MdOutlineFileUpload } from "react-icons/md";
import Button from "@/components/button/Button";
import FileUploadModal from "@/components/fileUploadModal/FileUploadModal";

// import Map from '@/components/map/Map'
// import dynamic from 'next/dynamic'

// const Map = dynamic(()=> import("@/components/map/Map"),{
//   ssr : false
// })

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () =>{
    setIsModalOpen(!isModalOpen)
  }
  return (
    <div className="flex flex-col gap-[22px] ml-[12px] w-full">
      <Header text="Documents" />

      <Table
        heading=""
        width="w-full"
        height="h-[940px]"
        pagination={false}
        divider={false}
        checkbox={true}
        background="bg-white"
        bgRows="bg-white"
        bgHeader="bg-lightPurple"
        tableHeading={DocumentsTableHeadings}
        tableData={DocumentsTableData}
        action={true}
        rowBorder={false}
      />

      <div className={`${isModalOpen ? "block" : "hidden"}`}>


      <FileUploadModal toggleModal={toggleModal}/>
      </div>

      <div className="flex gap-[16px] justify-end">
        
      <Button
          text={"Create Document"}
          background="bg-primaryPurple"
          color="text-white"
          fontSize="text-[16px]"
          fontWeight="font-[600]"
          rounded="rounded-[4px]"
          gap="gap-[8px]"
          lineHeight="leading-[24px]"
          border="border-primaryPurple border"
          px="px-[12px]"
          py="py-[6px]"
          img={""}
          Icon={MdOutlineAddBox}
         
        />
        <div onClick={toggleModal}>

        <Button
          text={"Upload"}
          background="bg-primaryPurple"
          color="text-white"
          fontSize="text-[16px]"
          fontWeight="font-[600]"
          rounded="rounded-[4px]"
          gap="gap-[8px]"
          lineHeight="leading-[24px]"
          border="border-primaryPurple border"
          px="px-[12px]"
          py="py-[6px]"
          img={""}
          Icon={MdOutlineFileUpload}
        
        />
        </div>
      </div>
    </div>
  );
};

export default Page;
