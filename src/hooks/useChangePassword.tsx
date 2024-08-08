import { axiosInstance } from "@/helpers/axiosInstance";
import { ChangePassword } from "@/redux/slices/auth.slice";

import { AppDispatch } from "@/redux/store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useChangePassword = () => {
  const session = useSession();
  const email = session.data?.user?.email;
  const userId = session?.data?.user?.id
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onsubmit = async () => {
    console.log(
      "button is clicked",
      currentPassword,
      newPassword,
      confirmNewPassword
    );
    dispatch(
      ChangePassword({
        payload: { currentPassword, newPassword, confirmNewPassword,userId },
      })
    )
      .then(async () => {
        console.log("password changes or not")
        // await signOut({
        //   redirect: true,
        //   callbackUrl: "/login",
        // });
      })
      .catch((error) => {
        console.log(error);
      });
    // const response = await axiosInstance.post("/auth/change-password", {
    //   currentPassword,
    //   newPassword,
    //   confirmNewPassword,
    //   email,
    // });
    // if (response) {
    //   router.push("/");
    // }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    onsubmit,
  };
};

export default useChangePassword;
