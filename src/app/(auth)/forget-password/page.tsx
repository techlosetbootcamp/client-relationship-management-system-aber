"use client";
import React, { useState } from "react";
import logo from "@/assets/images/logo.svg";
import googleLogo from "@/assets/images/google.svg";
import Image from "next/image";
import InputField from "@/components/inputField/InputField";
import Button from "@/components/button/Button";
import { CgSpinner } from "react-icons/cg";
import useForgetPassword from "@/hooks/useForgetPassword";

const Page = () => {
  const { email, setEmail, onSubmit, isLoading } = useForgetPassword();

  return (
    <div className="font-albertSans border-2 border-secondaryRed w-full h-screen flex">
      <div className=" w-[30%] flex flex-col gap-[50px] mx-auto justify-center items-center">
        <Image src={logo} alt="logo-image" height={30} priority />

        <div className="flex flex-col gap-[15px] w-full">
          <InputField
            type="email"
            placeholder="Enter Your Email"
            value={email}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            text="Send Code"
            background="bg-primaryPurple"
            width="w-full"
            py="py-[8px]"
            rounded="rounded-[8px]"
            color="text-white"
            fontSize="text-[18px]"
            fontWeight="font-[600]"
            img={""}
            gap=""
            px=""
            lineHeight=""
            border=""
            onClick={onSubmit}
            Icon={isLoading ? CgSpinner : null}
            disabled={isLoading ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
