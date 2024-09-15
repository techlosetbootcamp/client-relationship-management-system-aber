"use client";
import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";

ChartJs.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SingleBarChart = () => {
  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",

        scales: {
          x: {
            stacked: true,
            display: false,
          },
          y: {
            stacked: true,
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          
        },
        layout: {
          padding: 0,
        },
      }}
      data={{
        labels: ["users"],

        datasets: [
          {
            label: "Desktop Users",
            data: [[0, 65]],
            backgroundColor: ["#41A5FF"],
            borderColor: "#41A5FF",
            borderWidth: 1,
            borderSkipped: false,
            barPercentage: 1,
            borderRadius: {
              topLeft: 5,
              topRight: 0,
              bottomLeft: 5,
              bottomRight: 0,
            },
          },

          {
            label: "Mobile Users",
            data: [[5, 35]],
            backgroundColor: ["#62912C"],
            borderColor: "#62912C",
            borderWidth: 1,
            borderSkipped: false,
            barPercentage: 1,
            borderRadius: {
              topLeft: 0,
              topRight: 5,
              bottomLeft: 0,
              bottomRight: 5,
            },
          },
        ],
      }}
    />
  );
};

export default SingleBarChart;
