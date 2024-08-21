"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import { Header } from "@/components/header/Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import ImageUploadModal from "@/components/imageUploadModal/ImageUploadModal";
import DummyTable from "@/components/dummyTable/DummyTable";
import Table from "@/components/table/Table";
import { ProductsTableHeadings } from "@/constants/TableHeadings";
import { ProductsTableData } from "@/constants/TableData";
import { toast } from "@/helpers/toastify";
import { axiosInstance } from "@/helpers/axiosInstance";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getProducts = async () => {
    const productData = await axiosInstance.get("/products/get-products");
    console.log("get products", productData.data.product);

    const productsArray = productData.data.product.map((item: any) => {
      console.log("item", item);

      return {
        imgObject: {
          img: item.image,
          name: item.productName,
        },
        quantity: item.quantity,
        price: item.price,
        category: item.category,
      };
    });
    setProducts(productsArray);

    console.log("get products", products);
  };


  useEffect(()=>{
    getProducts();

  },[])

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
          width=""
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

 

      <Table
        tableHeading={ProductsTableHeadings}
        // tableData={ProductsTableData}
        tableData={products}
        background="bg-white"
        bgHeader="bg-lightPurple"
        bgRows="bg-white"
        action={true}
        width=""
        height=""
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
