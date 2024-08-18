"use client";
import React, { useState } from "react";

const labels = [
  {
    label: "All",
  },
  {
    label: "Active",
  },
  {
    label: "Archive",
  },
];

const Tabs = () => {
  const [tab, setTab] = useState("All");
  return (
    <div className="flex">
      <nav className=" flex justify-between xs:leading-[21px] xs:text-[14px] xl:leading-[24px] xl:text-[16px]  font-[600] text-darkGray">
        {labels.map((item) => {
          return (
            <p
            key={item.label}
              onClick={() => setTab(item.label)}
              className={`cursor-pointer transition-all duration-700 py-[8px] px-[16px] border-b-[4px] ${
                tab === item.label ? "border-primaryPurple" : " border-darkGray"
              }`}
            >
              {item.label}
            </p>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
