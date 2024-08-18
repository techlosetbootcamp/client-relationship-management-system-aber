import React from "react";
import Button from "../button/Button";
import img from "@/assets/images/ArrowUp.svg";
import Img2 from "@/assets/images/Icon6";
import Avatar from "../avatar/Avatar";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import BarChart from "@/charts/barChart/BarChart";
import StatusTag from "../statusTag/StatusTag";

const data = {
  labels: ["May", "Jun", "Jul"],
  datasets: [
    {
      label: "Dataset",
      data: [6500, 5000, 4000],

      backgroundColor: ["#9A55FF", "#41A5FF", "#ED4D5C"],

      borderWidth: 1,
    },
  ],
};

const Card2 = () => {
  return (
    <CardWrapper
      width="xl:w-[561px] lg:w-[459px] "
      height="xl:h-[240px] lg:h-[196px]"
      flexDirection=" xs:flex-col md:flex-row md:flex-1"
    >
      <div className="md:w-[45%] flex flex-col xs:gap-[13.91px] xl:gap-[17px]">
        <p className="font-[600] md:text-[13px] md:leading-[19.6px] xl:text-[16px] xl:leading-[24px] font-barlow">
          Monthly Income
        </p>
        <div className="flex justify-between">
          <p className="font-bold md:text-[19.6px] xl:text-[24px] md:leading-[24.5px] xl:leading-[36px] font-albertSans">
            $ 6,567.00
          </p>
          <div>
            <StatusTag
              text={"5.6%"}
              fontSize="text-[10.5px]"
              img={img}
              background={"bg-lightGreen"}
              color={"text-secondaryGreen"}
              lineHeight="leading-[15.75px]"
            />
          </div>
        </div>
        <p className="text-mediumGray md:text-[12px] xl:text-[14px] md:leading-[18px] xl:leading-[21px] font-barlow font-[500]">
          Compared to the previous month
        </p>
        <div className="border border-divider w-full" />

        <div className="flex xs:gap-[9.82px] xl:gap-[12px] items-center">
          <Avatar
            img={<Img2 fill="fill-white" hover="" />}
            height="xs:h-[23.32px] xl:h-[28.5px]"
            width="xs:w-[23.32px] xl:w-[28.5px]"
            radius="rounded-full"
            background="bg-primaryPurple"
          />
          <div>
            <p className="text-darkGray md:text-[12.2px] xl:text-[15px] font-semibold md:leading-[18.4px] xl:leading-[22.5px] font-barlow ">
              Accounting
            </p>
            <p className="text-mediumGray md:text-[12.2px] xl:text-[15px] font font-medium md:leading-[18.4px] xl:leading-[22.5px] font-barlow ">
              July 1, 2023 - July 31, 2023
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-[55%] h-full flex items-center">
        <BarChart axis="y" data={data} />
      </div>
    </CardWrapper>
  );
};

export default Card2;
