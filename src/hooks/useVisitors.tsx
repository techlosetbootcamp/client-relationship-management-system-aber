import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import React, { useEffect, useState } from "react";

const useVisitors = () => {
  const obj = useCalendarContext();
  const [data, setData] = useState<any>();
  let orderData: any = {};
  const orderCountApi = async () => {
    try {
      const response = await axiosInstance.post("/order/get-order-by-date", {
        startDate: obj && obj?.formattedStartDate,
        endDate: obj && obj?.formattedEndDate,
      });

      orderData = {
        labels: [],
        datasets: [
          {
            label: "Dataset",
            data: (response?.data?.order || []).flatMap((item: any) => {
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
    } catch (error) {
      console.log("error in visitor", error);
    }
  };

  useEffect(() => {
    orderCountApi();
  }, [obj]);

  return { data, setData };
};

export default useVisitors;
