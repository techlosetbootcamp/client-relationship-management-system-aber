"use client";
import React, { useState } from "react";
import logo from "@/assets/images/logo.svg";
import googleLogo from "@/assets/images/google.svg";
import Image from "next/image";
import InputField from "@/components/inputField/InputField";
import Button from "@/components/button/Button";
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
// import { useRouter } from 'next/router'
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

// const onSignUp = async() =>{
//   // const response = await axios
// }

const Page = () => {
  const session = useSession();
  const email = session.data?.user?.email;

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const router = useRouter();

  const onsubmit = async () => {
    console.log(
      "button is clicked",
      currentPassword,
      newPassword,
      confirmNewPassword
    );
    const response = await axios.post(
      "http://localhost:3000/api/auth/change-password",
      { currentPassword, newPassword, confirmNewPassword, email }
    );
    if (response) {
      router.push("/");
    }
    console.log("In change password page", response);
    // if (response.status === 201) {
    //   router.push("/login");
    // }

    // await signIn("credentials", {
    //   email: "test1@test.com",
    //   password: "123456",
    //   redirect: true,
    //   callbackUrl: "/",
    // });
  };

  // const router = useRouter()
  // const {data} = useSession();
  // console.log("session data",data)
  // if(data){
  //   // return redirect("/")
  //   router2.push("/")
  //   return null
  // }

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
            placeholder="Current Password"
            value={currentPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <InputField
            placeholder="New Password"
            value={newPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputField
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <div className="w-full">
            <div onClick={onsubmit}>
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
              />
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Page;
