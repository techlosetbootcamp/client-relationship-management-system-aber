"use client";
import Avatar from "@/components/avatar/Avatar";
import React, { useState } from "react";

import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { documentsTableData, TableProps } from "@/types/Types";
import Button from "@/components/button/Button";
import Pagination from "../pagination/Pagination";
import SearchInput from "../searchInput/SearchInput";
import Tabs from "../tabs/Tabs";
import StatusTag from "../statusTag/StatusTag";
import "../../styles/tableStyle.css";
import ImageUploadModal from "../productUploadModal/ProductUploadModal";
import FileUploadModal from "../documentUploadModal/DocumentUploadModal";
import { axiosInstance } from "@/helpers/axiosInstance";
import Link from "next/link";
import OrderedProductsModal from "../orderedProductsModal/OrderedProductsModal";
import useTable from "@/hooks/useTable";
import useDocuments from "@/hooks/useDocuments";
import useOrders from "@/hooks/useOrders";
import useProducts from "@/hooks/useProducts";

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
  const {
    getCheckedItemIds,
    handleSelectAll,
    handleCheckbox,
    selectAll,
    checkedItems,
    editItem,
    toggleModal,
    item,
    isModalOpen,
    
  } = useTable(tableData);
  const { deleteDocuments, downloadDocuments } = useDocuments();
  const {getOrderById, orderById} = useOrders()
  const {deleteProduct} = useProducts("")


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

        {page === "documents" && (
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
                width="h-full"
                onClick={() => downloadDocuments(getCheckedItemIds)}
                disabled={false}
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
                width="h-full"
                onClick={() => deleteDocuments(getCheckedItemIds)}
                disabled={false}
              />
            </div>
          </div>
        )}

        {divider && <div className="border border-borderGray w-full" />}

        <div className={`overflow-auto`}>
          <table className="w-full table-auto rounded-[8px] font-barlow border-separate border-spacing-y-[12px]">
            <thead className={`h-[47px] ${bgHeader} relative w-full`}>
              <tr className={`${bgHeader}  relative z-10 py-[12px] h-[47px] `}>
                {checkbox && (
                  <th className="px-[12px] text-start">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
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

            <tbody className="bg-transparent">
              {tableData?.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className={`${bgRows} w-full ${
                      rowBorder ? "rowBorder" : ""
                    }`}
                  >
                    {checkbox && (
                      <td className="px-[12px] py-[8px] bg-white">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={
                            ("id" in item && checkedItems[item?.id]) || false
                          }
                          onChange={(event) =>
                            "id" in item && handleCheckbox(event, item?.id)
                          }
                        />
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
                      } else if (
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
                      } else if (
                        typeof value != "object" &&
                        key != "id" &&
                        key != "fileURL"
                      ) {
                        return (
                          <td
                            onClick={
                              key == "orders" && "orderId" in item
                                ? () => {
                                    getOrderById(item?.orderId, toggleModal);
                                  }
                                : () => {}
                            }
                            key={key}
                            className={`text-start px-[12px] lg:text-[12px] xl:text-[14px] py-[8px] font-[500] ${key == "orders" && "orderId" in item && "cursor-pointer"}`}
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
                            <Link
                              href={(item as documentsTableData).fileURL}
                              target="_blank"
                            >
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
                                onClick={() => {}}
                                disabled={false}
                              />
                            </Link>
                          ) : (
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
                              onClick={() => deleteProduct(item)}
                              disabled={false}
                            />
                          )}

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
                            onClick={() => editItem(item)}
                            disabled={false}
                          />
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
              (page === "documents" || page === "orders") && "hidden"
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

          <div
            className={`${isModalOpen ? "block" : "hidden"} ${
              page != "orders" && "hidden"
            }`}
          >
            <OrderedProductsModal toggleModal={toggleModal} order={orderById} />
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default Table;
