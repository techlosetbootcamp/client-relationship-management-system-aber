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
// import { toast } from "react-toastify";

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
      // Clear existing toasts

      // Show the new error toast
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const onSubmit = async () => {
    console.log(
      "button is clicked",
      username,
      email,
      password,
      confirmPassword
    );

    const validation = authValidation.signUpValidation.safeParse({
      email,
      username,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      console.log("validation errors", validation.error.flatten().fieldErrors);
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));
      console.log(errorsMessages);
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

      console.log(isLoading);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      console.log(isLoading);
    }

    // dispatch(
    //   SignUp({
    //     payload: { username, email, password, confirmPassword },
    //     callback: handleResponse,
    //   })
    // )
    //   .then(() => {
    //     router.push("/login");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const loginWithGoogle = async () => {
    console.log("google button is clicked");
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleResponse = (data: any) => {
    console.log("handle response function", data, data.status);
    if (data?.data.status === 201) {
      console.log("in if");
      router.push("/login");
      toast.success(data.data.message);
    } else {
      console.log("in else");

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
