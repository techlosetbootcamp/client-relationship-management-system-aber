"use client";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import dropDown from "@/assets/images/dropdownArrow.svg";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";

const Calendar = () => {
  const obj = useCalendarContext();

  return (
    <div>
      <div
        onClick={() => obj?.setIsOpen(!obj?.isOpen)}
        className="z-80 relative bg-primaryPurple text-white cursor-pointer items-center flex text-[16px] leading-[24px] font-[600] font-albertSans py-[6px] px-[12px] rounded-[4px] gap-[4px]"
      >
        {obj?.startDay != obj?.endDay ? (
          <p>
            {obj?.startDay} - {obj?.endDay} {obj?.month}, {obj?.year}
          </p>
        ) : (
          <p>{obj?.startDate}</p>
        )}

        <Image src={dropDown} alt="" />
      </div>
      <div
        className={`absolute mt-[16px] right-[75px] ${
          obj?.isOpen ? "block" : "hidden"
        }`}
      >
        <DateRange
          onChange={(item) => {
            const selection = item.selection;
            if (selection) {
              obj?.setRange([
                {
                  startDate: selection.startDate || new Date(),
                  endDate: selection.endDate || new Date(),
                  key: selection.key || "selection",
                },
              ]);
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={obj?.range}
          months={1}
          className="rounded-lg shadow-lg relative z-10"
          date={new Date()}
        />
      </div>
    </div>
  );
};

export default Calendar;
