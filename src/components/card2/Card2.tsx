import React from "react";
import Button from "../button/Button";
import img from "@/assets/images/ArrowUp.svg";
import Img2 from "@/assets/images/Icon6";
import Avatar from "../avatar/Avatar";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import BarChart from "@/charts/barChart/BarChart";



const data={
  labels: ["May", "Jun", "Jul"],
  datasets: [
    {
      label: "Dataset",
      data: [6500, 5000, 4000],

      backgroundColor: ["#9A55FF", "#41A5FF", "#ED4D5C"],

      borderWidth: 1,
    },
  ],
}




const Card2 = () => {
  return (
    <CardWrapper width="w-[561px]" height="h-[240px]" flex="row">
      <div className="w-full flex flex-col gap-[17px]">
        <p className="font-[600] font-barlow">Monthly Income</p>
        <div className="flex justify-between">
          <p className="font-bold text-[24px] leading-[36px] font-albertSans">$ 6,567.00</p>
          <div>
            <Button
              text={"5.6%"}
              fontSize="text-[10.5px]"
              img={img}
              background={"bg-lightGreen"}
              color={"text-secondaryGreen"}
              width="w-fit"
              gap="gap-[3px]"
              fontWeight="font-bold"
              rounded="rounded-[15.75px]"
              lineHeight="leading-[15.75px]"
              py="py-[0.75px]"
              px="px-[6px]"
            />
          </div>
        </div>
        <p className="text-mediumGray text-[14px] leading-[21px] font-barlow font-[500]">
          Compared to the previous month
        </p>
        <div className="border border-divider w-full" />

        <div className="flex gap-[12px] items-center">
          <Avatar
            img={<Img2 fill="fill-white" hover=""/>}
            size="h-[28.5px] w-[28.5px] rounded-full"
            background="bg-primaryPurple"
          />
          <div>
            <p className="text-darkGray text-[15px] font-semibold leading-[22.5px] font-barlow ">
              Accounting
            </p>
            <p className="text-mediumGray text-[15px] font-medium leading-[22.5px] font-barlow ">
              July 1, 2023 - July 31, 2023
            </p>
          </div>
        </div>

      </div>
      <div className="w-full h-full flex items-center">
        <BarChart axis="y" data={data}/>
      </div>
    </CardWrapper>
  );
};

export default Card2;
