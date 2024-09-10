"use client";
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import img from "@/assets/images/ArrowUp.svg";
import Img2 from "@/assets/images/Icon6";
import Avatar from "../avatar/Avatar";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import BarChart from "@/charts/barChart/BarChart";
import StatusTag from "../statusTag/StatusTag";
import { axiosInstance } from "@/helpers/axiosInstance";
import { format, startOfMonth, endOfMonth } from "date-fns";

const currentDate = new Date();

const firstDayOfMonth = format(startOfMonth(currentDate), "MMM d, yyyy");

const lastDayOfMonth = format(endOfMonth(currentDate), "MMM d, yyyy");
const MonthlyIncomeCard = () => {
  const [checkResponse, setCheckRespone] = useState<any>();
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);

  const monthlyIncomeHandler = async () => {
    const response = await axiosInstance.get("/order/get-order-by-month");

    const data = {
      labels: response?.data?.monthlyOrders?.map((monthlyOrder: any) => {
        return monthlyOrder.month;
      }),
      datasets: [
        {
          label: "Dataset",
          data: response?.data?.monthlyOrders?.map(
            (monthlyOrder: any, index: number) => {
              if (index == 0) {
                setCurrentMonthIncome(monthlyOrder.totalIncome);
              }
              return monthlyOrder.totalIncome;
            }
          ),

          backgroundColor: ["#9A55FF", "#41A5FF", "#ED4D5C"],

          borderWidth: 1,
        },
      ],
    };
    setCheckRespone(data);
  };

  useEffect(() => {
    monthlyIncomeHandler();
  }, []);
  return (
    <CardWrapper
      width="xl:w-[561px] lg:w-[459px] "
      height="xl:h-[240px] lg:h-[196px]"
      flexDirection=" xs:flex-col md:flex-row md:flex-1"
    >
      <div className="md:w-[45%] flex flex-col xs:gap-[13.91px] xl:gap-[17px]">
        <p className="font-[600] md:text-[13px] md:leading-[19.6px] xl:text-[16px] xl:leading-[24px] font-barlow">
          Monthly Income
        </p>
        <div className="flex justify-between">
          <p className="font-bold md:text-[19.6px] xl:text-[24px] md:leading-[24.5px] xl:leading-[36px] font-albertSans">
            $ {currentMonthIncome}
          </p>
          <div>
            <StatusTag
              text={"5.6%"}
              fontSize="text-[10.5px]"
              img={img}
              background={"bg-lightGreen"}
              color={"text-secondaryGreen"}
              lineHeight="leading-[15.75px]"
            />
          </div>
        </div>
        <p className="text-mediumGray md:text-[12px] xl:text-[14px] md:leading-[18px] xl:leading-[21px] font-barlow font-[500]">
          Compared to the previous month
        </p>
        <div className="border border-divider w-full md:block xs:hidden" />
        <div>
          <div className="flex flex-col-reverse xs:gap-[13.91px] md:gap-[0px]">
            <div className="flex xs:gap-[9.82px] xl:gap-[12px] items-center">
              <Avatar
                img={<Img2 fill="fill-white" hover="" />}
                height="xs:h-[23.32px] xl:h-[28.5px]"
                width="xs:w-[23.32px] xl:w-[28.5px]"
                radius="rounded-full"
                background="bg-primaryPurple"
              />
              <div>
                <p className="text-darkGray md:text-[12.2px] xl:text-[15px] font-semibold md:leading-[18.4px] xl:leading-[22.5px] font-barlow ">
                  Accounting
                </p>
                <p className="text-mediumGray md:text-[12.2px] xl:text-[15px] font font-medium md:leading-[18.4px] xl:leading-[22.5px] font-barlow">
                  {firstDayOfMonth} - {lastDayOfMonth}
                </p>
              </div>
            </div>
            <div className="border border-divider w-full md:hidden xs:block" />

            <div className=" h-[158px] flex items-center md:hidden">
              {checkResponse && <BarChart axis="y" data={checkResponse} />}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[55%] h-full flex items-center xs:hidden md:block">
        {checkResponse && <BarChart axis="y" data={checkResponse} />}
      </div>
    </CardWrapper>
  );
};

export default MonthlyIncomeCard;
