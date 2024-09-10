"use client";
import { authValidation } from "@/validations/authValidation";
import { axiosInstance } from "@/helpers/axiosInstance";
import { FormatErrors } from "@/helpers/formatErrors";
import { toast } from "@/helpers/toastify";
import { SignUp } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useSignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorsMessages, setErrorMessages] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const onSubmit = async () => {
    const validation = authValidation.signUpValidation.safeParse({
      email,
      username,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }

    setIsLoading(true);
    try {
      await dispatch(
        SignUp({
          payload: { username, email, password, confirmPassword },
          callback: handleResponse,
        })
      );
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

  const handleResponse = (data: any) => {
    if (data?.data.status === 201) {
      router.push("/login");
      toast.success(data.data.message);
    } else {
      toast.error(null);
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
    onSubmit,
    isLoading,
    loginWithGoogle,
  };
};

export default useSignUp;
