import BarChart from "@/charts/barChart/BarChart";
import WeeklyScheduleMatrix from "@/charts/barChart/WeeklyScheduleMatrix";
import DoughnutChart from "@/charts/doughnutChart/DoughnutChart";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { Header } from "@/components/header/Header";
import { Visitors } from "@/components/visitors/Visitors";
import { WeeklySalesStats } from "@/components/weeklySalesStats/WeeklySalesStats";
import React from "react";

const data = {
  labels: ["D1", "D2", "D3"],
  datasets: [
    {
      label: "Dataset",
      data: [35, 49, 16],
      backgroundColor: ["#62912C", "#41A5FF", "#ED4D5C"],
      hoverOffset: 4,
      rotation: -24,
      borderColor: "transparent",
    },
  ],
};

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
    <div className="flex flex-col border gap-[22px] ml-[12px] w-full">
      <Header text="Analytics" />

      <div className="flex gap-[24px]">
        <WeeklySalesStats />
        <Visitors />
      </div>

      <div className="flex gap-[25px]">
        <CardWrapper width="w-[277px]" height="h-[428px]" flex="flex-col">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
            Source of Purchases
          </p>
          <div className="border border-borderGray" />
          <div className="h-[241px]">
            <DoughnutChart
              data={data}
              textStyle="bold 32px albert-sans"
              text="100%"
              color="Black"
            />
          </div>
        </CardWrapper>

        <CardWrapper width="w-[745px]" height="h-[428px]" flex="flex-col flex-1">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
            Sales Per Week
          </p>
          <div className="border border-borderGray" />
          <div className="h-[284px] border-2 ">

          <WeeklyScheduleMatrix/>
        
          </div>
        </CardWrapper>
      </div>

      <div className="flex gap-[25px]">
        <CardWrapper width="w-[607px]" height="h-[324px]" flex="flex-col flex-1">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
            Sales Per Country
          </p>
          <div className="border border-borderGray" />
          <div className="h-[228px]">
            <BarChart axis="y" data={barData} />
          </div>
        </CardWrapper>

        <CardWrapper width="w-[415px]" height="h-[320px]" flex="flex-col">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
            Sales History
          </p>
          <div className="border border-borderGray" />
        </CardWrapper>
      </div>
    </div>
  );
};

export default Page;
