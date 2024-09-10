import Avatar from "@/components/avatar/Avatar";
import React from "react";
import Img from "@/assets/images/Icon3";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { DeviceUsers } from "@/components/deviceUsers/DeviceUsers";
import { CustomerDemographic } from "@/components/customerDemographic/CustomerDemographic";
import Table from "@/components/table/Table";
import { Header } from "@/components/header/Header";
import { CustomerTableHeadings } from "@/constants/TableHeadings";
import { CustomerTableData } from "@/constants/TableData";

const customerData = [
  {
    text1: "Total Customers",
    text2: "10,678",
    background: "bg-white",
    fill: "fill-primaryPurple",
  },
  {
    text1: "New Customers",
    text2: "1,000",
    background: "bg-secondaryBlue",
    fill: "fill-white",
  },
  {
    text1: "New Members",
    text2: "8,864",
    background: "bg-secondaryGreen",
    fill: "fill-white",
  },
  {
    text1: "Non-Members",
    text2: "832",
    background: "bg-secondaryRed",
    fill: "fill-white",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col gap-[22px] xl:ml-[12px] w-full">
      <Header text="Customers" avatar={true} />

      <div className="grid sm:grid-cols-2  md:grid-cols-4 gap-[20px]">
        {customerData.map((item, i) => {
          return (
            <CardWrapper
              key={i}
              height="lg:h-[106px] xl:h-[128px]"
              width="lg:min-w-[200px] xl:min-w-[241px]"
              flexDirection="flex-col"
            >
              <div className="w-full h-full flex items-center xs:gap-[12px]  sm:gap-[8px] lg:gap-[10px] xl:gap-[12px] ">
                <Avatar
                  img={<Img fill={item.fill} hover="" />}
                  height="xs:h-[42px] sm:h-[31px] lg:h-[35px] xl:h-[42px]"
                  width=" xs:w-[42px] sm:w-[31px] lg:w-[35px] xl:w-[42px]"
                  radius="rounded-full"
                  background={item.background}
                />

                <div className="flex flex-col gap-[8px]">
                  <p className="xs:text-[12px] xs:leading-[18.6px] xl:text-[15px] xl:leading-[22.5px] font-barlow text-mediumGray font-semibold ">
                    {item.text1}
                  </p>
                  <p className="xs:text-[20px] xs:leading-[30px] xl:text-[24px] xl:leading-[36px] font-albertSans text-darkGray font-bold">
                    {item.text2}
                  </p>
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      <DeviceUsers />

      <CustomerDemographic />

      <Table
        height="h-[744px]"
        width="w-full"
        heading=""
        pagination={false}
        divider={false}
        background="!bg-transparent !border-0"
        bgHeader="bg-transparent"
        bgRows="bg-white rounded-[5px]"
        checkbox={true}
        action={false}
        tableHeading={CustomerTableHeadings}
        tableData={CustomerTableData}
        rowBorder={true}
      />
    </div>
  );
};

export default Page;
