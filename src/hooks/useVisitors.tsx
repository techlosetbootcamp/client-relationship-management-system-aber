import { axiosInstance } from "@/helpers/axiosInstance";
import { toast } from "@/helpers/toastify";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import { GetOrderByDate } from "@/redux/slices/order.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVisitors = () => {
  const dispatch: AppDispatch = useDispatch();
  const obj = useCalendarContext();
  const [data, setData] = useState<any>();
  let orderData: any = {};
  const response: any = useSelector((state: RootState) => state.order.data);
  const orderCountApi = async () => {
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
      orderData = {
        labels: [],
        datasets: [
          {
            label: "Dataset",
            data: (response?.order || []).flatMap((item: any) => {
              if (!item?.date) {
                return [];
              }
              const [year, month, day] = item?.date?.split("-");

              return {
                x: new Date(year, +month - 1, day),
                y: item.orderCount,
              };
            }),

            backgroundColor: ["#C9F19C"],

            borderWidth: 1,
          },
        ],
      };

      setData(orderData);
    }
  }, [response]);

  useEffect(() => {
    orderCountApi();
  }, [obj]);

  return { data, setData };
};

export default useVisitors;
