"use client"
import React from 'react'
import logo from "@/assets/images/logo.svg"
import googleLogo from "@/assets/images/google.svg"
import Image from 'next/image'
import InputField from '@/components/inputField/InputField'
import Button from '@/components/button/Button'
import { signIn } from 'next-auth/react'


const onSubmit = async() =>{
  console.log("button is clicked")

await signIn("credentials", {
    email : "test1@test.com",
    password: "123456",
    redirect : true,
    callbackUrl : "/"
  });

}

const loginWithGoogle = async()=>{
  console.log("google button is clicked")
  await signIn("google", {
    redirect:true,
    callbackUrl : "/"
  })

}


const Page = () => {
  return (
    <div className='font-albertSans border-2 border-secondaryRed w-full h-screen flex'>
      <div className=' w-[30%] flex flex-col gap-[50px] mx-auto justify-center items-center'>  {/*self-center */}

      
        <Image src={logo} alt='logo-image' height={30} priority/>
        <div className='flex flex-col gap-[15px] w-full'>
        <InputField placeholder='Enter Your Email' width='w-full' height='h-[45px]' rounded='rounded-[8px]'/>
        <InputField  placeholder="Enter Your Password" width='w-full' height='h-[45px]' rounded='rounded-[8px]'/>
        <p className='text-[14px] font-[600] text-end'>Forgot Password?</p>
        </div>

        <div className='w-full' onClick={onSubmit}>
        <Button text='Login' background='bg-primaryPurple' width='w-full' py='py-[8px]' rounded='rounded-[8px]' color='text-white' fontSize='text-[18px]' fontWeight='font-[600]' img={""} gap='' px='' lineHeight='' />
        </div>

        <div className='border-t w-full flex justify-center sticky'>
          <p className='px-[15px] -top-[12px] bg-white absolute z-10'>OR</p>
          {/* <span className='w-full'></span> */}
        </div>

        <div className='w-full border-2 hover:bg-lightGray border-borderGray rounded-[8px]' onClick={loginWithGoogle}>
        <Button text='Continue with Google' background='white' width='w-full' py='py-[8px]' rounded='rounded-[8px]' color='text-darkGray' fontSize='text-[18px]' fontWeight='font-[500]' img={googleLogo} gap='gap-[15px]' px='' lineHeight='' />
        

        </div>

        </div>
      
    </div>
  )
}

export default Page
