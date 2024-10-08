"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import { Header } from "@/components/header/Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import ProductUploadModal from "@/components/productUploadModal/ProductUploadModal";
import Table from "@/components/table/Table";
import { ProductsTableHeadings } from "@/constants/TableHeadings";
import useProducts from "@/hooks/useProducts";

const Page = () => {
  const { fotmattedProducts, toggleModal, isModalOpen } = useProducts("");

  return (
    <div className="flex flex-col gap-[22px] -[12px] w-full  mb-[67px]">
      <Header text="Products" avatar={true} />
      <div className="flex self-end">
        <Button
          text={"Add Product"}
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
          Icon={IoMdAddCircleOutline}
          onClick={toggleModal}
          disabled={false}
        />
      </div>

      <div className={`${isModalOpen ? "block" : "hidden"}`}>
        <ProductUploadModal toggleModal={toggleModal} />
      </div>

      <Table
        tableHeading={ProductsTableHeadings}
        tableData={fotmattedProducts}
        background="bg-white"
        bgHeader="bg-lightPurple"
        bgRows="bg-white"
        action={true}
        width=""
        height="h-[940px]"
        heading="Products"
        divider={true}
        rowBorder={false}
        pagination={false}
        checkbox={false}
      />
    </div>
  );
};

export default Page;
