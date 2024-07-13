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

type AxisProps = {
  axis: string;
};

const BarChart = ({ axis,data }: any) => {

  return (
    <Bar
      options={{
        indexAxis: axis,
        responsive: true,
        maintainAspectRatio: false,
      }}
      data={data}
    />
  );
};

export default BarChart;
