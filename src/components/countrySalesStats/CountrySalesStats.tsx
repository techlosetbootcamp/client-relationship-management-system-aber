import React from "react";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import dynamic from "next/dynamic";
const Map = dynamic(()=> import("@/components/map/Map"),{
  ssr : false
})

export const CountrySalesStats = () => {
  return (
    <CardWrapper height="" flexDirection="flex-col" width="w-[390px]">
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Country Sales Stats</p>
      <div className="border-t border-borderGray" />
      <div className="w-[358px] h-[381px] border border-borderGray">
      <Map hover={false} fill={false} zoom={1.5} longitude={41.1553857} latitude={-60.8101378}/>
      </div>
      <div className="border-t border-borderGray" />
      <div>Stats</div>
    </CardWrapper>
  );
};
