"use client";
import React, { useState } from "react";
import Avatar from "@/components/avatar/Avatar";
import avatarImg from "@/assets/images/avatar.png";
import Calendar from "../calendar/Calendar";
import useCalendar from "@/hooks/useCalendar";
import Image from "next/image";

type HeaderProps = {
  text: string;
  avatar : boolean
};
export const Header = ({ text ,avatar}: HeaderProps) => {
  const { startDate, startDay, endDay, month, year, range } = useCalendar();
  console.log(startDate, startDay, endDay, range);
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex md:flex-row xs:flex-col xs:flex-col-reverse xs:gap-[26.5px] md:justify-between py-[41px] w-full">
      <p className="xs:text-[26px] xs:leading-[40px] xl:text-[32px] xl:leading-[48px] text-darkGray font-bold font-albertSans">
        {text}
      </p>
      <div className={`${avatar ? "flex" : "hidden" } items-center gap-[16px] justify-between`}>
        <div>
          <Calendar />
        </div>

        <div className="flex gap-[8px] items-center">
          <Avatar
            img={avatarImg}
            height="h-[53px]"
            width="w-[53px]"
            radius="rounded-full"
            background=""
          />
          <p className="xs:text-[13px] xs:leading-[20px] xl:text-[16px] xl:leading-[24px] font-bold text-darkGray font-albertSans">
            Sophia Chester
          </p>
        </div>
      </div>
    </div>
  );
};
