import Avatar from "@/components/avatar/Avatar";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";

const salesStats = [
  {
    heading: "Total Revenue",
    subHeading: "Orders",
    number: "$27,733.00",
    border: true,
  },
  {
    heading: "Total Sales",
    subHeading: "Products",
    number: "9234",
    border: true,
  },
  {
    heading: "Total Views",
    subHeading: "Views",
    number: "15,788",
    border: false,
  },
];

export const WeeklySalesStats = () => {
  // height-397 for overview page and height-387 for analytics page
  return (
    <CardWrapper width="w-[631px]" height="h-[387px]" flex="col">
      <p className="text-[16px] leading-[24px] text-darkGray font-barlow font-semibold">
        Sales Statistic
      </p>
      <div className="border-t border-borderGray" />

      {/* //USE BELOW CODE IN CODE-OVERVIEW PAGE ONLY AND HIDE IN ANALYTICS PAGE */}

      {/* <div className="flex gap-[8px]">
        {salesStats.map((item) => {
          return ( */}
      {/* // <>
            //   <div className="flex gap-[12px]"> */}
      {/* <Avatar size="small" img="" /> */}
      {/* //     <div className="flex flex-col gap-[12px]">
            //       <p>{item.heading}</p>
            //       <p className="text-[24px] leading-[36px] font-bold text-darkGray">
            //         {item.number}
            //         <span className="text-[#ADB5BD] text-[15px] leading-[22.5px] font-semibold">
            //           {item.subHeading}
            //         </span>
            //       </p>
            //     </div>
            //   </div> */}

      {/* //   {item.border && <div className="border border-borderGray" />} */}
      {/* // </>
          );
        })}
      </div> */}

      <div className="border-2 h-full">Insert Map</div>
    </CardWrapper>
  );
};
