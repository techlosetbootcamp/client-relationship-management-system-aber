import { axiosInstance } from "@/helpers/axiosInstance";
import { ResetPassword } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useResetPassword = (userId: string) => {
  const dispatch: AppDispatch = useDispatch();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const onSubmit = async () => {
    console.log("button is clicked", password, confirmPassword);
  
    dispatch(
      ResetPassword({
        payload: { password, confirmPassword, userId },
      })
    )
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("In reset-password page", response);

    // if (response) {
    //   router.push("/login");
    // }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onSubmit,
  };
};

export default useResetPassword;
