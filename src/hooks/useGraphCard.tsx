import { axiosInstance } from "@/helpers/axiosInstance";
import React, { useEffect, useState } from "react";

const useGraphCard = (chart: string) => {
  const [profitData, setProfitData] = useState<any>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const currentDate = new Date();
  const previousMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );

  const profitApi = async () => {
    try {
      const response = await axiosInstance.post(
        chart != "customers"
          ? "/order/get-order-by-date"
          : "/user/get-user-by-date",
        {
          startDate: previousMonthDate.toISOString().slice(0, 10),
          endDate: new Date().toISOString().slice(0, 10),
        }
      );

      if (chart != "customers") {
        setTotalProfit(response?.data?.totalProfit ?? 0);
        setTotalExpense(response?.data?.totalExpense ?? 0);
      } else {
        setTotalCustomers(response?.data?.totalCustomers);
      }

      const chartDataset = [
        {
          label: "My First Dataset",

          data:
            chart != "customers"
              ? response?.data?.order?.map((item: any) => {
                  if (chart == "expenses") {
                    return item.totalPurchasedPrice;
                  } else if (chart == "profit") {
                    return item.subTotal - item.totalPurchasedPrice;
                  }
                })
              : response?.data?.customers?.map((item: any) => {
                  return item.customerCount;
                }),
          fill: false,
          borderColor:
            chart == "profit"
              ? "rgb(98, 145, 44)"
              : chart == "expenses"
              ? "rgb(237, 77, 92)"
              : "rgb(65, 165, 255)",
          tension: 0.1,
        },
      ];

      setProfitData(chartDataset);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    profitApi();
  }, []);
  return {
    profitData,
    setProfitData,
    totalProfit,
    setTotalProfit,
    totalExpense,
    setTotalExpense,
    totalCustomers,
    setTotalCustomers,
    profitApi,
  };
};

export default useGraphCard;
