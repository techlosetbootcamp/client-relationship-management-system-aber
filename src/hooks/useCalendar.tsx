"use client"
import { format } from "date-fns";
import React, { useEffect, useState } from "react";


const useCalendar = () => {
    type SelectionRange = {
      startDate: Date;
      endDate: Date;
      key: string;
    };
  const [range, setRange] = useState<SelectionRange[]>([
    {
      startDate: new Date(),
      //   endDate: addDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    // This effect will run whenever the range changes
    console.log("Range updated:", range);
  }, [range]); 

  const startDate = format(range[0].startDate, "PP");
  const end = format(range[0].endDate, "PP");
  const startDay = format(range[0].startDate, "dd");
  const endDay = format(range[0].endDate, "dd");
  const month = format(range[0].endDate, "MMM");
  const year = format(range[0].endDate, "yyyy");
  return {
    range,
    setRange,
    startDate,
    startDay,
    endDay,
    month,
    year
  };
};

export default useCalendar;
