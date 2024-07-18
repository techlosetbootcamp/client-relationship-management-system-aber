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

// customPlugin.ts


export const customPlugin = {
  id: 'customPlugin',
  afterDatasetsDraw: (chart: ChartJs) => {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (!meta.hidden) {
        meta.data.forEach((bar, index) => {
          const data = dataset.data[index] as [number, number];
          console.log("data in single bar", data[0], data[1])
          const startValue = data[1];
          const position = bar.getProps(['x', 'y', 'base', 'width', 'height'], true);

          // Custom text to display
          const customText = `Start: ${startValue}\nEnd: i am here`;
          const lines = customText.split('\n')

          // Draw the text at the top of each dataset
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          // Calculate the correct position to place the text at the top of the bar
          lines.forEach((line, lineIndex) => {
            console.log("line", line)
            
          if (chart.config.options?.indexAxis === 'y') {
            ctx.fillText(line, position.base + 30, (position.y  * lineIndex));
            console.log((position.y  * lineIndex),line, lineIndex)
          } else {
            ctx.fillText(line, position.x +15, position.y);
          }
        })
        });
      }
    });
  },
};


ChartJs.register(Tooltip,Legend, CategoryScale, LinearScale, BarElement, customPlugin);

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
        // plugins: {
        //   customPlugin:{}// Enable the custom plugin
        // },
      }}
      plugins={[customPlugin]}
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
