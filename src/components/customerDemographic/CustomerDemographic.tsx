import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

export const CustomerDemographic = () => {
  return (
    <CardWrapper height="h-[396px]" flexDirection="flex-col" width="w-full">
      <p className="text-[16px] leading-[24px] text-darkGray font-semibold font-barlow">
        Customer Demographic
      </p>
      <div className="border-t border-borderGray" />
      <div className="h-[260px]">
        <Map
          hover={false}
          fill={true}
          zoom={4}
          longitude={38.0311988}
          latitude={-102.1390331}
        />
      </div>

      <div className="flex gap-[12px]">
        <div className="flex items-center gap-[12px]">
          <div className="h-[16.5px] w-[16.5px] rounded-full bg-blue"></div>
          <p className="font-[600] xs:text-[12.45px] xl:text-[15px] xs:leading-[18.67px] xl:leading-[22.5px] text-mediumGray font-barlow">
            Majority Members
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <div className="h-[16.5px] w-[16.5px] rounded-full bg-[#CFAFFF]"></div>
          <p className="font-[600] xs:text-[12.45px] xl:text-[15px] xs:leading-[18.67px] xl:leading-[22.5px] text-mediumGray font-barlow">
            Majority Non-members
          </p>
        </div>
      </div>
    </CardWrapper>
  );
};
