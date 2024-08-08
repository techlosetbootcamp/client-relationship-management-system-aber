import BarChart from "@/charts/barChart/BarChart";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";
import Avatar from "../avatar/Avatar";
import img from "@/assets/images/badgeIcon.svg";



const data = {
  labels: ["1Jul", "2Jul", "3Jul", "4Jul", "5Jul", "6Jul", "7Jul"],
  datasets: [
    {
      label: "Dataset",
      data: [6000, 8000, 4000, 9000, 3000,17000,16000],

      backgroundColor: ["#C9F19C"],

      borderWidth: 1,
    },
  ],
}


export const Visitors = () => {
  return (
    <CardWrapper width="w-[392px]" height="h-[385.5px]" flex="flex-col">
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
        Visitors
      </p>
      <div className="border border-borderGray" />
      <div className="h-[223px]">
        <BarChart axis={"x"} data={data}/>
      </div>

      <div className="border border-borderGray" />

      <div className="flex items-center gap-[8px]">
        <Avatar img={img} background="" 
        height="h-[24px]"
        width=" w-[24px]"
        radius=""
        />

        <div className="">
          <p className="font-[600] text-[14px] leading-[21px] font-albertSans">Awesome!</p>
          <p className="font-[600] text-[12px] leading-[18px] font-barlow text-[#ADB5BD]">You Just hit a new record!</p>
        </div>
      </div>
    </CardWrapper>
  );
};
