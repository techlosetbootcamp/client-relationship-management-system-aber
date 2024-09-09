"use client";
import BarChart from "@/charts/barChart/BarChart";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import img from "@/assets/images/badgeIcon.svg";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import { axiosInstance } from "@/helpers/axiosInstance";
import useVisitors from "@/hooks/useVisitors";

export const Visitors = () => {
  const { data } = useVisitors();

  return (
    <CardWrapper
      width="md:w-[260px] lg:w-[325.36px] xl:w-[392px]"
      height="xs:h-[319.96px] xl:h-[385.5px]"
      flexDirection="flex-col flex-1"
    >
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
        Visitors
      </p>
      <div className="border border-borderGray" />
      <div className="md:h-[185px] xl:h-[223px]">
        {data && <BarChart axis={"x"} data={data} />}
      </div>

      <div className="border border-borderGray" />

      <div className="flex items-center gap-[8px]">
        <Avatar
          img={img}
          background=""
          height="h-[24px]"
          width=" w-[24px]"
          radius=""
        />

        <div className="">
          <p className="font-[600] text-[14px] leading-[21px] font-albertSans">
            Awesome!
          </p>
          <p className="font-[600] text-[12px] leading-[18px] font-barlow text-[#ADB5BD]">
            You Just hit a new record!
          </p>
        </div>
      </div>
    </CardWrapper>
  );
};
