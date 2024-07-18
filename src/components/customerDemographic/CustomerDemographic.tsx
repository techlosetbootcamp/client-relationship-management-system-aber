import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import dynamic from "next/dynamic";
import React from "react";
const Map = dynamic(()=> import("@/components/map/Map"),{
  ssr : false
})

const handleMouseOver = (e: any) => {
  const layer = e.target;
  layer.setStyle({
    fillOpacity: 0.7,
    weight: 1,
    dashArray: "",
    color: "#666",
  });
};

const handleMouseOut = (e: any) => {
  const layer = e.target;
  layer.setStyle({
    fillOpacity: 0.7,
    weight: 1,
    color: "white",
  });
};


// const mapEventHandlers = {
//   mouseover : handleMouseOver,
//   mouseout: handleMouseOut,

// }
// const handleClick = (e: any) => {
//   // Define click handler logic
// };

export const CustomerDemographic = () => {
  return (
    <CardWrapper height="h-[396px]" flex="flex-col">
      <p className="text-[16px] leading-[24px] text-darkGray font-semibold font-barlow">
        Customer Demographic
      </p>
      <div className="border-t border-borderGray" />
      <div className="h-[416px]">
        <Map  />
      </div>
    </CardWrapper>
  );
};
