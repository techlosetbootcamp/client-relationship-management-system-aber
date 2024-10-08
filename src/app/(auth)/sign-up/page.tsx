"use client";
import React from "react";
import logo from "@/assets/images/logo.svg";
import googleLogo from "@/assets/images/google.svg";
import Image from "next/image";
import InputField from "@/components/inputField/InputField";
import Button from "@/components/button/Button";
import { CgSpinner } from "react-icons/cg";

import Link from "next/link";

import useSignUp from "@/hooks/useSignUp";

const Page = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onSubmit,
    loginWithGoogle,
    isLoading,
  } = useSignUp();

  return (
    <div className="font-albertSans w-full h-screen flex">
      <div className="xs:w-[90%] md:w-[60%] lg:w-[30%] flex flex-col gap-[50px] mx-auto justify-center items-center">
        {" "}
        <Image src={logo} alt="logo-image" height={30} priority />
        <div className="flex flex-col gap-[15px] w-full">
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            type="email"
            placeholder="Email"
            value={email}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            width="w-full"
            height="h-[45px]"
            rounded="rounded-[4px]"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="w-full">
            <Button
              text={isLoading ? "Signing up..." : "Sign up"}
              background="bg-primaryPurple"
              width="w-full"
              py="py-[8px]"
              rounded="rounded-[4px]"
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

            <div>
              <p className="text-[12px] mt-[5px] text-center">
                Already Have an Account?
                <Link href="/login">
                  <span className="text-primaryPurple font-[600] cursor-pointer">
                    {" "}
                    Login
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t w-full flex justify-center sticky">
          <p className="px-[15px] -top-[12px] bg-white absolute z-10">OR</p>
        </div>
        <div className="w-full border-2 hover:bg-lightGray border-borderGray rounded-[8px]">
          <Button
            text="Continue with Google"
            background="white"
            width="w-full"
            py="py-[8px]"
            rounded="rounded-[4px]"
            color="text-darkGray"
            fontSize="text-[18px]"
            fontWeight="font-[500]"
            img={googleLogo}
            gap="gap-[15px]"
            px=""
            lineHeight=""
            border=""
            onClick={loginWithGoogle}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
