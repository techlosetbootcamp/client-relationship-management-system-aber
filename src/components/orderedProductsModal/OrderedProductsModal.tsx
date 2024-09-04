"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Table from "../table/Table";
import Image from "next/image";

import { DashboardTableHeadings } from "@/constants/TableHeadings";
import { DashboardTableData } from "@/constants/TableData";

const OrderTableHeadings = [
  {
    heading: "Product Id",
  },
  {
    heading: "Image",
  },
  {
    heading: "Name",
  },
  {
    heading: "Category",
  },
  {
    heading: "Price",
  },
  {
    heading: "Quantity",
  },
];

type OrderedProductsModalProps = {
  toggleModal: () => void;
  order: any;
};

const OrderedProductsModal = ({
  toggleModal,
  order,
}: OrderedProductsModalProps) => {
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    const orderDataArray = order.map((item: any) => {
      console.log(item);
      return {
        productId: item.product.id,
        image: item.product.image,
        name: item.product.productName,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    setOrderData(orderDataArray);
    console.log("order it is", orderData);
  }, [order]);
  return (
    <div className="backdrop-brightness-50 z-10 flex justify-center items-center fixed left-0 overflow-y-hidden overflow-x-hidden top-0 bottom-0 w-screen max-h-screen">
      <div className="bg-white rounded-[8px] shadow-md w-[75%] p-[20px]  flex flex-col gap-[16px] overflow-x-auto">
        <div className="flex justify-between">
          <p className="text-[22px] text-darkGray font-[600]">Order List</p>
          <IoClose size={30} onClick={toggleModal} />
        </div>

        <table className="w-full table-auto rounded-[8px] font-barlow border-separate border-spacing-y-[12px]">
          <thead className={`h-[47px] bg-lightPurple relative w-full`}>
            <tr className={`bg-lightPurple  relative z-10 py-[12px] h-[47px] `}>
              {OrderTableHeadings.map((item) => {
                return (
                  <th key={item.heading} className="text-start px-[20px]  h-[47px]">
                    {item.heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {orderData.map((item:any) => {
              return (
                <tr key={item.productId} className="w-full shadow-md rounded-[5px]">
                  <td className="px-[20px]  py-[8px] text-start ">
                    {item.productId}
                  </td>
                  <td className="px-[20px] py-[8px] text-start">
                    {item.name}
                  </td>
                  <td className="px-[20px]  py-[8px] text-start">
                    <Image
                      src={item.image}
                      alt="oiuytr"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="px-[20px]  py-[8px] text-start">
                    {item.category}
                  </td>
                  <td className="px-[20px]  py-[8px] text-start">
                    {item.price}
                  </td>
                  <td className="px-[20px]  py-[8px] text-start">
                    {item.quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <Table
          heading="New Customers"
          background="bg-white"
          width="lg:w-[606px] xl:w-[741px]"
          height="lg:h-[412px] xl:h-[500px]"
          pagination={false}
          divider={true}
          checkbox={false}
          bgHeader="bg-lightPurple"
          bgRows="bg-white"
          action={false}
          rowBorder={false}
          tableHeading={DashboardTableHeadings}
          tableData={DashboardTableData}
        /> */}
      </div>
    </div>
  );
};

export default OrderedProductsModal;
