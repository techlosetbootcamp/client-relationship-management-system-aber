import React from "react";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import Avatar from "../avatar/Avatar";
import Pagination from "../pagination/Pagination";
import img1 from "@/assets/images/userImg1.svg";
import img2 from "@/assets/images/userImg2.svg";
import img3 from "@/assets/images/userImg3.svg";
import img4 from "@/assets/images/userImg4.svg";

const SalesHistoryData = [
  {
    name: "Jacob Swanson",
    country: "United States",
    sale: "$999.00",
    img: img1,
  },
  {
    name: "Amelia Johnson",
    country: "Canada",
    sale: "$1999.00",
    img: img2,
  },
  {
    name: "Eric Slater",
    country: "France",
    sale: "$2000.00",
    img: img3,
  },
  {
    name: "Aaron Chadwick",
    country: "United States",
    sale: "$399.00",
    img: img4,
  },
];

const SalesHistory = () => {
  return (
    <CardWrapper
      width="md:w-[344.45px] xl:w-[415px]"
      height="md:h-[265.6px] xl:h-[320px]"
      flexDirection="flex-col flex-1"
    >
      <div className="flex justify-between">
        <p className="font-barlow font-[600] text-[16px] leading-[24px] text-darkGray">
          Sales History
        </p>
        <Pagination />
      </div>
      <div className="border border-borderGray" />
      <p className="font-[600] xs:text-[10px] xl:text-[12px] xs:leading-[15px] xl:leading-[18px] font-albertSans text-mediumGray">
        RECENT
      </p>
      <div className="flex flex-col items-center gap-[4px]">
        {SalesHistoryData.map((item, i) => {
          return (
            <div
              key={i}
              className="w-full rounded-[5px] flex gap-[8px] items-center"
            >
              <Avatar
                img={item.img}
                height="xs:h-[33.2px] xl:h-[40px]"
                width="xs:w-[33.2px] xl:w-[40px]"
                radius="rounded-full"
                background=""
              />

              <div className="flex items-center justify-between flex-1">
                <div className="flex flex-col xs:gap-[3.32px] xl:gap-[4px]">
                  <p className="text-darkGray font-[500] xs:text-[12px] xl:text-[14px] xs:leading-[18px] xl:leading-[21px] font-barlow">
                    {item.name}
                  </p>
                  <p className="text-mediumGray font-[500] xs:text-[10px] xl:text-[12px] xs:leading-[15px] xl:leading-[18px] font-barlow">
                    {item.country}
                  </p>
                </div>
                <p className="text-mediumGray font-[500] xs:text-[12px] xl:text-[14px] xs:leading-[18px] xl:leading-[21px] font-barlow">
                  {item.sale}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
};

export default SalesHistory;
