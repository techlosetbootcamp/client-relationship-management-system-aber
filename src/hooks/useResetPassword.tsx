import { axiosInstance } from "@/helpers/axiosInstance";
import { FormatErrors } from "@/helpers/formatErrors";
import { toast } from "@/helpers/toastify";
import { ResetPassword } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { authValidation } from "@/validations/authValidation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useResetPassword = (userId: string) => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorsMessages, setErrorMessages] = useState("");

  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const onSubmit = async () => {
    const validation = authValidation.resetPasswordValidation.safeParse({
      password,
      confirmPassword,
    });

    if (!validation.success) {
      console.log("validation errors", validation.error.flatten().fieldErrors);
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));
      console.log(errorsMessages);
      return;
    }

    console.log("button is clicked", password, confirmPassword);
    try {
      setIsLoading(true);
      await dispatch(
        ResetPassword({
          payload: { password, confirmPassword, userId },
          callback: handleResponse,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    // console.log("In reset-password page", response);

    // if (response) {
    //   router.push("/login");
    // }
  };

  const handleResponse = (data: any) => {
    console.log("handle response function", data, data.status);
    if (data?.data.status === 200) {
      toast.success(data.data.message);
      router.push("/login");
    } else {
      console.log("in else");

      toast.error(data.data.message);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onSubmit,
    isLoading,
  };
};

export default useResetPassword;
