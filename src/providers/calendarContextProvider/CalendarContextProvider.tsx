"use client";
import useCalendar from "@/hooks/useCalendar";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
type SelectionRange = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type CalenderProps = {
  range: SelectionRange[];
  //   setRange: {};
  setRange: Dispatch<SetStateAction<SelectionRange[]>>;
  startDate: string;
  startDay: string;
  endDay: string;
  month: string;
  year: string;
  formattedStartDate: string;
  formattedEndDate: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

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
