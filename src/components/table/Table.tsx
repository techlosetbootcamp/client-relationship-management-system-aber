import Avatar from "@/components/avatar/Avatar";
import React from "react";
import img from "@/assets/images/avatar.png";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { TableProps } from "@/types/Types";
import Button from "@/components/button/Button";
import Pagination from "../pagination/Pagination";

// const tableHeading = [
//   {
//     heading: "Date",
//   },
//   {
//     heading: "Customer",
//   },
//   {
//     heading: "Status",
//   },
//   {
//     heading: "Total",
//   },
// ];

// const tableData = [
//   {
//     date: "31 july 2023",
//     customer: {
//       img: img,
//       customerName: "Eric Slator",
//     },
//     status: {
//       type: "Button",
//       btnText: "Pending",
//     },
//     total: "$999.00",
//   },
//   {
//     date: "31 july 2023",
//     customer: {
//       img: img,
//       customerName: "Eric Slator",
//     },
//     status: {
//       type: "Button",
//       btnText: "Pending",
//     },
//     total: "$999.00",
//   },
//   {
//     date: "31 july 2023",
//     customer: {
//       img: img,
//       customerName: "Eric Slator",
//     },
//     status: {
//       type: "Button",
//       btnText: "Pending",
//     },
//     total: "$999.00",
//   },
//   {
//     date: "31 july 2023",
//     customer: {
//       img: img,
//       customerName: "Eric Slator",
//     },
//     status: {
//       type: "Button",
//       btnText: "Pending",
//     },
//     total: "$999.00",
//   },
//   {
//     date: "31 july 2023",
//     customer: {
//       img: img,
//       customerName: "Eric Slator",
//     },
//     status: {
//       type: "Button",
//       btnText: "Pending",
//     },
//     total: "$999.00",
//   },
//   {
//     date: "31 july 2023",
//     customer: {
//       img: img,
//       customerName: "Eric Slator",
//     },
//     status: {
//       type: "Button",
//       btnText: "Pending",
//     },
//     total: "$999.00",
//   },
// ];

const Table = ({
  width,
  height,
  pagination,
  divider,
  heading,
  background,
  bgHeader,
  bgRows,
  checkbox,
  tableHeading,
  tableData,
}: TableProps) => {
  return (
    <CardWrapper width={width} height={height} flex={`flex-col ${background}`}>
      <div className={`flex justify-between w-full font-barlow`}>
        <p className="text-[16px] font-[600] text-darkGray">{heading}</p>
        {pagination && 
        <Pagination/>
        }
      </div>

      {divider && <div className="border border-borderGray w-full" />}

      <div>
        <table className="w-full table-auto  font-barlow">
          <thead className="w-full h-[47px] inline-table  items-center justify-center  py-[0px] text-[14px] leading-[21px] font-semibold text-darkGray ">
            <tr
              className={`${bgHeader} flex gap-[24px]  rounded-[5px] px-[8px] items-center justify-center h-full w-full`}
            >
              {checkbox && (
                <th>
                  {" "}
                  <input type="checkbox" name="" id="" />
                </th>
              )}
              {tableHeading.map((item, i) => {
                return (
                  <th key={i} className="text-start flex-1">
                    {item.heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="w-full  flex flex-col gap-[12px]  text-[14px] leading-[21px] py-[8px] rounded-[5px] font-medium text-mediumGray gap-[12px]">
            {tableData.map((item, i) => {
              return (
                <tr
                  key={i}
                  className={` ${bgRows} items-center flex gap-[24px] px-[8px] rounded-[5px]`}
                >
                  
                  {checkbox && <input type="checkbox" name="" id="" />}
                  {/* {
                    typeof(item.total)==='object'? 
                    <p>AN object</p> : <p>not an object</p>
                    typeof value !== "object"
                  } */}

                  {Object.entries(item).map(([key, value]) => {
                    console.log("key", key, "value", value, typeof value);
                    if (key === "status" && typeof value !== "object") {
                      return (
                        <td className="py-[8px] text-start flex-1">
                          <Button
                            text={value}
                            fontSize="text-[12px]"
                            img={""}
                            background={
                              value === "Success"
                                ? "bg-lightGreen"
                                : "bg-lightRed"
                            }
                            color={
                              value === "Success"
                                ? "text-secondaryGreen"
                                : "text-secondaryRed"
                            }
                            width="w-fit"
                            gap="gap-[3px]"
                            fontWeight="font-bold"
                            rounded="rounded-[15.75px]"
                            lineHeight="leading-[18px]"
                            py="py-[0.75px]"
                            px="px-[6px]"
                            border=""
                          />
                        </td>
                      );
                    } else if (
                      typeof value === "object" &&
                      (key === "customer" || key==="author")
                    ) {
                      return (
                        <td className="py-[8px] text-start  flex items-center gap-[8px] flex-1">
                          <Avatar
                            img={value.img}
                            size="h-[31px] w-[31px] rounded-full"
                            background=""
                          />
                          <p>{value.customerName}</p>
                        </td>
                      );
                    } else if (typeof(value) === "object" && (key === "product" || key==="documentName")) {
                      return (
                        <td className="py-[8px] text-start flex-1">
                        <div className="flex gap-[8px]">
                          <Avatar
                            img={value.img}
                            size="lg:h-[32px] lg:w-[32px]  xl:h-[32px] xl:w-[32px] rounded-[5px]"
                            background=""
                          />

                          <div className="flex items-center justify-between flex-1">
                            <div className="flex flex-col">
                              <p className="text-blue  font-semibold lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-albertSans">
                                {value.productName}
                              </p>
                              <p className="text-mediumGray lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-barlow">
                                {value.productCategory}
                              </p>
                            </div>
                          </div>
                        </div>
                        </td>
                      );
                    } else if (
                      typeof(value) === "object" &&
                      key === "totalOrder"
                    ) {
                      return (
                        <td className="py-[8px] text-start flex-1">
                        <div className="text-[14px] leading-[21px] font-[500]">
                          <p className="text-darkGray">{value.quantity}</p>
                          <p className="text-mediumGray">{value.date}</p>
                        </div>
                        </td>
                      );
                    } else {
                      return (
                        <td className="py-[8px] text-start flex-1">{value}</td>
                      );
                    }
                    // <p>yes</p> : <p>no</p>
                  })}

                  {/* {
                    Object.entries().map(()=>{
                      return(

                      )

                    })

                  } */}
                  {/*  <td className="py-[8px] text-start flex-1">{item.date}</td>
                  <td className="py-[8px] text-start  flex items-center gap-[8px] flex-1">
                    <Avatar
                      img={item.img}
                      size="h-[31px] w-[31px] rounded-full"
                      background=""
                    />
                    <p>{item.customerName}</p>
                  </td>
                  <td className="py-[8px] text-start flex-1">
                    <Button
                      text={item.btnText}
                      fontSize="text-[12px]"
                      img={""}
                      background={
                        item.btnText === "Success"
                          ? "bg-lightGreen"
                          : "bg-lightRed"
                      }
                      color={
                        item.btnText === "Success"
                          ? "text-secondaryGreen"
                          : "text-secondaryRed"
                      }
                      width="w-fit"
                      gap="gap-[3px]"
                      fontWeight="font-bold"
                      rounded="rounded-[15.75px]"
                      lineHeight="leading-[18px]"
                      py="py-[0.75px]"
                      px="px-[6px]"
                    />
                  </td>
                  <td className="py-[8px] text-start flex-1">{item.total}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardWrapper>
  );
};

export default Table;
