import BarChart from "@/charts/barChart/BarChart";
import WeeklyScheduleMatrix from "@/charts/barChart/WeeklyScheduleMatrix";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { Header } from "@/components/header/Header";
import { OverallSales } from "@/components/overallSales/OverallSales";
import SalesHistory from "@/components/salesHistory/SalesHistory";
import SourceOfPurchaseCard from "@/components/sourceOfPurchaseCard/SourceOfPurchaseCard";
import { Visitors } from "@/components/visitors/Visitors";
import React from "react";

const barData = {
  labels: ["United States", "France", "Japan", "Canada", "Brazil"],
  datasets: [
    {
      label: "Dataset",
      data: [3200, 1800, 2200, 700, 400],

      backgroundColor: ["#BADAFF"],

      borderWidth: 1,
    },
  ],
};
const Page = () => {
  return (
    <div className="flex flex-col border gap-[22px] md:ml-[12px] w-full  border-2 ">
      <Header text="Analytics" avatar={true} />

      <div className="flex md:flex-row xs:flex-col xs:gap-[20px] md:gap-[10px] lg:gap-[19.65px] xl:gap-[24px] w-full">
        <div className="md:w-[524px] xl:w-[631px]">

        <OverallSales/>
        </div>
        <Visitors />
      </div>

     
      <div className="flex md:flex-row xs:flex-col xs:gap-[20px]  md:gap-[10px] lg:gap-[20.75px] xl:gap-[25px]">
        <SourceOfPurchaseCard/>

        <CardWrapper
          width="md:w-[540px] lg::w-[618.35px] xl:w-[745px]"
          height="md:h-[355.24px] xl:h-[428px]"
          flexDirection="flex-col flex-1"
        >
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
            Sales Per Week
          </p>
          <div className="border border-borderGray" />
          <div className="h-[284px] border-2 ">
            <WeeklyScheduleMatrix />
          </div>
        </CardWrapper>
      </div>

      <div className="flex md:flex-row xs:flex-col xs:gap-[20px] md:gap-[10px] lg:gap-[19.92px] xl:gap-[24px]">
        <CardWrapper
          width="md:w-[503.81px] xl:w-[607px]"
          height="md:h-[269px] xl:h-[324px]"
          flexDirection="flex-col flex-1"
        >
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
            Sales Per Country
          </p>
          <div className="border border-borderGray" />
          <div className="xs:h-[128px] md:h-[189px] xl:h-[228px]">
            <BarChart axis="y" data={barData} />
          </div>
        </CardWrapper>

      <SalesHistory/>
      </div> 

    </div>
  );
};

export default Page;
