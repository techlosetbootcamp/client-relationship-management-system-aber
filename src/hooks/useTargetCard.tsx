import { axiosInstance } from "@/helpers/axiosInstance";
import { toast } from "@/helpers/toastify";
import { GetOrderByDate } from "@/redux/slices/order.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { endOfMonth, format, startOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTargetCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const response: any = useSelector((state: RootState) => state.order.data);
  const currentDate = new Date();
  const firstDayOfMonth = format(startOfMonth(currentDate), "yyyy-MM-dd");
  const lastDayOfMonth = format(endOfMonth(currentDate), "yyyy-MM-dd");

  const [targetPercentage, setTargetPercentage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [data, setData] = useState<any>();

  const targetOrderApi = async () => {
    try {
      await dispatch(
        GetOrderByDate({
          payload: {
            startDate: firstDayOfMonth,
            endDate: lastDayOfMonth,
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
      const targetData = {
        labels: ["CompletedOrders", "Target"],
        datasets: [
          {
            label: "Dataset",
            data: [response?.totalOrders, 3000],
            backgroundColor: ["rgb(221, 198, 255)", "rgb(255, 255, 255)"],
            hoverOffset: 4,
            rotation: -24,
            borderColor: "transparent",
          },
        ],
      };
      setData(targetData);

      setTotalOrders(response?.totalOrders);
      setTargetPercentage((totalOrders * 100) / 3000);
    }
  }, [response]);

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
