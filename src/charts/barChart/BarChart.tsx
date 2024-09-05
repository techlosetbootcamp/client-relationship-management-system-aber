"use client";
import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale
} from "chart.js";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";


ChartJs.register(Tooltip, CategoryScale, LinearScale, BarElement,TimeScale);

type AxisProps = {
  axis: string;
};

const BarChart = ({ axis,data }: any) => {
  const obj = useCalendarContext()
  console.log("data in bar chart",data, data.labels)

  return (
    <Bar
      options={{

        /////////FIX IT///////////////
        ...(data?.labels?.length===0 && {

          scales: {
            x: {
              type:"time",
              time:{
                unit:"day"
              },
              min:obj?.formattedStartDate,
              max:obj?.formattedEndDate,
            },
          },
        }),
        
            
         
        indexAxis: axis,
        responsive: true,
        maintainAspectRatio: false,
      }}
      data={data}
    />
  );
};

export default BarChart;
