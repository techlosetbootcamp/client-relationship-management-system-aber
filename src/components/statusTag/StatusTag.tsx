import { StatusTagProps } from "@/types/Types";
import React from "react";
import Image from "next/image";

const StatusTag = ({
  background,
  img,
  color,
  text,
  fontSize,
  lineHeight,
  Icon,
}: StatusTagProps) => {
  return (
    <div
      className={`${background}  rounded-[15.75px] gap-[3px] px-[6px] py-[0.75px]  flex items-center justify-center`}
    >
      {img && <Image src={img} alt="icon" />}
      {Icon && <Icon color="white" size={25} />}

      <p
        className={`${color} ${fontSize} ${lineHeight} font-[700] font-albertSans`}
      >
        {text}
      </p>
    </div>
  );
};

export default StatusTag;
