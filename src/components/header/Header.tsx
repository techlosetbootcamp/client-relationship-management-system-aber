"use client";
import React, { useState } from "react";
import Avatar from "@/components/avatar/Avatar";
import avatarImg from "@/assets/images/avatar.png";
import Calendar from "../calendar/Calendar";
import useCalendar from "@/hooks/useCalendar";
import Image from "next/image";

type HeaderProps = {
  text: string;
};
export const Header = ({ text }: HeaderProps) => {
  const { startDate, startDay, endDay, month, year, range } = useCalendar();
  console.log(startDate, startDay, endDay, range);
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between py-[41px]">
      <p className="text-[32px] leading-[48px] text-darkGray font-bold font-albertSans">
        {text}
      </p>
      <div className="flex border items-center gap-[16px]">
        <div>
          <Calendar />
        </div>

        <div className="flex gap-[8px] items-center">
          <Avatar
            img={avatarImg}
            size="h-[53px] w-[53px] rounded-full"
            background=""
          />
          <p className="text-[16px] leading-[24px] font-bold text-darkGray font-albertSans">
            Sophia Chester
          </p>
        </div>
      </div>
    </div>
  );
};
