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

const BarChart = () => {
    
  return (
    <Bar
   
    options={{
        indexAxis : "y",
        responsive:true,
        maintainAspectRatio:false
    }}
      data={{
        labels: ["May", "Jun", "Jul"],
        datasets: [
          {
           
            label: "Dataset",
            data: [6500, 5000, 4000],
            
            backgroundColor: [
              "#9A55FF",
              "#41A5FF",
              "#ED4D5C",
              
            ],
       
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default BarChart;
