import Avatar from "@/components/avatar/Avatar";
import React from "react";
import Img from "@/assets/images/Icon3";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { DeviceUsers } from "@/components/deviceUsers/DeviceUsers";
import { CustomerDemographic } from "@/components/customerDemographic/CustomerDemographic";
import Table from "@/components/table/Table";
import { Header } from "@/components/header/Header";

const customerData = [
  {
    text1: "Total Customers",
    text2: "10,678",
    background: "bg-white",
    fill : "fill-primaryPurple"
  },
  {
    text1: "New Customers",
    text2: "1,000",
    background: "bg-secondaryBlue",
    fill : "fill-white"
  },
  {
    text1: "New Members",
    text2: "8,864",
    background: "bg-secondaryGreen",
    fill : "fill-white"
  },
  {
    text1: "Non-Members",
    text2: "832",
    background: "bg-secondaryRed",
    fill : "fill-white"
  },
];

const Page = () => {
  return (
    <div className="flex flex-col gap-[22px] ml-[12px]">
   
      <Header text="Customers" />

      <div className="flex justify-between justify-center w-full border-2">
        {customerData.map((item,i) => {
          return (
            // reverse
            <CardWrapper key={i} height="h-[128px]" width="w-[241px]" flex="col">
              <div className="w-full h-full flex items-center gap-[12px] ">
                <Avatar
                  img={<Img fill={item.fill} hover=""/>}
                  size="h-[42px] w-[42px] rounded-full"
                  background={item.background}
                />

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[15px] text-mediumGray font-semibold leading-[22.5px] font-barlow">
                    {item.text1}
                  </p>
                  <p className="text-[24px] text-darkGray font-bold leading-[36px] font-albertSans">
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

      <Table height="h-[744px]" width="" />
    </div>
  );
};

export default Page;
