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
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setStartDate(format(range[0].startDate, "PP"));
    setEndDate(format(range[0].endDate, "PP"));
    setStartDay(format(range[0].startDate, "dd"));
    setEndDay(format(range[0].endDate, "dd"));
    setMonth(format(range[0].endDate, "MMM"));
    setYear(format(range[0].endDate, "yyyy"));
    setFormattedStartDate(format(range[0].startDate, "yyyy-MM-dd"));
    setFormattedEndDate(format(range[0].endDate, "yyyy-MM-dd"));
  }, [range]);

  return {
    range,
    setRange,
    startDate,
    startDay,
    endDay,
    month,
    year,
    formattedStartDate,
    formattedEndDate,
    isOpen,
    setIsOpen,
  };
};

export default useCalendar;
