import LineChart from "@/charts/lineChart/LineChart";
import Avatar from "@/components/avatar/Avatar";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";

const salesStats = [
  {
    heading: "Total Revenue",
    subHeading: "Orders",
    number: "$27,733.00",
    border: true,
  },
  {
    heading: "Total Sales",
    subHeading: "Products",
    number: "9234",
    border: true,
  },
  {
    heading: "Total Views",
    subHeading: "Views",
    number: "15,788",
    border: false,
  },
];


const salesStatsDataset =  [
  {
    label: "My First Dataset",
    data: [0,4, 8, 12, 16, 20,24],
    fill: false,
    borderColor: "rgb(75, 192, 192)",
    tension: 0.1,
  },
  {
    label: "My First Dataset",
    data: [0,6, 12, 18, 24, 30, 36],
    fill: false,
    borderColor: "rgb(112, 75, 192)",
    tension: 0.1,
  },
  {
    label: "My First Dataset",
    data: [0,5, 10, 15, 20, 25, 30],
    fill: false,
    borderColor: "rgb(192, 77, 75)",
    tension: 0.1,
  },

]

const salesStatsLabels = ["1Jul", "2Jul","3Jul","4Jul","5Jul","6Jul","7Jul"]

export const WeeklySalesStats = () => {
  // height-397 for overview page and height-387 for analytics page
  return (
    <CardWrapper width="w-full" height="min-h-[387px]" flex="flex-col flex-1">
      <p className="text-[16px] leading-[24px] text-darkGray font-barlow font-semibold">
        Sales Statistic
      </p>
      <div className="border-t border-borderGray" />

      {/* //USE BELOW CODE IN CODE-OVERVIEW PAGE ONLY AND HIDE IN ANALYTICS PAGE */}

      {/* <div className="flex gap-[8px]">
        {salesStats.map((item) => {
          return ( */}
      {/* // <>
            //   <div className="flex gap-[12px]"> */}
      {/* <Avatar size="small" img="" /> */}
      {/* //     <div className="flex flex-col gap-[12px]">
            //       <p>{item.heading}</p>
            //       <p className="text-[24px] leading-[36px] font-bold text-darkGray">
            //         {item.number}
            //         <span className="text-[#ADB5BD] text-[15px] leading-[22.5px] font-semibold">
            //           {item.subHeading}
            //         </span>
            //       </p>
            //     </div>
            //   </div> */}

      {/* //   {item.border && <div className="border border-borderGray" />} */}
      {/* // </>
          );
        })}
      </div> */}

      <div className="w-full border h-full">
        <LineChart datasets={salesStatsDataset} labels={salesStatsLabels} display={true}/>
      </div>
    </CardWrapper>
  );
};
