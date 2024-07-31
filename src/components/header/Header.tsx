"use client"
import React, { useState } from "react";
import Avatar from "@/components/avatar/Avatar";
import avatarImg from "@/assets/images/avatar.png";
import dropDown from "@/assets/images/dropdownArrow.svg";
import Calendar from "../calendar/Calendar";
import useCalendar from "@/hooks/useCalendar";
import Image from "next/image";

type HeaderProps = {
  text: string;
};
export const Header = ({ text }: HeaderProps) => {
  const {startDate,startDay,endDay,month,year,range} = useCalendar()
  console.log(startDate,startDay,endDay,range)
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between py-[41px]">
      <p className="text-[32px] leading-[48px] text-darkGray font-bold font-albertSans">
        {text}
      </p>
      <div className="flex border items-center gap-[16px]">
        <div>
          <div onClick={()=>setIsOpen(!isOpen)} className="z-10 h-[38px] bg-primaryPurple text-white items-center flex text-[16px] leading-[24px] font-[600] font-albertSans py-[6px] px-[12px] rounded-[4px] gap-[4px]">

        {startDay != endDay ? (
          <p>
            {startDay} - {endDay} {month}, {year}
          </p>
        ) : (
          <p>{startDate}</p>
        )}

            <Image src={dropDown} alt="" />
          </div>
          <div className={`absolute right-20 ${isOpen ? "block" : "hidden"}`}>
          <Calendar/> 

          </div>

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
