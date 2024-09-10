"use client";
import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
} from "chart.js";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";

ChartJs.register(Tooltip, CategoryScale, LinearScale, TimeScale, BarElement);

const WeeklyScheduleMatrix = () => {
  const obj = useCalendarContext();
  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              color: "transparent",
            },

            type: "time",
            time: {
              unit: "day",
            },
          },
          y: {
            grid: {
              display: false,
              drawOnChartArea: true,
              drawTicks: false,
            },
            border: {
              color: "transparent",
            },
            grace: "5%",
            ticks: {
              labelOffset: -22,
              align: "center",
              crossAlign: "center",
            },

            min: 1,
            max: 6,
          },
        },
      }}
      data={{
        datasets: [
          {
            label: "My First Dataset",
            data: [
              { x: new Date(2024, 7, 1), y: [1, 2], sales: 700 },
              { x: new Date(2024, 7, 1), y: [2, 3], sales: 200 },
              { x: new Date(2024, 7, 1), y: [3, 4], sales: 2000 },
              { x: new Date(2024, 7, 1), y: [4, 5], sales: 6000 },
              { x: new Date(2024, 7, 1), y: [5, 6], sales: 1500 },

              { x: new Date(2024, 7, 2), y: [1, 2], sales: 1700 },
              { x: new Date(2024, 7, 2), y: [2, 3], sales: 700 },
              { x: new Date(2024, 7, 2), y: [3, 4], sales: 12000 },
              { x: new Date(2024, 7, 2), y: [4, 5], sales: 60 },
              { x: new Date(2024, 7, 2), y: [5, 6], sales: 1500 },

              { x: new Date(2024, 7, 3), y: [1, 2], sales: 70 },
              { x: new Date(2024, 7, 3), y: [2, 3], sales: 200 },
              { x: new Date(2024, 7, 3), y: [3, 4], sales: 2000 },
              { x: new Date(2024, 7, 3), y: [4, 5], sales: 3000 },
              { x: new Date(2024, 7, 3), y: [5, 6], sales: 100 },

              { x: new Date(2024, 7, 4), y: [1, 2], sales: 120 },
              { x: new Date(2024, 7, 4), y: [2, 3], sales: 12200 },
              { x: new Date(2024, 7, 4), y: [3, 4], sales: 2000 },
              { x: new Date(2024, 7, 4), y: [4, 5], sales: 5000 },
              { x: new Date(2024, 7, 4), y: [5, 6], sales: 500 },

              { x: new Date(2024, 7, 5), y: [1, 2], sales: 120 },
              { x: new Date(2024, 7, 5), y: [2, 3], sales: 12200 },
              { x: new Date(2024, 7, 5), y: [3, 4], sales: 2000 },
              { x: new Date(2024, 7, 5), y: [4, 5], sales: 5000 },
              { x: new Date(2024, 7, 5), y: [5, 6], sales: 500 },

              { x: new Date(2024, 7, 6), y: [1, 2], sales: 120 },
              { x: new Date(2024, 7, 6), y: [2, 3], sales: 12200 },
              { x: new Date(2024, 7, 6), y: [3, 4], sales: 2000 },
              { x: new Date(2024, 7, 6), y: [4, 5], sales: 5000 },
              { x: new Date(2024, 7, 6), y: [5, 6], sales: 500 },

              { x: new Date(2024, 7, 7), y: [1, 2], sales: 70 },
              { x: new Date(2024, 7, 7), y: [2, 3], sales: 200 },
              { x: new Date(2024, 7, 7), y: [3, 4], sales: 2000 },
              { x: new Date(2024, 7, 7), y: [4, 5], sales: 3000 },
              { x: new Date(2024, 7, 7), y: [5, 6], sales: 100 },
            ],
            backgroundColor: (ctx: any) => {
              const sales = ctx?.raw?.sales;
              if (sales >= 0 && sales <= 500) {
                return "rgb(231, 215, 255)";
              } else if (sales >= 501 && sales <= 1000) {
                return "rgb(207, 175, 255)";
              } else if (sales >= 1001 && sales <= 5000) {
                return "rgb(154, 85, 255)";
              } else if (sales >= 5001) {
                return "rgb(71, 23, 142)";
              }
            },

            borderColor: ["transparent"],
            borderWidth: 4,
            borderSkipped: false,
            borderRadius: 10,
          },
        ],
      }}
    />
  );
};

export default WeeklyScheduleMatrix;
