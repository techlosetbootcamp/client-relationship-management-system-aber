"use client";
import Avatar from "@/components/avatar/Avatar";
import React, { useState } from "react";
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
import ImageUploadModal from "../imageUploadModal/ImageUploadModal";
import FileUploadModal from "../fileUploadModal/FileUploadModal";
import { axiosInstance } from "@/helpers/axiosInstance";

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
  page,
}: TableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [item, setItem] = useState();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const editItem = (item: any) => {
    setItem(item);
    toggleModal();
  };

  const deleteProduct = async (item: any) => {
    const response = await axiosInstance.post("/products/delete-product", {
      id: item.id,
    });
    console.log("delete product response", response);
  };

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
                                radius={`${
                                  key === "grpObject"
                                    ? "rounded-[5px]"
                                    : "rounded-full"
                                }`}
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
                      } else if (typeof value != "object" && key != "id") {
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
                          {page === "documents" ? (
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
                          ) : (
                            <div onClick={() => deleteProduct(item)}>
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
                                width=""
                                img={""}
                              />
                            </div>
                          )}

                          <div onClick={() => editItem(item)}>
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
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className={`${isModalOpen ? "block" : "hidden"} ${
              page === "documents" && "hidden"
            }`}
          >
            <ImageUploadModal toggleModal={toggleModal} item={item} />
          </div>

          <div
            className={`${isModalOpen ? "block" : "hidden"} ${
              page != "documents" && "hidden"
            }`}
          >
            <FileUploadModal toggleModal={toggleModal} item={item} />
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default Table;
