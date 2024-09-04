// allow read, write: if true;
"use client";
import Avatar from "@/components/avatar/Avatar";
import React, { useState } from "react";
import img from "@/assets/images/avatar.png";
import userAvatar from "@/assets/images/userAvatar.png";
import avatar from "@/assets/images/avatar.png";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { documentsTableData, TableProps } from "@/types/Types";
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
import Link from "next/link";
import OrderedProductsModal from "../orderedProductsModal/OrderedProductsModal";

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
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [orderById, setOrderById] = useState<any>([]);
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

  const handleSelectAll = () => {
    const temp = !selectAll;
    setSelectAll(!selectAll);
    const checkedArray: any = {};
    tableData.forEach((item) => {
      console.log(item.id);
      checkedArray[item.id] = temp;
    });

    console.log("checkedArray", checkedArray);

    setCheckedItems(checkedArray);
    console.log("checkedItems", checkedItems);
  };

  const handleCheckbox = (e: any, id: string) => {
    const isChecked = e.target.checked;
    console.log(isChecked, e.target);
    setCheckedItems((prevState: any) => {
      const newCheckedItems = {
        ...prevState,
        [id]: isChecked,
      };

      console.log("newCheckedItems", newCheckedItems);
      const allChecked = tableData.every((item) => newCheckedItems[item.id]);
      console.log("allChecked", allChecked);
      setSelectAll(allChecked);
      return newCheckedItems;
    });
  };

  const getCheckedItemIds = () => {
    return Object.keys(checkedItems).filter((id) => checkedItems[id]);
  };

  const deleteDocuments = async () => {
    const checkedItemsIds = getCheckedItemIds();

    const response = await axiosInstance.post("/documents/delete-documents", {
      checkedItemsIds,
    });
    console.log("delete docs response", response);
  };

  const getOrderById = async (orderId: string) => {
    const response = await axiosInstance.post("/order/get-order-by-id", {
      orderId,
    });

    // const orderDataArray = response.data.order.orders.map((item: any) => {
    //   console.log(item);
    //   return {
    //     productId: item.product.id,
    //     image: item.product.image,
    //     name: item.product.productName,
    //     category: item.product.category,
    //     price: item.product.price,
    //     quantity: item.quantity,
    //   };
    // });
    setOrderById(response.data.order.orders);

    console.log("get order by id clicked", orderById);
    toggleModal();

    // console.log("client response in getorder by id", response.data.order.orders);
  };

  const downloadDocuments = async () => {
    console.log("download is clicked");
    const checkedItemsIds = getCheckedItemIds();

    try {
      const response = await axiosInstance.post(
        "/documents/download-documents",
        { checkedItemsIds }
      );
      console.log("in table document function", response);

      if (response.data.documents.length > 0) {
        response.data.documents.map(async (doc: any) => {
          if (doc && doc.type && doc.fileName && doc.fileURL) {
            const filePath = doc.fileName + "." + doc.type;
            const fetchURL = await fetch(doc.fileURL);
            if (!fetchURL.ok) throw new Error("Network response was not ok");

            const blob = await fetchURL.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Create a download link and trigger a download
            const link = document.createElement("a");

            link.href = blobUrl;
            link.download = filePath; // Use the filename from the path
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the Blob URL
            URL.revokeObjectURL(blobUrl);
          }
        });
      }

      // const response = await fetch(

      //   "https://firebasestorage.googleapis.com/v0/b/crm-techloset.appspot.com/o/Signature%20Page.pdf?alt=media&token=829dacc8-abf0-4af4-95e2-ba8e46f0180b"
      // );
      // if (!response.ok) throw new Error("Network response was not ok");

      // const blob = await response.blob();
      // const blobUrl = URL.createObjectURL(blob);

      // // Create a download link and trigger a download
      // const link = document.createElement("a");
      // const filePath = "Signature Page.pdf";
      // link.href = blobUrl;
      // link.download = filePath; // Use the filename from the path
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // // Clean up the Blob URL
      // URL.revokeObjectURL(blobUrl);

      // console.log("PDF downloaded successfully");

      console.log("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
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
                width="h-full"
                onClick={downloadDocuments}
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
                onClick={deleteDocuments}
                disabled={false}
              />
            </div>
          </div>
        )}

        {divider && <div className="border border-borderGray w-full" />}

        <div className={``}>
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
            {/* <tbody className="w-full  flex flex-col gap-[12px]  text-[14px] leading-[21px] py-[8px] rounded-[5px] font-medium text-mediumGray gap-[12px]"> */}
            <tbody className="bg-transparent">
              {tableData?.map((item, i) => {
                // console.log(checkedItems[item?.id] || checkedItems);
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
                          checked={checkedItems[item?.id] || false}
                          onChange={() => handleCheckbox(event, item?.id)}
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
                      } else if (
                        typeof value != "object" &&
                        key != "id" &&
                        key != "fileURL"
                      ) {
                        return (
                          <td
                            onClick={
                              key == "orders"
                                ? () => {
                                    getOrderById(item?.id);
                                  }
                                : () => {
                                    console.log("clicked not order");
                                  }
                            }
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
