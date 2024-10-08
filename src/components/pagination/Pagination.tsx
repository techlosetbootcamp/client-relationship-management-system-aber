"use client";
import React, { useState } from "react";
import Button from "../button/Button";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [
    {
      pageNumber: page,
    },
    {
      pageNumber: page + 1,
    },
    {
      pageNumber: page + 2,
    },
    {
      pageNumber: page + 3,
    },
    {
      pageNumber: page + 4,
    },
  ];

  const prev = () =>{
    if(page>1){
        setPage(page-1)
    }
  }

  const next = () =>{
    setPage(page+1)
  }

  return (
    <div className="flex items-center">
      <div onClick={()=>prev()} className="border flex items-center py-[4px] px-[8px] h-[31px] leading-[18px] rounded-l-[3.2px]">
        <IoIosArrowBack color= {page>1 ? "#9A55FF" :"#DEE2E6" }/>
      </div>
      {pages.map((item) => {
        return (
            <div key={item.pageNumber}  >
          <Button
            text={item.pageNumber}
            background={item.pageNumber===currentPage ?"bg-primaryPurple" : "bg-white"}
            img=""
            color={item.pageNumber===currentPage ?"text-white" :"text-primaryPurple" }
            width="w-[26px] h-[31px]"
            px="px-[8px]"
            py="py-[4px]"
            rounded=""
            gap=""
            fontSize="text-[12px]"
            fontWeight="font-[400]"
            lineHeight="leading-[18px]"
            border="border border-[#DEE2E6]"
            onClick={()=>setCurrentPage(item.pageNumber)}
            disabled={false}
          />
          </div>
        );
      })}

      <div onClick={()=>next()} className="border flex items-center py-[4px] px-[8px] h-[31px] leading-[18px] rounded-r-[3.2px]">
        <IoIosArrowForward color= "#9A55FF" />
      </div>
    </div>
  );
};

export default Pagination;
