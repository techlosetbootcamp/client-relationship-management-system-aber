import React from "react";
import logo from "@/assets/images/logo.svg";
import fb from "@/assets/images/facebook.svg";
import insta from "@/assets/images/instagram.svg";
import twitter from "@/assets/images/twitter.svg";
import Image from "next/image";
import Link from "next/link";

const DesktopFooter = () => {
  return (
    <div className="w-full h-[225px] xs:hidden md:block bg-white sticky mt-auto font-barlow mt-[67px]">
      <div className="md:mx-[62px] xl:mx-[70.5px] py-[17px] flex flex-col gap-[16px]">
        <div className="py-[10px] flex justify-between items-center">
          <Link href="/">
            <Image src={logo} alt="logo-img" />
          </Link>

          <ul className="flex gap-[24px]">
            <Link href="/">
              <li className="px-[8px] leading-[19.2px] text-darkGray">
                Dashboard
              </li>
            </Link>

            <Link href="/customers">
              <li className="px-[8px] leading-[19.2px] text-darkGray">
                Customers
              </li>
            </Link>

            <Link href="/order-overview">
              <li className="px-[8px] leading-[19.2px] text-darkGray">
                Order Overview
              </li>
            </Link>

            <Link href="/analytics">
              <li className="px-[8px] leading-[19.2px] text-darkGray">
                Analytics
              </li>
            </Link>

            <li className="px-[8px] leading-[19.2px] text-darkGray">
              Accounting
            </li>
          </ul>
        </div>
        <div className="py-[10px] flex justify-between items-center">
          <p className="leading-[19.2px] text-darkGray">
            Crafting Connections, One Customer at a Time.
          </p>

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
        </div>

        <div className="border-t border-borderGray py-[10px]" />

        <div className="flex justify-between">
          <p className="leading-[19.2px] text-darkGray">Privacy Policy</p>
          <p className="leading-[19.2px] text-[#4C4A4F] font-[500]">
            © 2023 Mugna Technologies, Inc.
          </p>
          <p className="leading-[19.2px] text-darkGray">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
