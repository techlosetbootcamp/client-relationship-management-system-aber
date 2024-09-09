"use client";
import React from "react";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import dynamic from "next/dynamic";
import StatusTag from "../statusTag/StatusTag";
import img from "@/assets/images/ArrowUp.svg";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import Avatar from "../avatar/Avatar";
import USFlag from "@/assets/images/USFLag.svg";
import franceFlag from "@/assets/images/franceFlag.svg";
import canadaFlag from "@/assets/images/canadaFlag.svg";
import brazilFlag from "@/assets/images/brazilFlag.svg";
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

const countrySalesData = [
  {
    img: USFlag,
    country: "United States",
    sales: "20,000",
    stats: "5.6%",
  },
  {
    img: franceFlag,
    country: "France",
    sales: "15,000",
    stats: "3.5%",
  },
  {
    img: USFlag,
    country: "Canada",
    sales: "10,234",
    stats: "1.4%",
  },
  {
    img: USFlag,
    country: "Brazil",
    sales: "10,233",
    stats: "4.8%",
  },
];

export const CountrySalesStats = () => {
  const obj = useCalendarContext();
  return (
    <CardWrapper height="" flexDirection="flex-col" width="md:w-[300px] lg:w-[323px] xl:w-[390px]">
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
        Country Sales Stats
      </p>
      <div className="border-t border-borderGray" />
      <div className="xs:h-[316px] xl:h-[381px] border border-borderGray">
        <Map
          hover={false}
          fill={false}
          zoom={1.5}
          longitude={41.1553857}
          latitude={-60.8101378}
        />
      </div>
      <div className="border-t border-borderGray" />
      <div className="flex flex-col xs:gap-[9.96px] xl:gap-[12px]">
        <div className="flex gap-[12.45px] items-center">
          <p className="font-[700] xs:text-[19.92px] xl:text-[24px] xs:leading-[29.88px] xl:leading-[36px] font-albertSans text-darkGray">
            55,467{" "}
            <span className="font-[600] xs:text-[12.45px] xl:text-[15px] xs:leading-[18.67px] xl:leading-[22.5px] font-barlow text-[#ADB5BD]">
              Orders
            </span>
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

        <p className="font-[600] xs:text-[12.45px] xl:text-[15px] xs:leading-[18.67px] xl:leading-[22.5px] font-barlow text-mediumGray">
          Sales from {obj?.startDay} - {obj?.endDay} {obj?.month}, {obj?.year}
        </p>

        <div className="flex flex-col gap-[12px]">
          {countrySalesData.map((item) => {
            return (
              <div key={item.country} className="flex p-[6.64px] xs:gap-[13px] xl:gap-[24px] items-center">
                <div className="flex xs:gap-[6.64px] xl:gap-[8px] items-center xs:w-[50%] md::w-[126px] xl:w-[153px] ">
                  <Avatar
                    height="xs:h-[22.41px] xl:h-[27px]"
                    width="xs:w-[22.41px] xl:w-[27px]"
                    radius="rounded-full"
                    background="bg-transparent"
                    img={item.img}
                  />
                  <p className="font-[500] xs:text-[12px] xl:text-[14px] xs:leading-[16px] xl:leading-[21px] text-mediumGray font-barlow">
                    {item.country}
                  </p>
                </div>
                <p className="font-[500] xs:text-[12px] xl:text-[14px] xs:leading-[16px] xl:leading-[21px] text-mediumGray font-barlow xs:w-[40%]  md:w-[79.68px] xl:w-[96px]">
                  {item.sales}
                </p>
                <StatusTag
                  text={item.stats}
                  fontSize="text-[10px]"
                  img={img}
                  background="bg-lightGreen"
                  color="text-secondaryGreen"
                  lineHeight="leading-[15px]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </CardWrapper>
  );
};
