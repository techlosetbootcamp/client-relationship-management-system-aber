"use client";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import dropDown from "@/assets/images/dropdownArrow.svg";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";
import useCalendar from "@/hooks/useCalendar";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";

// type SelectionRange = {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// };

const Calendar = () => {
  // const { range, setRange, startDate, startDay, endDay, month, year } =
  //   useCalendar();
  const [isOpen, setIsOpen] = useState(false);

  const obj = useCalendarContext();
  // console.log("range", obj?.range, format(obj?.range[0].startDate, "PP"));
  console.log("calendar provider", obj);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="z-10 h-[38px] bg-primaryPurple text-white cursor-pointer items-center flex text-[16px] leading-[24px] font-[600] font-albertSans py-[6px] px-[12px] rounded-[4px] gap-[4px]"
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
          isOpen ? "block" : "hidden"
        }`}
      >
        <DateRange
          //   onChange={(item) => setRange([item.selection])}
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
          //   editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={obj?.range}
          months={1}
          // direction='horizontal'
          className="rounded-lg shadow-lg"
          date={new Date()}
          // onChange={handleSelect}
        />
      </div>
    </div>
  );
};

export default Calendar;

// const start = format(range[0].startDate, "PP");
// const end = format(range[0].endDate, "PP");
// const startDay = format(range[0].startDate, "dd");
// const endDay = format(range[0].endDate, "dd");
// const month = format(range[0].endDate, "MMM");
// const year = format(range[0].endDate, "yyyy");
// console.log(startDay, endDay, month, year);
// import { addDays } from 'date-fns'
// import {format} from 'date-fns'
// import "date-fns"

// const handleSelect = (date: any) => {
//     console.log(date); // native Date object
//     console.log(format(date,"MM/dd/yyyy")); // native Date object
//   }
