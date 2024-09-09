"use client";

import React, { useEffect, useState } from "react";
import InputField from "../inputField/InputField";
import Button from "../button/Button";
import { MdOutlineAddBox } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import { BiEdit } from "react-icons/bi";
import useProducts from "@/hooks/useProducts";
import { CgSpinner } from "react-icons/cg";

type uploadModalProps = {
  toggleModal: () => void;
  item?: any;
};

const CategoryValues = [
  {
    text: "HomeGoods",
  },
  {
    text: "Potterific",
  },
  {
    text: "Flower Child",
  },
  {
    text: "Wood Co.",
  },
];

const ProductUploadModal = ({ toggleModal, item }: uploadModalProps) => {
  const {
    CategoryHandler,
    handleFileUpload,
    addProduct,
    editProduct,
    productName,
    setProductName,
    totalStock,
    setTotalStock,
    category,
    setCategory,
    price,
    setPrice,
    purchasedPrice,
    setPurchasedPrice,
    isClicked,
    setIsClicked,
    isLoading,
  } = useProducts(item);

  return (
    <div className="backdrop-brightness-50 z-20 flex justify-center items-center fixed left-0 overflow-y-hidden overflow-x-hidden top-0 bottom-0 w-screen max-h-screen">
      <CardWrapper width="w-[35%] " flexDirection="flex-col" height="">
        <div className="flex justify-between">
          <p className="text-[22px] text-darkGray font-[600]">Add Product</p>
          <IoClose size={30} onClick={toggleModal} />
        </div>
        <InputField
          width="w-full"
          rounded="8px"
          height="h-[3rem]"
          placeholder="Image"
          onChange={handleFileUpload}
          type="file"
          // value={file}
        />

        <InputField
          width="w-full"
          rounded="8px"
          height="h-[3rem]"
          placeholder="Product Name"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          type="text"
          value={productName}
        />
        <InputField
          width="w-full"
          rounded="8px"
          height="h-[3rem]"
          placeholder="Purchased Price"
          onChange={(e) => {
            setPurchasedPrice(e.target.value);
          }}
          type="text"
          value={purchasedPrice}
        />

        <InputField
          width="w-full"
          rounded="8px"
          height="h-[3rem]"
          placeholder="Sale Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="text"
          value={price}
        />

        <InputField
          width="w-full"
          rounded="8px"
          height="h-[3rem]"
          placeholder="Total Stock"
          onChange={(e) => {
            setTotalStock(e.target.value);
          }}
          type="number"
          value={totalStock}
        />

        <div className="relative border-2 h-[3rem]">
          <ul
            className={`absolute border-2 w-full ${
              isClicked ? "block" : "hidden"
            } top-12 bg-white shadow-sm  rounded-[4px] flex flex-col`}
          >
            {CategoryValues.map((item) => {
              return (
                <li
                  key={item.text}
                  className={`cursor-pointer hover:bg-primaryPurple hover:text-white px-[20px] h-[2.5rem] flex items-center  border ${
                    category === item.text
                      ? "bg-primaryPurple text-white"
                      : "text-black"
                  } `}
                  onClick={() => CategoryHandler(item.text)}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>

          <div className="absolute w-full text-black bg-white z-10 h-full flex justify-between items-center px-[8px]">
            <p>{category}</p>
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
                ? "Editting Product..."
                : "Edit Product"
              : isLoading
              ? "Adding Product..."
              : "Add Product"
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
                  editProduct(toggleModal);
                }
              : () => {
                  addProduct(toggleModal);
                }
          }
        />
      </CardWrapper>
    </div>
  );
};

export default ProductUploadModal;
