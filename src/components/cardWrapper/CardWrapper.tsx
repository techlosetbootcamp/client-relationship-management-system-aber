import { CardWrapperProps } from "@/types/Types";
import React from "react";

export const CardWrapper = ({
  height,
  width,
  flexDirection,
  children,
}: CardWrapperProps) => {
  return (
    <div
      className={`bg-white rounded-[10.5px] border-[0.75px] border-borderGray  flex xs:gap-[9.82px] xl:gap-[12px] ${flexDirection} ${width} ${height} xs:py-[19.92px] xl:py-[24px] xs:px-[13.28px] xl:px-[16px]`}
    >
      {children}
    </div>
  );
};
