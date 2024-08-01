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
import Link from "next/link";
import axios from "axios";

const Page = ({ params }: { params: { userId: string } }) => {
  console.log("params reset pasword", params.userId)
  const {userId} = params
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter()

  const onSubmit = async()=>{
    console.log("button is clicked",password, confirmPassword);
    const response = await axios.post("http://localhost:3000/api/auth/reset-password",{password, confirmPassword, userId})
    console.log("In reset-password page", response);

    if(response){
      router.push("/login")
    }
  }



  return (
    <div className="font-albertSans border-2 border-secondaryRed w-full h-screen flex">
      <div className=" w-[30%] flex flex-col gap-[50px] mx-auto justify-center items-center">

        <Image src={logo} alt="logo-image" height={30} priority />

          <div className="flex flex-col gap-[15px] w-full">
            <InputField
              placeholder="New Password"
              width="w-full"
              height="h-[45px]"
              rounded="rounded-[8px]"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <InputField
              placeholder="Confirm Password"
              width="w-full"
              height="h-[45px]"
              rounded="rounded-[8px]"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

          
              <div onClick={onSubmit}>
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
                />
              </div>
              
            
          </div>
  
        
       
      </div>
    </div>
  );
};

export default Page;
