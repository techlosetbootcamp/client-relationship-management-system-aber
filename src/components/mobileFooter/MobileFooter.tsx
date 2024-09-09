import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import fb from "@/assets/images/facebook.svg";
import insta from "@/assets/images/instagram.svg";
import twitter from "@/assets/images/twitter.svg";

const MobileFooter = () => {
  return (
    <div className="w-full xs:flex flex-col gap-[10px] lg:hidden bg-white sticky mt-auto font-barlow mt-[67px] py-[17px] px-[32px] ">
      <div className="flex flex-col gap-[43px]">
        <div>
          <Image src={logo} alt="logo-img" />
          <p className="font-[400] text-[16px] leading-[19.2px] text-darkGray py-[10px]">
            Crafting Connections,
            <br /> One Customer at a Time.
          </p>
        </div>
        <ul className="flex flex-col gap-[24px] font-[400] text-[16px] leading-[19.2px] text-darkGray">
          <li className="">Dashboard</li>
          <li className="">Customers</li>
          <li className="">
            Order Overview
          </li>
          <li className="">Analytics</li>
          <li className="">
            Accounting
          </li>
        </ul>
        <ul className="flex gap-[24px]">
          <li className="">
            <Image src={fb} alt="fb-icon" />
          </li>
          <li className="">
            <Image src={insta} alt="insta-icon" />
          </li>
          <li className="">
            <Image src={twitter} alt="twitter-icon" />
          </li>
        </ul>
        <div className="flex flex-col gap-[8px] font-[400] text-[16px] leading-[19.2px] text-darkGray">
          <p className="">Privacy Policy</p>
          <p className="">
            © 2023 Mugna Technologies, Inc.
          </p>
          <p className="">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
