import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { Header } from "@/components/header/Header";
import { Visitors } from "@/components/visitors/Visitors";
import { WeeklySalesStats } from "@/components/weeklySalesStats/WeeklySalesStats";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-[22px] ml-[12px]">
      <Header text="Analytics" />

      <div className="flex gap-[24px]">
        <WeeklySalesStats />
        <Visitors />
      </div>

      <div className="flex gap-[25px]">
        <CardWrapper width="w-[277px]" height="h-[428px]" flex="col">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Source of Purchases</p>
          <div className="border border-borderGray" />
        </CardWrapper>

        <CardWrapper width="w-[745px]" height="h-[428px]" flex="col">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Sales Per Week</p>
          <div className="border border-borderGray" />
        </CardWrapper>
      </div>

      <div className="flex gap-[25px]">
        <CardWrapper width="w-[607px]" height="h-[324px]" flex="col">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Sales Per Country</p>
          <div className="border border-borderGray" />
        </CardWrapper>

        <CardWrapper width="w-[415px]" height="h-[320px]" flex="col">
          <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Sales History</p>
          <div className="border border-borderGray" />
        </CardWrapper>
      </div>
    </div>
  );
};

export default Page;
