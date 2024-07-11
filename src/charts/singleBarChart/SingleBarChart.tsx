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

const SingleBarChart = () => {
  return (
    <Bar
    className=""
    
      options={{
        
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        
        scales: {
          x: {
            stacked: true,
            display:false,
            
            
           
          },
          y: {
            stacked: true,
            display:false
          },
        },
      }}
      data={{
        labels: ["Mobile Users"],
        yLabels: ["y"],
        

        datasets: [
          {
            label: "Value 1",
            data: [65],
            backgroundColor: ["#9A55FF", "#41A5FF"],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            borderSkipped : false,
            borderRadius : {
                topLeft : 10,
                topRight : 10,
                bottomLeft : 10,
                bottomRight : 10
            },
            
            
            // barPercentage : 40
          },
          
          {
            label: "Value 1",
            data: [35],
            backgroundColor: ["#9A55FF", "#41A5FF"],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            borderSkipped : false,
            borderRadius : {
                topLeft : 10,
                topRight : 10,
                bottomLeft : 10,
                bottomRight : 10
            },
          },
        ],
      }}
    />
  );
};

export default SingleBarChart;
