import { toast } from "@/helpers/toastify";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import { GetOrderByDate } from "@/redux/slices/order.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useWeeklyStats = () => {
  const dispatch: AppDispatch = useDispatch();
  const [salesDataset, setSalesDataset] = useState<any>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const obj = useCalendarContext();
  const response: any = useSelector((state: RootState) => state.order.data);

  const salesStatAPi = async () => {
    try {
      await dispatch(
        GetOrderByDate({
          payload: {
            startDate: obj && obj?.formattedStartDate,
            endDate: obj && obj?.formattedEndDate,
          },
          callback: async (data) => {
            if (data?.data?.status === 200) {
              toast.success(data?.data?.message);
            } else {
              toast.error(data?.data?.message);
            }
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.order) {
      setTotalRevenue(response?.totalRevenue ?? 0);
      setTotalSales(response?.totalOrders ?? 0);
      const salesStatsDataset = [
        {
          label: "Total Revenue",
          data: [
            response?.order?.map((item: any) => {
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
          label: "Total Sales",
          data: [
            response?.order?.map((item: any) => {
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
          label: "Total Views",
          data: [
            response?.order?.map((item: any) => {
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
    }
  }, [response]);

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
