"use client";
import React, { useState } from "react";
import Button from "@/components/button/Button";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { useSession } from "next-auth/react";
import Avatar from "@/components/avatar/Avatar";
import userAvatar from "@/assets/images/userAvatar.png";
import InputField from "@/components/inputField/InputField";

const page = () => {
  const session = useSession();

  const [name, setName] = useState(session?.data?.user?.name );
  const [email, setEmail] = useState(session?.data?.user?.email );

  console.log(session,name,email);
  return (
    <div className="border-2 flex flex-col gap-[22px] w-full py-[41px] px-[15%]">
      <CardWrapper>
        <div className="flex  justify-between w-full">
          <div className="flex items-center gap-[16px]">
            <div className="w-fit">
              <Avatar
                size="h-[64px] w-[64px] rounded-full"
                background="bg-white"
                img={userAvatar}
              />
            </div>
            <p className="font-[600] text-[18px]">{session?.data?.user?.name}</p>
          </div>
          <div className="flex items-center">
            <Button
              text={"Change Photo"}
              background="bg-primaryPurple"
              color="text-white"
              rounded="rounded-[8px]"
              fontWeight="font-[600]"
              fontSize="text-[16px]"
              width="w-fit"
              px="px-[8px]"
              py="py-[14px]"
              lineHeight="leading-[18px]"
              gap=""
              img={""}
              border=""
            />
          </div>
        </div>
      </CardWrapper>

      <InputField
        placeholder="Username"
        value={name ?? ''}
        width="w-full"
        height="h-[45px]"
        rounded="rounded-[8px]"
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        placeholder="Email"
        value={email ?? ''}
        width="w-full"
        height="h-[45px]"
        rounded="rounded-[8px]"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default page;
