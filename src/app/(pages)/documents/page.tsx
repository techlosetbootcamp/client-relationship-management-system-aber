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
import userAvatar from "@/assets/images/userAvatar.png";
import useDocuments from "@/hooks/useDocuments";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";

const Page = () => {
  const { isModalOpen, document, toggleModal, isLoading } = useDocuments();
  // console.log("These are documetns",document)

  // const docs = useSelector()
  // const docs = useSelector((state: RootState) => state.document.data);

  // useEffect(() => {
  //   console.log("These are docs", docs, document); // Check the console to see if docs logs the expected data
  // }, [docs]);
  return (
    <div className="flex flex-col gap-[22px] ml-[12px] w-full">
      <Header text="Documents" avatar={true} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
          page="documents"
          tableData={document}
          action={true}
          rowBorder={false}
        />
        
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
        onClick={() => {}}
        disabled={false}
      />

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
        onClick={toggleModal}
        disabled={false}
      />
    </div>
    </>
      )}

      <div className={`${isModalOpen ? "block" : "hidden"}`}>
        <FileUploadModal toggleModal={toggleModal} />
      </div>

    </div>
  );
};

export default Page;
