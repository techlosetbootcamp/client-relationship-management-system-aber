"use client"
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

const loginWithGoogle = async () => {
  console.log("google button is clicked");
  await signIn("google", {
    redirect: true,
    callbackUrl: "/",
  });
};

const Page = () => {
  const [username, setUsername] = useState<string>("abc")
  const [email, setEmail] = useState<string>("def")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const router = useRouter()


  const onsubmit = async () => {
    console.log("button is clicked",username, email,password,confirmPassword);
    const response = await axios.post("http://localhost:3000/api/auth/sign-up",{username,email,password,confirmPassword})
    console.log("In sign-up page", response);
    if(response.status===201){
      router.push("/login")
    }
  
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
      <div className=" w-[30%] flex flex-col gap-[50px] mx-auto justify-center items-center">
        {" "}
        {/*self-center */}
        <Image src={logo} alt="logo-image" height={30} priority />
        {/* <form action="" className="w-full"> */}
          <div className="flex flex-col gap-[15px] w-full">
            <InputField
              placeholder="Username"
              width="w-full"
              height="h-[45px]"
              rounded="rounded-[8px]"
              onChange={(e)=>setUsername(e.target.value)}
            />

            <InputField
              placeholder="Email"
              width="w-full"
              height="h-[45px]"
              rounded="rounded-[8px]"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <InputField
              placeholder="Password"
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

            <div className="w-full">
              <div onClick={onsubmit}>
                <Button
                  text="Sign up"
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
                />
              </div>
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
        {/* </form> */}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
