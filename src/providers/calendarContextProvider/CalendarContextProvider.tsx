"use client";
import useCalendar from "@/hooks/useCalendar";
import { CalenderProps } from "@/types/Types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";


const CalenderContext = createContext<CalenderProps | null>(null);

const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    range,
    setRange,
    startDate,
    startDay,
    endDay,
    month,
    year,
    formattedEndDate,
    formattedStartDate,
    isOpen,
    setIsOpen,
  } = useCalendar();
  return (
    <CalenderContext.Provider
      value={{
        range,
        setRange,
        startDate,
        startDay,
        endDay,
        month,
        year,
        formattedEndDate,
        formattedStartDate,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CalenderContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalenderContext);

export default CalendarContextProvider;
