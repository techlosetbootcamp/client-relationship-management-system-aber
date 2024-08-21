"use client";
import { axiosInstance } from "@/helpers/axiosInstance";
import { toast } from "@/helpers/toastify";
import { SignUp } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

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

    dispatch(
      SignUp({
        payload: { username, email, password, confirmPassword },
        callback: handleResponse,
      })
    )
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginWithGoogle = async () => {
    console.log("google button is clicked");
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleResponse = (data: any) => {
    console.log("handle repsnse function", data, data.status);
    if (data?.status === 201) {
      console.log("in if");
      toast.success();
    } else {
      console.log("in else");
 
      toast.error();
    }
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
