"use client";
import React, { useState } from "react";

import InputField from "@/components/inputField/InputField";
import Button from "@/components/button/Button";

import useChangePassword from "@/hooks/useChangePassword";

const Page = () => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    onsubmit,
  } = useChangePassword();

  return (
    <div className="font-albertSans border-2 border-secondaryRed w-full h-screen flex">
      <div className=" w-[45%] flex flex-col gap-[50px] mx-auto justify-center items-center">
        {" "}
        {/*self-center */}
        {/* <Image src={logo} alt="logo-image" height={30} priority /> */}
        {/* <form action="" className="w-full"> */}
        <p className="text-[28px] font-[700]">Change Password</p>
        <div className="flex flex-col gap-[15px] w-full">
          <InputField
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="New Password"
            value={newPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <Button
            text="Update Password"
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
            onClick={onsubmit}
            disabled={false}
          />
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Page;
