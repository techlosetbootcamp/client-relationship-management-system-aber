import React from "react";

//TRY TO ADD HEADING AND BORDER AFTER HEADING IN THIS. INCLUDE MAP AS WELL

type CardWrapperProps = {
  height: string;
  width: string;
  flexDirection: string;
  children: React.ReactNode;
};

// export const CardWrapper = (props: any) => {
export const CardWrapper = ({
  height,
  width,
  flexDirection,
  children,
}: CardWrapperProps) => {
  //  py-[${props.reverse ? "16px" : "24px"}] px-[${
  //   props.reverse ? "24px" : "16px"
  // }]
  return (
    <div
      className={`bg-white rounded-[10.5px] border-[0.75px] border-borderGray  flex xs:gap-[9.82px] xl:gap-[12px] ${flexDirection} ${width} ${height} py-[24px] px-[16px]`}
    >
      {children}
    </div>
  );
};
