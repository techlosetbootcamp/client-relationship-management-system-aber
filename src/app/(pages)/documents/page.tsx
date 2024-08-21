"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/header/Header";
import Table from "@/components/table/Table";
import { DocumentsTableHeadings } from "@/constants/TableHeadings";
import { DocumentsTableData } from "@/constants/TableData";
import { MdOutlineAddBox, MdOutlineFileUpload } from "react-icons/md";
import Button from "@/components/button/Button";
import FileUploadModal from "@/components/fileUploadModal/FileUploadModal";
import { axiosInstance } from "@/helpers/axiosInstance";
import { format } from "date-fns";
import { BsFilePdf, BsFileWord, BsFileExcel } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";

// import Map from '@/components/map/Map'
// import dynamic from 'next/dynamic'

// const Map = dynamic(()=> import("@/components/map/Map"),{
//   ssr : false
// })

const fileIcons: any = {
  pdf: <BsFilePdf size={32} />,
  doc: <BsFileWord size={32} />,
  docx: <BsFileWord size={32} />,
  xlsx: <BsFileExcel size={32} />,

  default: <FaRegFileAlt size={32} />, // A default icon for unsupported types
};

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [document, setDocument] = useState<any>([]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getDocuments = async () => {
    const documentData = await axiosInstance.get("/documents/get-documents");
    console.log("get document", documentData.data.document);

    const documentsArray = documentData.data.document.map((item: any) => {
      console.log("item", item);

      return {
        grpObject: {
     
          img: fileIcons[item.type] || fileIcons?.default,
          name: item.fileName,
          subValue: `Uploaded on ${format(
            new Date(item.CreatedAt),
            "dd MMMM, yyyy"
          )}`,
        },
        type: item.type,
        imgObject: {
          img: item.authorImage,
          name: item.authorName,
        },
        version: item.version,
        status: item.status,
      };
    });
    setDocument(documentsArray);

    console.log("get documents", document);
  };

  useEffect(() => {
    getDocuments();
  }, []);

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
        // tableData={DocumentsTableData}
        tableData={document}
        action={true}
        rowBorder={false}
      />

      <div className={`${isModalOpen ? "block" : "hidden"}`}>
        <FileUploadModal toggleModal={toggleModal} />
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
          width=""
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
            width=""
            Icon={MdOutlineFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
