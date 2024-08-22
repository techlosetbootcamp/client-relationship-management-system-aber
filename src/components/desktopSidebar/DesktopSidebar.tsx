"use client";
import React from "react";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";

import { NavLinks } from "@/constants/NavLinks";
import Link from "next/link";

import Img from "@/assets/images/Icon1";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const SignOutHandler = async () => {
  console.log("SIgnput Button is clikced");
  await signOut({
    redirect: true,
    callbackUrl: "/login",
  });
};

const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    // Apply shadow later
    <div className="xs:hidden lg:block bg-white min-w-[220px] h-full border-2 box-border my-[22px]">
      <div className="px-[16px] py-[32px] flex flex-col gap-[32px]">
        <div className="px-[16px]">
          <Image src={logo} alt="company-logo" className="" />
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <p className="py-[8px] text-mediumGray text-[12px] leading-[18px] font-albertSans font-[700]">
              GENERAL
            </p>
            <div className="flex flex-col gap-[16px] ">
              {NavLinks.slice(0, 8).map((item) => {
                return (
                  <Link
                    key={item.text}
                    href={item.path}
                    className={`${
                      pathname === item.path ? "active" : ""
                    }  [&.active]:text-[#9A55FF] [&.active]:bg-[#E7D7FF] text-darkGray hover:text-[#9A55FF] hover:bg-[#E7D7FF]`}
                  >
                    <div
                      key={item.text}
                      className="flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer"
                    >
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
          </div>

          <div className=" flex flex-col gap-[16px]">
            <p className="py-[8px] text-mediumGray text-[12px] leading-[18px] font-albertSans font-[700]">
              SUPPORT
            </p>
            <div className="flex flex-col gap-[16px] ">
              {NavLinks.slice(8, 10).map((item) => {
                return (
                  <Link
                    key={item.text}
                    href={item.path}
                    className={`${
                      pathname === item.path ? "active" : ""
                    }  [&.active]:text-[#9A55FF] [&.active]:bg-[#E7D7FF] text-darkGray hover:text-[#9A55FF] hover:bg-[#E7D7FF]`}
                  >
                    <div
                      key={item.text}
                      className="text-darkGray flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] "
                    >
                      <div className="flex items-center">{item.icon}</div>
                      <div className="font-barlow">{item.text}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="">
            {NavLinks.slice(10, 11).map((item) => {
              return (
                <div
                  key={item.text}
                  onClick={SignOutHandler}
                  className="text-darkGray flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] "
                >
                  <div className="flex items-center">{item.icon}</div>
                  <div className="font-barlow">{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
// box-shadow: 0px 4px 10px 0px #00000014;
