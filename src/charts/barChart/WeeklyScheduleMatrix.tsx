"use client";
import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJs.register(Tooltip, CategoryScale, LinearScale, BarElement);

// type AxisProps = {
//   axis: string;
// };

const WeeklyScheduleMatrix = () => {
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
            border:{
                color : "transparent"
            },
          },
          y: {
            grid: {
              display: false,
              drawOnChartArea:false,
              drawTicks:false,
             
            },
            border:{
                color : "transparent"
            },
            grace: "5%",
            ticks: {
              labelOffset: -22,
              align: "center",
              crossAlign: "center",
              //   autoSkip: true,
              // stepSize: 1,
            },

            min: 1,
            max: 6,
          },
        },
      }}
      data={{
        labels: ["1Jul", "2Jul", "3Jul", "4Jul", "5Jul", "6Jul", "7Jul"],
        yLabels: ["1pm", "2pm", "3pm", "4pm", "5pm"],
        datasets: [
          {
            label: "My First Dataset",
            data: [
              { x: "1Jul", y: [1, 2], sales: 700 },
              { x: "1Jul", y: [2, 3], sales: 200 },
              { x: "1Jul", y: [3, 4], sales: 2000 },
              { x: "1Jul", y: [4, 5], sales: 6000 },
              { x: "1Jul", y: [5, 6], sales: 1500 },

              { x: "2Jul", y: [1, 2], sales: 1700 },
              { x: "2Jul", y: [2, 3], sales: 700 },
              { x: "2Jul", y: [3, 4], sales: 12000 },
              { x: "2Jul", y: [4, 5], sales: 60 },
              { x: "2Jul", y: [5, 6], sales: 1500 },

              { x: "3Jul", y: [1, 2], sales: 70 },
              { x: "3Jul", y: [2, 3], sales: 200 },
              { x: "3Jul", y: [3, 4], sales: 2000 },
              { x: "3Jul", y: [4, 5], sales: 3000 },
              { x: "3Jul", y: [5, 6], sales: 100 },

              { x: "4Jul", y: [1, 2], sales: 120 },
              { x: "4Jul", y: [2, 3], sales: 12200 },
              { x: "4Jul", y: [3, 4], sales: 2000 },
              { x: "4Jul", y: [4, 5], sales: 5000 },
              { x: "4Jul", y: [5, 6], sales: 500 },

              { x: "5Jul", y: [1, 2], sales: 120 },
              { x: "5Jul", y: [2, 3], sales: 12200 },
              { x: "5Jul", y: [3, 4], sales: 2000 },
              { x: "5Jul", y: [4, 5], sales: 5000 },
              { x: "5Jul", y: [5, 6], sales: 500 },

              { x: "6Jul", y: [1, 2], sales: 120 },
              { x: "6Jul", y: [2, 3], sales: 12200 },
              { x: "6Jul", y: [3, 4], sales: 2000 },
              { x: "6Jul", y: [4, 5], sales: 5000 },
              { x: "6Jul", y: [5, 6], sales: 500 },

              { x: "7Jul", y: [1, 2], sales: 70 },
              { x: "7Jul", y: [2, 3], sales: 200 },
              { x: "7Jul", y: [3, 4], sales: 2000 },
              { x: "7Jul", y: [4, 5], sales: 3000 },
              { x: "7Jul", y: [5, 6], sales: 100 },
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
            // backgroundColor: [
            //   "rgba(255, 99, 132, 0.2)",
            // //   "rgba(255, 159, 64, 0.2)",
            // //   "rgba(255, 205, 86, 0.2)",
            // //   "rgba(75, 192, 192, 0.2)",
            // //   "rgba(54, 162, 235, 0.2)",
            // //   "rgba(153, 102, 255, 0.2)",
            // //   "rgba(201, 203, 207, 0.2)",
            // ],
            borderColor: [
              "transparent",
              //   "rgb(255, 99, 132)",
              //   "rgb(255, 159, 64)",
              //   "rgb(255, 205, 86)",
              //   "rgb(75, 192, 192)",
              //   "rgb(54, 162, 235)",
              //   "rgb(153, 102, 255)",
              //   "rgb(201, 203, 207)",
            ],
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
