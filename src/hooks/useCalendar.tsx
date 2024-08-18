"use client";
import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";

const useCalendar = () => {
  type SelectionRange = {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  const [range, setRange] = useState<SelectionRange[]>([
    {
      // startDate: new Date(),
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  useEffect(() => {
    setStartDate(format(range[0].startDate, 'PP'));
    setEndDate(format(range[0].endDate, 'PP'));
    setStartDay(format(range[0].startDate, 'dd'));
    setEndDay(format(range[0].endDate, 'dd'));
    setMonth(format(range[0].endDate, 'MMM'));
    setYear(format(range[0].endDate, 'yyyy'));
    setFormattedStartDate(format(range[0].startDate, 'yyyy-MM-dd'));
    setFormattedEndDate(format(range[0].endDate, 'yyyy-MM-dd'));
  }, [range]);

  // let startDate = format(range[0].startDate, "PP");
  // let end = format(range[0].endDate, "PP");
  // let startDay = format(range[0].startDate, "dd");
  // let endDay = format(range[0].endDate, "dd");
  // let month = format(range[0].endDate, "MMM");
  // let year = format(range[0].endDate, "yyyy");
  // let formattedStartDate = format(range[0].startDate, "yyyy-MM-dd");
  // let formattedEndDate = format(range[0].endDate, "yyyy-MM-dd");

  // useEffect(() => {
  //   startDate = format(range[0].startDate, "PP");
  //   end = format(range[0].endDate, "PP");
  //   startDay = format(range[0].startDate, "dd");
  //   endDay = format(range[0].endDate, "dd");
  //   month = format(range[0].endDate, "MMM");
  //   year = format(range[0].endDate, "yyyy");
  //   formattedStartDate = format(range[0].startDate, "yyyy-MM-dd");
  //   formattedEndDate = format(range[0].endDate, "yyyy-MM-dd");
  //   // This effect will run whenever the range changes
  //   console.log("Range updated:", range);
  // }, [range]);

  return {
    range,
    setRange,
    startDate,
    startDay,
    endDay,
    month,
    year,
    formattedStartDate,
    formattedEndDate
  };
};

export default useCalendar;
