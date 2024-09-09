import SingleBarChart from "@/charts/singleBarChart/SingleBarChart";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";

export const DeviceUsers = () => {
  return (
    <CardWrapper height="h-[146px]" width="" flexDirection="">
      <div className="flex flex-col items-center w-full">
        <div className=" w-full flex justify-between">
          <div className="w-[65%]">
            <p className="text-mediumGray text-[15px] font-[600] leading-[22.5px] font-barlow">Desktop Users</p>
            <p className="text-darkGray text-[24px] font-[700] leading-[36px]">65%</p>
          </div>
          <div  className="w-[30%]">
            <p className="text-mediumGray text-[15px] font-[600] leading-[22.5px] font-barlow">Mobile Users</p>
            <p className="text-darkGray text-[24px] font-[700] leading-[36px]">35%</p>
          </div>
        </div>
        <div className="w-full h-[35px] p-0 m-0">

        <SingleBarChart/>
        </div>
      </div>
    </CardWrapper>
  );
};
