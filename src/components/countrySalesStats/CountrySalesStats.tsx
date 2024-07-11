import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";

export const CountrySalesStats = () => {
  return (
    <CardWrapper flex="col" width="w-[390px]">
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">Country Sales Stats</p>
      <div className="border-t border-borderGray" />
      <div className="w-[358px] h-[381px] border border-borderGray">
        Insert Map
      </div>
      <div className="border-t border-borderGray" />
      <div>Stats</div>
    </CardWrapper>
  );
};
