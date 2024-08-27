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
        id: item.id,
        imgObject: {
          img: item.image,
          name: item.productName,
        },
        totalStock: item.totalStock,
        price: item.price,
        category: item.category,
      };
    });
    setProducts(productsArray);

    console.log("get products", products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col border-2 border-primaryPurple gap-[22px] -[12px] w-full">
      <Header text="Products" avatar={true}/>
      <div className="flex self-end" onClick={toggleModal}>
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
