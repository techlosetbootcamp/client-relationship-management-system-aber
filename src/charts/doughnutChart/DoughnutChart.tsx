"use client";
import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Title } from "chart.js";

ChartJs.register(ArcElement);

// data={{
//   labels: ["D1", "D2"],
//   datasets: [
//     {
//       label: "Dataset",
//       data: [2040, 3000],
//       backgroundColor: ["rgb(221, 198, 255)", "rgb(255, 255, 255)"],
//       hoverOffset: 4,
//       rotation: -24,
//       borderColor: "transparent",
//     },
//   ],
// }}

// const doughnutLabel = {
//   id: "doughnutLabel",
//   afterDatasetsDraw(chart: any) {
//     const { ctx, data } = chart;

//     console.log(chart.getDatasetMeta(0)._parsed[0]);

//     const centerX = chart.getDatasetMeta(0).data[0].x;
//     const centerY = chart.getDatasetMeta(0).data[0].y;

//     ctx.save();

//     ctx.font = "bold 24px albert-sans";
//     ctx.fillStyle = "White";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(
//       `${
//         (chart.getDatasetMeta(0)._parsed[0] * 100) /
//         chart.getDatasetMeta(0)._parsed[1]
//       }%`,
//       centerX,
//       centerY
//     );
//   },
// };

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
      }}
      data={data}
    />
  );
};

export default DoughnutChart;
