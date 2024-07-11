import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";

export const CustomerDemographic = () => {
  return (
    <CardWrapper height="h-[396px]" flex="col">
      <p className="text-[16px] leading-[24px] text-darkGray font-semibold font-barlow">
        Customer Demographic
      </p>
      <div className="border-t border-borderGray" />
      <div>Insert Map</div>
    </CardWrapper>
  );
};
