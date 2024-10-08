"use client";
import LineChart from "@/charts/lineChart/LineChart";
import Avatar from "@/components/avatar/Avatar";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import React, { useEffect, useState } from "react";
import StatusTag from "../statusTag/StatusTag";
import img from "@/assets/images/ArrowUp.svg";
import { format } from "date-fns";

const salesStatsLabels: never[] = [];
const today = new Date();

const firstDayOfCurrentWeek = new Date(today.setDate(today.getDate() - 6));
const lastDayOfCurrentWeek = new Date();

const firstDayOfPreviousWeek = new Date(
  today.setDate(firstDayOfCurrentWeek.getDate() - 7)
);
const lastDayOfPreviousWeek = new Date(
  today.setDate(firstDayOfPreviousWeek.getDate() + 6)
);

export const OverallSales = () => {
  const [salesDataset, setSalesDataset] = useState<any>([]);
  const [overallSale, setOverallSale] = useState(0);

  const salesStatAPi = async () => {
    const response = await axiosInstance.post("/order/get-weekly-orders", {
      firstDayOfCurrentWeek: format(firstDayOfCurrentWeek, "yyyy-MM-dd"),
      lastDayOfCurrentWeek: format(lastDayOfCurrentWeek, "yyyy-MM-dd"),
      firstDayOfPreviousWeek: format(firstDayOfPreviousWeek, "yyyy-MM-dd"),
      lastDayOfPreviousWeek: format(lastDayOfPreviousWeek, "yyyy-MM-dd"),
    });

    setOverallSale(response?.data?.totalSale);
    const overallSalesDataset = [
      {
        label: "My First Dataset",
        data: [
          response?.data?.currentWeek?.map((item: any) => {
            const [year, month, day] = item.date.split("-");

            return {
              x: new Date(year, +month - 1, day),
              y: item.subTotal,
            };
          }),
        ].flat(),
        fill: false,
        borderColor: "rgb(154, 85, 255)",
        tension: 0.1,
      },
      {
        label: "My second Dataset",
        data: [
          response?.data?.lastWeek?.map((item: any) => {
            const [year, month, day] = item.date.split("-");

            return {
              x: new Date(year, +month - 1, day),
              y: item.subTotal,
            };
          }),
        ].flat(),

        fill: false,
        borderColor: "rgb(65, 165, 255)",
        tension: 0.1,
      },
    ];
    setSalesDataset(overallSalesDataset);
  };

  useEffect(() => {
    salesStatAPi();
  }, []);

  return (
    <CardWrapper
      width="w-full"
      height={"md:h-[321px] xl:h-[387px]"}
      flexDirection="flex-col "
    >
      <div className="flex flex-col gap-[12px]">
        <p className="text-[16px] leading-[24px] text-darkGray font-barlow font-semibold">
          Overall Sale
        </p>
        <div className="flex md:flex-row xs:flex-col justify-between md:items-center">
          <div className="flex gap-[8px] items-center">
            <p className="w-[150px] font-[700] text-[24px] leading-[36px] text-darkGray font-albertSans">
              $ {overallSale}
            </p>
            <StatusTag
              text="3.4%"
              fontSize="text-[10px]"
              img={img}
              background="bg-lightGreen"
              color="text-secondaryGreen"
              lineHeight="leading-[15px]"
            />
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <div className="h-[10.5px] w-[10.5px] rounded-full bg-primaryPurple" />
              <p className="font-[600] text-[12px] leading-[18px] text-mediumGray font-barlow">
                Current Week
              </p>
            </div>
            <div className="flex gap-[8px] items-center">
              <div className="h-[10.5px] w-[10.5px] rounded-full bg-secondaryBlue" />
              <p className="font-[600] text-[12px] leading-[18px] text-mediumGray font-barlow">
                Last Week
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-borderGray" />

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
