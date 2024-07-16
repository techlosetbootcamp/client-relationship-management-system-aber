import React from "react";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import dynamic from "next/dynamic";
const Map = dynamic(()=> import("@/components/map/Map"),{
  ssr : false
})

export const CountrySalesStats = () => {
  return (
    <CardWrapper flex="flex-col" width="w-[390px]">
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Country Sales Stats</p>
      <div className="border-t border-borderGray" />
      <div className="w-[358px] h-[381px] border border-borderGray">
      <Map/>
      </div>
      <div className="border-t border-borderGray" />
      <div>Stats</div>
    </CardWrapper>
  );
};
