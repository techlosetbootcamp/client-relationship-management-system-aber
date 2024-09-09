"use client";
import { NavLinks } from "@/constants/NavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputField from "../inputField/InputField";
import Button from "../button/Button";
import iconImg from "@/assets/images/searchIcon.svg";
import { useSidebarContext } from "@/providers/sidebarContextProvider/SidebarContextProvider";

const MobileSidebar = () => {
  const pathname = usePathname();

  const obj = useSidebarContext();

  useEffect(() => {
    if (obj?.toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [obj?.toggle]);

  return (
    <div
      className={` ${
        obj?.toggle
          ? "translate-x-0 backdrop-brightness-50"
          : "translate-x-full"
      }  transition duration-450 ease-in-out bg-lightGray lg:hidden w-full fixed top-0 h-screen overflow-scroll z-20 pl-[12px] pt-[62px] pr-[65px] pb-[8px] flex flex-col gap-[16px]`}
    >
      <div className="flex flex-col gap-[16px] ">
        {NavLinks.map((item) => {
          return (
            <Link
              onClick={() => obj?.toggleSidebar()}
              key={item.text}
              href={item.path}
              className={`${
                pathname === item.path ? "active" : ""
              }  [&.active]:text-[#9A55FF] [&.active]:bg-[#E7D7FF] text-darkGray hover:text-[#9A55FF] hover:bg-[#E7D7FF] rounded-[4px]`}
            >
              <div className="flex h-[40px] px-[16px] py-[8px] w-full gap-[8px] cursor-pointer">
                {/* <Img fill=""/> */}

                {/* <Image src={item.icon} alt="nav-icon" /> */}
                <div className="flex items-center">{item.icon}</div>
                {/* <item.icon/> */}

                <div className="font-barlow ">{item.text}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex gap-[8px]">
        <InputField
          type="text"
          height="h-[43px]"
          width="w-full"
          rounded="rounded-[4px]"
          placeholder="Type here"
          onChange={() => {}}
        />

        <Button
          text={"Search"}
          fontSize="text-[14.4px]"
          fontWeight="font-[600]"
          color="text-white"
          background="bg-primaryPurple"
          img={iconImg}
          rounded="rounded-[4px]"
          gap="gap-[8px]"
          py="py-[6px]"
          px="px-[12px]"
          lineHeight="leading-[17.28pxpx]"
          border=""
          width=""
          Icon={null}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default MobileSidebar;
