import DoughnutChart from "@/charts/doughnutChart/DoughnutChart";
import React from "react";

const data = {
  labels: ["D1", "D2"],
  datasets: [
    {
      label: "Dataset",
      data: [2040, 3000],
      backgroundColor: ["rgb(221, 198, 255)", "rgb(255, 255, 255)"],
      hoverOffset: 4,
      rotation: -24,
      borderColor: "transparent",
    },
  ],
};

// const doughnutLabel = {
//   id: "doughnutLabel",
//   afterDatasetsDraw(chart: any) {
//     const { ctx, data } = chart;

//     console.log(chart.getDatasetMeta(0)._parsed[0]);

//     const centerX = chart.getDatasetMeta(0).data[0].x;
//     const centerY = chart.getDatasetMeta(0).data[0].y;

//     ctx.save();

//     ctx.font = "bold 24px albert-sans";
//     ctx.fillStyle = "White";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(
//       `${
//         (chart.getDatasetMeta(0)._parsed[0] * 100) /
//         chart.getDatasetMeta(0)._parsed[1]
//       }%`,
//       centerX,
//       centerY
//     );
//   },
// };

const Card = () => {
  return (
    <div className="flex md:flex-col xs:gap-[30px] md:gap-[8px] justify-center items-center text-white lg:w-[124px] xl:w-[160px] lg:h-[196px] xl:h-[240px] rounded-[10.5px] py-[24px] px-[12px] bg-gradient-to-b from-[#9A55FF] to-[57.79%] to-[#D355FF]">
      <div className="lg:h-[83px] xl:h-[143px] xs:h-[130px] xs:w-[130px] flex justify-center items-center ">
        <DoughnutChart
          data={data}
          text="68%"
          color="White"
          textStyle="bold 24px albert-sans"
        />
      </div>

      <div className="text-center">
        <p className="xl:text-[19.6px] xl:leading-[24.5px] xl:text-[24px] xl:leading-[36px] font-albertSans font-[700]">
          2,040/
          <span className="lg:text-[13px] xl:text-[16px] lg:leading-[19.6px] xl:leading-[24px]">
            3,000
          </span>
        </p>
        <p className="text-[12px] leading-[18px] font-[600] font-barlow text-lightGray">
          Target Orders
        </p>
      </div>
    </div>
  );
};

export default Card;
// background: linear-gradient(336.19deg, #D355FF 0%, #9A55FF 57.79%);
