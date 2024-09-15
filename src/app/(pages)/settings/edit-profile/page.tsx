"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";

import Avatar from "@/components/avatar/Avatar";
import userAvatar from "@/assets/images/userAvatar.png";
import InputField from "@/components/inputField/InputField";

import useEditProfile from "@/hooks/useEditProfile";

import { LuLoader2 } from "react-icons/lu";
import { CgSpinner } from "react-icons/cg";

const Page = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    handleFileChange,
    handleButtonClick,
    updateProfile,
    fileInputRef,
    session,
    isProfileLoading,
    isLoading,
  } = useEditProfile();

  return (
    <div className="flex flex-col gap-[22px] w-full py-[41px] md:px-[10%] lg:px-[15%]">
      <CardWrapper width="w-full" height="" flexDirection="flex-row">
        <div className="flex md:flex-row xs:flex-col gap-[20px] justify-between w-full">
          <div className="flex xs:justify-center items-center xs:gap-[8px] md:gap-[16px]">
            <div className="w-fit">
              {isProfileLoading ? (
                <div className="xs:h-[50px] md:h-[64px] xs:w-[50px] md:w-[64px] rounded-full border-2 border-mediumGray flex justify-center items-center">
                  <LuLoader2 className="animate-spin mx-auto" size={35} />
                </div>
              ) : (
                <Avatar
                  height="xs:h-[50px] md:h-[64px]"
                  width="xs:w-[50px] md:w-[64px]"
                  radius="rounded-full"
                  background=""
                  img={session.data?.user?.image ?? userAvatar}
                />
              )}
            </div>
            <p className="font-[600] xs:text-[15px] md:text-[18px]">
              {session?.data?.user?.name}
            </p>
          </div>
          <div className="flex items-center">
            <Button
              text={"Change Photo"}
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
              width="xs:w-full md:w-fit"
              onClick={handleButtonClick}
              disabled={false}
            />
          </div>
        </div>
      </CardWrapper>

      <InputField
        type="text"
        placeholder="Username"
        value={name ?? ""}
        width="w-full"
        height="h-[45px]"
        rounded="rounded-[8px]"
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        type="email"
        placeholder="Email"
        value={email ?? ""}
        width="w-full"
        height="h-[45px]"
        rounded="rounded-[8px]"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="w-full flex md:justify-end ">
        <Button
          text={isLoading ? "Updating Profile..." : "Update Profile"}
          background="bg-primaryPurple"
          color="text-white"
          fontSize="text-[16px]"
          fontWeight="font-[600]"
          rounded="rounded-[4px]"
          lineHeight="leading-[24px]"
          border="border-primaryPurple border"
          px="px-[12px]"
          py="py-[6px]"
          gap=""
          img={""}
          width="xs:w-full md:w-fit"
          onClick={updateProfile}
          Icon={isLoading ? CgSpinner : null}
          disabled={isLoading ? true : false}
        />
      </div>

      <input
        className="hidden"
        type="file"
        name=""
        id=""
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Page;
