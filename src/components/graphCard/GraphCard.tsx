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

const chartDataset = [
  
{
  label: "My First Dataset",
  data: [1, 2, 1, 7, 5, 6, 8],
  fill: false,
  borderColor: "rgb(75, 192, 192)",
  tension: 0.1,
},
]

const chartlabels= [1, 2, 3, 4, 5, 6, 7]

const GraphCard = ({ btnText, img, color, background }: GraphCardProps) => {
  return (
    <CardWrapper width="sm:w-[190px] sm:flex-1 xl:w-[233px]" height="sm:h-[196px] md:h-[240px] lg:h-[196px] xl:h-[240px]" flex="flex-col">
      <div className="">

      <Avatar
        img={<Img2 fill="fill-white" hover=""/>}
        size="sm:h-[23.32px] xl:h-[28.5px] sm:w-[23.32px]  xl:w-[28.5px] rounded-full"
        background="bg-primaryPurple"
        />
        </div>

      <p className="font-semibold font-barlow sm:text-[12.2px] xl:text-[15px] sm:leading-[18.4px] xl:leading-[22.5px]  text-mediumGray">
        Total Profit
      </p>
      <div className="flex justify-between">
        <p className="font-bold sm:text-[19.6px] xl:text-[24px] sm:leading-[24.5px] xl:leading-[36px] font-albertSans">$ 3,393.00</p>
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
            border=""
          />
        </div>
      </div>

      <div className=" sm:h-[62.5px] md:h-[77px] lg:h-[62.5px] xl:h-[77px]">
        <LineChart datasets={chartDataset} labels={chartlabels} display={false}/>
      </div>
    </CardWrapper>
  );
};

export default GraphCard;
