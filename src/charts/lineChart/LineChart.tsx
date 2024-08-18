"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, PointElement, LineElement , LinearScale, CategoryScale,TimeScale} from "chart.js";
import 'chartjs-adapter-date-fns';
import useCalendar from "@/hooks/useCalendar";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";

ChartJs.register(PointElement, LineElement, LinearScale, CategoryScale,TimeScale);



const LineChart = ({datasets,labels,display}:any) => {
  const obj = useCalendarContext()
  // const {formattedStartDate,formattedEndDate,range} = useCalendar()
  // console.log(range,formattedStartDate,formattedEndDate)

  return (
    <Line
      options={{
        scales: {
          x: {
            type:"time",
            time:{
              unit:"day"
            },
            
            min:obj?.formattedStartDate,
            max:obj?.formattedEndDate,
            ticks: {
              display: display,
            },
          },
          y: {
            ticks: {
              display: display,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
      }}
      data={{
        // labels: labels,
        datasets: datasets,
      }}
    />
  );
};

export default LineChart;
