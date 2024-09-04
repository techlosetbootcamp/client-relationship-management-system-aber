"use client";
import React from "react";
import InputField from "../inputField/InputField";
import Button from "../button/Button";
import iconImg from "@/assets/images/searchIcon.svg";

const SearchInput = () => {
  return (
    // xs:hidden
    <div className="h-[38px] w-full  rounded-[4px] xs:flex self-center">
      <InputField
        placeholder="Type Here"
        type="text"
        value=""
        height={"h-full"}
        width="md:w-[201px] xs:w-full"
        rounded="rounded-[0px]"
        onChange={() => {}}
      />
      <Button
        text={"Search"}
        fontSize="text-[16px]"
        fontWeight="font-semibold"
        color="text-white"
        background="bg-primaryPurple"
        img={iconImg}
        rounded="none"
        gap="gap-[8px]"
        py="py-[6px]"
        px="px-[12px]"
        lineHeight="leading-[24px]"
        border=""
        width=""
        Icon={null}
        onClick={()=>{}}
        disabled={false}
      />
    </div>
  );
};

export default SearchInput;
