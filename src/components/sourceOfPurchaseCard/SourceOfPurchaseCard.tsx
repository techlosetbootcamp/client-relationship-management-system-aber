import DoughnutChart from "@/charts/doughnutChart/DoughnutChart";
import React from "react";
import { CardWrapper } from "../cardWrapper/CardWrapper";

const data = {
  labels: ["D1", "D2", "D3"],
  datasets: [
    {
      label: "Dataset",
      data: [35, 49, 16],
      backgroundColor: ["#62912C", "#41A5FF", "#ED4D5C"],
      hoverOffset: 4,
      rotation: -24,
      borderColor: "transparent",
    },
  ],
};

const SourceData = [
  {
    text: "Social Media",
    background: "bg-secondaryBlue",
    percentage: "49%",
  },
  {
    text: "Direct Search",
    background: "bg-secondaryGreen",
    percentage: "35%",
  },
  {
    text: "Others",
    background: "bg-secondaryRed",
    percentage: "16%",
  },
];

const SourceOfPurchaseCard = () => {
  return (
    <CardWrapper width="md:w-[229.91px] xl:w-[277px]" height="md:h-[355.24px] xl:h-[428px]" flexDirection="flex-col">
      <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
        Source of Purchases
      </p>
      <div className="border border-borderGray" />
      <div className="md:h-[200px] md:w-[200px] xl:h-[241px]">
        <DoughnutChart
          data={data}
          textStyle="bold 32px albert-sans"
          text="100%"
          color="Black"
        />
      </div>
      <div className="flex flex-col md:gap-[9.96px] xl:gap-[12px]">
        {SourceData.map((source) => {
          return (
            <div key={source.text} className="flex items-center justify-between">
              <div className="flex gap-[8px] items-center">
                <div
                  className={`h-[10.5px] w-[10.5px] rounded-full ${source.background}`}
                />
                <p className="font-[600] text-[12px] leading-[18px] text-[#ADB5BD] font-barlow">
                  {source.text}
                </p>
              </div>
              <p className="font-[700] text-[14px] leading-[21px] text-darkGray font-albertSans">
                {source.percentage}
              </p>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
};

export default SourceOfPurchaseCard;
