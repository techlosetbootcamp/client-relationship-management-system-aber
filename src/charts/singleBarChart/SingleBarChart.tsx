"use client";
import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
} from "chart.js";

ChartJs.register(Tooltip,Legend, CategoryScale, LinearScale, BarElement);

const SingleBarChart = () => {
  // const barLabels = {
  //   id : "barLabels",
  //   afterDatasetDraw(chart, args, plugins){
  //     const {ctx, data} = chart
  //     console.log(chart.getDatasetMeta(0)._parsed[0],chart.getDatasetMeta(1)._parsed[0])

  //     ctx.save();
  //     chart.getDatasetMeta(0)._parsed.forEach((dataPoint, index) => {
  //       // console.log(dataPoint.x,"y", dataPoint.y)
  //       ctx.font = "bold 16px barlow"
  //       ctx.fillStyle = "Black"
  //       ctx.fillText(dataPoint.x, dataPoint.x-50, 8)
        
  //     });
  //     chart.getDatasetMeta(1)._parsed.forEach((dataPoint, index) => {
  //       console.log(dataPoint.x,"y", dataPoint.y)
  //       ctx.font = "bold 16px barlow"
  //       ctx.fillStyle = "Black"
  //       ctx.fillText(dataPoint.x, dataPoint.x+800,8)
        
  //     });
  //   }
  // }
  return (
    <Bar
    // plugins={[barLabels]}
    
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
      }}
      data={{
        labels: ["eh"],
        yLabels: ["y"],

        datasets: [
          {
            label: "Value 1",
            data: [[0,65]],
            backgroundColor: ["#9A55FF", "#41A5FF"],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            borderSkipped: false,
            borderRadius: {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10,
            },

          
          },

          {
            label: "Value 1",
            data: [[5,35]],
            backgroundColor: ["#9A55FF", "#41A5FF"],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            borderSkipped: false,
            borderRadius: {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10,
            },
           
          },
        ],
      }}
    />
  );
};

export default SingleBarChart;
