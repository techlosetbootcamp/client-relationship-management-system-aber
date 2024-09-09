"use client";
import LineChart from "@/charts/lineChart/LineChart";
import Avatar from "@/components/avatar/Avatar";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import React, { useEffect, useState } from "react";
import StatusTag from "../statusTag/StatusTag";
import img from "@/assets/images/ArrowUp.svg";
import useWeeklyStats from "@/hooks/useWeeklyStats";

const salesStatsLabels: never[] = [];

export const WeeklySalesStats = () => {
  const {
    salesDataset,
    totalRevenue,
    totalSales,
  } = useWeeklyStats();
 
  const salesStats = [
    {
      heading: "Total Revenue",
      subHeading: " Orders",
      number: `$ ${totalRevenue}`,
      background: "bg-secondaryBlue",
      border: true,
    },
    {
      heading: "Total Sales",
      subHeading: " Products",
      number: totalSales,
      background: "bg-secondaryGreen",
      border: true,
    },
    {
      heading: "Total Views",
      subHeading: " Views",
      number: "15,788",
      background: "bg-primaryPurple",
      border: false,
    },
  ];

 
  return (
    
    <CardWrapper
      width="w-full"
      height={"xs:h-[262px] md:h-[329px] xl:h-[397px]"}
      flexDirection="flex-col "
    >
      <p className="text-[16px] leading-[24px] text-darkGray font-barlow font-semibold">
        Sales Statistic
      </p>

      <div className="border-t border-borderGray" />

      <div className="flex gap-[8px] justify-between overflow-x-auto overflow-y-hidden">
        {salesStats.map((item) => {
          return (
            <>
              <div className="flex gap-[12px]" key={item.heading}>
                <div className="flex gap-[12px]">
                  <div className="h-[25px] w-[25px] flex justify-center items-center">
                    <div
                      className={`h-[16.5px] w-[16.5px] rounded-full ${item.background}`}
                    />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-[600] text-[15px] leading-[22.5px] text-mediumGray font-barlow">
                      {item.heading}
                    </p>
                    <p className="text-[24px] leading-[36px] font-[700] text-darkGray whitespace-nowrap">
                      {item?.number}
                      <span className="text-[#ADB5BD] text-[15px] leading-[22.5px] font-[600]">
                        {item.subHeading}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {item.border && <div className="border border-borderGray" />}
            </>
          );
        })}
      </div>

      <div className="w-full xl:h-[228px] md:h-[189px] xs:h-[122px]">
        <LineChart
          datasets={salesDataset}
          labels={salesStatsLabels}
          display={true}
        />
      </div>
    </CardWrapper>
  );
};
