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
import { GraphCardProps } from "@/types/Types";
import useGraphCard from "@/hooks/useGraphCard";

const chartlabels = [5, 10, 15, 20, 25, 30];

const GraphCard = ({
  btnText,
  img,
  color,
  background,
  text,
  chart,
}: GraphCardProps) => {
  const { profitData, totalProfit, totalExpense, totalCustomers } =
    useGraphCard(chart);

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
