"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, PointElement, LineElement } from "chart.js";

ChartJs.register(PointElement, LineElement);

const LineChart = () => {
  return (
    <Line
    
      options={{
        scales: {
          x: {
            ticks: {
              display: false,
            },
          },
          y: {
            ticks: {
              display: false,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
   
      data={{
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            label: "My First Dataset",
            data: [1, 2, 1, 7, 5, 6, 8],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }}
    />
  );
};

export default LineChart;
