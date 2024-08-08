"use client";
import { axiosInstance } from "@/helpers/axiosInstance";
import { SignUp } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useSignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const router = useRouter();

  const onsubmit = async () => {
    console.log(
      "button is clicked",
      username,
      email,
      password,
      confirmPassword
    );

    // const response = await axiosInstance.post("/auth/sign-up", {
    //   username,
    //   email,
    //   password,
    //   confirmPassword,
    // });
    dispatch(
      SignUp({
        payload: { username, email, password, confirmPassword },
      })
      
    ).then(() => {
      router.push("/login");
    })
    .catch((error) => {
      console.log(error)
    })
    // console.log("In sign-up page", response);
    // if (response.status === 201) {
    //   router.push("/login");
    // }
  };

  const loginWithGoogle = async () => {
    console.log("google button is clicked");
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };
  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    email,
    setEmail,
    onsubmit,
    loginWithGoogle,
  };
};

export default useSignUp;
