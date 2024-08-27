"use client";

import React, { useEffect, useState } from "react";
import InputField from "../inputField/InputField";
import Button from "../button/Button";
import { MdOutlineAddBox } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IoClose } from "react-icons/io5";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import { BiEdit } from "react-icons/bi";

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

const ImageUploadModal = ({ toggleModal, item }: uploadModalProps) => {
  console.log("item from somewhere", item?.imgObject?.name);
  const [productName, setProductName] = useState<string>("");
  const [totalStock, setTotalStock] = useState<string>("");
  const [category, setCategory] = useState<string>("Select Category");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isClicked, setIsClicked] = useState(false);

  const CategoryHandler = (category: string) => {
    setCategory(category);
    setIsClicked(false);
  };

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      setSelectedFile(file);
      console.log("selected file", file);
    }
  };

  // const getSingleProduct = async () => {
  //   console.log("id before sending", id);
  //   try {
  //     setLoading(true);
  //     const response = await axiosInstance.post(
  //       "/products/get-single-product",
  //       {
  //         id,
  //       }
  //     );
  //     console.log("single product in useeffect", response);
  //     if (response) {
  //       console.log("product data insode if", response);

  //       setProductName(response?.data?.product?.productName ?? "");
  //       setCategory(response?.data?.product?.category ?? "");
  //       setQuantity(response?.data?.product?.quantity ?? "");
  //       setPrice(response?.data?.product?.price ?? "");
  //     } else {
  //       console.log("inside else");
  //     }
  //   } catch (error) {
  //     console.log("error in single product in useeffect");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    setProductName(item?.imgObject?.name ?? "");
    setCategory(item?.category ?? "");
    setTotalStock(item?.totalStock ?? "");
    setPrice(item?.price ?? "");
  }, [item]);

  const addProduct = async () => {
    toggleModal();
    if (selectedFile) {
      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("totalStock", totalStock);
      formData.append("category", category);
      formData.append("image", selectedFile);
      const response = await axiosInstance.post(
        "/products/add-product",
        formData
      );
      console.log("upload-file response", response);
    }
  };

  const editProduct = async () => {
    console.log("edit is clicked");
    toggleModal();
    // if (selectedFile) {
    const formData = new FormData();
    formData.append("id", item?.id);
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("totalStock", totalStock);
    formData.append("category", category);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    const response = await axiosInstance.post(
      "/products/edit-product",
      formData
    );
    console.log("edit-product response", response);
    // }
  };

  console.log("i am being open in table", item);

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
          placeholder="Total Stock"
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
          placeholder="Price"
          onChange={(e) => {
            setTotalStock(e.target.value);
          }}
          type="text"
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

        <div onClick={item ? () => editProduct() : () => addProduct()}>
          <Button
            text={item ? "Edit Product" : "Add product"}
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
            Icon={item ? BiEdit : MdOutlineAddBox}
          />
        </div>
      </CardWrapper>

      {/* <div className="bg-white rounded-[8px] shadow-md w-[35%] p-[20px]  flex flex-col gap-[16px]"> */}

      {/* </div> */}
    </div>
  );
};

export default ImageUploadModal;
