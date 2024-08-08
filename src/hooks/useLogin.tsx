"use client"
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async () => {
    console.log(email, password, "Button is clicked");

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const loginWithGoogle = async () => {
    console.log("google button is clicked");
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
    loginWithGoogle,
  };
};

export default useLogin;
