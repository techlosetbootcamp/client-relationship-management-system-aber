"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";

import Avatar from "@/components/avatar/Avatar";
import userAvatar from "@/assets/images/userAvatar.png";
import InputField from "@/components/inputField/InputField";

import useEditProfile from "@/hooks/useEditProfile";

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
  } = useEditProfile();

  return (
    <div className="border-2 flex flex-col gap-[22px] w-full py-[41px] md:px-[10%] lg:px-[15%]">
      <CardWrapper width="w-full" height="" flexDirection="flex-row">
        <div className="flex  justify-between w-full">
          <div className="flex items-center xs:gap-[8px] md:gap-[16px]">
            <div className="w-fit">
              <Avatar
                height="xs:h-[50px] md:h-[64px]"
                width="xs:w-[50px] md:w-[64px]"
                radius="rounded-full"
                background=""
                img={session.data?.user?.image ?? userAvatar}
              />
            </div>
            <p className="font-[600] xs:text-[15px] md:text-[18px]">
              {session?.data?.user?.name}
            </p>
          </div>
          <div onClick={handleButtonClick} className="flex items-center">
            <Button
              text={"Change Photo"}
              background="bg-primaryPurple"
              color="text-white"
              rounded="rounded-[8px]"
              fontWeight="font-[600]"
              fontSize="xs:text-[14px] md:text-[16px]"
              px="xs:px-[5px] md:px-[8px]"
              py="xs:py-[10px] md:py-[14px]"
              lineHeight="leading-[18px]"
              gap=""
              img={""}
              width=""
              border=""
              Icon={null}
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

      <div onClick={updateProfile} className="w-full flex justify-end">
        <Button
          text={"Update Profile"}
          background="bg-primaryPurple"
          color="text-white"
          rounded="rounded-[8px]"
          fontWeight="font-[600]"
          fontSize="xs:text-[14px] md:text-[16px]"
          px="xs:px-[5px] md:px-[8px]"
          py="xs:py-[10px] md:py-[14px]"
          lineHeight="leading-[18px]"
          gap=""
          img={""}
          border=""
          width=""
          Icon={null}
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
