import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import React from "react";
import dynamic from "next/dynamic";
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
    <CardWrapper height="h-[396px]" flexDirection="flex-col" width="w-full">
      <p className="text-[16px] leading-[24px] text-darkGray font-semibold font-barlow">
        Customer Demographic
      </p>
      <div className="border-t border-borderGray" />
      <div className="h-[416px]">
        <Map  hover={false} fill={true} zoom={4} longitude={38.0311988} latitude={-102.1390331}/>
      </div>
    </CardWrapper>
  );
};
