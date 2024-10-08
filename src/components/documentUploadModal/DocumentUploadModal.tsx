"use client";

import React, { useEffect, useState } from "react";
import InputField from "../inputField/InputField";
import Button from "../button/Button";
import { MdOutlineAddBox } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IoClose } from "react-icons/io5";
import firebase from "firebase/app";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { app } from "@/helpers/firebaseConfig";
// import { useSession } from "next-auth/react";
import { BiEdit } from "react-icons/bi";
import useSessionData from "@/hooks/useSessionData";
import useDocuments from "@/hooks/useDocuments";
import { CgSpinner } from "react-icons/cg";
import { DocumentUploadModalProps } from "@/types/Types";

const StatusValues = [
  {
    text: "Active",
  },
  {
    text: "Archive",
  },
];

const DocumentUploadModal = ({
  toggleModal,
  item,
}: DocumentUploadModalProps) => {
  const { userId, userName, userEmail, userImage } = useSessionData();
  const {
    statusHandler,
    handleFileUpload,
    addDocument,
    editDocument,
    version,
    setVersion,
    status,
    setStatus,
    isClicked,
    setIsClicked,
    isLoading,
  } = useDocuments(item);

  return (
    <div className="backdrop-brightness-50 z-10 flex justify-center items-center fixed left-0 overflow-y-hidden overflow-x-hidden top-0 bottom-0 w-screen max-h-screen">
      <div className="bg-white rounded-[8px] shadow-md w-[35%] p-[20px]  flex flex-col gap-[16px]">
        <div className="flex justify-between">
          <p className="text-[22px] text-darkGray font-[600]">Add Document</p>
          <IoClose size={30} onClick={toggleModal} />
        </div>

        {!item && (
          <InputField
            width="w-full"
            rounded="8px"
            height="h-[3rem]"
            placeholder="File"
            onChange={handleFileUpload}
            type="file"
          />
        )}

        <InputField
          width="w-full"
          rounded="8px"
          height="h-[3rem]"
          placeholder="Version"
          onChange={(e) => {
            setVersion(e.target.value);
          }}
          type="text"
          value={version}
        />

        <div className="relative border-2 h-[3rem]">
          <ul
            className={`absolute border-2 w-full ${
              isClicked ? "block" : "hidden"
            } top-12 bg-white shadow-sm  rounded-[4px] flex flex-col`}
          >
            {StatusValues.map((item) => {
              return (
                <li
                  key={item.text}
                  className={`cursor-pointer hover:bg-primaryPurple hover:text-white px-[20px] h-[2.5rem] flex items-center  border ${
                    status === item.text
                      ? "bg-primaryPurple text-white"
                      : "text-black"
                  } `}
                  onClick={() => statusHandler(item.text)}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>

          <div className="absolute w-full text-black bg-white z-10 h-full flex justify-between items-center px-[8px]">
            <p>{status}</p>
            {isClicked ? (
              <IoIosArrowUp onClick={() => setIsClicked(!isClicked)} />
            ) : (
              <IoIosArrowDown onClick={() => setIsClicked(!isClicked)} />
            )}
          </div>
        </div>

        <Button
          text={
            item
              ? isLoading
                ? "Editting Document..."
                : "Edit Document"
              : isLoading
              ? "Creating Document..."
              : "Create Document"
          }
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
          width="w-full"
          Icon={isLoading ? CgSpinner : item ? BiEdit : MdOutlineAddBox}
          disabled={isLoading ? true : false}
          onClick={
            item
              ? () => {
                  editDocument(toggleModal);
                }
              : () => {
                  addDocument(userId, userName, userImage, toggleModal);
                }
          }
        />
      </div>
    </div>
  );
};

export default DocumentUploadModal;
