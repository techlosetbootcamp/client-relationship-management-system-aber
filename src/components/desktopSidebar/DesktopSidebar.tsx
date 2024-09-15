"use client";
import React from "react";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";

import { NavLinks } from "@/constants/NavLinks";
import Link from "next/link";

import Img from "@/assets/images/Icon1";
import { usePathname } from "next/navigation";

import { SignOutHandler } from "@/helpers/SignOutHandler";

const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="xs:hidden lg:block bg-white min-w-[220px] h-full border-2 box-border my-[22px]">
      <div className="px-[16px] py-[32px] flex flex-col gap-[32px]">
        <div className="px-[16px]">
          <Link href="/">
            <Image src={logo} alt="company-logo" className="" />
          </Link>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <p className="py-[8px] text-mediumGray text-[12px] leading-[18px] font-albertSans font-[700]">
              GENERAL
            </p>
            <div className="flex flex-col gap-[16px] ">
              {NavLinks.slice(0, 6).map((item) => {
                return (
                  <Link
                    key={item.text}
                    href={item.path}
                    className={`${
                      pathname === item.path ? "active" : ""
                    }  [&.active]:text-[#9A55FF] [&.active]:bg-[#E7D7FF] text-darkGray hover:text-[#9A55FF] hover:bg-[#E7D7FF] rounded-[4px]`}
                  >
                    <div className="flex h-[40px] px-[16px] py-[8px] w-full gap-[8px] cursor-pointer">
                      <div className="flex items-center">{item.icon}</div>

                      <div className="font-barlow ">{item.text}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <p className="py-[8px] text-mediumGray text-[12px] leading-[18px] font-albertSans font-[700]">
              STORE
            </p>
            <div className="flex flex-col gap-[16px] ">
              {NavLinks.slice(6, 9).map((item) => {
                return (
                  <Link
                    key={item.text}
                    href={item.path}
                    className={`${
                      pathname === item.path ? "active" : ""
                    }  [&.active]:text-[#9A55FF] [&.active]:bg-[#E7D7FF] text-darkGray hover:text-[#9A55FF] hover:bg-[#E7D7FF] rounded-[4px]`}
                  >
                    <div className="flex h-[40px] px-[16px] py-[8px] w-full gap-[8px] cursor-pointer">
                      <div className="flex items-center">{item.icon}</div>

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
              {NavLinks.slice(9, 11).map((item) => {
                return (
                  <Link
                    key={item.text}
                    href={item.path}
                    className={`${
                      pathname === item.path ? "active" : ""
                    }  [&.active]:text-[#9A55FF] [&.active]:bg-[#E7D7FF] text-darkGray hover:text-[#9A55FF] hover:bg-[#E7D7FF] rounded-[4px]`}
                  >
                    <div
                      key={item.text}
                      className="text-darkGray flex h-[40px] px-[16px] py-[8px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] "
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
            {NavLinks.slice(11, 12).map((item) => {
              return (
                <div
                  key={item.text}
                  onClick={SignOutHandler}
                  className="text-darkGray flex h-[40px] px-[16px] py-[8px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] rounded-[4px]"
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
