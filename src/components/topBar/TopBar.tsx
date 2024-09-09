"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.svg";
import { GrMenu } from "react-icons/gr";
import MobileSidebar from "../mobileSidebar/MobileSidebar";
import { useSidebarContext } from "@/providers/sidebarContextProvider/SidebarContextProvider";

const TopBar = () => {
    const obj = useSidebarContext()
    console.log("obj inside topbar" , obj)
//   const [toggle, setToggle] = useState(false);
//   const toggleSidebar = () => {
//     console.log("toggle is clicked", toggle);
//     setToggle(!toggle);
//   };

//     useEffect(() => {
//       if (toggle) {
//         document.body.style.overflow = "hidden";
//       } else {
//         document.body.style.overflow = "";
//       }

//       return () => {
//         document.body.style.overflow = "";
//       };
//     }, [toggle]);

  return (
    <>
      <div className="bg-white relative z-30 h-[62px] py-[8px] xs:px-[10px] sm:px-[44px]  justify-between  xs:flex lg:hidden">
        <div className="pr-[16px] py-[5px] flex justify-center items-center">
          <Image src={logo} alt="company-logo" className="" />
        </div>

        <div
          onClick={()=>obj?.toggleSidebar()}
          className={`h-[40px] w-[56px] bg-primaryPurple rounded-[4px] py-[5px] px-[13px] border border-borderGray flex justify-center items-center`}
        >

          <GrMenu color="white" size={22} />
        </div>
      </div>
      {/* <div
        className={`${
          toggle ? "translate-x-0 backdrop-brightness-50" : "translate-x-full"
        }  transition duration-300 ease-in-out border-2 border-red overflow-x-hidden  z-10 fixed top-0`}
      >
        <MobileSidebar />
      </div> */}
    </>
  );
};

export default TopBar;
