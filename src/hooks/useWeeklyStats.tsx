import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import React, { useEffect, useState } from "react";

const useWeeklyStats = () => {
  const [salesDataset, setSalesDataset] = useState<any>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const obj = useCalendarContext();

  const salesStatAPi = async () => {
    const response = await axiosInstance.post("/order/get-order-by-date", {
      startDate: obj && obj?.formattedStartDate,
      endDate: obj && obj?.formattedEndDate,
    });

    setTotalRevenue(response?.data?.totalRevenue ?? 0);
    setTotalSales(response?.data?.totalOrders ?? 0);
    const salesStatsDataset = [
      {
        label: "My First Dataset",
        data: [
          response?.data?.order?.map((item: any) => {
            const [year, month, day] = item.date.split("-");

            return {
              x: new Date(year, +month - 1, day),
              y: item.subTotal,
            };
          }),
        ].flat(),
        fill: false,
        borderColor: "rgb(65, 165, 255)",
        tension: 0.1,
      },
      {
        label: "My second Dataset",
        data: [
          response?.data?.order?.map((item: any) => {
            const [year, month, day] = item.date.split("-");

            return {
              x: new Date(year, +month - 1, day),
              y: item.orderCount,
            };
          }),
        ].flat(),

        fill: false,
        borderColor: "rgb(98, 145, 44)",
        tension: 0.1,
      },
      {
        label: "My third Dataset",
        data: [
          response?.data?.order?.map((item: any) => {
            const [year, month, day] = item.date.split("-");

            return {
              x: new Date(year, +month - 1, day),
              y: item.orderCount + 100,
            };
          }),
        ].flat(),

        fill: false,
        borderColor: "rgb(154, 85, 255)",
        tension: 0.1,
      },
    ];
    setSalesDataset(salesStatsDataset);
  };

  useEffect(() => {
    salesStatAPi();
  }, [obj]);

  return {
    salesDataset,
    setSalesDataset,
    totalRevenue,
    setTotalRevenue,
    totalSales,
    setTotalSales,
  };
};

export default useWeeklyStats;
