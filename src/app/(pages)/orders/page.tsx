"use client";
import { Header } from "@/components/header/Header";
import Loader from "@/components/loader/Loader";
import Table from "@/components/table/Table";
import { orderTableHeading } from "@/constants/TableHeadings";
import { axiosInstance } from "@/helpers/axiosInstance";
import useOrders from "@/hooks/useOrders";
import React from "react";

const Page = () => {
  const { orderList, isLoading } = useOrders();

  return (
    <div className="flex flex-col gap-[22px] ml-[12px] w-full overflow-x-auto ">
      <Header text="Order List" avatar={false} />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto w-full ">
          <Table
            height="h-[744px]"
            width="w-full"
            heading=""
            pagination={false}
            divider={false}
            background="!bg-transparent !border-0"
            bgHeader="bg-transparent"
            bgRows="bg-white rounded-[5px]"
            checkbox={false}
            action={false}
            tableHeading={orderTableHeading}
            tableData={orderList}
            rowBorder={true}
            page="orders"
          />
        </div>
      )}
    </div>
  );
};

export default Page;
