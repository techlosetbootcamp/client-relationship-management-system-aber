"use client";
import { toast } from "@/helpers/toastify";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authValidation } from "@/validations/authValidation";
import { FormatErrors } from "@/helpers/formatErrors";

const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMessages, setErrorMessages] = useState("");

  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const onLogin = async () => {
    const validation = authValidation.loginValidation.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }

    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (response?.ok) {
        router.push("/");
        toast.success("User Logged In Successfully!");
        router.refresh();
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
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
    isLoading,
    onLogin,
    loginWithGoogle,
  };
};

export default useLogin;
