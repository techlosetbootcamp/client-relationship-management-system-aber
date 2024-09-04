"use client";
import LineChart from "@/charts/lineChart/LineChart";
import Avatar from "@/components/avatar/Avatar";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import React, { useEffect, useState } from "react";

const salesStats = [
  {
    heading: "Total Revenue",
    subHeading: "Orders",
    number: "$27,733.00",
    border: true,
  },
  {
    heading: "Total Sales",
    subHeading: "Products",
    number: "9234",
    border: true,
  },
  {
    heading: "Total Views",
    subHeading: "Views",
    number: "15,788",
    border: false,
  },
];

// let salesStatsDataset: {
//   label: string;
//   data: { x: Date; y: number }[];
//   fill: boolean;
//   borderColor: string;
//   tension: number;
// }[] = [];

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

const salesStatsLabels: never[] =[]

export const WeeklySalesStats = () => {
  const [salesDataset, setSalesDataset] = useState<any>([]);
  const obj = useCalendarContext();
  console.log(
    obj?.formattedStartDate === "2024-08-01",
    typeof obj?.formattedStartDate,
    obj?.formattedStartDate
  );

  const salesStatAPi = async () => {
    const response = await axiosInstance.post("/order/get-order-by-date", {
      startDate: obj && obj?.formattedStartDate,
      endDate: obj && obj?.formattedEndDate,
    });
    console.log("response from the checking api", response);
    const salesStatsDataset = [
      {
        label: "My First Dataset",
        data: [
          response?.data?.order?.map((item: any) => {
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
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "My second Dataset",
        data: [
          { x: new Date(2024, 7, 1), y: 0 },
          { x: new Date(2024, 7, 2), y: 6 },
          { x: new Date(2024, 7, 3), y: 12 },
          { x: new Date(2024, 7, 4), y: 18 },
          { x: new Date(2024, 7, 5), y: 24 },
          { x: new Date(2024, 7, 6), y: 30 },
          { x: new Date(2024, 7, 7), y: 36 },
        ],

        fill: false,
        borderColor: "rgb(112, 75, 192)",
        tension: 0.1,
      },
    ];
    setSalesDataset(salesStatsDataset);

    console.log("sales stats data", salesDataset);
  };

  useEffect(() => {
    salesStatAPi();
  }, [obj]);

  // height-397 for overview page and height-387 for analytics page
  return (
    <CardWrapper
      width="w-full"
      height="min-h-[387px]"
      flexDirection="flex-col flex-1"
    >
      <p className="text-[16px] leading-[24px] text-darkGray font-barlow font-semibold">
        Sales Statistic
      </p>
      <div className="border-t border-borderGray" />

      {/* //USE BELOW CODE IN CODE-OVERVIEW PAGE ONLY AND HIDE IN ANALYTICS PAGE */}

      {/* <div className="flex gap-[8px]">
        {salesStats.map((item) => {
          return ( */}
      {/* // <>
            //   <div className="flex gap-[12px]"> */}
      {/* <Avatar size="small" img="" /> */}
      {/* //     <div className="flex flex-col gap-[12px]">
            //       <p>{item.heading}</p>
            //       <p className="text-[24px] leading-[36px] font-bold text-darkGray">
            //         {item.number}
            //         <span className="text-[#ADB5BD] text-[15px] leading-[22.5px] font-semibold">
            //           {item.subHeading}
            //         </span>
            //       </p>
            //     </div>
            //   </div> */}

      {/* //   {item.border && <div className="border border-borderGray" />} */}
      {/* // </>
          );
        })}
      </div> */}

      <div className="w-full border h-full">
        <LineChart
          datasets={salesDataset}
          labels={salesStatsLabels}
          display={true}
        />
      </div>
    </CardWrapper>
  );
};
