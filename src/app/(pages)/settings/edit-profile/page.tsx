"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { useSession } from "next-auth/react";
import Avatar from "@/components/avatar/Avatar";
import userAvatar from "@/assets/images/userAvatar.png";
import InputField from "@/components/inputField/InputField";
import axios from "axios";

const Page = () => {
  const session = useSession();
  console.log(session);

  const [name, setName] = useState(session?.data?.user?.name);
  const [email, setEmail] = useState(session?.data?.user?.email);
  const [image, setImage] = useState(session?.data?.user?.email);

  const updateProfile = async () => {
    console.log("I am clicked");
    // const response =""
    const response = await axios.post(
      "http://localhost:3000/api/user/update-user",
      {
        id: session.data?.user?.id,
        currentEmail: session.data?.user?.email,
        newEmail: email,
        name,
      }
    );
    console.log("response in update profile", response);
    session.update({
      name: response?.data?.updatedUser?.name,
      email: response?.data?.updatedUser?.email,
    });
    console.log("Your profile has been updated");
  };
  useEffect(() => {
    if (session?.data?.user) {
      setName(session?.data?.user?.name ?? "");
      setEmail(session?.data?.user?.email ?? "");
    }
  }, [session]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    console.log("clicked");
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file && email) {
      // Handle the selected file here
      console.log(file);
      setImage(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("email", email);
      const imageResponse = await axios.post(
        "http://localhost:3000/api/user/update-profile-image",
        formData
      );

      session.update({ image: imageResponse?.data?.response?.secure_url });

      console.log(
        "change picture response",
        imageResponse,
        "session after change",
        session
      );
    }
  };
  return (
    <div className="border-2 flex flex-col gap-[22px] w-full py-[41px] px-[15%]">
      <CardWrapper>
        <div className="flex  justify-between w-full">
          <div className="flex items-center gap-[16px]">
            <div className="w-fit">
              <Avatar
                size="h-[64px] w-[64px] rounded-full"
                background="bg-white"
                img={session.data?.user?.image ?? userAvatar}
              />
            </div>
            <p className="font-[600] text-[18px]">
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
        value={name ?? ""}
        width="w-full"
        height="h-[45px]"
        rounded="rounded-[8px]"
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
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
