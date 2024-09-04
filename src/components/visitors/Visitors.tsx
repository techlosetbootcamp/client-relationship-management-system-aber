"use client";
import BarChart from "@/charts/barChart/BarChart";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import img from "@/assets/images/badgeIcon.svg";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import { axiosInstance } from "@/helpers/axiosInstance";

export const Visitors = () => {
  const [data, setData] = useState<any>();
  const obj = useCalendarContext();
  let orderData : any ={}
  const orderCountApi = async () => {
    try {
      
      const response = await axiosInstance.post("/order/get-order-by-date", {
        startDate: obj && obj?.formattedStartDate,
        endDate: obj && obj?.formattedEndDate,
      
      });
  
      console.log("respone befor", response);
  
       orderData = {
        labels: [],
        // labels: ["1Jul", "2Jul", "3Jul", "4Jul", "5Jul", "6Jul", "7Jul"],
        datasets: [
          {
            label: "Dataset",
            data: (response?.data?.order || []).flatMap((item: any) => {
              console.log("visitor item", item);
              if (!item?.date) {
                console.error("Item date is undefined or null:", item);
                return []; // Prevents returning undefined, which might cause the error.
              }
              const [year, month, day] = item?.date?.split("-");
              console.log(year, month, day);
              return {
                x: new Date(year, +month - 1, day),
                y: item.orderCount,
              };
            }),
  
            backgroundColor: ["#C9F19C"],
  
            borderWidth: 1,
          },
        ],
      };
  
      if (!orderData.datasets[0].data.length) {
        console.error("No data available in datasets[0].data");
      }
      console.log("visitor Data before", orderData);
      setData(orderData);
      console.log("visitor Data", data);
    } catch (error) {
      console.log("error in visitor",error);
      
    }
  };
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

  useEffect(() => {
    orderCountApi();
  }, [obj]);

  return (
    <CardWrapper
      width="w-[392px]"
      height="h-[385.5px]"
      flexDirection="flex-col"
    >
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
        Visitors
      </p>
      <div className="border border-borderGray" />
      <div className="h-[223px]">
        {
          data && 
        <BarChart axis={"x"} data={ data} />
        }
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
