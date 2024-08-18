"use client";
import React, { useState } from "react";
import Button from "@/components/button/Button";
import { Header } from "@/components/header/Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import ImageUploadModal from "@/components/imageUploadModal/ImageUploadModal";
import DummyTable from "@/components/dummyTable/DummyTable";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex flex-col border-2 border-primaryPurple gap-[22px] -[12px] w-full">
      <Header text="Products" />
      <div className="flex self-end" onClick={toggleModal}>
        <Button
          text={"Add Product"}
          background="bg-primaryPurple"
          color="text-white"
          rounded="rounded-[8px]"
          border=""
          px="px-[15px]"
          py="py-[8px]"
          
          gap="gap-[8px]"
          fontWeight="font-[500]"
          fontSize="text-[18px]"
          lineHeight="leading-[28px]"
          Icon={IoMdAddCircleOutline}
          img={""}
        />
      </div>
      <div className={`${isModalOpen ? "block" : "hidden"}`}>
        <ImageUploadModal toggleModal={toggleModal} />
      </div>

      <div>here comes the remaining page</div>

      <DummyTable/>
    </div>
  );
};

export default Page;
