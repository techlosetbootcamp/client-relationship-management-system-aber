"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.svg";
import { GrMenu } from "react-icons/gr";
import { useSidebarContext } from "@/providers/sidebarContextProvider/SidebarContextProvider";

const TopBar = () => {
  const obj = useSidebarContext();

  return (
    <>
      <div className="bg-white relative z-30 h-[62px] py-[8px] xs:px-[10px] sm:px-[44px]  justify-between  xs:flex lg:hidden">
        <div className="pr-[16px] py-[5px] flex justify-center items-center">
          <Image src={logo} alt="company-logo" className="" />
        </div>

        <div
          onClick={() => obj?.toggleSidebar()}
          className={`h-[40px] w-[56px] bg-primaryPurple rounded-[4px] py-[5px] px-[13px] border border-borderGray flex justify-center items-center`}
        >
          <GrMenu color="white" size={22} />
        </div>
      </div>
    </>
  );
};

export default TopBar;
