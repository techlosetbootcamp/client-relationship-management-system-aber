"use client";
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

  let startDate = format(range[0].startDate, "PP");
  let end = format(range[0].endDate, "PP");
  let startDay = format(range[0].startDate, "dd");
  let endDay = format(range[0].endDate, "dd");
  let month = format(range[0].endDate, "MMM");
  let year = format(range[0].endDate, "yyyy");

  useEffect(() => {
    startDate = format(range[0].startDate, "PP");
    end = format(range[0].endDate, "PP");
    startDay = format(range[0].startDate, "dd");
    endDay = format(range[0].endDate, "dd");
    month = format(range[0].endDate, "MMM");
    year = format(range[0].endDate, "yyyy");
    // This effect will run whenever the range changes
    console.log("Range updated:", range);
  }, [range]);

  return {
    range,
    setRange,
    startDate,
    startDay,
    endDay,
    month,
    year,
  };
};

export default useCalendar;
