import React from "react";
// import img from "@/assets/images/ArrowUp.svg";
import Img2 from "@/assets/images/Icon3";
import Button from "../button/Button";
import Image, { StaticImageData } from "next/image";
import Avatar from "../avatar/Avatar";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import LineChart from "@/charts/lineChart/LineChart";

type GraphCardProps = {
  btnText: string;
  img: string | StaticImageData;
  color: string;
  background: string;
};

const GraphCard = ({ btnText, img, color, background }: GraphCardProps) => {
  return (
    <CardWrapper width="w-[233px]" height="h-[240px]" flex="col">
      <div className="">

      <Avatar
        img={<Img2 fill="fill-white" hover=""/>}
        size="h-[28.5px] w-[28.5px] rounded-full"
        background="bg-primaryPurple"
        />
        </div>

      <p className="font-semibold font-barlow text-[15px] leading-[22.5px] text-mediumGray">
        Total Profit
      </p>
      <div className="flex justify-between">
        <p className="font-bold text-[24px] leading-[36px] font-albertSans">$ 3,393.00</p>
        <div>
          <Button
            text={btnText}
            fontSize="text-[10.5px]"
            img={img}
            background={background}
            color={color}
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

      <div className="h-[77px]">
        <LineChart/>
      </div>
    </CardWrapper>
  );
};

export default GraphCard;
