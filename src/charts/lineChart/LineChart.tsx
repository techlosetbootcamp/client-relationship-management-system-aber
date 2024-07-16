"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, PointElement, LineElement , LinearScale, CategoryScale} from "chart.js";

ChartJs.register(PointElement, LineElement, LinearScale, CategoryScale);



const LineChart = ({datasets,labels,display}:any) => {
  return (
    <Line
      options={{
        scales: {
          x: {
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
        labels: labels,
        datasets: datasets,
      }}
    />
  );
};

export default LineChart;
