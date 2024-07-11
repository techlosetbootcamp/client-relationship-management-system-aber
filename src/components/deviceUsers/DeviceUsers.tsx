import SingleBarChart from "@/charts/singleBarChart/SingleBarChart";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";

export const DeviceUsers = () => {
  return (
    <CardWrapper height="h-[146px]">
      <div className="flex items-center w-full">
        <SingleBarChart/>
      </div>
    </CardWrapper>
  );
};
