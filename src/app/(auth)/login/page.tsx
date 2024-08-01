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

// const onSignUp = async() =>{
//   // const response = await axios
// }

const loginWithGoogle = async () => {
  console.log("google button is clicked");
  await signIn("google", {
    redirect: true,
    callbackUrl: "/",
  });
};

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async () => {
    console.log(email, password, "Button is clicked");

    await signIn("credentials", {
      email: email,
      password: password,
      // email: "test1@test.com",
      // password: "123456",
      redirect: true,
      callbackUrl: "/",
    });
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
      <div className=" w-[30%] flex flex-col gap-[50px] mx-auto justify-center items-center">
        {" "}
        {/*self-center */}
        <Image src={logo} alt="logo-image" height={30} priority />
        {/* <form action="" className="w-full"> */}
        <div className="flex flex-col gap-[15px] w-full">
          <InputField
            placeholder="Enter Your Email"
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            placeholder="Enter Your Password"
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[8px]"
            onChange={(e) => setPassword(e.target?.value)}
          />
          <Link href={"/forget-password"}>
            <p className="text-primaryPurple -mt-[12px] text-[14px] font-[600] text-end cursor-pointer">
              Forgot Password?
            </p>
          </Link>

          <div className="w-full">
            <div onClick={onLogin}>
              <Button
                text="Login"
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
            <div>
              <p className="text-[12px] mt-[5px] text-center">
                Don&apos;t Have an Account?
                <Link href={"/sign-up"}>
                  <span className="text-primaryPurple font-[600] cursor-pointer">
                    {" "}
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* </form>  THIS WAS CAUSING THE ERROR */}
        <div className="border-t w-full flex justify-center sticky">
          <p className="px-[15px] -top-[12px] bg-white absolute z-10">OR</p>
          {/* <span className='w-full'></span> */}
        </div>
        <div
          className="w-full border-2 hover:bg-lightGray border-borderGray rounded-[8px]"
          onClick={loginWithGoogle}
        >
          <Button
            text="Continue with Google"
            background="white"
            width="w-full"
            py="py-[8px]"
            rounded="rounded-[8px]"
            color="text-darkGray"
            fontSize="text-[18px]"
            fontWeight="font-[500]"
            img={googleLogo}
            gap="gap-[15px]"
            px=""
            lineHeight=""
            border=""
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
