"use client";
import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement } from "chart.js";

ChartJs.register(ArcElement);


const DoughnutChart = ({ data, text, color, textStyle }: any) => {
  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart: any) {
      const { ctx, data } = chart;

      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();

      ctx.font = textStyle;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, centerX, centerY);
    },
  };
  return (
    <Doughnut
    
      plugins={[doughnutLabel]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins : {
          legend : {
            display : false
          }
        },
      }}
      data={data}
    />
  );
};

export default DoughnutChart;
