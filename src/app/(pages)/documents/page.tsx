"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/header/Header";
import Table from "@/components/table/Table";
import { DocumentsTableHeadings } from "@/constants/TableHeadings";

import { MdOutlineAddBox, MdOutlineFileUpload } from "react-icons/md";
import Button from "@/components/button/Button";
import DocumentUploadModal from "@/components/documentUploadModal/DocumentUploadModal";

import useDocuments from "@/hooks/useDocuments";

import Loader from "@/components/loader/Loader";

const Page = () => {
  const { isModalOpen, document, toggleModal, isLoading } = useDocuments();

  return (
    <div className="flex flex-col gap-[22px] md:ml-[12px] w-full">
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
            page="documents"
            tableData={document}
            action={true}
            rowBorder={false}
          />

          <div className="flex md:flex-row xs:flex-col gap-[16px] md:justify-end">
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
        <DocumentUploadModal toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default Page;
