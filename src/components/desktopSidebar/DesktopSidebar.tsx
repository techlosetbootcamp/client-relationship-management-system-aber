import React from "react";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import Img1 from "@/assets/images/nav-icon1.svg";
import img2 from "@/assets/images/nav-icon2.svg";
import img3 from "@/assets/images/nav-icon3.svg";
import img4 from "@/assets/images/nav-icon4.svg";
import img5 from "@/assets/images/nav-icon5.svg";
import img6 from "@/assets/images/nav-icon6.svg";
import img7 from "@/assets/images/nav-icon7.svg";
import img8 from "@/assets/images/nav-icon8.svg";
import img9 from "@/assets/images/nav-icon9.svg";

const navData = [
  {
    text: "Dashboard",
    icon: Img1,
    path: "#",
  },
  {
    text: "Notifications",
    icon: img2,
    path: "#",
  },
  {
    text: "Customers",
    icon: img3,
    path: "#",
  },
  {
    text: "Order Review",
    icon: img4,
    path: "#",
  },
  {
    text: "Analytics",
    icon: img5,
    path: "#",
  },
  {
    text: "Documents",
    icon: img6,
    path: "#",
  },
  {
    text: "Help",
    icon: img7,
    path: "#",
  },
  {
    text: "Settings",
    icon: img8,
    path: "#",
  },
  {
    text: "Log Out",
    icon: img9,
    path: "#",
  },
];

const DesktopSidebar = () => {
  return (
    // Apply shadow later
    <div className="bg-white w-[220px] border-2" >  
      <div className="px-[16px] py-[32px]">
        <Image
          src={logo}
          alt="company-logo"
        />

        <div className="py-[32px] flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <p className="py-[8px]">General</p>
            <div className="flex flex-col gap-[4px]">
              {navData.slice(0, 6).map((item) => {
                  return (
                      <div key={item.text} className="flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] ">
                     
                    <Image src={item.icon} alt="nav-icon" />
                
                    <div className="">
                      {item.text}
                    </div>
                  </div>
                );
              })}

           
            </div>
          </div>

          <div className=" flex flex-col gap-[16px]">
            <p className="py-[8px]">Support</p>
            <div className="flex flex-col gap-[4px]">
              {navData.slice(6, 9).map((item) => {
                return (
                  <div key={item.text} className="flex h-[40px] px-[16px] py-[8px] opacity-[0px] w-full gap-[8px] cursor-pointer hover:text-[#9A55FF] hover:bg-[#E7D7FF] ">
                    <Image src={item.icon} alt="nav-icon" />
                    <div className="">
                      {item.text}
                    </div>
                  </div>
                );
              })}

           
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DesktopSidebar;
// box-shadow: 0px 4px 10px 0px #00000014;
