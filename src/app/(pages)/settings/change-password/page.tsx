"use client";
import React from "react";

import InputField from "@/components/inputField/InputField";
import Button from "@/components/button/Button";
import useChangePassword from "@/hooks/useChangePassword";
import { CgSpinner } from "react-icons/cg";

const Page = () => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    onsubmit,
    isLoading
  } = useChangePassword();

  return (
    <div className="font-albertSans w-full h-screen flex">
      <div className="xs:w-full md:w-[70%] lg:w-[45%] flex flex-col gap-[50px] mx-auto justify-center items-center">
        {" "}
        <p className="text-[28px] font-[700]">Change Password</p>
        <div className="flex flex-col gap-[15px] w-full">
          <InputField
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="New Password"
            value={newPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <Button
            text={isLoading ? "Updating Password..." : "Update Password"}
            background="bg-primaryPurple"
            color="text-white"
            fontSize="text-[16px]"
            fontWeight="font-[600]"
            rounded="rounded-[4px]"
            gap="gap-[8px]"
            lineHeight="leading-[24px]"
            border="border-primaryPurple border"
            px="px-[12px]"
            py="py-[6px]"
            img={""}
            width=""
            onClick={onsubmit}
            Icon={isLoading ? CgSpinner : null}
          disabled={isLoading ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
