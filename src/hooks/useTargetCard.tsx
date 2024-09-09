import { axiosInstance } from "@/helpers/axiosInstance";
import { endOfMonth, format, startOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";

const useTargetCard = () => {
  const currentDate = new Date();
  const firstDayOfMonth = format(startOfMonth(currentDate), "yyyy-MM-dd");
  const lastDayOfMonth = format(endOfMonth(currentDate), "yyyy-MM-dd");

  const [targetPercentage, setTargetPercentage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [data, setData] = useState<any>();

  const targetOrderApi = async () => {
    const response = await axiosInstance.post("/order/get-order-by-date", {
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    });
    const targetData = {
      labels: ["CompletedOrders", "Target"],
      datasets: [
        {
          label: "Dataset",
          data: [response?.data?.totalOrders, 3000],
          backgroundColor: ["rgb(221, 198, 255)", "rgb(255, 255, 255)"],
          hoverOffset: 4,
          rotation: -24,
          borderColor: "transparent",
        },
      ],
    };
    setData(targetData);

    setTotalOrders(response?.data?.totalOrders);
    setTargetPercentage((totalOrders * 100) / 3000);
  };

  useEffect(() => {
    targetOrderApi();
  }, []);
  return {
    targetPercentage,
    setTargetPercentage,
    totalOrders,
    setTotalOrders,
    data,
    setData,
  };
};

export default useTargetCard;
