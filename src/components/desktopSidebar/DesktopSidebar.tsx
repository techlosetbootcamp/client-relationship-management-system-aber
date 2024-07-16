import React from "react";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";

import { NavLinks } from "@/constants/NavLinks";
import Link from "next/link";

import Img from "@/assets/images/Icon1";

const DesktopSidebar = () => {
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
              {NavLinks.slice(0, 6).map((item) => {
                return (
                  <Link key={item.text} href={item.path} className="">
                    <div
                      key={item.text}
                      className="text-darkGray flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] "
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
              {NavLinks.slice(6, 8).map((item) => {
                return (
                  <div
                    key={item.text}
                    className="text-darkGray flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] "
                  >
                    <div className="flex items-center">{item.icon}</div>
                    <div className="font-barlow">{item.text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="">
            {NavLinks.slice(8, 9).map((item) => {
              return (
                <div
                  key={item.text}
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
