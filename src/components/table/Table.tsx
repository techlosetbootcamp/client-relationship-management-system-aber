// import Avatar from "@/components/avatar/Avatar";
// import React from "react";
// import img from "@/assets/images/avatar.png";
// import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
// import { TableProps } from "@/types/Types";
// import Button from "@/components/button/Button";
// import Pagination from "../pagination/Pagination";
// import InputField from "../inputField/InputField";
// import SearchInput from "../searchInput/SearchInput";
// import Tabs from "../tabs/Tabs";
// import { MdOutlineAddBox } from "react-icons/md";
// import { MdOutlineFileUpload } from "react-icons/md";
// import StatusTag from "../statusTag/StatusTag";

// const Table = ({
//   width,
//   height,
//   pagination,
//   divider,
//   heading,
//   background,
//   bgHeader,
//   bgRows,
//   checkbox,
//   tableHeading,
//   tableData,
//   action,
// }: TableProps) => {
//   return (
//     <>
//       <CardWrapper
//         width={width}
//         height={height}
//         flexDirection={`flex-col  ${background}`}
//       >
//         <div className={`flex justify-between w-full font-barlow `}>
//           <p className="text-[16px] font-[600] text-darkGray">{heading}</p>
//           {pagination && <Pagination />}
//         </div>

//         {action && (
//           <div className="flex justify-between md:flex-row xs:flex-col gap-[26.5px]">
//             <Tabs />
//             <div className="flex gap-[16px] md:flex-row xs:flex-col  ">
//               <SearchInput />
//               <Button
//                 text={"Download"}
//                 background="bg-lightGray"
//                 color="text-primaryPurple"
//                 fontSize="text-[14px]"
//                 fontWeight="font-[600]"
//                 rounded="rounded-[3.2px]"
//                 gap="gap-[8px]"
//                 lineHeight="leading-[21px]"
//                 border="border-primaryPurple border"
//                 px="px-[8px]"
//                 py="py-[4px]"
//                 img={""}
//                 Icon={null}

//               />
//               <Button
//                 text={"Delete"}
//                 background="bg-lightGray"
//                 color="text-primaryPurple"
//                 fontSize="text-[14px]"
//                 fontWeight="font-[600]"
//                 rounded="rounded-[3.2px]"
//                 gap="gap-[8px]"
//                 lineHeight="leading-[21px]"
//                 border="border-primaryPurple border"
//                 px="px-[8px]"
//                 py="py-[4px]"
//                 img={""}
//                 Icon={null}

//               />
//             </div>
//           </div>
//         )}

//         {divider && <div className="border border-borderGray w-full" />}

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto  font-barlow">
//             <thead className="w-full h-[47px] inline-table  items-center justify-center  py-[0px] text-[14px] leading-[21px] font-semibold text-darkGray ">
//               <tr
//                 className={`${bgHeader} flex gap-[24px]  rounded-[5px] px-[8px] items-center justify-center h-full w-full`}
//               >
//                 {checkbox && (
//                   <th>
//                     {" "}
//                     <input type="checkbox" name="" id="" />
//                   </th>
//                 )}
//                 {tableHeading.map((item, i) => {
//                   return (
//                     <th key={i} className="text-start flex-1">
//                       {item.heading}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
//             <tbody className="w-full  flex flex-col gap-[12px]  text-[14px] leading-[21px] py-[8px] rounded-[5px] font-medium text-mediumGray gap-[12px]">
//               {tableData.map((item, i) => {
//                 return (
//                   <tr
//                     key={i}
//                     className={` ${bgRows} items-center flex gap-[24px] px-[8px] rounded-[5px]`}
//                   >
//                     {checkbox && (
//                       <td>
//                         <input type="checkbox" name="" id="" />
//                       </td>
//                     )}
//                     {/* {
//                     typeof(item.total)==='object'?
//                     <p>AN object</p> : <p>not an object</p>
//                     typeof value !== "object"
//                   } */}

//                     {Object.entries(item).map(([key, value]) => {
//                       if (key === "status" && typeof value !== "object") {
//                         return (
//                           <td
//                             key={key}
//                             className="py-[8px] w-fit text-start flex-1"
//                           >
//                             <div className=" w-fit ">
//                               <StatusTag
//                                 text={value}
//                                 fontSize="text-[12px]"
//                                 img={""}
//                                 background={
//                                   value === "Success"
//                                     ? "bg-lightGreen"
//                                     : "bg-lightRed"
//                                 }
//                                 color={
//                                   value === "Success"
//                                     ? "text-secondaryGreen"
//                                     : "text-secondaryRed"
//                                 }
//                                 lineHeight="leading-[18px]"
//                               />
//                             </div>
//                           </td>
//                         );
//                       } else if (
//                         typeof value === "object" &&
//                         (key === "customer" || key === "author")
//                       ) {
//                         return (
//                           <td
//                             key={key}
//                             className="py-[8px] text-start  flex items-center gap-[8px] flex-1"
//                           >
//                             <Avatar
//                               img={value.img}
//                               height="h-[31px]"
//                               width="w-[31px]"
//                               radius="rounded-full"
//                               background=""
//                             />
//                             <p>{value.customerName}</p>
//                           </td>
//                         );
//                       } else if (
//                         typeof value === "object" &&
//                         (key === "product" || key === "documentName")
//                       ) {
//                         return (
//                           <td key={key} className="py-[8px] text-start flex-1">
//                             <div className="flex gap-[8px]">
//                               <Avatar
//                                 height="lg:h-[32px] xl:h-[32px]"
//                                 width="lg:w-[32px] xl:w-[32px]"
//                                 radius="rounded-[5px]"
//                                 img={value.img}
//                                 background=""
//                               />

//                               <div className="flex items-center justify-between flex-1">
//                                 <div className="flex flex-col">
//                                   <p className="text-blue  font-semibold lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-albertSans">
//                                     {value.productName}
//                                   </p>
//                                   <p className="text-mediumGray lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-barlow">
//                                     {value.productCategory}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         );
//                       } else if (
//                         typeof value === "object" &&
//                         key === "totalOrder"
//                       ) {
//                         return (
//                           <td key={key} className="py-[8px] text-start flex-1">
//                             <div className="text-[14px] leading-[21px] font-[500]">
//                               <p className="text-darkGray">{value.quantity}</p>
//                               <p className="text-mediumGray">{value.date}</p>
//                             </div>
//                           </td>
//                         );
//                       } else {
//                         return (
//                           <td key={key} className="py-[8px] text-start flex-1">
//                             {value}
//                           </td>
//                         );
//                       }
//                       // <p>yes</p> : <p>no</p>
//                     })}

//                     {action && (
//                       <td className="flex gap-[16px] flex-1">
//                         <Button
//                           text={"View"}
//                           background="bg-lightGray"
//                           color="text-primaryPurple"
//                           fontSize="text-[14px]"
//                           fontWeight="font-[600]"
//                           rounded="rounded-[3.2px]"
//                           gap="gap-[8px]"
//                           lineHeight="leading-[21px]"
//                           border="border-primaryPurple border"
//                           px="px-[8px]"
//                           py="py-[4px]"
//                           img={""}

//                         />
//                         <Button
//                           text={"Edit"}
//                           background="bg-lightGray"
//                           color="text-primaryPurple"
//                           fontSize="text-[14px]"
//                           fontWeight="font-[600]"
//                           rounded="rounded-[3.2px]"
//                           gap="gap-[8px]"
//                           lineHeight="leading-[21px]"
//                           border="border-primaryPurple border"
//                           px="px-[8px]"
//                           py="py-[4px]"
//                           img={""}

//                         />
//                       </td>
//                     )}

//                     {/* {
//                     Object.entries().map(()=>{
//                       return(

//                       )

//                     })

//                   } */}
//                     {/*  <td className="py-[8px] text-start flex-1">{item.date}</td>
//                   <td className="py-[8px] text-start  flex items-center gap-[8px] flex-1">
//                     <Avatar
//                       img={item.img}
//                       size="h-[31px] w-[31px] rounded-full"
//                       background=""
//                     />
//                     <p>{item.customerName}</p>
//                   </td>
//                   <td className="py-[8px] text-start flex-1">
//                     <Button
//                       text={item.btnText}
//                       fontSize="text-[12px]"
//                       img={""}
//                       background={
//                         item.btnText === "Success"
//                           ? "bg-lightGreen"
//                           : "bg-lightRed"
//                       }
//                       color={
//                         item.btnText === "Success"
//                           ? "text-secondaryGreen"
//                           : "text-secondaryRed"
//                       }
//                       width="w-fit"
//                       gap="gap-[3px]"
//                       fontWeight="font-bold"
//                       rounded="rounded-[15.75px]"
//                       lineHeight="leading-[18px]"
//                       py="py-[0.75px]"
//                       px="px-[6px]"
//                     />
//                   </td>
//                   <td className="py-[8px] text-start flex-1">{item.total}</td> */}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </CardWrapper>
//     </>
//   );
// };

// export default Table;

"use client";
import Avatar from "@/components/avatar/Avatar";
import React from "react";
import img from "@/assets/images/avatar.png";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { TableProps } from "@/types/Types";
import Button from "@/components/button/Button";
import Pagination from "../pagination/Pagination";
import InputField from "../inputField/InputField";
import SearchInput from "../searchInput/SearchInput";
import Tabs from "../tabs/Tabs";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import StatusTag from "../statusTag/StatusTag";
import "../../styles/tableStyle.css";

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
  action,
  rowBorder,
}: TableProps) => {
  // ImgObject and grpObject might become common
  return (
    <>
      <CardWrapper
        width={width}
        height={height}
        flexDirection={`flex-col  ${background}`}
      >
        <div className={`flex justify-between w-full font-barlow `}>
          <p className="text-[16px] font-[600] text-darkGray">{heading}</p>
          {pagination && <Pagination />}
        </div>

        {action && (
          <div className="flex justify-between md:flex-row xs:flex-col gap-[26.5px]">
            <Tabs />
            <div className="flex gap-[16px] md:flex-row xs:flex-col  ">
              <SearchInput />
              <Button
                text={"Download"}
                background="bg-lightGray"
                color="text-primaryPurple"
                fontSize="text-[14px]"
                fontWeight="font-[600]"
                rounded="rounded-[3.2px]"
                gap="gap-[8px]"
                lineHeight="leading-[21px]"
                border="border-primaryPurple border"
                px="px-[8px]"
                py="py-[4px]"
                img={""}
                width=""
                Icon={null}
              />
              <Button
                text={"Delete"}
                background="bg-lightGray"
                color="text-primaryPurple"
                fontSize="text-[14px]"
                fontWeight="font-[600]"
                rounded="rounded-[3.2px]"
                gap="gap-[8px]"
                lineHeight="leading-[21px]"
                border="border-primaryPurple border"
                px="px-[8px]"
                py="py-[4px]"
                img={""}
                width=""
                Icon={null}
              />
            </div>
          </div>
        )}

        {divider && <div className="border border-borderGray w-full" />}

        <div className={`overflow-x-auto`}>
          <table className="w-full table-auto rounded-[8px] font-barlow border-separate border-spacing-y-[12px]">
            <thead className={`h-[47px] ${bgHeader} relative w-full`}>
              {/* <div
                className={`absolute inset-0 ${bgHeader} rounded-[5px] h-[47px] z-0 `}
              /> */}
              <tr className={`${bgHeader}  relative z-10 py-[12px] h-[47px] `}>
                {checkbox && (
                  <th className="px-[12px] text-start">
                    <input type="checkbox" name="" id="" />
                  </th>
                )}
                {tableHeading.map((item, i) => {
                  return (
                    <th key={i} className="text-start px-[12px]  h-[47px]">
                      {item.heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {/* <tbody className="w-full  flex flex-col gap-[12px]  text-[14px] leading-[21px] py-[8px] rounded-[5px] font-medium text-mediumGray gap-[12px]"> */}
            <tbody className="bg-transparent">
              {/* <tr className="h-[47px]">
                <td className=" px-[12px] ">abchgfdswssssss</td>
                <td className="px-[12px] ">defefd</td>
                <td className=" px-[12px] ">ghi</td>
                <td className=" px-[12px] ">jkl</td>
              </tr> */}

              {tableData?.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className={`${bgRows} w-full ${
                      rowBorder ? "rowBorder" : ""
                    }`}
                  >
                    {/* <div
                      className={`absolute inset-0 bg-transparent border-2 border-black  rounded-[5px] h-[47px] z-0 `}
                    /> */}

                    {checkbox && (
                      <td className="px-[12px] py-[8px] bg-white">
                        <input type="checkbox" name="" id="" />
                      </td>
                    )}

                    {Object?.entries(item).map(([key, value]) => {
                      if (key === "status" && typeof value !== "object") {
                        return (
                          <td
                            key={key}
                            className="px-[12px]  py-[8px] text-start"
                          >
                            <div className=" w-fit ">
                              <StatusTag
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
                                lineHeight="leading-[18px]"
                              />
                            </div>
                          </td>
                        );
                      }
                      // else if (
                      //   typeof value === "object" &&
                      //   key === "imgObject"
                      // ) {
                      //   return (
                      //     <td
                      //       key={key}
                      //       className="text-start  px-[12px] py-[8px]"
                      //     >
                      //       <div className="flex items-center gap-[8px]">
                      //         <Avatar
                      //           img={value.img}
                      //           height="h-[31px]"
                      //           width="w-[31px]"
                      //           radius="rounded-full"
                      //           background=""
                      //         />
                      //         <p>{value.name}</p>
                      //       </div>
                      //     </td>
                      //   );
                      // }
                      else if (
                        typeof value === "object" &&
                        (key === "grpObject" || key === "imgObject")
                      ) {
                        return (
                          <td
                            key={key}
                            className="text-start px-[12px]  py-[8px]"
                          >
                            <div className="flex gap-[8px] items-center">
                              <Avatar
                                height="h-[32px]"
                                width="w-[32px]"
                                radius="rounded-[5px]"
                                img={value.img}
                                background=""
                              />

                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <p
                                    className={`${
                                      key === "grpObject"
                                        ? "text-blue font-[600]"
                                        : "text-mediumGray font-[500]"
                                    }  lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-albertSans`}
                                  >
                                    {value?.name}
                                  </p>
                                  <p className="text-mediumGray lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-barlow">
                                    {value?.subValue}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      } else if (
                        typeof value === "object" &&
                        key === "totalOrder"
                      ) {
                        return (
                          <td
                            key={key}
                            className="text-start px-[12px]  py-[8px]"
                          >
                            <div className="lg:text-[12px] xl:text-[14px] leading-[21px] font-[500]">
                              <p className="text-darkGray">{value.quantity}</p>
                              <p className="text-mediumGray">{value.date}</p>
                            </div>
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={key}
                            className="text-start px-[12px] lg:text-[12px] xl:text-[14px] py-[8px] font-[500]"
                          >
                            {value}
                          </td>
                        );
                      }
                    })}

                    {action && (
                      <td className=" py-[8px] px-[12px] rounded-r-[5px] ">
                        <div className="flex gap-[16px] items-center">
                          <Button
                            text={"View"}
                            background="bg-lightGray"
                            color="text-primaryPurple"
                            fontSize="text-[14px]"
                            fontWeight="font-[600]"
                            rounded="rounded-[3.2px]"
                            gap="gap-[8px]"
                            lineHeight="leading-[21px]"
                            border="border-primaryPurple border"
                            px="px-[8px]"
                            py="py-[4px]"
                            width=""
                            img={""}
                          />
                          <Button
                            text={"Edit"}
                            background="bg-lightGray"
                            color="text-primaryPurple"
                            fontSize="text-[14px]"
                            fontWeight="font-[600]"
                            rounded="rounded-[3.2px]"
                            gap="gap-[8px]"
                            lineHeight="leading-[21px]"
                            border="border-primaryPurple border"
                            px="px-[8px]"
                            py="py-[4px]"
                            width=""
                            img={""}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardWrapper>
    </>
  );
};

export default Table;
