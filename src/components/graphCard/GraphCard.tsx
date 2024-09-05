"use client";
import React, { useEffect, useState } from "react";
// import img from "@/assets/images/ArrowUp.svg";
import Img2 from "@/assets/images/Icon3";
import Button from "../button/Button";
import Image, { StaticImageData } from "next/image";
import Avatar from "../avatar/Avatar";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import LineChart from "@/charts/lineChart/LineChart";
import StatusTag from "../statusTag/StatusTag";
import { axiosInstance } from "@/helpers/axiosInstance";

type GraphCardProps = {
  btnText: string;
  img: string | StaticImageData;
  color: string;
  background: string;
  text: string;
  chart: string;
};

// const chartDataset = [
//   {
//     label: "My First Dataset",
//     data: [1, 2, 1, 7, 5, 6, 8],
//     fill: false,
//     borderColor: "rgb(75, 192, 192)",
//     tension: 0.1,
//   },
// ];

const chartlabels = [5, 10, 15, 20, 25, 30];

const GraphCard = ({
  btnText,
  img,
  color,
  background,
  text,
  chart,
}: GraphCardProps) => {
  const [profitData, setProfitData] = useState<any>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const currentDate = new Date();
  const previousMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1, // Decrement the month by 1
    currentDate.getDate() // Keep the same day
  );

  console.log(
    "checking start date",
    new Date().toISOString().slice(0, 10),
    previousMonthDate.toISOString().slice(0, 10)
  );

  const profitApi = async () => {
    try {
      const response = await axiosInstance.post(
        chart != "customers"
          ? "/order/get-order-by-date"
          : "/user/get-user-by-date",
        {
          startDate: previousMonthDate.toISOString().slice(0, 10),
          endDate: new Date().toISOString().slice(0, 10),
        }
      );

      console.log("this is response", chart, response);

      if (chart != "customers") {
        setTotalProfit(response?.data?.totalProfit ?? 0);
        setTotalExpense(response?.data?.totalExpense ?? 0);
      } else {
        setTotalCustomers(response?.data?.totalCustomers);
      }

      const chartDataset = [
        {
          label: "My First Dataset",
          // data: [1, 2, 1, 7, 5, 6, 8],
          data:
            chart != "customers"
              ? response?.data?.order?.map((item: any) => {
                  console.log("profit item", item.totalPurchasedPrice);
                  if (chart == "expenses") {
                    return item.totalPurchasedPrice;
                  } else if (chart == "profit") {
                    return item.subTotal - item.totalPurchasedPrice;
                  }
                })
              : response?.data?.customers?.map((item: any) => {
                  console.log("user map", item);
                  return item.customerCount;
                }),
          fill: false,
          borderColor: chart=="profit" ? "rgb(98, 145, 44)" : (chart=="expenses" ? "rgb(237, 77, 92)" : "rgb(65, 165, 255)"),
          tension: 0.1,
        },
      ];

      setProfitData(chartDataset);
      console.log("response inside graph cart", profitData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    profitApi();
  }, []);
  return (
    <CardWrapper
      width="xs:w-[190px] xs:flex-1 xl:w-[233px]"
      height="xs:h-[196px] md:h-[240px] lg:h-[196px] xl:h-[240px]"
      flexDirection="flex-col"
    >
      <div className="">
        <Avatar
          img={<Img2 fill="fill-white" hover="" />}
          height="xs:h-[23.32px] xl:h-[28.5px]"
          width="xs:w-[23.32px]  xl:w-[28.5px]"
          radius="rounded-full"
          background="bg-primaryPurple"
        />
      </div>

      <p className="font-semibold font-barlow xs:text-[12.2px] xl:text-[15px] xs:leading-[18.4px] xl:leading-[22.5px]  text-mediumGray">
        {text}
      </p>
      <div className="flex justify-between">
        <p className="font-bold xs:text-[19.6px] xl:text-[24px] xs:leading-[24.5px] xl:leading-[36px] font-albertSans">
         
          {chart === "profit"
            ? `$ ${totalProfit}`
            : chart === "expenses"
            ? `$ ${totalExpense}`
            : totalCustomers}
        </p>
        <div>
          <StatusTag
            text={btnText}
            fontSize="text-[10.5px]"
            img={img}
            background={background}
            color={color}
            lineHeight="leading-[15.75px]"
          />
        </div>
      </div>

      <div className=" xs:h-[62.5px] md:h-[77px] lg:h-[62.5px] xl:h-[77px]">
        <LineChart datasets={profitData} labels={chartlabels} display={false} />
      </div>
    </CardWrapper>
  );
};

export default GraphCard;
