"use client";
import LineChart from "@/charts/lineChart/LineChart";
import Avatar from "@/components/avatar/Avatar";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import React, { useEffect, useState } from "react";
import StatusTag from "../statusTag/StatusTag";
import img from "@/assets/images/ArrowUp.svg";
import { format } from "date-fns";


// let salesStatsDataset: {
// //   label: string;
// //   data: { x: Date; y: number }[];
// //   fill: boolean;
// //   borderColor: string;
// //   tension: number;
// // }[] = [];

// const salesStatsDataset = [
//   {
//     label: "My First Dataset",
//     data: [
//       { x: new Date(2024, 7, 1), y: 0 },
//       { x: new Date(2024, 7, 2), y: 4 },
//       { x: new Date(2024, 7, 3), y: 8 },
//       { x: new Date(2024, 7, 4), y: 12 },
//       { x: new Date(2024, 7, 5), y: 16 },
//       { x: new Date(2024, 7, 6), y: 20 },
//       { x: new Date(2024, 7, 7), y: 24 },
//     ],
//     fill: false,
//     borderColor: "rgb(75, 192, 192)",
//     tension: 0.1,
//   },
//   {
//     label: "My First Dataset",
//     data: [
//       { x: new Date(2024, 7, 1), y: 0 },
//       { x: new Date(2024, 7, 2), y: 6 },
//       { x: new Date(2024, 7, 3), y: 12 },
//       { x: new Date(2024, 7, 4), y: 18 },
//       { x: new Date(2024, 7, 5), y: 24 },
//       { x: new Date(2024, 7, 6), y: 30 },
//       { x: new Date(2024, 7, 7), y: 36 },
//     ],

//     fill: false,
//     borderColor: "rgb(112, 75, 192)",
//     tension: 0.1,
//   },
//   {
//     label: "My First Dataset",
//     data: [
//       { x: new Date(2024, 7, 1), y: 0 },
//       { x: new Date(2024, 7, 2), y: 1 },
//       { x: new Date(2024, 7, 3), y: 10 },
//       { x: new Date(2024, 7, 4), y: 15 },
//       { x: new Date(2024, 7, 5), y: 20 },
//       { x: new Date(2024, 7, 6), y: 25 },
//       { x: new Date(2024, 7, 7), y: 30 },
//     ],
//     // data: [0, 5, 10, 15, 20, 25, 30],
//     fill: false,
//     borderColor: "rgb(192, 77, 75)",
//     tension: 0.1,
//   },
// ];

// const salesStatsLabels = [
//   // "1Jul",
//   // "2Jul",
//   // "3Jul",
//   // "4Jul",
//   // "5Jul",
//   // "6Jul",
//   // "7Jul",
// ];

const salesStatsLabels: never[] = [];
const today = new Date();

// Calculate first and last day of the current week (Sunday to Saturday)
const firstDayOfCurrentWeek = new Date(today.setDate(today.getDate() - 6));
const lastDayOfCurrentWeek = new Date();

// Calculate first and last day of the previous week
const firstDayOfPreviousWeek = new Date(
  today.setDate(firstDayOfCurrentWeek.getDate() - 7)
); // Previous Sunday
const lastDayOfPreviousWeek = new Date(
  today.setDate(firstDayOfPreviousWeek.getDate() + 6)
); // Previous Saturday

export const OverallSales = () => {
  console.log(
    "aj ki date",
    today,
    "firstDayOfCurrentWeek",
    format(firstDayOfCurrentWeek, "yyyy-MM-dd"),
    "lastDayOfCurrentWeek",
    lastDayOfCurrentWeek,
    "firstDayOfPreviousWeek",
    firstDayOfPreviousWeek,
    "lastDayOfPreviousWeek",
    lastDayOfPreviousWeek
  );
  const [salesDataset, setSalesDataset] = useState<any>([]);
  const [overallSale, setOverallSale] = useState(0);
//   const obj = useCalendarContext();

  const salesStatAPi = async () => {
    const response = await axiosInstance.post("/order/get-weekly-orders", {
      firstDayOfCurrentWeek: format(firstDayOfCurrentWeek, "yyyy-MM-dd"),
      lastDayOfCurrentWeek: format(lastDayOfCurrentWeek, "yyyy-MM-dd"),
      firstDayOfPreviousWeek: format(firstDayOfPreviousWeek, "yyyy-MM-dd"),
      lastDayOfPreviousWeek: format(lastDayOfPreviousWeek, "yyyy-MM-dd"),
    });

    console.log("response from the overall sales checking api", response);
    setOverallSale(response?.data?.totalSale);
    const overallSalesDataset = [
      {
        label: "My First Dataset",
        data: [
          response?.data?.currentWeek?.map((item: any) => {
            console.log("item inside sales data", item);

            // const date = new Date(item.CreatedAt);

            // // Step 2: Extract the year, month, and day
            // const year = date.getFullYear();
            // const month = date.getMonth(); // Note: getMonth() returns 0-based month (0 = January, 7 = August)
            // const day = date.getDate();
            const [year, month, day] = item.date.split("-");
            console.log(year, month, day);
            return {
              x: new Date(year, +month - 1, day),
              y: item.subTotal,
            };
          }),
        ].flat(),
        fill: false,
        borderColor: "rgb(154, 85, 255)",
        tension: 0.1,
      },
      {
        label: "My second Dataset",
        data: [
            response?.data?.lastWeek?.map((item: any) => {
              console.log("item inside sales data", item);
  
              // const date = new Date(item.CreatedAt);
  
              // // Step 2: Extract the year, month, and day
              // const year = date.getFullYear();
              // const month = date.getMonth(); // Note: getMonth() returns 0-based month (0 = January, 7 = August)
              // const day = date.getDate();
              const [year, month, day] = item.date.split("-");
              console.log(year, month, day);
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
    ];
    setSalesDataset(overallSalesDataset);

    console.log("sales stats data", salesDataset);
  };

  useEffect(() => {
    salesStatAPi();
  }, []);

  // height-397 for overview page and height-387 for analytics page
  return (
    // xs:h-[259.69px]
    <CardWrapper
      width="w-full"
      height={"md:h-[321px] xl:h-[387px]"}
      flexDirection="flex-col "
    >
      <div className="flex flex-col gap-[12px]">
        <p className="text-[16px] leading-[24px] text-darkGray font-barlow font-semibold">
          Overall Sale
        </p>
        <div className="flex md:flex-row xs:flex-col justify-between md:items-center">
          <div className="flex gap-[8px] items-center">
            <p className="w-[150px] font-[700] text-[24px] leading-[36px] text-darkGray font-albertSans">
              $ {overallSale}
            </p>
            <StatusTag
              text="3.4%"
              fontSize="text-[10px]"
              img={img}
              background="bg-lightGreen"
              color="text-secondaryGreen"
              lineHeight="leading-[15px]"
            />
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <div className="h-[10.5px] w-[10.5px] rounded-full bg-primaryPurple" />
              <p className="font-[600] text-[12px] leading-[18px] text-mediumGray font-barlow">
                Current Week
              </p>
            </div>
            <div className="flex gap-[8px] items-center">
              <div className="h-[10.5px] w-[10.5px] rounded-full bg-secondaryBlue" />
              <p className="font-[600] text-[12px] leading-[18px] text-mediumGray font-barlow">
                Last Week
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-borderGray" />

      <div className="w-full xl:h-[228px] md:h-[189px] xs:h-[122px]">
        {/* <LineChart
          datasets={salesDataset}
          labels={salesStatsLabels}
          display={true}
        /> */}
        <LineChart
          datasets={salesDataset}
          labels={salesStatsLabels}
          display={true}
        />
      </div>
    </CardWrapper>
  );
};
